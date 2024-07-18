import React, { useState } from "react";

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
    <div>
      <h2>질문 {currentQuestionIndex + 1}</h2>
      <p>{questions[currentQuestionIndex]}</p>
      <textarea placeholder="답변을 입력하세요" />
      <button
        onClick={() => handleAnswer(document.querySelector("textarea").value)}
      >
        {currentQuestionIndex < questions.length - 1 ? "다음" : "제출"}
      </button>
    </div>
  );
}

export default QuestionForm;
