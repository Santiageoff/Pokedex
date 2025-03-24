import { useQuery, gql } from "@apollo/client";
import "./BaseStats.css"; // Usamos CSS puro

// Definimos la consulta GraphQL
const GET_POKEMON_STATS = gql`
  query GetPokemonStats($id: ID!) {
    pokemon(id: $id) {
      stats {
        base_stat
        stat {
          name
        }
      }
    }
  }
`;

// Definimos la interfaz para el objeto stat
interface IStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface Props {
  pokemonId: string;
  backgroundSelected: string;
}

export const BaseStats = ({ pokemonId, backgroundSelected }: Props) => {
  const { data } = useQuery(GET_POKEMON_STATS, {
    variables: { id: pokemonId },
  });

  const pokemon = data.pokemon;
  const maxStat = 255;

  // Tipamos el objeto baseStatsNames
  const baseStatsNames: { [key: string]: string } = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SATK",
    "special-defense": "SDEF",
    speed: "SPD",
  };

  return (
    <div className="baseStats">
      {pokemon?.stats?.map(({ base_stat, stat: { name } }: IStat) => {
        // Verificamos si el nombre de la estadística existe en baseStatsNames
        const statName = baseStatsNames[name] || name.toUpperCase();

        return (
          <div key={name} className="item">
            <span style={{ color: backgroundSelected }}>{statName}</span>
            <div className="rigth">
              <p>0{base_stat}</p>
              <div className="line">
                <div
                  className="background"
                  style={{ background: backgroundSelected }}
                />
                <div
                  className="secondLine"
                  style={{
                    background: backgroundSelected,
                    opacity: "1",
                    width: `${(base_stat / maxStat) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BaseStats;
