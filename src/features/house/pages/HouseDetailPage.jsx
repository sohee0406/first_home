import { useParams } from 'react-router-dom'
import MemoBox from '../components/MemoBox'

// 집 상세 (ㅁㅁ동 ㅇㅇ빌라 화면)
export default function HouseDetailPage() {
  const { id } = useParams()

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">집 상세 #{id}</h1>
      {/* TODO: 이미지, 보증금/월세/관리비, 체크 진행률, 체크리스트 링크 */}
      <MemoBox />
    </div>
  )
}
