import { LOGO } from '../lib/images';
import { WA_NUMBERS, SOCIALS } from '../lib/social';

function IGIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="white" strokeWidth="1.8"/>
      <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
    </svg>
  );
}
function YTIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" fill="#FF0000"/>
    </svg>
  );
}
function WAIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  );
}
function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="3" stroke="white" strokeWidth="1.8"/>
      <path d="M2 8l10 6 10-6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'linear-gradient(160deg,#060E1E 0%,#0A1628 50%,#060E1E 100%)', color: '#fff', padding: '72px 24px 32px', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,71,171,.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '5%', left: '3%', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,0,144,.05) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48, marginBottom: 56 }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src={LOGO} alt="BookBridge" style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover', border: '2px solid rgba(255,255,255,.15)' }} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>Project BookBridge</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,.5)', lineHeight: 1.8, fontSize: '.875rem', maxWidth: 340, marginBottom: 28 }}>
              Empowering underserved junior secondary students across Rivers State through donated books and learning materials. Supporting SDG 4 — Quality Education.
            </p>

            {/* Social icons */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: 1.5, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', marginBottom: 12 }}>Follow Us</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {/* Instagram */}
                <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" title="Instagram" style={{
                  width: 42, height: 42, borderRadius: 12, textDecoration: 'none',
                  background: 'linear-gradient(135deg,#405DE6 0%,#5851DB 20%,#833AB4 40%,#C13584 60%,#E1306C 80%,#FD1D1D 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'transform .2s, box-shadow .2s',
                  boxShadow: '0 4px 12px rgba(193,53,132,.4)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(193,53,132,.55)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(193,53,132,.4)'; }}
                ><IGIcon /></a>

                {/* WhatsApp */}
                <a href={`https://wa.me/${WA_NUMBERS[1].number}`} target="_blank" rel="noreferrer" title="WhatsApp" style={{
                  width: 42, height: 42, borderRadius: 12, textDecoration: 'none',
                  background: 'linear-gradient(135deg,#25D366,#128C7E)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'transform .2s, box-shadow .2s',
                  boxShadow: '0 4px 12px rgba(37,211,102,.35)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(37,211,102,.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(37,211,102,.35)'; }}
                ><WAIcon /></a>

                {/* YouTube */}
                <a href={SOCIALS.youtube} target="_blank" rel="noreferrer" title="YouTube" style={{
                  width: 42, height: 42, borderRadius: 12, textDecoration: 'none',
                  background: 'linear-gradient(135deg,#FF0000,#CC0000)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'transform .2s, box-shadow .2s',
                  boxShadow: '0 4px 12px rgba(255,0,0,.35)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,0,0,.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,0,0,.35)'; }}
                ><YTIcon /></a>

                {/* Email */}
                <a href={`mailto:${SOCIALS.email}`} title="Email" style={{
                  width: 42, height: 42, borderRadius: 12, textDecoration: 'none',
                  background: 'linear-gradient(135deg,#FF0090,#7C3AED)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'transform .2s, box-shadow .2s',
                  boxShadow: '0 4px 12px rgba(255,0,144,.3)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,0,144,.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,0,144,.3)'; }}
                ><EmailIcon /></a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontWeight: 700, color: '#7DD3FC', fontSize: '.78rem', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 20 }}>Quick Links</h4>
            {[
              ['#about', 'About Us'],
              ['#gallery', 'Gallery'],
              ['#subjects', 'Subjects'],
              ['#contact', 'Request Books'],
              ['#contact', 'Donate Books'],
            ].map(([href, label]) => (
              <a key={label} href={href} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                color: 'rgba(255,255,255,.45)', textDecoration: 'none',
                fontSize: '.875rem', marginBottom: 12, transition: 'all .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#FFB3DC'; e.currentTarget.style.paddingLeft = '4px'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.45)'; e.currentTarget.style.paddingLeft = '0'; }}
              >
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#FF0090', flexShrink: 0 }} />
                {label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 700, color: '#7DD3FC', fontSize: '.78rem', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 20 }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: 1 }}>📍</span>
                <span style={{ color: 'rgba(255,255,255,.5)', fontSize: '.85rem', lineHeight: 1.5 }}>Rivers State, Nigeria</span>
              </div>

              {/* All 3 WhatsApp numbers */}
              {WA_NUMBERS.map(({ number, label }) => (
                <div key={number} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: '.9rem', flexShrink: 0 }}>💬</span>
                  <a href={`https://wa.me/${number}`} target="_blank" rel="noreferrer"
                    style={{ color: 'rgba(255,255,255,.45)', textDecoration: 'none', fontSize: '.85rem', transition: 'color .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#25D366')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.45)')}
                  >{label}</a>
                </div>
              ))}

              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: '1rem', flexShrink: 0 }}>✉️</span>
                <a href={`mailto:${SOCIALS.email}`}
                  style={{ color: 'rgba(255,255,255,.45)', textDecoration: 'none', fontSize: '.85rem', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#FFB3DC')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.45)')}
                >{SOCIALS.email}</a>
              </div>

              {/* Instagram link */}
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: '1rem', flexShrink: 0 }}>📸</span>
                <a href={SOCIALS.instagram} target="_blank" rel="noreferrer"
                  style={{ color: 'rgba(255,255,255,.45)', textDecoration: 'none', fontSize: '.85rem', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#E1306C')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.45)')}
                >@_bookbridge</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'rgba(255,255,255,.22)', fontSize: '.8rem', margin: 0 }}>
            © {year} Project BookBridge · Rivers State, Nigeria
          </p>
          <p style={{ color: 'rgba(255,255,255,.22)', fontSize: '.8rem', margin: 0 }}>
            Made with ❤️ for Nigeria's future leaders
          </p>
        </div>
      </div>

      <style>{`@media(max-width:768px){ .footer-grid{ grid-template-columns:1fr !important; gap:32px !important; } }`}</style>
    </footer>
  );
}
