import React from "react";
import "./index.css";
import App from "./App";

import { LangProvider } from "./context/preferencesContext";
import { BasketProvider } from "./context/basketContext";
import { AuthenticationProvider } from "./context/authContext";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { ProductProvider } from "./context/productContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <>
    <ChakraProvider theme={theme}>
      <LangProvider>
        <Router>
          <ProductProvider>
            <AuthenticationProvider>
              <BasketProvider>
                <App />
              </BasketProvider>
            </AuthenticationProvider>
          </ProductProvider>
        </Router>
      </LangProvider>
    </ChakraProvider>
  </>
);
