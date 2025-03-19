export type PokeTypes = 
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

export type PokeType = {
  name: PokeTypes | "All"; // Ahora reconoce PokeTypes correctamente
  url?: string;
};

export type AllPokemonsResult = {
  name: string;
  url: string;
};

export type PokemonsByTypeResult = {
  pokemon: {
    name: string;
    url: string;
  };
};
