import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 실제 스크롤은 window가 아니라 393px 모바일 프레임(#app-frame) 내부에서 일어남
    const frame = document.getElementById("app-frame");

    if (frame) {
      frame.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    // 혹시 프레임을 못 찾는 경우(초기 로딩 등)를 대비한 폴백
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}
