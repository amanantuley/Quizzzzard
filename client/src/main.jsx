import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";
import "./styles/footer.css";
import "./styles/auth.css";

// ✅ Import your global providers
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

// ✅ Create root and render app
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ✅ Wrap Router to enable routing */}
    <BrowserRouter>
      {/* ✅ Wrap context providers globally */}
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
