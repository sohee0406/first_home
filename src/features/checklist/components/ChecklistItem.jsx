// 체크 항목 하나 (라벨 + 별표(중요도) + 체크박스/토글)
export default function ChecklistItem({ label, important, checked, onToggle }) {
  return (
    <label className="flex items-center justify-between border-b py-2">
      <span>
        {label} {important && <span className="text-yellow-500">★필수</span>}
      </span>
      <input type="checkbox" checked={checked} onChange={onToggle} />
    </label>
  )
}
