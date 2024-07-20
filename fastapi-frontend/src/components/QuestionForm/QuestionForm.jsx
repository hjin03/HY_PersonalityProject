import React, { useState } from "react";
import PropTypes from "prop-types";
import { Alert, AlertDescription } from "../Alert/Alert";
import ProgressBar from "../ProgressBar/ProgressBar";

const MAX_CHARS = 1000;

function QuestionForm({ questions, onSubmit }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [showWarning, setShowWarning] = useState(false);

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
  const isNearLimit = charCount >= 900;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ fontSize: "1em", marginBottom: "5px" }}>
        한양 라이언 유형 검사
      </h2>
      <ProgressBar
        currentPage={currentQuestionIndex + 1}
        totalPages={questions.length}
      />

      <p style={{ marginBottom: "20px" }}>
        Q{currentQuestionIndex + 1}. {questions[currentQuestionIndex]}
      </p>
      <textarea
        value={currentAnswer}
        onChange={handleInputChange}
        style={{
          width: "100%",
          minHeight: "100px",
          marginBottom: "10px",
          padding: "10px",
          borderColor: isNearLimit ? "red" : undefined,
          fontSize: "16px", // 텍스트 크기 증가
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

// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import ProgressBar from "../ProgressBar/ProgressBar";

// function QuestionForm({ questions, onSubmit }) {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [currentAnswer, setCurrentAnswer] = useState("");

//   const handleAnswer = () => {
//     const newAnswers = [...answers, { content: currentAnswer }];
//     setAnswers(newAnswers);

//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       onSubmit(newAnswers);
//     }

//     setCurrentAnswer("");
//   };

//   return (
//     <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
//       <h2 style={{ fontSize: "1em", marginBottom: "10px" }}>
//         한양 라이언 유형 검사
//       </h2>
//       <ProgressBar
//         currentPage={currentQuestionIndex + 1}
//         totalPages={questions.length}
//       />
//       <p style={{ fontSize: "1.2em", marginBottom: "20px" }}>
//         {questions[currentQuestionIndex]}
//       </p>
//       <textarea
//         style={{
//           width: "100%",
//           padding: "10px",
//           marginBottom: "10px",
//           borderRadius: "4px",
//           border: "1px solid #ccc",
//         }}
//         placeholder="답변을 입력하세요"
//         rows="4"
//         value={currentAnswer}
//         onChange={(e) => setCurrentAnswer(e.target.value)}
//       />
//       <button
//         style={{
//           padding: "10px 20px",
//           backgroundColor: "#4CAF50",
//           color: "white",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer",
//         }}
//         onClick={handleAnswer}
//       >
//         {currentQuestionIndex < questions.length - 1 ? "다음" : "제출"}
//       </button>

//     </div>
//   );
// }

// QuestionForm.propTypes = {
//   questions: PropTypes.arrayOf(PropTypes.string).isRequired,
//   onSubmit: PropTypes.func.isRequired,
// };

// export default QuestionForm;
// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { Alert, AlertDescription } from "../Alert/Alert";
// import ProgressBar from "../ProgressBar/ProgressBar";
// const MAX_CHARS = 1000;

// function QuestionForm({ questions, onSubmit }) {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState(Array(questions.length).fill(""));
//   const [showWarning, setShowWarning] = useState(false);

//   const handleAnswer = () => {
//     if (answers[currentQuestionIndex].trim() === "") {
//       setShowWarning(true);
//       return;
//     }
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       onSubmit(answers);
//     }
//     setShowWarning(false);
//   };

//   const handlePrevious = () => {
//     if (
//       window.confirm(
//         "이전 페이지로 돌아가면 현재 페이지의 응답이 저장되지 않을 수 있습니다. 계속하시겠습니까?"
//       )
//     ) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const handleInputChange = (e) => {
//     const newValue = e.target.value.slice(0, MAX_CHARS);
//     const newAnswers = [...answers];
//     newAnswers[currentQuestionIndex] = newValue;
//     setAnswers(newAnswers);
//   };

//   const charCount = answers[currentQuestionIndex].length;
//   const isNearLimit = charCount >= 900;

//   return (
//     <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
//       <h2 style={{ fontSize: "1em", marginBottom: "5px" }}>
//         한양 라이언 유형 검사
//       </h2>
//       <ProgressBar
//         currentPage={currentQuestionIndex + 1}
//         totalPages={questions.length}
//       />

//       <p style={{ marginBottom: "20px" }}>
//         Q{currentQuestionIndex + 1}. {questions[currentQuestionIndex]}
//       </p>
//       <textarea
//         value={answers[currentQuestionIndex]}
//         onChange={handleInputChange}
//         style={{
//           width: "100%",
//           minHeight: "100px",
//           marginBottom: "10px",
//           padding: "10px",
//           borderColor: isNearLimit ? "red" : undefined,
//         }}
//       />
//       <p style={{ color: isNearLimit ? "red" : "black", marginBottom: "10px" }}>
//         {charCount}/{MAX_CHARS}자
//       </p>
//       {showWarning && (
//         <Alert variant="destructive" style={{ marginBottom: "10px" }}>
//           <AlertDescription>응답을 입력해주세요.</AlertDescription>
//         </Alert>
//       )}
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         {currentQuestionIndex > 0 && (
//           <button
//             onClick={handlePrevious}
//             style={{
//               padding: "10px 20px",
//               backgroundColor: "#f0f0f0",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             이전
//           </button>
//         )}
//         <button
//           onClick={handleAnswer}
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "#4CAF50",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//             marginLeft: "auto",
//           }}
//         >
//           {currentQuestionIndex < questions.length - 1 ? "다음" : "제출"}
//         </button>
//       </div>
//     </div>
//   );
// }

// QuestionForm.propTypes = {
//   questions: PropTypes.arrayOf(PropTypes.string).isRequired,
//   onSubmit: PropTypes.func.isRequired,
// };

// export default QuestionForm;

// // import React, { useState } from "react";
// // import PropTypes from "prop-types";
// // import ProgressBar from "../ProgressBar/ProgressBar";

// // function QuestionForm({ questions, onSubmit }) {
// //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// //   const [answers, setAnswers] = useState([]);
// //   const [currentAnswer, setCurrentAnswer] = useState("");

// //   const handleAnswer = () => {
// //     const newAnswers = [...answers, { content: currentAnswer }];
// //     setAnswers(newAnswers);

// //     if (currentQuestionIndex < questions.length - 1) {
// //       setCurrentQuestionIndex(currentQuestionIndex + 1);
// //     } else {
// //       onSubmit(newAnswers);
// //     }

// //     setCurrentAnswer("");
// //   };

// //   return (
// //     <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
// //       <h2 style={{ fontSize: "1em", marginBottom: "10px" }}>
// //         한양 라이언 유형 검사
// //       </h2>
// //       <ProgressBar
// //         currentPage={currentQuestionIndex + 1}
// //         totalPages={questions.length}
// //       />
// //       <p style={{ fontSize: "1.2em", marginBottom: "20px" }}>
// //         {questions[currentQuestionIndex]}
// //       </p>
// //       <textarea
// //         style={{
// //           width: "100%",
// //           padding: "10px",
// //           marginBottom: "10px",
// //           borderRadius: "4px",
// //           border: "1px solid #ccc",
// //           fontSize:"1.23"
// //         }}
// //         placeholder="답변을 입력하세요"
// //         rows="4"
// //         value={currentAnswer}
// //         onChange={(e) => setCurrentAnswer(e.target.value)}
// //       />
// //       <button
// //         style={{
// //           padding: "10px 20px",
// //           backgroundColor: "#4CAF50",
// //           color: "white",
// //           border: "none",
// //           borderRadius: "4px",
// //           cursor: "pointer",
// //         }}
// //         onClick={handleAnswer}
// //       >
// //         {currentQuestionIndex < questions.length - 1 ? "다음" : "제출"}
// //       </button>
// //     </div>
// //   );
// // }

// // QuestionForm.propTypes = {
// //   questions: PropTypes.arrayOf(PropTypes.string).isRequired,
// //   onSubmit: PropTypes.func.isRequired,
// // };

// // export default QuestionForm;
