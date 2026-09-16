import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Check } from "lucide-react";

import { useHouse } from "../../house/context/HouseContext";

// 계약 전 체크리스트 완료 상태를 저장하는 키
const COMPLETED_STORAGE_KEY = "first_home_contract_final_checklist";

function loadCompletedItems() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(COMPLETED_STORAGE_KEY) || "[]",
    );

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

const CHECKLIST_ITEMS = [
  {
    id: 1,
    title: "등기부등본",
    description: "소유자와 권리관계를 확인하세요",
    path: "/checklist/contract/registry",
    icon: (
      <svg
        className="w-6 h-6 text-emerald-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "임대인 정보",
    description: "실제 임대인인지 확인하세요",
    path: "/checklist/contract/landlord",
    icon: (
      <svg
        className="w-6 h-6 text-emerald-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "근저당",
    description: "근저당 설정 여부를 확인하세요",
    path: "/checklist/contract/mortgage",
    icon: (
      <svg
        className="w-6 h-6 text-emerald-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "관리비",
    description: "관리비 포함 항목을 확인하세요",
    path: "/checklist/contract/management-fee",
    icon: (
      <svg
        className="w-6 h-6 text-emerald-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    id: 5,
    title: "특약사항",
    description: "계약서 특약을 확인하세요",
    path: "/checklist/contract/special-clause",
    icon: (
      <svg
        className="w-6 h-6 text-emerald-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
];

export default function ContractFinalCheckPage() {
  const navigate = useNavigate();

  const { houses, updateChecklistProgress } = useHouse();

  const [completedItems, setCompletedItems] = useState(() =>
    loadCompletedItems(),
  );

  // 현재 진행 중인 집(체크리스트 진행 상태를 반영할 대상)
  const currentHouse = useMemo(() => {
    if (!houses || houses.length === 0) {
      return null;
    }

    return (
      houses.find((house) => {
        const checked = Number(house.checked || 0);
        const total = Number(house.totalInspection || 0);

        return checked < total;
      }) || houses[0]
    );
  }, [houses]);

  const handleItemClick = (id) => {
    setCompletedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      }

      return [...prev, id];
    });
  };

  const handleDetailClick = (e, path) => {
    e.stopPropagation();
    navigate(path);
  };

  const sortedItems = [...CHECKLIST_ITEMS].sort((a, b) => {
    const aCompleted = completedItems.includes(a.id);
    const bCompleted = completedItems.includes(b.id);

    if (aCompleted === bCompleted) return 0;

    return aCompleted ? 1 : -1;
  });

  // 완료 상태를 로컬스토리지에 저장
  useEffect(() => {
    try {
      localStorage.setItem(
        COMPLETED_STORAGE_KEY,
        JSON.stringify(completedItems),
      );
    } catch (error) {
      console.error("계약 전 체크리스트 저장 실패:", error);
    }
  }, [completedItems]);

  // 계약 전 진행 상태를 HouseContext에 반영
  useEffect(() => {
    if (!currentHouse) {
      return;
    }

    updateChecklistProgress(
      currentHouse.id,
      "계약 전",
      completedItems.length,
      CHECKLIST_ITEMS.length,
    );
  }, [currentHouse?.id, completedItems.length]);

  return (
    <div className="min-h-screen bg-white px-5 pt-8 pb-12 max-w-md mx-auto flex flex-col justify-between">
      <div>
        {/* 타이틀 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 leading-snug">
            계약 하기전에
            <br />
            이것만큼은 <span className="text-emerald-500">꼭 확인하세요!</span>
          </h1>

          {/* 완료 개수 */}
          <div className="mt-4">
            <span className="font-bold text-gray-900 text-[16px]">
              {completedItems.length}/{CHECKLIST_ITEMS.length} 완료
            </span>
          </div>
        </div>

        {/* 체크리스트 카드 */}
        <div className="flex flex-col space-y-3">
          {sortedItems.map((item) => {
            const isCompleted = completedItems.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`
                  w-full
                  p-4
                  rounded-2xl
                  border
                  cursor-pointer
                  transition-all
                  duration-150
                  active:scale-[0.98]
                  ${
                    isCompleted
                      ? "bg-gray-100 border-gray-200"
                      : "bg-white border-gray-100 shadow-sm hover:bg-gray-50"
                  }
                `}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-4 min-w-0 flex-1">
                    {/* 아이콘 */}
                    <div
                      className={`
                        w-12
                        h-12
                        rounded-full
                        flex
                        items-center
                        justify-center
                        shrink-0
                        border
                        shadow-sm
                        ${
                          isCompleted
                            ? "bg-gray-200 border-gray-200"
                            : "bg-gray-50 border-gray-100"
                        }
                      `}
                    >
                      {isCompleted ? (
                        <Check
                          size={22}
                          strokeWidth={3}
                          className="text-gray-400"
                        />
                      ) : (
                        item.icon
                      )}
                    </div>

                    {/* 텍스트 */}
                    <div className="min-w-0 flex-1">
                      <span
                        className={`
                          font-bold
                          text-base
                          ${isCompleted ? "text-gray-400" : "text-gray-900"}
                        `}
                      >
                        {item.title}
                      </span>

                      <p
                        className={`
                          mt-1
                          text-sm
                          leading-relaxed
                          ${isCompleted ? "text-gray-400" : "text-gray-500"}
                        `}
                      >
                        {item.description}
                      </p>
                    </div>
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
                    onClick={(e) => handleDetailClick(e, item.path)}
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
          })}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="mt-8 flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 py-4 bg-[#EAFEF1] text-[#26D383] font-bold text-lg rounded-2xl"
        >
          이전
        </button>

        <button
          onClick={() => navigate("/checklist/move-in")}
          className="flex-1 py-4 text-white bg-[#26D383] font-bold text-lg rounded-2xl"
        >
          확인
        </button>
      </div>
    </div>
  );
}
