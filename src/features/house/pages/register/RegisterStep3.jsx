import { useState } from "react";
import { PersonStanding, CheckSquare } from "lucide-react";

// STEP 3: 추가 정보 입력 (선택) - 주변환경 / 옵션 체크박스
// TODO: '주변 환경' 헤더 아이콘은 lucide의 PersonStanding으로 임시 매칭했어요.
// 원본 아이콘과 다르면 확대 캡처 주시면 정확히 바꿔드릴게요.
const SURROUNDING_OPTIONS = [
  "교통 (지하철/버스)",
  "편의시설 (마트/병원)",
  "치안/안전",
  "소음 (도로,공사 등)",
];
const AMENITY_OPTIONS = ["에어컨", "세탁기", "냉장고", "인터넷", "가스레인지"];

export default function RegisterStep3({ formData, onNext }) {
  const [surroundings, setSurroundings] = useState(
    formData?.surroundings || [],
  );
  const [amenities, setAmenities] = useState(formData?.amenities || []);

  const toggle = (list, setList, value) => {
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-bold text-lg">옵션 정보를 입력해주세요 </h2>
      </div>

      <div>
        <p className="font-bold flex items-center gap-2 mb-4 text-[17px]">
          <CheckSquare size={20} className="text-[#26D383]" />
          옵션
        </p>

        <div className="flex flex-col gap-4">
          {AMENITY_OPTIONS.map((opt) => {
            const isChecked = amenities.includes(opt);

            return (
              <label
                key={opt}
                className="
            flex
            items-center
            justify-between
            min-h-[48px]
            cursor-pointer
          "
              >
                <span className="text-[16px] text-gray-800">{opt}</span>

                {/* 체크박스 */}
                <button
                  type="button"
                  onClick={() => toggle(amenities, setAmenities, opt)}
                  className={`
              w-6
              h-6
              shrink-0
              rounded-md
              border
              flex
              items-center
              justify-center
              transition-colors
              ${
                isChecked
                  ? "bg-[#26D383] border-[#26D383]"
                  : "bg-white border-gray-300"
              }
            `}
                  aria-label={`${opt} ${isChecked ? "선택 해제" : "선택"}`}
                >
                  {isChecked && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              </label>
            );
          })}
        </div>
      </div>
      <button
        onClick={() => onNext({ surroundings, amenities })}
        className="bg-green-500 text-white rounded-xl py-4 font-bold mt-2"
      >
        다음
      </button>
    </div>
  );
}
