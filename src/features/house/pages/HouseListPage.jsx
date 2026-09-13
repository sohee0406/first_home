import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SubHeader from '../../../components/layout/SubHeader'
import Tabs from '../../../components/ui/Tabs'
import HouseCard from '../components/HouseCard'

// 임시 더미 데이터 (추후 HouseContext/API 연동으로 교체)
const DUMMY_REGISTERED = [
  {
    id: 1,
    name: '용호동 ㅇㅇ빌라',
    deposit: '1,000',
    rent: 40,
    maintenanceFee: '10만원',
    inspected: 16,
    totalInspection: 22,
    unconfirmed: 4,
    isWished: false,
    imageUrl: null,
  },
  {
    id: 2,
    name: '문현동 ㅇㅇ빌라',
    deposit: '1,000',
    rent: 30,
    maintenanceFee: '10만원',
    inspected: 16,
    totalInspection: 22,
    unconfirmed: 4,
    isWished: false,
    imageUrl: null,
  },
]

const DUMMY_WISHED = []

export default function HouseListPage() {
  const [tab, setTab] = useState('등록한 집')
  const navigate = useNavigate()

  const houses = tab === '등록한 집' ? DUMMY_REGISTERED : DUMMY_WISHED

  return (
    <div className="bg-white min-h-screen">
      <SubHeader title="집 관리" />
      <Tabs tabs={['등록한 집', '찜한 집']} active={tab} onChange={setTab} />

      <div className="p-4">
        {houses.length === 0 ? (
          <p className="text-center text-gray-400 py-10">
            {tab === '찜한 집' ? '찜한 집이 아직 없어요' : '등록된 집이 없어요'}
          </p>
        ) : (
          houses.map((house) => (
            <HouseCard
              key={house.id}
              house={house}
              onToggleWish={() => {
                // TODO: HouseContext의 toggleWish(house.id) 연결
              }}
            />
          ))
        )}

        <button
          onClick={() => navigate('/houses/register')}
          className="w-full bg-green-500 text-white font-bold rounded-2xl py-4 mt-2"
        >
          + 집 등록하기
        </button>
      </div>
    </div>
  )
}
