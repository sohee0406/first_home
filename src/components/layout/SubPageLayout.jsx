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

    if (
      path === '/checklist/on-site' ||
      path.startsWith('/checklist/on-site/')
    ) {
      return '현장 점검'
    }

    if (path === '/checklist/around') {
      return '주변 점검'
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

    if (path.startsWith('/houses/')) {
      return '집 상세'
    }

    if (path.startsWith('/admin/')) {
      return '입주 관리'
    }

    if (path === '/admin') {
      return '입주 관리'
    }

    return '상세 정보'
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 shadow-sm">

      {/* ========================================== */}
      {/* 공통 헤더 */}
      {/* ========================================== */}

      <header className="h-[60px] flex items-center justify-between px-4 bg-white border-b border-gray-100 sticky top-0 z-30">

        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-full"
          aria-label="뒤로가기"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        <span className="font-bold text-gray-950 text-[18px]">
          {getHeaderTitle()}
        </span>

        <button
          onClick={() => navigate('/')}
          className="w-9 h-9 flex items-center justify-center rounded-full"
          aria-label="홈으로 이동"
        >
          <X className="w-6 h-6 text-gray-800" />
        </button>

      </header>

      {/* ========================================== */}
      {/* 페이지 본문 */}
      {/* BottomNav 공간 확보 */}
      {/* ========================================== */}

      <main className="pb-24">
        <Outlet />
      </main>

    </div>
  )
}