import { createContext, useContext, useState, useEffect } from 'react'

export const themes = [
  {
    id: 'dark',
    label: 'Dark',
    emoji: '🌑',
    vars: {
      '--bg':        '#04040d',
      '--bg2':       '#0a0f1e',
      '--surface':   'rgba(255,255,255,0.025)',
      '--border':    'rgba(255,255,255,0.07)',
      '--accent1':   '#6366f1',
      '--accent2':   '#a855f7',
      '--accent3':   '#ec4899',
      '--text':      '#cbd5e1',
      '--text-muted':'#64748b',
      '--glow':      'rgba(99,102,241,0.35)',
    },
  },
  {
    id: 'light',
    label: 'Light',
    emoji: '☀️',
    vars: {
      '--bg':        '#f8fafc',
      '--bg2':       '#f1f5f9',
      '--surface':   'rgba(0,0,0,0.04)',
      '--border':    'rgba(0,0,0,0.08)',
      '--accent1':   '#6366f1',
      '--accent2':   '#a855f7',
      '--accent3':   '#ec4899',
      '--text':      '#1e293b',
      '--text-muted':'#64748b',
      '--glow':      'rgba(99,102,241,0.25)',
    },
  },
  {
    id: 'cyberpunk',
    label: 'Cyberpunk',
    emoji: '⚡',
    vars: {
      '--bg':        '#050510',
      '--bg2':       '#0a0520',
      '--surface':   'rgba(0,255,200,0.03)',
      '--border':    'rgba(0,255,200,0.1)',
      '--accent1':   '#00ffe0',
      '--accent2':   '#ff00aa',
      '--accent3':   '#ffe600',
      '--text':      '#e0fff8',
      '--text-muted':'#4a9e8a',
      '--glow':      'rgba(0,255,200,0.35)',
    },
  },
  {
    id: 'ocean',
    label: 'Ocean',
    emoji: '🌊',
    vars: {
      '--bg':        '#020d1a',
      '--bg2':       '#041525',
      '--surface':   'rgba(56,189,248,0.04)',
      '--border':    'rgba(56,189,248,0.1)',
      '--accent1':   '#38bdf8',
      '--accent2':   '#0ea5e9',
      '--accent3':   '#06b6d4',
      '--text':      '#bae6fd',
      '--text-muted':'#4a7a9b',
      '--glow':      'rgba(56,189,248,0.35)',
    },
  },
  {
    id: 'sunset',
    label: 'Sunset',
    emoji: '🌅',
    vars: {
      '--bg':        '#0d0500',
      '--bg2':       '#1a0a00',
      '--surface':   'rgba(251,146,60,0.04)',
      '--border':    'rgba(251,146,60,0.1)',
      '--accent1':   '#fb923c',
      '--accent2':   '#f43f5e',
      '--accent3':   '#fbbf24',
      '--text':      '#fed7aa',
      '--text-muted':'#92400e',
      '--glow':      'rgba(251,146,60,0.35)',
    },
  },
]

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => localStorage.getItem('portfolio-theme') || 'dark')

  useEffect(() => {
    const theme = themes.find(t => t.id === themeId) || themes[0]
    const root = document.documentElement
    Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v))
    // set data-theme so CSS overrides can target light mode
    root.setAttribute('data-theme', themeId)
    localStorage.setItem('portfolio-theme', themeId)
  }, [themeId])

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
