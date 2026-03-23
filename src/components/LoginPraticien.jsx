import { useState } from 'react'
import { C } from '../constants'
import { supabase } from '../supabase'

export default function LoginPraticien({ goTo, setUser, setMedecin }) {
  const [onglet, setOnglet] = useState('connexion')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nom, setNom] = useState('')
  const [erreur, setErreur] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState({})

  const handleLogin = async (e) => {
    e.preventDefault()
    setErreur('')
    setLoading(true)
    const { data, error } = await supabase.auth
      .signInWithPassword({ email, password })
    if (error) {
      setErreur('Email ou mot de passe incorrect')
      setLoading(false)
      return
    }
    if (data.user) {
      const { data: med } = await supabase
        .from('medecins').select('*')
        .eq('email', email).single()
      setMedecin(med)
      setUser(data.user)
      setLoading(false)
      goTo('dashboard')
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setErreur('')
    setLoading(true)
    const { data, error } = await supabase.auth
      .signUp({ email, password })
    if (error) {
      setErreur(error.message)
      setLoading(false)
      return
    }
    if (data.user) {
      const code = nom.toUpperCase().replace(/\s+/g, '').substring(0, 8)
      await supabase.from('medecins').insert({
        email,
        nom,
        code_patient: code,
        specialite: 'Médecin généraliste',
      })
      const { data: med } = await supabase
        .from('medecins').select('*')
        .eq('email', email).single()
      setMedecin(med)
      setUser(data.user)
      setLoading(false)
      goTo('dashboard')
    }
  }

  const inputStyle = (name) => ({
    width: '100%', padding: '11px 14px',
    border: `1.5px solid ${focused[name] ? '#6b21a8' : '#ccc'}`,
    borderRadius: 10, fontSize: '0.87rem',
    fontFamily: "'Barlow', sans-serif",
    color: C.blue, outline: 'none',
    transition: 'border 0.18s', marginBottom: 14,
    boxSizing: 'border-box',
  })

  const labelStyle = {
    display: 'block', fontSize: '0.75rem', fontWeight: 600,
    color: C.blue, marginBottom: 6,
    textTransform: 'uppercase', letterSpacing: '0.06em',
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
      <div style={{ maxWidth: 440, width: '100%' }}>

        {/* Bouton retour */}
        <button
          onClick={() => goTo('home')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.6)', border: '1.5px solid #6b21a8',
            borderRadius: 10, backdropFilter: 'blur(8px)',
            padding: '8px 18px', fontSize: '0.82rem', fontWeight: 600,
            fontFamily: "'Barlow Condensed', sans-serif",
            color: '#6b21a8', cursor: 'pointer', marginBottom: 24,
            letterSpacing: '0.04em', textTransform: 'uppercase',
            transition: 'all 0.18s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#6b21a8'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.6)'; e.currentTarget.style.color = '#6b21a8' }}
        >
          ← Retour
        </button>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
          borderRadius: 20, padding: 40,
          boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
        }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 56, height: 56, borderRadius: 14,
              background: '#6b21a8', marginBottom: 14,
            }}>
              <span style={{ fontSize: '1.8rem' }}>🩺</span>
            </div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.4rem',
              fontWeight: 800, color: '#6b21a8', textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Espace Praticien
            </div>
            <div style={{ fontSize: '0.82rem', color: C.textSoft, marginTop: 4 }}>
              Connexion sécurisée
            </div>
          </div>

          {/* Onglets */}
          <div style={{
            display: 'flex', gap: 4, marginBottom: 24,
            background: '#f0e8ff', borderRadius: 10, padding: 4,
          }}>
            {[['connexion', 'Connexion'], ['inscription', 'Créer un compte']].map(([key, label]) => (
              <button key={key}
                onClick={() => { setOnglet(key); setErreur('') }}
                style={{
                  flex: 1, padding: '8px 12px',
                  background: onglet === key ? '#6b21a8' : 'transparent',
                  color: onglet === key ? C.white : '#6b21a8',
                  border: 'none', borderRadius: 8,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '0.85rem', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.18s',
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Formulaire Connexion */}
          {onglet === 'connexion' && (
            <form onSubmit={handleLogin}>
              <label style={labelStyle}>Email</label>
              <input type="email" value={email} required
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocused(p => ({ ...p, email: true }))}
                onBlur={() => setFocused(p => ({ ...p, email: false }))}
                style={inputStyle('email')} placeholder="votre@email.fr"
              />
              <label style={labelStyle}>Mot de passe</label>
              <input type="password" value={password} required
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocused(p => ({ ...p, pass: true }))}
                onBlur={() => setFocused(p => ({ ...p, pass: false }))}
                style={inputStyle('pass')} placeholder="••••••••"
              />
              {erreur && (
                <div style={{ fontSize: '0.78rem', color: '#cc0000', marginBottom: 14 }}>
                  {erreur}
                </div>
              )}
              <button type="submit" disabled={loading}
                style={{
                  width: '100%', padding: 12,
                  background: '#6b21a8', color: C.white,
                  border: 'none', borderRadius: 10,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '0.95rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.18s',
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#7c3aed' }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#6b21a8' }}
              >
                {loading ? 'Connexion…' : 'Se connecter'}
              </button>
            </form>
          )}

          {/* Formulaire Inscription */}
          {onglet === 'inscription' && (
            <form onSubmit={handleSignup}>
              <label style={labelStyle}>Nom complet</label>
              <input type="text" value={nom} required
                onChange={e => setNom(e.target.value)}
                onFocus={() => setFocused(p => ({ ...p, nom: true }))}
                onBlur={() => setFocused(p => ({ ...p, nom: false }))}
                style={inputStyle('nom')} placeholder="Dr. Jean Dupont"
              />
              <label style={labelStyle}>Email</label>
              <input type="email" value={email} required
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocused(p => ({ ...p, email2: true }))}
                onBlur={() => setFocused(p => ({ ...p, email2: false }))}
                style={inputStyle('email2')} placeholder="votre@email.fr"
              />
              <label style={labelStyle}>Mot de passe</label>
              <input type="password" value={password} required
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocused(p => ({ ...p, pass2: true }))}
                onBlur={() => setFocused(p => ({ ...p, pass2: false }))}
                style={inputStyle('pass2')} placeholder="••••••••"
              />
              {erreur && (
                <div style={{ fontSize: '0.78rem', color: '#cc0000', marginBottom: 14 }}>
                  {erreur}
                </div>
              )}
              <button type="submit" disabled={loading}
                style={{
                  width: '100%', padding: 12,
                  background: '#6b21a8', color: C.white,
                  border: 'none', borderRadius: 10,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '0.95rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.18s',
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#7c3aed' }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#6b21a8' }}
              >
                {loading ? 'Création…' : 'Créer mon compte'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
