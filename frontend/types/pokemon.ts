export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
}

export interface Pokemon {
  id: number | string;
  number: string;
  name: string;
  image?: string;
  weight: number;
  height: number;
  description?: string;
  types: (string | PokemonType)[];
  abilities: (string | PokemonAbility)[];
  stats: PokemonStat[];
  sprites?: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
    front_default?: string;
  };
}
