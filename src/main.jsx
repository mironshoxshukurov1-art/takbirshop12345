import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Home from "./Components/Home.jsx";
import "./i18n";
import { ThemeProvider } from "./context/ThemeContext.jsx";
createRoot(document.getElementById("root")).render(
 <StrictMode>
    <BrowserRouter>
      <ThemeProvider> {/* Wrap your app */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
