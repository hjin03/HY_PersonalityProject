import React from "react";
import PropTypes from "prop-types";
import TestStatistics from "../TestState/TestState";

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

      <TestStatistics state={state} />
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
  state: PropTypes.shape({
    total_tests: PropTypes.number.isRequired,
    lion_type_percentages: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default AnalysisResult;
