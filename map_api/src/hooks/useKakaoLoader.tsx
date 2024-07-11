import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";
// import dotenv from "dotenv";
// dotenv.config();

export default function useKakaoLoader() {
  console.log(process.env.REACT_APP_KAKAO_KEY);
  useKakaoLoaderOrigin({
    appkey: "", // 개발자 키를 넣어주세요.
    libraries: ["clusterer", "drawing", "services"],
  });
}
