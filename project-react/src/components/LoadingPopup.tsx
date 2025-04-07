import React from "react";

interface LoadingPopupProps {
  message: string;
}

const LoadingPopup: React.FC<LoadingPopupProps> = ({ message }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <div className="loader" style={styles.loader}></div>
        <p style={styles.message}>{message}</p>
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
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    textAlign: "center",
  },
  loader: {
    width: "48px",
    height: "48px",
    border: "5px solid #8F87F1",
    borderBottomColor: "transparent",
    borderRadius: "50%",
    display: "inline-block",
    boxSizing: "border-box",
    animation: "rotation 1s linear infinite",
    marginBottom: "16px",
  },
  message: {
    fontSize: "1.2rem",
    fontWeight: "500",
    color: "#5D4A8A",
  },
};

export default LoadingPopup;