import { useState, useEffect } from 'react'
import { C } from '../constants'
import { supabase } from '../supabase'
import SectionTitle from './SectionTitle'

const CATEGORIES_LOCAL = [
  { id: 'alimentation', label: 'Alimentation', emoji: '🍽️', color: '#d25a00', description: 'Glucides, index glycémique, équilibre alimentaire' },
  { id: 'activite', label: 'Activité physique', emoji: '🏃', color: '#1e5af0', description: 'Sport, activité quotidienne, sédentarité' },
  { id: 'traitements', label: 'Traitements', emoji: '💊', color: '#d20096', description: 'Médicaments, insuline, injections' },
  { id: 'surveillance', label: 'Surveillance', emoji: '📊', color: '#00783c', description: 'HbA1c, glycémie, objectifs' },
  { id: 'urgences', label: 'Urgences & complications', emoji: '⚠️', color: '#cc0000', description: 'Hypoglycémie, pieds, yeux, reins' },
  { id: 'vie', label: 'Vie quotidienne', emoji: '🌍', color: '#b08800', description: 'Voyage, Ramadan, alcool, tabac' },
]

const COULEURS_CAT = {
  'alimentation': '#d25a00',
  'activite':     '#1e5af0',
  'traitements':  '#d20096',
  'surveillance': '#00783c',
  'urgences':     '#cc0000',
  'vie':          '#b08800',
}

const BG_CAT = {
  'alimentation': '#fdf3ec',
  'activite':     '#edf3ff',
  'traitements':  '#fdeef8',
  'surveillance': '#edf8f2',
  'urgences':     '#fff0f0',
  'vie':          '#fdfaed',
}

function FicheCard({ fiche, medecin }) {
  const [hover, setHover] = useState(false)
  const color = COULEURS_CAT[fiche.categorie] || C.orange
  const bg = BG_CAT[fiche.categorie] || '#f5f5f5'

  const handleDownload = async () => {
    await supabase.from('telechargements').insert({
      medecin_id: medecin.id,
      type: 'fiche',
      fiche_id: fiche.id,
      fiche_titre: fiche.titre,
    })
    window.open(fiche.fichier_url, '_blank')
  }

  return (
    <div
      onClick={handleDownload}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 14, minHeight: 90, background: hover ? color : 'rgba(255,255,255,0.55)', backdropFilter: 'blur(12px)', border: `2px solid ${hover ? color : 'rgba(0,30,90,0.12)'}`, borderRadius: 14, padding: '20px 24px', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.22s', boxShadow: hover ? `0 8px 28px ${color}44` : '0 2px 10px rgba(0,0,0,0.06)', transform: hover ? 'translateY(-3px)' : 'none' }}
    >
      <div style={{ width: 54, height: 54, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', background: hover ? 'rgba(255,255,255,0.18)' : bg, transition: 'background 0.22s' }}>
        {fiche.emoji}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.05rem', fontWeight: 700, color: hover ? C.white : C.blue, textTransform: 'uppercase', letterSpacing: '0.03em', transition: 'color 0.22s' }}>
          {fiche.titre}
        </div>
        <div style={{ fontSize: '0.78rem', marginTop: 3, fontWeight: 500, color: hover ? 'rgba(255,255,255,0.85)' : color, transition: 'color 0.22s' }}>
          ↓ Télécharger en PDF
        </div>
      </div>
    </div>
  )
}

function CategorieCard({ cat, count, onClick }) {
  const [hover, setHover] = useState(false)
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', display: 'flex', alignItems: 'center', gap: 14,
        background: hover ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(10px)',
        border: '2px solid transparent', borderLeftWidth: 4, borderLeftColor: cat.color,
        borderRadius: 14, padding: 20, cursor: 'pointer', textAlign: 'left', width: '100%',
        transition: 'all 0.22s', transform: hover ? 'translateY(-3px)' : 'none',
        boxShadow: hover ? '0 8px 24px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ position: 'absolute', top: 10, right: 12, background: cat.color, color: C.white, borderRadius: 20, padding: '2px 10px', fontSize: '0.72rem', fontWeight: 700 }}>
        {count} fiche{count > 1 ? 's' : ''}
      </div>
      <span style={{ fontSize: '2rem', flexShrink: 0 }}>{cat.emoji}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.05rem', fontWeight: 800, color: C.blue, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.2 }}>{cat.label}</div>
        <div style={{ fontSize: '0.75rem', color: C.textSoft, marginTop: 4, lineHeight: 1.4 }}>{cat.description}</div>
      </div>
      <span style={{ fontSize: '1.3rem', color: hover ? cat.color : 'rgba(0,30,90,0.2)', transition: 'all 0.22s', transform: hover ? 'translateX(3px)' : 'none', flexShrink: 0 }}>→</span>
    </button>
  )
}

function Toggle({ vue, setVue }) {
  const btn = (label, value) => {
    const active = vue === value
    return (
      <button onClick={() => setVue(value)}
        style={{ background: active ? C.blue : 'rgba(255,255,255,0.5)', color: active ? C.white : C.blue, border: 'none', borderRadius: 10, padding: '10px 22px', fontSize: '0.9rem', fontWeight: 600, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.04em', cursor: 'pointer', transition: 'all 0.18s' }}
      >{label}</button>
    )
  }
  return (
    <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.3)', borderRadius: 12, padding: 5, gap: 4, marginTop: 16, marginBottom: 20 }}>
      {btn('⊞ Toutes les fiches', 'globale')}
      {btn('≡ Par catégorie', 'categorie')}
    </div>
  )
}

export default function FichesSection({ medecin }) {
  const [vue, setVue] = useState('globale')
  const [categorieActive, setCategorieActive] = useState(null)
  const [fiches, setFiches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!medecin?.id) { setLoading(false); return }
    const charger = async () => {
      const { data, error } = await supabase
        .from('fiches')
        .select('*')
        .eq('medecin_id', medecin.id)
        .eq('actif', true)
        .order('ordre', { ascending: true })
      if (error) console.error('Erreur chargement fiches:', error)
      setFiches(data || [])
      setLoading(false)
    }
    charger()
  }, [medecin?.id])

  const activeCat = CATEGORIES_LOCAL.find(c => c.id === categorieActive)
  const filteredFiches = categorieActive
    ? fiches.filter(f => f.categorie === categorieActive)
    : fiches

  if (loading) {
    return (
      <section style={{ textAlign: 'center', padding: '60px 0' }}>
        <div style={{ fontSize: '1.5rem', color: C.textSoft }}>⏳</div>
        <div style={{ fontSize: '0.88rem', color: C.textSoft, marginTop: 8 }}>Chargement des fiches…</div>
      </section>
    )
  }

  return (
    <section>
      <div style={{ marginTop: 4 }}>
        <SectionTitle title="Mes fiches conseils" sub="Cliquez pour télécharger la fiche en PDF" color={C.orange} />
      </div>

      {fiches.length === 0 ? (
        <div style={{
          background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(12px)',
          borderRadius: 14, padding: '40px 20px', textAlign: 'center',
        }}>
          <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 10 }}>📭</span>
          <div style={{ fontSize: '0.92rem', color: C.textSoft }}>Aucune fiche disponible pour l'instant</div>
        </div>
      ) : (
        <>
          <Toggle vue={vue} setVue={(v) => { setVue(v); setCategorieActive(null) }} />

          {vue === 'globale' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {fiches.map(f => <FicheCard key={f.id} fiche={f} medecin={medecin} />)}
              </div>
              <div style={{ marginTop: 14, background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', borderLeft: `4px solid ${C.blue}`, borderRadius: '0 8px 8px 0', padding: '10px 14px', fontSize: '0.78rem', color: C.blue, lineHeight: 1.5 }}>
                💡 <strong>Conseil :</strong> Les fiches s'ouvrent directement sur votre téléphone. Vous pouvez les enregistrer dans vos fichiers ou les imprimer.
              </div>
            </>
          )}

          {vue === 'categorie' && !categorieActive && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {CATEGORIES_LOCAL.filter(cat => fiches.some(f => f.categorie === cat.id)).map(cat => (
                <CategorieCard key={cat.id} cat={cat}
                  count={fiches.filter(f => f.categorie === cat.id).length}
                  onClick={() => setCategorieActive(cat.id)}
                />
              ))}
            </div>
          )}

          {vue === 'categorie' && categorieActive && activeCat && (
            <>
              <button onClick={() => setCategorieActive(null)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)', border: '1.5px solid #001e5a', borderRadius: 10, padding: '7px 16px', fontSize: '0.8rem', fontWeight: 600, fontFamily: "'Barlow Condensed', sans-serif", color: C.blue, cursor: 'pointer', marginBottom: 18, letterSpacing: '0.04em', textTransform: 'uppercase', transition: 'all 0.18s' }}
                onMouseEnter={e => { e.currentTarget.style.background = C.blue; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.6)'; e.currentTarget.style.color = C.blue }}
              >← Toutes les catégories</button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <span style={{ fontSize: '2rem' }}>{activeCat.emoji}</span>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.4rem', fontWeight: 800, color: activeCat.color, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{activeCat.label}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {filteredFiches.map(f => <FicheCard key={f.id} fiche={f} medecin={medecin} />)}
              </div>
              {filteredFiches.length === 0 && (
                <div style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', borderRadius: 12, padding: '20px 24px', textAlign: 'center', color: C.textSoft, fontSize: '0.88rem' }}>
                  Aucune fiche dans cette catégorie pour le moment.
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  )
}
