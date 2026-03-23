import { useState } from 'react'
import { C } from '../constants'
import { supabase } from '../supabase'
import SectionTitle from './SectionTitle'
import coverImg from '/cover.jpg'
import coverTableau from '/cover-tableau.jpg'

export default function LivretSection({ medecin }) {
  const [hover, setHover] = useState(false)
  const [hover2, setHover2] = useState(false)

  const cardStyle = (h) => ({
    display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap',
    background: h ? C.blue : 'rgba(255,255,255,0.55)', backdropFilter: 'blur(12px)',
    border: `2px solid ${h ? C.blue : 'rgba(0,30,90,0.12)'}`,
    borderRadius: 16, padding: '24px 28px', textDecoration: 'none',
    cursor: 'pointer', transition: 'all 0.22s',
    boxShadow: h ? '0 12px 40px rgba(0,30,90,0.25)' : '0 2px 14px rgba(0,0,0,0.07)',
    transform: h ? 'translateY(-2px)' : 'none',
  })

  const coverStyle = (h) => ({
    width: 66, height: 86, borderRadius: 10, flexShrink: 0, overflow: 'hidden',
    boxShadow: '0 6px 20px rgba(0,30,90,0.35)',
    border: `2px solid ${h ? 'rgba(255,255,255,0.2)' : '#ddd8d0'}`,
    transition: 'border 0.22s',
  })

  const handleLivret = async () => {
    if (medecin?.id) {
      await supabase.from('telechargements').insert({
        medecin_id: medecin.id,
        type: 'livret',
        fiche_titre: 'Mon Suivi Diabète',
      })
    }
    window.open('/LIVRET_MON_SUIVI_DIABETE.pdf', '_blank')
  }

  const handleTableau = async () => {
    if (medecin?.id) {
      await supabase.from('telechargements').insert({
        medecin_id: medecin.id,
        type: 'tableau_bord',
        fiche_titre: 'Mon Tableau de Bord',
      })
    }
    window.open('/TABLEAU_DE_BORD.pdf', '_blank')
  }

  return (
    <section>
      <SectionTitle title="Mon livret de suivi" sub="Téléchargez le livret complet Mon Suivi Diabète en PDF" color={C.blueBright} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Card Livret */}
        <div style={cardStyle(hover)} onClick={handleLivret}
          onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        >
          <div style={coverStyle(hover)}>
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
        </div>

        {/* Card Tableau de bord */}
        <div style={cardStyle(hover2)} onClick={handleTableau}
          onMouseEnter={() => setHover2(true)} onMouseLeave={() => setHover2(false)}
        >
          <div style={coverStyle(hover2)}>
            <img src={coverTableau} alt="Tableau de bord" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.15rem', fontWeight: 800, color: hover2 ? C.white : C.blue, textTransform: 'uppercase', letterSpacing: '0.04em', transition: 'color 0.22s', marginBottom: 5 }}>
              MON TABLEAU DE BORD
            </div>
            <div style={{ fontSize: '0.82rem', color: hover2 ? 'rgba(255,255,255,0.72)' : C.textSoft, lineHeight: 1.55, transition: 'color 0.22s' }}>
              Fiche annuelle · Suivi glycémique, bilans biologiques, examens de dépistage.
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: hover2 ? C.orange : C.blue, color: C.white, padding: '11px 22px', borderRadius: 10, fontSize: '0.82rem', fontWeight: 700, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'background 0.22s', whiteSpace: 'nowrap', flexShrink: 0 }}>
            ↓ Télécharger
          </div>
        </div>
      </div>
    </section>
  )
}
