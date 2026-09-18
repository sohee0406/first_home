import { useNavigate } from "react-router-dom";
import { FileCheck } from "lucide-react";
import { useHouse } from "../../house/context/HouseContext";
import { isChecklistItemComplete } from "../../house/utils/checklistStatus";
import RecordHouseCard from "../components/RecordHouseCard";

export default function ContractRecordPage() {
  const navigate = useNavigate();
  const { houses } = useHouse();

  // "계약 전" 체크리스트가 완료된 집
  const contractHouses = houses.filter((house) =>
    isChecklistItemComplete(house, "계약 전"),
  );

  return (
    <div className="max-w-md mx-auto px-4 py-6 pb-24">
      {/* 설명 */}
      <div className="bg-emerald-50 rounded-2xl p-4 mb-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#26D383] text-white flex items-center justify-center shrink-0">
            <FileCheck className="w-5 h-5" />
          </div>

          <div>
            <p className="text-sm font-bold text-gray-900">
              계약을 완료한 집이에요
            </p>

            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              계약한 집의 정보를 확인하고 입주 준비를 이어갈 수 있어요.
            </p>
          </div>
        </div>
      </div>

      {/* 목록 */}
      {contractHouses.length > 0 ? (
        <div className="space-y-3">
          {contractHouses.map((house) => {
            const total = Number(house.totalInspection || 0);
            const checked = Number(house.checked || 0);
            const progress =
              total > 0 ? Math.round((checked / total) * 100) : 0;

            return (
              <RecordHouseCard
                key={house.id}
                house={{ ...house, progress }}
                status="contract"
                statusText="계약 완료"
                onClick={() => navigate(`/houses/${house.id}`)}
              />
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center">
          <FileCheck className="w-10 h-10 mx-auto text-gray-300" />

          <p className="text-sm font-semibold text-gray-700 mt-4">
            계약 완료한 집이 없어요
          </p>

          <p className="text-xs text-gray-400 mt-1">
            계약이 완료된 집이 이곳에 기록돼요.
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
