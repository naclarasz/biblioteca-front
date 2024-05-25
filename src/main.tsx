import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AppWrapper } from "./shared/components/index.ts";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <AppWrapper>
          <App />
        </AppWrapper>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
