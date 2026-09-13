// Q&A 형태의 안내 항목 (전입신고 페이지 등에서 재사용)
export default function FAQItem({ question, answer }) {
  return (
    <div className="mb-4">
      <p className="font-bold text-sm">Q. {question}</p>
      <p className="text-sm text-gray-500 mt-1">{answer}</p>
    </div>
  )
}
