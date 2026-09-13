import { Menu } from 'lucide-react'

// 홈 등 최상위 탭 화면 상단에 쓰이는 로고+메뉴 헤더
export default function TopHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-1">
        {/* 커스텀 로고 일러스트 자리 (초록 사각형 안 집 아이콘) */}
        <div className="w-7 h-7 bg-green-500 rounded-lg" />
        <span className="font-bold text-sm">첫집</span>
      </div>
      <Menu size={22} className="text-gray-700" />
    </header>
  )
}
