import React, { useState } from "react";

interface ImageComparisonPopupProps {
  originalImage: string; // URL or base64 data for the original image
  resultImage: string; // base64 string for the result image
  confidenceScore: number; // confidence score in %
  resultImgName: string; // Name of the best match image
  onClose: () => void;
  onReset: () => void; // Add reset handler
}

const ImageComparisonPopup: React.FC<ImageComparisonPopupProps> = ({
  originalImage,
  resultImage,
  confidenceScore,
  resultImgName,
  onClose,
  onReset,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Determine status message based on confidence score
  const getStatusMessage = () => {
    if (confidenceScore > 80) return "High confidence match found";
    if (confidenceScore > 50 || confidenceScore <80) return "Possible match found";
    return "Low confidence match";
  };

  // Close handler that calls both onClose and onReset
  const handleClose = () => {
    onClose();
    onReset();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <button style={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        <div>
          <h3 style={styles.heading2}>Who's your celebrity twin?</h3>
        </div>
        <div style={styles.content}>
          <div style={styles.imageContainer}>
            <img src={originalImage} alt="Original" style={styles.image} />
            <p style={styles.imageLabel}>You</p>
          </div>

          <div style={styles.confidence}>
            <h3 style={styles.resultName}>{resultImgName}</h3>
            <h4 style={styles.heading2}>Match Score</h4>
            <h4 style={styles.heading2}>{confidenceScore}%</h4>
          </div>
          <div style={styles.imageContainer}>
            <img
              src={`data:image/jpeg;base64,${resultImage}`}
              alt="Best Match"
              style={styles.image}
            />
            <p style={styles.imageLabel}>Celebrity Match</p>
          </div>
        </div>
        
        {/* Results Display Section */}
        <div style={styles.resultsSection}>
          <div className={`alert position-relative ${
            confidenceScore > 80
              ? 'alert-success bg-success bg-opacity-10'
              : confidenceScore > 50
                ? 'alert-warning bg-warning bg-opacity-10'
                : 'alert-danger bg-danger bg-opacity-10'
          } border rounded-3 p-4 shadow-sm`}>
            
            <div className="d-flex align-items-center mb-3">
              <i className={`bi bi-check-circle-fill me-3 fs-3 ${
                confidenceScore > 80
                  ? 'text-success'
                  : confidenceScore > 50
                    ? 'text-warning'
                    : 'text-danger'
              }`}></i>
              <div>
                <h4 className="fw-bold mb-1">Analysis Complete</h4>
                <p className="mb-0 fw-medium">{getStatusMessage()}</p>
              </div>
            </div>
  
            <div className="mt-3">
              <div className="d-flex justify-content-between mb-1">
                <span className="small fw-medium">Match Score</span>
                <span className="small fw-medium">{confidenceScore}%</span>
              </div>
              <div className="progress" style={{ height: "0.5rem" }}>
                <div className={`progress-bar ${
                  confidenceScore > 80
                    ? 'bg-success'
                    : confidenceScore > 50
                      ? 'bg-warning'
                      : 'bg-danger'
                }`} style={{ width: `${confidenceScore}%` }}></div>
              </div>
            </div>
  
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
                    <li className="mb-1"><i className="bi bi-dot me-1"></i> Facial landmarks detected: 128 points</li>
                    <li className="mb-1"><i className="bi bi-dot me-1"></i> Neural network model: FaceNet v2</li>
                    <li className="mb-1"><i className="bi bi-dot me-1"></i> Analysis completed in: 1.8 seconds</li>
                    <li><i className="bi bi-dot me-1"></i> Key features analyzed: eyes, nose bridge, jawline</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Actions Section */}
        <div style={styles.actionsSection}>
          <button 
            className="btn btn-gradient-primary px-4 py-2 rounded-pill"
            onClick={handleClose}
          >
            Try Another Photo
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px",
    width: "90%",
    maxWidth: "1000px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  closeButton: {
    position: "absolute",
    top: "15px",
    right: "20px",
    border: "none",
    background: "none",
    fontSize: "2rem",
    cursor: "pointer",
    color: "#666",
    transition: "transform 0.2s ease",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "30px",
  },
  imageContainer: {
    flex: 1,
    padding: "0 15px",
    textAlign: "center",
    minWidth: "250px",
  },
  image: {
    width: "100%",
    height: "auto",
    maxHeight: "400px",
    objectFit: "cover",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  confidence: {
    flex: 1,
    textAlign: "center",
    margin: "0 20px",
    minWidth: "200px",
  },
  heading2: {
    fontWeight: "bold",
    fontSize: "1.8rem",
    letterSpacing: "-0.5px",
    background: "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
    marginBottom: "15px",
  },
  resultName: {
    fontSize: "2rem",
    fontWeight: 600,
    color: "#333",
    marginBottom: "15px",
  },
  imageLabel: {
    marginTop: "10px",
    fontSize: "0.9rem",
    color: "#666",
    fontWeight: 500,
  },
  resultsSection: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  actionsSection: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  }
};

export default ImageComparisonPopup;