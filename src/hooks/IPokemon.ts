export interface IPokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other?: {
      dream_world?: {
        front_default?: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  weight: number;
  height: number;
}

export default IPokemon;
