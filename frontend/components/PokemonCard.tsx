// import Link from "next/link";
// import Image from "next/image";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardFooter,
// } from "@/components/ui/card";

// export default function PokemonCard({ pokemon }: any) {
//   return (
//     <Link href={`/pokemons/${pokemon.id}`}>
//       <Card className="hover:scale-105 transition bg-red-500 p-0 m-0">
//         <CardContent className="flex flex-col items-center p-0 m-0">
//           <p className="text-[8px] leading-[12px] text-gray-400 self-end mt-1">
//             #{pokemon.number}
//           </p>
//           <Image
//             src={pokemon.image}
//             alt={pokemon.name}
//             width={80}
//             height={80}
//             className="object-contain"
//             priority
//           />
//           <CardFooter className="bg-blue-500 h-full w-full py-10 pt-7 pb-5 rounded-b-xl">
// <h2 className="text-[12px] leading-[16px] font-light tracking-[0.02em] capitalize text-center">
//   {pokemon.name}
// </h2>
//           </CardFooter>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// }

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function PokemonCard({ pokemon }: any) {
  return (
    <Link href={`/pokemons/${pokemon.id}`}>
      {/* Aumentamos w-40 -> w-56 y h-45 -> h-72 */}
      <Card className="w-55 h-65 overflow-hidden hover:scale-105 transition border-none p-0 relative group shadow-2xl rounded-2xl">
        {/* FONDO DIVIDIDO */}
        <div className="absolute inset-0 flex flex-col">
          <div className=" h-[60%]" />
          <div className="bg-[#EFEFEF] h-[40%]" />
        </div>

        {/* CONTENIDO */}
        <div className="relative h-full flex flex-col items-center p-4">
          {/* Número un poco más grande y visible */}
          <p className="self-end text-[17px] text-[#666666] tracking-widest font-light">
            #{pokemon.number}
          </p>

          {/* IMAGEN: Escalamos de 105 a 150 para que llene el nuevo espacio */}
          <div className="flex-1 flex items-center justify-center z-10 translate-y-4">
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={150}
              height={150}
              // className="object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.4)]"
              className="object-contain"
              priority
            />
          </div>

          {/* NOMBRE: Aumentamos fuente y tracking */}
          <div className="h-[30%] flex items-center justify-center pt-4">
            {/* <h2 className="text-[18px] font-black uppercase tracking-widest text-white text-center drop-shadow-sm">
              {pokemon.name}
            </h2> */}

            <h2 className="text-[22px] leading-[16px]  text-center font-light">
              {pokemon.name}
            </h2>
          </div>
        </div>
      </Card>
    </Link>
  );
}
