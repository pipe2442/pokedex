import { POKEMON_TYPE_COLORS } from "@/lib/constants/pokemon";

import { TypeBadgesProps } from "@/types/pokemon";

export function TypeBadges({ types }: TypeBadgesProps) {
  return (
    <div className="flex justify-center gap-3 mb-8">
      {types.map((t) => {
        const name = (typeof t === "string" ? t : t.type?.name).toLowerCase();
        return (
          <div
            key={name}
            className="px-4 py-1 rounded-full text-white text-xs font-bold capitalize"
            style={{ backgroundColor: POKEMON_TYPE_COLORS[name] || "#666" }}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
}
