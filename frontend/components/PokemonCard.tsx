"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function PokemonCard({ pokemon }: any) {
  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <Card className="w-60 h-60 overflow-hidden hover:scale-105 transition-all duration-300 border-none p-0 relative group shadow-[0_10px_40px_rgba(0,0,0,0.12)] rounded-2xl">
        <div className="absolute inset-0 flex flex-col">
          <div className="bg-white h-[65%]" />
          <div className="bg-[#EFEFEF] h-[35%]" />
        </div>

        <div className="relative h-full flex flex-col items-center p-4">
          <p className="self-end text-[17px] text-[#666666] tracking-widest font-light">
            #{pokemon.number}
          </p>

          <div className="flex-1 flex items-center justify-center z-10 translate-y-4">
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={150}
              height={150}
              priority
              className="object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* NOMBRE DEL POKÉMON */}
          <div className="h-[30%] flex items-center justify-center pt-4">
            <h2 className="text-[22px] leading-[16px]  text-center font-light">
              {pokemon.name}
            </h2>
          </div>
        </div>
      </Card>
    </Link>
  );
}
