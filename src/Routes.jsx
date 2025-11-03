// ✅ src/Routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// ✅ Corrected imports based on your folder structure
import Dashboard from "./components/Dashboard.jsx";
import OrientationOverview from "./components/OrientationOverview.jsx";
import Orientation from "./Orientation.jsx";
import FinalQuiz from "./components/FinalQuiz.jsx";
import NotFound from "./components/NotFound.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* === Dashboard (Landing Page) === */}
      <Route path="/" element={<Dashboard />} />

      {/* === Orientation Overview === */}
      <Route path="/orientation/overview" element={<OrientationOverview />} />

      {/* === Orientation Flow === */}
      <Route path="/orientation/*" element={<Orientation />} />

      {/* === Final Quiz === */}
      <Route path="/quiz" element={<FinalQuiz />} />

      {/* === Catch-All / 404 Page === */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}