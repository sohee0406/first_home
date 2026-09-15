import { useState } from "react";

// STEP 2: 기본 정보 입력
// TODO: 관리비/계약기간 드롭다운 옵션값은 임시로 넣었어요. 실제 피그마 옵션 목록과 다르면 알려주세요.
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

  const handleNext = () => {
    onNext({ address, deposit, rent, maintenanceFee, contractPeriod });
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-lg">기본 정보를 입력해 주세요</h2>

      <div>
        <label className="text-sm font-bold">주소</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="도로명 주소를 입력해주세요"
          className="w-full bg-gray-100 rounded-xl py-3 px-4 mt-1 outline-none"
        />
      </div>

      <div>
        <label className="text-sm font-bold">보증금</label>
        <input
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
          placeholder="예) 1,000만원"
          className="w-full bg-gray-100 rounded-xl py-3 px-4 mt-1 outline-none"
        />
      </div>

      <div>
        <label className="text-sm font-bold">월세</label>
        <input
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          placeholder="예) 40만원"
          className="w-full bg-gray-100 rounded-xl py-3 px-4 mt-1 outline-none"
        />
      </div>

      <div>
        <label className="text-sm font-bold">관리비</label>
        <select
          value={maintenanceFee}
          onChange={(e) => setMaintenanceFee(e.target.value)}
          className="w-full bg-gray-100 rounded-xl py-3 px-4 mt-1 outline-none"
        >
          <option value="">선택해주세요</option>
          {MAINTENANCE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-bold">계약 기간</label>
        <select
          value={contractPeriod}
          onChange={(e) => setContractPeriod(e.target.value)}
          className="w-full bg-gray-100 rounded-xl py-3 px-4 mt-1 outline-none"
        >
          <option value="">선택해주세요</option>
          {CONTRACT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleNext}
        className="bg-green-500 text-white rounded-xl py-4 font-bold mt-2"
      >
        다음
      </button>
    </div>
  );
}
