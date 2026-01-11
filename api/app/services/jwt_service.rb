class JwtService
  SECRET = Rails.application.secret_key_base

  def self.encode(payload)
    JWT.encode(payload.merge(exp: 24.hours.from_now.to_i), SECRET)
  end

  def self.decode(token)
    JWT.decode(token, SECRET)[0]
  rescue
    nil
  end
end
