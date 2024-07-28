import styled from "@emotion/styled";
import { useState, useEffect } from "react";

const LoadingSpinnerWithAdsAndDots = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  interface Ads {
    title: string;
    content: string;
  }

  const ads: Ads[] = [
    {
      title: "쿠팡",
      content: "본 검사는 광고를 포함하고 싶습니다.",
    },
    {
      title: "네이버",
      content: "본 검사는 광고를 포함하고 싶습니다.",
    },
    {
      title: "카카오 게임즈",
      content: "본 검사는 광고를 포함하고 싶습니다.",
    },
  ];

  const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 89vh;
    font-family: Arial, sans-serif;
  `;

  const Spinner = styled.div`
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  `;

  const AdContainer = styled.div`
    margin-top: 30px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    max-width: 300px;
    text-align: center;
  `;

  const AdTitle = styled.div`
    color: #333;
    margin-bottom: 10px;
    font-size: 18px;
  `;

  const DotIndicator = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 15px;
  `;
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 3000); // 3초마다 광고 변경
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoadingContainer>
      <Spinner></Spinner>
      <p>결과를 분석하는 중입니다...</p>
      <AdContainer>
        <AdTitle>{ads[currentAdIndex].title}</AdTitle>
        <p>{ads[currentAdIndex].content}</p>
        <p style={{ color: "#3498db" }}>자세히 보기</p>
        <DotIndicator>
          {ads.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentAdIndex ? "active" : ""}`}
            ></div>
          ))}
        </DotIndicator>
      </AdContainer>
      <style>
        {`
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          p {
            font-size: 14px;
            margin-bottom: 10px;
          }
          a {
            display: inline-block;
            margin-top: 5px;
            color: #3498db;
            text-decoration: none;
            font-size: 14px;
          }
          a:hover {
            text-decoration: underline;
          }
          
          .dot {
            width: 8px;
            height: 8px;
            background-color: #ccc;
            border-radius: 50%;
            margin: 0 5px;
            transition: background-color 0.3s ease;
          }
          .dot.active {
            background-color: #3498db;
          }
        `}
      </style>
    </LoadingContainer>
  );
};

export default LoadingSpinnerWithAdsAndDots;
