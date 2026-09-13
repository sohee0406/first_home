// 공용 탭 UI (현장 점검의 필수확인/시설/방/주방/화장실, 집관리의 등록한집/찜한집 등에서 재사용)
export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto border-b">
      {tabs.map((t) => (
        <button
          key={t}
          className={`px-3 py-2 whitespace-nowrap flex-1 text-center ${
            active === t ? 'font-bold border-b-2 border-green-500' : 'text-gray-400 border-b-2 border-transparent'
          }`}
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}
    </div>
  )
}
