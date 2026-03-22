import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Matrix Rain ──────────────────────────────────────────────────────────────
function MatrixRain({ active }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const cols = Math.floor(canvas.width / 16)
    const drops = Array(cols).fill(1)
    const chars = 'KARANRAJ01\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3\u30B5\u30B7\u30B9\u30BB\u30BD\u30BF\u30C1\u30C4\u30C6\u30C8\u30CA\u30CB\u30CC\u30CD\u30CE'

    const draw = () => {
      ctx.fillStyle = 'rgba(8,8,16,0.06)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = '13px monospace'
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const brightness = Math.random()
        ctx.fillStyle = brightness > 0.95
          ? '#ffffff'
          : brightness > 0.7
          ? '#a5b4fc'
          : '#6366f1'
        ctx.fillText(char, i * 16, y * 16)
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
    }

    animRef.current = setInterval(draw, 45)
    return () => {
      clearInterval(animRef.current)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [active])

  if (!active) return null
  return (
    <canvas ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[998]"
      style={{ opacity: 0.55 }} />
  )
}

// ── Particle Burst ────────────────────────────────────────────────────────────
function ParticleBurst({ bursts }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[999]">
      {bursts.map(b => (
        b.particles.map((p, i) => (
          <motion.div key={b.id + '-' + i}
            className="absolute rounded-full"
            style={{ left: b.x, top: b.y, width: p.size, height: p.size, background: p.color }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: p.vx * 120, y: p.vy * 120, opacity: 0, scale: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        ))
      ))}
    </div>
  )
}

// ── Aurora Wave ───────────────────────────────────────────────────────────────
function AuroraWave({ active }) {
  if (!active) return null
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[997]"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.6, 0] }}
      transition={{ duration: 2.5, ease: 'easeInOut' }}
      style={{
        background: 'radial-gradient(ellipse 120% 60% at 50% 50%, rgba(99,102,241,0.25) 0%, rgba(168,85,247,0.2) 30%, rgba(236,72,153,0.15) 60%, transparent 80%)',
      }}
    />
  )
}

// ── Hint Overlay ──────────────────────────────────────────────────────────────
const HINTS = [
  { key: 'G', label: 'Matrix Rain', color: '#6366f1', desc: 'Toggle matrix effect' },
  { key: 'P', label: 'Particle Burst', color: '#a855f7', desc: 'Click anywhere to burst' },
  { key: 'T', label: 'Aurora Wave', color: '#ec4899', desc: 'Trigger color wave' },
  { key: 'H', label: 'This Menu', color: '#34d399', desc: 'Show/hide shortcuts' },
  { key: 'ESC', label: 'Clear All', color: '#f87171', desc: 'Reset all effects' },
]

function HintOverlay({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-[1000] rounded-2xl p-5 w-72"
          style={{
            background: 'rgba(8,8,16,0.92)',
            border: '1px solid rgba(99,102,241,0.3)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-black text-white uppercase tracking-widest">Keyboard Effects</span>
          </div>
          <div className="space-y-2">
            {HINTS.map(h => (
              <div key={h.key} className="flex items-center gap-3">
                <kbd className="w-10 h-7 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0"
                  style={{ background: h.color + '18', color: h.color, border: '1px solid ' + h.color + '35' }}>
                  {h.key}
                </kbd>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-white">{h.label}</span>
                  <span className="text-[10px] text-slate-600 ml-1.5">{h.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-700 mt-4 text-center">Press H to toggle this panel</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Click Ripple ──────────────────────────────────────────────────────────────
function ClickRipples({ ripples }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[996]">
      {ripples.map(r => (
        <motion.div key={r.id}
          className="absolute rounded-full border border-indigo-400/40"
          style={{ left: r.x - 10, top: r.y - 10, width: 20, height: 20 }}
          animate={{ width: 120, height: 120, left: r.x - 60, top: r.y - 60, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

// ── Floating Key Toast ────────────────────────────────────────────────────────
function KeyToast({ toast }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[1001] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"
          style={{
            background: 'rgba(8,8,16,0.9)',
            border: '1px solid ' + toast.color + '40',
            color: toast.color,
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <kbd className="px-1.5 py-0.5 rounded text-[10px]"
            style={{ background: toast.color + '20', border: '1px solid ' + toast.color + '30' }}>
            {toast.key}
          </kbd>
          {toast.label}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#10b981', '#38bdf8', '#f472b6']

let toastTimer = null
let rippleTimer = null

export default function GlobalEffects() {
  const [matrix, setMatrix] = useState(false)
  const [aurora, setAurora] = useState(false)
  const [hint, setHint] = useState(false)
  const [burstMode, setBurstMode] = useState(false)
  const [bursts, setBursts] = useState([])
  const [ripples, setRipples] = useState([])
  const [toast, setToast] = useState(null)
  const burstRef = useRef(false)

  const showToast = useCallback((key, label, color) => {
    clearTimeout(toastTimer)
    setToast({ id: Date.now(), key, label, color })
    toastTimer = setTimeout(() => setToast(null), 1800)
  }, [])

  const spawnBurst = useCallback((x, y) => {
    const particles = Array.from({ length: 20 }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 0.8 + 0.3
      return {
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 6 + 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }
    })
    const id = Date.now() + Math.random()
    setBursts(prev => [...prev.slice(-8), { id, x, y, particles }])
    setTimeout(() => setBursts(prev => prev.filter(b => b.id !== id)), 1400)
  }, [])

  useEffect(() => {
    burstRef.current = burstMode
  }, [burstMode])

  useEffect(() => {
    const onClick = (e) => {
      const id = Date.now() + Math.random()
      setRipples(prev => [...prev.slice(-5), { id, x: e.clientX, y: e.clientY }])
      clearTimeout(rippleTimer)
      rippleTimer = setTimeout(() => setRipples([]), 1000)

      if (burstRef.current) spawnBurst(e.clientX, e.clientY)
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [spawnBurst])

  useEffect(() => {
    const onKey = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return

      switch (e.key.toLowerCase()) {
        case 'g':
          setMatrix(m => {
            const next = !m
            showToast('G', next ? 'Matrix Rain ON' : 'Matrix Rain OFF', '#6366f1')
            return next
          })
          break
        case 'p':
          setBurstMode(m => {
            const next = !m
            showToast('P', next ? 'Burst Mode ON \u2014 click anywhere!' : 'Burst Mode OFF', '#a855f7')
            return next
          })
          break
        case 't':
          setAurora(true)
          showToast('T', 'Aurora Wave!', '#ec4899')
          setTimeout(() => setAurora(false), 2600)
          break
        case 'h':
          setHint(h => !h)
          showToast('H', 'Shortcuts', '#34d399')
          break
        case 'escape':
          setMatrix(false)
          setBurstMode(false)
          setAurora(false)
          setHint(false)
          setBursts([])
          showToast('ESC', 'All effects cleared', '#f87171')
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showToast])

  return (
    <>
      <MatrixRain active={matrix} />
      <AuroraWave active={aurora} />
      <ParticleBurst bursts={bursts} />
      <ClickRipples ripples={ripples} />
      <HintOverlay visible={hint} />
      <KeyToast toast={toast} />

      <motion.button
        onClick={() => setHint(h => !h)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-[1000] w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black"
        style={{
          background: hint ? 'linear-gradient(135deg,#6366f1,#a855f7)' : 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(99,102,241,0.3)',
          color: hint ? 'white' : '#6366f1',
          backdropFilter: 'blur(12px)',
          boxShadow: hint ? '0 4px 20px rgba(99,102,241,0.4)' : 'none',
        }}
        title="Keyboard shortcuts (H)"
      >
        &#9000;
      </motion.button>

      <AnimatePresence>
        {burstMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed top-20 right-6 z-[1000] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2"
            style={{
              background: 'rgba(168,85,247,0.15)',
              border: '1px solid rgba(168,85,247,0.35)',
              color: '#c084fc',
              backdropFilter: 'blur(12px)',
            }}
          >
            <motion.div className="w-2 h-2 rounded-full bg-purple-400"
              animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
            Burst mode \u2014 click anywhere
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
