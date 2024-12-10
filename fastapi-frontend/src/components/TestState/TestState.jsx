import React from "react";
import PropTypes from "prop-types";

function TestStatistics({ state }) {
  return (
    <div>
      <h3>테스트 통계</h3>
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
  );
}

TestStatistics.propTypes = {
  state: PropTypes.shape({
    total_tests: PropTypes.number.isRequired,
    lion_type_percentages: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default TestStatistics;
