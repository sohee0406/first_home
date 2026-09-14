import { useNavigate } from "react-router-dom";

const CHECKLIST_ITEMS = [
  {
    id: 1,
    title: "등기부등본",
    badge: "중요",
    description: "소유자의 권리관계를 확인하세요",
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
    badge: "중요",
    description: "실제 임대인과 계약하는지 확인하세요",
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
    badge: "중요",
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
    badge: "중요",
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
    badge: "중요",
    description: "계약서 특약을 작성하세요",
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

export default function ContractChecklistPage() {
  const navigate = useNavigate();

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
        </div>

        {/* 체크리스트 카드 */}
        <div className="flex flex-col space-y-3">
          {CHECKLIST_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(item.path)}
              className="w-full p-4 rounded-2xl border border-gray-100 bg-white shadow-sm hover:bg-gray-50 active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center space-x-4"
            >
              {/* 아이콘 */}
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                {item.icon}
              </div>

              {/* 텍스트 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-0.5">
                  <span className="font-bold text-gray-900 text-base">
                    {item.title}
                  </span>
                </div>

                <p className="text-sm text-gray-500 truncate">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <div className="mt-8 flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 py-4 bg-[#EAFEF1] text-[#26D383] font-bold text-lg rounded-2xl  "
        >
          이전
        </button>

        <button
          onClick={() => navigate("/checklist/move-in")}
          className="flex-1 py-4 text-white bg-[#26D383] font-bold text-lg rounded-2xl  "
        >
          확인
        </button>
      </div>
    </div>
  );
}
