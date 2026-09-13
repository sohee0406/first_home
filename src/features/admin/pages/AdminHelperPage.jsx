import { Link } from 'react-router-dom'

// 행정 도우미 허브 (입주를 완료했나요? / 등기부등본 확인 / 전입신고 등)
export default function AdminHelperPage() {
  return (
    <div className="p-4">
      <h1 className="font-bold text-lg mb-4">입주를 완료했나요?</h1>
      <div className="flex flex-col gap-2">
        <Link to="/admin/registry-doc" className="border rounded-xl py-3 px-4">등기부등본 꼭 확인해야 하나요?</Link>
        <Link to="/admin/move-in-report" className="border rounded-xl py-3 px-4">전입신고</Link>
      </div>
    </div>
  )
}
