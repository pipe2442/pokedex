"use client";

import { Card } from "@/components/ui/card";
import { StatBar } from "@/components/StatBar";
import { POKEMON_TYPE_COLORS, STAT_LABELS } from "@/lib/constants/pokemon";
import { Pokemon } from "@/types/pokemon";

import { DetailHeader } from "./DetailHeader";
import { DetailNavigation } from "./DetailNavigation";
import { AboutSection } from "./AboutSection";
import { TypeBadges } from "./TypeBadges";

interface PokemonDetailProps {
  pokemon: Pokemon;
}

export default function PokemonDetail({ pokemon }: PokemonDetailProps) {
  const firstType = (
    typeof pokemon.types[0] === "string"
      ? pokemon.types[0]
      : pokemon.types[0]?.type?.name || "normal"
  ).toLowerCase();

  const bgColor = POKEMON_TYPE_COLORS[firstType] || "#666";
  const pokemonId = Number(pokemon.id);

  const pokemonImage =
    pokemon.sprites?.other["official-artwork"]?.front_default ||
    pokemon.image ||
    "/pokeball.svg.png";

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <DetailHeader name={pokemon.name} number={pokemon.number} />

      <DetailNavigation
        pokemonId={pokemonId}
        name={pokemon.name}
        image={pokemonImage}
      />

      <Card className="flex-1 bg-white mx-1 mb-1 rounded-t-[2.5rem] rounded-b-none mt-24 p-6 pt-16 border-none relative z-0 overflow-visible">
        <TypeBadges types={pokemon.types} />

        <h2
          className="text-center font-bold text-xl mb-6"
          style={{ color: bgColor }}
        >
          About
        </h2>
        <AboutSection pokemon={pokemon} />

        <p className="text-sm text-gray-600 text-center mb-10 px-4 max-w-md mx-auto leading-relaxed">
          {pokemon.description || "No description available for this Pokémon."}
        </p>

        <h2
          className="text-center font-bold text-xl mb-6"
          style={{ color: bgColor }}
        >
          Base Stats
        </h2>

        <div className="space-y-4 w-full max-w-md mx-auto px-2">
          {pokemon.stats?.map((s) => (
            <StatBar
              key={s.stat.name}
              label={
                STAT_LABELS[s.stat.name] ||
                s.stat.name.toUpperCase().slice(0, 4)
              }
              value={s.base_stat}
              color={bgColor}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
