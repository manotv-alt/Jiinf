import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "../components/icons"

export function Select({ value, onChange, options, placeholder }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState("")
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Update selected label when value changes
  useEffect(() => {
    if (value) {
      const selectedOption = options.find((option) => option.value === value)
      if (selectedOption) {
        setSelectedLabel(selectedOption.label)
      }
    } else {
      setSelectedLabel("")
    }
  }, [value, options])

  const handleSelect = (optionValue) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <SelectTrigger onClick={() => setIsOpen(!isOpen)}>
        <SelectValue placeholder={placeholder} selectedLabel={selectedLabel} />
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </SelectTrigger>

      {isOpen && (
        <SelectContent>
          {options.length > 0 ? (
            options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                label={option.label}
                isSelected={value === option.value}
                onSelect={handleSelect}
              />
            ))
          ) : (
            <div className="relative cursor-default select-none py-2 pl-3 pr-9 text-sm text-white">
              No options available
            </div>
          )}
        </SelectContent>
      )}
    </div>
  )
}

export function SelectTrigger({ children, onClick }) {
  return (
    <button
      type="button"
      className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-gray-800 px-3 py-2 text-left text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export function SelectValue({ placeholder, selectedLabel }) {
  return (
    <span className={`block truncate ${!selectedLabel ? "text-white" : ""}`}>{selectedLabel || placeholder}</span>
  )
}

export function SelectContent({ children }) {
  return (
    <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      {children}
    </div>
  )
}

export function SelectItem({ value, label, isSelected, onSelect }) {
  return (
    <div
      className={`relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm hover:bg-gray-600 ${
        isSelected ? "bg-gray-600 font-medium" : "font-normal"
      }`}
      onClick={() => onSelect(value)}
    >
      {label}
    </div>
  )
}

export function SelectGroup({ children }) {
  return <div>{children}</div>
}

export function SelectLabel({ children }) {
  return <div>{children}</div>
}

export function SelectSeparator() {
  return <hr />
}

export function SelectScrollUpButton() {
  return <div>Scroll Up</div>
}

export function SelectScrollDownButton() {
  return <div>Scroll Down</div>
}
