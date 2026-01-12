"use client";
import { ListFilter, Baseline, Hash } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePokemonStore } from "@/store/usePokemonStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SearchFilters() {
  const { sort, setSort } = usePokemonStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getSortIcon = () => {
    if (sort === "name")
      return <Baseline className="text-[#DC0A2D]" size={20} />;
    if (sort === "number") return <Hash className="text-[#DC0A2D]" size={20} />;
    return <ListFilter className="text-[#DC0A2D]" size={20} />;
  };

  return (
    <div className="flex justify-end max-w-7xl mx-auto px-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white shadow-md cursor-pointer"
          >
            {getSortIcon()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setSort("name")}>
            Sort by Name
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSort("number")}>
            Sort by Number
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSort(null)}>
            Reset
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
