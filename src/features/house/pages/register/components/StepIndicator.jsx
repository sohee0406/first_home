const TOTAL_STEPS = 4

// 1-2-3-4 스텝 진행 표시. 완료/현재 단계는 초록, 남은 단계는 회색.
export default function StepIndicator({ current }) {
  return (
    <div className="flex items-center px-4 pb-4">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
        const step = i + 1
        const isDoneOrCurrent = step <= current

        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                isDoneOrCurrent ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {step}
            </div>
            {step < TOTAL_STEPS && (
              <div className={`flex-1 h-0.5 mx-1 ${step < current ? 'bg-green-300' : 'bg-gray-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
