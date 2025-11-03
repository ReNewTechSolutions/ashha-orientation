import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes.jsx";
import SpeechToggle from "./components/SpeechToggle.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
      <SpeechToggle /> {/* ✅ Always visible across the app */}
    </BrowserRouter>
  </React.StrictMode>
);