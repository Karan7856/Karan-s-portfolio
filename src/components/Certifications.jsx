import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import { useTheme } from '../context/ThemeContext'

const certs = [
  {
    title: 'Privacy & Security in Online Social Media',
    description: 'Learned key concepts of data privacy, cybersecurity risks, phishing prevention, and digital footprint management, helping build awareness about protecting personal information in online platforms.',
    issuer: 'NPTEL',
    issuerColor: '#fbbf24',
    badgeColor: '#fbbf24',
    date: "Nov' 25",
    image: '/cert1.jpg',
    icon: '🔒',
    link: 'https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL25CS117S135870172210592817',
  },
  {
    title: 'Data Analytics: From Excel to Power BI',
    description: 'Learned how to analyze and visualize data using Excel and Power BI, building interactive dashboards and deriving insights for data-driven decisions.',
    issuer: 'Coursera',
    issuerColor: '#60a5fa',
    badgeColor: '#60a5fa',
    date: "Sep'25",
    image: '/cert2.jpg',
    icon: '📊',
    link: 'https://www.coursera.org/account/accomplishments/certificate/A27CN2ISS2PU',
  },
  {
    title: 'Data Structures and Algorithms using C++',
    description: 'Built a strong foundation in DSA concepts and problem solving using C++, including arrays, linked lists, stacks, queues, and algorithm optimization.',
    issuer: 'Cipher School',
    issuerColor: '#c084fc',
    badgeColor: '#c084fc',
    date: "Nov' 24",
    image: '/cert3.jpg',
    icon: '🧮',
    link: 'https://cipherschools.com/certificate/preview?id=67641cd1c8147ce0ed612292',
  },
]

function CertCard({ cert, isLight }) {
  const [hovered, setHovered] = useState(false)

  const cardBg = isLight ? '#ffffff' : 'rgba(15,20,40,0.85)'
  const cardBorder = hovered ? `${cert.badgeColor}40` : (isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)')
  const descText = isLight ? '#334155' : '#94a3b8'
  const hoverOverlay = isLight ? 'rgba(255,255,255,0.97)' : 'rgba(10,15,40,0.92)'
  const hoverDescText = isLight ? '#334155' : '#e2e8f0'
  const footerBg = isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)'
  const footerBorder = isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)'
  const footerText = hovered ? cert.badgeColor : (isLight ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.25)')
  const dividerColor = isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)'
  const dateBg = isLight ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.7)'
  const imgFallbackBg = isLight
    ? 'linear-gradient(135deg, rgba(241,245,249,0.95), rgba(226,232,240,0.95))'
    : 'linear-gradient(135deg, rgba(30,35,70,0.95), rgba(15,20,50,0.95))'

  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px ${cert.badgeColor}40`
          : '0 4px 24px rgba(0,0,0,0.08)',
        transition: 'box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div className="relative w-full overflow-hidden" style={{ height: '340px' }}>
        <div className="absolute inset-0 flex items-center justify-center text-5xl"
          style={{ background: imgFallbackBg }}>
          {cert.icon}
        </div>
        <img src={cert.image} alt={cert.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          onError={e => { e.target.style.display = 'none' }} />

        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold z-10"
          style={{ background: cert.badgeColor, color: '#0a0f1e' }}>
          {cert.issuer}
        </div>
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-xs font-semibold z-10"
          style={{ background: dateBg, color: '#e2e8f0', backdropFilter: 'blur(4px)' }}>
          {cert.date}
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-5 z-20"
              style={{ background: hoverOverlay, backdropFilter: 'blur(4px)' }}>
              <p className="text-sm text-center leading-relaxed" style={{ color: hoverDescText }}>{cert.description}</p>
              <a href={cert.link} target="_blank" rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg text-xs font-bold"
                style={{ background: cert.badgeColor, color: '#0a0f1e' }}
                onClick={e => e.stopPropagation()}>
                View Certificate →
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 gap-4" style={{ padding: '32px' }}>
        <h3 style={{ color: cert.badgeColor, fontSize: '18px', fontWeight: 700, lineHeight: 1.3 }}>
          {cert.title}
        </h3>
        <p style={{ fontSize: '14px', color: descText, lineHeight: 1.7 }} className="line-clamp-3 flex-1">
          {cert.description}
        </p>
        <div className="flex items-center justify-between pt-3 text-xs"
          style={{ borderTop: `1px solid ${dividerColor}` }}>
          <span className="font-semibold" style={{ color: cert.issuerColor }}>{cert.issuer}</span>
          <span style={{ color: cert.badgeColor }}>{cert.date}</span>
        </div>
        <a href={cert.link} target="_blank" rel="noopener noreferrer"
          className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg self-start transition-all duration-200"
          style={{ background: cert.badgeColor + '18', color: cert.badgeColor, border: `1px solid ${cert.badgeColor}35` }}
          onMouseEnter={e => { e.currentTarget.style.background = cert.badgeColor + '30' }}
          onMouseLeave={e => { e.currentTarget.style.background = cert.badgeColor + '18' }}
          onClick={e => e.stopPropagation()}>
          View Certificate →
        </a>
      </div>

      <div className="text-center text-xs py-2 transition-colors duration-300"
        style={{
          background: footerBg,
          borderTop: `1px solid ${footerBorder}`,
          color: footerText,
        }}>
        Hover to view details
      </div>
    </div>
  )
}

export default function Certifications() {
  const { themeId } = useTheme()
  const isLight = themeId === 'light'

  return (
    <section id="certifications" className="section">
      <div className="max-w-6xl mx-auto">

        <ScrollReveal className="text-center mb-14">
          <h2 className="text-5xl font-bold mb-4">
            <span style={{ background: 'linear-gradient(90deg,#818cf8,#c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Certifications
            </span>
          </h2>
          <div className="mx-auto mb-4 h-0.5 w-16 rounded-full" style={{ background: 'linear-gradient(90deg,#818cf8,#c084fc)' }} />
          <p style={{ color: isLight ? '#475569' : '#94a3b8' }} className="text-base max-w-xl mx-auto">
            Professional credentials that validate my technical expertise and continuous learning journey.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <ScrollReveal key={cert.title} delay={i * 0.12}>
              <CertCard cert={cert} isLight={isLight} />
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
