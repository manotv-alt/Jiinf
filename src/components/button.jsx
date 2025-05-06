export function Button({ children, className = "", onClick, disabled = false }) {
  return (
    <button
      className={`flex-1 rounded-md px-4 py-2 transition-colors ${
        disabled ? "cursor-not-allowed bg-gray-400" : `${className} cursor-pointer`
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
