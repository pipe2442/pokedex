// frontend/components/PokemonDetail/AboutSection.tsx
import { Weight, Ruler } from "lucide-react";
import { Pokemon } from "@/types/pokemon";

interface AboutSectionProps {
  pokemon: Pokemon;
}

export function AboutSection({ pokemon }: AboutSectionProps) {
  return (
    <div className="grid grid-cols-3 gap-2 mb-8">
      <div className="flex flex-col items-center border-r border-gray-100">
        <div className="flex items-center gap-2 h-8">
          <Weight size={18} className="text-gray-600" />
          <span className="text-sm font-medium">{pokemon.weight / 10} kg</span>
        </div>
        <span className="text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-wider">
          Weight
        </span>
      </div>

      <div className="flex flex-col items-center border-r border-gray-100">
        <div className="flex items-center gap-2 h-8">
          <Ruler size={18} className="text-gray-600 rotate-90" />
          <span className="text-sm font-medium">{pokemon.height / 10} m</span>
        </div>
        <span className="text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-wider">
          Height
        </span>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center h-8">
          {pokemon.abilities?.slice(0, 2).map((a) => {
            const name = typeof a === "string" ? a : a.ability?.name;
            return (
              <span key={name} className="text-[11px] capitalize font-medium">
                {name}
              </span>
            );
          })}
        </div>
        <span className="text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-wider">
          Abilities
        </span>
      </div>
    </div>
  );
}
