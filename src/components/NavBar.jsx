import { C } from '../constants'

const links = [
  { key: 'fiches', label: 'Fiches' },
  { key: 'livret', label: 'Livret' },
  { key: 'questions', label: 'Questions' },
]

export default function NavBar({ page, setPage, goTo, medecin, bgColor = C.blue, mode = 'patient' }) {
  const nom = medecin?.nom || 'Mon Suivi Diabète'
  const specialite = medecin?.specialite || ''

  return (
    <header style={{ background: bgColor, position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 3px 18px rgba(0,30,90,0.4)' }}>
      <div style={{ maxWidth: 920, margin: '0 auto', padding: '13px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>

        <button onClick={() => mode === 'patient' ? setPage('accueil') : goTo('home')} style={{ background: mode === 'dashboard' ? '#7c3aed' : C.orange, borderRadius: 8, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: 'none', cursor: 'pointer' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
          </svg>
        </button>

        <button onClick={() => mode === 'patient' ? setPage('accueil') : goTo('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.2rem', fontWeight: 800, color: C.white, letterSpacing: '0.05em', textTransform: 'uppercase', lineHeight: 1.1 }}>
            MON SUIVI DIABÈTE
          </div>
          {nom && (
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', fontWeight: 300, marginTop: 2 }}>
              {nom}{specialite ? ` — ${specialite}` : ''}
            </div>
          )}
        </button>

        <nav style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {mode === 'patient' && links.map(l => {
            const active = page === l.key
            const activeColor = mode === 'dashboard' ? '#7c3aed' : C.orange
            return (
              <button key={l.key} onClick={() => setPage(l.key)}
                style={{
                  background: active ? activeColor : 'transparent',
                  color: active ? C.white : 'rgba(255,255,255,0.6)',
                  border: 'none', borderRadius: 8,
                  padding: '6px 16px', fontSize: '0.78rem',
                  fontWeight: active ? 700 : 500,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 0.18s',
                  fontFamily: "'Barlow', sans-serif",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.9)' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
              >
                {l.label}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
