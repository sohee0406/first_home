import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, MoreHorizontal, AlertTriangle, X } from "lucide-react";

export default function MoveInCheckPage() {
  const navigate = useNavigate();

  const [isMovedIn, setIsMovedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const handleMoveInClick = () => {
    setIsMovedIn(true);
  };

  const handleConfirmClick = () => {};

  return (
    <div className=" bg-white px-5 pt-8 pb-12 max-w-md mx-auto flex flex-col justify-between">
      <div className="space-y-4">
        {/* 1. 상단 빌라 정보 및 점검 현황 카드 */}
        <div className="bg-white p-5 rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "#EAFEF1", color: "#25D383" }}
              >
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                ㅁㅁ동 ㅇㅇ 빌라
              </h2>
            </div>
            <span
              className="px-3 py-1 text-xs font-semibold rounded-full"
              style={{ backgroundColor: "#EAFEF1", color: "#25D383" }}
            >
              점검 완료
            </span>
          </div>

          {/* 프로그레스 바 목록 */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>현장 점검</span>
                <span className="font-semibold">100%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full w-full"
                  style={{ backgroundColor: "#25D383" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>계약 전 점검</span>
                <span className="font-semibold">95%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full w-[95%]"
                  style={{ backgroundColor: "#25D383" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>주변 환경</span>
                <span className="font-semibold">100%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full w-full"
                  style={{ backgroundColor: "#25D383" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. 예상 초기비용 카드 */}
        <div className="bg-white p-5 rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900">예상 초기비용</h3>
            <button className="text-gray-400">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>보증금</span>
              <span className="font-semibold text-gray-900">1,000 만원</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>월세</span>
              <span className="font-semibold text-gray-900">60 만원</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>관리비</span>
              <span className="font-semibold text-gray-900">10 만원</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>중개보수</span>
              <span className="font-semibold text-gray-900">약 50 만원</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>이사비</span>
              <span className="font-semibold text-gray-900">약 50 만원</span>
            </div>

            <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between font-bold text-gray-900 text-base">
              <span>예상 필요 금액</span>
              <span style={{ color: "#25D383" }}>약 1,170 만원</span>
            </div>
          </div>
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

      {/* 버튼 */}
      <div className="mt-8 flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 py-4 bg-[#EAFEF1] text-[#26D383] font-bold text-lg rounded-2xl"
        >
          이전
        </button>

        <button
          onClick={() => navigate("/admin")}
          className="flex-1 py-4 text-white bg-[#26D383] font-bold text-lg rounded-2xl"
        >
          확인
        </button>
      </div>
    </div>
  );
}
