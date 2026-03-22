import { motion } from 'framer-motion'

/**
 * Wraps children in a motion.div that fades + slides up
 * when it enters the viewport. Uses Framer Motion's whileInView
 * so each element triggers independently as you scroll.
 *
 * Props:
 *  delay   – stagger delay in seconds (default 0)
 *  y       – slide distance in px (default 32)
 *  once    – only animate once (default true)
 *  className / style – forwarded to the wrapper
 */
export default function ScrollReveal({
  children,
  delay = 0,
  y = 32,
  once = true,
  className = '',
  style = {},
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
