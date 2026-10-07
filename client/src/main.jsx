import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import CartContext from "./context/CartContext.jsx";
import ErrorBoundary from "./components/ErrorBoundyary.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <CartContext>
            <App />
          </CartContext>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
);
