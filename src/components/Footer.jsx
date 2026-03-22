import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

const socials = [
  { icon: <FiGithub size={15} />, href: 'https://github.com/Karan7856', label: 'GitHub', color: '#e2e8f0' },
  { icon: <FiLinkedin size={15} />, href: 'https://www.linkedin.com/in/karanr7', label: 'LinkedIn', color: '#60a5fa' },
  { icon: <FiMail size={15} />, href: 'mailto:kr893781@gmail.com', label: 'Email', color: '#818cf8' },
]

export default function Footer() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const { themeId } = useTheme()
  const isLight = themeId === 'light'

  const footerBg = isLight ? '#f1f5f9' : 'transparent'
  const borderColor = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.05)'
  const textColor = isLight ? '#64748b' : '#475569'
  const nameColor = isLight ? '#475569' : '#64748b'
  const btnBg = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.04)'
  const btnBorder = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)'
  const btnDefaultColor = isLight ? '#64748b' : '#475569'

  return (
    <footer className="py-8 px-6" style={{ background: footerBg, borderTop: `1px solid ${borderColor}` }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs flex items-center gap-1.5" style={{ color: textColor }}>
          Built by{' '}
          <span className="font-semibold" style={{ color: nameColor }}>Karan Raj</span> · {new Date().getFullYear()}
        </p>

        <div className="flex items-center gap-2">
          {socials.map(s => (
            <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              aria-label={s.label} whileHover={{ y: -3, scale: 1.15 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{ background: btnBg, border: `1px solid ${btnBorder}`, color: btnDefaultColor }}
              onMouseEnter={e => { e.currentTarget.style.color = s.color; e.currentTarget.style.borderColor = s.color + '35' }}
              onMouseLeave={e => { e.currentTarget.style.color = btnDefaultColor; e.currentTarget.style.borderColor = btnBorder }}>
              {s.icon}
            </motion.a>
          ))}
          <motion.button onClick={() => go('home')} aria-label="Back to top"
            whileHover={{ y: -3, scale: 1.15 }}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ml-1"
            style={{ background: btnBg, border: `1px solid ${btnBorder}`, color: btnDefaultColor }}
            onMouseEnter={e => { e.currentTarget.style.color = '#818cf8' }}
            onMouseLeave={e => { e.currentTarget.style.color = btnDefaultColor }}>
            <FiArrowUp size={13} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
