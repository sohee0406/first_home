import ProfileCard from '../components/ProfileCard'

// 마이페이지: 프로필, 주소변경, 내 정보 관련 메뉴
export default function MyPage() {
  return (
    <div className="p-4">
      <ProfileCard />
      {/* TODO: 내 정보(개인정보 수정/알림 설정/고객센터), 주소변경 섹션 */}
    </div>
  )
}
