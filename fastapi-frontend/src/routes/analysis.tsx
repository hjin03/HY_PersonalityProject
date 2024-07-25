import axios from "axios";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingSpinnerWithAdsAndDots from "../components/Loading/Loading";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

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
  "성취 지향 사자": number;
  "도전적 성취 사자": number;
  "자율 성취 사자": number;
  "자율 탐구 사자": number;
  "독립적 성취 사자": number;
  "즐거운 배려 사자": number;
  "모험가 사자": number;
  "창의적 자유 사자": number;
  "자유로운 탐험 사자": number;
  "전통 수호 사자": number;
  "사회 정의 사자": number;
  "보편적 자율 사자": number;
  "탐색 중인 사자": number;
  "권력 추구 사자": number;
  "규범 준수 사자": number;
  "다재다능한 사자": number;
  "탐색하는 사자": number;
  "균형 잡힌 탐구 사자": number;
  "유연한 중립 사자": number;
  "행복 나눔 사자": number;
  "배려하는 성취 사자": number;
  "즐거움 탐험 사자": number;
  "조화로운 성취 사자": number;
  [key: string]: number; // 인덱스 시그니처
}

interface ChartData {
  name: string;
  value: number;
}

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

        console.log(analysisResult);
        console.log(statsResult);

        if (
          analysisResult &&
          statsResult &&
          analysisResult.hanyang_lion_type &&
          statsResult.lion_type_percentages
        ) {
          const totalTests = statsResult.total_tests;
          const userType = analysisResult.hanyang_lion_type.type;

          if (Object.hasOwn(statsResult.lion_type_percentages, userType)) {
            const userTypePercentage =
              statsResult.lion_type_percentages[
                userType as keyof LionTypePercentage
              ];
            const approximateCount = Math.round(
              totalTests * (userTypePercentage / 100)
            );
            setUserTypeCount(approximateCount);
          } else {
            console.error(
              `User type "${userType}" not found in lion_type_percentages`
            );
          }

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
    console.log("postAnswers");
    console.log("Post Start");
    console.log(answers);
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
    console.log("Get Start");
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

  console.log(stat);

  return (
    <div>
      <div>
        <div>
          <h2>나의 한양 라이언 유형은?</h2>
          <h3>{result.hanyang_lion_type?.type}</h3>
          <p>{result.hanyang_lion_type?.details}</p>
        </div>
        <div>
          <h3>성격 특성</h3>
          <p>{result.personality_traits}</p>
        </div>
        <div>
          <h3>핵심 가치</h3>
          <p>{result.core_values}</p>
        </div>
        <div>
          <h3>행동 패턴</h3>
          <p>{result.behavior_patterns}</p>
        </div>
        <div>
          <h3>미래 제안</h3>
          <p>{result.future_suggestions}</p>
        </div>
      </div>
      <div>
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
      </div>
    </div>
  );
}

// import axios from "axios";
// import { Suspense, useEffect, useMemo, useState } from "react";
// import { useLocation } from "react-router-dom";
// import LoadingSpinnerWithAdsAndDots from "../components/Loading/Loading";
// import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
// import { log } from "console";
// const API_URL = "https://opusdeisong.co.kr";

// const COLORS = [
//   "#0088FE",
//   "#00C49F",
//   "#FFBB28",
//   "#FF8042",
//   "#8884d8",
//   "#82ca9d",
//   "#a4de6c",
//   "#d0ed57",
// ];

// export interface AnswerForm {
//   answers: Answer[];
// }

// export interface Answer {
//   content: string;
// }

// interface ResultType {
//   personality_traits: string;
//   core_values: string;
//   behavior_patterns: string;
//   future_suggestions: string;
//   hanyang_lion_type: HanyangLionType;
//   image_url: string;
// }
// interface HanyangLionType {
//   type: string;
//   details: string;
// }

// interface StatType {
//   total_tests: number;
//   lion_type_percentages: LionTypePercentage;
// }
// interface LionTypePercentage {
//   "성취 지향 사자": number;
//   "도전적 성취 사자": number;
//   "자율 성취 사자": number;
//   "자율 탐구 사자": number;
//   "독립적 성취 사자": number;
//   "즐거운 배려 사자": number;
//   "모험가 사자": number;
//   "창의적 자유 사자": number;
//   "자유로운 탐험 사자": number;
//   "전통 수호 사자": number;
//   "사회 정의 사자": number;
//   "보편적 자율 사자": number;
//   "탐색 중인 사자": number;
//   "권력 추구 사자": number;
//   "규범 준수 사자": number;
//   "다재다능한 사자": number;
//   "탐색하는 사자": number;
//   "균형 잡힌 탐구 사자": number;
//   "유연한 중립 사자": number;
//   "행복 나눔 사자": number;
//   "배려하는 성취 사자": number;
//   "즐거움 탐험 사자": number;
//   "조화로운 성취 사자": number;
// }

// interface ChartData {
//   name: string;
//   value: any;
// }

// export default function AnalysisPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [result, setResult] = useState<ResultType>();
//   const [stat, setStat] = useState<StatType>();
//   const [userTypeCount, setUserTypeCount] = useState(0);
//   const [chartData, setChartData] = useState<ChartData[]>();
//   const location = useLocation();
//   const answers: Answer = useMemo(() => location.state || {}, [location.state]);

//   useEffect(() => {
//     setIsLoading(true);
//     async function postAnswers(answers: Answer) {
//       console.log("postAnswers");
//       console.log("Post Start");
//       console.log(answers);
//       try {
//         const response = await axios
//           .post(`${API_URL}/analyze_answers`, answers)
//           .then((res) => res.data);
//         setResult(response);
//       } catch (error) {
//         console.error(error);
//         //setError("통계 정보를 불러오는데 실패했습니다.");
//       }
//     }
//     async function getStats() {
//       console.log("Get Start");
//       try {
//         const response = await axios
//           .get(`${API_URL}/stats`)
//           .then((res) => res.data);
//         setStat(response);
//         const totalTests = response.data.total_tests;
//         const userTypePercentage =
//           response.data.lion_type_percentages[result!.hanyang_lion_type.type];
//         const approximateCount = Math.round(
//           totalTests * (userTypePercentage / 100)
//         );
//         setUserTypeCount(approximateCount);
//       } catch (error) {
//         console.error(error);
//         //setError("통계 정보를 불러오는데 실패했습니다.");
//       }
//       setIsLoading(false);
//     }
//     postAnswers(answers);
//     getStats();
//   }, []);

//   // useEffect(() => {
//   //   setChartData(
//   //     Object.entries(stat!.lion_type_percentages)
//   //       .map(([name, value]) => ({ name, value }))
//   //       .sort((a, b) => b.value - a.value)
//   //   );
//   // }, [stat]);

//   if (isLoading) {
//     return (
//       <div>
//         <LoadingSpinnerWithAdsAndDots />
//       </div>
//     );
//   }

//   console.log(stat);

//   return (
//     <div>
//       <div>
//         <div>
//           <h2>나의 한양 라이언 유형은?</h2>
//           <h3>{result?.hanyang_lion_type?.type}</h3>
//           <p>{result?.hanyang_lion_type?.details}</p>
//         </div>
//         <div>
//           <h3>성격 특성</h3>
//           <p>{result?.personality_traits}</p>
//         </div>
//         <div>
//           <h3>핵심 가치</h3>
//           <p>{result?.core_values}</p>
//         </div>
//         <div>
//           <h3>행동 패턴</h3>
//           <p>{result?.behavior_patterns}</p>
//         </div>
//         <div>
//           <h3>미래 제안</h3>
//           <p>{result?.future_suggestions}</p>
//         </div>
//       </div>
//       <div>
//         <h2>
//           당신은 항양대의 {userTypeCount}번째 {result?.hanyang_lion_type.type}
//           입니다!
//         </h2>
//         <div>
//           <h3>한양대에는 어떤 유형의 사자들이 있을까요?</h3>
//           <p>
//             현재 총 {stat?.total_tests}명이 한양 라이언 유형 테스트를
//             진행했습니다.
//           </p>
//           <br />
//           아래의 그래프를 눌러 어떤 유형의 사자들이 있는지 확인해 보세요!
//         </div>
//         {/* <Suspense fallback={<div>loading...</div>}>
//           <div style={{ width: "100%", height: 400 }}>
//             <ResponsiveContainer>
//               <PieChart>
//                 <Pie
//                   data={chartData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={140}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {chartData?.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   formatter={(value, name) => [
//                     `${(value as number).toFixed(2)}%`,
//                     name,
//                   ]}
//                   labelFormatter={(index) => chartData![index].name}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </Suspense> */}
//       </div>
//     </div>
//   );
// }
// // return (
// //     <div>
// //       {answers.map((q) => (
// //         <li>{q}</li>
// //       ))}
// //     </div>
// //   );
