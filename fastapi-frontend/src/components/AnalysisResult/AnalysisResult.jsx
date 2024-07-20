import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LionImage from "../LionImage/LionImage";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import ImageDownloadButton from "../DownloadButton/DownloadButton";

const API_URL = "https://opusdeisong.co.kr";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#a4de6c",
  "#d0ed57",
];

function AnalysisResult({ result }) {
  const [state, setState] = useState(null);
  const [error, setError] = useState(null);
  const [userTypeCount, setUserTypeCount] = useState(null);

  useEffect(() => {
    async function getStats() {
      try {
        const response = await axios.get(`${API_URL}/stats`);
        setState(response.data);
        const totalTests = response.data.total_tests;
        const userTypePercentage =
          response.data.lion_type_percentages[result.hanyang_lion_type.type];
        const approximateCount = Math.round(
          totalTests * (userTypePercentage / 100)
        );
        setUserTypeCount(approximateCount);
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

  const chartData = Object.entries(state.lion_type_percentages)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value); // 내림차순 정렬

  return (
    <div className="analysis-container">
      <div className="lion-type-section">
        <h2>한양 라이언 유형</h2>
        <h3>{result.hanyang_lion_type.type}</h3>
        <LionImage imageUrl={result.image_url} />
        {/* <ImageDownloadButton
          imageUrl={result.image_url}
          fileName={`${result.hanyang_lion_type.type}.png`}
        />
        <p className="lion-description">{result.hanyang_lion_type.details}</p> */}
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
        <h2>
          당신은 한양대의 {userTypeCount}번째 {result.hanyang_lion_type.type}
          입니다!
        </h2>
        <p></p>
        <h3>한양대에는 어떤 유형의 사자들이 있을까요?</h3>
        <p>
          현재 총 {state.total_tests}명이 한양 라이언 유형 테스트를
          진행했습니다.
          <br />
          아래의 그래프를 눌러 어떤 유형의 사자들이 있는지 확인해보세요 !{" "}
        </p>
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={145}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value.toFixed(2)}%`, name]}
                labelFormatter={(index) => chartData[index].name}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
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
