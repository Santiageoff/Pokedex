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

  // URL de la imagen en alta resolución
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  // Clase CSS para el tipo de Pokémon
  const typeClass = pokemon.pokemon_v2_pokemontypes?.[0]?.pokemon_v2_type.name || "normal";

  // Obtener la página de origen (por defecto, vuelve a la página 1)
  const fromPage = location.state?.fromPage || 1;

  return (
    <div className={`bg type-${typeClass}`}>
      <button onClick={() => navigate(`/?page=${fromPage}`)} className="backButton">
        ← Volver
      </button>

      {/* Contenedor con fondo difuminado */}
      <div
        className="info"
        style={{
          backgroundImage: `url('/Fondo 4.jpg')`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        {/* Capa difuminada para no afectar el contenido */}
        <div className="blurOverlay"></div>

        {/* Contenedor de contenido para que no se vea borroso */}
        <div className="infoContent">
          <img
            src={imageUrl}
            alt={`Imagen de ${pokemon.name}`}
            className="pokemonImage"
            onError={(e) => (e.currentTarget.src = "/fallback.png")}
          />

          {/* Nombre del Pokémon */}
          <h1 className="pokemonName">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
          <p className="pokemonNumberDetail">#{id}</p>

          {/* Tipos de Pokémon con color de fondo dinámico */}
          <div className="pokemonTypes">
            {pokemon.pokemon_v2_pokemontypes.map((type) => {
              const typeName = type.pokemon_v2_type.name;
              return (
                <span key={typeName} className={`pokemonType type-${typeName}`}>
                  {typeName}
                </span>
              );
            })}
          </div>

          {/* Estadísticas */}
          <div className="pokemonStats">
            {pokemon.pokemon_v2_pokemonstats.map((stat) => {
              const percentage = (stat.base_stat / 150) * 100;
              return (
                <div key={stat.pokemon_v2_stat.name} className="pokemonStat">
                  <strong>{stat.pokemon_v2_stat.name}:</strong>
                  <div className="statBar">
                    <div
                      className={`statFill ${stat.pokemon_v2_stat.name}`}
                      style={{ width: `${percentage}%` }}
                    >
                      {stat.base_stat}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Peso y altura */}
          <div className="pokemonWeightHeight">
            <div className="weight">Peso: {pokemon.weight / 10} kg</div>
            <div className="height">Altura: {pokemon.height / 10} m</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;