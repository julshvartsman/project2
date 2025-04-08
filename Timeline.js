import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Timeline() {
  const navigate = useNavigate();
  const [projectTitle, setProjectTitle] = useState(() => {
    return localStorage.getItem("projectTitle") || "";
  });
  const [steps, setSteps] = useState(() => {
    const savedSteps = localStorage.getItem("steps");
    return savedSteps ? JSON.parse(savedSteps) : [];
  });
  const [newStep, setNewStep] = useState("");
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "default";
  });
  const [apiTemplates, setApiTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  // Save to localStorage whenever project data changes
  useEffect(() => {
    localStorage.setItem("projectTitle", projectTitle);
  }, [projectTitle]);

  useEffect(() => {
    localStorage.setItem("steps", JSON.stringify(steps));
  }, [steps]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    // Fetch project templates when component mounts
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        // Using Trello API to fetch cards from a public board
        const response = await axios.get(
          "https://api.trello.com/1/boards/5f91b99b1a9e1f2c3d4e5f6c/cards?key=YOUR_API_KEY"
        );
        const formattedTemplates = response.data.map((card) => ({
          text: card.name,
          completed: false,
        }));
        setApiTemplates(formattedTemplates);
      } catch (error) {
        console.error("Error fetching templates:", error);
        // Fallback to project management best practices
        setApiTemplates([
          { text: "Create project charter", completed: false },
          { text: "Define project scope and objectives", completed: false },
          { text: "Identify key stakeholders", completed: false },
          { text: "Create project schedule", completed: false },
          { text: "Define success criteria", completed: false },
          { text: "Set up communication plan", completed: false },
          { text: "Create risk management plan", completed: false },
          { text: "Define quality metrics", completed: false },
          { text: "Set up project tracking system", completed: false },
          { text: "Create change management plan", completed: false },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const colorSchemes = {
    default: {
      background: "#fff0f5",
      button: "#ff69b4",
      progress: "#ff69b4",
    },
    modern: {
      background: "#f0f4f8",
      button: "#3b82f6",
      progress: "#3b82f6",
    },
    ocean: {
      background: "#e6f3ff",
      button: "#0077be",
      progress: "#0077be",
    },
    forest: {
      background: "#f0fff0",
      button: "#228b22",
      progress: "#228b22",
    },
    sunset: {
      background: "#fff5e6",
      button: "#ff7f50",
      progress: "#ff7f50",
    },
  };

  const currentTheme = colorSchemes[theme];

  const addStep = (e) => {
    e.preventDefault();
    if (newStep.trim()) {
      const updatedSteps = [...steps, { text: newStep, completed: false }];
      setSteps(updatedSteps);
      setNewStep("");
    }
  };

  const toggleStep = (index) => {
    const updatedSteps = steps.map((step, i) => {
      if (i === index) {
        return { ...step, completed: !step.completed };
      }
      return step;
    });
    setSteps(updatedSteps);
  };

  const deleteStep = (index) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
  };

  const calculateProgress = () => {
    if (steps.length === 0) return 0;
    const completedSteps = steps.filter((step) => step.completed).length;
    return (completedSteps / steps.length) * 100;
  };

  const addTemplate = (template) => {
    setSteps([...steps, template]);
  };

  return (
    <div className="App" style={{ backgroundColor: currentTheme.background }}>
      <div className="container">
        <div className="header-section">
          <button
            className="back-button"
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "transparent",
              border: `2px solid ${currentTheme.button}`,
              color: currentTheme.button,
              padding: "8px 16px",
              borderRadius: "20px",
              cursor: "pointer",
              position: "absolute",
              left: "20px",
              top: "20px",
              transition: "all 0.2s ease",
            }}
          >
            ← Back
          </button>
          <h1>Project Timeline Planner</h1>
        </div>

        <div className="theme-selector">
          <label htmlFor="theme-select">Choose Theme: </label>
          <select
            id="theme-select"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{
              backgroundColor: currentTheme.button,
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px",
            }}
          >
            <option value="default">Pink Theme</option>
            <option value="modern">Modern Theme</option>
            <option value="ocean">Ocean Theme</option>
            <option value="forest">Forest Theme</option>
            <option value="sunset">Sunset Theme</option>
          </select>
        </div>

        <div className="project-title-section">
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="Enter project title"
            className="project-title-input"
          />
        </div>

        <div className="timeline-container">
          <div
            className="timeline-progress"
            style={{
              width: `${calculateProgress()}%`,
              backgroundColor: currentTheme.progress,
            }}
          ></div>
        </div>

        <div className="progress-text">
          Progress: {Math.round(calculateProgress())}%
        </div>

        <form onSubmit={addStep} className="add-step-form">
          <input
            type="text"
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            placeholder="Add a new step"
            className="step-input"
          />
          <button
            type="submit"
            className="add-step-button"
            style={{ backgroundColor: currentTheme.button }}
          >
            Add Step
          </button>
        </form>

        <div className="steps-list">
          {steps.map((step, index) => (
            <div key={index} className="step-item">
              <input
                type="checkbox"
                checked={step.completed}
                onChange={() => toggleStep(index)}
                className="step-checkbox"
                style={{ accentColor: currentTheme.button }}
              />
              <span className={step.completed ? "completed" : ""}>
                {step.text}
              </span>
              <button
                className="delete-button"
                onClick={() => deleteStep(index)}
                style={{
                  backgroundColor: "transparent",
                  color: currentTheme.button,
                  border: `1px solid ${currentTheme.button}`,
                  padding: "4px 8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginLeft: "auto",
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {steps.length > 0 && (
          <div className="templates-section">
            <h3>Suggested Steps</h3>
            {loading ? (
              <div className="loading">Loading suggestions...</div>
            ) : (
              <div className="templates-list">
                {apiTemplates.map((template, index) => (
                  <button
                    key={index}
                    className="template-button"
                    onClick={() => addTemplate(template)}
                    style={{
                      backgroundColor: "transparent",
                      border: `1px solid ${currentTheme.button}`,
                      color: currentTheme.button,
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      margin: "4px",
                    }}
                  >
                    {template.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {steps.length === 0 && (
          <div className="templates-section">
            <h3>Suggested Steps</h3>
            {loading ? (
              <div className="loading">Loading suggestions...</div>
            ) : (
              <div className="templates-list">
                {apiTemplates.map((template, index) => (
                  <button
                    key={index}
                    className="template-button"
                    onClick={() => addTemplate(template)}
                    style={{
                      backgroundColor: "transparent",
                      border: `1px solid ${currentTheme.button}`,
                      color: currentTheme.button,
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      margin: "4px",
                    }}
                  >
                    {template.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Timeline;
