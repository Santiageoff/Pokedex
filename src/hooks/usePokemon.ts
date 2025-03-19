// hooks/usePokemon.ts
import { useState, useEffect } from 'react';

// Definir la interfaz IPokemon directamente aquí
interface IPokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

export const usePokemon = (id: number) => {
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();

        // Asegúrate de que el objeto cumpla con la interfaz IPokemon
        const pokemonData: IPokemon = {
          id: data.id,
          name: data.name,
          sprites: {
            front_default: data.sprites.front_default,
            other: {
              dream_world: {
                front_default: data.sprites.other?.dream_world?.front_default || '', // Usar un valor por defecto si no existe
              },
            },
          },
          types: data.types,
          height: data.height,
          weight: data.weight,
          abilities: data.abilities,
          stats: data.stats,
        };

        setPokemon(pokemonData);
      } catch (err) {
        setError('Error fetching Pokémon data');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  return { pokemon, loading, error };
};

export default usePokemon;