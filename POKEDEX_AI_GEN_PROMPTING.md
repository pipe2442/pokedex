# 🤖 Generative AI Usage — Pokedex Technical Test

This document explains **how I intentionally used Generative AI tools (mainly Cursor AI)** as part of a real-world, professional development workflow to design, refactor, test, validate and productionize this Pokedex application.

Rather than using AI only to scaffold initial code, I used it as a **continuous pair-programming assistant**, heavily focused on refactoring, testability, performance, and production readiness.

---

## 1. Strategic Prompts Used

### A. Refactoring & Modularization

I used AI primarily to improve architecture and maintainability.

Prompt examples:

> Refactor this Next.js page into modular Shadcn UI components and extract all business logic into reusable custom React hooks. Centralize shared TypeScript interfaces into a /types directory and move constants into a /constants module.

> Modularize the PokemonDetail page into single-responsibility subcomponents (Header, About, Stats, Navigation) to improve readability, testability, and separation of concerns.

---

### B. Frontend TDD & Testing

Testing and type safety were major priorities.

Prompt examples:

> Set up Vitest and React Testing Library using colocation. Implement unit tests for all hooks and components. Mock Zustand, React Query, and Next.js navigation. Remove all any types and enforce strict type safety.

---

### C. Backend & API Enhancement

AI was also used to refine backend quality and API contracts.

Prompt examples:

> Improve the Rails API service layer to provide pagination metadata (total) and normalize responses for frontend consumption. Fix cookie security flags to persist sessions inside Docker while remaining production-secure.

---

## 2. Architecture Scaffolding Prompt

Architecture Prompt:

Build a Full-Stack Pokedex application.

Backend
- Rails 8 API wrapper for PokeAPI
- JWT authentication stored in HTTP-only cookies
- Service Object architecture

Frontend
- Next.js App Router
- TypeScript strict
- Tailwind CSS v4 + Shadcn UI
- Zustand for UI/global state
- TanStack React Query for server-state caching

Requirements
- 100 percent type-safe
- Unit tests for hooks and components
- Single multi-stage Dockerfile for deployment

---

## 3. Representative Sample — Frontend Hook Pattern

Custom Hook

`frontend/hooks/usePokemonList.ts`
```
export function usePokemonList({ initialData }: UsePokemonListProps) {
  const [page, setPage] = useState(1)
  const { search, getProcessedList } = usePokemonStore()

  const { data, isFetching } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => getPokemons(page),
    initialData: page === 1 ? initialData : undefined,
    placeholderData: keepPreviousData,
  })

  const totalPages = Math.ceil((data?.total || 0) / 151)
  const pokemons = getProcessedList(data?.results || [])

  return { pokemons, page, setPage, totalPages, search, isLoading: isFetching }
}
```
---

Test (Vitest)
```
describe("usePokemonList", () => {
  it("calculates total pages and initializes data", () => {
    const mockData = { results: [{ name: "pikachu" }], total: 302 } as PokemonListResponse

    const { result } = renderHook(() =>
      usePokemonList({ initialData: mockData }),
      { wrapper }
    )

    expect(result.current.totalPages).toBe(2)
    expect(result.current.pokemons[0].name).toBe("pikachu")
  })
})
```
---

## 4. Validation & Refinement Process

Every major AI-generated suggestion was validated manually.

Validation Steps

- Continuous build verification (npm run build, docker-compose build)
- Full automated test suite execution using Vitest
- Docker internal networking audits using container-level curl
- Static analysis via ESLint and strict TypeScript mode

---

## 5. Corrections & Improvements

Issue Detected | Improvement Applied
Hardcoded API URLs | Implemented dynamic getApiUrl resolver
JWT cookies lost in Docker | Environment-aware secure cookie handling
Excessive any usage | Replaced with strict domain interfaces
Next.js image failures | Enabled unoptimized true for Docker compatibility
Infinite pagination | Added total-based page boundary logic

---

## 6. Edge Cases, Authentication & Validations

- All API routes are protected via JWT cookies
- Unauthorized access returns HTTP 401
- Next.js middleware prevents UI flicker before auth resolution
- Pagination boundaries prevent navigation to empty pages
- Strict TypeScript types prevent runtime mismatches

---

## 7. Performance & Idiomatic Quality

Performance
- TanStack Query caching and placeholderData for smooth UX
- Lightweight Zustand global store
- GPU-accelerated Tailwind v4 animations

Idiomatic Architecture

Layer | Approach
Frontend | Folder-as-Component, hooks-first design
Backend | Fat Service / Skinny Controller
Infra | Single multi-stage Dockerfile deployment

---

Final Result

A production-grade, fully tested, type-safe, containerized Pokedex application built using a professional AI-assisted development workflow.
