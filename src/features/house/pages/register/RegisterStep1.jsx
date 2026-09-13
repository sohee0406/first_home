// STEP 1: 어떤 집인가요? (원룸/투룸/오피스텔/빌라/아파트/기타)
export default function RegisterStep1({ onNext }) {
  const options = ['원룸', '투룸', '오피스텔', '빌라', '아파트', '기타']

  return (
    <div>
      <h2 className="font-bold mb-4">어떤 집인가요?</h2>
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            className="border rounded-xl py-3"
            onClick={() => onNext({ houseType: opt })}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
