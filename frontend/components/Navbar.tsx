import { Search } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  return (
    <header className="bg-[#DC0A2D] pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
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

        <div className="relative w-full max-w-2xl group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#DC0A2D] z-10"
            size={18}
          />

          <Input
            type="text"
            placeholder="Search"
            className="w-full h-11 pl-12 pr-4 rounded-full bg-white border-none shadow-inner
                     focus-visible:ring-2 focus-visible:ring-white/50
                     placeholder:text-gray-400 font-light text-gray-700"
          />
        </div>
      </div>
    </header>
  );
}
