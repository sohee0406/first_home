// 집(house)의 checkItems 중 특정 항목(title)이 완료 상태인지 확인하는 헬퍼
export function isChecklistItemComplete(house, title) {
  const items = house?.checkItems;

  if (!Array.isArray(items)) {
    return false;
  }

  const item = items.find((i) => i.title === title);

  if (!item) {
    return false;
  }

  return item.status === "complete";
}

// 집 전체 체크리스트가 진행중인지(하나라도 시작했고 아직 다 끝나지 않았는지) 확인
export function isHouseInProgress(house) {
  const checked = Number(house?.checked || 0);
  const total = Number(house?.totalInspection || 0);

  return total > 0 && checked < total;
}
