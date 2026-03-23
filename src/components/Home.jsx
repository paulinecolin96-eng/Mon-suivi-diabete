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
    background: 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(12px)',
    borderRadius: 20,
    padding: 36,
    minWidth: 280,
    flex: '1 1 280px',
    maxWidth: 400,
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    transition: 'all 0.25s',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(ellipse at 80% 0%, #d29678 0%, transparent 45%),
        radial-gradient(ellipse at 0% 100%, #78b4d2 0%, transparent 50%),
        #ddd8d0
      `,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 880, width: '100%' }}>

        {/* Badge */}
        <div style={{
          display: 'inline-block', background: C.green, color: C.white,
          fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.72rem',
          fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
          padding: '5px 18px', borderRadius: 20, marginBottom: 16,
        }}>
          Espace Patients
        </div>

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
          fontWeight: 400, marginBottom: 44,
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
              borderTop: `4px solid ${C.blue}`,
              transform: hoverPatient ? 'translateY(-6px)' : 'none',
              boxShadow: hoverPatient ? '0 16px 48px rgba(0,0,0,0.15)' : cardBase.boxShadow,
            }}
          >
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: 16 }}>👤</span>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.5rem',
              fontWeight: 800, color: C.blue, textTransform: 'uppercase',
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
                  background: C.blue, color: C.white,
                  border: 'none', borderRadius: 10,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '0.95rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.18s',
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#0a2e7a' }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = C.blue }}
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
              borderTop: '4px solid #6b21a8',
              transform: hoverPraticien ? 'translateY(-6px)' : 'none',
              boxShadow: hoverPraticien ? '0 16px 48px rgba(0,0,0,0.15)' : cardBase.boxShadow,
              cursor: 'pointer',
            }}
            onClick={() => goTo('login')}
          >
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: 16 }}>🩺</span>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.5rem',
              fontWeight: 800, color: '#6b21a8', textTransform: 'uppercase',
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
                background: '#6b21a8', color: C.white,
                border: 'none', borderRadius: 10,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '0.95rem', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.05em',
                cursor: 'pointer', transition: 'background 0.18s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#7c3aed'}
              onMouseLeave={e => e.currentTarget.style.background = '#6b21a8'}
            >
              Se connecter →
            </button>
            <p style={{ fontSize: '0.72rem', color: '#999', marginTop: 14 }}>
              Accès réservé aux médecins
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
