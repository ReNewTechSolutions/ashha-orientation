import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

// === Import all module components ===
import WelcomeSlide from "./components/WelcomeSlide.jsx";
import CodeOfEthics from "./components/CodeOfEthics.jsx";
import PolicyAcknowledgment from "./components/PolicyAcknowledgment.jsx";
import EmergencyProcedures from "./components/EmergencyProcedures.jsx";
import ReportingAcknowledgment from "./components/ReportingAcknowledgment.jsx";
import OrientationComplete from "./components/OrientationComplete.jsx";

export default function Orientation() {
  const navigate = useNavigate();
  const location = useLocation();

  // === Reset acknowledgments on first session visit (for demo/testing) ===
  useEffect(() => {
    const firstLoad = sessionStorage.getItem("firstVisit");
    if (!firstLoad) {
      localStorage.removeItem("ackWelcome");
      localStorage.removeItem("ackEthics");
      localStorage.removeItem("ackPolicies");
      localStorage.removeItem("ackEmergency");
      localStorage.removeItem("ackReporting");
      sessionStorage.setItem("firstVisit", "true");
    }
  }, []);

  // === Track acknowledgment states ===
  const [ack, setAck] = useState({
    welcome: localStorage.getItem("ackWelcome") === "true",
    ethics: localStorage.getItem("ackEthics") === "true",
    policies: localStorage.getItem("ackPolicies") === "true",
    emergency: localStorage.getItem("ackEmergency") === "true",
    reporting: localStorage.getItem("ackReporting") === "true",
  });

  // === Update and persist acknowledgments ===
  const updateAck = (key, value) => {
    const updated = { ...ack, [key]: value };
    setAck(updated);
    localStorage.setItem(
      `ack${key.charAt(0).toUpperCase() + key.slice(1)}`,
      value ? "true" : "false"
    );
  };

  // === Define orientation training steps ===
  const steps = [
    {
      key: "welcome",
      path: "welcome",
      component: (
        <WelcomeSlide
          ack={ack.welcome}
          setAck={(v) => updateAck("welcome", v)}
        />
      ),
    },
    {
      key: "ethics",
      path: "ethics",
      component: (
        <CodeOfEthics ack={ack.ethics} setAck={(v) => updateAck("ethics", v)} />
      ),
    },
    {
      key: "policies",
      path: "policies",
      component: (
        <PolicyAcknowledgment
          ack={ack.policies}
          setAck={(v) => updateAck("policies", v)}
        />
      ),
    },
    {
      key: "emergency",
      path: "emergency",
      component: (
        <EmergencyProcedures
          ack={ack.emergency}
          setAck={(v) => updateAck("emergency", v)}
        />
      ),
    },
    {
      key: "reporting",
      path: "reporting",
      component: (
        <ReportingAcknowledgment
          ack={ack.reporting}
          setAck={(v) => updateAck("reporting", v)}
        />
      ),
    },
    {
      key: "complete",
      path: "complete",
      component: <OrientationComplete />,
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  // === Restore last visited module (only once, safe) ===
  useEffect(() => {
    const lastVisited = localStorage.getItem("orientation-last");
    const validPaths = steps.map((s) => `/orientation/${s.path}`);
    if (lastVisited && validPaths.includes(lastVisited)) {
      navigate(lastVisited, { replace: true });
    } else {
      navigate("/orientation/welcome", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // === Save current location to localStorage ===
  useEffect(() => {
    if (location.pathname.startsWith("/orientation")) {
      localStorage.setItem("orientation-last", location.pathname);
    }
  }, [location.pathname]);

  // === Track which step is active ===
  useEffect(() => {
    const index = steps.findIndex((s) => location.pathname.includes(s.key));
    setCurrentStep(index >= 0 ? index : 0);
  }, [location.pathname]);

  const totalSteps = steps.length - 1;
  const isComplete = steps[currentStep]?.key === "complete";
  const progressPercent = Math.min(
    100,
    Math.round(((currentStep + 1) / totalSteps) * 100)
  );

  return (
    <div className="orientation-wrapper">
      {/* === Progress Bar === */}
      {!isComplete && (
        <div className="orientation-progress">
          <div
            className="orientation-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* === Routes === */}
      <Routes>
        {/* ✅ Default redirect so /orientation shows something */}
        <Route index element={<Navigate to="welcome" replace />} />
        {steps.map((step) => (
          <Route key={step.key} path={step.path} element={step.component} />
        ))}
      </Routes>
    </div>
  );
}