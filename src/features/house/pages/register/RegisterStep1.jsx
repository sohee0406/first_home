import { useState } from 'react'

// STEP 1: 어떤 집인가요?
const OPTIONS = ['원룸', '투룸', '오피스텔', '빌라', '아파트', '기타']

export default function RegisterStep1({ formData, onNext }) {
  const [selected, setSelected] = useState(formData?.houseType || null)

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-lg">어떤 집인가요?</h2>

      <div className="flex flex-col gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={`rounded-xl py-4 font-bold text-center transition-colors ${
              selected === opt ? 'bg-green-400 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <button
        disabled={!selected}
        onClick={() => onNext({ houseType: selected })}
        className={`rounded-xl py-4 font-bold text-white mt-2 ${
          selected ? 'bg-green-500' : 'bg-gray-300'
        }`}
      >
        다음
      </button>
    </div>
  )
}
