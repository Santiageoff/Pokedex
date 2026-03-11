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
  weight?: number;
  height?: number;
}

interface PokemonListProps {
  pokemonsFiltered: Pokemon[];
  isLoading: boolean;
  types: PokeType[];
  filterSelected: PokeType | null;
  changeTypeSelected: (type: PokeType | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  page: number; // Agregado para corregir el error
  perPage: number; // Agregado para corregir el error
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
      if (pokemonsFiltered.length === 0) {
        setPokemonWithTypes([]);
        return;
      }

      const pokemonData = await Promise.all(
        pokemonsFiltered.map(async (pokemon) => {
          try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
            if (!response.ok) throw new Error("Error al obtener los datos");

            const data = await response.json();
            return {
              ...pokemon,
              weight: data.weight,
              height: data.height,
              types: data.types.map((type: any) => ({
                id: Number(type.type.url.split("/").slice(-2, -1)[0]),
                name: type.type.name,
              })),
            };
          } catch (error) {
            console.error(`Error fetching types for ${pokemon.name}:`, error);
            return { ...pokemon, types: [] };
          }
        })
      );
      setPokemonWithTypes(pokemonData);
    };

    fetchPokemonTypes();
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
          <div className="loading-container">
            <img src="/Cambio 2 Pikachu.gif" alt="Cargando..." className="loading-gif" />
            <p className="loading-text">Cargando...</p>
          </div>
        ) : pokemonWithTypes.length > 0 ? (
          pokemonWithTypes.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              types={pokemon.types ?? []}
              weight={pokemon.weight}
              height={pokemon.height}
            />
          ))
        ) : (
          <div className="empty-state">
            <img src="/fallback.gif" alt="Not found icon" className="empty-state-icon" />
            <h2 className="empty-state-title">¡Ups! Ningún Pokémon a la vista</h2>
            <p className="empty-state-text">
              No hemos encontrado coincidencias con "{searchTerm}".<br />
              Prueba buscando con otro nombre o ajustando los filtros.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
