import { createBrowserRouter } from 'react-router-dom'
import BottomTabLayout from './BottomTabLayout'

import HomePage from '../features/home/HomePage'
import HouseListPage from '../features/house/pages/HouseListPage'
import HouseDetailPage from '../features/house/pages/HouseDetailPage'
import RegisterWizard from '../features/house/pages/register/RegisterWizard'
import ChecklistHubPage from '../features/checklist/pages/ChecklistHubPage'
import BeforeVisitPage from '../features/checklist/pages/BeforeVisitPage'
import OnSiteCheckPage from '../features/checklist/pages/OnSiteCheckPage'
import AroundCheckPage from '../features/checklist/pages/AroundCheckPage'
import ContractFinalCheckPage from '../features/checklist/pages/ContractFinalCheckPage'
import MoveInCheckPage from '../features/checklist/pages/MoveInCheckPage'
import AdminHelperPage from '../features/admin/pages/AdminHelperPage'
import RegistryDocPage from '../features/admin/pages/RegistryDocPage'
import MoveInReportPage from '../features/admin/pages/MoveInReportPage'
import MyPage from '../features/mypage/pages/MyPage'

// 하단 탭 3개(홈/집관리/체크리스트)는 BottomTabLayout 안에서,
// 나머지 상세/플로우 페이지는 각자 독립 라우트로 둡니다.
const router = createBrowserRouter([
  {
    element: <BottomTabLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/houses', element: <HouseListPage /> },
      { path: '/checklist', element: <ChecklistHubPage /> },
    ],
  },
  { path: '/houses/:id', element: <HouseDetailPage /> },
  { path: '/houses/register', element: <RegisterWizard /> },
  { path: '/checklist/before-visit', element: <BeforeVisitPage /> },
  { path: '/checklist/on-site', element: <OnSiteCheckPage /> },
  { path: '/checklist/around', element: <AroundCheckPage /> },
  { path: '/checklist/contract-final', element: <ContractFinalCheckPage /> },
  { path: '/checklist/move-in', element: <MoveInCheckPage /> },
  { path: '/admin', element: <AdminHelperPage /> },
  { path: '/admin/registry-doc', element: <RegistryDocPage /> },
  { path: '/admin/move-in-report', element: <MoveInReportPage /> },
  { path: '/mypage', element: <MyPage /> },
])

export default router
