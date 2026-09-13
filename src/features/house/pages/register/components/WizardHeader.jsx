import { ChevronLeft } from 'lucide-react'

// 위저드 전용 헤더: 뒤로가기가 브라우저 히스토리가 아니라 "이전 스텝"으로 이동해야 하므로
// SubHeader와 별도로 분리하고 onBack 콜백을 부모(RegisterWizard)에서 직접 제어합니다.
export default function WizardHeader({ title, onBack }) {
  return (
    <header className="relative flex items-center justify-center px-4 py-4">
      <button onClick={onBack} className="absolute left-4">
        <ChevronLeft size={22} />
      </button>
      <span className="font-bold">{title}</span>
    </header>
  )
}
