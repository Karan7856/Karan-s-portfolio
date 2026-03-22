import { motion } from 'framer-motion'
import { FiCalendar } from 'react-icons/fi'
import ScrollReveal from './ScrollReveal'
import { useTheme } from '../context/ThemeContext'

const education = [
  {
    school: 'Lovely Professional University',
    degree: 'B.Tech - Computer Science and Engineering',
    location: 'Phagwara, Punjab',
    score: 'CGPA: 7.84',
    period: '2023 - Present',
    icon: '🎓',
    color: '#818cf8',
    current: true,
  },
  {
    school: "St. Dominic Savio's High School",
    degree: 'Intermediate (Class XII)',
    location: 'Patna, Bihar',
    score: '82%',
    period: '2021 - 2022',
    icon: '🏫',
    color: '#c084fc',
    current: false,
  },
  {
    school: 'Don Bosco Academy',
    degree: 'Matriculation (Class X)',
    location: 'Patna, Bihar',
    score: '84.2%',
    period: '2019 - 2020',
    icon: '📚',
    color: '#f472b6',
    current: false,
  },
]

export default function Education() {
  const { themeId } = useTheme()
  const isLight = themeId === 'light'

  const sectionBg = isLight ? 'rgba(241,245,249,0.8)' : 'rgba(255,255,255,0.012)'
  const schoolColor = isLight ? '#1e293b' : '#ffffff'
  const degreeColor = isLight ? '#475569' : '#94a3b8'
  const periodColor = isLight ? '#64748b' : '#64748b'
  const cardBg = isLight ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.025)'
  const cardBorder = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)'

  return (
    <section id="education" className="section" style={{ background: sectionBg }}>
      <div className="max-w-5xl mx-auto">

        <ScrollReveal>
          <span className="tag mb-4 inline-block">Education</span>
          <h2 className="section-title">Academic <span className="g-text-cool">background</span></h2>
          <div className="mt-3 mb-14 h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg,#38bdf8,#818cf8,transparent)' }} />
        </ScrollReveal>

        <div className="space-y-3">
          {education.map((e, i) => (
            <ScrollReveal key={e.school} delay={i * 0.1}>
              <motion.div
                whileHover={{ x: 5 }}
                className="group shine-hover p-7 flex items-center gap-5 transition-all duration-200 rounded-[1.25rem]"
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderRadius: '1.25rem',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease, background 0.3s ease',
                }}
                onMouseEnter={e2 => {
                  e2.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'
                  e2.currentTarget.style.background = isLight ? '#ffffff' : 'rgba(99,102,241,0.05)'
                  e2.currentTarget.style.boxShadow = isLight
                    ? '0 8px 32px rgba(0,0,0,0.08)'
                    : '0 0 0 1px rgba(99,102,241,0.1), 0 20px 60px rgba(0,0,0,0.6)'
                  e2.currentTarget.style.transform = 'translateY(-2px) translateX(5px)'
                }}
                onMouseLeave={e2 => {
                  e2.currentTarget.style.borderColor = cardBorder
                  e2.currentTarget.style.background = cardBg
                  e2.currentTarget.style.boxShadow = 'none'
                  e2.currentTarget.style.transform = 'translateY(0) translateX(0)'
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: e.color + '12', border: '1px solid ' + e.color + '25' }}
                >
                  {e.icon}
                </motion.div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <h3 className="text-base font-bold" style={{ color: schoolColor }}>{e.school}</h3>
                    {e.current && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full"
                        style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)' }}>
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm" style={{ color: degreeColor }}>{e.degree}</p>
                  <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: periodColor }}>
                    📍 {e.location}
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-base font-black" style={{ color: e.color }}>{e.score}</div>
                  <div className="flex items-center gap-1 text-xs mt-0.5 justify-end" style={{ color: periodColor }}>
                    <FiCalendar size={10} /> {e.period}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
