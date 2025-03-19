import { useQuery, gql } from "@apollo/client";
import { HeightIcon, WeightIcon } from "../../../assets/stats";
import "./Stats.css"; // ✅ Importación correcta del CSS

const GET_POKEMON_STATS = gql`
  query GetPokemonStats($id: ID!) {
    pokemon(id: $id) {
      weight
      height
    }
  }
`;

interface Props {
  pokemonId: string;
}

export const Stats = ({ pokemonId }: Props) => {
  const { data, loading, error } = useQuery(GET_POKEMON_STATS, {
    variables: { id: pokemonId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const pokemon = data.pokemon;

  return (
    <div className="stats">
      <div className="item">
        <WeightIcon />
        <span>{pokemon?.weight}</span>
        <p>Weight</p>
      </div>
      <div className="item">
        <HeightIcon />
        <span>{pokemon?.height}</span>
        <p>Height</p>
      </div>
    </div>
  );
};
