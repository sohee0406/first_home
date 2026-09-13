import { createContext, useContext, useState } from 'react'

// 로그인 사용자 정보 (예: "김한국님") 전역 관리
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // { name, ... }

  const value = { user, setUser }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth는 AuthProvider 내부에서만 사용할 수 있습니다')
  return ctx
}
