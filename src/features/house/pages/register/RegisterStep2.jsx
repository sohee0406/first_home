import { useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";

// STEP 2: 기본 정보 입력

const MAINTENANCE_OPTIONS = ["없음", "5만원", "10만원", "15만원 이상"];

const CONTRACT_OPTIONS = ["6개월", "1년", "2년", "기타"];

export default function RegisterStep2({ formData, onNext }) {
  const [address, setAddress] = useState(formData?.address || "");
  const [deposit, setDeposit] = useState(formData?.deposit || "");
  const [rent, setRent] = useState(formData?.rent || "");
  const [maintenanceFee, setMaintenanceFee] = useState(
    formData?.maintenanceFee || "",
  );
  const [contractPeriod, setContractPeriod] = useState(
    formData?.contractPeriod || "",
  );

  const [openSelect, setOpenSelect] = useState(null);

  // 주소 유효성 검사
  const isAddressValid = address.trim().length >= 5;

  // 필수 입력값 검사
  const isDepositValid = deposit.trim() !== "";
  const isRentValid = rent.trim() !== "";
  const isMaintenanceValid = maintenanceFee !== "";

  // 계약기간은 선택사항
  const isFormValid =
    isAddressValid && isDepositValid && isRentValid && isMaintenanceValid;

  // 숫자만 입력
  const handleNumberChange = (setter) => (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setter(value);
  };

  const handleNext = () => {
    if (!isFormValid) {
      return;
    }

    onNext({
      address: address.trim(),
      deposit,
      rent,
      maintenanceFee,
      contractPeriod,
    });
  };

  const handleSelect = (value) => {
    if (openSelect === "maintenance") {
      setMaintenanceFee(value);
    }

    if (openSelect === "contract") {
      setContractPeriod(value);
    }

    setOpenSelect(null);
  };

  const currentOptions =
    openSelect === "maintenance" ? MAINTENANCE_OPTIONS : CONTRACT_OPTIONS;

  const currentValue =
    openSelect === "maintenance" ? maintenanceFee : contractPeriod;

  const selectTitle = openSelect === "maintenance" ? "관리비" : "계약 기간";

  return (
    <>
      <div className="flex flex-col gap-5 pb-4">
        <h2 className="font-bold text-lg">기본 정보를 입력해 주세요</h2>

        {/* 주소 */}
        <div>
          <label className="text-sm font-bold">
            주소 <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="도로명 주소를 입력해주세요"
            className={`w-full bg-gray-100 rounded-xl py-3 px-4 mt-1 outline-none border transition-colors ${
              address !== "" && !isAddressValid
                ? "border-red-300"
                : "border-transparent focus:border-green-400"
            }`}
          />

          {address !== "" && !isAddressValid && (
            <p className="text-xs text-red-500 mt-1">
              정확한 주소를 입력해주세요.
            </p>
          )}
        </div>

        {/* 보증금 */}
        <div>
          <label className="text-sm font-bold">
            보증금 <span className="text-red-500">*</span>
          </label>

          <div className="relative mt-1">
            <input
              type="text"
              inputMode="numeric"
              value={deposit}
              onChange={handleNumberChange(setDeposit)}
              placeholder="예) 1000"
              className="w-full bg-gray-100 rounded-xl py-3 px-4 pr-16 outline-none focus:border-green-400 border border-transparent"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              원
            </span>
          </div>
        </div>

        {/* 월세 */}
        <div>
          <label className="text-sm font-bold">
            월세 <span className="text-red-500">*</span>
          </label>

          <div className="relative mt-1">
            <input
              type="text"
              inputMode="numeric"
              value={rent}
              onChange={handleNumberChange(setRent)}
              placeholder="예) 40"
              className="w-full bg-gray-100 rounded-xl py-3 px-4 pr-16 outline-none focus:border-green-400 border border-transparent"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              만원
            </span>
          </div>
        </div>

        {/* 관리비 */}
        <div>
          <label className="text-sm font-bold">
            관리비 <span className="text-red-500">*</span>
          </label>

          <button
            type="button"
            onClick={() => setOpenSelect("maintenance")}
            className={`w-full flex items-center justify-between bg-gray-100 rounded-xl py-3 px-4 mt-1 text-left border transition-colors ${
              maintenanceFee
                ? "text-gray-900 border-transparent"
                : "text-gray-400 border-transparent"
            }`}
          >
            <span>{maintenanceFee || "관리비를 선택해주세요"}</span>

            <ChevronDown
              size={20}
              className={`transition-transform duration-300 ${
                openSelect === "maintenance" ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>

        {/* 계약 기간 - 선택사항 */}
        <div>
          <label className="text-sm font-bold">계약 기간</label>

          <button
            type="button"
            onClick={() => setOpenSelect("contract")}
            className={`w-full flex items-center justify-between bg-gray-100 rounded-xl py-3 px-4 mt-1 text-left border transition-colors ${
              contractPeriod
                ? "text-gray-900 border-transparent"
                : "text-gray-400 border-transparent"
            }`}
          >
            <span>{contractPeriod || "계약 기간을 선택해주세요"}</span>

            <ChevronDown
              size={20}
              className={`transition-transform duration-300 ${
                openSelect === "contract" ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>

        {/* 다음 버튼 */}
        <button
          type="button"
          onClick={handleNext}
          disabled={!isFormValid}
          className={`rounded-xl py-4 font-bold mt-2 transition-all duration-200 ${
            isFormValid
              ? "bg-green-500 text-white active:scale-[0.98]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          다음
        </button>
      </div>

      {/* 바텀시트 */}
      {openSelect && (
        <div className="fixed inset-0 z-50">
          {/* 배경 */}
          <button
            type="button"
            aria-label="닫기"
            onClick={() => setOpenSelect(null)}
            className="absolute inset-0 w-full h-full bg-black/40 animate-[fadeIn_0.25s_ease-out]"
          />

          {/* 바텀시트 */}
          <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-[28px] px-4 pt-5 pb-8 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] animate-[bottomSheetUp_0.35s_cubic-bezier(0.22,1,0.36,1)]">
            {/* 드래그 핸들 */}
            <div className="flex justify-center mb-5">
              <div className="w-10 h-1 rounded-full bg-gray-200" />
            </div>

            {/* 제목 */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold">{selectTitle}</h3>

                <p className="text-sm text-gray-400 mt-1">
                  {selectTitle}을 선택해주세요.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpenSelect(null)}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            {/* 선택 목록 */}
            <div className="flex flex-col gap-2">
              {currentOptions.map((option) => {
                const isSelected = currentValue === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-200 ${
                      isSelected
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-50 text-gray-800 active:scale-[0.99]"
                    }`}
                  >
                    <span
                      className={`font-medium ${isSelected ? "font-bold" : ""}`}
                    >
                      {option}
                    </span>

                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <Check
                          size={15}
                          strokeWidth={3}
                          className="text-white"
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 바텀시트 애니메이션 */}
      <style>
        {`
          @keyframes bottomSheetUp {
            from {
              transform: translateY(100%);
              opacity: 0.8;
            }

            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
}
