import { ChevronRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useHouse } from "../../house/context/HouseContext";
import houseImage from "../../../img/home 1.png";

export default function OngoingHouseCard() {
  const navigate = useNavigate();
  const { houses } = useHouse();

  const ongoingHouse = houses.find((house) => {
    const checked = Number(house.checked || 0);
    const total = Number(house.totalInspection || 0);

    return total > 0 && checked < total;
  });

  if (!ongoingHouse) {
    return (
      <div className="mx-4 rounded-2xl bg-green-50 p-5">
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
            <Home size={24} strokeWidth={1.7} className="text-green-400" />
          </div>

          <p className="mt-4 text-[15px] font-bold text-gray-800">
            아직 진행 중인 집이 없어요
          </p>

          <p className="mt-1.5 text-[12px] leading-relaxed text-gray-400">
            집을 등록하고 체크리스트를 시작해보세요.
          </p>

          <button
            type="button"
            onClick={() => navigate("/houses/register")}
            className="
              mt-4
              px-4
              py-2.5
              rounded-xl
              bg-[#26D383]
              text-white
              text-[13px]
              font-bold
              active:scale-[0.98]
              transition-transform
            "
          >
            집 등록하기
          </button>
        </div>
      </div>
    );
  }

  const checked = Number(ongoingHouse.checked || 0);
  const total = Number(ongoingHouse.totalInspection || 0);

  const percent = total > 0 ? Math.round((checked / total) * 100) : 0;

  const checkItems = ongoingHouse.checkItems || [];

  const nextChecklist =
    checkItems.find((item) => {
      return item.status !== "완료" && item.status !== "complete";
    }) || checkItems[0];

  const handleHouseClick = () => {
    navigate(`/houses/${ongoingHouse.id}`);
  };

  const handleChecklistClick = (e) => {
    e.stopPropagation();

    if (nextChecklist?.path) {
      navigate(`${nextChecklist.path}?houseId=${ongoingHouse.id}`);
      return;
    }

    navigate(`/checklist?houseId=${ongoingHouse.id}`);
  };

  return (
    <div
      className="
        mx-4
        rounded-2xl
        bg-green-50
        p-4
        cursor-pointer
        active:scale-[0.99]
        transition-transform
        relative
        overflow-visible
      "
      onClick={handleHouseClick}
    >
      {/* 진행 중인 집 */}
      <span
        className="
          inline-flex
          text-[11px]
          bg-white
          px-2.5
          py-1
          rounded-full
          text-gray-600
        "
      >
        진행 중인 집
      </span>

      {/* 집 사진
          카드 오른쪽 위에 떠 있는 이미지 */}
      <img
        src={houseImage}
        alt="집 사진"
        className="
          absolute
          right-2
          -top-10
          w-30
          h-30
          object-contain
          z-20
          pointer-events-none
        "
      />

      {/* 집 이름 / 주소 */}
      <div className="mt-2 pr-20">
        <p className="font-bold text-[17px] text-gray-900">
          {ongoingHouse.name || "등록한 집"}
        </p>

        {ongoingHouse.address && (
          <p className="text-[12px] text-gray-400 mt-1 truncate">
            {ongoingHouse.address}
          </p>
        )}
      </div>

      {/* 체크리스트 진행률 */}
      <div
        className="
          bg-white
          rounded-xl
          p-3
          mt-3
        "
      >
        <div className="flex justify-between text-[13px] mb-2">
          <span className="text-gray-700">집 체크리스트</span>

          <span className="text-[#26D383] font-bold">
            {checked}/{total}
          </span>
        </div>

        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="
              h-full
              bg-[#26D383]
              rounded-full
              transition-all
            "
            style={{
              width: `${percent}%`,
            }}
          />
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="text-[11px] text-gray-400 truncate pr-2">
            {nextChecklist
              ? `${nextChecklist.title} 확인이 남아있어요`
              : "체크리스트를 확인해주세요"}
          </span>

          <span className="text-[11px] text-gray-500 shrink-0">{percent}%</span>
        </div>
      </div>

      {/* 체크리스트 바로가기 */}
      <button
        type="button"
        className="
          w-full
          bg-white
          rounded-xl
          py-3
          mt-3
          flex
          items-center
          justify-center
          gap-1
          text-[13px]
          font-bold
          text-gray-800
          active:bg-gray-50
        "
        onClick={handleChecklistClick}
      >
        체크리스트 바로 가기
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
