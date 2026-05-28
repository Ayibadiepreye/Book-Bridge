import { motion } from 'framer-motion';
import { aboutImages } from '../lib/images';

const POINTS = [
  { icon: '📦', title: 'Free Book Distribution', text: 'We collect donated textbooks and learning materials and deliver them free of charge to JSS students who cannot afford them.' },
  { icon: '📖', title: 'WAEC Exam Preparation', text: 'Our materials specifically target Junior WAEC subjects, giving students the tools they need to perform at their very best.' },
  { icon: '🤝', title: 'Community Partnership', text: 'We work directly with schools, teachers, and community leaders across Rivers State and beyond to maximise reach.' },
];

export default function About() {
  return (
    <section id="about" style={{ background: '#ffffff', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }} className="about-grid">
        {/* Left: Text */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .7 }}>
          <span style={{
            display: 'inline-block', background: 'linear-gradient(135deg,rgba(0,71,171,.1),rgba(14,165,233,.1))',
            color: '#0047AB', fontWeight: 700, fontSize: '.78rem', letterSpacing: 1.5,
            textTransform: 'uppercase', padding: '5px 14px', borderRadius: 50, marginBottom: 20,
            border: '1px solid rgba(0,71,171,.2)',
          }}>Our Mission</span>

          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#0A1628', lineHeight: 1.2, margin: '0 0 20px' }}>
            Bridging Nigeria's <span style={{ color: '#0047AB' }}>Education Gap</span> One Book at a Time
          </h2>

          <p style={{ color: '#4b5880', lineHeight: 1.8, fontSize: '1.02rem', marginBottom: 36 }}>
            Millions of Nigerian junior secondary students lack access to basic textbooks and learning materials. Project BookBridge was founded to change that — connecting generous donors with students who need these resources the most, entirely free of charge.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
            {POINTS.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .5, delay: i * .1 }}
                style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{
                  flexShrink: 0, width: 44, height: 44, borderRadius: 12,
                  background: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem',
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
            background: 'linear-gradient(135deg, #0047AB, #0EA5E9)',
            color: '#fff', fontWeight: 700, fontSize: '.92rem',
            boxShadow: '0 8px 20px rgba(0,71,171,.35)', transition: 'all .25s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,71,171,.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,71,171,.35)'; }}
          >Get Involved →</a>
        </motion.div>

        {/* Right: Photo collage */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .7 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 12, height: 460 }}>
          <div style={{ gridColumn: '1', gridRow: '1 / 3', borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,71,171,.12)' }}>
            <img src={aboutImages[0]} alt="Students reading" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
          </div>
          <div style={{ gridColumn: '2', gridRow: '1', borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,71,171,.12)' }}>
            <img src={aboutImages[1]} alt="Book donation" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
          </div>
          <div style={{ gridColumn: '2', gridRow: '2', borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,71,171,.12)', position: 'relative' }}>
            <img src={aboutImages[2]} alt="Community" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
            <div style={{
              position: 'absolute', bottom: 12, left: 12, right: 12,
              background: 'rgba(0,71,171,.85)', backdropFilter: 'blur(8px)',
              borderRadius: 10, padding: '8px 12px',
              color: '#fff', fontSize: '.75rem', fontWeight: 600, textAlign: 'center',
            }}>Rivers State, Nigeria 🇳🇬</div>
          </div>
        </motion.div>
      </div>

      <style>{`@media(max-width:768px){ .about-grid{ grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}
