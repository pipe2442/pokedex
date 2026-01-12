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
  total: number;
  page: number;
}

// Props Interfaces for Components
export interface PokemonGridProps {
  pokemons: Pokemon[];
  search: string;
  isLoading: boolean;
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export interface DetailHeaderProps {
  name: string;
  number: string;
}

export interface AboutSectionProps {
  pokemon: Pokemon;
}

export interface DetailNavigationProps {
  pokemonId: number;
  name: string;
  image: string;
}

export interface TypeBadgesProps {
  types: (string | PokemonType)[];
}

export interface StatBarProps {
  label: string;
  value: number;
  color: string;
}

export interface User {
  login: string;
  role?: string;
}
