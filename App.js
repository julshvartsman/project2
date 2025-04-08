import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome";
import Timeline from "./Timeline";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </Router>
  );
}

export default App;
