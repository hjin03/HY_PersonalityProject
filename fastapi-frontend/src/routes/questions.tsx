import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar/ProgressBar";

const MAX_CHARS = 300;
const API_URL = "https://opusdeisong.co.kr";

interface Questions {
  questions: string[];
}

export interface AnswerForm {
  answers: Answer[];
}

export interface Answer {
  content: string;
}

export default function QuestionForm() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [questions, setQuestions] = useState<Questions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const [showProgressBar, setShowProgressBar] = useState(false);

  useEffect(() => {
    if (questions) {
      setShowProgressBar(true);
    }
  }, [questions]);
  const convertAnswersToAnswerForm = (answers: string[]): AnswerForm => {
    return {
      answers: answers.map((content) => ({ content })),
    };
  };

  useEffect(() => {
    async function getQuestions() {
      try {
        const res = await axios.get<Questions>(`${API_URL}/questions`);
        setQuestions(res.data);
        setAnswers(new Array(res.data.questions.length).fill(""));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getQuestions();
  }, []);

  useEffect(() => {
    if (questions) {
      setCurrentAnswer(answers[currentQuestionIndex] || "");
    }
  }, [currentQuestionIndex, answers, questions]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [currentQuestionIndex]);

  const onSubmit = (finalAnswers: string[]) => {
    const formattedAnswers = convertAnswersToAnswerForm(finalAnswers);
    console.log("Submitting answers:", formattedAnswers);
    navigate("/analysis", { state: formattedAnswers });
  };

  const handleAnswer = () => {
    if (currentAnswer.trim() === "") {
      setShowWarning(true);
      return;
    }

    setAnswers((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[currentQuestionIndex] = currentAnswer;
      return updatedAnswers;
    });

    if (questions && currentQuestionIndex < questions.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setCurrentAnswer("");
    } else {
      // 마지막 질문일 경우
      setAnswers((prev) => {
        const finalAnswers = [...prev];
        finalAnswers[currentQuestionIndex] = currentAnswer;
        onSubmit(finalAnswers);
        return finalAnswers;
      });
    }

    setShowWarning(false);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setAnswers((prev) => {
        const updatedAnswers = [...prev];
        updatedAnswers[currentQuestionIndex] = currentAnswer;
        return updatedAnswers;
      });
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value.slice(0, MAX_CHARS);
    setCurrentAnswer(newValue);
  };

  if (isLoading) {
    return (
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <h1>로딩중...</h1>
      </div>
    );
  }

  if (!questions) {
    return (
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <h1>질문을 불러오는 데 실패했습니다. 페이지를 새로고침 해주세요.</h1>
      </div>
    );
  }

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
      {showProgressBar && (
        <ProgressBar
          currentPage={currentQuestionIndex + 1}
          totalPages={questions.questions.length}
        />
      )}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          marginBottom: "20px",
          marginTop: "20px",
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
          <p style={{ margin: 0 }}>
            {questions.questions[currentQuestionIndex]}
          </p>
        </div>
      </div>

      <textarea
        ref={textareaRef}
        value={currentAnswer}
        onChange={handleInputChange}
        style={{
          width: "100%",
          minHeight: "100px",
          marginBottom: "10px",
          padding: "10px",
          fontSize: "16px",
        }}
      />
      {showWarning && (
        <p style={{ color: "red", marginBottom: "10px" }}>
          응답을 입력해주세요.
        </p>
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          style={{
            padding: "10px 20px",
            backgroundColor: currentQuestionIndex === 0 ? "#ccc" : "#f0f0f0",
            border: "none",
            borderRadius: "4px",
            cursor: currentQuestionIndex === 0 ? "not-allowed" : "pointer",
          }}
        >
          이전
        </button>
        <button
          onClick={handleAnswer}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3498DB",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {currentQuestionIndex < questions.questions.length - 1
            ? "다음"
            : "제출"}
        </button>
      </div>
    </div>
  );
}
