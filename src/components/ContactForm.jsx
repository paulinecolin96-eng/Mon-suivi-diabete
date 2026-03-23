import { useState } from 'react'
import { C } from '../constants'
import { supabase } from '../supabase'
import SectionTitle from './SectionTitle'

export default function ContactForm({ medecin }) {
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', question: '' })
  const [focused, setFocused] = useState({})

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const { error } = await supabase.from('questions').insert({
        medecin_id: medecin.id,
        nom_patient: form.nom,
        prenom_patient: form.prenom,
        email_patient: form.email,
        question: form.question,
      })
      if (!error) { setStatus('success'); setForm({ nom: '', prenom: '', email: '', question: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  const inputStyle = name => ({
    width: '100%', padding: '11px 14px',
    border: `1.5px solid ${focused[name] ? C.blue : '#ccc7be'}`,
    borderRadius: 10, fontSize: '0.87rem',
    fontFamily: "'Barlow', sans-serif",
    color: C.blue, background: focused[name] ? C.white : '#f5f1ec',
    outline: 'none', transition: 'all 0.18s',
  })

  const labelStyle = {
    display: 'block', fontSize: '0.75rem', fontWeight: 600,
    color: C.blue, marginBottom: 6,
    textTransform: 'uppercase', letterSpacing: '0.06em',
  }

  return (
    <section>
      <SectionTitle num="3" title="Questions · Réponses" sub="Envoyez votre question — réponse sous 48h" color={C.magenta} />

      <div style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(12px)', borderRadius: 16, border: '1.5px solid rgba(0,30,90,0.12)', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', overflow: 'hidden' }}>

        {/* Bandeau magenta */}
        <div style={{ background: C.magenta, padding: '16px 28px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: '1.5rem' }}>✉️</span>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.05rem', fontWeight: 800, color: C.white, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              POSEZ VOTRE QUESTION
            </div>
            <div style={{ fontSize: '0.73rem', color: 'rgba(255,255,255,0.82)', fontWeight: 300 }}>
              Votre médecin vous répondra par mail dans les 48h ouvrées
            </div>
          </div>
        </div>

        <div style={{ padding: '26px 28px 32px' }}>
          <div style={{ background: '#fff8ec', borderLeft: `4px solid ${C.orange}`, borderRadius: '0 8px 8px 0', padding: '11px 14px', fontSize: '0.77rem', color: '#7a3800', marginBottom: 24, lineHeight: 1.55 }}>
            ⚠️ <strong>Ce formulaire n'est pas destiné aux urgences.</strong> En cas d'urgence médicale, appelez le <strong>15</strong> ou le <strong>112</strong>.
          </div>

          {status === 'success' ? (
            <div style={{ background: '#e8f8ee', border: `1.5px solid ${C.green}`, borderRadius: 12, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, color: C.green }}>
              <span style={{ fontSize: '2rem' }}>✅</span>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase' }}>Question envoyée !</div>
                <div style={{ fontSize: '0.82rem', marginTop: 3 }}>Votre médecin vous répondra dans les 48h ouvrées.</div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
                {[['nom', 'Nom'], ['prenom', 'Prénom']].map(([name, label]) => (
                  <div key={name}>
                    <label style={labelStyle}>{label} <span style={{ color: C.orange }}>*</span></label>
                    <input name={name} value={form[name]} required onChange={handleChange}
                      onFocus={() => setFocused(p => ({ ...p, [name]: true }))}
                      onBlur={() => setFocused(p => ({ ...p, [name]: false }))}
                      style={inputStyle(name)} placeholder={`Votre ${label.toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Adresse email <span style={{ color: C.orange }}>*</span></label>
                <input name="email" type="email" value={form.email} required onChange={handleChange}
                  onFocus={() => setFocused(p => ({ ...p, email: true }))}
                  onBlur={() => setFocused(p => ({ ...p, email: false }))}
                  style={inputStyle('email')} placeholder="votre.adresse@email.fr"
                />
                <div style={{ fontSize: '0.7rem', color: C.textSoft, marginTop: 5 }}>
                  📩 Votre médecin vous répondra directement à cette adresse
                </div>
              </div>

              <div style={{ marginBottom: 22 }}>
                <label style={labelStyle}>Votre question <span style={{ color: C.orange }}>*</span></label>
                <textarea name="question" value={form.question} required rows={5} onChange={handleChange}
                  onFocus={() => setFocused(p => ({ ...p, q: true }))}
                  onBlur={() => setFocused(p => ({ ...p, q: false }))}
                  style={{ ...inputStyle('q'), resize: 'vertical', minHeight: 130 }}
                  placeholder="Décrivez votre question précisément…"
                />
              </div>

              {status === 'error' && (
                <div style={{ background: '#fef0ee', border: `1.5px solid ${C.orange}`, borderRadius: 8, padding: '10px 14px', fontSize: '0.78rem', color: '#8b2000', marginBottom: 16 }}>
                  ❌ Erreur lors de l'envoi. Vérifiez votre connexion et réessayez.
                </div>
              )}

              <button type="submit" disabled={status === 'sending'}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: status === 'sending' ? '#8090b0' : C.blue, color: C.white, border: 'none', padding: '12px 28px', borderRadius: 10, fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', cursor: status === 'sending' ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.background = C.magenta }}
                onMouseLeave={e => { if (status !== 'sending') e.currentTarget.style.background = C.blue }}
              >
                {status === 'sending' ? '⏳ Envoi…' : '✉️ Envoyer ma question'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
