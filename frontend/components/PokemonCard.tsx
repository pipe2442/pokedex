import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function PokemonCard({ pokemon }: any) {
  return (
    <Link href={`/pokemons/${pokemon.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{pokemon.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={150}
            height={150}
            className="object-contain"
          />
        </CardContent>
        <CardFooter>
          <p>{pokemon.number}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
