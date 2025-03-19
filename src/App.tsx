import React, { useState, useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import { Outlet } from "react-router-dom";
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
  query GetPokemonByType($typeId: Int!) {
    pokemon_v2_pokemon(
      where: { pokemon_v2_pokemontypes: { type_id: { _eq: $typeId } } }
    ) {
      id
      name
    }
  }
`;

const GET_ALL_POKEMON = gql`
  query GetAllPokemon {
    pokemon_v2_pokemon {
      id
      name
    }
  }
`;

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSelected, setFilterSelected] = useState<PokeType | null>(null);

  const { data: typesData } = useQuery(GET_POKEMON_TYPES);
  const types = typesData?.pokemon_v2_type || [];

  const query = filterSelected ? GET_POKEMON_BY_TYPE : GET_ALL_POKEMON;
  const { data: pokemonData, loading: loadingPokemons } = useQuery(query, {
    variables: filterSelected ? { typeId: filterSelected.id } : undefined,
  });

  const pokemons = pokemonData?.pokemon_v2_pokemon || [];

  const pokemonsFiltered = useMemo(() => {
    return pokemons.filter((pokemon: PokeType) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pokemons, searchTerm]);

  const changeTypeSelected = (type: PokeType | null) => {
    setFilterSelected(type);
  };

  const { page, nextPage, previousPage } = usePagination();
  const perPage = 12;

  return (
    <div>
      {/* Solo renderiza la lista de Pokémon con los filtros incluidos dentro */}
      <PokemonList
        page={page}
        perPage={perPage}
        pokemonsFiltered={pokemonsFiltered}
        isLoading={loadingPokemons}
        types={types}
        filterSelected={filterSelected}  
        changeTypeSelected={changeTypeSelected}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />


      {/* Paginación */}
      <Pagination
        page={page}
        perPage={perPage}
        nextPage={nextPage}
        previousPage={previousPage}
        maxItems={pokemonsFiltered.length}
      />
      <Outlet />
    </div>
  );
};

export default App;
