import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { ThemeProvider } from "@mui/material/styles";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import theme from "./theme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/*" element={<App />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
