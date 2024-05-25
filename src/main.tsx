import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Cadastro,
  DadosPessoais,
  Emprestimos,
  Erro,
  Login,
  Menu,
} from "./features/index.ts";
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
  {
    path: "/dados-pessoais",
    element: <DadosPessoais />,
    errorElement: <Erro />,
  },
  {
    path: "/emprestimos",
    element: <Emprestimos />,
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
