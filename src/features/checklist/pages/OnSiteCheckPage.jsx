import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 현장 점검 체크리스트
// 필수확인 / 현관 / 방 / 주방 / 화장실
const TABS = [
  '필수확인',
  '현관',
  '방',
  '주방',
  '화장실',
]

export default function OnSiteCheckPage() {
  const navigate = useNavigate()

  const [tab, setTab] = useState(TABS[0])

  // ==========================================
  // 점검 항목 데이터
  // id가 상세 페이지 URL에 사용됨
  // ==========================================
  const checkListItems = [
    {
      id: 'water',
      title: '수압',
      badgeType: '중요',
      badgeColor: 'text-red-500',
      description: '싱크대와 샤워기에서 물을 동시에 틀어보세요',
      selected: false,
    },

    {
      id: 'light',
      title: '채광',
      badgeType: '중요',
      badgeColor: 'text-red-500',
      description: '창문을 열고 채광 상태를 확인하세요',
      selected: false,
    },

    {
      id: 'drain',
      title: '배수',
      badgeType: '확인',
      badgeColor: 'text-emerald-500',
      description: '물이 잘 빠지는지 확인하세요',
      selected: false,
    },

    {
      id: 'mold',
      title: '곰팡이',
      badgeType: '주의',
      badgeColor: 'text-amber-500',
      description: '벽/천장/모서리에 곰팡이 흔적을 확인하세요',
      selected: false,
    },

    {
      id: 'bugs',
      title: '벌레 흔적',
      badgeType: '주의',
      badgeColor: 'text-amber-500',
      description: '해충 흔적이 있는지 확인하세요',
      selected: false,
    },
  ]

  // ==========================================
  // 닫기
  // ==========================================
  const handleClose = () => {
    navigate('/')
  }

  // ==========================================
  // 항목 클릭
  // ==========================================
  const handleItemClick = (id) => {
    navigate(`/checklist/on-site/${id}`)
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col shadow-sm pb-24">

      {/* ========================================== */}
      {/* 상단 탭 */}
      {/* ========================================== */}
      <div className="flex gap-2 px-4 py-3 bg-white overflow-x-auto no-scrollbar border-b border-gray-100">
        {TABS.map((t) => {
          const isActive = tab === t

          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-2 rounded-xl text-[14px] font-medium shrink-0 transition-none"
              style={{
                backgroundColor: isActive
                  ? '#EAFEF1'
                  : '#F3F4F6',
                color: isActive
                  ? '#26D383'
                  : '#4B5563',
              }}
            >
              {t}
            </button>
          )
        })}
      </div>

      {/* ========================================== */}
      {/* 진행 상황 */}
      {/* ========================================== */}
      <div className="px-4 py-3">
        <span className="font-bold text-gray-900 text-[16px]">
          16/22 완료
        </span>
      </div>

      {/* ========================================== */}
      {/* 점검 항목 */}
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
            "
            style={{
              backgroundColor: item.selected
                ? '#EAFEF1'
                : '#FFFFFF',
            }}
          >

            {/* 제목 + 중요도 */}
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-950 text-[16px]">
                {item.title}
              </h3>

              <span
                className={`text-[12px] font-semibold ${item.badgeColor}`}
              >
                ★ {item.badgeType}
              </span>
            </div>

            {/* 설명 */}
            <p className="text-gray-500 text-[13px]">
              {item.description}
            </p>

          </div>
        ))}

      </div>

      {/* ========================================== */}
      {/* 하단 확인 버튼 */}
      {/* ========================================== */}
      <div className="px-4 pt-6 pb-4 bg-gray-50 mt-auto">
        <button
          className="w-full py-3.5 text-white font-bold rounded-xl shadow-sm text-[18px]"
          style={{
            backgroundColor: '#26D383',
          }}
        >
          확인
        </button>
      </div>

    </div>
  )
}