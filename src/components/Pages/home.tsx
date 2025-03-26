import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  const getBackgroundImage = () => {
    return "/pokemonInicio.jpg"; // Ruta correcta desde "public/"
  };

  return (
    <main
      className="home-container"
      style={{ backgroundImage: `url(${getBackgroundImage()})` }}
    >
      <h1 className="home-title">Bienvenido a la Pokédex</h1>
      <Link to="/pokedex">
        <button className="home-button" aria-label="Entrar a la Pokédex">
          Entrar a la Pokédex
        </button>
      </Link>
    </main>
  );
};

export default Home;
