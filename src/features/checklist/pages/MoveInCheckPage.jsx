import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, MoreHorizontal, AlertTriangle, X } from "lucide-react";

import { useHouse } from "../../house/context/HouseContext";
import { parseManwon } from "../../../utils/formatCurrency";

// 체크리스트 항목별 진행률(%) 계산
function getItemPercent(checkItems, title) {
  const item = (checkItems || []).find((i) => i.title === title);

  if (!item) {
    return 0;
  }

  const total = Number(item.total || 0);
  const checked = Number(item.checked || 0);

  return total > 0 ? Math.round((checked / total) * 100) : 0;
}

export default function MoveInCheckPage() {
  const navigate = useNavigate();

  const { houses, updateChecklistProgress } = useHouse();

  const [showAlert, setShowAlert] = useState(true);

  // 진행 중인 집(없으면 첫 번째 집)을 기준으로 보여준다
  const currentHouse = useMemo(() => {
    if (!houses || houses.length === 0) {
      return null;
    }

    return (
      houses.find((house) => {
        const checked = Number(house.checked || 0);
        const total = Number(house.totalInspection || 0);

        return checked < total;
      }) || houses[0]
    );
  }, [houses]);

  const checkItems = currentHouse?.checkItems || [];

  const onSitePercent = getItemPercent(checkItems, "현장 점검");
  const contractPercent = getItemPercent(checkItems, "계약 전");
  const aroundPercent = getItemPercent(checkItems, "주변 점검");

  const isAllComplete =
    !!currentHouse &&
    Number(currentHouse.totalInspection || 0) > 0 &&
    Number(currentHouse.checked || 0) >=
      Number(currentHouse.totalInspection || 0);

  // 등록했던 집 금액을 기준으로 한 초기예상비용
  const estimatedCost = useMemo(() => {
    const deposit = parseManwon(currentHouse?.deposit); // 보증금
    const rent = parseManwon(currentHouse?.rent); // 월세
    const maintenance = parseManwon(currentHouse?.maintenanceFee); // 관리비

    // 중개보수는 등록 정보에 없어 환산보증금(보증금 + 월세x100) 기준으로 추정
    const convertedDeposit = deposit + rent * 100;
    const brokerageFee = Math.round(convertedDeposit * 0.004);

    // 이사비도 등록 정보에 없어 평균값으로 추정
    const movingFee = 50;

    const total = deposit + rent + maintenance + brokerageFee + movingFee;

    return { deposit, rent, maintenance, brokerageFee, movingFee, total };
  }, [currentHouse?.deposit, currentHouse?.rent, currentHouse?.maintenanceFee]);

  // 확인 버튼: 입주 전 체크리스트는 항목 개수가 아니라 확인/미확인으로만 관리
  const handleConfirm = () => {
    if (currentHouse) {
      updateChecklistProgress(currentHouse.id, "입주 후", 1, 1);
    }

    navigate("/admin");
  };

  return (
    <div className=" bg-white px-5 pt-8 pb-12 max-w-md mx-auto flex flex-col justify-between">
      <div className="space-y-4">
        {/* 1. 상단 빌라 정보 및 점검 현황 카드 */}
        <div className="bg-white p-5 rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-3 min-w-0">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#EAFEF1", color: "#25D383" }}
              >
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 truncate">
                {currentHouse?.name || currentHouse?.address || "등록한 집"}
              </h2>
            </div>
            <span
              className="px-3 py-1 text-xs font-semibold rounded-full shrink-0"
              style={{ backgroundColor: "#EAFEF1", color: "#25D383" }}
            >
              {isAllComplete ? "점검 완료" : "점검 중"}
            </span>
          </div>

          {/* 프로그레스 바 목록 */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>현장 점검</span>
                <span className="font-semibold">{onSitePercent}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: "#25D383",
                    width: `${onSitePercent}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>계약 전 점검</span>
                <span className="font-semibold">{contractPercent}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: "#25D383",
                    width: `${contractPercent}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>주변 환경</span>
                <span className="font-semibold">{aroundPercent}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: "#25D383",
                    width: `${aroundPercent}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. 예상 초기비용 카드 (등록한 집 금액 기준) */}
        <div className="bg-white p-5 rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-bold text-gray-900">
              예상 초기비용
            </h3>
            <button className="text-gray-400">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {currentHouse ? (
            <>
              <p className="text-[11px] text-gray-400 mb-3">
                등록한 집 정보를 기준으로 계산했어요.
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>보증금</span>
                  <span className="font-semibold text-gray-900">
                    {estimatedCost.deposit.toLocaleString("ko-KR")} 만원
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>월세</span>
                  <span className="font-semibold text-gray-900">
                    {estimatedCost.rent.toLocaleString("ko-KR")} 만원
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>관리비</span>
                  <span className="font-semibold text-gray-900">
                    {estimatedCost.maintenance.toLocaleString("ko-KR")} 만원
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>중개보수 (추정)</span>
                  <span className="font-semibold text-gray-900">
                    약 {estimatedCost.brokerageFee.toLocaleString("ko-KR")}{" "}
                    만원
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>이사비 (추정)</span>
                  <span className="font-semibold text-gray-900">
                    약 {estimatedCost.movingFee.toLocaleString("ko-KR")} 만원
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between font-bold text-gray-900 text-base">
                  <span>예상 필요 금액</span>
                  <span style={{ color: "#25D383" }}>
                    약 {estimatedCost.total.toLocaleString("ko-KR")} 만원
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="py-6 text-center">
              <p className="text-[13px] text-gray-400">
                등록된 집이 없어 초기비용을 계산할 수 없어요.
              </p>
              <button
                type="button"
                onClick={() => navigate("/houses/register")}
                className="mt-3 text-[13px] font-semibold text-[#26D383]"
              >
                집 등록하러 가기
              </button>
            </div>
          )}
        </div>

        {/* 3. 확인 필요 항목 경고 배너 */}
        {showAlert && (
          <div className="bg-rose-50/70 border border-rose-100 p-4 rounded-2xl relative shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-600 text-sm">
                    확인 필요항목 3개
                  </span>
                  <button
                    onClick={() => setShowAlert(false)}
                    className="text-rose-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-rose-500 mt-1">
                  근저당 설정, 여부보증금 관련 특약, 공과금 납부 여부
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. 하단 버튼 영역 */}
      <div className="mt-8 flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 py-4 bg-[#EAFEF1] text-[#26D383] font-bold text-lg rounded-2xl"
        >
          이전
        </button>

        <button
          onClick={handleConfirm}
          className="flex-1 py-4 text-white bg-[#26D383] font-bold text-lg rounded-2xl"
        >
          확인
        </button>
      </div>
    </div>
  );
}
