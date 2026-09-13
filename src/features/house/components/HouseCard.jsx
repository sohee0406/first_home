// 집 리스트에서 쓰이는 카드 (용호동 ㅇㅇ빌라, 문현동 ㅇㅇ빌라 형태)
export default function HouseCard({ house }) {
  return (
    <div className="border rounded-xl p-3 mb-3">
      {/* TODO: 썸네일, 이름, 보증금/월세/관리비, 점검 n/22 배지 */}
      <p className="font-bold">집 이름</p>
    </div>
  )
}
