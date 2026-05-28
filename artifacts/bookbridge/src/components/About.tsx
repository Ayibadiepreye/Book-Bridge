import { motion } from 'framer-motion';
import { aboutImages } from '../lib/images';

const POINTS = [
  { icon: '📦', title: 'Free Book Distribution', text: 'We collect donated textbooks and learning materials and deliver them free of charge to JSS students who cannot afford them.', color: '#0047AB', grad: 'linear-gradient(135deg,#0047AB,#0EA5E9)' },
  { icon: '📖', title: 'WAEC Exam Preparation', text: 'Our materials target Junior WAEC subjects, giving students the tools they need to perform at their very best.', color: '#7C3AED', grad: 'linear-gradient(135deg,#7C3AED,#FF0090)' },
  { icon: '🤝', title: 'Community Partnership', text: 'We work directly with communities and families across Rivers State to maximise our reach and impact.', color: '#0EA5E9', grad: 'linear-gradient(135deg,#0EA5E9,#10B981)' },
];

export default function About() {
  return (
    <section id="about" style={{
      background: 'linear-gradient(160deg, #ffffff 0%, #f0f7ff 50%, #fdf4ff 100%)',
      padding: '96px 24px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '5%', left: '2%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,71,171,.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="about-grid">
          {/* Left: Text */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .7 }}>
            <span style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg,rgba(0,71,171,.12),rgba(14,165,233,.12))',
              color: '#0047AB', fontWeight: 700, fontSize: '.78rem', letterSpacing: 1.5,
              textTransform: 'uppercase', padding: '5px 14px', borderRadius: 50, marginBottom: 20,
              border: '1px solid rgba(0,71,171,.2)',
            }}>Our Mission</span>

            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#0A1628', lineHeight: 1.2, margin: '0 0 20px' }}>
              Bridging Nigeria's{' '}
              <span style={{ background: 'linear-gradient(135deg,#FF0090,#0047AB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Education Gap</span>{' '}
              One Book at a Time
            </h2>

            <p style={{ color: '#4b5880', lineHeight: 1.8, fontSize: '1.02rem', marginBottom: 36 }}>
              Millions of Nigerian junior secondary students lack access to basic textbooks and learning materials. Project BookBridge was founded to change that — connecting generous donors with students who need these resources most, entirely free of charge, starting right here in Rivers State.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
              {POINTS.map((p, i) => (
                <motion.div key={p.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .5, delay: i * .1 }}
                  style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'rgba(255,255,255,.8)', borderRadius: 16, padding: '16px 18px', boxShadow: '0 2px 16px rgba(0,71,171,.06)', border: '1px solid rgba(0,71,171,.06)', backdropFilter: 'blur(8px)' }}>
                  <div style={{
                    flexShrink: 0, width: 46, height: 46, borderRadius: 12,
                    background: p.grad,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem',
                  }}>{p.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: 4, fontSize: '.95rem' }}>{p.title}</div>
                    <div style={{ color: '#6b7a99', lineHeight: 1.6, fontSize: '.875rem' }}>{p.text}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <a href="#contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 28px', borderRadius: 50, textDecoration: 'none',
              background: 'linear-gradient(135deg,#FF0090 0%,#0047AB 60%,#0EA5E9 100%)',
              color: '#fff', fontWeight: 700, fontSize: '.92rem',
              boxShadow: '0 8px 20px rgba(0,71,171,.35)', transition: 'all .25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,71,171,.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,71,171,.35)'; }}
            >Get Involved →</a>
          </motion.div>

          {/* Right: Photo collage */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .7 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="about-photos">
            {/* Tall left image */}
            <div style={{ gridRow: '1 / 3', borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,71,171,.14)', minHeight: 320 }} className="about-photo-tall">
              <img src={aboutImages[0]} alt="Students with books"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform .5s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
            </div>
            {/* Top right */}
            <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,71,171,.14)', height: 200 }}>
              <img src={aboutImages[1]} alt="Book donation"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', transition: 'transform .5s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
            </div>
            {/* Bottom right */}
            <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,71,171,.14)', height: 200, position: 'relative' }}>
              <img src={aboutImages[2]} alt="Community impact"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform .5s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
              {/* Subtle gradient overlay only — no text */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,71,171,.2) 0%, transparent 60%)', borderRadius: 20 }} />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .about-grid{ grid-template-columns:1fr !important; }
          .about-photos{ grid-template-rows: auto auto !important; }
          .about-photo-tall{ grid-row: auto !important; min-height: 240px !important; height: 240px !important; }
        }
      `}</style>
    </section>
  );
}
