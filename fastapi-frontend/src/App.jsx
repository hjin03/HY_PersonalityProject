import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionForm from "./components/QuestionForm/QuestionForm";
import AnalysisResult from "./components/AnalysisResult/AnalysisResult";

const API_URL = // FastAPI 서버 URL
  function App() {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [state, setState] = useState(null);

    useEffect(() => {
      axios
        .get(`${API_URL}/questions`)
        .then((response) => setQuestions(response.data.questions))
        .catch((error) => console.error("Error fetching questions:", error));
      axios
        .get(`${API_URL}/stats`)
        .then((response) => setState(response.data))
        .catch((error) => console.error("Error fetching states:", error));
      // console.log(questions);
      console.log(state);
    }, []);

    const handleSubmit = (answers) => {
      setIsLoading(true);
      axios
        .post(`${API_URL}/analyze_answers`, { answers })
        .then((response) => {
          setResult(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error submitting answers:", error);
          setIsLoading(false);
        });
    };

    if (isLoading) {
      return <div>분석 중입니다...</div>;
    }

    if (result) {
      return (
        <div>
          <AnalysisResult result={result} state={state} />
        </div>
      );
    }

    return (
      <div>
        <h1>성격 분석 설문</h1>
        {questions.length > 0 ? (
          <QuestionForm questions={questions} onSubmit={handleSubmit} />
        ) : (
          <div>질문을 불러오는 중입니다...</div>
        )}
      </div>
    );
  };

export default App;

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
