import axios from "axios";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingSpinnerWithAdsAndDots from "../components/Loading/Loading";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import LionImage from "../components/LionImage/LionImage";
import styled from "@emotion/styled";
import { COLORS } from "../constants/constants";

const API_URL = process.env.REACT_APP_API_KEY;

export interface AnswerForm {
  answers: Answer[];
}

export interface Answer {
  content: string;
}

interface ResultType {
  personality_traits: string;
  core_values: string;
  behavior_patterns: string;
  future_suggestions: string;
  hanyang_lion_type: HanyangLionType;
  image_url: string;
}

interface HanyangLionType {
  type: string;
  details: string;
}

interface StatType {
  total_tests: number;
  lion_type_percentages: LionTypePercentage;
}

interface LionTypePercentage {
  [key: string]: number; // 인덱스 시그니처
}

interface ChartData {
  name: string;
  value: number;
}

const AnalysisContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const LionTypeSection = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const DetailedAnalysis = styled.div`
  margin-bottom: 30px;
`;

const AnalysisItem = styled.div`
  margin-bottom: 20px;
`;
const ItemM = styled.h2`
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
`;

const ItemS = styled.h3`
  color: #34495e;
`;
const TestStatistics = styled.div`
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 5px;
`;

export default function AnalysisPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<ResultType | null>(null);
  const [stat, setStat] = useState<StatType | null>(null);
  const [userTypeCount, setUserTypeCount] = useState(0);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const location = useLocation();
  const answers = useMemo(
    () => (location.state as AnswerForm) || { answers: [] },
    [location.state]
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const [analysisResult, statsResult] = await Promise.all([
          postAnswers(answers),
          getStats(),
        ]);

        setResult(analysisResult);
        setStat(statsResult);

        if (
          analysisResult &&
          statsResult &&
          analysisResult.hanyang_lion_type &&
          statsResult.lion_type_percentages
        ) {
          const totalTests = statsResult.total_tests;
          const userType = analysisResult.hanyang_lion_type.type;

          const userTypePercentage =
            statsResult.lion_type_percentages[
              userType as keyof LionTypePercentage
            ];
          const approximateCount = Math.round(
            totalTests * (userTypePercentage / 100)
          );
          setUserTypeCount(approximateCount);

          setChartData(
            Object.entries(statsResult.lion_type_percentages)
              .map(([name, value]) => ({ name, value }))
              .sort((a, b) => b.value - a.value)
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [answers]);

  async function postAnswers(answers: AnswerForm): Promise<ResultType> {
    try {
      const response = await axios.post<ResultType>(
        `${API_URL}/analyze_answers`,
        answers
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function getStats(): Promise<StatType> {
    try {
      const response = await axios.get<StatType>(`${API_URL}/stats`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  if (isLoading) {
    return (
      <div>
        <LoadingSpinnerWithAdsAndDots />
      </div>
    );
  }

  if (!result || !stat) {
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <AnalysisContainer>
      <LionTypeSection>
        <ItemM>나의 한양 라이언 유형은?</ItemM>
        <h3>{result.hanyang_lion_type?.type}</h3>
        <LionImage imageUrl={result.image_url} />
        <div style={{ fontSize: "0.5rem", color: "gray" }}>
          꾹 눌러 이미지 저장하기
        </div>
        <p style={{ color: "#555" }}>{result.hanyang_lion_type?.details}</p>
      </LionTypeSection>
      <DetailedAnalysis>
        <ItemM>상세 분석 결과</ItemM>
        <AnalysisItem>
          <ItemS>성격 특성</ItemS>
          <p>{result.personality_traits}</p>
        </AnalysisItem>
        <AnalysisItem>
          <ItemS>핵심 가치</ItemS>
          <p>{result.core_values}</p>
        </AnalysisItem>
        <AnalysisItem>
          <ItemS>행동 패턴</ItemS>
          <p>{result.behavior_patterns}</p>
        </AnalysisItem>
        <AnalysisItem>
          <ItemS>미래 제안</ItemS>
          <p>{result.future_suggestions}</p>
        </AnalysisItem>
      </DetailedAnalysis>
      <TestStatistics>
        <h2>
          당신은 한양대의 {userTypeCount}번째 {result.hanyang_lion_type?.type}
          입니다!
        </h2>
        <div>
          <h3>한양대에는 어떤 유형의 사자들이 있을까요?</h3>
          <p>
            현재 총 {stat.total_tests}명이 한양 라이언 유형 테스트를
            진행했습니다.
          </p>
          <br />
          아래의 그래프를 눌러 어떤 유형의 사자들이 있는지 확인해 보세요!
        </div>
        <Suspense fallback={<div>loading...</div>}>
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
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
                  formatter={(value, name) => [
                    `${(value as number).toFixed(2)}%`,
                    name,
                  ]}
                  labelFormatter={(index) => chartData[index].name}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Suspense>
      </TestStatistics>
    </AnalysisContainer>
  );
}
