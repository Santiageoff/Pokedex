import React, { useState } from "react";
import { PokeballIconSmall } from "../../assets/pokeball";
import Filters from "../Filters/Filters";
import "./PokemonList.css";

// Definir la interfaz PokeType
interface PokeType {
  id: number;
  name: string;
}

// Definir las props del componente
interface PokemonListProps {
  page: number;
  perPage: number;
  pokemonsFiltered: PokeType[];
  isLoading: boolean;
  types: PokeType[];
  filterSelected: PokeType | null;  // ✅ Corregido
  changeTypeSelected: (type: PokeType | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}


const PokemonList: React.FC<PokemonListProps> = ({ page, perPage, pokemonsFiltered, isLoading, types }) => {
  // Estados para manejar la búsqueda y el filtro
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterSelected, setFilterSelected] = useState<PokeType | null>(null); 

  const totalPages = Math.ceil(pokemonsFiltered.length / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  const pokemonToShow =
    pokemonsFiltered.length > 0 && page <= totalPages
      ? pokemonsFiltered.slice(startIndex, endIndex)
      : [];

  if (isLoading) {
    return <div className="loading">Cargando Pokémon...</div>;
  }

  if (pokemonsFiltered.length === 0 || page > totalPages) {
    return <div className="noResults">No se encontraron Pokémon.</div>;
  }

  return (
    <div className="pokemonList">
      {/* Encabezado con icono y título */}
      <header className="pokemon-header">
        <PokeballIconSmall className="pokeball-icon" />
        <h1 className="pokedex-title">Pokédex</h1>
      </header>

      {/* Contenedor para los filtros (Solo aparece una vez debajo del título) */}
      <div className="filtersWrapper">
        <Filters
          types={types} 
          filterSelected={filterSelected}
          changeTypeSelected={setFilterSelected}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Lista de Pokémon */}
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
