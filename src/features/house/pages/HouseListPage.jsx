import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Heart } from "lucide-react";

export default function HouseListPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(location.search);

    return params.get("tab") === "liked" ? "liked" : "registered";
  });

  const [likedHouses, setLikedHouses] = useState([1]);

  const houses = [
    {
      id: 1,
      name: "용호동 ○○빌라",
      image: "/images/house1.jpg",
      deposit: "1,000",
      rent: "40",
      maintenance: "10만원",
      checked: 16,
      total: 22,
      unchecked: 4,
    },
    {
      id: 2,
      name: "문현동 ○○빌라",
      image: "/images/house2.jpg",
      deposit: "1,000",
      rent: "30",
      maintenance: "10만원",
      checked: 16,
      total: 22,
      unchecked: 4,
    },
  ];

  const handleLike = (e, id) => {
    e.stopPropagation();

    setLikedHouses((prev) => {
      if (prev.includes(id)) {
        return prev.filter((houseId) => houseId !== id);
      }

      return [...prev, id];
    });
  };

  const displayedHouses =
    activeTab === "registered"
      ? houses
      : houses.filter((house) => likedHouses.includes(house.id));

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white pb-24">
      {/* 탭 */}
      <div className="h-[48px] flex bg-white border-b border-gray-100">
        <button
          type="button"
          onClick={() => setActiveTab("registered")}
          className={`flex-1 h-full text-[17px] font-semibold relative ${
            activeTab === "registered" ? "text-gray-950" : "text-gray-400"
          }`}
        >
          등록한 집
          {activeTab === "registered" && (
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#26D383]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("liked")}
          className={`flex-1 h-full text-[17px] font-semibold relative ${
            activeTab === "liked" ? "text-gray-950" : "text-gray-400"
          }`}
        >
          찜한 집
          {activeTab === "liked" && (
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#26D383]" />
          )}
        </button>
      </div>

      {/* 집 목록 */}
      <main className="px-4 pt-8">
        {displayedHouses.length > 0 ? (
          <div className="space-y-7">
            {displayedHouses.map((house) => {
              const isLiked = likedHouses.includes(house.id);

              return (
                <div
                  key={house.id}
                  onClick={() => navigate(`/houses/${house.id}`)}
                  className="w-full text-left bg-white rounded-xl border border-gray-100 shadow-[0_1px_8px_rgba(0,0,0,0.06)] p-3 flex gap-5 relative cursor-pointer active:scale-[0.99] transition-transform"
                >
                  {/* 집 이미지 */}
                  <div className="w-[122px] h-[148px] shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={house.image}
                      alt={house.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>

                  {/* 집 정보 */}
                  <div className="flex-1 min-w-0 pt-3 pr-1">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-[19px] font-bold text-gray-950 leading-tight">
                        {house.name}
                      </h2>

                      {/* 찜 버튼 */}
                      <button
                        type="button"
                        onClick={(e) => handleLike(e, house.id)}
                        className="shrink-0 -mt-1 -mr-1 p-1"
                        aria-label="찜하기"
                      >
                        <Heart
                          size={21}
                          strokeWidth={1.4}
                          className={
                            isLiked
                              ? "fill-red-400 text-red-400"
                              : "text-red-400"
                          }
                        />
                      </button>
                    </div>

                    <p className="mt-2 text-[14px] font-medium text-gray-900">
                      보증금 {house.deposit} / 월세 {house.rent}
                    </p>

                    <p className="mt-2 text-[14px] font-medium text-gray-900">
                      관리비 {house.maintenance}
                    </p>

                    <div className="mt-6 border-t border-gray-100" />

                    <div className="flex items-center justify-between mt-4">
                      <p className="text-[13px] text-gray-900">
                        점검{" "}
                        <span className="text-[#26D383] font-medium">
                          {house.checked}
                        </span>
                        /{house.total}
                      </p>

                      <p className="text-[13px] text-gray-900">
                        미확인{" "}
                        <span className="text-red-500 font-medium">
                          {house.unchecked}개
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <Heart size={38} strokeWidth={1.3} className="text-gray-300" />

            <p className="mt-4 text-[15px] font-semibold text-gray-700">
              찜한 집이 없어요
            </p>

            <p className="mt-1 text-[13px] text-gray-400">
              마음에 드는 집을 찜해보세요
            </p>
          </div>
        )}

        {/* 집 등록하기 */}
        {activeTab === "registered" && (
          <button
            type="button"
            onClick={() => navigate("/houses/register")}
            className="w-full h-[62px] mt-7 rounded-xl bg-[#26D383] text-white text-[17px] font-bold flex items-center justify-center"
          >
            + 집 등록하기
          </button>
        )}
      </main>
    </div>
  );
}
