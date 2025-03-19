import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App"; // Importa el componente principal
import PokemonDetail from "./components/PokemonDetail/PokemonDetail"; // Importa el componente de detalles

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal con el componente App */}
        <Route path="/" element={<App />} />
        
        {/* Ruta para ver detalles del Pokémon */}
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  ); 
};

export default AppRoutes;
