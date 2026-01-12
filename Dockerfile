# syntax=docker/dockerfile:1

# ==========================================
# BACKEND (API) STAGES
# ==========================================
FROM ruby:3.4.2-slim AS api-base
WORKDIR /rails
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libjemalloc2 libvips sqlite3 && \
    ln -s /usr/lib/$(uname -m)-linux-gnu/libjemalloc.so.2 /usr/local/lib/libjemalloc.so && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development" \
    LD_PRELOAD="/usr/local/lib/libjemalloc.so"

FROM api-base AS api-build
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libyaml-dev pkg-config && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives
COPY api/Gemfile api/Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile -j 1 --gemfile
COPY api/ .
RUN bundle exec bootsnap precompile -j 1 app/ lib/

FROM api-base AS api
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash
USER 1000:1000
COPY --chown=rails:rails --from=api-build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --chown=rails:rails --from=api-build /rails /rails
ENTRYPOINT ["/rails/bin/docker-entrypoint"]
EXPOSE 80
CMD ["./bin/thrust", "./bin/rails", "server"]

# ==========================================
# FRONTEND STAGES
# ==========================================
FROM node:20-slim AS frontend-base
WORKDIR /app

FROM frontend-base AS frontend-deps
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci

FROM frontend-base AS frontend-build
COPY --from=frontend-deps /app/node_modules ./node_modules
COPY frontend/ .
RUN npm run build

FROM frontend-base AS frontend
ENV NODE_ENV production
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 nextjs
COPY --from=frontend-build /app/public ./public
COPY --from=frontend-build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=frontend-build /app/node_modules ./node_modules
COPY --from=frontend-build /app/package.json ./package.json
USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD ["npm", "start"]

