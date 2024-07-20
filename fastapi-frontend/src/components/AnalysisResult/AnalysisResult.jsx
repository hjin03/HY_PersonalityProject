import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LionImage from "../LionImage/LionImage";
import axios from "axios";

const API_URL = "https://opusdeisong.co.kr";

function AnalysisResult({ result }) {
  const [state, setState] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!state) {
    return <div className="loading-message">통계 정보를 불러오는 중...</div>;
  }

  return (
    <div className="analysis-container">
      <div className="lion-type-section">
        <h2>한양 라이언 유형</h2>
        <h3>{result.hanyang_lion_type.type}</h3>
        <LionImage imageUrl={result.image_url} />
        <p className="lion-description">{result.hanyang_lion_type.details}</p>
      </div>
      <div className="detailed-analysis">
        <h2>상세 분석 결과</h2>
        <div className="analysis-item">
          <h3>성격 특성</h3>
          <p>{result.personality_traits}</p>
        </div>
        <div className="analysis-item">
          <h3>핵심 가치</h3>
          <p>{result.core_values}</p>
        </div>
        <div className="analysis-item">
          <h3>행동 패턴</h3>
          <p>{result.behavior_patterns}</p>
        </div>
        <div className="analysis-item">
          <h3>미래 제안</h3>
          <p>{result.future_suggestions}</p>
        </div>
      </div>
      <div className="test-statistics">
        <h2>테스트 통계</h2>
        <p>총 테스트 횟수: {state.total_tests}</p>
        <h3>사자 유형 비율:</h3>
        <ul>
          {Object.entries(state.lion_type_percentages).map(
            ([type, percentage]) => (
              <li key={type}>
                {type}: {percentage}%
              </li>
            )
          )}
        </ul>
      </div>
      <style jsx>{`
        .analysis-container {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .lion-type-section {
          text-align: center;
          margin-bottom: 30px;
        }
        .lion-description {
          font-style: italic;
          color: #555;
        }
        .detailed-analysis {
          margin-bottom: 30px;
        }
        .analysis-item {
          margin-bottom: 20px;
        }
        h2 {
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 10px;
        }
        h3 {
          color: #34495e;
        }
        .test-statistics {
          background-color: #ecf0f1;
          padding: 20px;
          border-radius: 5px;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
        li {
          margin-bottom: 5px;
        }
        .error-message,
        .loading-message {
          text-align: center;
          color: #e74c3c;
          font-weight: bold;
        }
        .loading-message {
          color: #3498db;
        }
      `}</style>
    </div>
  );
}

AnalysisResult.propTypes = {
  result: PropTypes.shape({
    personality_traits: PropTypes.string.isRequired,
    core_values: PropTypes.string.isRequired,
    behavior_patterns: PropTypes.string.isRequired,
    future_suggestions: PropTypes.string.isRequired,
    hanyang_lion_type: PropTypes.shape({
      type: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
    }).isRequired,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
};

export default AnalysisResult;
