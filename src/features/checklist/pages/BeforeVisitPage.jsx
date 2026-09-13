import { useNavigate } from 'react-router-dom';
import { ChevronLeft, X, Plus, Check, Lightbulb } from 'lucide-react';
import { Icon } from '@iconify/react';

export default function App() {
  const navigate = useNavigate();

  // 준비물 데이터
  const prepItems = [
    { text: '휴대폰', checked: true },
    { text: '줄자', checked: true },
    { text: '준비물', checked: true },
  ];

  // 미리 확인할 것 데이터
  const checkItems = [
    { text: '주변교통', checked: false },
    { text: '주차여부', checked: false },
    { text: '옵션', checked: false },
  ];

  // 닫기 버튼 핸들러
  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col justify-between shadow-sm">
      <div>
        {/* ========================================== */}
        {/* 1. 상단 헤더 섹션 (뒤로가기, 제목 18px, 닫기) */}
        {/* ========================================== */}
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
          <button onClick={() => navigate(-1)} className="p-1 rounded-full">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <span className="font-bold text-gray-950 text-[18px]">집 보러 가기 전</span>
          <button onClick={handleClose} className="p-1 rounded-full">
            <X className="w-6 h-6 text-gray-800" />
          </button>
        </header>

        {/* ========================================== */}
        {/* 2. 상단 타이틀 및 일러스트 섹션 (타이틀 20px, 서브 14px) */}
        {/* ========================================== */}
        <section className="flex items-center gap-4 px-5 py-6 bg-white">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#EAFEF1' }}
          >
            <Icon icon="fluent-emoji-flat:house" className="w-9 h-9" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 leading-snug text-[20px]">
              집을 보기 전에<br />미리 확인해 볼까요?
            </h2>
            <p className="text-gray-500 mt-1 text-[14px]">지금 확인 할 항목 12개</p>
          </div>
        </section>

        {/* ========================================== */}
        {/* 3. 체크리스트 섹션 (카드 제목 18px, 본문 14px) */}
        {/* ========================================== */}
        <div className="py-2">
          {/* 준비물 카드 */}
          <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 mb-3 mx-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-950 text-[18px]">준비물</h3>
              <button className="w-7 h-7 bg-gray-50 rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 text-gray-700" />
              </button>
            </div>
            <div className="space-y-2.5">
              {prepItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div 
                    className="w-5 h-5 rounded flex items-center justify-center text-white"
                    style={{ backgroundColor: '#26D383' }}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-gray-800 text-[14px]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 미리 확인 할 것 카드 */}
          <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 mb-3 mx-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-950 text-[18px]">미리 확인 할 것</h3>
              <button className="w-7 h-7 bg-gray-50 rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 text-gray-700" />
              </button>
            </div>
            <div className="space-y-2.5">
              {checkItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div 
                    className="w-5 h-5 rounded flex items-center justify-center bg-white"
                    style={{ borderColor: '#26D383', borderWidth: '1px' }}
                  ></div>
                  <span className="text-gray-600 text-[14px]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 추가할 리스트 작성 카드 */}
          <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 mb-3 mx-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-950 text-[18px]">추가할 리스트를 작성해 주세요</h3>
              <button className="w-7 h-7 bg-gray-50 rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 text-gray-700" />
              </button>
            </div>
            <div className="py-2 text-gray-400 text-[14px]">
              예) 편의시설
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* 4. 1분 TIP 배너 섹션 (내용 line-height 22px, 닫기버튼 앰버 색상) */}
        {/* ========================================== */}
        <section className="mx-4 mb-6">
          <div className="flex items-center gap-1.5 mb-2">
            <Lightbulb className="w-5 h-5 text-amber-500 fill-amber-400" />
            <span className="font-bold tracking-wide text-[18px]">
              <span className="text-black">1분</span> <span className="text-amber-500">TIP</span>
            </span>
          </div>
          <div className="relative bg-[#F9FBE7] rounded-xl p-4 text-amber-900 border border-[#F0F4C3]">
            <p className="font-medium text-[14px] leading-[22px]">창문을 열고 닫기만 하지 말고</p>
            <p className="font-medium text-[14px] leading-[22px]">창문 틈새 흔적을 확인 해보세요</p>
            <button className="absolute top-3 right-3 text-amber-500">
              <X className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>

      {/* ========================================== */}
      {/* 5. 하단 확인 버튼 섹션 (버튼 글자 18px) */}
      {/* ========================================== */}
      <div className="px-4 pb-6 mt-auto">
        <button 
          className="w-full py-3.5 text-white font-bold rounded-xl shadow-sm text-[18px]"
          style={{ backgroundColor: '#26D383' }}
        >
          확인
        </button>
      </div>
    </div>
  );
}