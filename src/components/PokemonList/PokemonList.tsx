import React from "react";
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
        ) : pokemonsFiltered.length > 0 ? (
          pokemonsFiltered.map((pokemon) => (
            <PokemonCard key={pokemon.id} id={pokemon.id} name={pokemon.name} />
          ))
        ) : (
          <p>No se encontraron Pokémon.</p>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
