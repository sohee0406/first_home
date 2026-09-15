import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronRight, Check } from "lucide-react";

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

const CHECKLIST_DATA = {
  // ==========================================
  // 현관
  // ==========================================
  entrance: [
    {
      id: `entrance-shoe-rack`,
      title: `신발장`,
      description: `부츠나 장화 등 높은 신발도 수납할 수 있는지 확인하세요.`,
      badgeType: `확인`,
      badgeColor: `text-emerald-500`,
    },
    {
      id: `entrance-bottom`,
      title: `현관하단`,
      description: `하단 띄움 시공으로 자주 신는 신발을 깔끔하게 정리할 수 있는지 확인하세요.`,
      badgeType: `확인`,
      badgeColor: `text-emerald-500`,
    },
    {
      id: `entrance-door`,
      title: `중문`,
      description: `외풍과 소음을 막아주며 부드럽게 열리고 닫히는지 확인하세요.`,
      badgeType: `중요`,
      badgeColor: `text-red-500`,
    },
    {
      id: `entrance-main-door`,
      title: `현관문`,
      description: `현관문이 잘 닫히고 도어락과 카드키가 정상 작동하는지 확인하세요.`,
      badgeType: `중요`,
      badgeColor: `text-red-500`,
    },
    {
      id: `entrance-all-light`,
      title: `일괄소등`,
      description: `외출 시 집안 전체를 한 번에 소등할 수 있는지 확인하세요.`,
      badgeType: `확인`,
      badgeColor: `text-emerald-500`,
    },
    {
      id: `entrance-sensor-light`,
      title: `센서등`,
      description: `현관 센서등이 잘 켜지고 꺼지는지 확인하세요.`,
      badgeType: `확인`,
      badgeColor: `text-emerald-500`,
    },
  ],

  // ==========================================
  // 방
  // ==========================================
  room: [
    {
      id: `room-furniture`,
      title: `가구배치`,
      description: `침대와 책상 등 주요 가구의 크기와 콘센트 위치를 확인하세요.`,
      badgeType: `중요`,
      badgeColor: `text-red-500`,
    },
    {
      id: `room-light-ventilation`,
      title: `채광환기`,
      description: `창문을 통해 채광과 환기가 잘 되는지 확인하세요.`,
      badgeType: `중요`,
      badgeColor: `text-red-500`,
    },
    {
      id: `room-storage`,
      title: `수납공간`,
      description: `붙박이장이나 드레스룸에 습기나 곰팡이 흔적이 없는지 확인하세요.`,
      badgeType: `주의`,
      badgeColor: `text-amber-500`,
    },
    {
      id: `room-finish`,
      title: `마감상태`,
      description: `벽지와 바닥재가 들뜬 곳 없이 깔끔한지 확인하세요.`,
      badgeType: `주의`,
      badgeColor: `text-amber-500`,
    },
    {
      id: `room-door-window`,
      title: `문과창호`,
      description: `방문과 창호가 잘 닫히고 단단하게 잠기는지 확인하세요.`,
      badgeType: `중요`,
      badgeColor: `text-red-500`,
    },
    {
      id: `room-insulation-soundproof`,
      title: `단열방음`,
      description: `외벽 쪽 방의 단열과 외부 소음 차단 상태를 확인하세요.`,
      badgeType: `중요`,
      badgeColor: `text-red-500`,
    },
  ],

  // ==========================================
  // 주방
  // ==========================================
  kitchen: [
    {
      id: `kitchen-cooking`,
      title: `조리기구`,
      description: `주방 후드와 가스레인지 또는 인덕션이 정상 작동하는지 확인하세요.`,
      badgeType: `중요`,
      badgeColor: `text-red-500`,
    },
    {
      id: `kitchen-sink`,
      title: `싱크대`,
      description: `수압이 충분하고 개수대 주변에 악취나 누수가 없는지 확인하세요.`,
      badgeType: `중요`,
      badgeColor: `text-red-500`,
    },
    {
      id: `kitchen-appliance-space`,
      title: `가전공간`,
      description: `냉장고와 식기세척기 등을 놓을 공간이 충분한지 확인하세요.`,
      badgeType: `확인`,
      badgeColor: `text-emerald-500`,
    },
    {
      id: `kitchen-outlet`,
      title: `콘센트`,
      description: `소형 가전을 사용할 수 있도록 콘센트가 충분한지 확인하세요.`,
      badgeType: `중요`,
      badgeColor: `text-red-500`,
    },
    {
      id: `kitchen-upper-lower-cabinet`,
      title: `상하부장`,
      description: `싱크대 상하부장의 수평과 수납 상태를 확인하세요.`,
      badgeType: `확인`,
      badgeColor: `text-emerald-500`,
    },
    {
      id: `kitchen-contamination`,
      title: `주방오염`,
      description: `싱크대와 벽면에 심한 기름때나 착색 흔적이 없는지 확인하세요.`,
      badgeType: `주의`,
      badgeColor: `text-amber-500`,
    },
  ],

  // ==========================================
  // 화장실
  // ==========================================
  bathroom: [
    {
      id: `bathroom-water-drain`,
      title: `수압배수`,
      description: `샤워기와 세면대 물을 동시에 틀어 수압을 확인하세요.`,
      badgeType: `중요`,
      badgeColor: `text-red-500`,
    },
    {
      id: `bathroom-floor-slope`,
      title: `바닥기울기`,
      description: `물이 고이지 않고 빠르게 배수되는지 확인하세요.`,
      badgeType: `중요`,
      badgeColor: `text-red-500`,
    },
    {
      id: `bathroom-ventilation`,
      title: `환기상태`,
      description: `환풍기가 정상 작동하고 곰팡이가 없는지 확인하세요.`,
      badgeType: `중요`,
      badgeColor: `text-red-500`,
    },
    {
      id: `bathroom-sanitary`,
      title: `위생도기`,
      description: `변기 물내림과 온수가 정상적으로 작동하는지 확인하세요.`,
      badgeType: `중요`,
      badgeColor: `text-red-500`,
    },
    {
      id: `bathroom-tile-grout`,
      title: `타일줄눈`,
      description: `타일 줄눈의 균열과 실리콘 곰팡이를 확인하세요.`,
      badgeType: `주의`,
      badgeColor: `text-amber-500`,
    },
    {
      id: `bathroom-storage`,
      title: `욕실수납`,
      description: `욕실 수납장과 거울의 백화 현상이나 파손을 확인하세요.`,
      badgeType: `확인`,
      badgeColor: `text-emerald-500`,
    },
  ],

  // ==========================================
  // 기타
  // ==========================================
  etc: [
    {
      id: `etc-living-direction`,
      title: `거실방향`,
      description: `거실 창의 방향을 확인하여 채광과 일조량을 확인하세요.`,
      badgeType: `중요`,
      badgeColor: `text-red-500`,
    },
    {
      id: `etc-living-space`,
      title: `거실공간`,
      description: `대형 가구와 TV를 배치할 공간이 충분한지 확인하세요.`,
      badgeType: `확인`,
      badgeColor: `text-emerald-500`,
    },
    {
      id: `etc-laundry`,
      title: `세탁실`,
      description: `세탁기와 건조기를 둘 공간과 배수구가 있는지 확인하세요.`,
      badgeType: `중요`,
      badgeColor: `text-red-500`,
    },
    {
      id: `etc-condensation-mold`,
      title: `결로곰팡이`,
      description: `외벽과 창가 주변에 결로와 곰팡이가 없는지 확인하세요.`,
      badgeType: `중요`,
      badgeColor: `text-red-500`,
    },
    {
      id: `etc-security-system`,
      title: `보안시스템`,
      description: `월패드와 경비 시스템, 공동현관 로비폰을 확인하세요.`,
      badgeType: `중요`,
      badgeColor: `text-red-500`,
    },
    {
      id: `etc-living-window`,
      title: `거실창호`,
      description: `거실 이중창의 단열과 방음 상태를 확인하세요.`,
      badgeType: `중요`,
      badgeColor: `text-red-500`,
    },
  ],
};

export default function OnSiteCategoryPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [completedItems, setCompletedItems] = useState([]);

  const currentCategory = Object.keys(CHECKLIST_DATA).find((key) =>
    location.pathname.includes(`/checklist/on-site/${key}`),
  );

  const items = CHECKLIST_DATA[currentCategory] || [];

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
