import { useState } from 'react'
import HouseCard from '../components/HouseCard'

// 집관리 탭: 등록한 집 / 찜한 집
export default function HouseListPage() {
  const [tab, setTab] = useState('registered') // 'registered' | 'wished'

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4 border-b">
        <button
          className={tab === 'registered' ? 'font-bold border-b-2 border-black' : 'text-gray-400'}
          onClick={() => setTab('registered')}
        >
          등록한 집
        </button>
        <button
          className={tab === 'wished' ? 'font-bold border-b-2 border-black' : 'text-gray-400'}
          onClick={() => setTab('wished')}
        >
          찜한 집
        </button>
      </div>

      {/* TODO: tab 값에 따라 리스트 분기, HouseCard로 렌더링 */}
      <HouseCard />
    </div>
  )
}
