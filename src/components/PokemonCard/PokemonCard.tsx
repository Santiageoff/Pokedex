import React from "react";
import { useNavigate } from "react-router-dom";
import "./PokemonCard.css";

interface PokemonCardProps {
  id: number;
  name: string;
  types?: { name: string }[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, types = [] }) => {
  const navigate = useNavigate();

  // Verifica los tipos que se están pasando
  console.log("Types recibidos en PokemonCard:", types);

  // Obtener la clase del primer tipo o "normal" si no tiene
  const typeClass = types.length > 0 ? `type-${types[0].name.toLowerCase()}` : "type-normal";

  const handleClick = () => {
    console.log(`Click en Pokémon #${id} - ${name}`);
    navigate(`/pokemon/${id}`);
  };

  // URL de la imagen en alta resolución
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className={`pokemonCard ${typeClass}`} onClick={handleClick} style={{ cursor: "pointer" }}>
      <img
        src={imageUrl}
        alt={name}
        className="pokemonImage"
        onError={(e) => (e.currentTarget.src = "/fallback.png")}
      />
      <h3 className="pokemonName">{name}</h3>
      <p className="pokemonNumberCard">#{id}</p>
      <div className="pokemonTypes">
        {types.length > 0 ? (
          types.map((type) => (
            <span key={type.name} className={`pokemonType type-${type.name.toLowerCase()}`}>
              {type.name}
            </span>
          ))
        ) : (
          <span className="pokemonType type-normal">Normal</span>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;