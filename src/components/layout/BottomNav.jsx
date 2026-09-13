import { NavLink } from 'react-router-dom'
import { Home, RefreshCw, CheckCircle2 } from 'lucide-react'

// 하단 탭 네비게이션 (홈 / 집관리 / 체크리스트)
// TODO: '집관리' 아이콘이 피그마 원본과 다르면 아이코니파이에서 정확한 아이콘으로 교체
const TABS = [
  { to: '/', label: '홈', Icon: Home },
  { to: '/houses', label: '집관리', Icon: RefreshCw },
  { to: '/checklist', label: '체크리스트', Icon: CheckCircle2 },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
      {TABS.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs gap-0.5 ${isActive ? 'text-green-500 font-bold' : 'text-gray-400'}`
          }
        >
          <Icon size={22} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
