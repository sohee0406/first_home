import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  CheckCircle2,
  AlertTriangle,
  X,
  MoreHorizontal,
  ImagePlus,
  Pencil,
  Trash2,
} from "lucide-react";

import MemoBox from "../components/MemoBox";
import { useHouse } from "../context/HouseContext";

export default function HouseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { houses, deleteHouse, updateHouse } = useHouse();
  const house = houses.find((item) => String(item.id) === String(id));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    address: house?.address || "",
    deposit: house?.deposit || "",
    rent: house?.rent || "",
    maintenanceFee: house?.maintenanceFee || "",
  });

  if (!house) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
        <p className="text-[17px] font-bold text-gray-800">
          등록된 집을 찾을 수 없어요
        </p>

        <p className="text-[13px] text-gray-400 mt-2">
          삭제되었거나 존재하지 않는 집이에요.
        </p>

        <button
          type="button"
          onClick={() => navigate("/houses")}
          className="
            mt-6
            px-6
            py-3
            rounded-xl
            bg-[#26D383]
            text-white
            font-bold
          "
        >
          집 관리로 돌아가기
        </button>
      </div>
    );
  }

  const handleOpenEdit = () => {
    setEditData({
      address: house.address || "",
      deposit: house.deposit || "",
      rent: house.rent || "",
      maintenanceFee: house.maintenanceFee || "",
    });

    setIsMenuOpen(false);
    setIsEditOpen(true);
  };

  const handleSaveEdit = () => {
    updateHouse(house.id, {
      address: editData.address,
      name: editData.address || "등록한 집",
      deposit: editData.deposit,
      rent: editData.rent,
      maintenanceFee: editData.maintenanceFee,
    });

    setIsEditOpen(false);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "이 집을 삭제할까요?\n삭제한 집의 정보는 다시 복구할 수 없어요.",
    );

    if (!confirmed) {
      return;
    }

    deleteHouse(house.id);

    navigate("/houses");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 등록할 수 있어요.");

      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateHouse(house.id, {
        image: reader.result,
      });
    };

    reader.readAsDataURL(file);

    e.target.value = "";
  };

  const handleDeleteImage = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmed = window.confirm("등록한 사진을 삭제할까요?");

    if (!confirmed) {
      return;
    }

    updateHouse(house.id, {
      image: "",
    });
  };

  const checkItems = house.checkItems || [];

  const warningItems = house.warningItems || [];

  const warningCount = house.warningCount ?? warningItems.length;

  const checked = house.checked || 0;

  const totalInspection = house.totalInspection || 0;

  const progress =
    totalInspection > 0 ? Math.round((checked / totalInspection) * 100) : 0;

  return (
    <div className="bg-white min-h-screen pb-24">
      <section className="px-4 pt-4">
        {/* 더보기 버튼 */}
        <div className="flex justify-end h-6 relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="text-gray-900 p-1"
            aria-label="집 관리 메뉴"
          >
            <MoreHorizontal size={22} strokeWidth={2} />
          </button>

          {/* 더보기 메뉴 */}
          {isMenuOpen && (
            <div
              className="
                absolute
                right-0
                top-8
                z-30
                w-[150px]
                bg-white
                rounded-xl
                border
                border-gray-100
                shadow-[0_4px_16px_rgba(0,0,0,0.12)]
                overflow-hidden
              "
            >
              {/* 수정 */}
              <button
                type="button"
                onClick={handleOpenEdit}
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3.5
                  text-left
                  text-[14px]
                  text-gray-800
                  hover:bg-gray-50
                "
              >
                <Pencil size={17} strokeWidth={1.7} />집 정보 수정
              </button>

              {/* 삭제 */}
              <button
                type="button"
                onClick={handleDelete}
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3.5
                  text-left
                  text-[14px]
                  text-red-500
                  border-t
                  border-gray-100
                  hover:bg-red-50
                "
              >
                <Trash2 size={17} strokeWidth={1.7} />집 삭제
              </button>
            </div>
          )}
        </div>

        <div
          className="
            relative
            w-full
            h-[202px]
            mt-2
            rounded-xl
            overflow-hidden
          "
        >
          {house.image ? (
            <>
              {/* 등록된 사진 */}
              <img
                src={house.image}
                alt={house.name}
                className="
                  w-full
                  h-full
                  object-cover
                "
              />

              {/* 사진 변경 */}
              <label
                className="
                  absolute
                  bottom-3
                  right-3
                  bg-black/55
                  text-white
                  rounded-full
                  px-3
                  py-1.5
                  text-[12px]
                  cursor-pointer
                "
              >
                사진 변경
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {/* 사진 삭제 */}
              <button
                type="button"
                onClick={handleDeleteImage}
                className="
                  absolute
                  top-3
                  right-3
                  w-8
                  h-8
                  rounded-full
                  bg-black/55
                  text-white
                  flex
                  items-center
                  justify-center
                "
                aria-label="사진 삭제"
              >
                <Trash2 size={16} strokeWidth={1.8} />
              </button>
            </>
          ) : (
            /* 사진이 없을 때 */
            <label
              className="
                block
                w-full
                h-full
                border
                border-dashed
                border-gray-300
                rounded-xl
                cursor-pointer
              "
            >
              <div
                className="
                  w-full
                  h-full
                  flex
                  flex-col
                  items-center
                  justify-center
                "
              >
                <ImagePlus
                  size={32}
                  strokeWidth={1.4}
                  className="text-gray-300"
                />

                <p
                  className="
                    text-[16px]
                    font-semibold
                    text-gray-400
                    mt-4
                  "
                >
                  사진을 등록해볼까요?
                </p>

                <p
                  className="
                    text-[13px]
                    text-gray-400
                    mt-3
                  "
                >
                  + 사진 추가하기
                </p>
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </section>

      <section className="px-4 mt-6">
        <p
          className="
            text-[21px]
            font-bold
            text-gray-950
          "
        >
          {house.name}
        </p>

        {house.houseType && (
          <span
            className="
              inline-block
              mt-2
              px-2.5
              py-1
              rounded-md
              bg-[#EAFEF1]
              text-[#20B970]
              text-[12px]
              font-medium
            "
          >
            {house.houseType}
          </span>
        )}

        {house.address && (
          <p
            className="
              mt-3
              text-[13px]
              text-gray-500
            "
          >
            {house.address}
          </p>
        )}
      </section>

      <section className="px-4 mt-7">
        <div className="grid grid-cols-3 text-center">
          {/* 보증금 */}
          <div>
            <p
              className="
                text-[14px]
                font-semibold
                text-gray-900
              "
            >
              보증금
            </p>

            <p
              className="
                mt-4
                text-[13px]
                text-gray-900
              "
            >
              약{" "}
              <span
                className="
                  text-[#26D383]
                  text-[18px]
                  font-medium
                "
              >
                {house.deposit || "-"}
              </span>
              {house.deposit && "만원"}
            </p>
          </div>

          {/* 월세 */}
          <div>
            <p
              className="
                text-[14px]
                font-semibold
                text-gray-900
              "
            >
              월세
            </p>

            <p
              className="
                mt-4
                text-[13px]
                text-gray-900
              "
            >
              약{" "}
              <span
                className="
                  text-[#26D383]
                  text-[18px]
                  font-medium
                "
              >
                {house.rent || "-"}
              </span>
              {house.rent && "만원"}
            </p>
          </div>

          {/* 관리비 */}
          <div>
            <p
              className="
                text-[14px]
                font-semibold
                text-gray-900
              "
            >
              관리비
            </p>

            <p
              className="
                mt-4
                text-[13px]
                text-gray-900
              "
            >
              약{" "}
              <span
                className="
                  text-[#26D383]
                  text-[18px]
                  font-medium
                "
              >
                {house.maintenanceFee || "-"}
              </span>
              {house.maintenanceFee &&
                !house.maintenanceFee.includes("만원") &&
                "만원"}
            </p>
          </div>
        </div>
      </section>

      {house.amenities?.length > 0 && (
        <section className="px-4 mt-8">
          <h2 className="text-[16px] font-bold text-gray-900">옵션</h2>

          <div className="flex flex-wrap gap-2 mt-4">
            {house.amenities.map((item) => (
              <span
                key={item}
                className="
            inline-flex
            items-center
            px-3
            py-2
            rounded-lg
            bg-[#F3FCF7]
            border
            border-[#D8F5E5]
            text-[13px]
            font-medium
            text-[#20B970]
            whitespace-nowrap
          "
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      )}

      <section
        className="
          mx-4
          mt-10
          rounded-xl
          bg-[#EAFEF1]
          px-6
          py-5
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <p
            className="
              text-[14px]
              font-semibold
              text-gray-900
            "
          >
            집 체크 진행률
          </p>

          <span
            className="
              text-[13px]
              font-semibold
              text-[#26D383]
            "
          >
            {checked}/{totalInspection}
          </span>
        </div>

        <div
          className="
            flex
            items-center
            gap-3
            mt-4
          "
        >
          <div
            className="
              flex-1
              h-[10px]
              bg-white
              rounded-full
              overflow-hidden
            "
          >
            <div
              className="
                h-full
                bg-[#26D383]
                rounded-full
                transition-all
              "
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <span
            className="
              text-[13px]
              text-gray-900
              shrink-0
            "
          >
            {progress}%
          </span>
        </div>
      </section>

      <section className="px-4 mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2
            className="
              text-[16px]
              font-bold
              text-gray-900
            "
          >
            체크리스트
          </h2>

          <span
            className="
              text-[12px]
              text-gray-400
            "
          >
            항목을 누르면 체크리스트로 이동해요
          </span>
        </div>

        <div
          className="
            rounded-xl
            bg-white
            border
            border-gray-100
            shadow-[0_1px_8px_rgba(0,0,0,0.04)]
            overflow-hidden
          "
        >
          {checkItems.length > 0 ? (
            checkItems.map((item, index) => {
              const isLast = index === checkItems.length - 1;

              const isComplete =
                item.status === "완료" || item.status === "complete";

              return (
                <button
                  type="button"
                  key={`${item.title}-${index}`}
                  onClick={() => {
                    if (item.path) {
                      navigate(`${item.path}?houseId=${house.id}`);
                    }
                  }}
                  className={`
                      w-full
                      flex
                      items-center
                      px-4
                      py-4
                      text-left
                      transition-colors
                      hover:bg-gray-50
                      ${!isLast ? "border-b border-gray-100" : ""}
                    `}
                >
                  {/* 체크 아이콘 */}
                  <div className="shrink-0">
                    <CheckCircle2
                      size={20}
                      strokeWidth={1.6}
                      className={
                        isComplete ? "text-[#26D383]" : "text-gray-300"
                      }
                    />
                  </div>

                  {/* 체크리스트 이름 */}
                  <span
                    className="
                        ml-3
                        text-[14px]
                        font-medium
                        text-gray-900
                      "
                  >
                    {item.title}
                  </span>

                  {/* 진행 상태 */}
                  <div className="ml-auto flex items-center">
                    {isComplete ? (
                      <span
                        className="
                            text-[12px]
                            font-semibold
                            text-[#26D383]
                          "
                      >
                        완료
                      </span>
                    ) : (
                      <span
                        className="
                            text-[13px]
                            text-gray-500
                          "
                      >
                        {item.type === "binary"
                          ? "미확인"
                          : item.value || "0/0"}
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          ) : (
            <div
              className="
                px-4
                py-8
                text-center
              "
            >
              <p
                className="
                  text-[14px]
                  text-gray-400
                "
              >
                체크리스트가 아직 없어요.
              </p>
            </div>
          )}
        </div>
      </section>

      {warningCount > 0 && (
        <section className="px-4 mt-6">
          <div
            className="
              relative
              rounded-xl
              bg-[#FFF0F0]
              px-4
              py-4
            "
          >
            <button
              type="button"
              className="
                absolute
                right-3
                top-3
                text-red-400
              "
            >
              <X size={15} />
            </button>

            <div
              className="
                flex
                items-center
                gap-1.5
              "
            >
              <AlertTriangle size={16} className="text-red-500" />

              <p
                className="
                  text-[13px]
                  font-semibold
                  text-red-500
                "
              >
                확인 필요 항목 {warningCount}개
              </p>
            </div>

            {warningItems.length > 0 && (
              <p
                className="
                  mt-2
                  text-[12px]
                  leading-relaxed
                  text-red-400
                "
              >
                {warningItems.join(", ")}
              </p>
            )}
          </div>
        </section>
      )}

      <section className="px-4 mt-7 pb-8">
        <MemoBox
          memo={house.memo}
          onSave={(memo) =>
            updateHouse(house.id, {
              memo,
            })
          }
        />
      </section>
      {isEditOpen && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/40
            flex
            items-end
            justify-center
          "
        >
          <div
            className="
              w-full
              max-w-md
              bg-white
              rounded-t-2xl
              px-4
              pt-5
              pb-8
              max-h-[90vh]
              overflow-y-auto
            "
          >
            {/* 모달 헤더 */}
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <h2
                className="
                  text-[18px]
                  font-bold
                  text-gray-900
                "
              >
                집 정보 수정
              </h2>

              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="
                  p-1
                  text-gray-500
                "
              >
                <X size={22} />
              </button>
            </div>

            {/* 주소 */}
            <div className="mt-6">
              <label
                className="
                  text-[13px]
                  font-semibold
                  text-gray-800
                "
              >
                주소
              </label>

              <input
                value={editData.address}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                placeholder="주소를 입력해주세요"
                className="
                  w-full
                  mt-2
                  px-4
                  py-3
                  rounded-xl
                  bg-gray-100
                  outline-none
                  text-[14px]
                "
              />
            </div>

            {/* 보증금 */}
            <div className="mt-4">
              <label
                className="
                  text-[13px]
                  font-semibold
                  text-gray-800
                "
              >
                보증금
              </label>

              <input
                value={editData.deposit}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    deposit: e.target.value,
                  }))
                }
                placeholder="예) 1,000"
                className="
                  w-full
                  mt-2
                  px-4
                  py-3
                  rounded-xl
                  bg-gray-100
                  outline-none
                  text-[14px]
                "
              />
            </div>

            {/* 월세 */}
            <div className="mt-4">
              <label
                className="
                  text-[13px]
                  font-semibold
                  text-gray-800
                "
              >
                월세
              </label>

              <input
                value={editData.rent}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    rent: e.target.value,
                  }))
                }
                placeholder="예) 40"
                className="
                  w-full
                  mt-2
                  px-4
                  py-3
                  rounded-xl
                  bg-gray-100
                  outline-none
                  text-[14px]
                "
              />
            </div>

            {/* 관리비 */}
            <div className="mt-4">
              <label
                className="
                  text-[13px]
                  font-semibold
                  text-gray-800
                "
              >
                관리비
              </label>

              <input
                value={editData.maintenanceFee}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    maintenanceFee: e.target.value,
                  }))
                }
                placeholder="예) 10만원"
                className="
                  w-full
                  mt-2
                  px-4
                  py-3
                  rounded-xl
                  bg-gray-100
                  outline-none
                  text-[14px]
                "
              />
            </div>

            {/* 수정 완료 */}
            <button
              type="button"
              onClick={handleSaveEdit}
              className="
                w-full
                h-[54px]
                mt-6
                rounded-xl
                bg-[#26D383]
                text-white
                text-[16px]
                font-bold
              "
            >
              수정 완료
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
