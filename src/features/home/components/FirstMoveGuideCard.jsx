import { ClipboardList, ChevronRight, CheckSquare } from 'lucide-react'

// "첫 자취, 뭘 확인해야 할까요?" 안내 카드
export default function FirstMoveGuideCard() {
  return (
    <div className="bg-gray-50 rounded-2xl p-4 mx-4 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold">첫 자취, 뭘 확인해야 할까요?</p>
          <p className="text-sm text-gray-400 mt-1">집을 구하기 전, 미리 확인해보세요</p>
        </div>
        <ClipboardList size={28} className="text-green-500" />
      </div>
      <button className="w-full bg-white border rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-bold">
        <CheckSquare size={16} className="text-green-500" />
        체크리스트 둘러보기
        <ChevronRight size={16} className="ml-auto" />
      </button>
    </div>
  )
}
