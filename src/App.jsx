import { useState } from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import LoginPraticien from './components/LoginPraticien'
import Dashboard from './components/Dashboard'
import FichesSection from './components/FichesSection'
import LivretSection from './components/LivretSection'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

const BG_DEGRADE = `
  radial-gradient(ellipse at 80% 0%, #d29678 0%, transparent 45%),
  radial-gradient(ellipse at 0% 100%, #78b4d2 0%, transparent 50%),
  radial-gradient(ellipse at 40% 50%, #d2b496 0%, transparent 55%),
  #ddd8d0
`

export default function App() {
  const [page, setPage] = useState('home')
  const [subPage, setSubPage] = useState('fiches')
  const [medecin, setMedecin] = useState(null)
  const [user, setUser] = useState(null)

  const goTo = (p) => { setPage(p); window.scrollTo({ top: 0 }) }

  // Home & Login — pas de NavBar
  if (page === 'home') {
    return <Home goTo={goTo} setMedecin={setMedecin} />
  }

  if (page === 'login') {
    return <LoginPraticien goTo={goTo} setUser={setUser} setMedecin={setMedecin} />
  }

  // Dashboard — NavBar violette
  if (page === 'dashboard') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <NavBar page={null} setPage={() => {}} goTo={goTo} medecin={medecin} bgColor="#6b21a8" mode="dashboard" />
        <div style={{ flex: 1 }}>
          <Dashboard goTo={goTo} medecin={medecin} user={user} />
        </div>
        <Footer />
      </div>
    )
  }

  // Patient — NavBar bleue + sous-pages
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar page={subPage} setPage={setSubPage} goTo={goTo} medecin={medecin} bgColor="#001e5a" mode="patient" />
      <div style={{
        flex: 1, background: BG_DEGRADE,
        minHeight: 'calc(100vh - 66px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {subPage === 'fiches' && (
          <main style={{ maxWidth: 920, width: '100%', padding: '40px 20px' }}>
            <BackButton onClick={() => goTo('home')} />
            <FichesSection medecin={medecin} />
          </main>
        )}
        {subPage === 'livret' && (
          <main style={{ maxWidth: 920, width: '100%', padding: '40px 20px' }}>
            <BackButton onClick={() => goTo('home')} />
            <LivretSection medecin={medecin} />
          </main>
        )}
        {subPage === 'questions' && (
          <main style={{ maxWidth: 920, width: '100%', padding: '40px 20px' }}>
            <BackButton onClick={() => goTo('home')} />
            <ContactForm medecin={medecin} />
          </main>
        )}
      </div>
      <Footer />
    </div>
  )
}

function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'rgba(255,255,255,0.6)', border: '1.5px solid #001e5a',
        borderRadius: 10, backdropFilter: 'blur(8px)',
        padding: '8px 18px', fontSize: '0.82rem', fontWeight: 600,
        fontFamily: "'Barlow Condensed', sans-serif",
        color: '#001e5a', cursor: 'pointer', marginBottom: 28,
        letterSpacing: '0.04em', textTransform: 'uppercase',
        transition: 'all 0.18s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#001e5a'; e.currentTarget.style.color = '#fff' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.6)'; e.currentTarget.style.color = '#001e5a' }}
    >
      ← Retour
    </button>
  )
}
