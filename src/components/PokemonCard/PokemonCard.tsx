import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PokemonCard.css';

// Definición de interfaz para los props
interface PokemonCardProps {
  id: number;
  name: string;
  types: { pokemon_v2_type: { name: string } }[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, types }) => {
  const navigate = useNavigate();
  const typeClass = types[0]?.pokemon_v2_type.name || 'normal'; // Primer tipo del Pokémon o 'normal' por defecto

  const handleClick = () => {
    navigate(`/pokemon/${id}`);
  };

  return (
    <div className={`pokemonCard type-${typeClass}`} onClick={handleClick}>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={name}
        onError={(e) => (e.currentTarget.src = '/fallback.png')} // Imagen alternativa si falla
      />
      <h3>{name}</h3>
      <p>#{id}</p>
      <div className="pokemonTypes">
        {types.map((type) => (
          <span key={type.pokemon_v2_type.name} className="pokemonType">
            {type.pokemon_v2_type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
