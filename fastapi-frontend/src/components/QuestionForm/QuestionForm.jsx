import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Alert, AlertDescription } from "../Alert/Alert";
import ProgressBar from "../ProgressBar/ProgressBar";

const MAX_CHARS = 300;

function QuestionForm({ questions, onSubmit }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [currentQuestionIndex]);

  const handleAnswer = () => {
    if (currentAnswer.trim() === "") {
      setShowWarning(true);
      return;
    }

    const newAnswers = [...answers, { content: currentAnswer }];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer("");
    } else {
      onSubmit(newAnswers);
    }

    setShowWarning(false);
  };

  const handlePrevious = () => {
    if (
      window.confirm(
        "이전 페이지로 돌아가면 현재 페이지의 응답이 저장되지 않을 수 있습니다. 계속하시겠습니까?"
      )
    ) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentAnswer(answers[currentQuestionIndex - 1]?.content || "");
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value.slice(0, MAX_CHARS);
    setCurrentAnswer(newValue);
  };

  const charCount = currentAnswer.length;
  const isNearLimit = charCount >= 280;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2
        style={{
          fontSize: "1em",
          marginBottom: "5px",
          borderBottom: "1px solid #3498db",
          paddingBottom: "10px",
        }}
      >
        한양 라이언 유형 검사
      </h2>
      <ProgressBar
        currentPage={currentQuestionIndex + 1}
        totalPages={questions.length}
      />
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          marginBottom: "20px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            flexShrink: 0,
            marginRight: "20px",
            fontWeight: "bold",
            fontSize: "1.2em",
            minWidth: "40px",
          }}
        >
          Q{currentQuestionIndex + 1}.
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0 }}>{questions[currentQuestionIndex]}</p>
        </div>
      </div>

      <textarea
        ref={textareaRef}
        value={currentAnswer}
        onChange={handleInputChange}
        style={{
          width: "100%",
          minHeight: "100px",
          margainBottom: "10px",
          padding: "10px",
          borderColor: isNearLimit ? "red" : undefined,
          fontSize: "16px",
        }}
      />
      <p style={{ color: isNearLimit ? "red" : "black", marginBottom: "10px" }}>
        {charCount}/{MAX_CHARS}자
      </p>
      {showWarning && (
        <Alert variant="destructive" style={{ marginBottom: "10px" }}>
          <AlertDescription>응답을 입력해주세요.</AlertDescription>
        </Alert>
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {currentQuestionIndex > 0 && (
          <button
            onClick={handlePrevious}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f0f0f0",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            이전
          </button>
        )}
        <button
          onClick={handleAnswer}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3498DB",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginLeft: "auto",
          }}
        >
          {currentQuestionIndex < questions.length - 1 ? "다음" : "제출"}
        </button>
      </div>
    </div>
  );
}

QuestionForm.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default QuestionForm;
