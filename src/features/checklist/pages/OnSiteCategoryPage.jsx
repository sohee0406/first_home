import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronRight, Check } from "lucide-react";

import { CATEGORY_ITEMS } from "../data/onSiteChecklistData";

const TABS = [
  {
    label: "필수확인",
    path: "/checklist/on-site",
  },
  {
    label: "현관",
    path: "/checklist/on-site/entrance",
  },
  {
    label: "방",
    path: "/checklist/on-site/room",
  },
  {
    label: "주방",
    path: "/checklist/on-site/kitchen",
  },
  {
    label: "화장실",
    path: "/checklist/on-site/bathroom",
  },
  {
    label: "기타",
    path: "/checklist/on-site/etc",
  },
];

export default function OnSiteCategoryPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [completedItems, setCompletedItems] = useState([]);

  const currentCategory = Object.keys(CATEGORY_ITEMS).find((key) =>
    location.pathname.includes(`/checklist/on-site/${key}`),
  );

  const items = CATEGORY_ITEMS[currentCategory] || [];

  const handleItemClick = (id) => {
    setCompletedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      }

      return [...prev, id];
    });
  };

  const handleDetailClick = (e, id) => {
    e.stopPropagation();

    navigate(`/checklist/on-site/${id}`);
  };

  const sortedItems = [...items].sort((a, b) => {
    const aCompleted = completedItems.includes(a.id);
    const bCompleted = completedItems.includes(b.id);

    if (aCompleted === bCompleted) {
      return 0;
    }

    return aCompleted ? 1 : -1;
  });

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white flex flex-col shadow-sm pb-24">
      {/* 탭 */}
      <div className="flex gap-2 px-4 py-3 bg-white overflow-x-auto no-scrollbar border-b border-gray-100">
        {TABS.map((tab) => {
          const isActive = location.pathname === tab.path;

          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              className="px-4 py-2 rounded-xl text-[14px] font-medium shrink-0"
              style={{
                backgroundColor: isActive ? "#EAFEF1" : "#F3F4F6",
                color: isActive ? "#26D383" : "#4B5563",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 진행 상황 */}
      <div className="px-4 py-4">
        <span className="font-bold text-gray-900 text-[16px]">
          {completedItems.length}/{items.length} 완료
        </span>
      </div>

      {/* 카드 */}
      <div className="px-4 space-y-3">
        {sortedItems.map((item) => {
          const isCompleted = completedItems.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`
                rounded-2xl
                p-4
                border
                cursor-pointer
                transition-all
                active:scale-[0.98]
                ${
                  isCompleted
                    ? "bg-gray-100 border-gray-200"
                    : "bg-white border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                }
              `}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className={`
                        font-bold
                        text-[16px]
                        ${isCompleted ? "text-gray-400" : "text-gray-950"}
                      `}
                    >
                      {item.title}
                    </h3>

                    <span
                      className={`
                        text-[12px]
                        font-semibold
                        ${isCompleted ? "text-gray-400" : item.badgeColor}
                      `}
                    >
                      ★ {item.badgeType}
                    </span>
                  </div>

                  {/* 설명 영역 너비 */}
                  <p
                    className={`
                      text-[13px]
                      leading-relaxed
                      max-w-[280px]
                      ${isCompleted ? "text-gray-400" : "text-gray-500"}
                    `}
                  >
                    {item.description}
                  </p>
                </div>

                <div
                  className={`
                    w-7
                    h-7
                    shrink-0
                    rounded-full
                    flex
                    items-center
                    justify-center
                    border
                    ${
                      isCompleted
                        ? "bg-gray-300 border-gray-300"
                        : "bg-white border-gray-300"
                    }
                  `}
                >
                  {isCompleted && (
                    <Check size={16} strokeWidth={3} className="text-white" />
                  )}
                </div>
              </div>

              {/* 자세히 보기 */}
              <div className="flex justify-end mt-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={(e) => handleDetailClick(e, item.id)}
                  className={`
                    flex
                    items-center
                    gap-1
                    text-[14px]
                    font-medium
                    ${isCompleted ? "text-gray-400" : "text-gray-500"}
                  `}
                >
                  자세히 보기
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 하단 버튼 */}
      <section className="px-4">
        <div className="mt-8 flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="
              flex-1
              py-4
              bg-[#EAFEF1]
              text-[#26D383]
              font-bold
              text-lg
              rounded-2xl
            "
          >
            이전
          </button>

          <button
            onClick={() => navigate("/checklist/contract-final")}
            className="
              flex-1
              py-4
              text-white
              bg-[#26D383]
              font-bold
              text-lg
              rounded-2xl
            "
          >
            확인
          </button>
        </div>
      </section>
    </div>
  );
}
