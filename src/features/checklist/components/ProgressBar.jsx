// 체크 진행률 바 (예: "집 체크 진행률 35%", "16/22")
export default function ProgressBar({ current, total }) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>집 체크 진행률</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div className="h-2 bg-green-500 rounded-full" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
