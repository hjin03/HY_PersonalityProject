import React, { useState } from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ currentPage, totalPages }) => {
  const progress = (currentPage / totalPages) * 100;

  return (
    <div style={{ marginTop: "50px", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "-30px",
          left: `${progress}%`,
          transform: "translateX(-50%)",
          fontSize: "30px",
          transition: "left 0.5s ease-in-out",
          animation: "lionJump 0.5s infinite alternate",
        }}
      >
        🦁
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#e0e0e0",
          borderRadius: "8px",
          overflow: "hidden",
          height: "20px",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#4CAF50",
            borderRadius: "8px",
            transition: "width 0.5s ease-in-out",
          }}
        />
      </div>
      <div
        style={{
          marginTop: "15px",
          textAlign: "right",
          fontWeight: "bold",
        }}
      >
        {Math.round(progress)}% 완료
      </div>
      <style jsx>{`
        @keyframes lionJump {
          0% {
            top: -30px;
          }
          100% {
            top: -40px;
          }
        }
      `}</style>
    </div>
  );
};

ProgressBar.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

function QuestionForm({ questions, onSubmit }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, { content: answer }];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onSubmit(newAnswers);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ fontSize: "1.5em", marginBottom: "10px" }}>
        질문 {currentQuestionIndex + 1}
      </h2>
      <p style={{ fontSize: "1.2em", marginBottom: "20px" }}>
        {questions[currentQuestionIndex]}
      </p>
      <textarea
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
        placeholder="답변을 입력하세요"
        rows="4"
      />
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => handleAnswer(document.querySelector("textarea").value)}
      >
        {currentQuestionIndex < questions.length - 1 ? "다음" : "제출"}
      </button>
      <ProgressBar
        currentPage={currentQuestionIndex + 1}
        totalPages={questions.length}
      />
    </div>
  );
}

QuestionForm.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default QuestionForm;
