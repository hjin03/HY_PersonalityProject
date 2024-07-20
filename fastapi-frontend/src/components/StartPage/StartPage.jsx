import React from "react";
import PropTypes from "prop-types";

const StartPage = ({ onStart }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ fontSize: "2em", marginBottom: "20px" }}>성격 분석 설문</h1>
      <p style={{ fontSize: "1.2em", marginBottom: "30px" }}>
        이 설문을 통해 당신의 성격을 분석해보세요. 시작할 준비가 되셨나요?
      </p>
      <button
        onClick={onStart}
        style={{
          padding: "10px 20px",
          fontSize: "1.2em",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        시작하기
      </button>
    </div>
  );
};

StartPage.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default StartPage;
