// 집 상세 하단의 메모 박스 (예: "22부동산 2번째 집 학교가기엔 살짝 애매")
export default function MemoBox({ memo, onEdit }) {
  return (
    <div className="border rounded-xl p-3 mt-4">
      <div className="flex justify-between">
        <span className="font-bold">메모</span>
        <button onClick={onEdit} className="text-sm text-gray-400">메모수정</button>
      </div>
      <p className="mt-2 text-sm">{memo}</p>
    </div>
  )
}
