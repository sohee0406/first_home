import { useState } from 'react'

// "현장 점검" 체크리스트: 필수확인 / 시설 / 방 / 주방 / 화장실 탭
const TABS = ['필수확인', '시설', '방', '주방', '화장실']

export default function OnSiteCheckPage() {
  const [tab, setTab] = useState(TABS[0])

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            className={`px-3 py-1 rounded-full border ${tab === t ? 'bg-green-500 text-white' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {/* TODO: 탭별 체크 항목 (수압/채광/배수/곰팡이/벌레흔적 등), 메모, 사진 첨부, 확인완료 버튼 */}
    </div>
  )
}
