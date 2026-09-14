import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Plus } from "lucide-react";

export default function AroundCheckPage() {
  const navigate = useNavigate();

  // ==========================================
  // 주변 생활환경
  // ==========================================
  const [places, setPlaces] = useState([
    { name: "편의점", count: 5 },
    { name: "카페", count: 8 },
    { name: "약국", count: 3 },
    { name: "세탁소", count: 2 },
  ]);

  // ==========================================
  // 직접 확인 체크리스트
  // ==========================================
  const [checks, setChecks] = useState([
    {
      id: "transport",
      label: "대중교통 접근성",
      checked: true,
    },
    {
      id: "convenience",
      label: "편의 시설",
      checked: false,
    },
    {
      id: "noise",
      label: "주변 소음",
      checked: true,
    },
    {
      id: "culture",
      label: "문화 시설",
      checked: false,
    },
    {
      id: "security",
      label: "유흥시설 여부",
      checked: true,
    },
    {
      id: "walk",
      label: "밤길 살피기",
      checked: false,
    },
  ]);

  // ==========================================
  // 체크 상태 변경
  // ==========================================
  const handleCheck = (id) => {
    setChecks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  // ==========================================
  // 추가하기
  // ==========================================
  const handleAddPlace = () => {
    const name = window.prompt("확인할 시설을 입력하세요.");

    if (!name) return;

    setPlaces((prev) => [
      ...prev,
      {
        name,
        count: 0,
      },
    ]);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white pb-24">
      {/* ========================================== */}
      {/* 1. 집 정보 */}
      {/* ========================================== */}
      <section className="px-4 pt-7">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-[20px] font-bold text-gray-950">오모동 ○○빌라</h1>

          <span className="text-[13px] text-gray-400">주소 변경하기</span>
        </div>

        {/* 지도 */}
        <div className="w-full h-[165px] rounded-none overflow-hidden bg-[#E8F0D8] relative">
          {/*
            실제 지도 이미지가 있다면
            아래 img로 교체해서 사용하면 됨.

            <img
              src="/images/around-map.png"
              alt="주변 지도"
              className="w-full h-full object-cover"
            />
          */}

          {/* 지도 느낌의 배경 */}
          <div className="absolute inset-0 bg-[#eef3dd]">
            {/* 도로 */}
            <div className="absolute w-[140%] h-[42px] bg-white/80 rotate-[12deg] top-[45px] -left-[40px]" />
            <div className="absolute w-[120%] h-[28px] bg-white/80 rotate-[-8deg] top-[105px] -left-[20px]" />
            <div className="absolute w-[30px] h-[130%] bg-white/70 rotate-[25deg] top-[-40px] left-[45%]" />

            {/* 녹지 */}
            <div className="absolute w-[130%] h-[25px] bg-[#b8d9a2] rotate-[4deg] top-[115px] -left-[30px]" />

            {/* 지도 텍스트 */}
            <span className="absolute left-5 top-5 text-[11px] text-gray-500">
              서울대입구역
            </span>

            <span className="absolute right-8 top-12 text-[10px] text-gray-500">
              관악구
            </span>

            <span className="absolute left-20 bottom-5 text-[10px] text-gray-500">
              주변 생활시설
            </span>

            {/* 지도 핀 */}
            <div className="absolute left-[43%] top-[43%]">
              <div className="relative">
                <MapPin
                  size={42}
                  fill="#26D383"
                  strokeWidth={1.5}
                  className="text-[#26D383]"
                />

                <div className="absolute top-[10px] left-[13px] w-[15px] h-[15px] rounded-full bg-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 2. 주변 생활환경 */}
      {/* ========================================== */}
      <section className="px-4 mt-12">
        <h2 className="flex items-center gap-1.5 text-[19px] font-bold text-gray-950 mb-5">
          주변 생활환경
          <MapPin size={21} strokeWidth={2.2} className="text-gray-950" />
        </h2>

        <div className="bg-white border border-gray-100 rounded-xl px-5 shadow-[0_1px_5px_rgba(0,0,0,0.04)]">
          {places.map((place, index) => (
            <div
              key={`${place.name}-${index}`}
              className={`
                flex items-center justify-between
                h-[66px]
                ${index !== places.length - 1 ? "border-b border-gray-100" : ""}
              `}
            >
              <span className="text-[15px] font-medium text-gray-900">
                {place.name}
              </span>

              <span className="text-[16px] font-semibold text-gray-950">
                {place.count}곳
              </span>
            </div>
          ))}

          {/* 추가하기 */}
          <div className="py-3">
            <button
              onClick={handleAddPlace}
              className="
                flex items-center gap-1
                px-3 py-1.5
                rounded-full
                bg-[#EAFEF1]
                text-[#26D383]
                text-[13px]
                font-semibold
              "
            >
              <Plus size={14} />
              추가하기
            </button>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 3. 직접 확인 */}
      {/* ========================================== */}
      <section className="px-4 mt-14">
        <h2 className="text-[19px] font-bold text-gray-950 mb-4">직접 확인</h2>

        <div className="bg-white px-5 py-4 rounded-xl shadow-[0_2px_2px_rgba(0,0,0,0.05)] border border-gray-100">
          <div className="grid grid-cols-2 gap-y-5 gap-x-6">
            {checks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleCheck(item.id)}
                className="flex items-center gap-3 text-left"
              >
                {/* 체크박스 */}
                <span
                  className={`
                    w-[17px]
                    h-[17px]
                    rounded-[3px]
                    border
                    flex
                    items-center
                    justify-center
                    shrink-0
                    ${
                      item.checked
                        ? "bg-[#26D383] border-[#26D383]"
                        : "bg-white border-[#26D383]"
                    }
                  `}
                >
                  {item.checked && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6L5 8.5L9.5 3.5"
                        stroke="white"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>

                {/* 항목명 */}
                <span className="text-[13px] font-medium text-gray-800 whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-[16px]">
        <div className="mt-8 flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-4 bg-[#EAFEF1] text-[#26D383] font-bold text-lg rounded-2xl  "
          >
            이전
          </button>

          <button
            onClick={() => navigate("/checklist/on-site")}
            className="flex-1 py-4 text-white bg-[#26D383] font-bold text-lg rounded-2xl  "
          >
            확인
          </button>
        </div>
      </section>
    </div>
  );
}
