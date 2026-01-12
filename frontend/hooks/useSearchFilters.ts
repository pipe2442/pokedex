import { useState, useEffect } from "react";
import { usePokemonStore } from "@/store/usePokemonStore";

export function useSearchFilters() {
  const { sort, setSort, setSearch } = usePokemonStore(); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleReset = () => {
    setSort(null);
    setSearch("");
  };

  return {
    sort,
    setSort,
    handleReset,
    isMounted: mounted,
  };
}
