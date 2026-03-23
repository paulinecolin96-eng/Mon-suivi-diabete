import { useState } from 'react'
import { C } from '../constants'
import CONFIG from '../config'

const cards = [
  {
    key: 'fiches',
    emoji: '📄',
    title: 'Mes fiches conseils',
    sub: '6 fiches pratiques à télécharger',
    color: C.orange,
  },
  {
    key: 'livret',
    emoji: '📋',
    title: 'Mon livret de suivi',
    sub: 'Livret complet 16 pages en PDF',
    color: C.blueBright,
  },
  {
    key: 'questions',
    emoji: '✉️',
    title: 'Questions · Réponses',
    sub: 'Posez votre question au médecin',
    color: C.magenta,
  },
]

function NavCard({ card, onClick }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: '1 1 260px', maxWidth: 320, minHeight: 200,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        justifyContent: 'space-between', gap: 14,
        background: hover ? card.color : 'rgba(255,255,255,0.55)',
        border: `2px solid ${hover ? card.color : 'rgba(0,30,90,0.12)'}`,
        borderRadius: 20, padding: '30px 26px',
        cursor: 'pointer', textAlign: 'left',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.25s ease',
        transform: hover ? 'translateY(-6px)' : 'none',
        boxShadow: hover ? `0 18px 48px ${card.color}66` : '0 4px 20px rgba(0,30,90,0.1)',
      }}
    >
      <div>
        <span style={{ fontSize: '2.4rem', display: 'block', marginBottom: 14 }}>{card.emoji}</span>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: '1.1rem', fontWeight: 800,
          color: hover ? '#fff' : C.blue,
          textTransform: 'uppercase',
          letterSpacing: '0.05em', lineHeight: 1.15,
          transition: 'color 0.25s',
        }}>
          {card.title}
        </div>
        <div style={{
          fontSize: '0.8rem',
          color: hover ? 'rgba(255,255,255,0.85)' : C.textSoft,
          fontWeight: 400, lineHeight: 1.5, marginTop: 8,
          transition: 'color 0.25s',
        }}>
          {card.sub}
        </div>
      </div>
      <div style={{
        alignSelf: 'flex-end',
        fontSize: '1.4rem',
        color: hover ? '#fff' : 'rgba(0,30,90,0.25)',
        transition: 'all 0.25s',
        transform: hover ? 'translateX(4px)' : 'none',
      }}>
        →
      </div>
    </button>
  )
}

export default function HomePage({ setPage }) {
  return (
    <section style={{
      minHeight: 'calc(100vh - 66px)',
      background: `
        radial-gradient(ellipse at 80% 0%,   #d29678 0%, transparent 45%),
        radial-gradient(ellipse at 0%  100%,  #78b4d2 0%, transparent 50%),
        radial-gradient(ellipse at 40% 50%,  #d2b496 0%, transparent 55%),
        #ddd8d0
      `,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '48px 24px', textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>

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
        fontSize: 'clamp(4rem, 10vw, 7rem)',
        fontWeight: 800, color: C.blue,
        letterSpacing: '0.03em', textTransform: 'uppercase',
        lineHeight: 1.0, marginBottom: 6,
      }}>
        MON SUIVI<br />DIABÈTE
      </h1>

      {/* Sous-titre médecin */}
      <p style={{
        color: C.orange, fontSize: '0.95rem',
        fontWeight: 600, marginBottom: 32,
      }}>
        {CONFIG.medecinNom} — {CONFIG.specialite}
      </p>

      {/* Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 20, maxWidth: 960, width: '100%',
      }}>
        {cards.map(c => (
          <NavCard key={c.key} card={c} onClick={() => setPage(c.key)} />
        ))}
      </div>
    </section>
  )
}
