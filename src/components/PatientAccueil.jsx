import { useState } from 'react'
import { C } from '../constants'

const cards = [
  {
    key: 'fiches',
    emoji: '📄',
    title: 'Mes fiches conseils',
    sub: 'Téléchargez vos fiches pratiques',
    color: '#d25a00',
  },
  {
    key: 'livret',
    emoji: '📋',
    title: 'Mon livret de suivi',
    sub: 'Livret complet 16 pages',
    color: '#1e5af0',
  },
  {
    key: 'questions',
    emoji: '✉️',
    title: 'Questions · Réponses',
    sub: 'Posez votre question au médecin',
    color: '#d20096',
  },
]

function AccueilCard({ card, onClick }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: '1 1 240px', maxWidth: 320,
        background: hover ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.65)',
        backdropFilter: 'blur(14px)',
        borderTop: `4px solid ${card.color}`,
        borderRadius: 20, padding: '32px 28px',
        cursor: 'pointer', textAlign: 'center',
        transition: 'all 0.25s',
        transform: hover ? 'translateY(-6px)' : 'none',
        boxShadow: hover ? '0 16px 48px rgba(0,0,0,0.14)' : '0 8px 32px rgba(0,0,0,0.09)',
      }}
    >
      <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 16 }}>{card.emoji}</span>
      <div style={{
        fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.2rem',
        fontWeight: 800, color: C.blue, textTransform: 'uppercase',
        letterSpacing: '0.04em', marginBottom: 8,
      }}>
        {card.title}
      </div>
      <p style={{ fontSize: '0.82rem', color: C.textSoft, marginBottom: 20, lineHeight: 1.5 }}>
        {card.sub}
      </p>
      <div style={{
        display: 'inline-block', background: card.color, color: '#fff',
        padding: '10px 24px', borderRadius: 10,
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: '0.9rem', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.05em',
        transition: 'background 0.18s',
      }}>
        Accéder →
      </div>
    </div>
  )
}

export default function PatientAccueil({ medecin, goOnglet, goTo }) {
  return (
    <div style={{
      flex: 1,
      background: 'radial-gradient(ellipse at 85% 5%, #d29678 0%, transparent 40%), radial-gradient(ellipse at 5% 90%, #78b4d2 0%, transparent 45%), #ddd8d0',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '48px 24px', textAlign: 'center',
      minHeight: 'calc(100vh - 66px)',
    }}>

      {/* Titre */}
      <h1 style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 'clamp(3.5rem, 10vw, 6rem)',
        fontWeight: 800, color: C.blue,
        letterSpacing: '0.03em', textTransform: 'uppercase',
        lineHeight: 1.0, marginBottom: 8,
      }}>
        MON SUIVI<br />DIABÈTE
      </h1>

      {/* Changer de médecin */}
      <button onClick={() => goTo('home')}
        style={{
          background: 'none', border: 'none', color: C.textSoft,
          fontSize: '0.75rem', cursor: 'pointer', marginBottom: 36,
          textDecoration: 'underline', fontFamily: "'Barlow', sans-serif",
        }}
      >
        ← Changer de médecin
      </button>

      {/* Cards */}
      <div style={{
        display: 'flex', gap: 24, justifyContent: 'center',
        flexWrap: 'wrap', maxWidth: 1020, width: '100%',
      }}>
        {cards.map(c => (
          <AccueilCard key={c.key} card={c} onClick={() => goOnglet(c.key)} />
        ))}
      </div>
    </div>
  )
}
