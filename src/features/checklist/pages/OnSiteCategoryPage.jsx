import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronRight, Check } from "lucide-react";

import { CATEGORY_ITEMS } from "../data/onSiteChecklistData";
import { useHouse } from "../../house/context/HouseContext";

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
  const [searchParams] = useSearchParams();

  const { houses } = useHouse();

  const houseId = searchParams.get("houseId");

  // 현재 진행 중인 집(체크리스트 저장 대상)
  // houseId가 URL에 있으면 해당 집을 우선 사용
  const currentHouse = (() => {
    if (!houses || houses.length === 0) {
      return null;
    }

    if (houseId) {
      const selectedHouse = houses.find(
        (house) => String(house.id) === String(houseId),
      );

      if (selectedHouse) {
        return selectedHouse;
      }
    }

    return (
      houses.find((house) => {
        const checked = Number(house.checked || 0);
        const total = Number(house.totalInspection || 0);

        return checked < total;
      }) || houses[0]
    );
  })();

  // 다른 탭/페이지로 이동할 때도 houseId를 계속 유지하기 위한 헬퍼
  // (URL에 없던 경우에도 실제로 사용 중인 집 id를 넘겨서 저장 키가 항상 일치하도록 함)
  const getPathWithHouseId = (path) => {
    if (!currentHouse) {
      return path;
    }

    return `${path}?houseId=${currentHouse.id}`;
  };

  // 현재 카테고리 파악 (예: entrance, room 등 / 필수확인은 undefined일 수 있으므로 'on-site-main' 등으로 처리)
  const currentCategory =
    Object.keys(CATEGORY_ITEMS).find((key) =>
      location.pathname.includes(`/checklist/on-site/${key}`),
    ) || "main";

  // 집마다, 카테고리마다 따로 저장되도록 house id를 붙여서 사용한다.
  const STORAGE_KEY = `onsite_completed_${currentCategory}_${
    currentHouse?.id ?? "default"
  }`;

  // 탭이 바뀔 때마다 해당 카테고리의 완료 목록을 localStorage에서 불러옴
  const [completedItems, setCompletedItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 카테고리(탭)가 바뀔 때마다 올바른 localStorage 데이터를 다시 불러오기 위한 useEffect
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setCompletedItems(saved ? JSON.parse(saved) : []);
    } catch {
      setCompletedItems([]);
    }
  }, [currentCategory, STORAGE_KEY]);

  const items =
    CATEGORY_ITEMS[currentCategory === "main" ? "entrance" : currentCategory] ||
    CATEGORY_ITEMS[currentCategory] ||
    [];
  // 참고: '필수확인' 탭인 경우 경로에 따라 처리되는 방식에 맞춰 기존 로직 유지
  // (만약 CATEGORY_ITEMS 구조에 맞게 처리 중이셨다면 기존 방식을 그대로 살렸습니다)

  const handleItemClick = (id) => {
    setCompletedItems((prev) => {
      let nextItems;
      if (prev.includes(id)) {
        nextItems = prev.filter((itemId) => itemId !== id);
      } else {
        nextItems = [...prev, id];
      }

      // 상태가 바뀔 때마다 localStorage에 즉시 저장
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
      return nextItems;
    });
  };

  const handleDetailClick = (e, id) => {
    e.stopPropagation();
    navigate(getPathWithHouseId(`/checklist/on-site/${id}`));
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
    <div className="max-w-md mx-auto   bg-white flex flex-col  shadow-[0_1px_3px_rgba(0,0,0,0.03)] pb-24">
      {/* 탭 */}
      <div className="flex gap-2 px-4 py-3 bg-white overflow-x-auto no-scrollbar border-b border-gray-100">
        {TABS.map((tab) => {
          const isActive = location.pathname === tab.path;

          return (
            <button
              key={tab.label}
              onClick={() => navigate(getPathWithHouseId(tab.path))}
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
            onClick={() =>
              navigate(getPathWithHouseId("/checklist/contract-final"))
            }
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
