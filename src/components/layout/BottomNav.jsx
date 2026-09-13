import { NavLink } from 'react-router-dom'

// 하단 탭 네비게이션 (홈 / 집관리 / 체크리스트)
const TABS = [
  { to: '/', label: '홈', icon: '🏠' },
  { to: '/houses', label: '집관리', icon: '🔄' },
  { to: '/checklist', label: '체크리스트', icon: '✅' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${isActive ? 'text-green-500 font-bold' : 'text-gray-400'}`
          }
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
