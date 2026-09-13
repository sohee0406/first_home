import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

// 뒤로가기 + 중앙 정렬 제목만 있는 서브페이지 헤더 (닫기 X 버튼 없음)
// 예: 집 관리, 매물 등록 등 X close가 없는 화면에서 사용
export default function SubHeader({ title }) {
  const navigate = useNavigate()

  return (
    <header className="relative flex items-center justify-center px-4 py-4">
      <button onClick={() => navigate(-1)} className="absolute left-4">
        <ChevronLeft size={22} />
      </button>
      <span className="font-bold">{title}</span>
    </header>
  )
}
