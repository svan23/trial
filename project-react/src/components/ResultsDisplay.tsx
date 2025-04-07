import React, { useState } from "react";

interface ResultsDisplayProps {
  comparisonResult: string | null;
  confidenceScore: number | null;
  onReset: () => void; // Add this callback prop
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  comparisonResult,
  confidenceScore,
  onReset,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!comparisonResult) return null;

  return (
    <div className="mt-4">
      <div
        className={`alert position-relative ${
          confidenceScore && confidenceScore > 85
            ? "alert-success bg-success bg-opacity-10"
            : confidenceScore && confidenceScore > 70
            ? "alert-warning bg-warning bg-opacity-10"
            : "alert-danger bg-danger bg-opacity-10"
        } border rounded-3 p-4 shadow-sm`}
      >
        {/* Close Button */}
        <button
          className="position-absolute top-0 end-0 btn btn-sm text-secondary mt-2 me-2 close-button"
          onClick={onReset}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            padding: 0,
            transition: "all 0.2s ease",
          }}
        >
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="d-flex align-items-center mb-3">
          <i
            className={`bi bi-check-circle-fill me-3 fs-3 ${
              confidenceScore && confidenceScore > 85
                ? "text-success"
                : confidenceScore && confidenceScore > 70
                ? "text-warning"
                : "text-danger"
            }`}
          ></i>
          <div>
            <h4 className="fw-bold mb-1">Analysis Complete</h4>
            <p className="mb-0 fw-medium">{comparisonResult}</p>
          </div>
        </div>

        {confidenceScore && (
          <div className="mt-3">
            <div className="d-flex justify-content-between mb-1">
              <span className="small fw-medium">Match Score</span>
              <span className="small fw-medium">{confidenceScore}%</span>
            </div>
            <div className="progress" style={{ height: "0.5rem" }}>
              <div
                className={`progress-bar ${
                  confidenceScore > 80
                    ? "bg-success"
                    : confidenceScore > 50
                    ? "bg-warning"
                    : "bg-danger"
                }`}
                style={{ width: `${confidenceScore}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="mt-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="btn btn-link text-decoration-none p-0 d-flex align-items-center"
            style={{ color: "#8F87F1" }}
          >
            <i className="bi bi-info-circle me-1"></i>
            {showDetails ? "Hide technical details" : "View technical details"}
          </button>

          {showDetails && (
            <div className="mt-3 p-3 bg-light rounded small">
              <h5 className="fw-medium mb-2">Analysis Details:</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-1">
                  <i className="bi bi-dot me-1"></i> Facial landmarks detected: 128 points
                </li>
                <li className="mb-1">
                  <i className="bi bi-dot me-1"></i> Neural network model: FaceNet v2
                </li>
                <li className="mb-1">
                  <i className="bi bi-dot me-1"></i> Analysis completed in: 1.8 seconds
                </li>
                <li>
                  <i className="bi bi-dot me-1"></i> Key features analyzed: eyes, nose bridge,
                  jawline
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .close-button:hover {
          background: rgba(255,255,255,0.8) !important;
          transform: rotate(90deg);
        }
      `}</style>
    </div>
  );
};

export default ResultsDisplay;
