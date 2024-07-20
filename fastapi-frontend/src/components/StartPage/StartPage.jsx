import React from "react";
import PropTypes from "prop-types";

const StartPage = ({ onStart }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        textAlign: "center",
        padding: "0 20px",
      }}
    >
      <h1
        style={{
          fontSize: "2em",
          marginBottom: "20px",
        }}
      >
        한양 라이언 유형 검사
      </h1>
      <div
        style={{
          width: "100%",
          maxWidth: "300px",
          marginBottom: "20px",
        }}
      >
        <img
          src="lionImg.png"
          alt="한양 라이언"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
      <p
        style={{
          fontSize: "1.2em",
          marginBottom: "30px",
        }}
      >
        당신은 어떤 사자인가요?
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
