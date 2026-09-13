import { ChevronRight } from 'lucide-react'

// "지금 확인하면 좋아요" 단계별 추천 체크 항목 리스트
const ITEMS = [
  { label: '등기부등본 확인', badge: '필수', badgeColor: 'bg-red-100 text-red-500' },
  { label: '계약서 꼼꼼히 확인하기', badge: '필수', badgeColor: 'bg-red-100 text-red-500' },
  { label: '특약 사항 체크하기', badge: '참고', badgeColor: 'bg-gray-200 text-gray-500' },
]

export default function RecommendedChecklist() {
  return (
    <div className="bg-gray-50 rounded-2xl p-4 mx-4">
      <div className="flex justify-between items-center">
        <p className="font-bold">지금 확인하면 좋아요</p>
        <span className="text-xs bg-red-100 text-red-500 px-2 py-1 rounded-full">계약 단계</span>
      </div>
      <p className="text-sm text-gray-400 mt-1">현재 단계에 맞는 필수 항목을 확인해보세요</p>

      <div className="flex flex-col gap-2 mt-3">
        {ITEMS.map((item) => (
          <button key={item.label} className="bg-white rounded-xl px-3 py-3 flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              {item.label}
              <span className={`text-xs px-2 py-0.5 rounded-full ${item.badgeColor}`}>{item.badge}</span>
            </span>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
        ))}
      </div>

      <button className="text-sm text-gray-400 mt-2">모든 항목 보기 ›</button>
    </div>
  )
}
