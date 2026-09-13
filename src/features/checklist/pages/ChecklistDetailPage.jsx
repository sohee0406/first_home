import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  X,
  AlertCircle,
  Check,
} from 'lucide-react'

// ==========================================
// 항목별 상세 데이터
// id는 OnSiteCheckPage의 id와 동일해야 함
// ==========================================
const CHECKLIST_DATA = {
  // ==========================================
  // 수압
  // ==========================================
  water: {
    title: '수압 확인',

    whyText:
      '수압은 실제로 생활할 때 물이 제대로 나오는지 확인하기 위해 체크해야 합니다.',

    howSteps: [
      '싱크대나 샤워기에서 물을 틀어보세요',
      '동시에 사용해 수압 변화를 확인하세요',
    ],

    warningText:
      '물이 너무 약하거나, 동시에 틀었을 때 수압이 약해지는 경우',

    ifWeak: [
      '수압이 약하면 샤워할 때 물이 제대로 나오지 않을 수 있어요',
      '물이 약하면 배수가 잘 안 되거나 변기 물이 제대로 내려가지 않을 수 있어요',
      '물 공급이 원활하지 않아 세탁에 불편할 수 있어요',
      '주방·세면대 등 동시에 여러 곳에서 물을 사용하면 물줄기가 더 약해질 수 있어요',
      '입주 후 발견하면 해결이 번거로워요. 건물 자체의 배관 문제라면 개인이 해결하기 어려울 수 있어요',
    ],
  },

  // ==========================================
  // 채광
  // ==========================================
  light: {
    title: '채광 확인',

    whyText:
      '채광은 집안의 밝기와 곰팡이 예방에 큰 영향을 줍니다.',

    howSteps: [
      '낮 시간에 방문하여 창문 방향을 확인하세요',
      '모든 조명을 끄고 자연광만으로 밝기를 체크하세요',
    ],

    warningText:
      '창문 앞에 건물이 가로막혀 햇빛이 전혀 안 드는 경우',

    ifWeak: [
      '집안이 습해져 곰팡이가 쉽게 생길 수 있어요',
      '겨울철 난방 효율이 떨어질 수 있어요',
    ],
  },

  // ==========================================
  // 배수
  // ==========================================
  drain: {
    title: '배수 확인',

    whyText:
      '배수가 잘되지 않으면 물이 고이거나 악취가 발생할 수 있습니다.',

    howSteps: [
      '싱크대와 세면대에 물을 충분히 받아보세요',
      '물이 빠지는 속도와 역류 여부를 확인하세요',
    ],

    warningText:
      '물이 천천히 빠지거나 역류하는 경우',

    ifWeak: [
      '물이 고여 악취가 발생할 수 있어요',
      '배수관 문제가 있다면 입주 후 불편할 수 있어요',
    ],
  },

  // ==========================================
  // 곰팡이
  // ==========================================
  mold: {
    title: '곰팡이 확인',

    whyText:
      '곰팡이는 습기와 결로 문제의 신호일 수 있습니다.',

    howSteps: [
      '벽과 천장 모서리를 확인하세요',
      '가구 뒤쪽과 창문 주변도 살펴보세요',
    ],

    warningText:
      '검은색이나 초록색 곰팡이 흔적이 보이는 경우',

    ifWeak: [
      '곰팡이가 반복적으로 발생할 수 있어요',
      '벽지나 벽면 손상으로 이어질 수 있어요',
    ],
  },

  // ==========================================
  // 벌레 흔적
  // ==========================================
  bugs: {
    title: '벌레 흔적 확인',

    whyText:
      '벌레 흔적은 집 안의 위생 상태와 해충 문제를 파악하는 데 도움이 됩니다.',

    howSteps: [
      '싱크대 아래와 배수구 주변을 확인하세요',
      '벽 모서리와 수납장 안쪽을 살펴보세요',
    ],

    warningText:
      '벌레 사체나 배설물, 알 등의 흔적이 보이는 경우',

    ifWeak: [
      '입주 후 해충이 반복적으로 나타날 수 있어요',
      '방역이나 추가적인 관리가 필요할 수 있어요',
    ],
  },
}

export default function ChecklistDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  // URL의 id와 일치하는 데이터 가져오기
  const data = CHECKLIST_DATA[id] || CHECKLIST_DATA.water

  const [memo, setMemo] = useState(
    '샤워기는 괜찮은데 싱크대가 좀 약함'
  )

  const [images, setImages] = useState([
    '/path/to/img1.jpg',
    '/path/to/img2.jpg',
  ])

  // ==========================================
  // 확인 완료
  // ==========================================
  const handleComplete = () => {
    navigate(-1)
  }

  return (
    <div className="p-4 space-y-6 pb-24">

      {/* ========================================== */}
      {/* 1. 메모 */}
      {/* ========================================== */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">

        <div className="flex justify-between items-center mb-2">

          <span className="font-bold text-gray-950 text-[16px]">
            메모
          </span>

          <span className="text-emerald-500 font-bold text-[13px] flex items-center gap-1 bg-[#EAFEF1] px-2 py-0.5 rounded-md">
            필수
            <Check className="w-3.5 h-3.5" />
          </span>

        </div>

        <div className="bg-gray-50 p-4 rounded-xl text-gray-900 text-[14px] mb-3 leading-relaxed">
          {memo}
        </div>

        <button className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl text-[14px]">
          메모 수정
        </button>

      </div>

      {/* ========================================== */}
      {/* 2. 왜 확인해야 하나요? */}
      {/* ========================================== */}
      <div className="space-y-2">

        <h3 className="font-bold text-gray-950 text-[18px]">
          왜 확인해야 하나요?
        </h3>

        <p className="text-gray-600 text-[14px] leading-relaxed">
          {data.whyText}
        </p>

      </div>

      {/* ========================================== */}
      {/* 3. 어떻게 확인하나요? */}
      {/* ========================================== */}
      <div className="space-y-3">

        <h3 className="font-bold text-gray-950 text-[18px]">
          어떻게 확인하나요?
        </h3>

        <ol className="list-decimal list-inside space-y-1.5 text-gray-700 text-[14px]">
          {data.howSteps.map((step, idx) => (
            <li key={idx}>
              {step}
            </li>
          ))}
        </ol>

        {/* 주의 배너 */}
        <div className="bg-[#FFF5F5] border border-[#FFE3E3] rounded-xl p-4 text-red-600 relative">

          <div className="flex items-start gap-2">

            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />

            <div>

              <p className="font-bold text-[14px]">
                이런 경우 주의하세요!
              </p>

              <p className="text-[13px] mt-0.5">
                {data.warningText}
              </p>

            </div>

          </div>

          <button className="absolute top-3 right-3 text-red-400">
            <X className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* ========================================== */}
      {/* 4. 사진 첨부 */}
      {/* ========================================== */}
      <div className="space-y-3">

        <div className="flex justify-between items-center">

          <h3 className="font-bold text-gray-950 text-[18px]">
            사진 {images.length}장
          </h3>

          <button className="text-gray-500 text-[13px] font-medium">
            + 사진 추가하기
          </button>

        </div>

        <div className="grid grid-cols-2 gap-3">

          {images.map((_, idx) => (
            <div
              key={idx}
              className="aspect-square bg-gray-200 rounded-2xl overflow-hidden relative"
            >
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-[12px]">
                이미지 미리보기
              </div>
            </div>
          ))}

        </div>

      </div>

      {/* ========================================== */}
      {/* 5. 확인 완료 */}
      {/* ========================================== */}
      <button
        onClick={handleComplete}
        className="w-full py-4 text-white font-bold rounded-2xl shadow-sm text-[16px]"
        style={{
          backgroundColor: '#26D383',
        }}
      >
        확인 완료
      </button>

      {/* ========================================== */}
      {/* 6. 문제가 있다면 */}
      {/* ========================================== */}
      <div className="space-y-3 pt-4 border-t border-gray-100">

        <h3 className="font-bold text-gray-950 text-[18px]">
          {data.title.replace(' 확인', '')}이 약하면...
        </h3>

        <ul className="space-y-2 text-gray-600 text-[13px] leading-relaxed">

          {data.ifWeak.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2"
            >
              <span className="shrink-0">
                💧
              </span>

              <span>
                {item}
              </span>
            </li>
          ))}

        </ul>

      </div>

    </div>
  )
}