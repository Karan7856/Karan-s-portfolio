import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "../hooks/useInView"
import { FiGithub, FiArrowUpRight, FiExternalLink } from "react-icons/fi"
import { SiPython, SiPandas, SiNumpy, SiScikitlearn } from "react-icons/si"
import { FaJava } from "react-icons/fa"
import { TbChartPie } from "react-icons/tb"

const projects = [
  { number: "01", title: "Bank Loan Analysis Dashboard", short: "Power BI dashboard surfacing key insights from Lending Club loan data.", description: "Analyzes the Bank Loan dataset from Kaggle. Surfaces funding trends, repayment patterns, and loan risk through interactive Power BI visuals, DAX measures, and KPI metrics.", tags: ["Power BI", "DAX", "Data Visualization", "Data Modeling"], stack: [{ icon: "chart", color: "#fbbf24", label: "Power BI" }], accent: "#fbbf24", github: "https://github.com/Karan7856/BANK-LOAN-ANALYSIS-DASHBOARD", live: null, image: "/project1.jpg", icon: "chart" },
  { number: "02", title: "AI-Powered Loan Approval Prediction System", short: "ML system predicting loan approval using classification algorithms.", description: "Predicts whether a loan application should be approved based on financial and applicant data. Uses classification algorithms with feature engineering and model evaluation.", tags: ["Python", "Pandas", "NumPy", "Scikit-learn", "ML"], stack: [{ icon: "py", color: "#fbbf24", label: "Python" }, { icon: "pd", color: "#c084fc", label: "Pandas" }, { icon: "np", color: "#67e8f9", label: "NumPy" }, { icon: "sk", color: "#fb923c", label: "Sklearn" }], accent: "#818cf8", github: "https://github.com/Karan7856/Loan-Approval-System", live: "https://loan-approval-system-opal.vercel.app/", image: "/project2.jpg", icon: "robot" },
  { number: "03", title: "QuizBee Application", short: "Desktop quiz platform with login, 30 MCQs, and negative marking.", description: "A desktop quiz platform where users log in and attempt 30 MCQ questions. Correct answers earn 1 mark; wrong answers deduct 0.25 marks. No penalty for unanswered questions.", tags: ["Java", "Java Swing", "AWT", "OOP", "GUI"], stack: [{ icon: "java", color: "#fb923c", label: "Java" }], accent: "#fb923c", github: "https://github.com/Karan7856/Quiz-Application1", live: null, image: "/project3.jpg", icon: "quiz" },
]

function StackIcon({ s }) {
  if (s.icon === "chart") return <TbChartPie style={{ color: s.color, fontSize: "20px" }} />
  if (s.icon === "py") return <SiPython style={{ color: s.color, fontSize: "20px" }} />
  if (s.icon === "pd") return <SiPandas style={{ color: s.color, fontSize: "20px" }} />
  if (s.icon === "np") return <SiNumpy style={{ color: s.color, fontSize: "20px" }} />
  if (s.icon === "sk") return <SiScikitlearn style={{ color: s.color, fontSize: "20px" }} />
  if (s.icon === "java") return <FaJava style={{ color: s.color, fontSize: "20px" }} />
  return null
}

function ProjectCard({ p, i, inView }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.12 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="shimmer-card"
      style={{ display: "flex", flexDirection: "column", borderRadius: "24px", overflow: "hidden", background: "rgba(15,20,40,0.85)", border: "1px solid " + (hovered ? p.accent + "50" : "rgba(255,255,255,0.1)"), boxShadow: hovered ? "0 24px 64px rgba(0,0,0,0.5)" : "0 4px 24px rgba(0,0,0,0.3)", transition: "border 0.3s, box-shadow 0.3s" }}
    >
      <div style={{ position: "relative", width: "100%", height: "260px", overflow: "hidden", flexShrink: 0, background: "linear-gradient(135deg,#0f1428,#0a0f32)" }}>
        <img src={p.image} alt={p.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1, transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.5s ease" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg," + p.accent + ",transparent)", zIndex: 3 }} />
        <div style={{ position: "absolute", top: "14px", left: "14px", zIndex: 4, fontSize: "13px", fontWeight: 800, padding: "4px 12px", borderRadius: "999px", background: p.accent, color: "#0a0f1e" }}>{p.number}</div>
        <div style={{ position: "absolute", top: "14px", right: "14px", zIndex: 4, display: "flex", gap: "6px" }}>
          <a href={p.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700, padding: "6px 14px", borderRadius: "10px", textDecoration: "none", background: "rgba(0,0,0,0.75)", color: p.accent, border: "1px solid " + p.accent + "50" }}>
            <FiGithub size={13} /> Code <FiArrowUpRight size={11} />
          </a>
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700, padding: "6px 14px", borderRadius: "10px", textDecoration: "none", background: p.accent, color: "#0a0f1e" }}>
              <FiExternalLink size={13} /> Live
            </a>
          )}
        </div>
        <AnimatePresence>
          {hovered && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} style={{ position: "absolute", inset: 0, zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", padding: "24px", background: "rgba(10,15,40,0.93)" }}>
              <p style={{ fontSize: "14px", color: "#e2e8f0", textAlign: "center", lineHeight: 1.7 }}>{p.description}</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <a href={p.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ padding: "8px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, background: "rgba(255,255,255,0.1)", color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                  <FiGithub size={14} /> GitHub
                </a>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ padding: "8px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, background: p.accent, color: "#0a0f1e", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                    <FiExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "28px 32px", gap: "16px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: 700, color: p.accent, lineHeight: 1.3 }}>{p.title}</h3>
        <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.7, flex: 1 }}>{p.short}</p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {p.stack.map(s => <StackIcon key={s.label} s={s} />)}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {p.tags.map(t => (<span key={t} style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "999px", fontWeight: 500, color: "#64748b", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>{t}</span>))}
        </div>
      </div>
      <div style={{ textAlign: "center", fontSize: "12px", padding: "10px", background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(255,255,255,0.06)", color: hovered ? p.accent : "rgba(255,255,255,0.25)", transition: "color 0.3s" }}>Hover to view details</div>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView(0.06)
  return (
    <section id="projects" className="section">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }} ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ marginBottom: "56px" }}>
          <span className="tag" style={{ display: "inline-block", marginBottom: "16px" }}>Projects</span>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#fff" }}>Things I have built</h2>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
          {projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} inView={inView} />)}
        </div>
      </div>
    </section>
  )
}
