import { useQuery, gql } from '@apollo/client';
import "./BaseStats.css";

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
  const { data, loading, error } = useQuery(GET_POKEMON_STATS, {
    variables: { id: pokemonId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const pokemon = data.pokemon;
  const maxStat = 255;

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
        const statName = baseStatsNames[name] || name.toUpperCase();

        return (
          <div key={name} className="item">
            <span style={{ color: backgroundSelected }}>{statName}</span>
            <div className="right">
              <p>{base_stat}</p>
              <div className="line">
                <div className="background" style={{ background: backgroundSelected }} />
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
