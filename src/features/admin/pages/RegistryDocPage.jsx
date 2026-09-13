import FAQItem from '../components/FAQItem'

// 등기부등본 안내 상세 페이지 (소유자 확인/근저당권/압류 등 설명)
export default function RegistryDocPage() {
  return (
    <div className="p-4">
      <h1 className="font-bold text-lg mb-2">등기부등본 꼭 확인해야 하나요?</h1>
      {/* TODO: 소유자 확인/근저당권 확인/압류·가압류·가처분 확인 섹션, 갑구/을구 설명 */}
      <a href="#" className="inline-block bg-green-500 text-white rounded-xl px-4 py-2 mt-4">
        등기부등본 열람하기
      </a>
    </div>
  )
}
