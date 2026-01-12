"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";

// this should go to another file like types.ts
interface PokemonCardProps {
  pokemon: {
    id: number;
    number: string;
    name: string;
    image: string;
  };
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const formattedNumber = `#${pokemon.number.toString().padStart(3, "0")}`;

  return (
    <Link href={`/pokemon/${pokemon.id}`} className="w-full block">
      <Card className="w-full aspect-square overflow-hidden hover:scale-105 transition-all duration-300 border-none p-0 relative group shadow-[0_10px_40px_rgba(0,0,0,0.12)] rounded-2xl bg-[#EFEFEF]">
        <div className="absolute top-0 left-0 w-full h-[65%] bg-white" />

        <div className="relative z-10 h-full flex flex-col p-2 sm:p-3">
          <p className="text-right text-[10px] sm:text-[14px] text-[#666666] font-medium pr-1">
            {formattedNumber}
          </p>

          <div className="flex-1 flex items-center justify-center min-h-0 relative">
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={120}
              height={120}
              priority
              className="object-contain w-[80%] h-[80%] drop-shadow-xl transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          <div className="h-[20%] flex items-center justify-center">
            <h2 className="text-[11px] sm:text-[18px] font-light capitalize text-[#1D1D1D] text-center leading-none">
              {pokemon.name}
            </h2>
          </div>
        </div>
      </Card>
    </Link>
  );
}
