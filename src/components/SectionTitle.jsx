import { C } from '../constants'

export default function SectionTitle({ title, sub, color = C.blue }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'inline-flex', width: 'fit-content', alignItems: 'center', background: color, padding: '12px 28px', borderRadius: 14, marginBottom: 10, boxShadow: '0 4px 14px rgba(0,0,0,0.18)' }}>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.3rem', fontWeight: 800, color: C.white, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title}
        </span>
      </div>
      {sub && <div style={{ fontSize: '0.9rem', color: C.textSoft, paddingLeft: 4, marginBottom: 20 }}>{sub}</div>}
    </div>
  )
}
