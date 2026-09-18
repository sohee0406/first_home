import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WizardHeader from "./components/WizardHeader";
import StepIndicator from "./components/StepIndicator";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
import RegisterStep4 from "./RegisterStep4";
import BottomNav from "../../../../components/layout/BottomNav";
import { useHouse } from "../../context/HouseContext";

// 매물 등록하기 4단계 위저드
// 1~3단계에서 입력한 내용을 하나로 모은 뒤
// 3단계 완료 시 실제 집 데이터로 저장한다.
export default function RegisterWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const { addHouse } = useHouse();

  const next = (data) => {
    // 지금까지 입력한 내용 + 현재 단계 입력 내용 합치기
    const nextFormData = {
      ...formData,
      ...data,
    };

    setFormData(nextFormData);

    // 3단계까지 완료하면 실제 집 데이터로 저장
    if (step === 3) {
      addHouse(nextFormData);
    }

    // 다음 단계로 이동
    setStep((s) => Math.min(s + 1, 4));
  };

  const handleBack = () => {
    if (step === 1) {
      navigate(-1);
    } else {
      setStep((s) => s - 1);
    }
  };

  return (
    <div className="bg-white  ">
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
  );
}
