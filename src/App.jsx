import { useState } from 'react'
import { C } from './constants'
import Home from './components/Home'
import LoginPraticien from './components/LoginPraticien'
import Dashboard from './components/Dashboard'
import PatientAccueil from './components/PatientAccueil'
import FichesSection from './components/FichesSection'
import LivretSection from './components/LivretSection'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

const BG_DEGRADE = 'radial-gradient(ellipse at 85% 5%, #d29678 0%, transparent 40%), radial-gradient(ellipse at 5% 90%, #78b4d2 0%, transparent 45%), radial-gradient(ellipse at 50% 50%, #d2b496 0%, transparent 60%), #ddd8d0'

const patientTabs = [
  { key: 'fiches', label: '📄 Mes fiches' },
  { key: 'livret', label: '📋 Mon livret' },
  { key: 'questions', label: '✉️ Questions' },
]

export default function App() {
  const [page, setPage] = useState('home')
  const [onglet, setOnglet] = useState('accueil')
  const [medecin, setMedecin] = useState(null)
  const [user, setUser] = useState(null)

  const goTo = (p) => { setPage(p); window.scrollTo({ top: 0 }) }
  const goOnglet = (o) => { setOnglet(o); window.scrollTo({ top: 0 }) }

  if (page === 'home') {
    return <Home goTo={goTo} setMedecin={setMedecin} />
  }

  if (page === 'login') {
    return <LoginPraticien goTo={goTo} setUser={setUser} setMedecin={setMedecin} />
  }

  if (page === 'dashboard') {
    return <Dashboard goTo={goTo} medecin={medecin} user={user} />
  }

  // Patient
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* NavBar verte patient */}
      <header style={{ background: '#00783c', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 3px 18px rgba(0,120,60,0.4)' }}>
        <div style={{ maxWidth: 920, margin: '0 auto', padding: '13px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>

          <button onClick={() => goOnglet('accueil')} style={{ background: '#00a050', borderRadius: 8, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: 'none', cursor: 'pointer' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </button>

          <button onClick={() => goOnglet('accueil')} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.1rem', fontWeight: 800, color: C.white, letterSpacing: '0.05em', textTransform: 'uppercase', lineHeight: 1.1 }}>
              Espace Patients
            </div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>
              {medecin?.nom}
            </div>
          </button>

          <nav style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
            {patientTabs.map(t => {
              const active = onglet === t.key
              return (
                <button key={t.key} onClick={() => goOnglet(t.key)}
                  style={{
                    background: active ? 'rgba(255,255,255,0.2)' : 'transparent',
                    color: active ? C.white : 'rgba(255,255,255,0.65)',
                    border: 'none', borderRadius: 8,
                    padding: '7px 16px', fontSize: '0.78rem',
                    fontWeight: active ? 700 : 500,
                    letterSpacing: '0.04em',
                    cursor: 'pointer', transition: 'all 0.18s',
                    fontFamily: "'Barlow', sans-serif", whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = C.white }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
                >
                  {t.label}
                </button>
              )
            })}
          </nav>

          <button onClick={() => goTo('home')}
            style={{
              background: 'rgba(255,255,255,0.15)', color: C.white,
              border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8,
              padding: '7px 14px', fontSize: '0.78rem', fontWeight: 600,
              cursor: 'pointer', fontFamily: "'Barlow', sans-serif",
              transition: 'background 0.18s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >
            Changer
          </button>
        </div>
      </header>

      {onglet === 'accueil' && (
        <PatientAccueil medecin={medecin} goOnglet={goOnglet} goTo={goTo} />
      )}

      {onglet !== 'accueil' && (
        <div style={{
          flex: 1, background: BG_DEGRADE,
          minHeight: 'calc(100vh - 66px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {onglet === 'fiches' && (
            <main style={{ maxWidth: 920, width: '100%', padding: '24px 20px' }}>
              <FichesSection medecin={medecin} />
            </main>
          )}
          {onglet === 'livret' && (
            <main style={{ maxWidth: 920, width: '100%', padding: '24px 20px' }}>
              <LivretSection medecin={medecin} />
            </main>
          )}
          {onglet === 'questions' && (
            <main style={{ maxWidth: 920, width: '100%', padding: '24px 20px' }}>
              <ContactForm medecin={medecin} />
            </main>
          )}
        </div>
      )}

      <Footer />
    </div>
  )
}
