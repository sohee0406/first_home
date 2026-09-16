import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, X, MapPin } from "lucide-react";
import KakaoAroundMap from "../components/KakaoAroundMap";
import { useHouse } from "../../house/context/HouseContext";

export default function AroundCheckPage() {
  const navigate = useNavigate();
  const { houses, updateChecklistProgress } = useHouse();

  const latestHouse = houses?.length > 0 ? houses[houses.length - 1] : null;

  // 현재 진행 중인 집(체크리스트 진행 상태를 반영할 대상)
  const currentHouse = useMemo(() => {
    if (!houses || houses.length === 0) {
      return null;
    }

    return (
      houses.find((house) => {
        const checked = Number(house.checked || 0);
        const total = Number(house.totalInspection || 0);

        return checked < total;
      }) || houses[0]
    );
  }, [houses]);

  const [address, setAddress] = useState(latestHouse?.address || "");

  const [inputAddress, setInputAddress] = useState(latestHouse?.address || "");

  const [isEditingAddress, setIsEditingAddress] = useState(
    !latestHouse?.address,
  );

  const [facilityInput, setFacilityInput] = useState("");

  const [facilities, setFacilities] = useState([]);

  const [counts, setCounts] = useState({});

  const handleAddressSubmit = () => {
    const value = inputAddress.trim();

    if (!value) {
      return;
    }

    setAddress(value);
    setInputAddress(value);
    setIsEditingAddress(false);

    // 주소가 바뀌면 기존 검색 결과 초기화
    setCounts({});
  };

  const handleAddFacility = () => {
    const value = facilityInput.trim();

    if (!value) {
      return;
    }

    // 같은 시설 중복 추가 방지
    const alreadyExists = facilities.some(
      (facility) => facility.name.toLowerCase() === value.toLowerCase(),
    );

    if (alreadyExists) {
      setFacilityInput("");
      return;
    }

    const newFacility = {
      id: `${Date.now()}-${Math.random()}`,
      name: value,
      query: value,
    };

    setFacilities((prev) => [...prev, newFacility]);

    setFacilityInput("");
  };

  const handleRemoveFacility = (id) => {
    const target = facilities.find((facility) => facility.id === id);

    setFacilities((prev) => prev.filter((facility) => facility.id !== id));

    if (target) {
      setCounts((prev) => {
        const next = { ...prev };

        delete next[target.name];

        return next;
      });
    }
  };

  const handleCountsChange = (newCounts) => {
    setCounts(newCounts || {});
  };

  // 확인 버튼: 주변 점검은 항목 개수가 아니라 확인/미확인으로만 관리
  const handleConfirm = () => {
    if (currentHouse) {
      updateChecklistProgress(currentHouse.id, "주변 점검", 1, 1);
    }

    navigate("/checklist/on-site");
  };

  return (
    <div className=" bg-white px-4 pb-28 pt-5">
      {/* =========================
          제목
      ========================= */}

      <div className="mb-5">
        <h1 className="text-[20px] font-bold text-gray-900">주변 점검</h1>

        <p className="mt-2 text-[13px] leading-relaxed text-gray-500">
          집 주변에 필요한 시설이 있는지
          <br />
          직접 확인해보세요.
        </p>
      </div>

      {/* =========================
          주소
      ========================= */}

      <section className="mb-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <MapPin size={17} className="text-[#26D383]" />

            <h2 className="text-[16px] font-bold text-gray-900">확인할 집</h2>
          </div>

          {address && !isEditingAddress && (
            <button
              type="button"
              onClick={() => {
                setInputAddress(address);
                setIsEditingAddress(true);
              }}
              className="text-[12px] text-gray-500"
            >
              주소 변경
            </button>
          )}
        </div>

        {isEditingAddress || !address ? (
          <div className="rounded-2xl border border-gray-200 p-3">
            <input
              type="text"
              value={inputAddress}
              onChange={(e) => setInputAddress(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddressSubmit();
                }
              }}
              placeholder="도로명 주소를 입력해주세요"
              className="w-full rounded-xl bg-gray-50 px-4 py-3 text-[14px] outline-none placeholder:text-gray-400"
            />

            <button
              type="button"
              onClick={handleAddressSubmit}
              disabled={!inputAddress.trim()}
              className="mt-2 w-full rounded-xl bg-[#26D383] py-3 text-[14px] font-bold text-white disabled:bg-gray-200 disabled:text-gray-400"
            >
              주소 적용하기
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-[#BDEFD2] bg-[#F7FFFB] px-4 py-3.5">
            <p className="text-[13px] leading-relaxed text-gray-700">
              {address}
            </p>
          </div>
        )}
      </section>

      {/* =========================
          지도
      ========================= */}

      {address && !isEditingAddress && (
        <section className="mb-6">
          <div className="mb-3">
            <h2 className="text-[16px] font-bold text-gray-900">주변 위치</h2>

            <p className="mt-1 text-[12px] text-gray-400">
              추가한 시설이 지도에 표시돼요.
            </p>
          </div>

          <KakaoAroundMap
            address={address}
            facilities={facilities}
            onCountsChange={handleCountsChange}
          />
        </section>
      )}

      {/* =========================
          시설 추가
      ========================= */}

      {address && !isEditingAddress && (
        <section className="mb-6">
          <div className="mb-3">
            <h2 className="text-[16px] font-bold text-gray-900">확인할 시설</h2>

            <p className="mt-1 text-[12px] text-gray-400">
              원하는 시설을 직접 추가해주세요.
            </p>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={facilityInput}
                onChange={(e) => setFacilityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddFacility();
                  }
                }}
                placeholder="예: 편의점, 버스정류장"
                className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-3 text-[13px] outline-none focus:border-[#26D383]"
              />
            </div>

            <button
              type="button"
              onClick={handleAddFacility}
              disabled={!facilityInput.trim()}
              className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl bg-[#26D383] text-white disabled:bg-gray-200"
              aria-label="시설 추가"
            >
              <Plus size={20} />
            </button>
          </div>
        </section>
      )}

      {/* =========================
          추가한 시설
      ========================= */}

      {address && !isEditingAddress && (
        <section>
          {facilities.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 py-8 text-center">
              <Search size={22} className="mx-auto mb-2 text-gray-300" />

              <p className="text-[14px] font-medium text-gray-500">
                아직 추가한 시설이 없어요.
              </p>

              <p className="mt-1 text-[12px] text-gray-400">
                위에서 확인하고 싶은 시설을 추가해주세요.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {facilities.map((facility) => {
                /*
                  중요:
                  KakaoAroundMap은
                  counts[facility.name]에
                  검색 결과 개수를 저장함
                */
                const count = counts[facility.name];

                return (
                  <div
                    key={facility.id}
                    className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E9FFF4] text-[#26D383]">
                        <Search size={18} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[14px] font-bold text-gray-800">
                          {facility.name}
                        </p>

                        <p className="mt-1 text-[12px] text-gray-400">
                          {count === undefined
                            ? "검색 중..."
                            : `반경 1km 내 ${count}곳`}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveFacility(facility.id)}
                      className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400"
                      aria-label={`${facility.name} 삭제`}
                    >
                      <X size={15} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* =========================
          하단 버튼
      ========================= */}

      <section className="bg-white px-4 pb-5 pt-8">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              flex-1
              py-4
              bg-[#EAFEF1]
              text-[#26D383]
              font-bold
              text-[16px]
              rounded-2xl
            "
          >
            이전
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="
              flex-1
              py-4
              text-white
              bg-[#26D383]
              font-bold
              text-[16px]
              rounded-2xl
            "
          >
            확인
          </button>
        </div>
      </section>
    </div>
  );
}
