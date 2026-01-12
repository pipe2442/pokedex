"use client";

import Image from "next/image";
import { Search, LogOut } from "lucide-react"; // Importamos LogOut
import { Input } from "@/components/ui/input";
import { usePokemonStore } from "@/store/usePokemonStore";
import { useAuthStore } from "@/store/useAuthStore"; // Importamos el store
import { useRouter } from "next/navigation"; // Para redirigir
import SearchFilters from "./SearchFilters";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Usamos el botón de shadcn

export default function Navbar() {
  const setSearch = usePokemonStore((s) => s.setSearch);
  const logout = useAuthStore((s) => s.logout); // Función logout del store
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Llamada al endpoint de Rails
      await fetch("http://localhost:8000/logout", {
        method: "POST",
        credentials: "include",
      });

      // Limpiar el estado local y redirigir
      logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

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
            <span
              className="text-white/95 text-3xl font-bold tracking-tight
                 transition-all duration-200
                 group-hover:text-white
                 group-hover:drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
            >
              Pokédex
            </span>
          </Link>

          {/* Botón de Logout */}
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="cursor-pointer text-white hover:bg-white/20 hover:text-white gap-2 rounded-full px-4"
          >
            <span className="hidden sm:inline font-medium">Logout</span>
            <LogOut size={20} />
          </Button>
        </div>

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
                className="rounded-full bg-white pl-12 shadow-inner border-none h-11 w-full focus-visible:ring-white/50"
              />
            </div>

            <SearchFilters />
          </div>
        </div>
      </div>
    </header>
  );
}
