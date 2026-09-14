import { ChevronRight } from "lucide-react";

// 진행중인 집 + 계약 체크리스트 진행률 카드
export default function OngoingHouseCard({
  houseName = "ㅁㅁ동 ㅇㅇ빌라",
  current = 8,
  total = 12,
}) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="bg-green-50 rounded-2xl p-4 mx-4">
      <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
        진행 중인 집
      </span>
      <p className="font-bold text-lg mt-2">{houseName}</p>

      <div className="bg-white rounded-xl p-3 mt-3">
        <div className="flex justify-between text-sm mb-1">
          <span>계약 체크리스트</span>
          <span className="text-green-500 font-bold">
            {current}/{total}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-green-500 rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <button className="w-full bg-white rounded-xl py-3 mt-3 flex items-center justify-center gap-1 text-sm font-bold">
        체크리스트 바로 가기 <ChevronRight size={16} />
      </button>
    </div>
  );
}
