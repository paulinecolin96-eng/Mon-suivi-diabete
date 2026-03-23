import { useState } from 'react'
import { C } from '../constants'
import SectionTitle from './SectionTitle'
import coverImg from '/cover.jpg'

export default function LivretSection() {
  const [hover, setHover] = useState(false)
  return (
    <section>
      <SectionTitle num="2" title="Mon livret de suivi" sub="Téléchargez le livret complet Mon Suivi Diabète en PDF" color={C.blueBright} />

      <a href="/LIVRET_MON_SUIVI_DIABETE.pdf" download
        style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap', background: hover ? C.blue : 'rgba(255,255,255,0.55)', backdropFilter: 'blur(12px)', border: `2px solid ${hover ? C.blue : 'rgba(0,30,90,0.12)'}`, borderRadius: 16, padding: '24px 28px', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.22s', boxShadow: hover ? '0 12px 40px rgba(0,30,90,0.25)' : '0 2px 14px rgba(0,0,0,0.07)', transform: hover ? 'translateY(-2px)' : 'none' }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Vraie couverture */}
        <div style={{ width: 66, height: 86, borderRadius: 10, flexShrink: 0, overflow: 'hidden', boxShadow: '0 6px 20px rgba(0,30,90,0.35)', border: `2px solid ${hover ? 'rgba(255,255,255,0.2)' : '#ddd8d0'}`, transition: 'border 0.22s' }}>
          <img src={coverImg} alt="Couverture Mon Suivi Diabète" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.15rem', fontWeight: 800, color: hover ? C.white : C.blue, textTransform: 'uppercase', letterSpacing: '0.04em', transition: 'color 0.22s', marginBottom: 5 }}>
            MON SUIVI DIABÈTE
          </div>
          <div style={{ fontSize: '0.82rem', color: hover ? 'rgba(255,255,255,0.72)' : C.textSoft, lineHeight: 1.55, transition: 'color 0.22s' }}>
            Livret complet · 16 pages · Suivi glycémique, bilans annuels, vaccinations, dépistages, consultations et notes personnelles.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: hover ? C.orange : C.blue, color: C.white, padding: '11px 22px', borderRadius: 10, fontSize: '0.82rem', fontWeight: 700, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'background 0.22s', whiteSpace: 'nowrap', flexShrink: 0 }}>
          ↓ Télécharger
        </div>
      </a>
    </section>
  )
}
