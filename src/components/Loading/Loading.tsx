import { useState, useEffect } from "react";

const LoadingSpinnerWithAdsAndDots = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  interface Ads {
    title: string;
    content: string;
    link: string;
  }
  const ads: Ads[] = [
    {
      title: "쿠팡",
      content: "본 검사는 광고를 포함하고 싶습니다.",
      link: "#",
    },
    {
      title: "네이버",
      content: "본 검사는 광고를 포함하고 싶습니다.",
      link: "#",
    },
    {
      title: "카카오 게임즈",
      content: "본 검사는 광고를 포함하고 싶습니다.",
      link: "#",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 3000); // 3초마다 광고 변경
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>결과를 분석하는 중입니다...</p>
      <div className="ad-container">
        <h3>{ads[currentAdIndex].title}</h3>
        <p>{ads[currentAdIndex].content}</p>
        <a href={ads[currentAdIndex].link}>자세히 보기</a>
        <div className="dot-indicators">
          {ads.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentAdIndex ? "active" : ""}`}
            ></div>
          ))}
        </div>
      </div>
      <style>
        {`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 89vh;
            font-family: Arial, sans-serif;
          }
          .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .ad-container {
            margin-top: 30px;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            max-width: 300px;
            text-align: center;
          }
          h3 {
            color: #333;
            margin-bottom: 10px;
            font-size: 18px;
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
          .dot-indicators {
            display: flex;
            justify-content: center;
            margin-top: 15px;
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
    </div>
  );
};

export default LoadingSpinnerWithAdsAndDots;
