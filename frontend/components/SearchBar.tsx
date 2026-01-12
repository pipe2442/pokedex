import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePokemonStore } from "@/store/usePokemonStore";
import SearchFilters from "./SearchFilters";

export default function SearchBar() {
  const setSearch = usePokemonStore((s) => s.setSearch);

  return (
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
  );
}
