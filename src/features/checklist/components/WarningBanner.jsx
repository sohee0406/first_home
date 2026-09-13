// "확인 필요 항목 4개" 같은 경고 배너
export default function WarningBanner({ message, onClose }) {
  return (
    <div className="bg-red-50 text-red-500 text-sm rounded-xl p-3 flex justify-between items-center">
      <span>⚠ {message}</span>
      {onClose && <button onClick={onClose}>✕</button>}
    </div>
  )
}
