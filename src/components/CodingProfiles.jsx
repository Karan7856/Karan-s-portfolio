import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { FiExternalLink, FiCode, FiZap } from 'react-icons/fi'
import { SiLeetcode, SiGeeksforgeeks, SiHackerrank } from 'react-icons/si'

const profiles = [
  { name: 'LeetCode', Icon: SiLeetcode, color: '#FFA116', glow: 'rgba(255,161,22,0.18)', link: 'https://leetcode.com/u/KARAN_RAJ78/', handle: 'KARAN_RAJ78', desc: 'Algorithmic challenges and data structures', badge: 'DSA', stat: '100+', statLabel: 'problems' },
  { name: 'GeeksforGeeks', Icon: SiGeeksforgeeks, color: '#2F8D46', glow: 'rgba(47,141,70,0.18)', link: 'https://www.geeksforgeeks.org/profile/kr89332kf', handle: 'kr89332kf', desc: 'CS fundamentals and coding practice', badge: 'CS', stat: '100+', statLabel: 'problems' },
  { name: 'HackerRank', Icon: SiHackerrank, color: '#00EA64', glow: 'rgba(0,234,100,0.18)', link: 'https://www.hackerrank.com/profile/kr893781', handle: 'kr893781', desc: 'Skill badges and certifications', badge: 'Badges', stat: '5 Star', statLabel: 'rating' },
]

function useCounter(target, inView) {
  const [count, setCount] = useState(0)
  const raf = useRef(null)
  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * target))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [inView, target])
  return count
}

export default function CodingProfiles() {
  const [ref, inView] = useInView(0.1)
  const [hovered, setHovered] = useState(null)
  const total = useCounter(300, inView)

  return (
    <section id="coding" className="section" style={{ background: 'rgba(255,255,255,0.012)' }}>
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-10">
          <span className="tag mb-4 inline-block">Coding</span>
          <h2 className="text-3xl md:text-4xl font-black text-white">Where I practice</h2>
          <p className="text-slate-500 mt-3 text-sm">Strengthening problem-solving skills across top coding platforms.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.12 }}
          className="relative rounded-2xl p-6 mb-8 overflow-hidden flex items-center gap-6"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.08) 100%)', border: '1px solid rgba(99,102,241,0.22)' }}>
          <motion.div className="absolute -right-16 -top-16 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
          <div className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', boxShadow: '0 4px 24px rgba(99,102,241,0.45)' }}>
            <FiZap size={22} className="text-white" />
          </div>
          <div className="relative z-10 flex-1">
            <div className="flex items-baseline gap-1 flex-wrap">
              <span className="text-5xl font-black g-text leading-none">{total}</span>
              <span className="text-3xl font-black text-indigo-400">+</span>
              <span className="text-xl font-bold text-white ml-2">Problems Solved</span>
            </div>
            <p className="text-slate-500 text-xs mt-1.5 flex items-center gap-1.5">
              <FiCode size={11} /> across LeetCode, GeeksforGeeks and HackerRank
            </p>
          </div>
          <div className="relative z-10 hidden sm:flex flex-col gap-2 flex-shrink-0">
            {profiles.map((p, i) => (
              <motion.div key={p.name} className="flex items-center gap-2"
                initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.08 }}>
                <motion.div className="w-2 h-2 rounded-full" style={{ background: p.color }}
                  animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }} />
                <span className="text-xs text-slate-500 font-medium">{p.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {profiles.map((p, i) => {
            const isHovered = hovered === p.name
            return (
              <motion.a key={p.name} href={p.link} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -6 }}
                onHoverStart={() => setHovered(p.name)} onHoverEnd={() => setHovered(null)}
                className="group relative rounded-2xl p-5 flex flex-col gap-4 overflow-hidden cursor-pointer transition-all duration-300"
                style={{ background: isHovered ? p.glow : 'rgba(255,255,255,0.03)', border: '1px solid ' + (isHovered ? p.color + '40' : 'rgba(255,255,255,0.08)'), boxShadow: isHovered ? ('0 8px 32px ' + p.glow) : 'none' }}>
                <motion.div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                  style={{ background: 'linear-gradient(90deg,' + p.color + ',transparent)', originX: 0 }}
                  initial={{ scaleX: 0 }} animate={{ scaleX: isHovered ? 1 : 0 }} transition={{ duration: 0.3 }} />
                <div className="flex items-start justify-between">
                  <motion.div animate={isHovered ? { rotate: [0, -8, 8, 0], scale: 1.15 } : { rotate: 0, scale: 1 }} transition={{ duration: 0.4 }} style={{ color: p.color }}>
                    <p.Icon size={34} />
                  </motion.div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: p.color + '15', color: p.color, border: '1px solid ' + p.color + '30' }}>{p.badge}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white mb-1">{p.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    <span className="text-lg font-black" style={{ color: p.color }}>{p.stat}</span>
                    <span className="text-xs text-slate-600 ml-1">{p.statLabel}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold transition-colors duration-200" style={{ color: isHovered ? p.color : '#475569' }}>
                    <span className="font-mono">@{p.handle}</span>
                    <FiExternalLink size={11} />
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}


