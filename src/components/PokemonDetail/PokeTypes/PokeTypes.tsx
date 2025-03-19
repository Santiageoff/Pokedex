import { useQuery, gql } from "@apollo/client"; // Importamos useQuery y gql
import "./header.css"; // Importamos el CSS correcto

// Definimos la consulta GraphQL
const GET_POKEMON_TYPES = gql`
  query GetPokemonTypes($id: ID!) {
    pokemon(id: $id) {
      types {
        type {
          name
        }
      }
    }
  }
`;

// Definimos la interfaz para el objeto de tipos de Pokémon
interface IType {
  type: {
    name: string;
  };
}

interface Props {
  pokemonId: string; // Definimos la prop del ID del Pokémon
}

export const PokeTypes = ({ pokemonId }: Props) => {
  // Ejecutamos la consulta GraphQL
  const { data, loading, error } = useQuery(GET_POKEMON_TYPES, {
    variables: { id: pokemonId },
  });

  // Si está cargando, mostramos un mensaje
  if (loading) return <p>Loading...</p>;

  // Si hay un error, mostramos un mensaje
  if (error) return <p>Error :(</p>;

  // Obtenemos los datos del Pokémon
  const pokemon = data.pokemon;

  return (
    <div className="types">
      {pokemon?.types.map(({ type }: IType) => {
        // Generamos el nombre de la clase CSS dinámicamente
        const typeClass = `type-${type.name.toLowerCase()}`;

        return (
          <div key={type.name} className={`type ${typeClass}`}>
            {type.name}
          </div>
        );
      })}
    </div>
  );
};
export default PokeTypes;