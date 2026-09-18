import { useNavigate } from "react-router-dom";
import ragister4 from "../../../../img/ragister4.png";

export default function RegisterStep4() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-center pt-8">
      {/* 집 사진 */}
      <div className="w-55 h-45 mb-6 flex items-center justify-center">
        <img
          src={ragister4}
          alt="집 등록 완료"
          className="w-40 h-40 object-contain"
        />
      </div>

      {/* 완료 문구 */}
      <p className="font-bold text-lg">집 등록이 완료되었어요!</p>

      <p className="text-sm text-gray-400 mt-1">등록된 집을 보러 가볼까요?</p>

      {/* 버튼 */}
      <div className="w-full flex flex-col gap-3 mt-8">
        <button
          type="button"
          onClick={() => navigate("/houses")}
          className="
            bg-green-500
            text-white
            rounded-xl
            py-4
            font-bold
          "
        >
          등록한 집 보기
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="
            bg-green-50
            text-green-600
            rounded-xl
            py-4
            font-bold
          "
        >
          홈으로 가기
        </button>
      </div>
    </div>
  );
}
