import React, { useEffect } from "react";
import { PokeballIconSmall } from "../../../assets/pokeball";
import Filters from "../../Filters/Filters";
import PokemonCard from "../../PokemonCard/PokemonCard";
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
  page,
  perPage,
  pokemonsFiltered = [],
  isLoading,
  types,
  filterSelected,
  changeTypeSelected,
  searchTerm,
  setSearchTerm,
}) => {
  useEffect(() => {
    console.log("Pokémon recibidos:", pokemonsFiltered);
    console.log("Filtro seleccionado:", filterSelected);
    console.log("Término de búsqueda:", searchTerm);
  }, [pokemonsFiltered, filterSelected, searchTerm]);

  const totalPages = Math.ceil(pokemonsFiltered.length / perPage);

  const filteredPokemons = pokemonsFiltered.filter((pokemon) => {
    const lowerCaseName = pokemon.name ? pokemon.name.toLowerCase() : "";
    const searchMatches = lowerCaseName.includes(searchTerm.toLowerCase().trim());

    const typeMatches =
      !filterSelected || (pokemon.types && pokemon.types.some((type) => type.id === filterSelected.id));

    return searchMatches && typeMatches;
  });

  console.log("Pokémon después de filtrar:", filteredPokemons);

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
            setSearchTerm("");
            changeTypeSelected(null);
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
        {pokemonToShow.map(({ id, name, types }) => (
          <PokemonCard key={id} id={id} name={name} types={types ?? []} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
