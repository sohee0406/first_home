import { Link } from 'react-router-dom'

// "어떤 체크리스트를 보실 건가요?" 허브 페이지
const CHECKLISTS = [
  { label: '집 보러 가기 전', to: '/checklist/before-visit' },
  { label: '현장 점검', to: '/checklist/on-site' },
  { label: '주변 점검', to: '/checklist/around' },
  { label: '계약 전 최종 확인', to: '/checklist/contract-final' },
  { label: '입주 전', to: '/checklist/move-in' },
]

export default function ChecklistHubPage() {
  return (
    <div className="p-4">
      <h1 className="font-bold text-lg mb-4">어떤 체크리스트를 보실 건가요?</h1>
      <div className="flex flex-col gap-2">
        {CHECKLISTS.map((c) => (
          <Link key={c.to} to={c.to} className="border rounded-xl py-3 px-4">
            {c.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
