import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useHouse } from "../../house/context/HouseContext";

// 최근 등록된 집 / 찜한 집 섹션
export default function RecentHouseSection({ title, isWished = false }) {
  const navigate = useNavigate();

  const { houses } = useHouse();

  // 실제 등록된 집 데이터
  const actualHouses = Array.isArray(houses) ? houses : [];

  // 찜한 집만 필터링
  const wishedHouses = actualHouses.filter((house) => house.isWished === true);

  // 최근 등록된 순서
  const recentHouses = [...actualHouses].sort(
    (a, b) => Number(b.id) - Number(a.id),
  );

  // 현재 섹션에 보여줄 집
  const displayHouses = isWished ? wishedHouses : recentHouses;

  // 최대 5개
  const visibleHouses = displayHouses.slice(0, 5);

  return (
    <div className="px-[16px]">
      {/* 제목 */}
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold">{title}</p>

        {!isWished && actualHouses.length > 0 && (
          <button
            type="button"
            onClick={() => navigate("/houses")}
            className="text-sm text-gray-400"
          >
            전체보기
          </button>
        )}
      </div>

      {/* ---------------------- */}
      {/* 찜한 집이 없는 경우 */}
      {/* ---------------------- */}
      {isWished && visibleHouses.length === 0 ? (
        <button
          type="button"
          onClick={() => navigate("/houses")}
          className="
            w-full
            border
            border-dashed
            rounded-2xl
            h-40
            mb-16
            flex
            items-center
            justify-center
            text-sm
            text-gray-400
            text-center
            px-4
          "
        >
          <span>
            찜한 집이 아직 없어요
            <br />
            등록된 집 중에
            <br />
            마음에 드는 집을 찜해보세요!
            <br />
            <br />
            <span className="text-[#26D383] font-semibold">찜 하러 가기</span>
          </span>
        </button>
      ) : /* ---------------------- */
      /* 등록한 집이 없는 경우 */
      /* ---------------------- */
      !isWished && visibleHouses.length === 0 ? (
        <button
          type="button"
          onClick={() => navigate("/houses/register")}
          className="
            w-full
            border
            border-dashed
            rounded-2xl
            h-40
            mb-16
            flex
            items-center
            justify-center
            text-sm
            text-gray-400
            text-center
            px-4
          "
        >
          <span>
            아직 등록된 집이 없어요
            <br />
            <br />
            <span className="text-[#26D383] font-semibold">집 등록하기</span>
          </span>
        </button>
      ) : (
        /* ---------------------- */
        /* 실제 집 데이터 */
        /* ---------------------- */
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {visibleHouses.map((house) => (
            <button
              type="button"
              key={house.id}
              onClick={() => navigate(`/houses/${house.id}`)}
              className="
                  w-40
                  shrink-0
                  text-left
                "
            >
              {/* 집 이미지 */}
              <div
                className="
                    relative
                    w-40
                    h-28
                    bg-gray-100
                    rounded-xl
                    overflow-hidden
                  "
              >
                {house.image ? (
                  <img
                    src={house.image}
                    alt={house.name || "등록한 집"}
                    className="
                        w-full
                        h-full
                        object-cover
                      "
                  />
                ) : (
                  <div
                    className="
                        w-full
                        h-full
                        flex
                        items-center
                        justify-center
                        text-gray-300
                        text-xs
                      "
                  >
                    사진 없음
                  </div>
                )}

                {/* 찜 상태 표시 */}
                <Heart
                  size={18}
                  className={
                    house.isWished
                      ? `
                          absolute
                          top-2
                          right-2
                          text-red-400
                          fill-red-400
                        `
                      : `
                          absolute
                          top-2
                          right-2
                          text-white
                          fill-black/20
                        `
                  }
                />
              </div>

              {/* 집 이름 */}
              <p
                className="
                    font-bold
                    text-sm
                    mt-2
                    truncate
                    text-gray-900
                  "
              >
                {house.name || "등록한 집"}
              </p>

              {/* 주소 */}
              {house.address && (
                <p
                  className="
                      text-xs
                      text-gray-400
                      mt-0.5
                      truncate
                    "
                >
                  {house.address}
                </p>
              )}

              {/* 보증금 / 월세 */}
              <p
                className="
                    text-xs
                    text-gray-500
                    mt-1
                    truncate
                  "
              >
                보증금 {house.deposit || "-"}
                {" / "}
                월세 {house.rent || "-"}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
