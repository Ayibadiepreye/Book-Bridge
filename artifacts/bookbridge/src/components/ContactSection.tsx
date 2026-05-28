import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Heart, Check, MessageCircle } from 'lucide-react';
import { db, generateTrackingId } from '../lib/firebase';
import { WA_NUMBERS, SOCIALS } from '../lib/social';

type Tab = 'request' | 'donate';

const SUBJECTS = ['English Language', 'Mathematics', 'Integrated Science', 'Social Studies', 'Business Studies', 'Agricultural Science', 'Other'];
const CLASSES = ['JSS 1', 'JSS 2', 'JSS 3'];
const CONDITIONS = ['New', 'Good', 'Fair'];
const WA = WA_NUMBERS[1].number;

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: 10,
  border: '1.5px solid #e8edf8', fontSize: '.88rem', outline: 'none',
  boxSizing: 'border-box', fontFamily: 'inherit', color: '#1a2744',
  transition: 'border-color .2s, box-shadow .2s', background: '#fff',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '.75rem', fontWeight: 700, letterSpacing: .5,
  textTransform: 'uppercase', color: '#6b7a99', marginBottom: 6,
};

export default function ContactSection() {
  const [tab, setTab] = useState<Tab>('request');
  const [reqForm, setReqForm] = useState({ studentName: '', school: '', bookTitle: '', subject: '', class: '', phone: '', email: '', reason: '' });
  const [donForm, setDonForm] = useState({ donorName: '', phone: '', email: '', bookTitle: '', subject: '', quantity: '', condition: 'Good', location: '', message: '' });
  const [reqLoading, setReqLoading] = useState(false);
  const [donLoading, setDonLoading] = useState(false);
  const [reqSuccess, setReqSuccess] = useState<string | null>(null);
  const [donSuccess, setDonSuccess] = useState<string | null>(null);
  const [reqError, setReqError] = useState('');
  const [donError, setDonError] = useState('');

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<Tab>;
      setTab(ce.detail);
      setReqSuccess(null);
      setDonSuccess(null);
    };
    window.addEventListener('bb:setTab', handler);
    return () => window.removeEventListener('bb:setTab', handler);
  }, []);

  function focus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderColor = '#0EA5E9';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(14,165,233,.12)';
  }
  function blur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderColor = '#e8edf8';
    e.currentTarget.style.boxShadow = 'none';
  }

  async function submitRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!reqForm.studentName || !reqForm.phone) { setReqError('Please fill in all required fields.'); return; }
    setReqLoading(true); setReqError('');
    const trackingId = generateTrackingId('REQ');
    const date = new Date().toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' });
    const entry = { ...reqForm, trackingId, status: 'pending', date, createdAt: Date.now() };
    try {
      const database = db();
      if (database) await database.ref('requests').push(entry);
      setReqSuccess(trackingId);
      setReqForm({ studentName: '', school: '', bookTitle: '', subject: '', class: '', phone: '', email: '', reason: '' });
    } catch { setReqError('Submission failed. Please try again or contact us via WhatsApp.'); }
    setReqLoading(false);
  }

  async function submitDonation(e: React.FormEvent) {
    e.preventDefault();
    if (!donForm.donorName || !donForm.phone || !donForm.bookTitle) { setDonError('Please fill in all required fields.'); return; }
    setDonLoading(true); setDonError('');
    const trackingId = generateTrackingId('DON');
    const date = new Date().toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' });
    const entry = { ...donForm, trackingId, status: 'pending', date, createdAt: Date.now() };
    try {
      const database = db();
      if (database) await database.ref('donations').push(entry);
      setDonSuccess(trackingId);
      setDonForm({ donorName: '', phone: '', email: '', bookTitle: '', subject: '', quantity: '', condition: 'Good', location: '', message: '' });
    } catch { setDonError('Submission failed. Please try again or contact us via WhatsApp.'); }
    setDonLoading(false);
  }

  function reqWaLink(trackingId: string) {
    const msg = encodeURIComponent(`Hello BookBridge! I just submitted a book request.\nTracking ID: ${trackingId}\nName: ${reqForm.studentName || 'submitted'}\nPlease confirm receipt. Thank you!`);
    return `https://wa.me/${WA}?text=${msg}`;
  }
  function donWaLink(trackingId: string) {
    const msg = encodeURIComponent(`Hello BookBridge! I just submitted a book donation offer.\nTracking ID: ${trackingId}\nBooks: ${donForm.bookTitle || 'submitted'}\nPlease confirm receipt. Thank you!`);
    return `https://wa.me/${WA}?text=${msg}`;
  }

  return (
    <section id="contact" style={{
      background: 'linear-gradient(160deg,#f0f7ff 0%,#fdf4ff 50%,#f0fff8 100%)',
      padding: '96px 24px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '5%', right: '3%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,0,144,.06) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '5%', left: '2%', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,71,171,.06) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}
          style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg,rgba(255,0,144,.12),rgba(0,71,171,.12))',
            color: '#0047AB', fontWeight: 700, fontSize: '.78rem', letterSpacing: 1.5,
            textTransform: 'uppercase', padding: '5px 14px', borderRadius: 50, marginBottom: 16,
            border: '1px solid rgba(0,71,171,.2)',
          }}>Get Involved</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 700, color: '#0A1628', margin: '0 0 12px' }}>
            Make a Difference Today
          </h2>
          <p style={{ color: '#6b7a99', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Whether you're a student who needs books or a generous donor — we'd love to hear from you.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', background: '#e8edf8', borderRadius: 50, padding: 4, maxWidth: 380, margin: '0 auto 40px', gap: 4 }}>
          {([['request', '📚 Request a Book'], ['donate', '❤️ Donate Books']] as const).map(([key, label]) => (
            <button key={key} onClick={() => { setTab(key); setReqSuccess(null); setDonSuccess(null); }} style={{
              flex: 1, padding: '10px 0', borderRadius: 50, border: 'none', cursor: 'pointer',
              fontWeight: 700, fontSize: '.85rem', transition: 'all .25s',
              background: tab === key ? (key === 'request' ? 'linear-gradient(135deg,#0047AB,#0EA5E9)' : 'linear-gradient(135deg,#FF0090,#7C3AED)') : 'transparent',
              color: tab === key ? '#fff' : '#6b7a99',
              boxShadow: tab === key ? (key === 'request' ? '0 4px 12px rgba(0,71,171,.3)' : '0 4px 12px rgba(255,0,144,.3)') : 'none',
            }}>{label}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }} className="contact-grid">
          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: .3 }}>
              <div style={{ background: 'rgba(255,255,255,.95)', borderRadius: 24, padding: '36px 32px', boxShadow: '0 8px 40px rgba(0,71,171,.09)', border: '1px solid rgba(255,255,255,.9)', backdropFilter: 'blur(12px)' }}>
                {tab === 'request' ? (
                  <>
                    {reqSuccess ? (
                      <div style={{ textAlign: 'center', padding: '12px 0' }}>
                        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(16,185,129,.3)' }}>
                          <Check size={28} color="#fff" />
                        </div>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.7rem', fontWeight: 700, color: '#0A1628', margin: '0 0 8px' }}>Request Submitted!</h3>
                        <p style={{ color: '#6b7a99', marginBottom: 20, lineHeight: 1.6, fontSize: '.9rem' }}>Your book request has been received. We'll be in touch as soon as possible.</p>
                        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '12px 16px', marginBottom: 20 }}>
                          <div style={{ fontSize: '.78rem', color: '#059669', fontWeight: 700, marginBottom: 4 }}>YOUR TRACKING ID</div>
                          <code style={{ fontSize: '1rem', fontWeight: 700, color: '#0A1628', letterSpacing: 1 }}>{reqSuccess}</code>
                        </div>
                        <p style={{ color: '#6b7a99', fontSize: '.82rem', marginBottom: 16 }}>
                          Send us a quick WhatsApp message to speed up processing:
                        </p>
                        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                          <a href={reqWaLink(reqSuccess)} target="_blank" rel="noreferrer" style={{
                            display: 'inline-flex', alignItems: 'center', gap: 7,
                            padding: '11px 20px', borderRadius: 50, textDecoration: 'none',
                            background: '#25D366', color: '#fff', fontWeight: 700, fontSize: '.88rem',
                            boxShadow: '0 6px 16px rgba(37,211,102,.4)',
                          }}>
                            <MessageCircle size={16} /> WhatsApp Us
                          </a>
                          <button onClick={() => setReqSuccess(null)} style={{ padding: '11px 20px', borderRadius: 50, border: '2px solid #e8edf8', cursor: 'pointer', background: '#fff', color: '#6b7a99', fontWeight: 600, fontSize: '.88rem' }}>
                            New Request
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={submitRequest}>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 700, color: '#0A1628', margin: '0 0 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ display: 'inline-flex', width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#0047AB,#0EA5E9)', alignItems: 'center', justifyContent: 'center' }}><BookOpen size={16} color="#fff" /></span>
                          Request a Book
                        </h3>
                        <div style={{ display: 'grid', gap: 16 }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="form-2col">
                            <div><label style={labelStyle}>Student Name *</label><input value={reqForm.studentName} onChange={e => setReqForm(f => ({ ...f, studentName: e.target.value }))} placeholder="Full name" style={inputStyle} onFocus={focus} onBlur={blur} /></div>
                            <div><label style={labelStyle}>School</label><input value={reqForm.school} onChange={e => setReqForm(f => ({ ...f, school: e.target.value }))} placeholder="School name" style={inputStyle} onFocus={focus} onBlur={blur} /></div>
                          </div>
                          <div><label style={labelStyle}>Book Title / Subject Matter</label><input value={reqForm.bookTitle} onChange={e => setReqForm(f => ({ ...f, bookTitle: e.target.value }))} placeholder="e.g. New General Mathematics JSS 2" style={inputStyle} onFocus={focus} onBlur={blur} /></div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="form-2col">
                            <div><label style={labelStyle}>Subject</label><select value={reqForm.subject} onChange={e => setReqForm(f => ({ ...f, subject: e.target.value }))} style={inputStyle} onFocus={focus} onBlur={blur}><option value="">Select…</option>{SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                            <div><label style={labelStyle}>Class</label><select value={reqForm.class} onChange={e => setReqForm(f => ({ ...f, class: e.target.value }))} style={inputStyle} onFocus={focus} onBlur={blur}><option value="">Select…</option>{CLASSES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="form-2col">
                            <div><label style={labelStyle}>WhatsApp / Phone *</label><input value={reqForm.phone} onChange={e => setReqForm(f => ({ ...f, phone: e.target.value }))} placeholder="+234..." style={inputStyle} onFocus={focus} onBlur={blur} /></div>
                            <div><label style={labelStyle}>Email</label><input value={reqForm.email} onChange={e => setReqForm(f => ({ ...f, email: e.target.value }))} placeholder="Optional" style={inputStyle} onFocus={focus} onBlur={blur} /></div>
                          </div>
                          <div><label style={labelStyle}>Why do you need this book?</label><textarea value={reqForm.reason} onChange={e => setReqForm(f => ({ ...f, reason: e.target.value }))} placeholder="Brief explanation…" rows={3} style={{ ...inputStyle, resize: 'vertical' }} onFocus={focus as any} onBlur={blur as any} /></div>
                          {reqError && <p style={{ color: '#ef4444', fontSize: '.83rem', margin: 0 }}>{reqError}</p>}
                          <button type="submit" disabled={reqLoading} style={{ width: '100%', padding: '13px 0', borderRadius: 50, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#0047AB,#0EA5E9)', color: '#fff', fontWeight: 700, fontSize: '.95rem', boxShadow: '0 6px 20px rgba(0,71,171,.35)', opacity: reqLoading ? .6 : 1 }}>{reqLoading ? 'Submitting…' : 'Submit Request'}</button>
                        </div>
                      </form>
                    )}
                  </>
                ) : (
                  <>
                    {donSuccess ? (
                      <div style={{ textAlign: 'center', padding: '12px 0' }}>
                        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#FF0090,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(255,0,144,.3)' }}>
                          <Heart size={28} color="#fff" />
                        </div>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.7rem', fontWeight: 700, color: '#0A1628', margin: '0 0 8px' }}>Thank You!</h3>
                        <p style={{ color: '#6b7a99', marginBottom: 20, lineHeight: 1.6, fontSize: '.9rem' }}>Your donation offer has been received. We'll contact you shortly to arrange collection or drop-off.</p>
                        <div style={{ background: '#fff0f7', border: '1px solid rgba(255,0,144,.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 20 }}>
                          <div style={{ fontSize: '.78rem', color: '#FF0090', fontWeight: 700, marginBottom: 4 }}>YOUR TRACKING ID</div>
                          <code style={{ fontSize: '1rem', fontWeight: 700, color: '#0A1628', letterSpacing: 1 }}>{donSuccess}</code>
                        </div>
                        <p style={{ color: '#6b7a99', fontSize: '.82rem', marginBottom: 16 }}>
                          Send us a WhatsApp message to confirm your donation:
                        </p>
                        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                          <a href={donWaLink(donSuccess)} target="_blank" rel="noreferrer" style={{
                            display: 'inline-flex', alignItems: 'center', gap: 7,
                            padding: '11px 20px', borderRadius: 50, textDecoration: 'none',
                            background: '#25D366', color: '#fff', fontWeight: 700, fontSize: '.88rem',
                            boxShadow: '0 6px 16px rgba(37,211,102,.4)',
                          }}>
                            <MessageCircle size={16} /> WhatsApp Us
                          </a>
                          <button onClick={() => setDonSuccess(null)} style={{ padding: '11px 20px', borderRadius: 50, border: '2px solid #e8edf8', cursor: 'pointer', background: '#fff', color: '#6b7a99', fontWeight: 600, fontSize: '.88rem' }}>
                            New Donation
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={submitDonation}>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 700, color: '#0A1628', margin: '0 0 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ display: 'inline-flex', width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#FF0090,#7C3AED)', alignItems: 'center', justifyContent: 'center' }}><Heart size={16} color="#fff" /></span>
                          Donate Books
                        </h3>
                        <div style={{ display: 'grid', gap: 16 }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="form-2col">
                            <div><label style={labelStyle}>Your Name *</label><input value={donForm.donorName} onChange={e => setDonForm(f => ({ ...f, donorName: e.target.value }))} placeholder="Full name" style={inputStyle} onFocus={focus} onBlur={blur} /></div>
                            <div><label style={labelStyle}>WhatsApp / Phone *</label><input value={donForm.phone} onChange={e => setDonForm(f => ({ ...f, phone: e.target.value }))} placeholder="+234..." style={inputStyle} onFocus={focus} onBlur={blur} /></div>
                          </div>
                          <div><label style={labelStyle}>Book Title / Description *</label><input value={donForm.bookTitle} onChange={e => setDonForm(f => ({ ...f, bookTitle: e.target.value }))} placeholder="e.g. JSS English Textbooks (set of 5)" style={inputStyle} onFocus={focus} onBlur={blur} /></div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }} className="form-3col">
                            <div><label style={labelStyle}>Subject</label><select value={donForm.subject} onChange={e => setDonForm(f => ({ ...f, subject: e.target.value }))} style={inputStyle} onFocus={focus} onBlur={blur}><option value="">Select…</option>{SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                            <div><label style={labelStyle}>Quantity</label><input type="number" min="1" value={donForm.quantity} onChange={e => setDonForm(f => ({ ...f, quantity: e.target.value }))} placeholder="Qty" style={inputStyle} onFocus={focus} onBlur={blur} /></div>
                            <div><label style={labelStyle}>Condition</label><select value={donForm.condition} onChange={e => setDonForm(f => ({ ...f, condition: e.target.value }))} style={inputStyle} onFocus={focus} onBlur={blur}>{CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="form-2col">
                            <div><label style={labelStyle}>Your Location</label><input value={donForm.location} onChange={e => setDonForm(f => ({ ...f, location: e.target.value }))} placeholder="City, State" style={inputStyle} onFocus={focus} onBlur={blur} /></div>
                            <div><label style={labelStyle}>Email</label><input value={donForm.email} onChange={e => setDonForm(f => ({ ...f, email: e.target.value }))} placeholder="Optional" style={inputStyle} onFocus={focus} onBlur={blur} /></div>
                          </div>
                          <div><label style={labelStyle}>Message (optional)</label><textarea value={donForm.message} onChange={e => setDonForm(f => ({ ...f, message: e.target.value }))} placeholder="Any additional details…" rows={2} style={{ ...inputStyle, resize: 'vertical' }} onFocus={focus as any} onBlur={blur as any} /></div>
                          {donError && <p style={{ color: '#ef4444', fontSize: '.83rem', margin: 0 }}>{donError}</p>}
                          <button type="submit" disabled={donLoading} style={{ width: '100%', padding: '13px 0', borderRadius: 50, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#FF0090,#7C3AED)', color: '#fff', fontWeight: 700, fontSize: '.95rem', boxShadow: '0 6px 20px rgba(255,0,144,.3)', opacity: donLoading ? .6 : 1 }}>{donLoading ? 'Submitting…' : 'Offer Donation'}</button>
                        </div>
                      </form>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: 'linear-gradient(135deg,#0A1628,#0047AB)', borderRadius: 20, padding: '28px', boxShadow: '0 12px 40px rgba(0,71,171,.3)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle,rgba(14,165,233,.2) 0%,transparent 70%)' }} />
              <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>💬</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Chat with Us on WhatsApp</h3>
              <p style={{ color: 'rgba(255,255,255,.7)', lineHeight: 1.6, fontSize: '.875rem', marginBottom: 20 }}>Have questions? Our team responds quickly on WhatsApp — reach us directly for faster support.</p>
              <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '12px 20px', borderRadius: 50, textDecoration: 'none',
                background: '#25D366', color: '#fff', fontWeight: 700, fontSize: '.9rem',
                boxShadow: '0 6px 16px rgba(37,211,102,.4)', transition: 'all .25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 24px rgba(37,211,102,.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(37,211,102,.4)'; }}
              ><MessageCircle size={18} /> Open WhatsApp</a>
            </div>

            <div style={{ background: 'rgba(255,255,255,.9)', borderRadius: 20, padding: '24px', boxShadow: '0 4px 24px rgba(0,71,171,.07)', border: '1px solid rgba(0,71,171,.07)', backdropFilter: 'blur(8px)' }}>
              <h4 style={{ fontWeight: 700, color: '#0A1628', margin: '0 0 16px', fontSize: '.95rem' }}>📍 How It Works</h4>
              {[
                ['1', 'Submit your request or donation using the form', '#0047AB'],
                ['2', 'We review your submission within 24–48 hours', '#7C3AED'],
                ['3', 'We coordinate book pickup or delivery logistics', '#0EA5E9'],
                ['4', 'Books reach the students who need them most', '#10B981'],
              ].map(([n, text, color]) => (
                <div key={n} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: 26, height: 26, borderRadius: '50%', background: color as string, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.72rem', fontWeight: 800 }}>{n}</div>
                  <div style={{ color: '#4b5880', fontSize: '.84rem', lineHeight: 1.5, paddingTop: 4 }}>{text}</div>
                </div>
              ))}
            </div>

            <div style={{ background: 'linear-gradient(135deg,#fff0f7,#fce7f3)', border: '1px solid rgba(255,0,144,.15)', borderRadius: 20, padding: '22px' }}>
              <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: 12, fontSize: '.9rem' }}>📞 All Contact Numbers</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {WA_NUMBERS.map(({ number, label }) => (
                  <a key={number} href={`https://wa.me/${number}`} target="_blank" rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0A1628', textDecoration: 'none', fontSize: '.85rem', fontWeight: 600, background: 'rgba(255,255,255,.7)', borderRadius: 8, padding: '8px 12px', transition: 'background .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.7)')}
                  >
                    <span style={{ fontSize: '1rem' }}>💬</span> {label}
                  </a>
                ))}
                <a href={`mailto:${SOCIALS.email}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0A1628', textDecoration: 'none', fontSize: '.85rem', fontWeight: 600, background: 'rgba(255,255,255,.7)', borderRadius: 8, padding: '8px 12px', marginTop: 2, transition: 'background .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.7)')}
                >
                  <span style={{ fontSize: '1rem' }}>✉️</span> {SOCIALS.email}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .contact-grid{ grid-template-columns:1fr !important; }
          .form-2col{ grid-template-columns:1fr !important; }
          .form-3col{ grid-template-columns:1fr 1fr !important; }
        }
        @media(max-width:480px){ .form-3col{ grid-template-columns:1fr !important; } }
      `}</style>
    </section>
  );
}
