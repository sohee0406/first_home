import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, House, ClipboardCheck, FileText, User } from "lucide-react";
import logo from "../../img/logo.png";

// 홈 등 최상위 화면 상단에 쓰이는 로고 + 메뉴 헤더
export default function TopHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "집 관리",
      icon: House,
      path: "/houses",
    },
    {
      label: "체크리스트",
      icon: ClipboardCheck,
      path: "/checklist",
    },
    {
      label: "입주 후 챙길 일",
      icon: FileText,
      path: "/admin",
    },
    {
      label: "마이페이지",
      icon: User,
      path: "/mypage",
    },
  ];

  const handleMenuClick = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* 상단 헤더 */}
      <header className="flex items-center justify-between px-4 py-3 bg-white">
        {/* 로고 */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img src={logo} alt="첫집 로고" className="w-8 h-8 object-contain" />
        </div>

        {/* 햄버거 메뉴 */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-full"
          aria-label="메뉴 열기"
        >
          <Menu size={22} className="text-gray-700" />
        </button>
      </header>

      {/* 배경 오버레이 */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* 오른쪽 사이드 메뉴 */}
      {/* 오른쪽 → 왼쪽으로 열림 */}
      <aside
        className={`
          fixed
          top-0
          right-0
          h-full
          w-[280px]
          bg-white
          z-50
            shadow-[0_1px_3px_rgba(0,0,0,0.03)]
          transform
          transition-transform
          duration-300
          ease-out
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* 메뉴 상단 */}
        <div className="h-[60px] flex items-center justify-between px-4 border-b border-gray-100">
          {/* 로고 */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="첫집 로고"
              className="w-8 h-8 object-contain"
            />
          </div>

          {/* 닫기 버튼 */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-full"
            aria-label="메뉴 닫기"
          >
            <X size={22} className="text-gray-700" />
          </button>
        </div>

        {/* 메뉴 목록 */}
        <nav className="px-4 py-5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleMenuClick(item.path)}
                className="w-full flex items-center gap-4 px-3 py-4 rounded-xl text-left"
              >
                <Icon size={21} className="text-gray-700" />

                <span className="text-[15px] font-medium text-gray-800">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* 하단 안내 문구 */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-7">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-[13px] font-semibold text-gray-700 mb-1">
              첫 자취, 어렵지 않게
            </p>

            <p className="text-[12px] text-gray-500 leading-relaxed">
              집을 확인하고 계약부터 입주까지
              <br />
              첫집과 함께 꼼꼼하게 준비해보세요.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
