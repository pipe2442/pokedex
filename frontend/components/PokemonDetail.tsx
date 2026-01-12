"use client";

import {
  ArrowLeft,
  Weight,
  Ruler,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { StatBar } from "./StatBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const typeColors: any = {
  grass: "#74CB48",
  poison: "#A43E9E",
  fire: "#F57D31",
  water: "#6493EB",
  bug: "#A7B723",
  normal: "#AAA67F",
  electric: "#F9CF30",
  ground: "#E2BF65",
  fairy: "#D685AD",
  fighting: "#C12239",
  psychic: "#FB5584",
  rock: "#B69E31",
  ghost: "#705594",
  ice: "#9AD6DF",
  dragon: "#7037FF",
  dark: "#705746",
  steel: "#B7B9D0",
  flying: "#A891EC",
};

const statLabels: any = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SATK",
  "special-defense": "SDEF",
  speed: "SPD",
};

export default function PokemonDetail({ pokemon }: { pokemon: any }) {
  const firstType = (
    typeof pokemon.types[0] === "string"
      ? pokemon.types[0]
      : pokemon.types[0]?.type?.name || "normal"
  ).toLowerCase();

  const bgColor = typeColors[firstType] || "#666";
  const pokemonId = Number(pokemon.id);

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-12 pb-4 text-white z-10">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-white hover:bg-white/20 hover:text-white rounded-full transition-colors"
          >
            <Link href="/">
              <ArrowLeft size={30} />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
        </div>
        <span className="font-bold text-lg">#{pokemon.number}</span>
      </header>

      {/* Navegación y Foto */}
      <div className="relative flex justify-between items-center px-4 z-10 h-40">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className={`text-white/70 hover:text-white hover:bg-transparent ${
            pokemonId <= 1 ? "invisible" : ""
          }`}
        >
          <Link href={`/pokemon/${pokemonId - 1}`}>
            <ChevronLeft size={40} />
          </Link>
        </Button>

        <div className="absolute left-1/2 -translate-x-1/2 top-4 w-64 h-64 z-20">
          {/* POKEBALL SVG BACKGROUND */}
          <div className="absolute top-2 -right-10 opacity-15 pointer-events-none z-0">
            <svg
              width="220"
              height="220"
              viewBox="0 0 206 208"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M127.709 104C127.709 117.676 116.622 128.762 102.947 128.762C89.2712 128.762 78.1849 117.676 78.1849 104C78.1849 90.3244 89.2712 79.2381 102.947 79.2381C116.622 79.2381 127.709 90.3244 127.709 104Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M102.947 208C155.34 208 198.684 169.257 205.894 118.857H144.982C138.863 136.169 122.353 148.571 102.947 148.571C83.5401 148.571 67.0303 136.169 60.9116 118.857H0C7.20912 169.257 50.5535 208 102.947 208ZM60.9116 118.857H0C7.20912 169.257 50.5535 208 102.947 208ZM60.9116 89.1429H0C7.20912 38.7431 50.5535 0 102.947 0C155.34 0 198.684 38.7431 205.894 89.1429H144.982C138.863 71.8314 122.353 59.4286 102.947 59.4286C83.5401 59.4286 67.0303 71.8314 60.9116 89.1429ZM127.709 104C127.709 117.676 116.622 128.762 102.947 128.762C89.2712 128.762 78.1849 117.676 78.1849 104C78.1849 90.3244 89.2712 79.2381 102.947 79.2381C116.622 79.2381 127.709 90.3244 127.709 104Z"
                fill="white"
              />
            </svg>
          </div>
          <Image
            src={
              pokemon.image ||
              pokemon.sprites?.other["official-artwork"]?.front_default ||
              pokemon.sprites?.front_default ||
              "/placeholder.svg"
            }
            alt={pokemon.name}
            width={256}
            height={256}
            priority
            className="object-contain drop-shadow-2xl"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          asChild
          className="text-white/70 hover:text-white hover:bg-transparent"
        >
          <Link href={`/pokemon/${pokemonId + 1}`}>
            <ChevronRight size={40} />
          </Link>
        </Button>
      </div>

      {/* Card de Información (Shadcn Card) */}
      <Card className="flex-1 bg-white mx-1 mb-1 rounded-t-[2.5rem] rounded-b-none mt-24 p-6 pt-16 border-none shadow-none relative z-0 overflow-visible">
        {/* Chips de Tipos */}
        <div className="flex justify-center gap-3 mb-8">
          {pokemon.types.map((t: any) => {
            const name = typeof t === "string" ? t : t.type?.name;
            return (
              <div
                key={name}
                className="px-4 py-1 rounded-full text-white text-xs font-bold capitalize"
                style={{ backgroundColor: typeColors[name.toLowerCase()] }}
              >
                {name}
              </div>
            );
          })}
        </div>

        <h2
          className="text-center font-bold text-xl mb-6"
          style={{ color: bgColor }}
        >
          About
        </h2>

        <div className="grid grid-cols-3 gap-2 mb-8">
          <div className="flex flex-col items-center border-r border-gray-100">
            <div className="flex items-center gap-2 h-8">
              <Weight size={18} className="text-gray-600" />
              <span className="text-sm font-medium">
                {pokemon.weight / 10} kg
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-wider">
              Weight
            </span>
          </div>

          <div className="flex flex-col items-center border-r border-gray-100">
            <div className="flex items-center gap-2 h-8">
              <Ruler size={18} className="text-gray-600 rotate-90" />
              <span className="text-sm font-medium">
                {pokemon.height / 10} m
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-wider">
              Height
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center h-8">
              {pokemon.abilities?.slice(0, 2).map((a: any) => (
                <span
                  key={a.ability?.name || a}
                  className="text-[11px] capitalize font-medium"
                >
                  {a.ability?.name || a}
                </span>
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-wider">
              Abilities
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-600 text-center mb-10 px-4 leading-relaxed max-w-md mx-auto">
          {pokemon.description || "No description available for this Pokémon."}
        </p>

        <h2
          className="text-center font-bold text-xl mb-6"
          style={{ color: bgColor }}
        >
          Base Stats
        </h2>

        <div className="space-y-4 w-full max-w-md mx-auto px-2">
          {pokemon.stats?.map((s: any) => (
            <StatBar
              key={s.stat.name}
              label={
                statLabels[s.stat.name] || s.stat.name.toUpperCase().slice(0, 4)
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
