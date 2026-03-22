import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiSend, FiArrowUpRight, FiCheck, FiMessageSquare } from 'react-icons/fi'
import ScrollReveal from './ScrollReveal'
import { useTheme } from '../context/ThemeContext'

const info = [
  { icon: FiMail, label: 'Email', value: 'kr893781@gmail.com', href: 'mailto:kr893781@gmail.com', color: '#818cf8' },
  { icon: FiPhone, label: 'Phone', value: '+91 7856974105', href: 'tel:+917856974105', color: '#34d399' },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/karanr7', href: 'https://www.linkedin.com/in/karanr7', color: '#60a5fa' },
  { icon: FiGithub, label: 'GitHub', value: 'github.com/Karan7856', href: 'https://github.com/Karan7856', color: '#e2e8f0' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState(null)
  const { themeId } = useTheme()
  const isLight = themeId === 'light'

  const subText = isLight ? '#64748b' : '#64748b'
  const contactCardBg = isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)'
  const contactCardBorder = isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)'
  const contactLabelColor = isLight ? '#64748b' : '#94a3b8'
  const contactValueColor = isLight ? '#334155' : '#cbd5e1'
  const contactValueHover = isLight ? '#1e293b' : '#ffffff'
  const arrowColor = isLight ? '#94a3b8' : '#334155'
  const formBg = isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)'
  const formBorder = isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)'
  const formTitleColor = isLight ? '#1e293b' : '#ffffff'
  const inputBg = (key) => focused === key
    ? (isLight ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.07)')
    : (isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)')
  const inputBorder = (key) => focused === key
    ? 'rgba(99,102,241,0.45)'
    : (isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)')
  const inputTextColor = isLight ? '#1e293b' : '#ffffff'
  const inputPlaceholder = isLight ? '#94a3b8' : '#475569'
  const labelColor = isLight ? '#64748b' : '#64748b'

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 3500)
  }

  return (
    <section id="contact" className="section">
      <div className="max-w-5xl mx-auto">

        <ScrollReveal>
          <span className="tag mb-4 inline-block">Contact</span>
          <h2 className="section-title">Get in <span className="g-text">touch</span></h2>
          <div className="mt-3 h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg,#6366f1,#a855f7,transparent)' }} />
          <p className="mt-3 mb-14 text-sm max-w-sm" style={{ color: subText }}>
            Open to internships, collaborations, and interesting projects.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Left — contact info */}
          <ScrollReveal delay={0.1}>
            <div className="space-y-3">
              {info.map((c) => {
                const Icon = c.icon
                return (
                  <motion.a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="group flex items-center gap-4 p-5 rounded-xl transition-all duration-200"
                    style={{ background: contactCardBg, border: `1px solid ${contactCardBorder}` }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = c.color + '35'
                      e.currentTarget.style.background = c.color + '07'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = contactCardBorder
                      e.currentTarget.style.background = contactCardBg
                    }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: c.color + '14', color: c.color, border: '1px solid ' + c.color + '25' }}>
                      <Icon size={15} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: contactLabelColor }}>{c.label}</p>
                      <p className="text-sm truncate transition-colors" style={{ color: contactValueColor }}>{c.value}</p>
                    </div>
                    <FiArrowUpRight size={13} style={{ color: arrowColor }} className="flex-shrink-0" />
                  </motion.a>
                )
              })}

              <div className="flex items-center gap-2.5 p-4 rounded-xl"
                style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-sm text-green-500 font-semibold">Available for opportunities</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — form */}
          <ScrollReveal delay={0.2}>
            <form onSubmit={submit} className="space-y-4 p-8 rounded-2xl"
              style={{ background: formBg, border: `1px solid ${formBorder}` }}>

              <div className="flex items-center gap-2 mb-5">
                <FiMessageSquare size={14} className="text-indigo-400" />
                <span className="text-sm font-bold" style={{ color: formTitleColor }}>Send a message</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { key: 'name', label: 'Name', type: 'text', placeholder: 'John Doe' },
                  { key: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-[11px] uppercase tracking-wider font-bold mb-1.5" style={{ color: labelColor }}>{f.label}</label>
                    <input type={f.type} required value={form[f.key]} onChange={set(f.key)}
                      placeholder={f.placeholder}
                      onFocus={() => setFocused(f.key)} onBlur={() => setFocused(null)}
                      className="w-full rounded-xl px-4 py-2.5 text-sm transition-all duration-200"
                      style={{
                        background: inputBg(f.key),
                        border: `1px solid ${inputBorder(f.key)}`,
                        outline: 'none',
                        color: inputTextColor,
                      }} />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold mb-1.5" style={{ color: labelColor }}>Message</label>
                <textarea required rows={4} value={form.message} onChange={set('message')}
                  placeholder="Tell me about your project or opportunity..."
                  onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                  className="w-full rounded-xl px-4 py-2.5 text-sm resize-none transition-all duration-200"
                  style={{
                    background: inputBg('message'),
                    border: `1px solid ${inputBorder('message')}`,
                    outline: 'none',
                    color: inputTextColor,
                  }} />
              </div>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="sent"
                    initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg,#10b981,#059669)', boxShadow: '0 4px 20px rgba(16,185,129,0.3)' }}>
                    <FiCheck size={15} /> Message sent!
                  </motion.div>
                ) : (
                  <motion.button key="btn" type="submit"
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(99,102,241,0.5)' }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', boxShadow: '0 4px 20px rgba(99,102,241,0.35)' }}>
                    <FiSend size={14} /> Send Message
                  </motion.button>
                )}
              </AnimatePresence>
            </form>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
