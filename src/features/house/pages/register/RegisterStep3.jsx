import { useState } from 'react'
import { PersonStanding, CheckSquare } from 'lucide-react'

// STEP 3: 추가 정보 입력 (선택) - 주변환경 / 옵션 체크박스
// TODO: '주변 환경' 헤더 아이콘은 lucide의 PersonStanding으로 임시 매칭했어요.
// 원본 아이콘과 다르면 확대 캡처 주시면 정확히 바꿔드릴게요.
const SURROUNDING_OPTIONS = ['교통 (지하철/버스)', '편의시설 (마트/병원)', '치안/안전', '소음 (도로,공사 등)']
const AMENITY_OPTIONS = ['에어컨', '세탁기', '냉장고', '인터넷', '가스레인지']

export default function RegisterStep3({ formData, onNext }) {
  const [surroundings, setSurroundings] = useState(formData?.surroundings || [])
  const [amenities, setAmenities] = useState(formData?.amenities || [])

  const toggle = (list, setList, value) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-bold text-lg">
          추가 정보를 입력해주세요 <span className="text-sm font-normal text-gray-400">(선택)</span>
        </h2>
        <p className="text-sm text-gray-400 mt-1">입력하시면 더 정확한 체크리스트를 제공해드려요</p>
      </div>

      <div>
        <p className="font-bold flex items-center gap-1 mb-2">
          <PersonStanding size={18} /> 주변 환경
        </p>
        <div className="flex flex-col gap-3">
          {SURROUNDING_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-center justify-between">
              <span className="text-sm">{opt}</span>
              <input
                type="checkbox"
                checked={surroundings.includes(opt)}
                onChange={() => toggle(surroundings, setSurroundings, opt)}
              />
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="font-bold flex items-center gap-1 mb-2">
          <CheckSquare size={18} className="text-green-500" /> 옵션
        </p>
        <div className="flex flex-col gap-3">
          {AMENITY_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-center justify-between">
              <span className="text-sm">{opt}</span>
              <input
                type="checkbox"
                checked={amenities.includes(opt)}
                onChange={() => toggle(amenities, setAmenities, opt)}
              />
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => onNext({ surroundings, amenities })}
        className="bg-green-500 text-white rounded-xl py-4 font-bold mt-2"
      >
        다음
      </button>
    </div>
  )
}
