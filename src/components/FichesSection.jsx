import { useState } from 'react'
import { C, FICHES, CATEGORIES } from '../constants'
import SectionTitle from './SectionTitle'

function FicheCard({ fiche }) {
  const [hover, setHover] = useState(false)
  return (
    <a href={fiche.file} download
      style={{ display: 'flex', alignItems: 'center', gap: 14, background: hover ? fiche.color : 'rgba(255,255,255,0.55)', backdropFilter: 'blur(12px)', border: `2px solid ${hover ? fiche.color : 'rgba(0,30,90,0.12)'}`, borderRadius: 14, padding: '16px 18px', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.22s', boxShadow: hover ? `0 8px 28px ${fiche.color}44` : '0 2px 10px rgba(0,0,0,0.06)', transform: hover ? 'translateY(-3px)' : 'none' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ width: 46, height: 46, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.35rem', background: hover ? 'rgba(255,255,255,0.18)' : fiche.bg, transition: 'background 0.22s' }}>
        {fiche.emoji}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.96rem', fontWeight: 700, color: hover ? C.white : C.blue, textTransform: 'uppercase', letterSpacing: '0.03em', transition: 'color 0.22s' }}>
          {fiche.title}
        </div>
        <div style={{ fontSize: '0.7rem', marginTop: 3, fontWeight: 500, color: hover ? 'rgba(255,255,255,0.85)' : fiche.color, transition: 'color 0.22s' }}>
          ↓ Télécharger en PDF
        </div>
      </div>
    </a>
  )
}

function CategorieCard({ cat, count, onClick }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        display: 'flex', alignItems: 'center', gap: 14,
        background: hover ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(10px)',
        border: '2px solid transparent', borderLeftWidth: 4, borderLeftColor: cat.color,
        borderRadius: 14, padding: 20,
        cursor: 'pointer', textAlign: 'left', width: '100%',
        transition: 'all 0.22s',
        transform: hover ? 'translateY(-3px)' : 'none',
        boxShadow: hover ? '0 8px 24px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{
        position: 'absolute', top: 10, right: 12,
        background: cat.color, color: C.white,
        borderRadius: 20, padding: '2px 10px',
        fontSize: '0.72rem', fontWeight: 700,
      }}>
        {count} fiche{count > 1 ? 's' : ''}
      </div>
      <span style={{ fontSize: '2rem', flexShrink: 0 }}>{cat.emoji}</span>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.05rem',
          fontWeight: 800, color: C.blue, textTransform: 'uppercase',
          letterSpacing: '0.04em', lineHeight: 1.2,
        }}>
          {cat.label}
        </div>
        <div style={{ fontSize: '0.75rem', color: C.textSoft, marginTop: 4, lineHeight: 1.4 }}>
          {cat.description}
        </div>
      </div>
      <span style={{
        fontSize: '1.3rem', color: hover ? cat.color : 'rgba(0,30,90,0.2)',
        transition: 'all 0.22s',
        transform: hover ? 'translateX(3px)' : 'none',
        flexShrink: 0,
      }}>
        →
      </span>
    </button>
  )
}

function Toggle({ vue, setVue }) {
  const btn = (label, value) => {
    const active = vue === value
    return (
      <button
        onClick={() => setVue(value)}
        style={{
          background: active ? C.blue : 'rgba(255,255,255,0.5)',
          color: active ? C.white : C.blue,
          border: 'none', borderRadius: 10,
          padding: '7px 18px', fontSize: '0.8rem', fontWeight: 600,
          fontFamily: "'Barlow Condensed', sans-serif",
          letterSpacing: '0.04em', cursor: 'pointer',
          transition: 'all 0.18s',
        }}
      >
        {label}
      </button>
    )
  }
  return (
    <div style={{
      display: 'inline-flex', background: 'rgba(255,255,255,0.3)',
      borderRadius: 12, padding: 4, gap: 4, marginBottom: 22,
    }}>
      {btn('⊞ Toutes les fiches', 'globale')}
      {btn('≡ Par catégorie', 'categorie')}
    </div>
  )
}

export default function FichesSection() {
  const [vue, setVue] = useState('globale')
  const [categorieActive, setCategorieActive] = useState(null)

  const activeCat = CATEGORIES.find(c => c.id === categorieActive)
  const filteredFiches = categorieActive
    ? FICHES.filter(f => f.categorie === categorieActive)
    : FICHES

  return (
    <section>
      <SectionTitle num="1" title="Mes fiches conseils" sub="Cliquez pour télécharger la fiche en PDF" color={C.orange} />

      <Toggle vue={vue} setVue={(v) => { setVue(v); setCategorieActive(null) }} />

      {vue === 'globale' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))', gap: 13 }}>
            {FICHES.map(f => <FicheCard key={f.id} fiche={f} />)}
          </div>
          <div style={{ marginTop: 14, background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', borderLeft: `4px solid ${C.blue}`, borderRadius: '0 8px 8px 0', padding: '10px 14px', fontSize: '0.78rem', color: C.blue, lineHeight: 1.5 }}>
            💡 <strong>Conseil :</strong> Les fiches s'ouvrent directement sur votre téléphone. Vous pouvez les enregistrer dans vos fichiers ou les imprimer.
          </div>
        </>
      )}

      {vue === 'categorie' && !categorieActive && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {CATEGORIES.map(cat => (
            <CategorieCard
              key={cat.id}
              cat={cat}
              count={FICHES.filter(f => f.categorie === cat.id).length}
              onClick={() => setCategorieActive(cat.id)}
            />
          ))}
        </div>
      )}

      {vue === 'categorie' && categorieActive && activeCat && (
        <>
          <button
            onClick={() => setCategorieActive(null)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)',
              border: '1.5px solid #001e5a', borderRadius: 10,
              padding: '7px 16px', fontSize: '0.8rem', fontWeight: 600,
              fontFamily: "'Barlow Condensed', sans-serif",
              color: C.blue, cursor: 'pointer', marginBottom: 18,
              letterSpacing: '0.04em', textTransform: 'uppercase',
              transition: 'all 0.18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.blue; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.6)'; e.currentTarget.style.color = C.blue }}
          >
            ← Toutes les catégories
          </button>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18,
          }}>
            <span style={{ fontSize: '2rem' }}>{activeCat.emoji}</span>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.4rem',
              fontWeight: 800, color: activeCat.color, textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}>
              {activeCat.label}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))', gap: 13 }}>
            {filteredFiches.map(f => <FicheCard key={f.id} fiche={f} />)}
          </div>

          {filteredFiches.length === 0 && (
            <div style={{
              background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)',
              borderRadius: 12, padding: '20px 24px', textAlign: 'center',
              color: C.textSoft, fontSize: '0.88rem',
            }}>
              Aucune fiche dans cette catégorie pour le moment.
            </div>
          )}
        </>
      )}
    </section>
  )
}
