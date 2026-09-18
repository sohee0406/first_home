import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, X } from "lucide-react";

export default function SubPageLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const getHeaderTitle = () => {
    const path = location.pathname;

    // =========================
    // 집 관리
    // =========================
    if (path === "/houses") return "집 관리";
    if (path === "/houses/register") return "집 등록하기";
    if (path.startsWith("/houses/")) return "집 상세";

    // =========================
    // 체크리스트
    // =========================
    if (path === "/checklist") return "체크리스트";
    if (path === "/checklist/before-visit") return "집 보러 가기 전";
    if (
      path === "/checklist/on-site" ||
      path.startsWith("/checklist/on-site/")
    ) {
      return "현장 점검";
    }
    if (path === "/checklist/around") return "주변 점검";
    if (path === "/checklist/contract") return "계약 전";
    if (path === "/checklist/contract/registry") return "등기부등본";
    if (path === "/checklist/contract/landlord") return "임대인 정보";
    if (path === "/checklist/contract/mortgage") return "근저당 확인";
    if (path === "/checklist/contract/management-fee") return "관리비 확인";
    if (path === "/checklist/contract/special-clause") return "특약사항";
    if (path === "/checklist/contract-final") return "계약 전";
    if (path === "/checklist/move-in") return "입주 전";

    // =========================
    // 입주 관리
    // =========================
    if (path === "/admin") return "행정 도우미";

    if (path === "/admin/moveIn") return "전입신고";
    if (path === "/admin/fixedDate") return "확정일자";
    if (path === "/admin/rentalReport") return "임대차 신고";
    if (path === "/admin/parking") return "차량 주차 등록";

    // 기존 전입신고 페이지
    if (path === "/admin/move-in-report") return "전입신고";

    // =========================
    // 마이페이지
    // =========================
    if (path === "/mypage") return "마이페이지";

    return "상세 정보";
  };

  return (
    <div className="max-w-md mx-auto   bg-white  shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <header className="h-[60px] flex items-center justify-between px-4 bg-white border-b border-gray-100 sticky top-0 z-30">
        {/* 뒤로가기 */}
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-full"
          aria-label="뒤로가기"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        {/* 제목 */}
        <span className="font-bold text-gray-950 text-[18px]">
          {getHeaderTitle()}
        </span>

        {/* 홈으로 */}
        <button
          onClick={() => navigate("/")}
          className="w-9 h-9 flex items-center justify-center rounded-full"
          aria-label="홈으로 이동"
        >
          <X className="w-6 h-6 text-gray-800" />
        </button>
      </header>

      <main className="pb-24">
        <Outlet />
      </main>
    </div>
  );
}
