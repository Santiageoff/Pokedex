import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
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
    element: <App />, // Página principal
  },
  {
    path: "/pokemon/:id",
    element: <PokemonDetail />, // Página de detalles del Pokémon
  },
]);

// Renderizar la aplicación
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
