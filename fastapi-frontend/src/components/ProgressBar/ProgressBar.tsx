import React from "react";
import { CSSProperties } from "react";

interface ProgressProps {
  currentPage: number;
  totalPages: number;
}

const ProgressBar: React.FC<ProgressProps> = ({ currentPage, totalPages }) => {
  const progress = (currentPage / totalPages) * 100;

  const containerStyle: CSSProperties = {
    marginTop: "70px",
    position: "relative",
  };

  const lionStyle: CSSProperties = {
    position: "absolute",
    top: "-50px",
    left: `${progress}%`,
    transform: "translateX(-50%)",
    fontSize: "30px",
    transition: "left 0.5s ease-in-out",
    animation: "lionJump 0.5s infinite alternate",
    zIndex: 10,
  };

  const barContainerStyle: CSSProperties = {
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: "8px",
    overflow: "hidden",
    height: "20px",
    position: "relative",
  };

  const barStyle: CSSProperties = {
    width: `${progress}%`,
    height: "100%",
    backgroundColor: "#3498DB",
    borderRadius: "8px",
    transition: "width 0.5s ease-in-out",
  };

  const textStyle: CSSProperties = {
    marginTop: "15px",
    textAlign: "right",
    fontWeight: "bold",
    color: "#2C3D50",
  };

  return (
    <div style={containerStyle}>
      <div style={lionStyle}>🦁</div>
      <div style={barContainerStyle}>
        <div style={barStyle} />
      </div>
      <div style={textStyle}>{Math.round(progress)}% 완료</div>
      <style>
        {`
          @keyframes lionJump {
            0% { top: -40px; }
            100% { top: -50px; }
          }
        `}
      </style>
    </div>
  );
};

export default ProgressBar;
