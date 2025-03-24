import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Pagination from "./components/Pagination/Pagination";
import PokemonList from "./components/PokemonList/PokemonList";
import usePagination from "./hooks/usePagination";
import "./App.css";

interface PokeType {
  id: number;
  name: string;
}

const GET_POKEMON_TYPES = gql`
  query GetPokemonTypes {
    pokemon_v2_type {
      id
      name
    }
  }
`;

const GET_POKEMON_BY_TYPE = gql`
  query GetPokemonByType($typeId: Int!, $limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(
      where: { pokemon_v2_pokemontypes: { type_id: { _eq: $typeId } } }
      limit: $limit
      offset: $offset
    ) {
      id
      name
    }
  }
`;

const GET_ALL_POKEMON = gql`
  query GetAllPokemon($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      id
      name
    }
  }
`;

const GET_POKEMON_BY_NAME = gql`
  query GetPokemonByName($name: String!, $limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(
      where: { name: { _ilike: $name } }
      limit: $limit
      offset: $offset
    ) {
      id
      name
    }
  }
`;

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  const [filterSelected, setFilterSelected] = useState<PokeType | null>(null);
  const { page, nextPage, previousPage, itemsPerPage } = usePagination(12);

  // Usamos debounce para actualizar la búsqueda después de 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Obtener tipos de Pokémon
  const { data: typesData } = useQuery(GET_POKEMON_TYPES);
  const types = typesData?.pokemon_v2_type || [];

  // Definir la consulta adecuada según el filtro y la búsqueda
  let query = GET_ALL_POKEMON;
  let variables: any = { limit: itemsPerPage, offset: (page - 1) * itemsPerPage };

  if (filterSelected) {
    query = GET_POKEMON_BY_TYPE;
    variables = { ...variables, typeId: filterSelected.id };
  } else if (debouncedSearch) {
    query = GET_POKEMON_BY_NAME;
    variables = { ...variables, name: `%${debouncedSearch}%` };
  }

  const { data: pokemonData, loading: loadingPokemons } = useQuery(query, {
    variables,
    skip: filterSelected === null && query === GET_POKEMON_BY_TYPE, // Evita errores cuando no hay tipo seleccionado
  });

  const pokemons = pokemonData?.pokemon_v2_pokemon || [];

  const changeTypeSelected = (type: PokeType | null) => {
    setFilterSelected(type);
  };

  return (
    <div>
      <PokemonList
        page={page}
        perPage={itemsPerPage}
        pokemonsFiltered={pokemons}
        isLoading={loadingPokemons}
        types={types}
        filterSelected={filterSelected}
        changeTypeSelected={changeTypeSelected}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Pagination
        page={page}
        perPage={itemsPerPage}
        nextPage={nextPage}
        previousPage={previousPage}
        maxItems={1000} // Si la API da un total, cámbialo aquí
      />
    </div>
  );
};

export default App;
