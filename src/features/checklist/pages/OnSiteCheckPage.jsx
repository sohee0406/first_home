import { useNavigate } from "react-router-dom";

// 필수확인 페이지
const TABS = [
  { label: "필수확인", path: "/checklist/on-site" },
  { label: "현관", path: "/checklist/on-site/entrance" },
  { label: "방", path: "/checklist/on-site/room" },
  { label: "주방", path: "/checklist/on-site/kitchen" },
  { label: "거실", path: "/checklist/on-site/living-room" },
  { label: "기타", path: "/checklist/on-site/etc" },
];

export default function OnSiteCheckPage() {
  const navigate = useNavigate();

  // ==========================================
  // 필수확인 하드코딩 테스트용
  // ==========================================

  const checkListItems = [
    {
      id: "water",
      title: "수압",
      badgeType: "중요",
      badgeColor: "text-red-500",
      description: "싱크대와 샤워기에서 물을 동시에 틀어보세요",
    },

    {
      id: "light",
      title: "채광",
      badgeType: "중요",
      badgeColor: "text-red-500",
      description: "창문을 열고 채광 상태를 확인하세요",
    },

    {
      id: "drain",
      title: "배수",
      badgeType: "확인",
      badgeColor: "text-emerald-500",
      description: "물이 잘 빠지는지 확인하세요",
    },

    {
      id: "mold",
      title: "곰팡이",
      badgeType: "주의",
      badgeColor: "text-amber-500",
      description: "벽/천장/모서리에 곰팡이 흔적을 확인하세요",
    },

    {
      id: "bugs",
      title: "벌레 흔적",
      badgeType: "주의",
      badgeColor: "text-amber-500",
      description: "해충 흔적이 있는지 확인하세요",
    },
  ];

  // ==========================================
  // 필수확인 테스트용
  // ==========================================

  const handleItemClick = (id) => {
    navigate(`/checklist/on-site/detail/${id}`);
  };

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

      <div className="px-4 py-3">
        <span className="font-bold text-gray-900 text-[16px]">16/22 완료</span>
      </div>

      {/* ========================================== */}
      {/* 필수확인 테스트 카드 */}
      {/* ========================================== */}

      <div className="px-4 space-y-3">
        {checkListItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className="
              rounded-2xl
              p-4
              shadow-[0_2px_8px_rgba(0,0,0,0.04)]
              border
              border-gray-100
              cursor-pointer
              active:scale-[0.98]
              transition-transform
              bg-white
            "
          >
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-950 text-[16px]">
                {item.title}
              </h3>

              <span className={`text-[12px] font-semibold ${item.badgeColor}`}>
                ★ {item.badgeType}
              </span>
            </div>

            <p className="text-gray-500 text-[13px]">{item.description}</p>

            <div className="flex justify-end mt-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/checklist/on-site/detail/${item.id}`);
                }}
                className="text-[12px] text-gray-500 font-medium"
              >
                자세히 보기 →
              </button>
            </div>
          </div>
        ))}
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
