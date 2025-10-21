

// /src/components/ReportingAcknowledgment.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";

function ReportingAcknowledgment({ ack, setAck }) {
  const items = [
    "I understand the reporting requirements and procedures.",
    "I will report any incidents, accidents, or concerns promptly.",
    "I am aware of the proper channels to report issues.",
    "I agree to maintain accurate and timely documentation.",
  ];

  // Load Lottie script once
  useEffect(() => {
    if (!window.customElements?.get("lottie-player")) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <motion.div
      className="panel"
      style={{
        background: "linear-gradient(180deg, #59595c 0%, #3a3a3d 100%)",
        borderRadius: "16px",
        boxShadow: "0 0 20px rgba(0,0,0,0.25)",
        padding: "32px",
        color: "#fff",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Lottie Header */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <lottie-player
          autoplay
          loop
          mode="normal"
          src="https://cdn.prod.website-files.com/68ce6ff73856b97e4595f20d/68f7e2a4ebd4a1a4d3b783ac_Reporting%20ASHHC.lottie"
          style={{ width: "100%", maxWidth: "600px", height: "300px", margin: "0 auto" }}
        ></lottie-player>
      </div>

      <h2 style={{ textAlign: "center", marginBottom: "16px" }}>Reporting Acknowledgment</h2>

      <ul style={{ listStyle: "disc", paddingLeft: "20px", margin: 0 }}>
        {items.map((x, i) => (
          <motion.li
            key={i}
            custom={i}
            variants={listVariants}
            initial="hidden"
            animate="visible"
            style={{ marginBottom: "8px", lineHeight: "1.5" }}
          >
            {x}
          </motion.li>
        ))}
      </ul>

      {/* Acknowledgment Section */}
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "14px",
          marginTop: "16px",
        }}
      >
        <input
          type="checkbox"
          checked={ack}
          onChange={(e) => setAck(e.target.checked)}
        />
        I have read and agree to the Reporting & Documentation policies.
      </label>
      <div style={{ marginTop: "8px" }}>
        <small>Checking this box is required to complete this section.</small>
      </div>
    </motion.div>
  );
}

export default ReportingAcknowledgment;