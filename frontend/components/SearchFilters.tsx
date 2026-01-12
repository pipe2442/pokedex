"use client";

import { useState } from "react";
import { Search, ListFilter, Baseline, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SearchFilters() {
  const [sort, setSort] = useState<"name" | "number" | null>(null);

  // Función para decidir qué icono mostrar en el botón principal
  const getSortIcon = () => {
    if (sort === "name")
      return <Baseline className="text-[#DC0A2D]" size={20} />;
    if (sort === "number") return <Hash className="text-[#DC0A2D]" size={20} />;
    return <ListFilter className="text-[#DC0A2D]" size={20} />;
  };

  return (
    <div className="flex items-center gap-3 w-full max-w-3xl">
      {/* Input de Búsqueda */}
      <div className="relative flex-1 group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#DC0A2D] z-10"
          size={18}
        />
        <Input
          type="text"
          placeholder="Search"
          className="w-full h-10 pl-12 pr-4 rounded-full bg-white border-none shadow-inner
                   focus-visible:ring-2 focus-visible:ring-white/50 text-gray-700
                   placeholder:text-gray-400 font-medium"
        />
      </div>

      {/* Menú de Ordenamiento */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 shadow-md shrink-0 border-none outline-none cursor-pointer"
          >
            {getSortIcon()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-xl p-2">
          <DropdownMenuItem
            onClick={() => setSort("name")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Baseline size={16} /> Name
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setSort("number")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Hash size={16} /> Number
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setSort(null)}
            className="flex items-center gap-2 cursor-pointer text-gray-400"
          >
            <ListFilter size={16} /> Reset
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
