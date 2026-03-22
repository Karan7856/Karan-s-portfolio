import { motion } from 'framer-motion'
import { FiCode, FiAward } from 'react-icons/fi'
import ScrollReveal from './ScrollReveal'
import { useTheme } from '../context/ThemeContext'

const achievements = [
  {
    icon: <FiCode size={20} />,
    color: '#818cf8',
    label: 'DSA / Problem Solving',
    title: '300+ Problems Solved',
    points: [
      'Solved 300+ Data Structures & Algorithms problems across LeetCode and GeeksforGeeks',
      'Strengthened problem-solving skills with focus on time and space complexity optimization',
    ],
  },
  {
    icon: <FiAward size={20} />,
    color: '#fb923c',
    label: 'Hackathon',
    title: 'Binary Blitz Web Hackathon',
    points: [
      'Participated in Binary Blitz Web Hackathon, gaining hands-on experience in web security',
      'Tackled real-time problem solving challenges under competitive conditions',
    ],
  },
]

export default function Achievements() {
  const { themeId } = useTheme()
  const isLight = themeId === 'light'

  const bodyText = isLight ? '#475569' : '#94a3b8'
  const cardBg = isLight ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.025)'
  const cardBorder = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)'
  const titleColor = isLight ? '#1e293b' : '#ffffff'
  const bulletColor = isLight ? '#64748b' : '#64748b'

  return (
    <section id="achievements" className="section">
      <div className="max-w-5xl mx-auto">

        <ScrollReveal>
          <span className="tag mb-4 inline-block">Achievements</span>
          <h2 className="section-title">What I've <span className="g-text">accomplished</span></h2>
          <div className="mt-3 mb-14 h-px w-16 rounded-full"
            style={{ background: 'linear-gradient(90deg,#6366f1,#a855f7,transparent)' }} />
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {achievements.map((a, i) => (
            <ScrollReveal key={a.title} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -4 }}
                className="p-7 rounded-2xl h-full transition-all duration-300"
                style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = a.color + '40'
                  e.currentTarget.style.boxShadow = `0 8px 32px ${a.color}18`
                  e.currentTarget.style.background = isLight ? '#ffffff' : `${a.color}08`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = cardBorder
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.background = cardBg
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: a.color + '15', color: a.color, border: `1px solid ${a.color}25` }}>
                    {a.icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: a.color }}>{a.label}</span>
                    <h3 className="text-base font-bold leading-tight" style={{ color: titleColor }}>{a.title}</h3>
                  </div>
                </div>

                {/* Bullet points */}
                <ul className="space-y-2">
                  {a.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: bodyText }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: a.color }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
