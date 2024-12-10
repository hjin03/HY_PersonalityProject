import React, { useState } from "react";
import PropTypes from "prop-types";
import ProgressBar from "../ProgressBar/ProgressBar";

function QuestionForm({ questions, onSubmit }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");

  const handleAnswer = () => {
    const newAnswers = [...answers, { content: currentAnswer }];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onSubmit(newAnswers);
    }

    setCurrentAnswer("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ fontSize: "1.5em", marginBottom: "10px" }}>
        질문 {currentQuestionIndex + 1} 🦁
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
        value={currentAnswer}
        onChange={(e) => setCurrentAnswer(e.target.value)}
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
        onClick={handleAnswer}
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
