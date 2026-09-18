import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronRight, Check } from "lucide-react";

import {
  getRequiredChecklistKey,
  ALL_ITEMS_FLAT,
} from "../data/onSiteChecklistData";
import { useHouse } from "../../house/context/HouseContext";

// 필수확인 항목 중 완료(체크)한 항목을 저장하는 키
// 집(house)마다 따로 저장되도록 house id를 붙여서 사용한다.
function getCompletedStorageKey(houseId) {
  return houseId
    ? `first_home_onsite_completed_checklist_${houseId}`
    : "first_home_onsite_completed_checklist";
}

function loadCompletedItems(storageKey) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

// ==========================================
// 상단 탭
// ==========================================
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

export default function OnSiteCheckPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { houses, updateChecklistProgress } = useHouse();

  const houseId = searchParams.get("houseId");

  // 현재 진행 중인 집(체크리스트 진행 상태를 반영할 대상)
  // houseId가 URL에 있으면 해당 집을 우선 사용
  const currentHouse = useMemo(() => {
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
  }, [houses, houseId]);

  const completedStorageKey = getCompletedStorageKey(currentHouse?.id);
  const requiredStorageKey = getRequiredChecklistKey(currentHouse?.id);

  // 다른 탭/페이지로 이동할 때도 houseId를 계속 유지하기 위한 헬퍼
  // (URL에 없던 경우에도 실제로 사용 중인 집 id를 넘겨서 저장 키가 항상 일치하도록 함)
  const getPathWithHouseId = (path) => {
    if (!currentHouse) {
      return path;
    }

    return `${path}?houseId=${currentHouse.id}`;
  };

  // ==========================================
  // 필수 체크된 항목
  // ==========================================
  const [requiredItems, setRequiredItems] = useState([]);

  // ==========================================
  // 완료된 항목 (집마다 따로, 새로고침/재방문해도 유지되도록 저장)
  // ==========================================
  const [completedItems, setCompletedItems] = useState(() =>
    loadCompletedItems(completedStorageKey),
  );

  // 대상 집이 바뀌면 해당 집에 저장된 완료 목록을 다시 불러옴
  useEffect(() => {
    setCompletedItems(loadCompletedItems(completedStorageKey));
  }, [completedStorageKey]);

  // ==========================================
  // localStorage에서 필수 항목 불러오기 (집마다 따로 저장됨)
  // ==========================================
  const loadRequiredItems = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(requiredStorageKey) || "[]",
      );

      if (Array.isArray(saved)) {
        setRequiredItems(saved);
      } else {
        setRequiredItems([]);
      }
    } catch {
      setRequiredItems([]);
    }
  };

  // ==========================================
  // 처음 들어왔을 때, 그리고 대상 집이 바뀔 때마다 불러오기
  // ==========================================
  useEffect(() => {
    loadRequiredItems();
  }, [requiredStorageKey]);

  // ==========================================
  // 다른 페이지에서 돌아왔을 때
  // localStorage 최신 상태 다시 확인
  // ==========================================
  useEffect(() => {
    const handleStorageChange = () => {
      loadRequiredItems();
    };

    const handleRequiredChecklistChange = () => {
      loadRequiredItems();
    };

    window.addEventListener("storage", handleStorageChange);

    window.addEventListener(
      "requiredChecklistChanged",
      handleRequiredChecklistChange,
    );

    window.addEventListener("focus", loadRequiredItems);

    return () => {
      window.removeEventListener("storage", handleStorageChange);

      window.removeEventListener(
        "requiredChecklistChanged",
        handleRequiredChecklistChange,
      );

      window.removeEventListener("focus", loadRequiredItems);
    };
  }, [requiredStorageKey]);

  // ==========================================
  // 필수확인에 등록된 항목만 가져오기
  // ==========================================
  const checkListItems = ALL_ITEMS_FLAT.filter((item) =>
    requiredItems.includes(item.id),
  );

  // ==========================================
  // 완료 처리
  // ==========================================
  const handleItemClick = (id) => {
    setCompletedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      }

      return [...prev, id];
    });
  };

  // ==========================================
  // 자세히 보기
  // ==========================================
  const handleDetailClick = (e, id) => {
    e.stopPropagation();

    navigate(getPathWithHouseId(`/checklist/on-site/detail/${id}`));
  };

  // ==========================================
  // 완료된 항목을 아래로 이동
  // ==========================================
  const sortedItems = [...checkListItems].sort((a, b) => {
    const aCompleted = completedItems.includes(a.id);
    const bCompleted = completedItems.includes(b.id);

    if (aCompleted === bCompleted) {
      return 0;
    }

    return aCompleted ? 1 : -1;
  });

  // ==========================================
  // 전체 선택 개수
  // ==========================================
  const totalCount = checkListItems.length;

  // ==========================================
  // 완료 개수
  // ==========================================
  const checkedCount = completedItems.filter((id) =>
    requiredItems.includes(id),
  ).length;

  // ==========================================
  // 완료 상태를 집 별로 로컬스토리지에 저장
  // ==========================================
  useEffect(() => {
    try {
      localStorage.setItem(completedStorageKey, JSON.stringify(completedItems));
    } catch (error) {
      console.error("현장 점검 완료 상태 저장 실패:", error);
    }
  }, [completedItems, completedStorageKey]);

  // ==========================================
  // 필수확인 진행 상태를 HouseContext에 반영
  // (총 개수 = 필수확인에 추가한 항목 수)
  // ==========================================
  useEffect(() => {
    if (!currentHouse) {
      return;
    }

    updateChecklistProgress(
      currentHouse.id,
      "현장 점검",
      checkedCount,
      totalCount,
    );
  }, [currentHouse?.id, checkedCount, totalCount]);

  return (
    <div className="max-w-md mx-auto   bg-white flex flex-col  shadow-[0_1px_3px_rgba(0,0,0,0.03)] pb-24">
      {/* ========================================== */}
      {/* 상단 탭 */}
      {/* ========================================== */}

      <div className="flex gap-2 px-4 py-3 bg-white overflow-x-auto no-scrollbar border-b border-gray-100">
        {TABS.map((tab) => {
          const isActive = tab.label === "필수확인";

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

      {/* ========================================== */}
      {/* 진행 상황 */}
      {/* ========================================== */}

      <div className="px-4 py-4">
        <span className="font-bold text-gray-900 text-[16px]">
          {checkedCount}/{totalCount} 완료
        </span>
      </div>

      {/* ========================================== */}
      {/* 카드 */}
      {/* ========================================== */}

      <div className="px-4 space-y-3">
        {sortedItems.length > 0 ? (
          sortedItems.map((item) => {
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

                  {/* 체크 */}
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
                      text-[12px]
                      font-medium
                      ${isCompleted ? "text-gray-400" : "text-gray-500"}
                    `}
                  >
                    자세히 보기
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-12 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#EAFEF1] text-[#26D383]">
              ✓
            </div>

            <p className="text-[14px] font-bold text-gray-700">
              아직 선택한 필수 항목이 없어요.
            </p>

            <p className="mt-2 text-[12px] leading-relaxed text-gray-400">
              현장 점검 자세히 보기를 확인한 뒤
              <br />
              필수 항목 추가를 눌러주세요.
            </p>
          </div>
        )}
      </div>

      {/* ========================================== */}
      {/* 하단 버튼 */}
      {/* ========================================== */}

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
