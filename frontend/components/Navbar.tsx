"use client";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePokemonStore } from "@/store/usePokemonStore";
import SearchFilters from "./SearchFilters";
import Link from "next/link";

export default function Navbar() {
  const setSearch = usePokemonStore((s) => s.setSearch);

  return (
    <header className="bg-[#DC0A2D] pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/pokeball.svg.png"
            alt="Pokeball"
            width={32}
            height={32}
          />
          <span
            className="text-white/95 text-3xl font-bold tracking-tight
               transition-all duration-200
               group-hover:text-white
               group-hover:drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
          >
            Pokédex
          </span>
        </Link>

        <div>
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

            <SearchFilters />
          </div>
        </div>
      </div>
    </header>
  );
}
