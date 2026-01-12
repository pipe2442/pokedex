import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PokeballBackground from "./PokeballBackground";

interface DetailNavigationProps {
  pokemonId: number;
  name: string;
  image: string;
}

export function DetailNavigation({
  pokemonId,
  name,
  image,
}: DetailNavigationProps) {
  return (
    <div className="relative flex justify-between items-center px-4 z-10 h-40">
      <Button
        variant="ghost"
        size="icon"
        asChild
        className={`text-white/70 ${pokemonId <= 1 ? "invisible" : ""}`}
      >
        <Link href={`/pokemon/${pokemonId - 1}`}>
          <ChevronLeft size={40} />
        </Link>
      </Button>

      <div className="absolute left-1/2 -translate-x-1/2 top-4 w-64 h-64 z-20">
        <PokeballBackground />
        <Image
          src={image}
          alt={name}
          width={256}
          height={256}
          priority
          className="object-contain drop-shadow-2xl animate-poke-jump"
        />
      </div>

      <Button variant="ghost" size="icon" asChild className="text-white/70">
        <Link href={`/pokemon/${pokemonId + 1}`}>
          <ChevronRight size={40} />
        </Link>
      </Button>
    </div>
  );
}
