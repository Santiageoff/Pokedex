import React, { useEffect, useState } from "react";
import { PokeballIconSmall } from "../../assets/pokeball";
import Filters from "../../components/Filters/Filters";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import "./PokemonList.css";

interface PokeType {
  id: number;
  name: string;
}

interface Pokemon {
  id: number;
  name: string;
  types?: PokeType[];
}

interface PokemonListProps {
  page: number;
  perPage: number;
  pokemonsFiltered: Pokemon[];
  isLoading: boolean;
  types: PokeType[];
  filterSelected: PokeType | null;
  changeTypeSelected: (type: PokeType | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({
  pokemonsFiltered,
  isLoading,
  types,
  filterSelected,
  changeTypeSelected,
  searchTerm,
  setSearchTerm,
}) => {
  const [pokemonWithTypes, setPokemonWithTypes] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemonTypes = async () => {
      const pokemonData = await Promise.all(
        pokemonsFiltered.map(async (pokemon) => {
          try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
            const data = await response.json();
            return {
              ...pokemon,
              types: data.types.map((type: any) => ({
                id: type.type.url.split("/").slice(-2, -1)[0],
                name: type.type.name,
              })),
            };
          } catch (error) {
            console.error(`Error fetching types for Pokémon ${pokemon.name}:`, error);
            return {
              ...pokemon,
              types: [],
            };
          }
        })
      );
      setPokemonWithTypes(pokemonData);
    };

    if (pokemonsFiltered.length > 0) {
      fetchPokemonTypes();
    }
  }, [pokemonsFiltered]);

  return (
    <div className="pokemonList">
      <header className="pokemon-header">
        <PokeballIconSmall className="pokeball-icon" />
        <h1 className="pokedex-title">Pokédex</h1>
      </header>

      <div className="filtersWrapper">
        <Filters
          types={types}
          filterSelected={filterSelected}
          changeTypeSelected={changeTypeSelected}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      <div className="pokemonGrid">
        {isLoading ? (
          <p>Cargando Pokémon...</p>
        ) : pokemonWithTypes.length > 0 ? (
          pokemonWithTypes.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              types={pokemon.types ?? []}
            />
          ))
        ) : (
          <p>No se encontraron Pokémon.</p>
        )}
      </div>
    </div>
  );
};

export default PokemonList;