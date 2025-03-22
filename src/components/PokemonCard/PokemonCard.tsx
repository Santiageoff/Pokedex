import React from "react";
import { useNavigate } from "react-router-dom";
import "./PokemonCard.css";

// Definición de interfaz para los props
interface PokemonCardProps {
  id: number;
  name: string;
  types?: { name: string }[]; // Hacemos types opcional
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, types = [] }) => {
  const navigate = useNavigate();
  const typeClass = types.length > 0 ? types[0].name : "normal"; // Primer tipo o 'normal'

  const handleClick = () => {
    console.log(`Click en Pokémon #${id} - ${name}`); // Debug para verificar que el evento se activa
    navigate(`/pokemon/${id}`);
  };

  return (
    <div className={`pokemonCard type-${typeClass}`} onClick={handleClick} style={{ cursor: "pointer" }}>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={name}
        className="pokemonImage"
        onError={(e) => (e.currentTarget.src = "/fallback.png")} // Imagen alternativa si falla
      />
      <h3 className="pokemonName">{name}</h3>
      <p className="pokemonNumber">#{id}</p>
      <div className="pokemonTypes">
        {types.map((type) => (
          <span key={type.name} className="pokemonType">
            {type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
