import React from "react";
import { PokeballIconSmall } from "../../assets/pokeball";
import Filters from "../Filters/Filters";
import "./PokemonList.css";

interface PokeType {
  id: number;
  name: string;
}

interface PokemonListProps {
  page: number;
  perPage: number;
  pokemonsFiltered: PokeType[];
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

  // 🔹 Aplica el filtro antes de calcular la paginación
  const filteredPokemons = pokemonsFiltered.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterSelected ? pokemon.id === filterSelected.id : true; // Asegúrate de tener el ID correcto
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
        <button className="resetButton" onClick={() => {
          setSearchTerm("");  // Limpiar la búsqueda
          changeTypeSelected(null); // Restablecer el filtro
        }}>
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

      {/* Pasar correctamente las funciones de filtrado a Filters */}
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
        {pokemonToShow.map(({ id, name }) => {
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <div key={id} className="pokemonCard">
              <img src={imageUrl} alt={name} className="pokemonImage" />
              <p className="pokemonName">{name}</p>
              <p className="pokemonNumber">#{id}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonList;
