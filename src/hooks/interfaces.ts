// Definición de tipos comunes
export interface NamedAPIResource {
  name: string;
  url: string;
}

// Interfaz para la lista de Pokémon
export interface IPokemons {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

// Interfaz para un Pokémon individual
export interface IPokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: Ability[];
  forms: NamedAPIResource[];
  game_indices: GameIndice[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: Move[];
  species: NamedAPIResource;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  past_types: PastType[];
  is_default: boolean;
  order: number;
}

// Interfaz para habilidades
export interface Ability {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

// Interfaz para índices de juegos
export interface GameIndice {
  game_index: number;
  version: NamedAPIResource;
}

// Interfaz para objetos sostenidos
export interface HeldItem {
  item: NamedAPIResource;
  version_details: VersionDetail[];
}

// Interfaz para detalles de versión
export interface VersionDetail {
  rarity: number;
  version: NamedAPIResource;
}

// Interfaz para movimientos
export interface Move {
  move: NamedAPIResource;
  version_group_details: VersionGroupDetail[];
}

// Interfaz para detalles de grupo de versión
export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
}

// Interfaz para sprites
export interface Sprites {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  other: OtherSprites;
  versions: VersionSprites;
}

// Interfaz para otros sprites
export interface OtherSprites {
  dream_world: DreamWorld;
  home: Home;
  "official-artwork": OfficialArtwork;
}

// Interfaz para sprites de Dream World
export interface DreamWorld {
  front_default: string | null;
  front_female: string | null;
}

// Interfaz para sprites de Home
export interface Home {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

// Interfaz para arte oficial
export interface OfficialArtwork {
  front_default: string | null;
}

// Interfaz para sprites de versiones
export interface VersionSprites {
  "generation-i": GenerationI;
  "generation-ii": GenerationII;
  "generation-iii": GenerationIII;
  "generation-iv": GenerationIV;
  "generation-v": GenerationV;
  "generation-vi": GenerationVI;
  "generation-vii": GenerationVII;
  "generation-viii": GenerationVIII;
}

// Interfaz para la generación I
export interface GenerationI {
  "red-blue": RedBlue;
  yellow: Yellow;
}

export interface RedBlue {
  back_default: string | null;
  back_gray: string | null;
  back_transparent: string | null;
  front_default: string | null;
  front_gray: string | null;
  front_transparent: string | null;
}

export interface Yellow {
  back_default: string | null;
  back_gray: string | null;
  back_transparent: string | null;
  front_default: string | null;
  front_gray: string | null;
  front_transparent: string | null;
}

// Interfaz para la generación II
export interface GenerationII {
  crystal: Crystal;
  gold: Gold;
  silver: Silver;
}

export interface Crystal {
  back_default: string | null;
  back_shiny: string | null;
  back_shiny_transparent: string | null;
  back_transparent: string | null;
  front_default: string | null;
  front_shiny: string | null;
  front_shiny_transparent: string | null;
  front_transparent: string | null;
}

export interface Gold {
  back_default: string | null;
  back_shiny: string | null;
  front_default: string | null;
  front_shiny: string | null;
  front_transparent: string | null;
}

export interface Silver {
  back_default: string | null;
  back_shiny: string | null;
  front_default: string | null;
  front_shiny: string | null;
  front_transparent: string | null;
}

// Interfaz para la generación III
export interface GenerationIII {
  emerald: Emerald;
  "firered-leafgreen": FireredLeafgreen;
  "ruby-sapphire": RubySapphire;
}

export interface Emerald {
  front_default: string | null;
  front_shiny: string | null;
}

export interface FireredLeafgreen {
  back_default: string | null;
  back_shiny: string | null;
  front_default: string | null;
  front_shiny: string | null;
}

export interface RubySapphire {
  back_default: string | null;
  back_shiny: string | null;
  front_default: string | null;
  front_shiny: string | null;
}

// Interfaz para la generación IV
export interface GenerationIV {
  "diamond-pearl": DiamondPearl;
  "heartgold-soulsilver": HeartgoldSoulsilver;
  platinum: Platinum;
}

export interface DiamondPearl {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface HeartgoldSoulsilver {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface Platinum {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

// Interfaz para la generación V
export interface GenerationV {
  "black-white": BlackWhite;
}

export interface BlackWhite {
  animated: Animated;
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface Animated {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

// Interfaz para la generación VI
export interface GenerationVI {
  "omegaruby-alphasapphire": OmegarubyAlphasapphire;
  "x-y": XY;
}

export interface OmegarubyAlphasapphire {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface XY {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

// Interfaz para la generación VII
export interface GenerationVII {
  icons: Icons;
  "ultra-sun-ultra-moon": UltraSunUltraMoon;
}

export interface Icons {
  front_default: string | null;
  front_female: string | null;
}

export interface UltraSunUltraMoon {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

// Interfaz para la generación VIII
export interface GenerationVIII {
  icons: Icons2;
}

export interface Icons2 {
  front_default: string | null;
  front_female: string | null;
}

// Interfaz para estadísticas
export interface Stat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

// Interfaz para tipos
export interface Type {
  slot: number;
  type: NamedAPIResource;
}

// Interfaz para tipos pasados
export interface PastType {
  generation: NamedAPIResource;
  types: Type[];
}

