// 상단 인사말 + 건물 일러스트
export default function GreetingBanner() {
  return (
    <div className="relative px-4  pt-2 pb-4">
      <p className="text-2xl font-bold leading-snug">
        안녕하세요!
        <br />
        <span className="text-black">첫 집</span> 구하기,
        <br />
        하나씩 확인 해볼까요?
      </p>
      {/* 커스텀 건물 일러스트 자리 (이미지 파일 전달 시 <img>로 교체) */}
      <div className="absolute right-0 top-0 w-32 h-32" />
    </div>
  );
}
