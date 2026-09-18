import { ClipboardList, ChevronRight, CheckSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

// "첫 자취, 뭘 확인해야 할까요?" 안내 카드
export default function FirstMoveGuideCard() {
  const navigate = useNavigate();

  return (
    <div className=" rounded-2xl px-4 flex flex-col ">
      {/* 첫 자취 안내 카드 */}
      <div
        onClick={() => navigate("/checklist")}
        className="
          border
          border-gray-100
          rounded-2xl
          p-4
          
           shadow-[0_1px_3px_rgba(0,0,0,0.03)]
          cursor-pointer
        "
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="font-bold text-gray-900 text-sm">
              첫 자취, 뭘 확인해야 할까요?
            </p>

            <p className="text-xs text-gray-500 mt-1">
              집을 구하기 전, 미리 확인해보세요
            </p>
          </div>

          <ClipboardList className="w-6 h-6 text-[#26D383]" />
        </div>

        <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3 mt-3">
          <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <CheckSquare className="w-4 h-4 text-[#26D383]" />
            체크리스트 둘러보기
          </span>

          <ChevronRight className="w-4 h-4 text-[#26D383]" />
        </div>
      </div>
    </div>
  );
}
