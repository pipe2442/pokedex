"use client";

import { ListFilter, Baseline, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchFilters } from "@/hooks/useSearchFilters";

const SortIcon = ({ type }: { type: string | null }) => {
  const iconClass = "text-[#DC0A2D]";
  const size = 20;

  if (type === "name") return <Baseline className={iconClass} size={size} />;
  if (type === "number") return <Hash className={iconClass} size={size} />;
  return <ListFilter className={iconClass} size={size} />;
};

export default function SearchFilters() {
  const { sort, setSort, handleReset, isMounted } = useSearchFilters();

  if (!isMounted) return null;

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white shadow-md cursor-pointer hover:scale-105 transition-transform border-none focus-visible:ring-0"
          >
            <SortIcon type={sort} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48 p-2">
          <DropdownMenuItem
            onClick={() => setSort("name")}
            className={`cursor-pointer rounded-lg mb-1 ${
              sort === "name" ? "bg-slate-100 font-bold text-[#DC0A2D]" : ""
            }`}
          >
            Sort by Name
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setSort("number")}
            className={`cursor-pointer rounded-lg mb-1 ${
              sort === "number" ? "bg-slate-100 font-bold text-[#DC0A2D]" : ""
            }`}
          >
            Sort by Number
          </DropdownMenuItem>

          <div className="h-px bg-slate-100 my-1" />

          <DropdownMenuItem
            onClick={handleReset}
            className="cursor-pointer rounded-lg"
          >
            Reset All Filters
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
