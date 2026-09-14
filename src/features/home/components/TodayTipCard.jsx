import { Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

// "오늘의 자취 TIP" 카드
export default function TodayTipCard() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gray-50 rounded-2xl p-4 mx-4">
      <p className="font-bold flex items-center gap-1">
        <Lightbulb size={18} className="text-yellow-400" />
        오늘의 자취 <span className="text-green-500">TIP</span>
      </p>
      <p className="text-sm mt-2 leading-snug">
        계약 전 등기부등본에서 소유자와
        <br />
        근저당권을 꼭 확인하세요
      </p>
      <button
        onClick={() => navigate("/checklist/contract/registry")}
        className="text-sm text-gray-400 mt-2"
      >
        자세히 보기 ›
      </button>

      {/* 커스텀 집 일러스트 자리 (이미지 파일 전달 시 <img>로 교체) */}
      <div className="absolute right-4 bottom-4 w-20 h-20" />
    </div>
  );
}
