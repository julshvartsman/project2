import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>✨ Project Timeline Planner ✨</h1>
        <p>Plan, track, and achieve your project goals</p>
        <div className="welcome-decoration">
          <span>📋</span>
          <span>📊</span>
          <span>✅</span>
        </div>
        <button className="start-button" onClick={() => navigate("/timeline")}>
          Start Planning →
        </button>
      </div>
    </div>
  );
}

export default Welcome;
