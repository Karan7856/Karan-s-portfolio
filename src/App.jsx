import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import CodingProfiles from './components/CodingProfiles'
import Certifications from './components/Certifications'
import Achievements from './components/Achievements'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import GlobalEffects from './components/GlobalEffects'
import PageLoader from './components/PageLoader'

const Background3D = lazy(() => import('./components/Background3D'))

export default function App() {
  return (
    <div className="min-h-screen bg-[#04040d] text-slate-200 aurora-bg dot-grid">
      <PageLoader />
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>
      <GlobalEffects />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <CodingProfiles />
      <Certifications />
      <Achievements />
      <Education />
      <Contact />
      <Footer />
    </div>
  )
}
