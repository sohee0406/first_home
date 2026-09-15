import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Check } from "lucide-react";

import {
  REQUIRED_CHECKLIST_KEY,
  ALL_ITEMS_FLAT,
} from "../data/onSiteChecklistData";

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

  // ==========================================
  // 필수 체크된 항목
  // ==========================================
  const [requiredItems, setRequiredItems] = useState([]);

  // ==========================================
  // 완료된 항목
  // ==========================================
  const [completedItems, setCompletedItems] = useState([]);

  // ==========================================
  // localStorage에서 필수 항목 불러오기
  // ==========================================
  const loadRequiredItems = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(REQUIRED_CHECKLIST_KEY) || "[]",
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
  // 페이지 처음 들어왔을 때 불러오기
  // ==========================================
  useEffect(() => {
    loadRequiredItems();
  }, []);

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
  }, []);

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

    navigate(`/checklist/on-site/detail/${id}`);
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

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white flex flex-col shadow-sm pb-24">
      {/* ========================================== */}
      {/* 상단 탭 */}
      {/* ========================================== */}

      <div className="flex gap-2 px-4 py-3 bg-white overflow-x-auto no-scrollbar border-b border-gray-100">
        {TABS.map((tab) => {
          const isActive = tab.label === "필수확인";

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
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-12 text-center">
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
