import { createBrowserRouter, Outlet } from "react-router-dom";
import ScrollToTop from "../components/layout/ScrollToTop";

import BottomTabLayout from "./BottomTabLayout";
import SubPageLayout from "../components/layout/SubPageLayout";

import HomePage from "../features/home/HomePage";

// =========================
// 집 관리
// =========================
import HouseListPage from "../features/house/pages/HouseListPage";
import HouseDetailPage from "../features/house/pages/HouseDetailPage";
import RegisterWizard from "../features/house/pages/register/RegisterWizard";

// =========================
// 체크리스트
// =========================
import ChecklistHubPage from "../features/checklist/pages/ChecklistHubPage";
import BeforeVisitPage from "../features/checklist/pages/BeforeVisitPage";
import OnSiteCheckPage from "../features/checklist/pages/OnSiteCheckPage";
import OnSiteCategoryPage from "../features/checklist/pages/OnSiteCategoryPage";
import ChecklistDetailPage from "../features/checklist/pages/ChecklistDetailPage";
import AroundCheckPage from "../features/checklist/pages/AroundCheckPage";
import MoveInCheckPage from "../features/checklist/pages/MoveInCheckPage";
import ContractFinalCheckPage from "../features/checklist/pages/ContractFinalCheckPage";
import ContractChecklistDetailPage from "../features/checklist/pages/ContractChecklistDetailPage";

// =========================
// 입주 관리
// =========================
import AdminHelperPage from "../features/admin/pages/AdminHelperPage";
import AdminDetailPage from "../features/admin/pages/AdminDetailPage";
import MoveInReportPage from "../features/admin/pages/MoveInReportPage";

// =========================
// 마이페이지
// =========================
import MyPage from "../features/mypage/pages/MyPage";

// =========================
// 내 집 기록
// =========================
import ProgressRecordPage from "../features/records/pages/ProgressRecordPage";
import InspectionRecordPage from "../features/records/pages/InspectionRecordPage";
import ContractRecordPage from "../features/records/pages/ContractRecordPage";
import MovingRecordPage from "../features/records/pages/MovingRecordPage";

const router = createBrowserRouter([
  // ==================================================
  // 전체 페이지 공통
  // ScrollToTop이 모든 페이지 이동에 적용됨
  // ==================================================
  {
    element: (
      // ==================================================
      // 전체 화면(모바일 프레임)
      // - 바깥(회색): 데스크톱 등 넓은 화면에서의 여백
      // - 안쪽(흰색, 393px): 아이폰 16 기준 실제 앱 화면
      // - transform을 줘서 이 박스가 내부 fixed 요소(바텀 네비,
      //   바텀시트, 사이드 메뉴 등)의 기준이 되게 함 →
      //   fixed 요소가 브라우저 창이 아닌 이 프레임 안에만 표시됨
      // ==================================================
      <div className=" w-full flex justify-center bg-[#ececec] overflow-hidden">
        <div
          id="app-frame"
          className="h-full w-full max-w-[393px] bg-white relative overflow-y-auto overflow-x-hidden"
          style={{ transform: "translateZ(0)" }}
        >
          <ScrollToTop />
          <Outlet />
        </div>
      </div>
    ),
    children: [
      // ==================================================
      // 집 등록
      // ⭐ SubPageLayout 없음
      // ⭐ BottomTabLayout도 없음
      // ==================================================
      {
        path: "/houses/register",
        element: <RegisterWizard />,
      },

      // ==================================================
      // BottomTabLayout
      // ==================================================
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
              {
                path: "/checklist/on-site/detail/:id",
                element: <ChecklistDetailPage />,
              },

              // 기존 상세 경로 유지
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

              // =========================
              // 내 집 기록
              // =========================

              // 현재 진행중
              {
                path: "/records/progress",
                element: <ProgressRecordPage />,
              },

              // 점검 완료
              {
                path: "/records/inspection",
                element: <InspectionRecordPage />,
              },

              // 계약 완료
              {
                path: "/records/contract",
                element: <ContractRecordPage />,
              },

              // 입주 완료
              {
                path: "/records/moving",
                element: <MovingRecordPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
