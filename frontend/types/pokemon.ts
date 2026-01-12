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

export interface PokemonListResponse {
  results: Pokemon[];
  total_pages?: number;
  current_page?: number;
}

export interface PokemonGridProps {
  pokemons: Pokemon[];
  search: string;
}

export interface PaginationProps {
  page: number;
  onPageChange: (newPage: number) => void;
}
