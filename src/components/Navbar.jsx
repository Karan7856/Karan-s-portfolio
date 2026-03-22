import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import ThemeSwitcher from './ThemeSwitcher'
import { useTheme } from '../context/ThemeContext'

const links = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Coding', id: 'coding' },
  { label: 'Achievements', id: 'achievements' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const { themeId } = useTheme()
  const isLight = themeId === 'light'

  const linkColor = (id) => active === id ? '#6366f1' : (isLight ? '#64748b' : '#64748b')
  const linkHoverColor = isLight ? '#1e293b' : '#e2e8f0'
  const mobileMenuBg = isLight ? 'rgba(248,250,252,0.98)' : undefined
  const mobileLinkColor = (id) => active === id ? '#6366f1' : (isLight ? '#475569' : '#64748b')
  const mobileLinkActiveBg = isLight ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.1)'
  const hamburgerColor = isLight ? '#475569' : '#94a3b8'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const found = [...links].reverse().find(l => {
        const el = document.getElementById(l.id)
        return el && el.getBoundingClientRect().top <= 100
      })
      setActive(found?.id ?? '')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false) }

  return (
    <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'nav-glass' : ''}`}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <motion.button onClick={() => go('home')} whileHover={{ scale: 1.04 }}
          className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white"
            style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', boxShadow: '0 2px 12px rgba(99,102,241,0.5)' }}>KR</div>
          <span className="font-bold text-sm tracking-wide" style={{ color: 'var(--text)' }}>Karan Raj</span>
        </motion.button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)}
              className="relative px-3.5 py-1.5 text-sm rounded-lg transition-colors duration-150"
              style={{ color: linkColor(l.id) }}>
              {active === l.id && (
                <motion.span layoutId="nav-active"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative transition-colors" style={{ color: linkColor(l.id) }}
                onMouseEnter={e => { e.currentTarget.style.color = linkHoverColor }}
                onMouseLeave={e => { e.currentTarget.style.color = linkColor(l.id) }}>
                {l.label}
              </span>
            </button>
          ))}
          <motion.button onClick={() => go('contact')} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            className="ml-3 btn-primary !py-1.5 !px-4 !text-xs">
            Hire Me
          </motion.button>
          <div className="ml-2">
            <ThemeSwitcher />
          </div>
        </div>

        {/* Mobile */}
        <button className="md:hidden p-1" style={{ color: hamburgerColor }} onClick={() => setOpen(o => !o)}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={open ? 'x' : 'm'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              {open ? <FiX size={20} /> : <FiMenu size={20} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
            className="md:hidden nav-glass border-t overflow-hidden"
            style={{ borderTopColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)', background: mobileMenuBg }}>
            <div className="max-w-5xl mx-auto px-6 py-3 flex flex-col gap-0.5">
              {links.map(l => (
                <button key={l.id} onClick={() => go(l.id)}
                  className="text-left px-3 py-2.5 text-sm rounded-lg transition-all"
                  style={{
                    color: mobileLinkColor(l.id),
                    background: active === l.id ? mobileLinkActiveBg : 'transparent'
                  }}>
                  {l.label}
                </button>
              ))}
              <div className="pt-2 pb-1 px-1">
                <ThemeSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
