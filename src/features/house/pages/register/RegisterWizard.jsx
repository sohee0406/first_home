import { useState } from 'react'
import RegisterStep1 from './RegisterStep1'
import RegisterStep2 from './RegisterStep2'
import RegisterStep3 from './RegisterStep3'
import RegisterStep4 from './RegisterStep4'

// 매물 등록하기 4단계 위저드 (상단 스텝 인디케이터 1-2-3-4 포함)
export default function RegisterWizard() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({})

  const next = (data) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setStep((s) => Math.min(s + 1, 4))
  }
  const prev = () => setStep((s) => Math.max(s - 1, 1))

  return (
    <div className="p-4">
      {/* TODO: 상단 1-2-3-4 스텝 인디케이터 컴포넌트 */}
      {step === 1 && <RegisterStep1 onNext={next} />}
      {step === 2 && <RegisterStep2 onNext={next} onPrev={prev} />}
      {step === 3 && <RegisterStep3 onNext={next} onPrev={prev} />}
      {step === 4 && <RegisterStep4 onPrev={prev} formData={formData} />}
    </div>
  )
}
