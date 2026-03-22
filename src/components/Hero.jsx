import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight, FiCode } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

const ROLES = ['Software Developer', 'Data Science Enthusiast', 'Problem Solver']

function useTypewriter(words, speed = 70, pause = 2200) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const word = words[wordIdx % words.length]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, display.length + 1))
        if (display.length + 1 === word.length) setTimeout(() => setDeleting(true), pause)
      } else {
        setDisplay(word.slice(0, display.length - 1))
        if (display.length - 1 === 0) { setDeleting(false); setWordIdx(i => i + 1) }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [display, deleting, wordIdx, words, speed, pause])
  return display
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

function Particles() {
  const particles = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 6,
    duration: Math.random() * 10 + 8,
    color: i % 3 === 0
      ? `rgba(99,102,241,${(Math.random() * 0.3 + 0.15).toFixed(2)})`
      : i % 3 === 1
      ? `rgba(168,85,247,${(Math.random() * 0.25 + 0.1).toFixed(2)})`
      : `rgba(236,72,153,${(Math.random() * 0.2 + 0.08).toFixed(2)})`,
  }))
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color }}
          animate={{ y: [-18, 18, -18], x: [-6, 6, -6], opacity: [0.1, 0.7, 0.1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  return <motion.div className="scroll-progress" style={{ scaleX }} />
}

export default function Hero() {
  const role = useTypewriter(ROLES)
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const { themeId } = useTheme()
  const isLight = themeId === 'light'

  const bioColor = isLight ? '#475569' : '#94a3b8'
  const findMeColor = isLight ? '#94a3b8' : '#334155'
  const dividerColor = isLight ? '#cbd5e1' : '#1e293b'
  const socialDefaultColor = isLight ? '#64748b' : '#64748b'
  const socialDefaultBg = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.04)'
  const socialDefaultBorder = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.09)'
  const roleTextColor = isLight ? '#475569' : '#cbd5e1'
  const scrollBorder = isLight ? '#cbd5e1' : '#1e293b'
  const scrollText = isLight ? '#94a3b8' : '#334155'

  const mx = useMotionValue(-600)
  const my = useMotionValue(-600)
  const sx = useSpring(mx, { stiffness: 55, damping: 18 })
  const sy = useSpring(my, { stiffness: 55, damping: 18 })

  useEffect(() => {
    const fn = (e) => { mx.set(e.clientX); my.set(e.clientY) }
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [mx, my])

  return (
    <>
      <ScrollProgress />
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

        {/* Cursor glow */}
        <motion.div className="cursor-glow" style={{ left: sx, top: sy }} />

        {/* Deep BG */}
        <div className="absolute inset-0" style={{ background: 'var(--bg)' }} />

        {/* Layered radial gradients */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 8% 35%, rgba(99,102,241,0.2) 0%, transparent 55%)',
            'radial-gradient(ellipse 55% 45% at 92% 75%, rgba(168,85,247,0.15) 0%, transparent 50%)',
            'radial-gradient(ellipse 40% 35% at 55% 5%, rgba(236,72,153,0.08) 0%, transparent 50%)',
            'radial-gradient(ellipse 30% 30% at 80% 20%, rgba(99,102,241,0.06) 0%, transparent 50%)',
          ].join(',')
        }} />

        {/* Animated orbs */}
        {[
          { w: 650, h: 650, top: '-18%', left: '-14%', color: 'rgba(99,102,241,0.07)', ax: [0, 45, 0], ay: [0, -35, 0], dur: 14 },
          { w: 480, h: 480, bottom: '-5%', right: '-10%', color: 'rgba(168,85,247,0.07)', ax: [0, -35, 0], ay: [0, 28, 0], dur: 11 },
          { w: 280, h: 280, top: '30%', right: '12%', color: 'rgba(236,72,153,0.06)', ax: [0, 22, 0], ay: [0, -40, 0], dur: 9 },
          { w: 180, h: 180, top: '65%', left: '18%', color: 'rgba(99,102,241,0.05)', ax: [0, -18, 0], ay: [0, 22, 0], dur: 10 },
        ].map((o, i) => (
          <motion.div key={i}
            className="absolute rounded-full pointer-events-none"
            style={{ width: o.w, height: o.h, top: o.top, bottom: o.bottom, left: o.left, right: o.right, background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)` }}
            animate={{ x: o.ax, y: o.ay }}
            transition={{ duration: o.dur, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
        ))}

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.022]" style={{
          backgroundImage: 'linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />

        <Particles />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24 w-full">          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-14 lg:gap-20">

            {/* ── Text ── */}
            <div className="flex-1 text-center lg:text-left">

              {/* Status badge */}
              <motion.div {...fade(0)}
                className="inline-flex items-center gap-2.5 mb-7 px-4 py-1.5 rounded-full text-xs font-bold text-green-400 uppercase tracking-widest"
                style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.22)', boxShadow: '0 0 24px rgba(34,197,94,0.1)' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                Open to opportunities
              </motion.div>

              {/* Name */}
              <motion.h1 {...fade(0.07)}
                className="font-black leading-[1] tracking-tight mb-5"
                style={{ fontSize: 'clamp(2.6rem, 6.5vw, 4.8rem)', color: 'var(--text)' }}>
                Karan{' '}
                <span className="g-text neon-text">Raj</span>
              </motion.h1>

              {/* Typewriter role */}
              <motion.div {...fade(0.14)} className="flex items-center gap-3 justify-center lg:justify-start mb-5 h-9">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
                  <FiCode size={13} className="text-indigo-400" />
                </div>
                <span className="text-lg font-semibold tracking-wide" style={{ color: roleTextColor }}>
                  {role}
                  <span className="cursor-blink inline-block w-[2px] h-5 bg-indigo-400 ml-1 align-middle rounded-sm" />
                </span>
              </motion.div>

              {/* Bio */}
              <motion.p {...fade(0.2)}
                className="text-base max-w-md mb-10 leading-relaxed mx-auto lg:mx-0" style={{ color: bioColor }}>
                B.Tech CSE student at LPU with a minor in Data Science, focused on backend development, ML integration, and full-stack applications.
              </motion.p>

              {/* Buttons */}
              <motion.div {...fade(0.26)} className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
                <button onClick={() => go('projects')} className="btn-primary">
                  View Projects <FiArrowRight size={15} />
                </button>
                <a href="/resume.pdf" download="Karan_Raj_Resume.pdf" className="btn-ghost">
                  <FiDownload size={15} /> Resume
                </a>
                <button onClick={() => go('contact')} className="btn-ghost">
                  Contact Me
                </button>
              </motion.div>

              {/* Socials */}
              <motion.div {...fade(0.32)} className="flex items-center gap-3 justify-center lg:justify-start">
                <span className="text-[10px] uppercase tracking-[0.15em] font-bold" style={{ color: findMeColor }}>Find me</span>
                <div className="h-px w-6" style={{ background: dividerColor }} />
                {[
                  { icon: <FiGithub size={17} />, href: 'https://github.com/Karan7856', label: 'GitHub', color: '#e2e8f0' },
                  { icon: <FiLinkedin size={17} />, href: 'https://www.linkedin.com/in/karanr7', label: 'LinkedIn', color: '#60a5fa' },
                  { icon: <FiMail size={17} />, href: 'mailto:kr893781@gmail.com', label: 'Email', color: '#818cf8' },
                ].map(s => (
                  <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ y: -4, scale: 1.18 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 relative pulse-ring"
                    style={{ background: socialDefaultBg, border: `1px solid ${socialDefaultBorder}`, color: socialDefaultColor }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = s.color
                      e.currentTarget.style.borderColor = s.color + '55'
                      e.currentTarget.style.boxShadow = `0 0 22px ${s.color}35`
                      e.currentTarget.style.background = s.color + '12'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = socialDefaultColor
                      e.currentTarget.style.borderColor = socialDefaultBorder
                      e.currentTarget.style.boxShadow = ''
                      e.currentTarget.style.background = socialDefaultBg
                    }}>
                    {s.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* ── Photo ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0"
            >
              <div className="relative w-60 h-60 md:w-72 md:h-72">

                {/* Outer glow blob */}
                <div className="absolute -inset-10 rounded-full blur-3xl opacity-25 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.9) 0%, rgba(168,85,247,0.6) 40%, transparent 70%)' }} />

                {/* Spinning rings */}
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-3 rounded-full"
                  style={{ background: 'conic-gradient(from 0deg, transparent 50%, rgba(99,102,241,0.75) 72%, rgba(168,85,247,0.55) 84%, transparent 100%)' }} />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-5 rounded-full"
                  style={{ background: 'conic-gradient(from 120deg, transparent 60%, rgba(236,72,153,0.45) 78%, transparent 100%)' }} />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-7 rounded-full"
                  style={{ background: 'conic-gradient(from 240deg, transparent 68%, rgba(99,102,241,0.22) 84%, transparent 100%)' }} />

                {/* Gradient border ring */}
                <div className="absolute inset-0 rounded-full p-[3px] spin-border">
                  <div className="w-full h-full rounded-full" style={{ background: 'var(--bg)' }} />
                </div>

                {/* Photo */}
                <div className="absolute inset-[3px] rounded-full overflow-hidden">
                  <img src="/karan-photo.jpeg" alt="Karan Raj"
                    className="w-full h-full object-cover object-top" />
                </div>


              </div>
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => go('about')}>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
              className="w-5 h-9 rounded-full border-2 flex items-start justify-center pt-1.5"
              style={{ borderColor: scrollBorder, boxShadow: '0 0 14px rgba(99,102,241,0.25)' }}>
              <div className="w-1 h-2 rounded-full bg-indigo-400" />
            </motion.div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold" style={{ color: scrollText }}>scroll</span>
          </motion.div>
        </div>
      </section>
    </>
  )
}
