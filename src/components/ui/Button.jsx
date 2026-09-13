// 공용 버튼 (초록색 primary 버튼 등 화면 전반에 반복되는 스타일)
export default function Button({ children, variant = 'primary', ...props }) {
  const base = 'rounded-xl py-3 px-4 w-full font-bold'
  const styles = {
    primary: 'bg-green-500 text-white',
    outline: 'border border-gray-300 text-gray-700',
  }
  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  )
}
