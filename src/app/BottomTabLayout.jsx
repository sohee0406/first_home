import { Outlet } from 'react-router-dom'
import BottomNav from '../components/layout/BottomNav'

export default function BottomTabLayout() {
  return (
    <div className="min-h-screen pb-20">
      <Outlet />
      <BottomNav />
    </div>
  )
}