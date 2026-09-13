import { useNavigate } from 'react-router-dom'

// 뒤로가기(<) + 제목 + 닫기(X)가 있는 공용 상세 페이지 헤더
export default function Header({ title, onClose }) {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <button onClick={() => navigate(-1)}>←</button>
      <span className="font-bold">{title}</span>
      <button onClick={onClose}>✕</button>
    </div>
  )
}
