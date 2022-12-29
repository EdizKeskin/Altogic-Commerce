import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { LangProvider } from "./context/langContext";
import { BasketProvider } from "./context/basketContext";
import { AuthenticationProvider } from "./context/authContext";
import { BrowserRouter as Router } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <LangProvider>
        <Router>
        <AuthenticationProvider>
          <BasketProvider>
            <App />
          </BasketProvider>
        </AuthenticationProvider>
        </Router>
      </LangProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
