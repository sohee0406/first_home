import { ChevronRight, MapPin } from "lucide-react";

export default function RecordHouseCard({
  house,
  status,
  statusText,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left bg-white border border-gray-100 rounded-2xl p-4  shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
    >
      {/* 상태 */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
          {statusText}
        </span>

        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>

      {/* 집 정보 */}
      <div>
        <h3 className="text-base font-bold text-gray-900">
          {house.name || "등록한 집"}
        </h3>

        {house.address && (
          <div className="flex items-center gap-1 mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />

            <p className="text-xs text-gray-500 truncate">{house.address}</p>
          </div>
        )}
      </div>

      {/* 거래 정보 */}
      {(house.deposit || house.rent) && (
        <div className="flex items-center gap-2 mt-3 text-sm">
          {house.deposit && (
            <span className="font-semibold text-gray-900">
              보증금 {house.deposit}
            </span>
          )}

          {house.rent && (
            <span className="text-gray-500">/ 월세 {house.rent}</span>
          )}
        </div>
      )}

      {/* 진행률 */}
      {typeof house.progress === "number" && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-500">진행률</span>

            <span className="text-xs font-semibold text-emerald-600">
              {house.progress}%
            </span>
          </div>

          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#26D383] rounded-full"
              style={{ width: `${house.progress}%` }}
            />
          </div>
        </div>
      )}
    </button>
  );
}
