import styled from "@emotion/styled";

interface ProgressProps {
  currentPage: number;
  totalPages: number;
}

const ContainerStyle = styled.div`
  margin-top: 70px;
  position: relative;
`;

const BarContainerStyle = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  height: 20px;
  position: relative;
`;

const TextStyle = styled.div`
  margin-top: 15px;
  text-align: right;
  font-weight: bold;
  color: #2c3d50;
`;
const ProgressBar = ({ currentPage, totalPages }: ProgressProps) => {
  const progress = (currentPage / totalPages) * 100;

  const LionStyle = styled.div`
    position: absolute;
    top: -50px;
    left: ${progress}%;
    font-size: 30px;
    transition: left 0.5s ease-in-out;
    animation: lionJump 0.5s infinite alternate;
    z-index: 10;
  `;

  const BarStyle = styled.div`
    width: ${progress}%;
    height: 100%;
    background-color: #3498db;
    border-radius: 8px;
    transition: width 0.5s ease-in-out;
  `;

  return (
    <ContainerStyle>
      <LionStyle>🦁</LionStyle>
      <BarContainerStyle>
        <BarStyle />
      </BarContainerStyle>
      <TextStyle>{Math.round(progress)}% 완료</TextStyle>
      <style>
        {`
          @keyframes lionJump {
            0% { top: -40px; }
            100% { top: -50px; }
          }
        `}
      </style>
    </ContainerStyle>
  );
};

export default ProgressBar;
