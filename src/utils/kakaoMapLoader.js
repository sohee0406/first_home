let kakaoLoadPromise = null;

export function loadKakaoMap() {
  // 이미 로드되어 있으면 바로 사용
  if (window.kakao?.maps?.services) {
    return Promise.resolve(window.kakao);
  }

  // 여러 컴포넌트에서 동시에 호출해도 한 번만 로드
  if (kakaoLoadPromise) {
    return kakaoLoadPromise;
  }

  kakaoLoadPromise = new Promise((resolve, reject) => {
    const appKey = import.meta.env.VITE_KAKAO_MAP_KEY;

    if (!appKey) {
      reject(
        new Error("VITE_KAKAO_MAP_KEY가 없습니다. .env 파일을 확인해주세요."),
      );
      return;
    }

    const existingScript = document.querySelector(
      'script[data-kakao-map="true"]',
    );

    const finishLoading = () => {
      if (!window.kakao?.maps) {
        reject(new Error("Kakao Maps SDK를 불러오지 못했습니다."));
        return;
      }

      window.kakao.maps.load(() => {
        if (!window.kakao?.maps?.services) {
          reject(
            new Error("Kakao Maps services 라이브러리를 불러오지 못했습니다."),
          );
          return;
        }

        resolve(window.kakao);
      });
    };

    // 이미 script가 존재하는 경우
    if (existingScript) {
      if (window.kakao?.maps?.services) {
        resolve(window.kakao);
        return;
      }

      existingScript.addEventListener("load", finishLoading, {
        once: true,
      });

      existingScript.addEventListener(
        "error",
        () => {
          reject(new Error("Kakao Maps SDK 로드에 실패했습니다."));
        },
        { once: true },
      );

      return;
    }

    // 카카오 지도 SDK 추가
    const script = document.createElement("script");

    script.src =
      `https://dapi.kakao.com/v2/maps/sdk.js` +
      `?appkey=${appKey}` +
      `&autoload=false` +
      `&libraries=services`;

    script.async = true;
    script.dataset.kakaoMap = "true";

    script.onload = finishLoading;

    script.onerror = () => {
      reject(new Error("Kakao Maps SDK 로드에 실패했습니다."));
    };

    document.head.appendChild(script);
  });

  return kakaoLoadPromise;
}
