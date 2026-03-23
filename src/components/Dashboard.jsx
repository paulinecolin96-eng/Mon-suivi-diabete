import { useState, useEffect } from 'react'
import { C, FICHES, CATEGORIES } from '../constants'
import { supabase } from '../supabase'

const ORANGE = '#d25a00'
const ORANGE_HOVER = '#a84400'

export default function Dashboard({ goTo, medecin, user }) {
  const [onglet, setOnglet] = useState('dashboard')
  const [questions, setQuestions] = useState([])
  const [telechargements, setTelechargements] = useState([])
  const [nom, setNom] = useState(medecin?.nom || '')
  const [specialite, setSpecialite] = useState(medecin?.specialite || '')
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [focused, setFocused] = useState({})
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    if (!medecin) return
    supabase.from('questions').select('*').eq('medecin_id', medecin.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setQuestions(data) })
    supabase.from('telechargements').select('*').eq('medecin_id', medecin.id)
      .then(({ data }) => { if (data) setTelechargements(data) })
  }, [medecin])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    goTo('home')
  }

  const handleSaveProfil = async (e) => {
    e.preventDefault()
    await supabase.from('medecins')
      .update({ nom, specialite })
      .eq('id', medecin.id)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(medecin.code_patient)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const nonRepondues = questions.filter(q => !q.repondu).length
  const repondues = questions.filter(q => q.repondu).length

  const inputStyle = (name) => ({
    width: '100%', padding: '11px 14px',
    border: `1.5px solid ${focused[name] ? ORANGE : '#ccc'}`,
    borderRadius: 10, fontSize: '0.87rem',
    fontFamily: "'Barlow', sans-serif",
    color: C.blue, outline: 'none',
    transition: 'border 0.18s', boxSizing: 'border-box',
  })

  const labelStyle = {
    display: 'block', fontSize: '0.75rem', fontWeight: 600,
    color: C.blue, marginBottom: 6,
    textTransform: 'uppercase', letterSpacing: '0.06em',
  }

  if (!medecin) return null

  const tabs = [
    { key: 'dashboard', label: '📊 Tableau de bord' },
    { key: 'fiches', label: '📁 Mes fiches' },
    { key: 'parametres', label: '⚙️ Paramètres' },
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* NavBar orange */}
      <header style={{ background: ORANGE, position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 3px 18px rgba(0,0,0,0.25)' }}>
        <div style={{ maxWidth: 920, margin: '0 auto', padding: '13px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 8, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.1rem', fontWeight: 800, color: C.white, letterSpacing: '0.05em', textTransform: 'uppercase', lineHeight: 1.1 }}>
              Espace Praticien
            </div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
              {medecin.nom}
            </div>
          </div>
          <nav style={{ display: 'flex', gap: 4 }}>
            {tabs.map(t => {
              const active = onglet === t.key
              return (
                <button key={t.key} onClick={() => setOnglet(t.key)}
                  style={{
                    background: active ? 'rgba(255,255,255,0.2)' : 'transparent',
                    color: active ? C.white : 'rgba(255,255,255,0.65)',
                    border: 'none', borderRadius: 8,
                    padding: '6px 14px', fontSize: '0.76rem',
                    fontWeight: active ? 700 : 500,
                    letterSpacing: '0.04em',
                    cursor: 'pointer', transition: 'all 0.18s',
                    fontFamily: "'Barlow', sans-serif", whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = C.white }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
                >
                  {t.label}
                </button>
              )
            })}
          </nav>
          <button onClick={handleLogout}
            style={{
              background: 'rgba(255,255,255,0.15)', color: C.white,
              border: 'none', borderRadius: 8, padding: '6px 14px',
              fontSize: '0.74rem', fontWeight: 600, cursor: 'pointer',
              fontFamily: "'Barlow Condensed', sans-serif",
              transition: 'background 0.18s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* Contenu */}
      <div style={{
        flex: 1,
        background: 'radial-gradient(ellipse at 85% 5%, #d29678 0%, transparent 40%), radial-gradient(ellipse at 5% 90%, #78b4d2 0%, transparent 45%), radial-gradient(ellipse at 50% 50%, #d2b496 0%, transparent 60%), #ddd8d0',
        padding: '40px 20px',
      }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>

          {/* ONGLET DASHBOARD */}
          {onglet === 'dashboard' && (
            <>
              {/* Bienvenue */}
              <div style={{ marginBottom: 28 }}>
                <h2 style={{
                  fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.8rem',
                  fontWeight: 800, color: C.blue, marginBottom: 4,
                }}>
                  Bonjour {medecin.nom} 👋
                </h2>
                <p style={{ color: C.textSoft, fontSize: '0.9rem' }}>
                  Voici un résumé de votre activité
                </p>
              </div>

              {/* Stats Questions */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, marginBottom: 24 }}>
                {[
                  { label: 'Questions', value: questions.length, bg: C.blue },
                  { label: 'Non répondues', value: nonRepondues, bg: '#cc0000' },
                  { label: 'Répondues', value: repondues, bg: '#00783c' },
                ].map(s => (
                  <div key={s.label} style={{ background: s.bg, borderRadius: 14, padding: 20, textAlign: 'center', color: '#fff' }}>
                    <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: "'Barlow Condensed', sans-serif" }}>{s.value}</div>
                    <div style={{ fontSize: '0.78rem', marginTop: 4, opacity: 0.85 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Stats Téléchargements — card compacte */}
              {(() => {
                const totalFiches = telechargements.filter(t => t.type === 'fiche').length
                const totalLivret = telechargements.filter(t => t.type === 'livret').length
                const totalTableau = telechargements.filter(t => t.type === 'tableau_bord').length
                const parFiche = telechargements.filter(t => t.type === 'fiche').reduce((acc, t) => {
                  acc[t.fiche_titre] = (acc[t.fiche_titre] || 0) + 1; return acc
                }, {})
                const top3 = Object.entries(parFiche).sort((a, b) => b[1] - a[1]).slice(0, 3)

                const stats = [
                  { label: 'télécharg.', value: telechargements.length, color: C.blue },
                  { label: 'fiches', value: totalFiches, color: ORANGE },
                  { label: 'livret', value: totalLivret, color: '#1e5af0' },
                  { label: 'tableau', value: totalTableau, color: '#00783c' },
                ]

                return (
                  <div style={{
                    background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(12px)',
                    borderRadius: 16, padding: '20px 24px',
                    border: '1.5px solid rgba(255,255,255,0.8)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.07)', marginBottom: 24,
                  }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1rem', fontWeight: 700, color: C.blue, marginBottom: 16 }}>
                      📊 Statistiques
                    </div>

                    {telechargements.length === 0 ? (
                      <div style={{ fontSize: '0.8rem', color: C.textSoft, textAlign: 'center', padding: '8px 0' }}>
                        Aucun téléchargement enregistré pour l'instant
                      </div>
                    ) : (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                          {stats.map((s, i) => (
                            <div key={s.label} style={{ display: 'flex', alignItems: 'center' }}>
                              <div style={{ textAlign: 'center', padding: '0 12px' }}>
                                <div style={{ fontSize: '1.8rem', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, color: s.color }}>{s.value}</div>
                                <div style={{ fontSize: '0.7rem', color: C.textSoft, fontWeight: 400 }}>{s.label}</div>
                              </div>
                              {i < stats.length - 1 && (
                                <div style={{ width: 1, height: 36, background: 'rgba(0,0,0,0.1)', flexShrink: 0 }} />
                              )}
                            </div>
                          ))}
                        </div>

                        {top3.length > 0 && (
                          <>
                            <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', margin: '14px 0' }} />
                            <div style={{ fontSize: '0.75rem', color: C.textSoft }}>
                              🏆 Top fiches : {top3.map(([titre, count]) => `${titre} (${count})`).join(' · ')}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                )
              })()}

              {/* Questions récentes */}
              <div style={{
                background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)',
                borderRadius: 16, overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              }}>
                <div style={{
                  background: ORANGE, padding: '16px 28px',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <span style={{ fontSize: '1.3rem' }}>✉️</span>
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.05rem',
                    fontWeight: 800, color: C.white, textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>Questions récentes</span>
                  {nonRepondues > 0 && (
                    <span style={{
                      background: '#cc0000', color: C.white,
                      borderRadius: 20, padding: '2px 10px',
                      fontSize: '0.75rem', fontWeight: 700, marginLeft: 4,
                    }}>
                      {nonRepondues}
                    </span>
                  )}
                </div>
                <div style={{ padding: '20px 28px' }}>
                  {questions.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: C.textSoft }}>
                      <span style={{ fontSize: '3rem', display: 'block', marginBottom: 12 }}>📭</span>
                      <div style={{ fontSize: '0.92rem' }}>Aucune question reçue pour l'instant</div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {questions.slice(0, 5).map(q => (
                        <QuestionPreview key={q.id} question={q} medecin={medecin}
                          expanded={expandedId === q.id}
                          onToggle={() => setExpandedId(expandedId === q.id ? null : q.id)}
                          onUpdate={(id, rep) => {
                            setQuestions(prev => prev.map(x =>
                              x.id === id ? { ...x, reponse: rep, repondu: true } : x
                            ))
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ONGLET MES FICHES */}
          {onglet === 'fiches' && (
            <FichesOnglet medecin={medecin} />
          )}

          {/* ONGLET PARAMÈTRES */}
          {onglet === 'parametres' && (
            <>
              {/* Card Mon profil */}
              <div style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)', borderRadius: 16, overflow: 'hidden', marginBottom: 20, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                <div style={{ background: ORANGE, padding: '16px 28px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: '1.3rem' }}>👤</span>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.05rem', fontWeight: 800, color: C.white, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mon profil</span>
                </div>
                <form onSubmit={handleSaveProfil} style={{ padding: '24px 28px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={labelStyle}>Nom affiché</label>
                      <input value={nom} onChange={e => setNom(e.target.value)}
                        onFocus={() => setFocused(p => ({ ...p, nom: true }))}
                        onBlur={() => setFocused(p => ({ ...p, nom: false }))}
                        style={inputStyle('nom')} placeholder="Dr. Jean Dupont"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Spécialité</label>
                      <input value={specialite} onChange={e => setSpecialite(e.target.value)}
                        onFocus={() => setFocused(p => ({ ...p, spe: true }))}
                        onBlur={() => setFocused(p => ({ ...p, spe: false }))}
                        style={inputStyle('spe')} placeholder="Médecin généraliste"
                      />
                    </div>
                  </div>
                  <button type="submit"
                    style={{ padding: '10px 28px', background: ORANGE, color: C.white, border: 'none', borderRadius: 10, fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', transition: 'background 0.18s' }}
                    onMouseEnter={e => e.currentTarget.style.background = ORANGE_HOVER}
                    onMouseLeave={e => e.currentTarget.style.background = ORANGE}
                  >
                    {saved ? '✓ Enregistré' : 'Enregistrer'}
                  </button>
                  {saved && <span style={{ marginLeft: 14, fontSize: '0.85rem', color: '#00783c', fontWeight: 600 }}>✅ Profil mis à jour !</span>}
                </form>
              </div>

              {/* Card Mon code patient */}
              <div style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)', borderRadius: 16, padding: 28, marginBottom: 20, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.85rem', fontWeight: 700, color: C.textSoft, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                  Mon code patient
                </div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2rem', fontWeight: 800, color: ORANGE, letterSpacing: '0.12em', marginBottom: 10 }}>
                  {medecin.code_patient}
                </div>
                <p style={{ fontSize: '0.82rem', color: C.textSoft, marginBottom: 16, lineHeight: 1.5 }}>
                  Donnez ce code à vos patients pour qu'ils accèdent à votre espace
                </p>
                <button onClick={copyCode}
                  style={{ padding: '10px 24px', background: ORANGE, color: C.white, border: 'none', borderRadius: 10, fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', transition: 'background 0.18s' }}
                  onMouseEnter={e => e.currentTarget.style.background = ORANGE_HOVER}
                  onMouseLeave={e => e.currentTarget.style.background = ORANGE}
                >
                  {copied ? '✓ Copié !' : '📋 Copier le code'}
                </button>
              </div>

              {/* Card Compte */}
              <div style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)', borderRadius: 16, padding: 28, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.05rem', fontWeight: 800, color: C.blue, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>
                  Compte
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>Email</label>
                  <input value={user?.email || medecin.email} readOnly
                    style={{ ...inputStyle('emailro'), background: '#f0f0f0', cursor: 'default' }}
                  />
                </div>
                <button onClick={handleLogout}
                  style={{ padding: '10px 24px', background: '#cc0000', color: C.white, border: 'none', borderRadius: 10, fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', transition: 'background 0.18s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#a00000'}
                  onMouseLeave={e => e.currentTarget.style.background = '#cc0000'}
                >
                  Se déconnecter
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

function FichesOnglet({ medecin }) {
  const [fiches, setFiches] = useState([])
  const [nouvelleFiche, setNouvelleFiche] = useState({ titre: '', categorie: '', emoji: '📄', fichier: null })
  const [uploading, setUploading] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({})
  const [focused, setFocused] = useState({})

  const emojis = ['📄', '🥗', '🏃', '💊', '📊', '⚠️', '🔍', '🌍', '💉', '🩺', '❤️', '🧬']

  const chargerFiches = async () => {
    const { data } = await supabase
      .from('fiches').select('*')
      .eq('medecin_id', medecin.id).eq('actif', true)
      .order('categorie', { ascending: true })
    setFiches(data || [])
  }

  useEffect(() => { chargerFiches() }, [])

  const handleUpload = async () => {
    if (!nouvelleFiche.titre || !nouvelleFiche.categorie || !nouvelleFiche.fichier) return
    setUploading(true)
    const fichier = nouvelleFiche.fichier
    const fileName = `${medecin.id}/${Date.now()}_${fichier.name}`
    const { error: uploadError } = await supabase.storage.from('fiches').upload(fileName, fichier)
    if (uploadError) { setUploading(false); return }
    const { data: { publicUrl } } = supabase.storage.from('fiches').getPublicUrl(fileName)
    await supabase.from('fiches').insert({
      medecin_id: medecin.id, titre: nouvelleFiche.titre,
      categorie: nouvelleFiche.categorie, emoji: nouvelleFiche.emoji, fichier_url: publicUrl,
    })
    setUploading(false); chargerFiches()
    setNouvelleFiche({ titre: '', categorie: '', emoji: '📄', fichier: null })
  }

  const handleSupprimer = async (id) => {
    await supabase.from('fiches').update({ actif: false }).eq('id', id)
    chargerFiches()
  }

  const startEdit = (f) => {
    setEditId(f.id)
    setEditData({ titre: f.titre, categorie: f.categorie, emoji: f.emoji })
  }

  const handleSaveEdit = async (id) => {
    await supabase.from('fiches').update({
      titre: editData.titre, categorie: editData.categorie, emoji: editData.emoji,
    }).eq('id', id)
    setEditId(null); chargerFiches()
  }

  const handleReplacePdf = async (id, file) => {
    const fileName = `${medecin.id}/${Date.now()}_${file.name}`
    const { error } = await supabase.storage.from('fiches').upload(fileName, file)
    if (error) return
    const { data: { publicUrl } } = supabase.storage.from('fiches').getPublicUrl(fileName)
    await supabase.from('fiches').update({ fichier_url: publicUrl }).eq('id', id)
    chargerFiches()
  }

  const inputStyle = (name) => ({
    width: '100%', padding: '11px 14px',
    border: `1.5px solid ${focused[name] ? ORANGE : '#ccc'}`,
    borderRadius: 10, fontSize: '0.87rem', fontFamily: "'Barlow', sans-serif",
    color: '#001e5a', outline: 'none', transition: 'border 0.18s', boxSizing: 'border-box',
  })

  const fichesParCategorie = CATEGORIES.filter(cat =>
    fiches.some(f => f.categorie === cat.id)
  ).map(cat => ({ ...cat, fiches: fiches.filter(f => f.categorie === cat.id) }))

  const selectStyle = { padding: '6px 8px', border: '1.5px solid #ccc', borderRadius: 8, fontSize: '0.8rem', fontFamily: "'Barlow', sans-serif", color: '#001e5a', outline: 'none', appearance: 'auto', cursor: 'pointer' }

  return (
    <>
      {/* Fiches existantes */}
      <div style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)', borderRadius: 16, overflow: 'hidden', marginBottom: 20, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <div style={{ background: ORANGE, padding: '16px 28px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: '1.3rem' }}>📁</span>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.05rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mes fiches</span>
          <span style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', borderRadius: 20, padding: '2px 10px', fontSize: '0.75rem', fontWeight: 700 }}>{fiches.length}</span>
        </div>
        <div style={{ padding: '20px 28px' }}>
          {fiches.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 0', color: '#5a6070' }}>
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 10 }}>📭</span>
              <div style={{ fontSize: '0.88rem' }}>Aucune fiche ajoutée pour le moment</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {fichesParCategorie.map(cat => (
                <div key={cat.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: '1.2rem' }}>{cat.emoji}</span>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.92rem', fontWeight: 800, color: '#001e5a', textTransform: 'uppercase' }}>{cat.label}</span>
                    <span style={{ background: cat.color, color: '#fff', borderRadius: 20, padding: '2px 10px', fontSize: '0.68rem', fontWeight: 700 }}>{cat.fiches.length}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {cat.fiches.map(f => editId === f.id ? (
                      /* Mode édition */
                      <div key={f.id} style={{ background: 'rgba(255,255,255,0.85)', borderRadius: 10, padding: 14, border: `2px solid ${ORANGE}` }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 10, marginBottom: 10, alignItems: 'center' }}>
                          <input value={editData.titre} onChange={e => setEditData(p => ({ ...p, titre: e.target.value }))}
                            style={{ padding: '8px 12px', border: '1.5px solid #ccc', borderRadius: 8, fontSize: '0.85rem', fontFamily: "'Barlow', sans-serif", color: '#001e5a', outline: 'none', boxSizing: 'border-box' }}
                          />
                          <select value={editData.categorie} onChange={e => setEditData(p => ({ ...p, categorie: e.target.value }))} style={selectStyle}>
                            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
                          </select>
                          <select value={editData.emoji} onChange={e => setEditData(p => ({ ...p, emoji: e.target.value }))} style={{ ...selectStyle, width: 56, textAlign: 'center', fontSize: '1.1rem' }}>
                            {emojis.map(e => <option key={e} value={e}>{e}</option>)}
                          </select>
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                          <button onClick={() => handleSaveEdit(f.id)}
                            style={{ padding: '6px 16px', background: ORANGE, color: '#fff', border: 'none', borderRadius: 8, fontSize: '0.78rem', fontWeight: 700, fontFamily: "'Barlow Condensed', sans-serif", cursor: 'pointer' }}
                          >✓ Enregistrer</button>
                          <button onClick={() => setEditId(null)}
                            style={{ padding: '6px 16px', background: '#eee', color: '#5a6070', border: 'none', borderRadius: 8, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
                          >Annuler</button>
                          <label style={{ padding: '6px 16px', background: '#1e5af0', color: '#fff', borderRadius: 8, fontSize: '0.78rem', fontWeight: 700, fontFamily: "'Barlow Condensed', sans-serif", cursor: 'pointer' }}>
                            📎 Remplacer PDF
                            <input type="file" accept=".pdf" style={{ display: 'none' }}
                              onChange={e => { const file = e.target.files?.[0]; if (file) { handleReplacePdf(f.id, file); setEditId(null) } }}
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      /* Mode lecture */
                      <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.6)', borderRadius: 10, padding: '10px 14px', border: '1px solid rgba(0,30,90,0.06)' }}>
                        <span style={{ fontSize: '1.1rem' }}>{f.emoji}</span>
                        <div style={{ flex: 1, fontSize: '0.86rem', fontWeight: 600, color: '#001e5a' }}>{f.titre}</div>
                        <button onClick={() => startEdit(f)}
                          style={{ fontSize: '0.74rem', color: ORANGE, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                        >✏️ Modifier</button>
                        <a href={f.fichier_url} target="_blank" rel="noreferrer"
                          style={{ fontSize: '0.74rem', color: '#1e5af0', textDecoration: 'none', fontWeight: 600, cursor: 'pointer' }}
                        >🔗 Voir</a>
                        <button onClick={() => handleSupprimer(f.id)}
                          style={{ fontSize: '0.74rem', color: '#cc0000', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                        >🗑️</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Ajouter une fiche */}
      <div style={{ border: `2px dashed ${ORANGE}`, borderRadius: 14, padding: 24, background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)' }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.05rem', fontWeight: 800, color: '#001e5a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 18 }}>
          Ajouter une fiche
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#001e5a', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Titre de la fiche</label>
          <input value={nouvelleFiche.titre} onChange={e => setNouvelleFiche(p => ({ ...p, titre: e.target.value }))}
            onFocus={() => setFocused(p => ({ ...p, titre: true }))} onBlur={() => setFocused(p => ({ ...p, titre: false }))}
            style={inputStyle('titre')} placeholder="Ex: Alimentation & glucides"
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 14, marginBottom: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#001e5a', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Catégorie</label>
            <select value={nouvelleFiche.categorie} onChange={e => setNouvelleFiche(p => ({ ...p, categorie: e.target.value }))} style={{ ...inputStyle('cat'), cursor: 'pointer', appearance: 'auto' }}>
              <option value="">Choisir une catégorie</option>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#001e5a', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Emoji</label>
            <select value={nouvelleFiche.emoji} onChange={e => setNouvelleFiche(p => ({ ...p, emoji: e.target.value }))} style={{ ...inputStyle('emoji'), cursor: 'pointer', appearance: 'auto', width: 70, textAlign: 'center', fontSize: '1.2rem' }}>
              {emojis.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#001e5a', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Fichier PDF (max 10MB)</label>
          <div onClick={() => document.getElementById('pdf-input')?.click()}
            style={{ border: '2px dashed #ccc', borderRadius: 10, padding: '20px 16px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', background: nouvelleFiche.fichier ? 'rgba(0,120,60,0.05)' : 'transparent', borderColor: nouvelleFiche.fichier ? '#00783c' : '#ccc' }}
          >
            {nouvelleFiche.fichier
              ? <div style={{ fontSize: '0.85rem', color: '#00783c', fontWeight: 600 }}>📎 {nouvelleFiche.fichier.name}</div>
              : <div style={{ fontSize: '0.85rem', color: '#5a6070' }}>📄 Cliquez pour sélectionner un PDF</div>
            }
            <input id="pdf-input" type="file" accept=".pdf" style={{ display: 'none' }}
              onChange={e => { const f = e.target.files?.[0]; if (f && f.size <= 10 * 1024 * 1024) setNouvelleFiche(p => ({ ...p, fichier: f })) }}
            />
          </div>
        </div>
        <button onClick={handleUpload}
          disabled={uploading || !nouvelleFiche.titre || !nouvelleFiche.categorie || !nouvelleFiche.fichier}
          style={{ width: '100%', padding: 12, background: ORANGE, color: '#fff', border: 'none', borderRadius: 10, fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: uploading ? 'not-allowed' : 'pointer', opacity: (!nouvelleFiche.titre || !nouvelleFiche.categorie || !nouvelleFiche.fichier) ? 0.5 : 1, transition: 'all 0.18s' }}
          onMouseEnter={e => { if (!uploading) e.currentTarget.style.background = ORANGE_HOVER }}
          onMouseLeave={e => e.currentTarget.style.background = ORANGE}
        >
          {uploading ? '⏳ Upload en cours…' : 'Ajouter la fiche'}
        </button>
      </div>
    </>
  )
}

function QuestionPreview({ question, medecin, expanded, onToggle, onUpdate }) {
  const [reponse, setReponse] = useState('')
  const [sending, setSending] = useState(false)
  const [focused, setFocused] = useState(false)

  const date = new Date(question.created_at)
  const formatted = date.toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  }) + ' à ' + date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

  const apercu = question.question.length > 50
    ? question.question.substring(0, 50) + '...'
    : question.question

  const handleReply = async () => {
    setSending(true)
    await supabase.from('questions')
      .update({ reponse, repondu: true })
      .eq('id', question.id)

    await supabase.functions.invoke('send-reply', {
      body: JSON.stringify({
        email_patient: question.email_patient,
        prenom_patient: question.prenom_patient,
        nom_medecin: medecin.nom,
        reponse,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    onUpdate(question.id, reponse)
    setSending(false)
  }

  return (
    <div style={{
      background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)',
      borderRadius: 14, padding: 20,
      border: '1px solid rgba(0,30,90,0.08)',
      transition: 'all 0.2s',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <div>
          <span style={{ fontWeight: 700, color: C.blue, fontSize: '0.92rem' }}>
            {question.prenom_patient} {question.nom_patient}
          </span>
          <span style={{ fontSize: '0.75rem', color: C.textSoft, marginLeft: 10 }}>{formatted}</span>
        </div>
        <span style={{
          fontSize: '0.72rem', fontWeight: 700, padding: '3px 12px',
          borderRadius: 20,
          background: question.repondu ? '#e8f8ee' : '#fff0f0',
          color: question.repondu ? '#00783c' : '#cc0000',
        }}>
          {question.repondu ? 'Répondu' : 'Non répondu'}
        </span>
      </div>

      {/* Aperçu ou contenu complet */}
      {!expanded ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, gap: 12 }}>
          <p style={{ fontSize: '0.84rem', color: C.textSoft, margin: 0, flex: 1 }}>{apercu}</p>
          <button onClick={onToggle}
            style={{
              background: ORANGE, color: C.white, border: 'none', borderRadius: 8,
              padding: '6px 14px', fontSize: '0.76rem', fontWeight: 700,
              fontFamily: "'Barlow Condensed', sans-serif", cursor: 'pointer',
              whiteSpace: 'nowrap', transition: 'background 0.18s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = ORANGE_HOVER}
            onMouseLeave={e => e.currentTarget.style.background = ORANGE}
          >
            Voir & répondre →
          </button>
        </div>
      ) : (
        <div style={{ marginTop: 14 }}>
          {/* Question complète */}
          <div style={{
            background: '#f0f4ff', borderLeft: '4px solid #001e5a',
            borderRadius: '0 8px 8px 0', padding: 14,
            fontSize: '0.85rem', color: '#001e5a', lineHeight: 1.6,
            marginBottom: 14,
          }}>
            {question.question}
          </div>

          {/* Réponse ou formulaire */}
          {question.repondu ? (
            <div style={{
              background: '#e8f8ee', borderLeft: '4px solid #00783c',
              borderRadius: '0 8px 8px 0', padding: 14,
              fontSize: '0.85rem', color: '#00783c', lineHeight: 1.6,
              marginBottom: 10,
            }}>
              <strong>Votre réponse :</strong><br />{question.reponse}
            </div>
          ) : (
            <>
              <textarea
                value={reponse}
                onChange={e => setReponse(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Votre réponse…"
                rows={4}
                style={{
                  width: '100%', padding: '11px 14px',
                  border: `1.5px solid ${focused ? ORANGE : '#ccc'}`,
                  borderRadius: 10, fontSize: '0.87rem',
                  fontFamily: "'Barlow', sans-serif",
                  color: '#001e5a', outline: 'none', resize: 'vertical',
                  transition: 'border 0.18s', marginBottom: 10,
                  boxSizing: 'border-box',
                }}
              />
              <button onClick={handleReply} disabled={sending || !reponse.trim()}
                style={{
                  padding: '10px 22px', background: ORANGE, color: '#fff',
                  border: 'none', borderRadius: 10,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '0.88rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                  cursor: sending || !reponse.trim() ? 'not-allowed' : 'pointer',
                  opacity: !reponse.trim() ? 0.5 : 1,
                  transition: 'all 0.18s',
                }}
                onMouseEnter={e => { if (reponse.trim()) e.currentTarget.style.background = ORANGE_HOVER }}
                onMouseLeave={e => e.currentTarget.style.background = ORANGE}
              >
                {sending ? '⏳ Envoi…' : '✉️ Envoyer la réponse'}
              </button>
            </>
          )}

          <button onClick={onToggle}
            style={{
              background: 'none', border: 'none', color: C.textSoft,
              fontSize: '0.78rem', cursor: 'pointer', marginTop: 8,
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            ← Réduire
          </button>
        </div>
      )}
    </div>
  )
}
