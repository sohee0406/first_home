import { ChevronRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useHouse } from "../../house/context/HouseContext";

export default function RecommendedChecklist() {
  const navigate = useNavigate();
  const { houses } = useHouse();

  const ongoingHouse = houses.find((house) => {
    const checked = Number(house.checked || 0);
    const total = Number(house.totalInspection || 0);

    return total > 0 && checked < total;
  });

  if (!ongoingHouse) {
    return (
      <div className="mx-4 rounded-2xl bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <p className="font-bold text-[15px] text-gray-900">
            지금 확인하면 좋아요
          </p>

          <span className="text-[11px] bg-gray-200 text-gray-400 px-2 py-1 rounded-full">
            체크리스트
          </span>
        </div>

        <p className="text-[12px] text-gray-400 mt-1">
          진행 중인 집이 생기면 다음 체크 항목을 추천해드려요.
        </p>

        <div className="bg-white rounded-xl mt-3 px-4 py-5 text-center">
          <p className="text-[13px] text-gray-400">
            아직 진행 중인 집이 없어요.
          </p>

          <button
            type="button"
            onClick={() => navigate("/houses/register")}
            className="
              mt-3
              text-[13px]
              font-semibold
              text-[#26D383]
            "
          >
            집 등록하기
            <ChevronRight size={15} className="inline-block ml-0.5" />
          </button>
        </div>
      </div>
    );
  }

  const checkItems = ongoingHouse.checkItems || [];

  const getProgress = (item) => {
    if (!item?.value) {
      return {
        current: 0,
        total: 0,
        percent: 0,
      };
    }

    const [current, total] = item.value
      .split("/")
      .map((value) => Number(value) || 0);

    return {
      current,
      total,
      percent: total > 0 ? Math.round((current / total) * 100) : 0,
    };
  };

  const recommendedIndex = checkItems.findIndex((item) => {
    const { current, total } = getProgress(item);

    return total > 0 && current < total;
  });

  const allCompleted =
    checkItems.length > 0 &&
    checkItems.every((item) => {
      const { current, total } = getProgress(item);

      return total > 0 && current >= total;
    });

  const recommendedItem =
    recommendedIndex >= 0 ? checkItems[recommendedIndex] : null;

  const fallbackItem = checkItems[0];

  const currentItem = recommendedItem || fallbackItem;

  const recommendedItems = currentItem
    ? checkItems
        .slice(
          recommendedIndex >= 0 ? recommendedIndex : 0,
          (recommendedIndex >= 0 ? recommendedIndex : 0) + 3,
        )
        .filter(Boolean)
    : [];

  const getPathWithHouseId = (path) => {
    if (!path) {
      return `/checklist?houseId=${ongoingHouse.id}`;
    }

    return `${path}?houseId=${ongoingHouse.id}`;
  };

  const handleItemClick = (item) => {
    if (item?.path) {
      navigate(getPathWithHouseId(item.path));
    }
  };

  const handleAllClick = () => {
    navigate(`/checklist?houseId=${ongoingHouse.id}`);
  };

  return (
    <div className="mx-4 rounded-2xl bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <p className="font-bold text-[15px] text-gray-900">
          지금 확인하면 좋아요
        </p>

        <span
          className="
            text-[11px]
            bg-[#EAFEF1]
            text-[#20B970]
            px-2
            py-1
            rounded-full
          "
        >
          {allCompleted ? "체크 완료" : "다음 단계"}
        </span>
      </div>

      <p className="text-[12px] text-gray-400 mt-1">
        {allCompleted
          ? "모든 체크리스트를 완료했어요."
          : "현재 진행도에 맞춰 다음 항목을 추천해드려요."}
      </p>

      {allCompleted ? (
        <div
          className="
            bg-white
            rounded-xl
            mt-3
            px-4
            py-5
            text-center
          "
        >
          <CheckCircle2
            size={25}
            className="mx-auto text-[#26D383]"
            strokeWidth={1.7}
          />

          <p className="text-[14px] font-semibold text-gray-800 mt-2">
            모든 체크리스트를 완료했어요!
          </p>

          <button
            type="button"
            onClick={handleAllClick}
            className="
              text-[12px]
              text-gray-400
              mt-2
            "
          >
            전체 체크리스트 보기
            <ChevronRight size={14} className="inline-block ml-0.5" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 mt-3">
            {recommendedItems.map((item, index) => {
              const { current, total } = getProgress(item);

              const isComplete = total > 0 && current >= total;

              const isCurrent =
                recommendedIndex >= 0 &&
                checkItems[recommendedIndex]?.title === item.title;

              return (
                <button
                  type="button"
                  key={`${item.title}-${index}`}
                  onClick={() => handleItemClick(item)}
                  className="
                    w-full
                    bg-white
                    rounded-xl
                    px-3
                    py-3
                    text-left
                    active:bg-gray-50
                  "
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`
                          text-[13px]
                          ${
                            isCurrent
                              ? "font-bold text-gray-900"
                              : "text-gray-700"
                          }
                        `}
                      >
                        {item.title}
                      </span>

                      {isCurrent && (
                        <span
                          className="
                            shrink-0
                            text-[10px]
                            px-1.5
                            py-0.5
                            rounded-full
                            bg-[#EAFEF1]
                            text-[#20B970]
                            font-semibold
                          "
                        >
                          지금 확인
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {isComplete ? (
                        <span className="text-[11px] text-[#26D383] font-semibold">
                          완료
                        </span>
                      ) : (
                        <span className="text-[11px] text-gray-400">
                          {item.type === "binary"
                            ? "미확인"
                            : `${current}/${total}`}
                        </span>
                      )}

                      <ChevronRight size={15} className="text-gray-300" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleAllClick}
            className="
              w-full
              mt-3
              py-3
              text-[12px]
              text-gray-400
              font-medium
            "
          >
            전체 체크리스트 보기
            <ChevronRight size={14} className="inline-block ml-0.5" />
          </button>
        </>
      )}
    </div>
  );
}
