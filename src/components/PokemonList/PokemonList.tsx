import React from "react";
import { PokeballIconSmall } from "../../assets/pokeball";
import Filters from "../Filters/Filters";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./PokemonList.css";

interface PokeType {
  id: number;
  name: string;
}

interface Pokemon {
  id: number;
  name: string;
  types: PokeType[];
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
  page,
  perPage,
  pokemonsFiltered,
  isLoading,
  types,
  filterSelected,
  changeTypeSelected,
  searchTerm,
  setSearchTerm,
}) => {
  const totalPages = Math.ceil(pokemonsFiltered.length / perPage);

  // 🔹 Filtrar Pokémon por nombre y tipo
  const filteredPokemons = pokemonsFiltered.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterSelected
      ? pokemon.types.some((type) => type.id === filterSelected.id)
      : true;
    return matchesSearch && matchesType;
  });

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const pokemonToShow =
    filteredPokemons.length > 0 && page <= totalPages
      ? filteredPokemons.slice(startIndex, endIndex)
      : [];

  if (isLoading) {
    return <div className="loading">Cargando Pokémon...</div>;
  }

  if (filteredPokemons.length === 0 || page > totalPages) {
    return (
      <div className="noResults">
        <p>No se encontraron Pokémon.</p>
        <button
          className="resetButton"
          onClick={() => {
            setSearchTerm(""); // Limpiar búsqueda
            changeTypeSelected(null); // Resetear filtro
          }}
        >
          Volver a la lista principal
        </button>
      </div>
    );
  }

  return (
    <div className="pokemonList">
      <header className="pokemon-header">
        <PokeballIconSmall className="pokeball-icon" />
        <h1 className="pokedex-title">Pokédex</h1>
      </header>

      {/* Filtros */}
      <div className="filtersWrapper">
        <Filters
          types={types}
          filterSelected={filterSelected}
          changeTypeSelected={changeTypeSelected}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Renderizar PokémonCards */}
      <div className="pokemonGrid">
        {pokemonToShow.map(({ id, name, types }) => (
          <PokemonCard
            key={id}
            id={id}
            name={name}
            types={types}
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
