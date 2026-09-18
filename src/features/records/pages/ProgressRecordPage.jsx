import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import { useHouse } from "../../house/context/HouseContext";
import { isHouseInProgress } from "../../house/utils/checklistStatus";
import RecordHouseCard from "../components/RecordHouseCard";

export default function ProgressRecordPage() {
  const navigate = useNavigate();
  const { houses } = useHouse();

  // 전체 체크리스트가 아직 진행중인(하나라도 시작했지만 다 끝나지 않은) 집
  const progressHouses = houses.filter((house) => isHouseInProgress(house));

  return (
    <div className="max-w-md mx-auto px-4 py-6 pb-24">
      {/* 설명 */}
      <div className="bg-emerald-50 rounded-2xl p-4 mb-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#26D383] text-white flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>

          <div>
            <p className="text-sm font-bold text-gray-900">
              지금 확인하고 있는 집이에요
            </p>

            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              등록한 집의 점검과 계약 진행 상황을 확인해보세요.
            </p>
          </div>
        </div>
      </div>

      {/* 집 목록 */}
      {progressHouses.length > 0 ? (
        <div className="space-y-3">
          {progressHouses.map((house) => {
            const total = Number(house.totalInspection || 0);
            const checked = Number(house.checked || 0);
            const progress =
              total > 0 ? Math.round((checked / total) * 100) : 0;

            return (
              <RecordHouseCard
                key={house.id}
                house={{ ...house, progress }}
                status="progress"
                statusText="진행중"
                onClick={() => navigate(`/houses/${house.id}`)}
              />
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center">
          <FileText className="w-10 h-10 mx-auto text-gray-300" />

          <p className="text-sm font-semibold text-gray-700 mt-4">
            진행중인 집이 없어요
          </p>

          <p className="text-xs text-gray-400 mt-1">
            집을 등록하고 점검을 시작해보세요.
          </p>

          <button
            type="button"
            onClick={() => navigate("/houses")}
            className="mt-5 px-4 py-2.5 rounded-xl bg-[#26D383] text-white text-sm font-semibold"
          >
            집 관리하기
          </button>
        </div>
      )}
    </div>
  );
}
