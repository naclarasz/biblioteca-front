import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Center, ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Cadastro, Erro, Login, Menu } from "./features/index.ts";

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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <Center h="calc(100vh)" w="calc(100vw)">
        <RouterProvider router={router} />
      </Center>
    </ChakraProvider>
  </React.StrictMode>
);
