// "1,000만원" 같은 한국식 금액 표기 포맷터
export function formatManwon(value) {
  if (value == null) return ''
  return `${Number(value).toLocaleString('ko-KR')}만원`
}

// 자유 입력/선택값(예: "1,000만원", "15만원 이상", "없음", "40")에서
// 만원 단위 숫자만 뽑아내는 파서. 숫자가 없으면 0을 반환한다.
export function parseManwon(value) {
  if (value == null) return 0
  const digitsOnly = String(value).replace(/,/g, '')
  const match = digitsOnly.match(/\d+/)
  return match ? Number(match[0]) : 0
}
