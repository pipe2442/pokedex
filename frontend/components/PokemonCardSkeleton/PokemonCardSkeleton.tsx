import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export default function PokemonCardSkeleton() {
  return (
    <Card className="w-full aspect-square overflow-hidden border-none p-0 relative rounded-2xl bg-[#EFEFEF]">
      {/* Fondo blanco parcial */}
      <div className="absolute top-0 left-0 w-full h-[65%] bg-white/50" />

      <div className="relative z-10 h-full flex flex-col p-2 sm:p-3">
        {/* Número del Pokémon */}
        <Skeleton className="self-end w-8 h-3 rounded-full mb-4 opacity-50" />

        {/* Espacio para la Imagen */}
        <div className="flex-1 flex items-center justify-center">
          <Skeleton className="w-[60%] h-[60%] rounded-full opacity-50" />
        </div>

        {/* Nombre del Pokémon */}
        <div className="h-[20%] flex items-center justify-center">
          <Skeleton className="w-20 h-4 rounded-full opacity-50" />
        </div>
      </div>
    </Card>
  );
}
