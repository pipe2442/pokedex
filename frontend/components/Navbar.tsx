// components/Navbar.tsx
import Image from "next/image";
import SearchFilters from "./SearchFilters";

export default function Navbar() {
  return (
    <header className="bg-[#DC0A2D] w-full pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <Image src="/pokeball.svg.png" alt="Pokeball" width={32} height={32} />
          <h1 className="text-white text-3xl font-bold tracking-tight">
            Pokédex
          </h1>
        </div>

        {/* Invocamos el nuevo componente */}
        <SearchFilters />
      </div>
    </header>
  );
}
