import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ currentPage, totalPages }) => {
  const progress = (currentPage / totalPages) * 100;

  const containerStyle = {
    marginTop: "50px",
    position: "relative",
  };

  const lionStyle = {
    position: "absolute",
    top: "-30px",
    left: `${progress}%`,
    transform: "translateX(-50%)",
    fontSize: "30px",
    transition: "left 0.5s ease-in-out",
    animation: "lionJump 0.5s infinite alternate",
  };

  const barContainerStyle = {
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: "8px",
    overflow: "hidden",
    height: "20px",
    position: "relative",
  };

  const barStyle = {
    width: `${progress}%`,
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: "8px",
    transition: "width 0.5s ease-in-out",
  };

  const textStyle = {
    marginTop: "15px",
    textAlign: "right",
    fontWeight: "bold",
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
            0% { top: -30px; }
            100% { top: -40px; }
          }
        `}
      </style>
    </div>
  );
};

ProgressBar.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default ProgressBar;
