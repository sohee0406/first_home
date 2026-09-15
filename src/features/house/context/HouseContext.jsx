import { createContext, useContext, useState } from "react";
import { loadFromStorage, saveToStorage } from "../../../utils/storage";

const HouseContext = createContext(null);

const STORAGE_KEY = "first_home_houses";

// 전체 체크리스트 기본값
const DEFAULT_CHECK_ITEMS = [
  {
    title: "집 보러가기 전",
    status: "progress",
    value: "0/6",
    path: "/checklist/before-visit",
    checked: 0,
    total: 6,
  },
  {
    title: "주변 점검",
    status: "progress",
    value: "0/6",
    path: "/checklist/around",
    checked: 0,
    total: 6,
  },
  {
    title: "현장 점검",
    status: "progress",
    value: "0/22",
    path: "/checklist/on-site",
    checked: 0,
    total: 22,
  },
  {
    title: "계약 전",
    status: "progress",
    value: "0/8",
    path: "/checklist/contract-final",
    checked: 0,
    total: 8,
  },
  {
    title: "입주 후",
    status: "progress",
    value: "0/5",
    path: "/checklist/move-in",
    checked: 0,
    total: 5,
  },
];

// 체크 완료 개수
const getTotalChecked = (checkItems) => {
  return checkItems.reduce((sum, item) => sum + Number(item.checked || 0), 0);
};

// 전체 체크리스트 개수
const getTotalCount = (checkItems) => {
  return checkItems.reduce((sum, item) => sum + Number(item.total || 0), 0);
};

export function HouseProvider({ children }) {
  const [houses, setHouses] = useState(() => {
    const savedHouses = loadFromStorage(STORAGE_KEY, []);

    if (!Array.isArray(savedHouses)) {
      return [];
    }

    // 기존에 저장된 집도 새로운 구조에 맞게 정리
    return savedHouses.map((house) => {
      const savedCheckItems = Array.isArray(house.checkItems)
        ? house.checkItems
        : [];

      const mergedCheckItems = DEFAULT_CHECK_ITEMS.map((defaultItem) => {
        const savedItem = savedCheckItems.find(
          (item) => item.title === defaultItem.title,
        );

        if (!savedItem) {
          return {
            ...defaultItem,
          };
        }

        const checked = Number(savedItem.checked || 0);

        const total = Number(savedItem.total || defaultItem.total);

        return {
          ...defaultItem,
          ...savedItem,
          checked,
          total,
          value: `${checked}/${total}`,
          status: checked >= total ? "complete" : "progress",
        };
      });

      const totalChecked = getTotalChecked(mergedCheckItems);

      const totalCount = getTotalCount(mergedCheckItems);

      return {
        ...house,

        // 기존 데이터에 없으면 false
        isWished: house.isWished === true,

        checkItems: mergedCheckItems,

        checked: totalChecked,

        totalInspection: totalCount,

        unconfirmed: Math.max(totalCount - totalChecked, 0),
      };
    });
  });

  // houses가 변경될 때 localStorage 저장
  const saveHouses = (nextHouses) => {
    setHouses(nextHouses);
    saveToStorage(STORAGE_KEY, nextHouses);
  };

  // 집 추가
  const addHouse = (houseData) => {
    const checkItems = DEFAULT_CHECK_ITEMS.map((item) => ({
      ...item,
    }));

    const newHouse = {
      id: Date.now(),

      ...houseData,

      // 새 집은 기본적으로 찜하지 않음
      isWished: false,

      checkItems,

      checked: 0,

      totalInspection: getTotalCount(checkItems),

      unconfirmed: getTotalCount(checkItems),
    };

    const nextHouses = [...houses, newHouse];

    saveHouses(nextHouses);

    return newHouse;
  };

  // 집 삭제
  const deleteHouse = (houseId) => {
    const nextHouses = houses.filter((house) => house.id !== houseId);

    saveHouses(nextHouses);
  };

  // 집 정보 수정
  const updateHouse = (houseId, updatedData) => {
    const nextHouses = houses.map((house) =>
      house.id === houseId
        ? {
            ...house,
            ...updatedData,
          }
        : house,
    );

    saveHouses(nextHouses);
  };

  // 찜 상태 변경
  const toggleWish = (houseId) => {
    const nextHouses = houses.map((house) =>
      house.id === houseId
        ? {
            ...house,
            isWished: !house.isWished,
          }
        : house,
    );

    saveHouses(nextHouses);
  };

  // 체크리스트 진행률 변경
  const updateChecklistProgress = (houseId, checklistTitle, checked, total) => {
    const nextHouses = houses.map((house) => {
      if (house.id !== houseId) {
        return house;
      }

      const nextCheckItems = Array.isArray(house.checkItems)
        ? house.checkItems.map((item) => {
            if (item.title !== checklistTitle) {
              return item;
            }

            const safeTotal = Number(total) || Number(item.total) || 0;

            const safeChecked = Math.min(
              Math.max(Number(checked) || 0, 0),
              safeTotal,
            );

            return {
              ...item,
              checked: safeChecked,
              total: safeTotal,
              value: `${safeChecked}/${safeTotal}`,
              status: safeChecked >= safeTotal ? "complete" : "progress",
            };
          })
        : DEFAULT_CHECK_ITEMS;

      const totalChecked = getTotalChecked(nextCheckItems);

      const totalCount = getTotalCount(nextCheckItems);

      return {
        ...house,

        checkItems: nextCheckItems,

        checked: totalChecked,

        totalInspection: totalCount,

        unconfirmed: Math.max(totalCount - totalChecked, 0),
      };
    });

    saveHouses(nextHouses);
  };

  return (
    <HouseContext.Provider
      value={{
        houses,
        addHouse,
        deleteHouse,
        updateHouse,
        toggleWish,
        updateChecklistProgress,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
}

export function useHouse() {
  const context = useContext(HouseContext);

  if (!context) {
    throw new Error("useHouse는 HouseProvider 안에서 사용해야 합니다.");
  }

  return context;
}
