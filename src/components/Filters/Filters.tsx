import React from "react";
import "./Filters.css";

interface PokeType {
  id: number;
  name: string;
}

interface FiltersProps {
  types: PokeType[];
  filterSelected: PokeType | null;
  changeTypeSelected: (type: PokeType | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const FiltersIcon = ({ ...props }) => {
  return (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M19.5 9L12 16.5L4.5 9"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Filters: React.FC<FiltersProps> = ({
  types,
  filterSelected,
  changeTypeSelected,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="filtersContainer">
      {/* Campo de búsqueda estilizado */}
      <div className="searchContainer">
        <input
          type="text"
          className="searchInput"
          placeholder="Buscar Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Selector de tipo estilizado */}
      <div className="selectContainer">
        <FiltersIcon className="filterIcon" />
        <select
          className="typeSelect"
          value={filterSelected?.id || ""}
          onChange={(e) =>
            changeTypeSelected(
              e.target.value ? types.find((type) => type.id === Number(e.target.value)) || null : null
            )
          }
        >
          <option value="">Todos los tipos</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
