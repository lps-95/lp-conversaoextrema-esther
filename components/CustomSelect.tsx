import React, { useEffect, useRef, useState } from 'react';

type Option = { label: string; value: string }

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
}

export default function CustomSelect({ value, onChange, options, placeholder = 'Selecione uma opção' }: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedLabel = options.find(o => o.value === value)?.label

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const onKeyDownButton = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen(true)
      setActiveIndex(Math.max(0, options.findIndex(o => o.value === value)))
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const onKeyDownList = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(options.length - 1, (i < 0 ? 0 : i + 1)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(0, (i <= 0 ? 0 : i - 1)))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const opt = options[activeIndex]
      if (opt) {
        onChange(opt.value)
        setOpen(false)
      }
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      setOpen(false)
    }
  }

  return (
    <div ref={containerRef} className='relative'>
      <button
        type='button'
        aria-haspopup='listbox'
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        onKeyDown={onKeyDownButton}
        className='w-full text-left px-5 py-3 pr-12 rounded-2xl bg-white/5 backdrop-blur-md border-2 border-white/10 hover:border-white/30 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/30 outline-none text-base text-white transition-all duration-150 shadow-sm'
      >
        <span className={selectedLabel ? 'text-white' : 'text-text-secondary'}>{selectedLabel || placeholder}</span>
        <span className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 transition-transform ${open ? 'rotate-180' : ''} text-white/70`}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
            <path d='M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z' />
          </svg>
        </span>
      </button>

      {open && (
        <ul
          role='listbox'
          tabIndex={0}
          onKeyDown={onKeyDownList}
          className='absolute z-50 mt-2 w-full max-h-56 overflow-auto rounded-xl bg-[#0f0e16]/95 backdrop-blur-xl border border-white/15 shadow-2xl p-1'
        >
          {options.map((opt, idx) => {
            const selected = value === opt.value
            const active = idx === activeIndex
            return (
              <li
                key={opt.value}
                role='option'
                aria-selected={selected}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className={`flex items-center justify-between gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors ${active ? 'bg-white/10' : 'bg-transparent'} ${selected ? 'text-button-primary' : 'text-white/90'} hover:bg-white/10`}
              >
                <span className='text-sm'>{opt.label}</span>
                {selected && (
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
                    <path d='M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' />
                  </svg>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
