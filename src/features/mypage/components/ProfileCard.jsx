// 마이페이지 상단 프로필 카드
export default function ProfileCard({ name }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {/* 커스텀 프로필 일러스트 자리 (고양이 박스 그림 등, 이미지 파일로 교체 가능) */}
      <div className="w-14 h-14 rounded-2xl bg-emerald-50 shrink-0" />
      <div>
        <p className="font-bold text-gray-900 text-lg">{name}님</p>
        <p className="text-sm text-gray-500 mt-0.5">당신의 자취 생활을 응원해요</p>
      </div>
    </div>
  );
}
