import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WizardHeader from './components/WizardHeader'
import StepIndicator from './components/StepIndicator'
import RegisterStep1 from './RegisterStep1'
import RegisterStep2 from './RegisterStep2'
import RegisterStep3 from './RegisterStep3'
import RegisterStep4 from './RegisterStep4'
import BottomNav from '../../../../components/layout/BottomNav'

// 매물 등록하기 4단계 위저드
// 뒤로가기: 1단계에서는 위저드 밖으로(navigate(-1)), 2단계 이상에서는 이전 스텝으로 이동
export default function RegisterWizard() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()

  const next = (data) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setStep((s) => Math.min(s + 1, 4))
  }

  const handleBack = () => {
    if (step === 1) {
      navigate(-1)
    } else {
      setStep((s) => s - 1)
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <WizardHeader title="매물 등록하기" onBack={handleBack} />
      {step < 4 && <StepIndicator current={step} />}

      <div className="p-4 pb-24">
        {step === 1 && <RegisterStep1 formData={formData} onNext={next} />}
        {step === 2 && <RegisterStep2 formData={formData} onNext={next} />}
        {step === 3 && <RegisterStep3 formData={formData} onNext={next} />}
        {step === 4 && <RegisterStep4 formData={formData} />}
      </div>

      <BottomNav />
    </div>
  )
}
