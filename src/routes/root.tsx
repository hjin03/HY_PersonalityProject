import { useEffect, useState } from "react";
// import { useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_KEY;

interface StatType {
  total_tests: number;
  lion_type_percentages: LionTypePercentage;
}

interface LionTypePercentage {
  [key: string]: number; // 인덱스 시그니처
}

export default function Root() {
  const [stat, setStat] = useState<StatType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const effectRan = useRef(false);
  // useEffect(() => {
  //   if (effectRan.current === false) {
  //     effectRan.current = true; // 두 번째 호출을 방지하기 위해 true로 설정

  //     const getStats = async () => {
  //       setIsLoading(true);
  //       try {
  //         const response = await axios.get(`${API_URL}/stats`);
  //         setStat(response.data);
  //       } catch (error) {
  //         console.error(error);
  //         // setError('불러오기 실패 유유.');
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     getStats();
  //   }
  // }, []);

  useEffect(() => {
    async function getStats() {
      setIsLoading(true);
      try {
        const response = await axios
          .get(`${API_URL}/stats`)
          .then((res) => res.data);
        setStat(response);
      } catch (error) {
        console.error(error);
        //setError("통계 정보를 불러오는데 실패했습니다.");
      }
      setIsLoading(false);
    }
    getStats();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        textAlign: "center",
        padding: "0 20px",
      }}
    >
      <h1
        style={{
          fontSize: "2em",
          marginBottom: "20px",
          color: "#2C3D50",
        }}
      >
        한양 라이언 유형 테스트
      </h1>
      <div
        style={{
          width: "100%",
          maxWidth: "300px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <img
          src="lionImg.png"
          alt="한양 라이언"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
      <p
        style={{
          fontSize: "1.2em",
          marginBottom: "30px",
        }}
      >
        당신은 어떤 사자인가요?
      </p>
      <p style={{ fontSize: "0.8em" }}>
        지금까지 총{" "}
        <span style={{ color: "skyblue" }}>
          {isLoading ? "0" : stat?.total_tests}명
        </span>
        이 테스트를 진행했어요!
      </p>
      <Link to={"/questions"}>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "1.2em",
            backgroundColor: "#3498DB",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          시작하기
        </button>
      </Link>
    </div>
  );
}
