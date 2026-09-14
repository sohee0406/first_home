import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

// "최근 등록된 집" / "찜 한 집" 섹션 (가로 스크롤 카드)
export default function RecentHouseSection({
  title,
  houses = [],
  isWished = false,
}) {
  const navigate = useNavigate();

  return (
    <div className="px-[16px]">
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold">{title}</p>
        {!isWished && (
          <span
            className="text-sm text-gray-400"
            onClick={() => navigate("/houses")}
          >
            전체보기
          </span>
        )}
      </div>

      {houses.length === 0 && isWished ? (
        <div
          className="border border-dashed rounded-2xl h-40 mb-16 flex items-center justify-center text-sm text-gray-400 text-center px-4"
          onClick={() => navigate("/houses")}
        >
          찜한 집이 아직 없어요 등록된 집 중에
          <br />
          마음에 드는 집을 찜해보세요!
          <br />
          <br />찜 하러 가기
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto">
          {houses.map((house) => (
            <div
              key={house.id}
              className="w-40 shrink-0"
              onClick={() => navigate(`/houses/${house.id}`)}
            >
              <div className="relative w-40 h-28 bg-gray-200 rounded-xl">
                {/* 실제 서비스에서는 house.imageUrl 사용 */}
                <Heart
                  size={18}
                  className="absolute top-2 right-2 text-white fill-red-400 stroke-red-400"
                />
              </div>
              <p className="font-bold text-sm mt-2">{house.name}</p>
              <p className="text-xs text-gray-400">
                보증금 {house.deposit} / 월세 {house.rent}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
