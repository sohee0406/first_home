import { useMemo } from "react";
import { Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

// 현장 점검 및 계약 전 확인 페이지가 모두 포함된 풍부한 제안 목록
const SUGGESTIONS = [
  // 1. 계약 관련 페이지
  {
    title:
      "계약 전 등기부등본을 열람하여 실제 소유자와 근저당 설정을 확인해 보세요.",
    path: "/checklist/contract/registry",
  },
  {
    title:
      "계약 전 최종 확인 페이지에서 놓친 계약 조건이 없는지 점검해 볼까요?",
    path: "/checklist/contract-final",
  },
  {
    title:
      "계약 허브 페이지에서 전체적인 계약 및 서류 준비 단계를 확인해 보세요.",
    path: "/checklist",
  },

  // 2. 현장 점검 공간별 페이지
  {
    title: "현관을 둘러보며 도어락 작동 상태와 신발장 공간을 체크해 보세요.",
    path: "/checklist/on-site/entrance",
  },
  {
    title: "방 내부의 벽지 상태, 바닥 마감, 창문 방향을 꼼꼼히 살펴보세요.",
    path: "/checklist/on-site/room",
  },
  {
    title: "주방 싱크대의 배수 상태와 가스/인덕션 화력을 점검해 볼까요?",
    path: "/checklist/on-site/kitchen",
  },
  {
    title: "욕실 타일의 균열 여부와 수압, 배수구 물 빠짐을 직접 확인해 보세요.",
    path: "/checklist/on-site/bathroom",
  },
  {
    title: "보일러 작동 여부와 기타 공간의 환기 상태를 점검해 보세요.",
    path: "/checklist/on-site/etc",
  },

  // 3. 현장 점검 상세 및 주변 점검 페이지
  {
    title:
      "집 전체의 수압과 물 빠짐이 시원하게 잘 되는지 상세히 체크해 보세요.",
    path: "/checklist/on-site/detail/water",
  },
  {
    title: "채광 상태와 곰팡이 흔적이 없는지 꼼꼼하게 살펴보세요.",
    path: "/checklist/on-site/detail/condition",
  },
  {
    title:
      "집 주변의 편의시설과 치안 상태를 주변 점검 페이지에서 확인해 볼까요?",
    path: "/checklist/around",
  },
];

export default function TodayTipCard() {
  const navigate = useNavigate();

  // 새로고침할 때마다 계약 및 현장 점검 전체 목록 중 하나를 랜덤으로 선택
  const randomTip = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * SUGGESTIONS.length);
    return SUGGESTIONS[randomIndex];
  }, []);

  return (
    <div className="relative bg-gray-50 rounded-2xl p-4 mx-4">
      <p className="font-bold flex items-center gap-1">
        <Lightbulb size={18} className="text-yellow-400" />
        오늘의 자취 <span className="text-yellow-400">TIP</span>
      </p>

      <p className="text-sm mt-2 leading-snug whitespace-pre-line">
        {randomTip.title}
      </p>

      <button
        type="button"
        onClick={() => navigate(randomTip.path)}
        className="text-sm text-gray-400 mt-2 hover:text-gray-600 transition-colors cursor-pointer"
      >
        자세히 보기 ›
      </button>

      {/* 커스텀 집 일러스트 자리 (이미지 파일 전달 시 <img>로 교체) */}
      <div className="absolute right-4 bottom-4 w-20 h-20" />
    </div>
  );
}
