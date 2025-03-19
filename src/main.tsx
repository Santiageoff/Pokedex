import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App"; // Asegúrate de importar App correctamente

// Configurar Apollo Client
const client = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta", // Cambia esto a la URL correcta de la API
  cache: new InMemoryCache(),
});

// Definir las rutas
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pokemon/:id",
    element: <App />,
  },
]);

// Crear el root de React
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
