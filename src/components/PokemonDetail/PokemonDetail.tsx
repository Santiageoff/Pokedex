import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import "./PokemonDetail.css";

interface PokemonType {
  pokemon_v2_type: {
    name: string;
  };
}

interface PokemonStat {
  base_stat: number;
  pokemon_v2_stat: {
    name: string;
  };
}

interface PokemonAbility {
  pokemon_v2_ability: {
    name: string;
  };
}

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemon_v2_pokemonstats: PokemonStat[];
  pokemon_v2_pokemontypes: PokemonType[];
  pokemon_v2_pokemonabilities: PokemonAbility[];
}

const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      height
      weight
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
    }
  }
`;

const PokemonDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id?: string }>();

  const pokemonId = id ? parseInt(id) : null;
  if (!pokemonId || isNaN(pokemonId)) {
    return <div className="errorMessage">Error: ID inválido</div>;
  }

  const { data, loading, error } = useQuery<{ pokemon_v2_pokemon_by_pk: PokemonDetails }>(
    GET_POKEMON_DETAILS,
    { variables: { id: pokemonId } }
  );

  if (loading)
    return (
      <div className="loadingContainer">
        <Loader size="50px" color="#fff" />
      </div>
    );

  if (error) {
    return <div className="errorMessage">Error: {error.message}</div>;
  }

  const pokemon = data?.pokemon_v2_pokemon_by_pk;

  if (!pokemon) {
    return <div className="errorMessage">No se encontró el Pokémon</div>;
  }

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  const typeClass = pokemon.pokemon_v2_pokemontypes?.[0]?.pokemon_v2_type.name || "normal";

  // Obtener la página de origen (por defecto, vuelve a la página 1)
  const fromPage = location.state?.fromPage || 1;

  return (
    <div className={`bg type-${typeClass}`}>
      <button onClick={() => navigate(`/?page=${fromPage}`)} className="backButton">
        ← Volver
      </button>

      <div className="info">
        <img
          src={imageUrl}
          alt={`Imagen de ${pokemon.name}`}
          onError={(e) => (e.currentTarget.src = "/fallback.png")}
        />
        <h1>{pokemon.name}</h1>
        <p>#{pokemon.id}</p>

        <div className="pokemonTypes">
          {pokemon.pokemon_v2_pokemontypes.map((type: PokemonType) => (
            <span key={type.pokemon_v2_type.name} className="pokemonType">
              {type.pokemon_v2_type.name}
            </span>
          ))}
        </div>

        <div className="pokemonStats">
          {pokemon.pokemon_v2_pokemonstats.map((stat: PokemonStat) => (
            <div key={stat.pokemon_v2_stat.name} className="pokemonStat">
              <strong>{stat.pokemon_v2_stat.name}:</strong> {stat.base_stat}
            </div>
          ))}
        </div>

        <div className="pokemonWeightHeight">
          <p>Peso: {pokemon.weight / 10} kg</p>
          <p>Altura: {pokemon.height / 10} m</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
