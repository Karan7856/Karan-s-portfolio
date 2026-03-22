import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import { useTheme } from '../context/ThemeContext'
import {
  SiCplusplus, SiPython, SiJavascript, SiC,
  SiReact, SiPandas, SiNumpy, SiHtml5, SiCss,
  SiMysql, SiGit, SiGithub, SiGooglesheets, SiScikitlearn, SiFastapi,
} from 'react-icons/si'
import { FaJava, FaFlask } from 'react-icons/fa'
import { TbChartBar, TbTable, TbChartPie, TbBrandPython, TbDatabase } from 'react-icons/tb'

const tabs = [
  { id: 'all',      label: 'All Skills' },
  { id: 'lang',     label: 'Programming Languages' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend',  label: 'Backend' },
  { id: 'data',     label: 'Data & ML' },
  { id: 'database', label: 'Databases' },
  { id: 'tools',    label: 'Tools' },
]

const skills = [
  { name: 'C',            icon: <SiC />,            color: '#94a3b8', category: 'lang'     },
  { name: 'C++',          icon: <SiCplusplus />,    color: '#60a5fa', category: 'lang'     },
  { name: 'Java',         icon: <FaJava />,          color: '#fb923c', category: 'lang'     },
  { name: 'Python',       icon: <SiPython />,        color: '#fbbf24', category: 'lang'     },
  { name: 'JavaScript',   icon: <SiJavascript />,    color: '#fde047', category: 'lang'     },
  { name: 'HTML',         icon: <SiHtml5 />,         color: '#f97316', category: 'frontend' },
  { name: 'CSS',          icon: <SiCss />,           color: '#3b82f6', category: 'frontend' },
  { name: 'React.js',     icon: <SiReact />,         color: '#38bdf8', category: 'frontend' },
  { name: 'FastAPI',      icon: <SiFastapi />,       color: '#34d399', category: 'backend'  },
  { name: 'Pandas',       icon: <SiPandas />,        color: '#c084fc', category: 'data'     },
  { name: 'NumPy',        icon: <SiNumpy />,         color: '#67e8f9', category: 'data'     },
  { name: 'Scikit-learn', icon: <SiScikitlearn />,   color: '#fb923c', category: 'data'     },
  { name: 'Matplotlib',   icon: <TbChartBar />,      color: '#818cf8', category: 'data'     },
  { name: 'SMOTE',        icon: <FaFlask />,         color: '#f472b6', category: 'data'     },
  { name: 'MySQL',        icon: <SiMysql />,         color: '#60a5fa', category: 'database' },
  { name: 'SQLite',       icon: <TbDatabase />,      color: '#a78bfa', category: 'database' },
  { name: 'Excel',        icon: <TbTable />,         color: '#4ade80', category: 'database' },
  { name: 'Google Sheets',icon: <SiGooglesheets />,  color: '#34d399', category: 'database' },
  { name: 'Power BI',     icon: <TbChartPie />,      color: '#fbbf24', category: 'tools'    },
  { name: 'Jupyter',      icon: <TbBrandPython />,   color: '#f97316', category: 'tools'    },
  { name: 'Git',          icon: <SiGit />,           color: '#f87171', category: 'tools'    },
  { name: 'GitHub',       icon: <SiGithub />,        color: '#e2e8f0', category: 'tools'    },
]

const catLabel = {
  lang: 'Programming Language', frontend: 'Frontend', backend: 'Backend',
  data: 'Data & ML', database: 'Database', tools: 'Tool',
}

function SkillCard({ skill, i, isLight }) {
  const cardBg = isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)'
  const cardBorder = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.09)'
  const nameColor = isLight ? '#1e293b' : '#ffffff'
  const subColor = isLight ? '#64748b' : '#94a3b8'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25, delay: i * 0.03 }}
      whileHover={{ y: -4, scale: 1.04 }}
      className="flex items-center gap-3 rounded-xl px-4 py-3 cursor-default transition-all duration-200"
      style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
      onMouseEnter={e => {
        e.currentTarget.style.background = skill.color + '15'
        e.currentTarget.style.borderColor = skill.color + '45'
        e.currentTarget.style.boxShadow = `0 0 20px ${skill.color}20`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = cardBg
        e.currentTarget.style.borderColor = cardBorder
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
        style={{ background: skill.color + '18', color: skill.color }}>
        {skill.icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-base font-semibold truncate" style={{ color: nameColor }}>{skill.name}</span>
        <span className="text-xs" style={{ color: subColor }}>{catLabel[skill.category]}</span>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all')
  const { themeId } = useTheme()
  const isLight = themeId === 'light'
  const filtered = activeTab === 'all' ? skills : skills.filter(s => s.category === activeTab)

  const sectionBg = isLight ? 'rgba(241,245,249,0.8)' : 'rgba(255,255,255,0.012)'
  const subText = isLight ? '#475569' : '#94a3b8'
  const tabInactiveBg = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.06)'
  const tabInactiveColor = isLight ? '#64748b' : '#94a3b8'
  const tabInactiveBorder = isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.1)'

  return (
    <section id="skills" className="section" style={{ background: sectionBg }}>
      <div className="max-w-5xl mx-auto">

        <ScrollReveal className="mb-10">
          <span className="tag mb-4 inline-block">Skills</span>
          <h2 className="section-title">Technical <span className="g-text-cool">Arsenal</span></h2>
          <div className="mt-3 h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg,#38bdf8,#818cf8,transparent)' }} />
          <p className="text-sm mt-3" style={{ color: subText }}>A showcase of technologies I work with on my journey as a developer.</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={activeTab === tab.id ? {
                  background: 'linear-gradient(90deg,#6366f1,#818cf8)',
                  color: '#fff',
                  boxShadow: '0 0 16px rgba(99,102,241,0.4)',
                } : {
                  background: tabInactiveBg,
                  color: tabInactiveColor,
                  border: tabInactiveBorder,
                }}>
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} i={i} isLight={isLight} />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
