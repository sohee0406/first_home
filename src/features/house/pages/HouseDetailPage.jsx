import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle2, AlertTriangle, X } from 'lucide-react'
import MemoBox from '../components/MemoBox'

export default function HouseDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  // ==========================================
  // 임시 집 데이터
  // 나중에 실제 데이터로 교체
  // ==========================================
  const house = {
    id,
    name: 'ㅁㅁ동 ㅇㅇ빌라',

    deposit: '1,000',
    rent: '60',
    maintenance: '10',

    checked: 35,

    checkItems: [
      {
        title: '집 보러가기 전',
        status: '완료',
        value: null,
        path: '/checklist/before-visit',
      },
      {
        title: '현장 점검',
        status: 'progress',
        value: '16/22',
        path: '/checklist/on-site',
      },
      {
        title: '주변 점검',
        status: 'progress',
        value: '4/6',
        path: '/checklist/around',
      },
      {
        title: '계약 전',
        status: 'progress',
        value: '0/8',
        path: '/checklist/contract-final',
      },
      {
        title: '입주 후',
        status: 'progress',
        value: '0/5',
        path: '/checklist/move-in',
      },
    ],

    warningCount: 4,

    warningItems: [
      '배수',
      '소음',
      '관리비',
      '특약 사항',
    ],
  }

  // ==========================================
  // 점검 페이지 이동
  // ==========================================
  const handleCheckItemClick = (path) => {
    navigate(path)
  }

  return (
    <div className="bg-white min-h-screen pb-24">

      {/* ========================================== */}
      {/* 이미지 영역 */}
      {/* ========================================== */}

      <section className="px-4 pt-4">

        {/* 더보기 */}
        <div className="flex justify-end h-5">
          <button
            className="text-gray-900 text-[20px] font-bold leading-none"
            aria-label="더보기"
          >
            •••
          </button>
        </div>

        {/* 이미지 업로드 영역 */}
        <button
          className="
            w-full
            h-[202px]
            mt-2
            rounded-xl
            border
            border-dashed
            border-gray-300
            bg-white
            flex
            flex-col
            items-center
            justify-center
          "
        >
          <p className="text-[18px] font-semibold text-gray-400">
            이미지가 없어요
          </p>

          <p className="text-[18px] font-semibold text-gray-400 mt-2">
            사진을 등록해볼까요?
          </p>

          <p className="text-[13px] text-gray-400 mt-16">
            + 사진 추가하기
          </p>
        </button>

      </section>


      {/* ========================================== */}
      {/* 금액 정보 */}
      {/* ========================================== */}

      <section className="px-5 mt-5">

        <div className="grid grid-cols-3 text-center">

          {/* 보증금 */}
          <div>
            <p className="text-[14px] font-semibold text-gray-900">
              보증금
            </p>

            <p className="mt-4 text-[13px] text-gray-900">
              약{' '}
              <span className="text-[#26D383] text-[18px]">
                {house.deposit}
              </span>
              만원
            </p>
          </div>

          {/* 월세 */}
          <div>
            <p className="text-[14px] font-semibold text-gray-900">
              월세
            </p>

            <p className="mt-4 text-[13px] text-gray-900">
              약{' '}
              <span className="text-[#26D383] text-[18px]">
                {house.rent}
              </span>
              만원
            </p>
          </div>

          {/* 관리비 */}
          <div>
            <p className="text-[14px] font-semibold text-gray-900">
              관리비
            </p>

            <p className="mt-4 text-[13px] text-gray-900">
              약{' '}
              <span className="text-[#26D383] text-[18px]">
                {house.maintenance}
              </span>
              만원
            </p>
          </div>

        </div>

      </section>


      {/* ========================================== */}
      {/* 집 체크 진행률 */}
      {/* ========================================== */}

      <section className="mx-4 mt-10 rounded-xl bg-[#EAFEF1] px-6 py-5">

        <p className="text-[14px] font-semibold text-gray-900">
          집 체크 진행률
        </p>

        <div className="flex items-center gap-3 mt-4">

          <div className="flex-1 h-[10px] bg-white rounded-full overflow-hidden">

            <div
              className="h-full bg-[#26D383] rounded-full"
              style={{
                width: `${house.checked}%`,
              }}
            />

          </div>

          <span className="text-[13px] text-gray-900 shrink-0">
            {house.checked}%
          </span>

        </div>

      </section>


      {/* ========================================== */}
      {/* 점검 진행 현황 */}
      {/* ========================================== */}

      <section
        className="
          mx-4
          mt-8
          rounded-xl
          bg-white
          border
          border-gray-100
          shadow-[0_1px_8px_rgba(0,0,0,0.04)]
          px-5
          py-3
        "
      >

        {house.checkItems.map((item, index) => {

          const isLast =
            index === house.checkItems.length - 1

          return (
            <button
              key={item.title}
              onClick={() => handleCheckItemClick(item.path)}
              className={`
                w-full
                flex
                items-center
                py-3.5
                text-left
                ${!isLast ? 'border-b border-gray-100' : ''}
              `}
            >

              {/* 체크 아이콘 */}
              <div className="shrink-0">

                <CheckCircle2
                  size={19}
                  strokeWidth={1.5}
                  className="text-[#26D383]"
                />

              </div>

              {/* 제목 */}
              <span className="ml-2 text-[14px] font-medium text-gray-900">
                {item.title}
              </span>

              {/* 오른쪽 상태 */}
              <div className="ml-auto">

                {item.status === '완료' ? (

                  <span className="text-[13px] font-semibold text-[#26D383] flex items-center gap-1">
                    <CheckCircle2
                      size={17}
                      strokeWidth={2}
                    />
                    완료
                  </span>

                ) : (

                  <span className="text-[13px] text-gray-900">
                    {item.value}
                  </span>

                )}

              </div>

            </button>
          )
        })}

      </section>


      {/* ========================================== */}
      {/* 확인 필요 알림 */}
      {/* ========================================== */}

      <section className="mx-4 mt-6">

        <div className="relative rounded-xl bg-[#FFF0F0] px-3 py-3">

          {/* 닫기 */}
          <button
            className="
              absolute
              right-2
              top-2
              text-red-500
            "
          >
            <X size={15} />
          </button>

          {/* 제목 */}
          <div className="flex items-center gap-1">

            <AlertTriangle
              size={16}
              fill="currentColor"
              className="text-red-500"
            />

            <p className="text-[12px] font-semibold text-red-500">
              확인 필요 항목 {house.warningCount}개
            </p>

          </div>

          {/* 항목 */}
          <p className="mt-1 text-[12px] text-red-400">
            {house.warningItems.join(', ')}
          </p>

        </div>

      </section>


      {/* ========================================== */}
      {/* 메모 */}
      {/* ========================================== */}

      <section className="px-4 mt-7 pb-8">

        

        <MemoBox />

      </section>

    </div>
  )
}