import { useState, useEffect } from 'react'
import { C } from '../constants'
import { supabase } from '../supabase'

export default function Dashboard({ goTo, medecin, user }) {
  const [questions, setQuestions] = useState([])
  const [nom, setNom] = useState(medecin?.nom || '')
  const [specialite, setSpecialite] = useState(medecin?.specialite || '')
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [focused, setFocused] = useState({})

  useEffect(() => {
    if (!medecin) return
    supabase
      .from('questions')
      .select('*')
      .eq('medecin_id', medecin.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setQuestions(data) })
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

  const inputStyle = (name) => ({
    width: '100%', padding: '11px 14px',
    border: `1.5px solid ${focused[name] ? '#6b21a8' : '#ccc'}`,
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

  return (
    <div style={{
      minHeight: 'calc(100vh - 66px)',
      background: `
        radial-gradient(ellipse at 80% 0%, #d29678 0%, transparent 45%),
        radial-gradient(ellipse at 0% 100%, #78b4d2 0%, transparent 50%),
        radial-gradient(ellipse at 40% 50%, #d2b496 0%, transparent 55%),
        #ddd8d0
      `,
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>

        {/* SECTION PROFIL */}
        <div style={{
          background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)',
          borderRadius: 16, overflow: 'hidden', marginBottom: 32,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}>
          <div style={{
            background: '#6b21a8', padding: '16px 28px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: '1.3rem' }}>👤</span>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.05rem',
              fontWeight: 800, color: C.white, textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>Mon profil</span>
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
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Code patient</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={medecin.code_patient} readOnly
                  style={{
                    ...inputStyle('code'), flex: 1,
                    background: '#f0f0f0', cursor: 'default',
                    fontWeight: 700, letterSpacing: '0.1em',
                  }}
                />
                <button type="button" onClick={copyCode}
                  style={{
                    padding: '0 18px', background: '#6b21a8', color: C.white,
                    border: 'none', borderRadius: 10, fontSize: '0.82rem',
                    fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    transition: 'background 0.18s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#7c3aed'}
                  onMouseLeave={e => e.currentTarget.style.background = '#6b21a8'}
                >
                  {copied ? '✓ Copié !' : '📋 Copier'}
                </button>
              </div>
              <div style={{ fontSize: '0.72rem', color: C.textSoft, marginTop: 6 }}>
                C'est ce code que vous donnez à vos patients
              </div>
            </div>
            <button type="submit"
              style={{
                padding: '10px 28px', background: '#6b21a8', color: C.white,
                border: 'none', borderRadius: 10,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '0.9rem', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.05em',
                cursor: 'pointer', transition: 'background 0.18s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#7c3aed'}
              onMouseLeave={e => e.currentTarget.style.background = '#6b21a8'}
            >
              {saved ? '✓ Enregistré' : 'Enregistrer'}
            </button>
          </form>
        </div>

        {/* SECTION QUESTIONS */}
        <div style={{
          background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)',
          borderRadius: 16, overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}>
          <div style={{
            background: '#6b21a8', padding: '16px 28px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: '1.3rem' }}>✉️</span>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.05rem',
              fontWeight: 800, color: C.white, textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>Questions reçues</span>
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

          <div style={{ padding: '24px 28px' }}>
            {questions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: C.textSoft }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: 12 }}>📭</span>
                <div style={{ fontSize: '0.92rem' }}>Aucune question reçue pour l'instant</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {questions.map(q => (
                  <QuestionCard key={q.id} question={q} medecin={medecin}
                    onUpdate={(id, reponse) => {
                      setQuestions(prev => prev.map(x =>
                        x.id === id ? { ...x, reponse, repondu: true } : x
                      ))
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

function QuestionCard({ question, medecin, onUpdate }) {
  const [reponse, setReponse] = useState('')
  const [sending, setSending] = useState(false)
  const [focused, setFocused] = useState(false)

  const date = new Date(question.created_at)
  const formatted = date.toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  }) + ' à ' + date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

  const handleReply = async () => {
    const { supabase } = await import('../supabase')
    setSending(true)
    await supabase.from('questions')
      .update({ reponse, repondu: true })
      .eq('id', question.id)

    await supabase.functions.invoke('send-reply', {
      body: {
        email_patient: question.email_patient,
        prenom_patient: question.prenom_patient,
        nom_medecin: medecin.nom,
        reponse,
      }
    })

    onUpdate(question.id, reponse)
    setSending(false)
  }

  return (
    <div style={{
      background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)',
      borderRadius: 14, padding: 20,
      border: '1px solid rgba(0,30,90,0.08)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
        <div>
          <span style={{ fontWeight: 700, color: '#001e5a', fontSize: '0.92rem' }}>
            {question.prenom_patient} {question.nom_patient}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#5a6070', marginLeft: 10 }}>{formatted}</span>
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

      {/* Question */}
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
              border: `1.5px solid ${focused ? '#6b21a8' : '#ccc'}`,
              borderRadius: 10, fontSize: '0.87rem',
              fontFamily: "'Barlow', sans-serif",
              color: '#001e5a', outline: 'none', resize: 'vertical',
              transition: 'border 0.18s', marginBottom: 10,
              boxSizing: 'border-box',
            }}
          />
          <button onClick={handleReply} disabled={sending || !reponse.trim()}
            style={{
              padding: '10px 22px', background: '#6b21a8', color: '#fff',
              border: 'none', borderRadius: 10,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '0.88rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.05em',
              cursor: sending || !reponse.trim() ? 'not-allowed' : 'pointer',
              opacity: !reponse.trim() ? 0.5 : 1,
              transition: 'all 0.18s',
            }}
            onMouseEnter={e => { if (reponse.trim()) e.currentTarget.style.background = '#7c3aed' }}
            onMouseLeave={e => e.currentTarget.style.background = '#6b21a8'}
          >
            {sending ? '⏳ Envoi…' : '✉️ Envoyer la réponse'}
          </button>
        </>
      )}
    </div>
  )
}
