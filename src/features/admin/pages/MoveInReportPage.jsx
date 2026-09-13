import FAQItem from '../components/FAQItem'

// 전입신고 안내 상세 페이지 (Q&A 형태: 왜/언제/어디서/무엇이 필요한가)
export default function MoveInReportPage() {
  const faqs = [
    { q: '왜 해야하나요?', a: '새로운 거주지로 이동했다는 사실을 주민등록과 주소에 반영하기 위해서예요.' },
    { q: '언제 해야하나요?', a: '입주한 날부터 2주(14일) 이내에 신고해야 해요.' },
    { q: '어디서 할 수 있나요?', a: '온라인 정부24 홈페이지, 모바일 또는 새 주소지 관할 주민센터에서 처리 가능해요.' },
    { q: '무엇이 필요한가요?', a: '신분증, 주민등록증, 임대차계약서 등 (온라인 신청 시 상이할 수 있어요.)' },
  ]

  return (
    <div className="p-4">
      <h1 className="font-bold text-lg mb-4">전입신고</h1>
      {faqs.map((f) => (
        <FAQItem key={f.q} question={f.q} answer={f.a} />
      ))}
    </div>
  )
}
