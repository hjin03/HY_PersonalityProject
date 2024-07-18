import React from "react";

function AnalysisResult({ result, state }) {
  return (
    <div>
      <h2>분석 결과</h2>
      <p>성격 특성: {result.personality_traits}</p>
      <p>핵심 가치: {result.core_values}</p>
      <p>행동 패턴: {result.behavior_patterns}</p>
      <p>미래 제안: {result.future_suggestions}</p>
      <h3>한양 라이언 유형</h3>
      <p>유형: {result.hanyang_lion_type.type}</p>
      <p>설명: {result.hanyang_lion_type.details}</p>
      <img src={result.image_url} alt="한양 라이언" />

      <div>
        <p>총 테스트 횟수: {state.total_tests}</p>
        <p>사자 유형 비율:</p>
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
    </div>
  );
}

export default AnalysisResult;
