import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Card, Center, ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Cadastro, Erro, Login, Menu } from "./features/index.ts";
import { MinhaReserva } from "./features/MinhaReserva/views/MinhaReserva.tsx";
import { AppWrapper } from "./shared/components/index.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
  {
    path: "/menu",
    element: <Menu />,
    errorElement: <Erro />,
  },
  {
    path: "/minha-reserva",
    element: <MinhaReserva />,
    errorElement: <Erro />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <AppWrapper>
        <RouterProvider router={router} />
      </AppWrapper>
    </ChakraProvider>
  </React.StrictMode>
);
