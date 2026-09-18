import { useNavigate } from "react-router-dom";
import { CheckSquare } from "lucide-react";
import { useHouse } from "../../house/context/HouseContext";
import { isChecklistItemComplete } from "../../house/utils/checklistStatus";
import RecordHouseCard from "../components/RecordHouseCard";

export default function InspectionRecordPage() {
  const navigate = useNavigate();
  const { houses } = useHouse();

  // "현장 점검" 체크리스트가 완료된 집
  const inspectionHouses = houses.filter((house) =>
    isChecklistItemComplete(house, "현장 점검"),
  );

  return (
    <div className="max-w-md mx-auto px-4 py-6 pb-24">
      {/* 설명 */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#26D383] text-white flex items-center justify-center shrink-0">
            <CheckSquare className="w-5 h-5" />
          </div>

          <div>
            <p className="text-sm font-bold text-gray-900">
              점검을 완료한 집이에요
            </p>

            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              현장에서 확인한 집의 기록을 다시 확인할 수 있어요.
            </p>
          </div>
        </div>
      </div>

      {/* 목록 */}
      {inspectionHouses.length > 0 ? (
        <div className="space-y-3">
          {inspectionHouses.map((house) => {
            const total = Number(house.totalInspection || 0);
            const checked = Number(house.checked || 0);
            const progress =
              total > 0 ? Math.round((checked / total) * 100) : 0;

            return (
              <RecordHouseCard
                key={house.id}
                house={{ ...house, progress }}
                status="inspection"
                statusText="점검 완료"
                onClick={() => navigate(`/houses/${house.id}`)}
              />
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center">
          <CheckSquare className="w-10 h-10 mx-auto text-gray-300" />

          <p className="text-sm font-semibold text-gray-700 mt-4">
            점검 완료한 집이 없어요
          </p>

          <p className="text-xs text-gray-400 mt-1">
            체크리스트를 통해 집을 점검해보세요.
          </p>

          <button
            type="button"
            onClick={() => navigate("/checklist")}
            className="mt-5 px-4 py-2.5 rounded-xl bg-[#26D383] text-white text-sm font-semibold"
          >
            체크리스트 보기
          </button>
        </div>
      )}
    </div>
  );
}
