import { Outlet } from "react-router-dom";
import BottomNav from "../components/layout/BottomNav";

export default function BottomTabLayout() {
  return (
    <div className="bg-white min-h-screen">
      {/* 페이지 콘텐츠 */}
      <main className="pb-32">
        <Outlet />
      </main>

      {/* 모든 페이지에서 공통으로 표시 */}
      <BottomNav />
    </div>
  );
}
