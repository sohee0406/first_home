import { useNavigate } from 'react-router-dom'

// 매물 등록 완료 화면 (스텝 인디케이터 없음)
export default function RegisterStep4() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center text-center pt-8">
      {/* 커스텀 "집 등록 완료" 일러스트 자리 (이미지 파일 전달 시 <img>로 교체) */}
      <div className="w-48 h-40 mb-6" />

      <p className="font-bold text-lg">집 등록이 완료되었어요!</p>
      <p className="text-sm text-gray-400 mt-1">등록된 집을 보러 가볼까요?</p>

      <div className="w-full flex flex-col gap-3 mt-8">
        <button
          onClick={() => navigate('/houses')}
          className="bg-green-500 text-white rounded-xl py-4 font-bold"
        >
          등록한 집 보기
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-green-50 text-green-600 rounded-xl py-4 font-bold"
        >
          홈으로 가기
        </button>
      </div>
    </div>
  )
}
