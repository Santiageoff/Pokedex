import React, { useState } from "react";
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

const Filters: React.FC<FiltersProps> = ({
  types,
  filterSelected,
  changeTypeSelected,
  searchTerm,
  setSearchTerm,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="filtersContainer">
      {/* Campo de búsqueda */}
      <div className="searchContainer">
        <input
          type="text"
          className="searchInput"
          placeholder="Buscar Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Selector de tipo */}
      <div className="dropdown">
        <button
          className="dropdownButton"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {filterSelected ? (
            <>
              <span className={`color-circle ${filterSelected.name.toLowerCase()}`}></span>
              {filterSelected.name}
            </>
          ) : (
            "Seleccione un tipo"
          )}
        </button>

        {isDropdownOpen && (
          <ul className="dropdownMenu">
            <li
              className="dropdownItem"
              onClick={() => {
                changeTypeSelected(null);
                setIsDropdownOpen(false);
              }}
            >
              <span className="color-circle default"></span> Todos los tipos
            </li>
            {types.map((type) => (
              <li
                key={type.id}
                className="dropdownItem"
                onClick={() => {
                  changeTypeSelected(type);
                  setIsDropdownOpen(false);
                }}
              >
                <span className={`color-circle ${type.name.toLowerCase()}`}></span>
                {type.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Filters;
