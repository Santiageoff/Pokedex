import { useQuery, gql } from "@apollo/client";
import "./Title.css"; 

const GET_POKEMON_TYPE = gql`
  query GetPokemonType($id: ID!) {
    pokemon(id: $id) {
      types {
        type {
          name
        }
      }
    }
  }
`;

interface Props {
  content: string;
  backgroundSelected: string;
  pokemonId?: string;
}

export const Title = ({ content, backgroundSelected, pokemonId }: Props) => {
  const { data } = useQuery(GET_POKEMON_TYPE, {
    variables: { id: pokemonId },
    skip: !pokemonId,
  });


  const pokemon = data?.pokemon;

  return (
    <h2 style={{ color: backgroundSelected }} className="title">
      {content}
      {pokemon && <span> ({pokemon.types[0].type.name})</span>}
    </h2>
  );
};
