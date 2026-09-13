import { Outlet } from 'react-router-dom'
import BottomNav from '../components/layout/BottomNav'

// 홈 / 집관리 / 체크리스트 하단 탭 공용 레이아웃
export default function BottomTabLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
