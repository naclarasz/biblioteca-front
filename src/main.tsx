import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Cadastro, Erro, Login } from "./features/index.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Erro />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Erro />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
    errorElement: <Erro />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
