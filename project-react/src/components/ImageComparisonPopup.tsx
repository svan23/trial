import React from "react";

interface ImageComparisonPopupProps {
  originalImage: string; // URL or base64 data for the original image
  resultImage: string; // base64 string for the result image
  confidenceScore: number; // confidence score in %
  resultImgName: string; // Name of the best match image
  onClose: () => void;
}

const ImageComparisonPopup: React.FC<ImageComparisonPopupProps> = ({
  originalImage,
  resultImage,
  confidenceScore,
  resultImgName,
  onClose,
}) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <button style={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div>
          <h3 style={styles.heading2}>Who's your celebrity twin?</h3>
        </div>
        <div style={styles.content}>
          <div style={styles.imageContainer}>
            <img src={originalImage} alt="Original" style={styles.image} />
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
          </div>
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
    borderRadius: "8px",
    padding: "20px",
    width: "90%",
    maxWidth: "1000px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "15px",
    border: "none",
    background: "none",
    fontSize: "2rem",
    cursor: "pointer",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    padding: "0 10px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "500px", // Fixed height ensures both photos appear the same size
    objectFit: "fill",
    borderRadius: "4px",
  },
  confidence: {
    flex: 1,
    textAlign: "center",
    margin: "0 35x",
  },
  // Updated heading style to mimic the homepage text
  heading: {
    fontWeight: "bold",
    fontSize: "2.5rem", // Adjust to match display-5 sizing if necessary
    letterSpacing: "-0.5px",
    background: "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "20px",
  },
  heading2: {
    fontWeight: "bold",
    fontSize: "2rem", // Adjust to match display-5 sizing if necessary
    letterSpacing: "-0.5px",
    background: "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "20px",
  },
  score: {
    fontSize: "2rem",
    fontWeight: "bold",
    margin: "10px 0 0",
    color: "black",
  },
  resultName: {
    fontSize: "2rem",
    fontWeight: 600,
    color: "black",
    marginBottom: "15px",
  },
};

export default ImageComparisonPopup;
