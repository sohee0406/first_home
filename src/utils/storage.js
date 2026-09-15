export function loadFromStorage(key, defaultValue = null) {
  try {
    const saved = localStorage.getItem(key);

    if (saved === null) {
      return defaultValue;
    }

    return JSON.parse(saved);
  } catch (error) {
    console.error(`localStorage 불러오기 실패: ${key}`, error);

    return defaultValue;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`localStorage 저장 실패: ${key}`, error);
  }
}
