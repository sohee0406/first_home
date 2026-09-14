import { createBrowserRouter } from "react-router-dom";

import BottomTabLayout from "./BottomTabLayout";
import SubPageLayout from "../components/layout/SubPageLayout";

import HomePage from "../features/home/HomePage";

// 집 관리
import HouseListPage from "../features/house/pages/HouseListPage";
import HouseDetailPage from "../features/house/pages/HouseDetailPage";
import RegisterWizard from "../features/house/pages/register/RegisterWizard";

// 체크리스트
import ChecklistHubPage from "../features/checklist/pages/ChecklistHubPage";
import BeforeVisitPage from "../features/checklist/pages/BeforeVisitPage";
import OnSiteCheckPage from "../features/checklist/pages/OnSiteCheckPage";
import ChecklistDetailPage from "../features/checklist/pages/ChecklistDetailPage";
import AroundCheckPage from "../features/checklist/pages/AroundCheckPage";
import MoveInCheckPage from "../features/checklist/pages/MoveInCheckPage";
import ContractFinalCheckPage from "../features/checklist/pages/ContractFinalCheckPage";
import ContractChecklistDetailPage from "../features/checklist/pages/ContractChecklistDetailPage";

// 입주 관리
import AdminHelperPage from "../features/admin/pages/AdminHelperPage";
import AdminDetailPage from "../features/admin/pages/AdminDetailPage";
import MoveInReportPage from "../features/admin/pages/MoveInReportPage";

// 마이페이지
import MyPage from "../features/mypage/pages/MyPage";

const router = createBrowserRouter([
  {
    element: <BottomTabLayout />,
    children: [
      // 홈
      {
        path: "/",
        element: <HomePage />,
      },

      // 홈 제외 모든 페이지
      {
        element: <SubPageLayout />,
        children: [
          // =========================
          // 집 관리
          // =========================
          {
            path: "/houses",
            element: <HouseListPage />,
          },
          {
            path: "/houses/register",
            element: <RegisterWizard />,
          },
          {
            path: "/houses/:id",
            element: <HouseDetailPage />,
          },

          // =========================
          // 체크리스트
          // =========================
          {
            path: "/checklist",
            element: <ChecklistHubPage />,
          },
          {
            path: "/checklist/before-visit",
            element: <BeforeVisitPage />,
          },
          {
            path: "/checklist/on-site",
            element: <OnSiteCheckPage />,
          },
          {
            path: "/checklist/on-site/:id",
            element: <ChecklistDetailPage />,
          },
          {
            path: "/checklist/around",
            element: <AroundCheckPage />,
          },
          {
            path: "/checklist/contract-final",
            element: <ContractFinalCheckPage />,
          },
          {
            path: "/checklist/move-in",
            element: <MoveInCheckPage />,
          },

          // 계약 전 체크리스트 상세
          {
            path: "/checklist/contract/:type",
            element: <ContractChecklistDetailPage />,
          },

          // =========================
          // 입주 관리
          // =========================
          {
            path: "/admin",
            element: <AdminHelperPage />,
          },

          {
            path: "/admin/move-in-report",
            element: <MoveInReportPage />,
          },

          {
            path: "/admin/:type",
            element: <AdminDetailPage />,
          },

          // =========================
          // 마이페이지
          // =========================
          {
            path: "/mypage",
            element: <MyPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
