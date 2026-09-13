// "1,000만원" 같은 한국식 금액 표기 포맷터
export function formatManwon(value) {
  if (value == null) return ''
  return `${Number(value).toLocaleString('ko-KR')}만원`
}
