import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Home from "./components/Pages/home";
import App from "./App";
import PokemonDetail from "./components/PokemonDetail/PokemonDetail";

// Configurar Apollo Client
const client = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta", // URL de la API
  cache: new InMemoryCache(),
});

// Definir las rutas
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/pokedex", // 🔹 Cambié "pokemonlist" por "pokedex" para coincidir con el botón en Home.tsx
    element: <App />,
  },
  {
    path: "/pokemon/:id",
    element: <PokemonDetail />,
  },
]);

// Renderizar la aplicación
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);