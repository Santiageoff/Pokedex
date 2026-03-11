import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { WeightIcon, HeightIcon } from "../../assets/stats";
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

interface PokemonMove {
  pokemon_v2_move: {
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
  pokemon_v2_pokemonmoves?: PokemonMove[];
  pokemon_v2_pokemonspecy?: {
    pokemon_v2_pokemonspeciesflavortexts: {
      flavor_text: string;
    }[];
  };
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
      pokemon_v2_pokemonmoves(limit: 4) {
        pokemon_v2_move {
          name
        }
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 7}}, limit: 1) {
          flavor_text
        }
      }
    }
  }
`;

const statNameMapping: { [key: string]: string } = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SATK",
  "special-defense": "SDEF",
  speed: "SPD"
};

const PokemonDetail: React.FC = () => {
  const navigate = useNavigate();
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

  const descriptionObj = pokemon.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesflavortexts?.[0];
  const description = descriptionObj ? descriptionObj.flavor_text.replace(/\f/g, ' ') : null;

  return (
    <div className={`detailBg type-${typeClass}`}>
      <button onClick={() => navigate(-1)} className="backButton">
        ← Volver
      </button>

      <div className="detailContainer">
        <div className="detailHeader">
          <img
            src={imageUrl}
            alt={`Imagen de ${pokemon.name}`}
            className="pokemonDetailImage"
            onError={(e) => (e.currentTarget.src = "/fallback.png")}
          />
        </div>

        <div className="detailBody">
          <h1 className="pokemonDetailName">{pokemon.name}</h1>
          <p className="pokemonDetailNumber">#{pokemonId.toString().padStart(3, '0')}</p>

          <div className="pokemonDetailTypes">
            {pokemon.pokemon_v2_pokemontypes.map((type) => {
              const typeName = type.pokemon_v2_type.name;
              return (
                <span key={typeName} className={`detailTypeBadge type-${typeName}`}>
                  {typeName}
                </span>
              );
            })}
          </div>

          {/* Peso y altura */}
          <div className="pokemonWeightHeight">
            <div className="whItem">
              <div className="whIconValue">
                <WeightIcon fill="#212121" />
                <span>{pokemon.weight / 10} kg</span>
              </div>
              <div className="whLabel">Peso</div>
            </div>
            <div className="whDivider"></div>
            <div className="whItem">
              <div className="whIconValue">
                <HeightIcon fill="#212121" />
                <span>{pokemon.height / 10} m</span>
              </div>
              <div className="whLabel">Altura</div>
            </div>
          </div>

          {description && (
            <div className="pokemonDescription">
              <p>{description}</p>
            </div>
          )}

          {/* Estadísticas */}
          <div className="pokemonStatsSection">
            <h3 className="sectionTitle">Estadísticas Base</h3>
            <div className="statsList">
              {pokemon.pokemon_v2_pokemonstats.map((stat) => {
                const rawName = stat.pokemon_v2_stat.name;
                const displayName = statNameMapping[rawName] || rawName.toUpperCase();
                const percentage = Math.min((stat.base_stat / 255) * 100, 100);
                
                return (
                  <div key={rawName} className="statRow">
                    <span className={`statName ${rawName}`}>{displayName}</span>
                    <span className="statNumber">{stat.base_stat.toString().padStart(3, '0')}</span>
                    <div className="statBarContainer">
                      <div
                        className={`statFill ${rawName}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Movimientos */}
          {pokemon.pokemon_v2_pokemonmoves && pokemon.pokemon_v2_pokemonmoves.length > 0 && (
            <div className="pokemonMovesSection">
              <h3 className="sectionTitle">Movimientos principales</h3>
              <div className="movesList">
                {pokemon.pokemon_v2_pokemonmoves.map((move) => (
                  <span key={move.pokemon_v2_move.name} className="moveBadge">
                    {move.pokemon_v2_move.name.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;