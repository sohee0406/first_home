import { Heart } from 'lucide-react'

// 집 리스트 카드 (용호동 ㅇㅇ빌라, 문현동 ㅇㅇ빌라 디자인)
// house: { id, name, deposit, rent, maintenanceFee, inspected, totalInspection, unconfirmed, isWished, imageUrl }
export default function HouseCard({ house, onToggleWish }) {
  const {
    name,
    deposit,
    rent,
    maintenanceFee,
    inspected,
    totalInspection,
    unconfirmed,
    isWished,
    imageUrl,
  } = house

  return (
    <div className="border rounded-2xl p-3 mb-4">
      <div className="flex gap-3">
        {/* 사진: imageUrl 없으면 회색 박스로 대체 */}
        <div className="w-24 h-24 rounded-xl bg-gray-200 shrink-0 overflow-hidden">
          {imageUrl && <img src={imageUrl} alt={name} className="w-full h-full object-cover" />}
        </div>

        <div className="flex-1 relative">
          <button onClick={onToggleWish} className="absolute right-0 top-0">
            <Heart
              size={20}
              className={isWished ? 'text-red-400 fill-red-400' : 'text-gray-300'}
            />
          </button>
          <p className="font-bold text-lg pr-6">{name}</p>
          <p className="text-sm text-gray-500 mt-1">보증금 {deposit} / 월세 {rent}</p>
          <p className="text-sm text-gray-500">관리비 {maintenanceFee}</p>
        </div>
      </div>

      <div className="border-t mt-3 pt-3 flex justify-between text-sm">
        <span>
          점검 <span className="text-green-500 font-bold">{inspected}</span>/{totalInspection}
        </span>
        <span>
          미확인 <span className="text-red-500 font-bold">{unconfirmed}</span>개
        </span>
      </div>
    </div>
  )
}
