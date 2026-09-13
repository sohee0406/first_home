// STEP 3: 추가 정보 입력 (주변환경, 옵션 체크박스)
export default function RegisterStep3({ onNext, onPrev }) {
  return (
    <div>
      <h2 className="font-bold mb-4">추가 정보를 입력해주세요 (선택)</h2>
      {/* TODO: 주변환경 체크박스, 옵션(에어컨/세탁기/냉장고/인터넷/가스레인지) 체크박스 */}
      <div className="flex gap-2 mt-4">
        <button onClick={onPrev} className="flex-1 border rounded-xl py-3">이전</button>
        <button onClick={() => onNext({})} className="flex-1 bg-green-500 text-white rounded-xl py-3">다음</button>
      </div>
    </div>
  )
}
