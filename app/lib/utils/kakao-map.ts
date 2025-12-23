import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";

export function useKakaoLoader() {
  const appkey = process.env.NEXT_PUBLIC_KAKAOJSKEY || process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

  if (!appkey) {
    console.error(
      "Kakao Maps API key is not set. Please set NEXT_PUBLIC_KAKAOJSKEY or NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY"
    );
    return { loading: false, error: new Error("API key not set") };
  }

  return useKakaoLoaderOrigin({
    appkey: appkey as string,
    libraries: ["services"],
  });
}
