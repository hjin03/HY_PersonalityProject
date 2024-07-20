import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionForm from "./components/QuestionForm/QuestionForm";
import AnalysisResult from "./components/AnalysisResult/AnalysisResult";
import StartPage from "./components/StartPage/StartPage";
import LoadingSpinnerWithAdsAndDots from "./components/Loading/Loading";

const API_URL = "https://opusdeisong.co.kr";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [state, setState] = useState(null);

  const handleStart = () => {
    setIsStarted(true);
  };

  useEffect(() => {
    async function getQuestions() {
      try {
        const response = await axios.get(`${API_URL}/questions`);
        setQuestions(response.data.questions);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("질문을 불러오는데 실패했습니다. 다시 시도해 주세요.");
        setIsLoading(false);
      }
    }
    async function getStats() {
      try {
        const response = await axios.get(`${API_URL}/stats`);
        setState(response.data);
      } catch (error) {
        console.error(error);
        setError("통계 정보를 불러오는데 실패했습니다.");
      }
    }
    getStats();

    getQuestions();
  }, []);

  async function postResult(answers) {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/analyze_answers`, {
        answers,
      });
      setResult(response.data);
    } catch (error) {
      console.error(error);
      setError("결과 분석 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (answers) => {
    postResult(answers);
  };

  if (isLoading) {
    return (
      <div>
        <LoadingSpinnerWithAdsAndDots />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>오류 발생</h1>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>다시 시도</button>
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
        <StartPage onStart={handleStart} stats={state.total_tests} />
      ) : (
        <div>
          <br />
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
