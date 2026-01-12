"use client";

import Image from "next/image";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { handleLogout } = useLogout();

  return (
    <header className="bg-[#DC0A2D] pt-12 pb-6 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/pokeball.svg.png"
              alt="Pokeball"
              width={32}
              height={32}
              className="group-hover:rotate-12 transition-transform"
            />
            <span className="text-white/95 text-3xl font-bold tracking-tight">
              Pokédex
            </span>
          </Link>

          <Button
            variant="ghost"
            onClick={handleLogout}
            className="cursor-pointer text-white hover:bg-white/20 hover:text-white gap-2 rounded-full px-4"
          >
            <span className="hidden sm:inline font-medium">Logout</span>
            <LogOut size={20} />
          </Button>
        </div>

        <SearchBar />
      </div>
    </header>
  );
}
