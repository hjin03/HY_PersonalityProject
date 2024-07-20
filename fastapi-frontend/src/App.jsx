import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionForm from "./components/QuestionForm/QuestionForm";
import AnalysisResult from "./components/AnalysisResult/AnalysisResult";
import StartPage from "./components/StartPage/StartPage";
import LoadingSpinnerWithAdsAndDots from "./components/Loading/Loading";

const API_URL = "http://opusdeisong.co.kr";

function App() {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
  };

  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function getQuestion() {
      try {
        const response = await axios.get(`${API_URL}/questions`);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error(error);
      }
    }
    getQuestion();
  }, []);

  async function postResult(answers) {
    try {
      const response = await axios.post(`${API_URL}/analyze_answers`, {
        answers,
      });
      setResult(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (answers) => {
    setIsLoading(true);
    postResult(answers);
  };

  if (isLoading) {
    return (
      <div>
        <h1>My App</h1>
        <LoadingSpinnerWithAdsAndDots />
      </div>
    );
  }

  if (result) {
    return (
      <div>
        <AnalysisResult result={result} />
      </div>
    );
  }

  return (
    <div>
      {!isStarted ? (
        <StartPage onStart={handleStart} />
      ) : (
        <div>
          <br />

          {/* <h1 style={{ textAlign: "center" }}>한양 라이언 테스트</h1> */}
          {questions.length > 0 ? (
            <QuestionForm questions={questions} onSubmit={handleSubmit} />
          ) : (
            <div>질문을 불러오는 중입니다...</div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
