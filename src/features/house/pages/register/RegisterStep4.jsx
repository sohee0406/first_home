// STEP 4: 최종 확인 및 등록 완료
export default function RegisterStep4({ onPrev, formData }) {
  return (
    <div>
      <h2 className="font-bold mb-4">입력하신 내용을 확인해주세요</h2>
      {/* TODO: formData 요약 표시 후 등록 완료 버튼 */}
      <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify(formData, null, 2)}</pre>
      <div className="flex gap-2 mt-4">
        <button onClick={onPrev} className="flex-1 border rounded-xl py-3">이전</button>
        <button className="flex-1 bg-green-500 text-white rounded-xl py-3">등록 완료</button>
      </div>
    </div>
  )
}
