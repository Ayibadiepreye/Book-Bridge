import { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { LOGO } from '../lib/images';
import { db } from '../lib/firebase';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#subjects', label: 'Subjects' },
  { href: '#contact', label: 'Get Involved' },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', fn, { passive: true });
    return () => window.removeEventListener('resize', fn);
  }, []);
  return isMobile;
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);
  const [trackId, setTrackId] = useState('');
  const [trackResult, setTrackResult] = useState<any>(null);
  const [trackLoading, setTrackLoading] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  async function handleTrack() {
    const id = trackId.trim();
    if (!id) return;
    setTrackLoading(true);
    setTrackResult(null);
    try {
      const database = db();
      if (!database) { setTrackResult({ error: true }); setTrackLoading(false); return; }
      const reqSnap = await database.ref('requests').orderByChild('trackingId').equalTo(id).once('value');
      const reqData = reqSnap.val();
      if (reqData) {
        setTrackResult({ type: 'request', ...Object.values(reqData)[0] as any });
      } else {
        const donSnap = await database.ref('donations').orderByChild('trackingId').equalTo(id).once('value');
        const donData = donSnap.val();
        if (donData) setTrackResult({ type: 'donation', ...Object.values(donData)[0] as any });
        else setTrackResult({ notFound: true });
      }
    } catch { setTrackResult({ error: true }); }
    setTrackLoading(false);
  }

  const isTransparent = !scrolled && !isMobile;
  const textColor = isTransparent ? '#ffffff' : '#0A1628';

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled || isMobile ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled || isMobile ? 'blur(20px)' : 'none',
        borderBottom: scrolled || isMobile ? '1px solid rgba(0,71,171,.08)' : 'none',
        boxShadow: scrolled || isMobile ? '0 2px 24px rgba(0,71,171,.10)' : 'none',
        transition: 'all .35s ease',
        padding: '0 20px', height: 64,
        display: 'flex', alignItems: 'center',
      }}>
        <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src={LOGO} alt="BookBridge" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover', border: '2px solid rgba(0,71,171,.2)' }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? '1.1rem' : '1.35rem', fontWeight: 700, color: isMobile ? '#0A1628' : (isTransparent ? '#fff' : '#0A1628'), transition: 'color .3s' }}>
              Project BookBridge
            </span>
          </a>

          {/* Desktop nav */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} style={{
                  padding: '7px 14px', borderRadius: 8, textDecoration: 'none',
                  color: textColor, fontWeight: 500, fontSize: '.88rem',
                  transition: 'all .2s', opacity: .85,
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = isTransparent ? 'rgba(255,255,255,.15)' : '#f0f4ff'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '.85'; e.currentTarget.style.background = 'transparent'; }}
                >{l.label}</a>
              ))}
              <button onClick={() => setTrackOpen(true)} style={{
                padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: 'transparent', color: textColor, fontWeight: 500, fontSize: '.88rem',
                transition: 'all .2s', opacity: .85, display: 'flex', alignItems: 'center', gap: 5,
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = isTransparent ? 'rgba(255,255,255,.15)' : '#f0f4ff'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '.85'; e.currentTarget.style.background = 'transparent'; }}
              ><Search size={14} /> Track</button>
              <a href="#contact" style={{
                marginLeft: 6, padding: '9px 22px', borderRadius: 50, textDecoration: 'none',
                background: 'linear-gradient(135deg, #FF0090 0%, #0047AB 50%, #0EA5E9 100%)',
                color: '#fff', fontWeight: 700, fontSize: '.88rem',
                boxShadow: '0 4px 14px rgba(0,71,171,.45)', transition: 'all .25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(0,71,171,.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,71,171,.45)'; }}
              >Donate Now</a>
            </div>
          )}

          {/* Hamburger (mobile only) */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#0A1628', padding: 6, borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile dropdown */}
      {isMobile && menuOpen && (
        <>
          {/* Backdrop */}
          <div onClick={() => setMenuOpen(false)} style={{
            position: 'fixed', inset: 0, zIndex: 998,
            background: 'rgba(10,22,40,.4)', backdropFilter: 'blur(4px)',
          }} />
          {/* Menu */}
          <div style={{
            position: 'fixed', top: 64, left: 0, right: 0, zIndex: 999,
            background: '#fff', borderBottom: '1px solid #e8edf8',
            boxShadow: '0 12px 40px rgba(0,71,171,.12)',
            padding: '8px 20px 24px',
          }}>
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
                display: 'flex', alignItems: 'center', padding: '14px 8px',
                color: '#0A1628', textDecoration: 'none',
                fontWeight: 600, borderBottom: '1px solid #f0f4ff', fontSize: '.97rem',
                gap: 10,
              }}>{l.label}</a>
            ))}
            <button onClick={() => { setMenuOpen(false); setTrackOpen(true); }} style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%',
              padding: '14px 8px', background: 'none', border: 'none', borderBottom: '1px solid #f0f4ff',
              color: '#0A1628', fontWeight: 600, fontSize: '.97rem', cursor: 'pointer', textAlign: 'left',
            }}><Search size={16} /> Track My Request</button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
              <button onClick={() => { setMenuOpen(false); window.dispatchEvent(new CustomEvent('bb:setTab', { detail: 'request' })); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} style={{
                padding: '12px 0', borderRadius: 50, border: '2px solid #0047AB',
                background: 'transparent', color: '#0047AB', fontWeight: 700, fontSize: '.88rem', cursor: 'pointer',
              }}>📚 Request</button>
              <a href="#contact" onClick={() => { setMenuOpen(false); window.dispatchEvent(new CustomEvent('bb:setTab', { detail: 'donate' })); }} style={{
                display: 'block', padding: '12px 0', textAlign: 'center',
                background: 'linear-gradient(135deg, #FF0090, #0047AB)',
                color: '#fff', borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: '.88rem',
              }}>❤️ Donate</a>
            </div>
          </div>
        </>
      )}

      {/* Track modal */}
      {trackOpen && (
        <div onClick={e => { if (e.target === e.currentTarget) { setTrackOpen(false); setTrackResult(null); setTrackId(''); } }} style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(10,22,40,.75)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: '32px 28px', width: '100%', maxWidth: 460, boxShadow: '0 40px 80px rgba(0,71,171,.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#0047AB,#0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Search size={18} color="#fff" />
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.7rem', fontWeight: 700, color: '#0A1628', margin: 0 }}>Track Your Request</h3>
            </div>
            <p style={{ color: '#6b7a99', marginBottom: 20, fontSize: '.875rem', lineHeight: 1.6 }}>Enter your tracking ID to check the status of your book request or donation.</p>
            <input
              value={trackId}
              onChange={e => { setTrackId(e.target.value); setTrackResult(null); }}
              placeholder="e.g. REQ-LXYZ12-ABCD-001"
              onKeyDown={e => e.key === 'Enter' && handleTrack()}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: 10,
                border: '2px solid #e8edf8', fontSize: '.95rem', outline: 'none',
                boxSizing: 'border-box', marginBottom: 12, transition: 'border .2s', fontFamily: 'inherit',
              }}
              onFocus={e => (e.currentTarget.style.border = '2px solid #0EA5E9')}
              onBlur={e => (e.currentTarget.style.border = '2px solid #e8edf8')}
            />
            {trackResult && !trackResult.notFound && !trackResult.error && (
              <div style={{ background: 'linear-gradient(135deg,#f0f9ff,#e0f2fe)', border: '1px solid #bae6fd', borderRadius: 12, padding: 16, marginBottom: 12 }}>
                <div style={{ fontWeight: 700, color: '#0047AB', marginBottom: 8, fontSize: '.9rem' }}>
                  {trackResult.type === 'request' ? '📚 Book Request' : '📦 Book Donation'}
                </div>
                <div style={{ display: 'grid', gap: 4, fontSize: '.83rem', color: '#1a2744' }}>
                  <div><strong>Status:</strong>{' '}
                    <span style={{ fontWeight: 700, color: trackResult.status === 'pending' ? '#f59e0b' : ['approved','accepted','received'].includes(trackResult.status) ? '#10b981' : '#ef4444' }}>
                      ● {trackResult.status?.toUpperCase()}
                    </span>
                  </div>
                  {trackResult.bookTitle && <div><strong>Book:</strong> {trackResult.bookTitle}</div>}
                  {trackResult.studentName && <div><strong>Name:</strong> {trackResult.studentName}</div>}
                  {trackResult.donorName && <div><strong>Donor:</strong> {trackResult.donorName}</div>}
                  <div><strong>Date:</strong> {trackResult.date}</div>
                </div>
              </div>
            )}
            {trackResult?.notFound && <p style={{ color: '#ef4444', fontSize: '.85rem', marginBottom: 12 }}>No record found with that ID. Please double-check and try again.</p>}
            {trackResult?.error && <p style={{ color: '#ef4444', fontSize: '.85rem', marginBottom: 12 }}>Connection error. Please try again shortly.</p>}
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={handleTrack} disabled={trackLoading || !trackId.trim()} style={{
                flex: 1, padding: '11px 0', borderRadius: 50, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg,#0047AB,#0EA5E9)',
                color: '#fff', fontWeight: 700, fontSize: '.9rem',
                opacity: trackLoading || !trackId.trim() ? .6 : 1,
              }}>{trackLoading ? 'Searching…' : 'Track'}</button>
              <button onClick={() => { setTrackOpen(false); setTrackResult(null); setTrackId(''); }} style={{
                padding: '11px 20px', borderRadius: 50, border: '2px solid #e8edf8', cursor: 'pointer',
                background: '#fff', color: '#6b7a99', fontWeight: 600, fontSize: '.9rem',
              }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
