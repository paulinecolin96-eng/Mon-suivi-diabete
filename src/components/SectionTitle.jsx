import { C } from '../constants'

export default function SectionTitle({ num, title, sub, color = C.blue }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'inline-flex', width: 'fit-content', alignItems: 'center', gap: 10, background: color, padding: '8px 20px', borderRadius: 14, marginBottom: 10, boxShadow: '0 4px 14px rgba(0,0,0,0.18)' }}>
        <div style={{ background: 'rgba(255,255,255,0.25)', color: C.white, width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.9rem', fontWeight: 800, flexShrink: 0 }}>
          {num}
        </div>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1rem', fontWeight: 800, color: C.white, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {title}
        </span>
      </div>
      {sub && <div style={{ fontSize: '0.8rem', color: C.textSoft, paddingLeft: 4 }}>{sub}</div>}
    </div>
  )
}
