import React from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function TestStatistics({ state }) {
  // 데이터를 배열로 변환하고 내림차순으로 정렬
  const data = Object.entries(state.lion_type_percentages)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // 색상 배열 정의
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#a4de6c",
    "#d0ed57",
  ];

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3>테스트 통dfs계</h3>
      <p>총 테스트 횟수: {state.total_tests}</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
          <Legend />
          {data.map((entry, index) => (
            <Bar
              key={entry.name}
              dataKey="value"
              fill={colors[index % colors.length]}
              name={entry.name}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

TestStatistics.propTypes = {
  state: PropTypes.shape({
    total_tests: PropTypes.number.isRequired,
    lion_type_percentages: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default TestStatistics;
// import React from "react";
// import PropTypes from "prop-types";

// function TestStatistics({ state }) {
//   return (
//     <div>
//       <h3>테스트 통계</h3>
//       <p>총 테스트 횟수: {state.total_tests}</p>
//       <p>사자 유형 비율:</p>
//       <ul>
//         {Object.entries(state.lion_type_percentages).map(
//           ([type, percentage]) => (
//             <li key={type}>
//               {type}: {percentage}%
//             </li>
//           )
//         )}
//       </ul>
//     </div>
//   );
// }

// TestStatistics.propTypes = {
//   state: PropTypes.shape({
//     total_tests: PropTypes.number.isRequired,
//     lion_type_percentages: PropTypes.objectOf(PropTypes.number).isRequired,
//   }).isRequired,
// };

// export default TestStatistics;
