import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Heart, Home, MoreVertical, Pencil, Trash2, X } from "lucide-react";
import { useHouse } from "../context/HouseContext";

export default function HouseListPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { houses, toggleWish, updateHouseName, deleteHouse } = useHouse();

  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(location.search);

    return params.get("tab") === "liked" ? "liked" : "registered";
  });

  // 메뉴가 열린 집
  const [openMenuId, setOpenMenuId] = useState(null);

  // 이름 수정 모달
  const [editingHouse, setEditingHouse] = useState(null);
  const [editingName, setEditingName] = useState("");

  // 삭제 확인 모달
  const [deletingHouse, setDeletingHouse] = useState(null);

  const displayedHouses =
    activeTab === "registered"
      ? houses
      : houses.filter((house) => house.isWished === true);

  // 집 이름 수정 시작
  const handleEditName = (house) => {
    setOpenMenuId(null);
    setEditingHouse(house);
    setEditingName(house.name || "");
  };

  // 집 이름 저장
  const handleSaveName = () => {
    if (!editingHouse) {
      return;
    }

    const trimmedName = editingName.trim();

    if (!trimmedName) {
      return;
    }

    updateHouseName(editingHouse.id, trimmedName);

    setEditingHouse(null);
    setEditingName("");
  };

  // 집 삭제
  const handleDeleteHouse = () => {
    if (!deletingHouse) {
      return;
    }

    deleteHouse(deletingHouse.id);

    setDeletingHouse(null);
    setOpenMenuId(null);
  };

  return (
    <div
      className="max-w-md mx-auto   bg-white pb-24"
      onClick={() => {
        if (openMenuId !== null) {
          setOpenMenuId(null);
        }
      }}
    >
      {/* 탭 */}
      <div className="h-[48px] flex bg-white border-b border-gray-100">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab("registered");
          }}
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
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab("liked");
          }}
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

      <main className="px-4 pt-8">
        {displayedHouses.length > 0 ? (
          <div className="space-y-7">
            {displayedHouses.map((house) => {
              const isLiked = house.isWished === true;

              const isMenuOpen = openMenuId === house.id;

              return (
                <div
                  key={house.id}
                  onClick={() => {
                    if (isMenuOpen) {
                      setOpenMenuId(null);
                      return;
                    }

                    navigate(`/houses/${house.id}`);
                  }}
                  className="
                    w-full
                    text-left
                    bg-white
                    rounded-xl
                    border
                    border-gray-100
                     shadow-[0_1px_3px_rgba(0,0,0,0.03)]
                    p-3
                    flex
                    gap-5
                    relative
                    cursor-pointer
                    active:scale-[0.99]
                    transition-transform
                  "
                >
                  {/* 이미지 */}
                  <div className="w-[122px] h-[148px] shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    {house.image ? (
                      <img
                        src={house.image}
                        alt={house.name || "등록한 집"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#F0FBF6]">
                        <Home
                          size={38}
                          strokeWidth={1.4}
                          className="text-[#26D383]"
                        />
                      </div>
                    )}
                  </div>

                  {/* 정보 */}
                  <div className="flex-1 min-w-0 pt-3 pr-1">
                    {/* 제목 + 액션 */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h2 className="text-[19px] font-bold text-gray-950 leading-tight truncate">
                          {house.name || house.address || "등록한 집"}
                        </h2>

                        {house.name && house.address && (
                          <p className="mt-1 text-[12px] text-gray-400 truncate">
                            {house.address}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center shrink-0 -mt-1 -mr-1">
                        {/* 찜 */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();

                            toggleWish(house.id);
                          }}
                          className="p-1"
                          aria-label={isLiked ? "찜 취소" : "찜하기"}
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

                        {/* 더보기 */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();

                            setOpenMenuId(isMenuOpen ? null : house.id);
                          }}
                          className="p-1 ml-1 text-gray-400"
                          aria-label="집 관리 메뉴"
                        >
                          <MoreVertical size={21} strokeWidth={1.7} />
                        </button>
                      </div>
                    </div>

                    {/* 더보기 메뉴 */}
                    {isMenuOpen && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="
                          absolute
                          top-[54px]
                          right-3
                          z-20
                          w-[150px]
                          bg-white
                          border
                          border-gray-100
                          rounded-xl
                          shadow-[0_4px_18px_rgba(0,0,0,0.12)]
                          overflow-hidden
                        "
                      >
                        <button
                          type="button"
                          onClick={() => handleEditName(house)}
                          className="
                            w-full
                            h-[46px]
                            px-4
                            flex
                            items-center
                            gap-2
                            text-[14px]
                            text-gray-800
                             
                          "
                        >
                          <Pencil size={16} strokeWidth={1.7} />집 이름 수정
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setOpenMenuId(null);
                            setDeletingHouse(house);
                          }}
                          className="
                            w-full
                            h-[46px]
                            px-4
                            flex
                            items-center
                            gap-2
                            text-[14px]
                            text-red-500
                            border-t
                            border-gray-100
                             
                          "
                        >
                          <Trash2 size={16} strokeWidth={1.7} />집 삭제
                        </button>
                      </div>
                    )}

                    {/* 금액 */}
                    <p className="mt-2 text-[14px] font-medium text-gray-900">
                      보증금 {house.deposit || "-"} / 월세 {house.rent || "-"}
                    </p>

                    {/* 관리비 */}
                    <p className="mt-2 text-[14px] font-medium text-gray-900">
                      관리비 {house.maintenanceFee || "-"}
                    </p>

                    <div className="mt-6 border-t border-gray-100" />

                    {/* 점검 현황 */}
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-[13px] text-gray-900">
                        점검{" "}
                        <span className="text-[#26D383] font-medium">
                          {house.checked || 0}
                        </span>
                        /{house.totalInspection || 0}
                      </p>

                      <p className="text-[13px] text-gray-900">
                        미확인{" "}
                        <span className="text-red-500 font-medium">
                          {house.unconfirmed ?? 0}개
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
            {activeTab === "registered" ? (
              <>
                <div className="w-20 h-20 rounded-full bg-[#F0FBF6] flex items-center justify-center">
                  <Home
                    size={38}
                    strokeWidth={1.4}
                    className="text-[#26D383]"
                  />
                </div>

                <p className="mt-5 text-[17px] font-bold text-gray-800">
                  등록한 집이 없어요
                </p>

                <p className="mt-2 text-[13px] text-gray-400 text-center leading-5">
                  집을 등록하고
                  <br />
                  체크리스트와 메모를 관리해보세요.
                </p>
              </>
            ) : (
              <>
                <Heart size={38} strokeWidth={1.3} className="text-gray-300" />

                <p className="mt-4 text-[15px] font-semibold text-gray-700">
                  찜한 집이 없어요
                </p>

                <p className="mt-1 text-[13px] text-gray-400">
                  마음에 드는 집을 찜해보세요
                </p>
              </>
            )}
          </div>
        )}

        {/* 집 등록 */}
        {activeTab === "registered" && (
          <button
            type="button"
            onClick={() => navigate("/houses/register")}
            className="
              w-full
              h-[62px]
              mt-7
              rounded-xl
              bg-[#26D383]
              text-white
              text-[17px]
              font-bold
              flex
              items-center
              justify-center
            "
          >
            + 집 등록하기
          </button>
        )}
      </main>

      {/* =========================
          집 이름 수정 모달
      ========================= */}
      {editingHouse && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/40
            flex
            items-center
            justify-center
            px-4
          "
          onClick={() => {
            setEditingHouse(null);
            setEditingName("");
          }}
        >
          <div
            className="
              w-full
              max-w-[360px]
              bg-white
              rounded-2xl
              p-5
            "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-bold text-gray-950">
                집 이름 수정
              </h3>

              <button
                type="button"
                onClick={() => {
                  setEditingHouse(null);
                  setEditingName("");
                }}
                className="text-gray-400"
                aria-label="닫기"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mt-2 text-[13px] text-gray-400">
              등록한 집을 구분하기 쉬운 이름을 입력해주세요.
            </p>

            <input
              type="text"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveName();
                }
              }}
              autoFocus
              maxLength={30}
              placeholder="예: 회사 근처 빌라"
              className="
                w-full
                h-[48px]
                mt-5
                px-4
                rounded-xl
                border
                border-gray-200
                outline-none
                text-[15px]
                focus:border-[#26D383]
              "
            />

            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={() => {
                  setEditingHouse(null);
                  setEditingName("");
                }}
                className="
                  flex-1
                  h-[48px]
                  rounded-xl
                  bg-gray-100
                  text-gray-600
                  text-[15px]
                  font-semibold
                "
              >
                취소
              </button>

              <button
                type="button"
                onClick={handleSaveName}
                disabled={!editingName.trim()}
                className="
                  flex-1
                  h-[48px]
                  rounded-xl
                  bg-[#26D383]
                  text-white
                  text-[15px]
                  font-semibold
                  disabled:bg-gray-200
                  disabled:text-gray-400
                "
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {deletingHouse && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/40
            flex
            items-center
            justify-center
            px-4
          "
          onClick={() => setDeletingHouse(null)}
        >
          <div
            className="
              w-full
              max-w-[360px]
              bg-white
              rounded-2xl
              p-5
            "
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[18px] font-bold text-gray-950">
              집을 삭제할까요?
            </h3>

            <p className="mt-3 text-[14px] text-gray-500 leading-5">
              {deletingHouse.name || deletingHouse.address || "등록한 집"}
              의 체크리스트와 메모도
              <br />
              함께 삭제됩니다.
            </p>

            <div className="flex gap-2 mt-6">
              <button
                type="button"
                onClick={() => setDeletingHouse(null)}
                className="
                  flex-1
                  h-[48px]
                  rounded-xl
                  bg-gray-100
                  text-gray-600
                  text-[15px]
                  font-semibold
                "
              >
                취소
              </button>

              <button
                type="button"
                onClick={handleDeleteHouse}
                className="
                  flex-1
                  h-[48px]
                  rounded-xl
                  bg-red-500
                  text-white
                  text-[15px]
                  font-semibold
                "
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
