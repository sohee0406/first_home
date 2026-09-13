import { createContext, useContext, useState } from 'react'

// 등록된 집 / 찜한 집 목록을 앱 전역에서 공유하기 위한 Context
const HouseContext = createContext(null)

export function HouseProvider({ children }) {
  const [houses, setHouses] = useState([])
  const [wishedHouses, setWishedHouses] = useState([])

  const addHouse = (house) => setHouses((prev) => [...prev, house])
  const toggleWish = (houseId) => {
    // TODO: 찜하기 토글 로직
  }

  const value = { houses, wishedHouses, addHouse, toggleWish }
  return <HouseContext.Provider value={value}>{children}</HouseContext.Provider>
}

export function useHouse() {
  const ctx = useContext(HouseContext)
  if (!ctx) throw new Error('useHouse는 HouseProvider 내부에서만 사용할 수 있습니다')
  return ctx
}
