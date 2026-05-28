import { LOGO } from '../lib/images';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: '#0A1628', color: '#fff', padding: '72px 24px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48, marginBottom: 60 }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src={LOGO} alt="BookBridge" style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover', border: '2px solid rgba(255,255,255,.15)' }} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>Project BookBridge</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,.5)', lineHeight: 1.8, fontSize: '.875rem', maxWidth: 340, marginBottom: 24 }}>
              Empowering underserved Nigerian junior secondary students through donated books and learning materials. Supporting SDG 4 — Quality Education.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="https://wa.me/2348128384816" target="_blank" rel="noreferrer" style={{
                width: 40, height: 40, borderRadius: 10, background: '#25D366',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textDecoration: 'none', fontSize: '1.1rem', transition: 'transform .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              title="WhatsApp">💬</a>
              <a href="mailto:bookbridge26@gmail.com" style={{
                width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textDecoration: 'none', fontSize: '1rem', transition: 'all .2s', color: '#fff',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'rgba(255,255,255,.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,.1)'; }}
              title="Email">✉️</a>
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
                display: 'block', color: 'rgba(255,255,255,.55)', textDecoration: 'none',
                fontSize: '.875rem', marginBottom: 10, transition: 'color .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#7DD3FC')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.55)')}
              >{label}</a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 700, color: '#7DD3FC', fontSize: '.78rem', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 20 }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1rem' }}>📍</span>
                <span style={{ color: 'rgba(255,255,255,.55)', fontSize: '.875rem', lineHeight: 1.5 }}>Rivers State, Nigeria</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: '1rem' }}>📱</span>
                <a href="https://wa.me/2348128384816" style={{ color: 'rgba(255,255,255,.55)', textDecoration: 'none', fontSize: '.875rem', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#25D366')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.55)')}
                >+234 812 838 4816</a>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: '1rem' }}>✉️</span>
                <a href="mailto:bookbridge26@gmail.com" style={{ color: 'rgba(255,255,255,.55)', textDecoration: 'none', fontSize: '.875rem', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#7DD3FC')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.55)')}
                >bookbridge26@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'rgba(255,255,255,.3)', fontSize: '.8rem', margin: 0 }}>
            © {year} Project BookBridge. All rights reserved. Registered Nigerian Nonprofit.
          </p>
          <p style={{ color: 'rgba(255,255,255,.3)', fontSize: '.8rem', margin: 0 }}>
            Made with ❤️ for Nigeria's future leaders
          </p>
        </div>
      </div>

      <style>{`@media(max-width:768px){ .footer-grid{ grid-template-columns:1fr !important; } }`}</style>
    </footer>
  );
}
