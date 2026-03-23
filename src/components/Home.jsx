import { useState } from 'react'
import { C } from '../constants'
import { supabase } from '../supabase'

export default function Home({ goTo, setMedecin }) {
  const [code, setCode] = useState('')
  const [erreur, setErreur] = useState('')
  const [loading, setLoading] = useState(false)
  const [hoverPatient, setHoverPatient] = useState(false)
  const [hoverPraticien, setHoverPraticien] = useState(false)
  const [focused, setFocused] = useState(false)

  const handlePatientSubmit = async (e) => {
    e.preventDefault()
    setErreur('')
    setLoading(true)
    const { data, error } = await supabase
      .from('medecins')
      .select('*')
      .eq('code_patient', code.trim().toUpperCase())
      .single()
    setLoading(false)
    if (data) {
      setMedecin(data)
      goTo('patient')
    } else {
      setErreur('Code médecin incorrect. Vérifiez auprès de votre médecin.')
    }
  }

  const cardBase = {
    background: 'rgba(255,255,255,0.65)',
    backdropFilter: 'blur(14px)',
    borderRadius: 20,
    padding: 36,
    minWidth: 280,
    flex: '1 1 280px',
    maxWidth: 400,
    boxShadow: '0 8px 32px rgba(0,0,0,0.09)',
    transition: 'all 0.25s',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 85% 5%, #d29678 0%, transparent 40%), radial-gradient(ellipse at 5% 90%, #78b4d2 0%, transparent 45%), radial-gradient(ellipse at 50% 50%, #d2b496 0%, transparent 60%), #ddd8d0',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '48px 20px',
    }}>
        <div style={{ textAlign: 'center', maxWidth: 880, width: '100%' }}>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontWeight: 800, color: C.blue,
            letterSpacing: '0.03em', textTransform: 'uppercase',
            lineHeight: 1.0, marginBottom: 10,
          }}>
            MON SUIVI<br />DIABÈTE
          </h1>

          <p style={{
            color: C.textSoft, fontSize: '0.95rem',
            fontWeight: 300, marginBottom: 44,
          }}>
            Plateforme de suivi pour patients diabétiques
          </p>

          {/* Cards */}
          <div style={{
            display: 'flex', gap: 24, justifyContent: 'center',
            flexWrap: 'wrap',
          }}>

            {/* Card Patient */}
            <div
              onMouseEnter={() => setHoverPatient(true)}
              onMouseLeave={() => setHoverPatient(false)}
              style={{
                ...cardBase,
                borderTop: '4px solid #00783c',
                transform: hoverPatient ? 'translateY(-6px)' : 'none',
                boxShadow: hoverPatient ? '0 16px 48px rgba(0,0,0,0.16)' : cardBase.boxShadow,
              }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="#00783c" style={{ display: 'block', marginBottom: 16 }}>
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.5rem',
                fontWeight: 800, color: '#00783c', textTransform: 'uppercase',
                letterSpacing: '0.04em', marginBottom: 8,
              }}>
                Espace Patient
              </div>
              <p style={{ fontSize: '0.85rem', color: C.textSoft, marginBottom: 20, lineHeight: 1.5 }}>
                Accédez aux ressources de votre médecin
              </p>
              <form onSubmit={handlePatientSubmit}>
                <input
                  type="text"
                  value={code}
                  onChange={e => { setCode(e.target.value); setErreur('') }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder='Code médecin (ex: DUPONT42)'
                  style={{
                    width: '100%', padding: '11px 14px',
                    border: `1.5px solid ${focused ? C.blue : '#ccc'}`,
                    borderRadius: 10, fontSize: '0.87rem',
                    fontFamily: "'Barlow', sans-serif",
                    color: C.blue, outline: 'none',
                    transition: 'border 0.18s', marginBottom: 12,
                    boxSizing: 'border-box',
                  }}
                />
                {erreur && (
                  <div style={{ fontSize: '0.78rem', color: '#cc0000', marginBottom: 12, textAlign: 'left' }}>
                    {erreur}
                  </div>
                )}
                <button type="submit" disabled={loading}
                  style={{
                    width: '100%', padding: 12,
                    background: '#00783c', color: C.white,
                    border: 'none', borderRadius: 10,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: '0.95rem', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'background 0.18s',
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#005a2c' }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#00783c' }}
                >
                  {loading ? 'Chargement…' : 'Accéder →'}
                </button>
              </form>
            </div>

            {/* Card Praticien */}
            <div
              onMouseEnter={() => setHoverPraticien(true)}
              onMouseLeave={() => setHoverPraticien(false)}
              style={{
                ...cardBase,
                borderTop: '4px solid #d25a00',
                transform: hoverPraticien ? 'translateY(-6px)' : 'none',
                boxShadow: hoverPraticien ? '0 16px 48px rgba(0,0,0,0.16)' : cardBase.boxShadow,
                cursor: 'pointer',
              }}
              onClick={() => goTo('login')}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="#d25a00" style={{ display: 'block', marginBottom: 16 }}>
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
              </svg>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.5rem',
                fontWeight: 800, color: '#d25a00', textTransform: 'uppercase',
                letterSpacing: '0.04em', marginBottom: 8,
              }}>
                Espace Praticien
              </div>
              <p style={{ fontSize: '0.85rem', color: C.textSoft, marginBottom: 20, lineHeight: 1.5 }}>
                Gérez votre cabinet et répondez aux questions
              </p>
              <button
                style={{
                  width: '100%', padding: 12,
                  background: '#d25a00', color: C.white,
                  border: 'none', borderRadius: 10,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '0.95rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                  cursor: 'pointer', transition: 'background 0.18s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#a84400'}
                onMouseLeave={e => e.currentTarget.style.background = '#d25a00'}
              >
                Se connecter →
              </button>
              <p style={{ fontSize: '0.72rem', color: '#d25a00', marginTop: 14 }}>
                Accès réservé aux médecins
              </p>
            </div>

          </div>
        </div>
    </div>
  )
}
