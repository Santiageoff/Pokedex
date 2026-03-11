import React from "react";
import { useNavigate } from "react-router-dom";
import { getTypeMatchups, PokemonType } from "../../utils/typeMatchups";
import "./PokemonCard.css";

interface PokemonCardProps {
  id: number;
  name: string;
  types?: { name: string }[];
  weight?: number;
  height?: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, types = [], weight, height }) => {
  const navigate = useNavigate();

  // Obtener la clase del primer tipo o "normal" si no tiene
  const firstTypeName = types.length > 0 ? types[0].name.toLowerCase() : "normal";
  const typeClass = `type-${firstTypeName}`;

  const matchups = getTypeMatchups(firstTypeName as PokemonType);

  const handleClick = () => {
    navigate(`/pokemon/${id}`);
  };

  // URL de la imagen en alta resolución
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className={`pokemonCard ${typeClass}`} onClick={handleClick}>
      <div className="pokemonImageContainer">
        <p className="pokemonNumberCard">#{id.toString().padStart(3, '0')}</p>
        <img
          src={imageUrl}
          alt={name}
          className="pokemonImage"
          onError={(e) => (e.currentTarget.src = "/fallback.png")}
        />
      </div>
      
      <div className="pokemonDataContainer">
        <h3 className="pokemonName">{name}</h3>
        
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

        {/* Ventajas y Desventajas */}
        <div className="pokemonMatchups">
          <div className="matchupSection">
            <span className="matchupTitle">Es bueno contra</span>
            <div className="matchupIconList">
              {matchups.strongAgainst.slice(0, 3).map(type => (
                <span key={type} className={`matchupTextBadge type-${type}`}>{type}</span>
              ))}
              {matchups.strongAgainst.length === 0 && <span className="noMatchup">-</span>}
            </div>
          </div>
          <div className="matchupDivider"></div>
          <div className="matchupSection">
            <span className="matchupTitle">Es malo contra</span>
            <div className="matchupIconList">
              {matchups.weakAgainst.slice(0, 3).map(type => (
                <span key={type} className={`matchupTextBadge type-${type}`}>{type}</span>
              ))}
               {matchups.weakAgainst.length === 0 && <span className="noMatchup">-</span>}
            </div>
          </div>
        </div>

        {(weight !== undefined && height !== undefined) && (
          <div className="pokemonCardStats">
            <div className="statItem">
              <span className="statValue">{weight / 10} kg</span>
              <span className="statLabel">Peso</span>
            </div>
            <div className="statDivider"></div>
            <div className="statItem">
              <span className="statValue">{height / 10} m</span>
              <span className="statLabel">Altura</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;