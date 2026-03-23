import { C } from '../constants'

export default function Hero() {
  return (
    <section style={{ background: 'linear-gradient(160deg, #0a1a3a 0%, #142850 50%, #1b3a6b 100%)', padding: '56px 24px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>

      <div style={{ display: 'inline-block', background: C.green, color: C.white, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '5px 16px', borderRadius: 20, marginBottom: 20, fontFamily: "'Barlow Condensed', sans-serif" }}>
        Espace Patients
      </div>

      <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(3.2rem, 12vw, 5rem)', fontWeight: 800, color: C.white, letterSpacing: '0.03em', textTransform: 'uppercase', lineHeight: 1.0, marginBottom: 18 }}>
        MON<br />SUIVI<br /><span style={{ color: C.orange }}>DIABÈTE</span>
      </h1>

      <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.92rem', fontWeight: 300, maxWidth: 440, margin: '0 auto 34px', lineHeight: 1.75 }}>
        Téléchargez vos fiches conseils, votre livret de suivi,<br />et posez vos questions directement à votre médecin.
      </p>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
        {[
          { href: '#fiches',    bg: C.orange,  label: '📄 Fiches conseils' },
          { href: '#livret',    bg: C.magenta, label: '📋 Livret PDF' },
          { href: '#questions', bg: C.green,   label: '✉️ Question' },
        ].map(b => (
          <a key={b.href} href={b.href}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.1)', color: C.white, padding: '8px 20px', borderRadius: 30, fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(6px)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = b.bg; e.currentTarget.style.border = `1.5px solid ${b.bg}` }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.border = '1.5px solid rgba(255,255,255,0.22)' }}
          >{b.label}</a>
        ))}
      </div>
    </section>
  )
}
