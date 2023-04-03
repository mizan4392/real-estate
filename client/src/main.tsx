import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import HouseContextProvider from "./components/HouseContext.component";
import "./index.css";
import { AppStorContextProvider } from "./context/app-store.context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AppStorContextProvider>
      <HouseContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </HouseContextProvider>
    </AppStorContextProvider>
  </BrowserRouter>
);
