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


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  
  useEffect(() => {
    if (searchTerm) {
      setFilterSelected(null);
    }
  }, [searchTerm]);

  // Obtener tipos de Pokémon
  const { data: typesData } = useQuery(GET_POKEMON_TYPES);
  const rawTypes: PokeType[] = typesData?.pokemon_v2_type || [];

  // Filtrar tipos inválidos 
  const filteredTypes = rawTypes.filter((type: PokeType) => 
    !["stellar", "unknown", "shadow"].includes(type.name)
  );


  let query = GET_ALL_POKEMON;
  let variables: { limit: number; offset: number; typeId?: number; name?: string } = {
    limit: itemsPerPage,
    offset: (page - 1) * itemsPerPage,
  };

  if (debouncedSearch) {
    // Si hay una búsqueda, ignoramos el filtro de tipo
    query = GET_POKEMON_BY_NAME;
    variables = { ...variables, name: `%${debouncedSearch}%` };
  } else if (filterSelected) {
    // Si no hay búsqueda, pero sí filtro de tipo, usamos esta consulta
    query = GET_POKEMON_BY_TYPE;
    variables = { ...variables, typeId: filterSelected.id };
  }

  const { data: pokemonData, loading: loadingPokemons } = useQuery(query, {
    variables,
  });

  const pokemons = pokemonData?.pokemon_v2_pokemon || [];

  const changeTypeSelected = (type: PokeType | null) => {
    setFilterSelected(type);
    setSearchTerm(""); 
  };

  return (
    <div>
      <PokemonList
        page={page}
        perPage={itemsPerPage}
        pokemonsFiltered={pokemons}
        isLoading={loadingPokemons}
        types={filteredTypes} 
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
        maxItems={1000} 
      />
    </div>
  );
};

export default App;
