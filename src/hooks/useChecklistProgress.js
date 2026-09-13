import { useMemo } from 'react'

// 체크리스트 진행률(n/총개수, 퍼센트)을 계산하는 훅
export default function useChecklistProgress(checkedItems = {}) {
  return useMemo(() => {
    const values = Object.values(checkedItems)
    const total = values.length
    const done = values.filter(Boolean).length
    const percent = total > 0 ? Math.round((done / total) * 100) : 0
    return { done, total, percent }
  }, [checkedItems])
}
