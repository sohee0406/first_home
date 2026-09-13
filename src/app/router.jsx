import { createBrowserRouter } from 'react-router-dom'
import BottomTabLayout from './BottomTabLayout'
import SubPageLayout from '../components/layout/SubPageLayout'

import HomePage from '../features/home/HomePage'

import HouseListPage from '../features/house/pages/HouseListPage'
import HouseDetailPage from '../features/house/pages/HouseDetailPage'
import RegisterWizard from '../features/house/pages/register/RegisterWizard'

import ChecklistHubPage from '../features/checklist/pages/ChecklistHubPage'
import BeforeVisitPage from '../features/checklist/pages/BeforeVisitPage'
import OnSiteCheckPage from '../features/checklist/pages/OnSiteCheckPage'
import ChecklistDetailPage from '../features/checklist/pages/ChecklistDetailPage'
import AroundCheckPage from '../features/checklist/pages/AroundCheckPage'
import ContractFinalCheckPage from '../features/checklist/pages/ContractFinalCheckPage'
import MoveInCheckPage from '../features/checklist/pages/MoveInCheckPage'

import AdminHelperPage from '../features/admin/pages/AdminHelperPage'
import RegistryDocPage from '../features/admin/pages/RegistryDocPage'
import MoveInReportPage from '../features/admin/pages/MoveInReportPage'

import MyPage from '../features/mypage/pages/MyPage'

const router = createBrowserRouter([
  {
    element: <BottomTabLayout />,
    children: [
      // ==========================================
      // 홈 / 하단 탭
      // ==========================================
      {
        path: '/',
        element: <HomePage />,
      },

      {
        path: '/houses',
        element: <HouseListPage />,
      },

      {
        path: '/checklist',
        element: <ChecklistHubPage />,
      },

      // ==========================================
      // 서브페이지
      // 뒤로가기 / 닫기 헤더 + BottomNav
      // ==========================================
      {
        element: <SubPageLayout />,
        children: [
          {
            path: '/checklist/before-visit',
            element: <BeforeVisitPage />,
          },

          {
            path: '/checklist/on-site',
            element: <OnSiteCheckPage />,
          },

          // 현장 점검 항목 상세
          // water, light, drain, mold, bugs ...
          {
            path: '/checklist/on-site/:id',
            element: <ChecklistDetailPage />,
          },

          {
            path: '/checklist/around',
            element: <AroundCheckPage />,
          },

          {
            path: '/checklist/contract-final',
            element: <ContractFinalCheckPage />,
          },

          {
            path: '/checklist/move-in',
            element: <MoveInCheckPage />,
          },

          {
            path: '/houses/register',
            element: <RegisterWizard />,
          },
        ],
      },

      // ==========================================
      // 기타 페이지
      // ==========================================
      {
        path: '/houses/:id',
        element: <HouseDetailPage />,
      },

      {
        path: '/admin',
        element: <AdminHelperPage />,
      },

      {
        path: '/admin/registry-doc',
        element: <RegistryDocPage />,
      },

      {
        path: '/admin/move-in-report',
        element: <MoveInReportPage />,
      },

      {
        path: '/mypage',
        element: <MyPage />,
      },
    ],
  },
])

export default router