// 마이페이지 상단 프로필 카드 (예: "김한국님")
export default function ProfileCard({ name }) {
  return (
    <div className="flex items-center gap-3 border rounded-xl p-4">
      <div className="w-12 h-12 rounded-full bg-gray-200" />
      <div>
        <p className="font-bold">{name}님</p>
        <p className="text-sm text-gray-400">당신의 자취 생활을 응원해요</p>
      </div>
    </div>
  )
}
