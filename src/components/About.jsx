import { motion } from 'framer-motion'
import { FiCode, FiDatabase, FiServer, FiTarget } from 'react-icons/fi'
import ScrollReveal from './ScrollReveal'
import { useTheme } from '../context/ThemeContext'

const areas = [
  { icon: <FiServer size={18} />, label: 'Backend Dev',         color: '#818cf8' },
  { icon: <FiDatabase size={18} />, label: 'Data Science',      color: '#c084fc' },
  { icon: <FiCode size={18} />, label: 'Full-Stack Apps',       color: '#34d399' },
  { icon: <FiTarget size={18} />, label: 'DSA & Problem Solving', color: '#fb923c' },
]

export default function About() {
  const { themeId } = useTheme()
  const isLight = themeId === 'light'

  // Single consistent text color per theme — no mixing
  const bodyText  = isLight ? '#475569' : '#94a3b8'
  const accentText = '#818cf8'   // indigo — used for names/highlights

  return (
    <section id="about" className="section">
      <div className="max-w-5xl mx-auto">

        <ScrollReveal>
          <span className="tag mb-4 inline-block">About</span>
          <h2 className="section-title">Who I <span className="g-text">am</span></h2>
          <div className="mt-3 mb-14 h-px w-16 rounded-full"
            style={{ background: 'linear-gradient(90deg,#6366f1,#a855f7,transparent)' }} />
        </ScrollReveal>

        <div className="space-y-5">
          <ScrollReveal delay={0.1}>
            <p className="text-base leading-relaxed" style={{ color: bodyText }}>
              I'm <span style={{ color: accentText, fontWeight: 600 }}>Karan Raj</span>, a B.Tech Computer Science
              Engineering student at{' '}
              <span style={{ color: accentText, fontWeight: 500 }}>Lovely Professional University</span> with a minor
              in Data Science. I have a strong interest in building data-driven applications and developing efficient
              backend systems.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="text-base leading-relaxed" style={{ color: bodyText }}>
              I have hands-on experience working with{' '}
              <span style={{ color: accentText, fontWeight: 500 }}>Python, machine learning, and data analytics</span>,
              demonstrated through projects like a Loan Prediction System and a Bank Loan Analysis Dashboard. My work
              involves data preprocessing, exploratory data analysis, model building, and deriving actionable insights
              using tools like{' '}
              <span style={{ color: accentText, fontWeight: 500 }}>Pandas, NumPy, Scikit-learn, and Power BI</span>.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-base leading-relaxed" style={{ color: bodyText }}>
              I'm also proficient in{' '}
              <span style={{ color: accentText, fontWeight: 500 }}>C++, JavaScript</span>, and core computer science
              fundamentals, and I actively practice{' '}
              <span style={{ color: accentText, fontWeight: 500 }}>Data Structures and Algorithms</span> to strengthen
              my problem-solving and optimization skills.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p className="text-base leading-relaxed" style={{ color: bodyText }}>
              With a solid foundation in both software development and data analysis, I aim to start my career as a{' '}
              <span style={{ color: accentText, fontWeight: 600 }}>Software Development Engineer</span>, where I can
              contribute to building scalable systems while continuing to grow in backend and data-driven development.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="flex flex-wrap gap-2 pt-1">
              {areas.map(a => (
                <motion.span key={a.label} whileHover={{ scale: 1.06, y: -2 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-default"
                  style={{ background: `${a.color}12`, border: `1px solid ${a.color}28`, color: a.color }}>
                  {a.icon} {a.label}
                </motion.span>
              ))}
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  )
}
