import React from "react";

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
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
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
  return (
    <div>
      <h2>Lista de Pokémon</h2>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filtro por tipo */}
      <select
        value={filterSelected?.id || ""}
        onChange={(e) => {
          const selectedType = types.find(type => type.id === Number(e.target.value)) || null;
          changeTypeSelected(selectedType);
        }}
      >
        <option value="">Todos los tipos</option>
        {types.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>

      {/* Lista de Pokémon */}
      {isLoading ? (
        <p>Cargando Pokémon...</p>
      ) : (
        <ul>
          {pokemonsFiltered.length > 0 ? (
            pokemonsFiltered.map((pokemon) => (
              <li key={pokemon.id}>{pokemon.name}</li>
            ))
          ) : (
            <p>Mostrando todos los Pokémon.</p>
          )}
        </ul>
      )}

      {/* Información de la página */}
      <p>Página {page}, mostrando {perPage} por página.</p>
    </div>
  );
};

export default PokemonList;
