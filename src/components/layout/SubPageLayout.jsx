import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeft, X } from 'lucide-react'

export default function SubPageLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const getHeaderTitle = () => {
    const path = location.pathname

    if (path === '/checklist/before-visit') {
      return '집 보러 가기 전'
    }

    // /checklist/on-site
    // /checklist/on-site/water
    // /checklist/on-site/light
    // /checklist/on-site/drain
    // 모두 '현장 점검'
    if (path.startsWith('/checklist/on-site')) {
      return '현장 점검'
    }

    if (path === '/checklist/around') {
      return '주변 환경 점검'
    }

    if (path === '/checklist/contract-final') {
      return '계약 최종 확인'
    }

    if (path === '/checklist/move-in') {
      return '입주 점검'
    }

    if (path === '/houses/register') {
      return '집 등록하기'
    }

    return '상세 정보'
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 shadow-sm relative">
      
      {/* 상단 헤더 */}
      <header className="h-[60px] flex items-center justify-between px-4 bg-white border-b border-gray-100 sticky top-0 z-10">
        
        {/* 뒤로가기 */}
        <button
          onClick={() => navigate(-1)}
          className="p-1 rounded-full"
          aria-label="뒤로가기"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        {/* 페이지 제목 */}
        <span className="font-bold text-gray-950 text-[18px]">
          {getHeaderTitle()}
        </span>

        {/* 닫기 */}
        <button
          onClick={() => navigate('/')}
          className="p-1 rounded-full"
          aria-label="닫기"
        >
          <X className="w-6 h-6 text-gray-800" />
        </button>
      </header>

      {/* 페이지 내용 */}
      <main>
        <Outlet />
      </main>

    </div>
  )
}