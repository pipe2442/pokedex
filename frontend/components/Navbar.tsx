"use client";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePokemonStore } from "@/store/usePokemonStore";
import SearchFilters from "./SearchFilters";

export default function Navbar() {
  const setSearch = usePokemonStore((s) => s.setSearch);

  return (
    <header className="bg-[#DC0A2D] pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <Image
            src="/pokeball.svg.png"
            alt="Pokeball"
            width={32}
            height={32}
          />
          <h1 className="text-white text-3xl font-bold tracking-tight">
            Pokédex
          </h1>
        </div>

        <div>
          {/* CONTENEDOR FLEX: Search y Filters en la misma línea */}
          <div className="flex items-center gap-3 w-full max-w-3xl">
            <div className="relative flex-1 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#DC0A2D] z-10"
                size={18}
              />
              <Input
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-full bg-white pl-12 shadow-inner border-none h-11 w-full"
              />
            </div>

            {/* Aquí invocamos los filtros (el botón de Sort) */}
            <SearchFilters />
          </div>
        </div>
      </div>
    </header>
  );
}
