// STEP 2: 기본 정보 입력 (주소, 보증금, 월세, 관리비, 계약 기간)
export default function RegisterStep2({ onNext, onPrev }) {
  return (
    <div>
      <h2 className="font-bold mb-4">기본 정보를 입력해 주세요</h2>
      {/* TODO: 주소/보증금/월세/관리비/계약기간 인풋 폼 */}
      <div className="flex gap-2 mt-4">
        <button onClick={onPrev} className="flex-1 border rounded-xl py-3">이전</button>
        <button onClick={() => onNext({})} className="flex-1 bg-green-500 text-white rounded-xl py-3">다음</button>
      </div>
    </div>
  )
}
