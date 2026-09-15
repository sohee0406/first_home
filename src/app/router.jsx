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
import OnSiteCategoryPage from "../features/checklist/pages/OnSiteCategoryPage";
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
      // =========================
      // 홈
      // =========================
      {
        path: "/",
        element: <HomePage />,
      },

      // =========================
      // 홈 제외 모든 페이지
      // =========================
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

          // =========================
          // 현장 점검 - 필수확인
          // =========================
          {
            path: "/checklist/on-site",
            element: <OnSiteCheckPage />,
          },

          // =========================
          // 현장 점검 - 공간별
          // =========================
          {
            path: "/checklist/on-site/entrance",
            element: <OnSiteCategoryPage />,
          },
          {
            path: "/checklist/on-site/room",
            element: <OnSiteCategoryPage />,
          },
          {
            path: "/checklist/on-site/kitchen",
            element: <OnSiteCategoryPage />,
          },
          {
            path: "/checklist/on-site/bathroom",
            element: <OnSiteCategoryPage />,
          },
          {
            path: "/checklist/on-site/etc",
            element: <OnSiteCategoryPage />,
          },

          // =========================
          // 현장 점검 - 상세
          // =========================
          // 자세히 보기에서 사용하는 경로
          // /checklist/on-site/detail/water
          // /checklist/on-site/detail/light
          // 등
          {
            path: "/checklist/on-site/detail/:id",
            element: <ChecklistDetailPage />,
          },

          // 기존에 사용하던 상세 경로도 유지
          // /checklist/on-site/water
          // /checklist/on-site/light
          // 등
          {
            path: "/checklist/on-site/:id",
            element: <ChecklistDetailPage />,
          },

          // =========================
          // 주변 점검
          // =========================
          {
            path: "/checklist/around",
            element: <AroundCheckPage />,
          },

          // =========================
          // 계약 전 최종 확인
          // =========================
          {
            path: "/checklist/contract-final",
            element: <ContractFinalCheckPage />,
          },

          // =========================
          // 입주 점검
          // =========================
          {
            path: "/checklist/move-in",
            element: <MoveInCheckPage />,
          },

          // =========================
          // 계약 전 체크리스트 상세
          // =========================
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
