import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, X, Plus, Check, Lightbulb, Trash2 } from "lucide-react";
import { Icon } from "@iconify/react";

import { useHouse } from "../../house/context/HouseContext";

const STORAGE_KEY = "first_home_before_visit_checklist";

const DEFAULT_PREP_ITEMS = [
  {
    id: "prep-phone",
    text: "휴대폰",
    checked: false,
  },
  {
    id: "prep-tape",
    text: "줄자",
    checked: false,
  },
  {
    id: "prep-notebook",
    text: "준비물",
    checked: false,
  },
];

const DEFAULT_CHECK_ITEMS = [
  {
    id: "check-traffic",
    text: "주변교통",
    checked: false,
  },
  {
    id: "check-parking",
    text: "주차여부",
    checked: false,
  },
  {
    id: "check-option",
    text: "옵션",
    checked: false,
  },
];

function getSavedChecklist() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return {
        prepItems: DEFAULT_PREP_ITEMS,
        checkItems: DEFAULT_CHECK_ITEMS,
      };
    }

    const parsed = JSON.parse(saved);

    return {
      prepItems: Array.isArray(parsed.prepItems)
        ? parsed.prepItems
        : DEFAULT_PREP_ITEMS,

      checkItems: Array.isArray(parsed.checkItems)
        ? parsed.checkItems
        : DEFAULT_CHECK_ITEMS,
    };
  } catch (error) {
    console.error("체크리스트 불러오기 실패:", error);

    return {
      prepItems: DEFAULT_PREP_ITEMS,
      checkItems: DEFAULT_CHECK_ITEMS,
    };
  }
}

export default function BeforeVisitPage() {
  const navigate = useNavigate();

  const { houses, updateChecklistProgress } = useHouse();

  const [initialChecklist] = useState(() => getSavedChecklist());

  const [prepItems, setPrepItems] = useState(initialChecklist.prepItems);

  const [checkItems, setCheckItems] = useState(initialChecklist.checkItems);

  const [activeAddSection, setActiveAddSection] = useState(null);

  const [newItemText, setNewItemText] = useState("");

  const [showTip, setShowTip] = useState(true);

  // 현재 집
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

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          prepItems,
          checkItems,
        }),
      );
    } catch (error) {
      console.error("체크리스트 저장 실패:", error);
    }
  }, [prepItems, checkItems]);

  // 전체 항목
  const allItems = useMemo(() => {
    return [...prepItems, ...checkItems];
  }, [prepItems, checkItems]);

  // 아직 체크하지 않은 개수
  const remainingCount = useMemo(() => {
    return allItems.filter((item) => !item.checked).length;
  }, [allItems]);

  // 체크 완료한 개수
  const checkedCount = useMemo(() => {
    return allItems.filter((item) => item.checked).length;
  }, [allItems]);

  // 준비물 체크
  const togglePrepItem = (id) => {
    setPrepItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              checked: !item.checked,
            }
          : item,
      ),
    );
  };

  // 미리 확인할 것 체크
  const toggleCheckItem = (id) => {
    setCheckItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              checked: !item.checked,
            }
          : item,
      ),
    );
  };

  /*
   * 현재 체크리스트의 진행률을
   * HouseContext에 반영
   */
  useEffect(() => {
    if (!currentHouse) {
      return;
    }

    updateChecklistProgress(
      currentHouse.id,
      "집 보러가기 전",
      checkedCount,
      allItems.length,
    );
  }, [currentHouse?.id, checkedCount, allItems.length]);

  // 추가 버튼
  const handleOpenAdd = (section) => {
    if (activeAddSection === section) {
      setActiveAddSection(null);
      setNewItemText("");
      return;
    }

    setActiveAddSection(section);
    setNewItemText("");
  };

  // 항목 추가
  const handleAddItem = () => {
    const text = newItemText.trim();

    if (!text || !activeAddSection) {
      return;
    }

    const newItem = {
      id: `${activeAddSection}-${Date.now()}`,
      text,
      checked: false,
      custom: true,
    };

    if (activeAddSection === "prep") {
      setPrepItems((prev) => [...prev, newItem]);
    }

    if (activeAddSection === "check") {
      setCheckItems((prev) => [...prev, newItem]);
    }

    setNewItemText("");
  };

  // 사용자 추가 항목 삭제
  const handleDeleteItem = (section, id) => {
    if (section === "prep") {
      setPrepItems((prev) => prev.filter((item) => item.id !== id));
    }

    if (section === "check") {
      setCheckItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // 엔터로 추가
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem();
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white flex flex-col">
      <div className="flex-1">
        {/* 타이틀 */}
        <section className="flex items-center gap-4 px-4 py-5">
          <div
            className="
              w-16 h-16
              rounded-full
              flex items-center justify-center
              shrink-0
            "
            style={{
              backgroundColor: "#EAFEF1",
            }}
          >
            <Icon icon="fluent-emoji-flat:house" className="w-9 h-9" />
          </div>

          <div>
            <h2 className="font-bold text-gray-900 leading-snug text-[20px]">
              집을 보기 전에
              <br />
              미리 확인해 볼까요?
            </h2>

            <p className="text-gray-500 mt-1 text-[14px]">
              지금 확인할 항목{" "}
              <span className="font-bold text-[#26D383]">
                {remainingCount}개
              </span>
            </p>
          </div>
        </section>

        <div className="py-2">
          {/* 준비물 */}
          <div
            className="
              bg-white
              rounded-2xl
              p-4
              shadow-[0_2px_8px_rgba(0,0,0,0.04)]
              border border-gray-100
              mb-3
              mx-4
            "
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-950 text-[18px]">준비물</h3>

              <button
                type="button"
                onClick={() => handleOpenAdd("prep")}
                className="
                  w-7 h-7
                  bg-gray-50
                  rounded-full
                  flex items-center justify-center
                  active:bg-gray-100
                "
              >
                {activeAddSection === "prep" ? (
                  <X className="w-4 h-4 text-gray-700" />
                ) : (
                  <Plus className="w-4 h-4 text-gray-700" />
                )}
              </button>
            </div>

            <div className="space-y-2.5">
              {prepItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 min-h-[24px]"
                >
                  <button
                    type="button"
                    onClick={() => togglePrepItem(item.id)}
                    className={`
                        w-5 h-5
                        rounded
                        flex items-center justify-center
                        shrink-0
                        ${
                          item.checked
                            ? "bg-[#26D383]"
                            : "bg-white border border-[#26D383]"
                        }
                      `}
                  >
                    {item.checked && (
                      <Check
                        className="
                            w-3.5 h-3.5
                            text-white
                            stroke-[3]
                          "
                      />
                    )}
                  </button>

                  <span
                    className={`
                        text-[14px]
                        flex-1
                        ${
                          item.checked
                            ? "text-gray-400 line-through"
                            : "text-gray-800"
                        }
                      `}
                  >
                    {item.text}
                  </span>

                  {item.custom && (
                    <button
                      type="button"
                      onClick={() => handleDeleteItem("prep", item.id)}
                      className="p-1 text-gray-300"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* +를 눌렀을 때만 표시 */}
            {activeAddSection === "prep" && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    placeholder="추가할 준비물을 입력해주세요"
                    className="
                      flex-1
                      min-w-0
                      h-[42px]
                      px-3
                      rounded-xl
                      bg-gray-50
                      border border-gray-100
                      outline-none
                      text-[13px]
                      focus:border-[#26D383]
                    "
                  />

                  <button
                    type="button"
                    onClick={handleAddItem}
                    disabled={!newItemText.trim()}
                    className="
                      h-[42px]
                      px-4
                      rounded-xl
                      bg-[#26D383]
                      text-white
                      text-[13px]
                      font-bold
                      disabled:bg-gray-200
                      disabled:text-gray-400
                    "
                  >
                    추가
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 미리 확인할 것 */}
          <div
            className="
              bg-white
              rounded-2xl
              p-4
              shadow-[0_2px_8px_rgba(0,0,0,0.04)]
              border border-gray-100
              mb-3
              mx-4
            "
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-950 text-[18px]">
                미리 확인 할 것
              </h3>

              <button
                type="button"
                onClick={() => handleOpenAdd("check")}
                className="
                  w-7 h-7
                  bg-gray-50
                  rounded-full
                  flex items-center justify-center
                  active:bg-gray-100
                "
              >
                {activeAddSection === "check" ? (
                  <X className="w-4 h-4 text-gray-700" />
                ) : (
                  <Plus className="w-4 h-4 text-gray-700" />
                )}
              </button>
            </div>

            <div className="space-y-2.5">
              {checkItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 min-h-[24px]"
                >
                  <button
                    type="button"
                    onClick={() => toggleCheckItem(item.id)}
                    className={`
                        w-5 h-5
                        rounded
                        flex items-center justify-center
                        shrink-0
                        ${
                          item.checked
                            ? "bg-[#26D383]"
                            : "bg-white border border-[#26D383]"
                        }
                      `}
                  >
                    {item.checked && (
                      <Check
                        className="
                            w-3.5 h-3.5
                            text-white
                            stroke-[3]
                          "
                      />
                    )}
                  </button>

                  <span
                    className={`
                        text-[14px]
                        flex-1
                        ${
                          item.checked
                            ? "text-gray-400 line-through"
                            : "text-gray-600"
                        }
                      `}
                  >
                    {item.text}
                  </span>

                  {item.custom && (
                    <button
                      type="button"
                      onClick={() => handleDeleteItem("check", item.id)}
                      className="p-1 text-gray-300"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* +를 눌렀을 때만 표시 */}
            {activeAddSection === "check" && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    placeholder="추가할 항목을 입력해주세요"
                    className="
                      flex-1
                      min-w-0
                      h-[42px]
                      px-3
                      rounded-xl
                      bg-gray-50
                      border border-gray-100
                      outline-none
                      text-[13px]
                      focus:border-[#26D383]
                    "
                  />

                  <button
                    type="button"
                    onClick={handleAddItem}
                    disabled={!newItemText.trim()}
                    className="
                      h-[42px]
                      px-4
                      rounded-xl
                      bg-[#26D383]
                      text-white
                      text-[13px]
                      font-bold
                      disabled:bg-gray-200
                      disabled:text-gray-400
                    "
                  >
                    추가
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* TIP */}
        {showTip && (
          <section className="mx-4 mb-6">
            <div className="flex items-center gap-1.5 mb-2">
              <Lightbulb className="w-5 h-5 text-amber-500 fill-amber-400" />

              <span className="font-bold text-[18px]">
                <span className="text-black">1분</span>{" "}
                <span className="text-amber-500">TIP</span>
              </span>
            </div>

            <div
              className="
                relative
                bg-[#F9FBE7]
                rounded-xl
                p-4
                text-amber-900
                border border-[#F0F4C3]
              "
            >
              <p className="font-medium text-[14px] leading-[22px]">
                창문을 열고 닫기만 하지 말고
              </p>

              <p className="font-medium text-[14px] leading-[22px]">
                창문 틈새 흔적을 확인해보세요
              </p>

              <button
                type="button"
                onClick={() => setShowTip(false)}
                className="
                  absolute
                  top-3
                  right-3
                  text-amber-500
                "
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}
      </div>

      {/* 하단 버튼 */}
      <section className="px-4 pb-5 pt-2 bg-white">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              flex-1
              py-4
              bg-[#EAFEF1]
              text-[#26D383]
              font-bold
              text-[16px]
              rounded-2xl
            "
          >
            이전
          </button>

          <button
            type="button"
            onClick={() => navigate("/checklist/around")}
            className="
              flex-1
              py-4
              text-white
              bg-[#26D383]
              font-bold
              text-[16px]
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
