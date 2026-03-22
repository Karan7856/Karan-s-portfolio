import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme, themes } from '../context/ThemeContext'

export default function ThemeSwitcher() {
  const { themeId, setThemeId } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = themes.find(t => t.id === themeId)
  const isLight = themeId === 'light'

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const dropdownBg = isLight ? 'rgba(255,255,255,0.98)' : 'rgba(4,4,13,0.96)'
  const dropdownBorder = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'
  const dropdownShadow = isLight ? '0 24px 64px rgba(0,0,0,0.12)' : '0 24px 64px rgba(0,0,0,0.7)'
  const btnBg = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'
  const activeItemBg = isLight ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.08)'
  const activeItemColor = isLight ? '#1e293b' : '#fff'
  const inactiveItemColor = isLight ? '#475569' : '#64748b'
  const hoverBg = isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'

  return (
    <div ref={ref} className="relative">
      <motion.button
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
        onClick={() => setOpen(o => !o)}
        title="Change theme"
        className="w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all"
        style={{
          background: btnBg,
          border: '1px solid var(--accent1, rgba(99,102,241,0.3))',
          boxShadow: open ? '0 0 16px var(--glow)' : 'none',
        }}
      >
        {current?.emoji}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-10 z-[200] rounded-2xl overflow-hidden"
            style={{
              background: dropdownBg,
              border: `1px solid ${dropdownBorder}`,
              backdropFilter: 'blur(24px)',
              boxShadow: dropdownShadow,
              minWidth: '160px',
            }}
          >
            <div className="p-2 flex flex-col gap-1">
              {themes.map(t => (
                <button
                  key={t.id}
                  onClick={() => { setThemeId(t.id); setOpen(false) }}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all text-left w-full"
                  style={{
                    background: themeId === t.id ? activeItemBg : 'transparent',
                    color: themeId === t.id ? activeItemColor : inactiveItemColor,
                  }}
                  onMouseEnter={e => { if (themeId !== t.id) e.currentTarget.style.background = hoverBg }}
                  onMouseLeave={e => { if (themeId !== t.id) e.currentTarget.style.background = 'transparent' }}
                >
                  <span className="text-base">{t.emoji}</span>
                  <span>{t.label}</span>
                  {themeId === t.id && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent1)' }} />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
