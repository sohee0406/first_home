import { createContext, useContext, useState } from 'react'

// 체크리스트별 체크 상태(어떤 항목이 체크됐는지)를 전역에서 관리
const ChecklistContext = createContext(null)

export function ChecklistProvider({ children }) {
  const [checkedItems, setCheckedItems] = useState({})

  const toggleItem = (checklistId, itemId) => {
    setCheckedItems((prev) => {
      const current = prev[checklistId] || {}
      return {
        ...prev,
        [checklistId]: { ...current, [itemId]: !current[itemId] },
      }
    })
  }

  const value = { checkedItems, toggleItem }
  return <ChecklistContext.Provider value={value}>{children}</ChecklistContext.Provider>
}

export function useChecklist() {
  const ctx = useContext(ChecklistContext)
  if (!ctx) throw new Error('useChecklist는 ChecklistProvider 내부에서만 사용할 수 있습니다')
  return ctx
}
