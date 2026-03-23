import { C } from '../constants'

export default function Footer({ medecin }) {
  return (
    <footer style={{ background: C.blue, padding: '22px 24px', textAlign: 'center' }}>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.82rem', letterSpacing: '0.28em', color: C.orangeLight, fontWeight: 700, textTransform: 'uppercase', marginBottom: 7 }}>
        M O N &nbsp; S U I V I &nbsp; D I A B È T E
      </div>
      <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65 }}>
        Cet espace est fourni à titre informatif et ne remplace pas une consultation médicale.<br />
        © {new Date().getFullYear()} {medecin?.nom || 'Mon Suivi Diabète'} — Tous droits réservés
      </div>
    </footer>
  )
}
