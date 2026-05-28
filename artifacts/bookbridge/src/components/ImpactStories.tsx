import { motion } from 'framer-motion';
import { impactImages } from '../lib/images';

const STORIES = [
  {
    quote: "Before BookBridge, I had to share one textbook with five classmates. Getting my own copy made a huge difference — I could study at home and finally prepare properly for my exams.",
    name: "JSS 3 Student",
    role: "Rivers State",
    img: impactImages[0],
  },
  {
    quote: "Seeing the joy on these children's faces when they receive their books is indescribable. BookBridge is filling a critical gap that government and families alone cannot close.",
    name: "Community Volunteer",
    role: "Rivers State",
    img: impactImages[1],
  },
  {
    quote: "I had books my children had outgrown sitting in storage. Knowing they now help students prepare for Junior WAEC makes donating through BookBridge so rewarding.",
    name: "Book Donor",
    role: "Rivers State",
    img: impactImages[2],
  },
];

export default function ImpactStories() {
  return (
    <section style={{
      background: 'linear-gradient(160deg, #0A1628 0%, #0F2040 40%, #0A1628 100%)',
      padding: '96px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '-5%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,0,144,.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-5%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, rgba(255,0,144,.2), rgba(124,58,237,.2))',
            border: '1px solid rgba(255,0,144,.3)',
            color: '#FFB3DC', fontWeight: 700, fontSize: '.78rem', letterSpacing: 1.5,
            textTransform: 'uppercase', padding: '5px 14px', borderRadius: 50, marginBottom: 16,
          }}>Impact Stories</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 700, color: '#ffffff', margin: '0 0 12px' }}>
            Voices from the Field
          </h2>
          <p style={{ color: 'rgba(255,255,255,.55)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Real stories from the students, volunteers and donors who make Project BookBridge possible.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }} className="stories-grid">
          {STORIES.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .6, delay: i * .15 }}
              style={{
                background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(255,255,255,.09)',
                borderRadius: 24,
                overflow: 'hidden',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform .3s, box-shadow .3s',
              }}
              whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(0,0,0,.4)' }}
            >
              {/* Image */}
              <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
                <img
                  src={s.img}
                  alt="Impact story"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', transition: 'transform .5s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(10,22,40,.8) 100%)' }} />

                {/* Quote mark */}
                <div style={{
                  position: 'absolute', bottom: 16, left: 20,
                  fontFamily: 'Georgia, serif', fontSize: '4rem', lineHeight: 1,
                  color: 'rgba(255,0,144,.7)', fontWeight: 700,
                }}>"</div>
              </div>

              {/* Content */}
              <div style={{ padding: '24px 24px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{ color: 'rgba(255,255,255,.82)', lineHeight: 1.75, fontSize: '.9rem', fontStyle: 'italic', margin: '0 0 24px', flex: 1 }}>
                  {s.quote}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${i === 0 ? '#0047AB, #0EA5E9' : i === 1 ? '#7C3AED, #FF0090' : '#10B981, #0EA5E9'})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 800, fontSize: '.9rem', flexShrink: 0,
                  }}>
                    {s.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '.88rem' }}>{s.name}</div>
                    <div style={{ color: 'rgba(255,255,255,.45)', fontSize: '.76rem' }}>{s.role}</div>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[...Array(5)].map((_, j) => (
                        <span key={j} style={{ color: '#FF0090', fontSize: '.85rem' }}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Gradient bottom bar */}
              <div style={{
                height: 3,
                background: i === 0
                  ? 'linear-gradient(90deg, #0047AB, #0EA5E9)'
                  : i === 1
                  ? 'linear-gradient(90deg, #FF0090, #7C3AED)'
                  : 'linear-gradient(90deg, #10B981, #0EA5E9)',
              }} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6, delay: .4 }}
          style={{ textAlign: 'center', marginTop: 56 }}
        >
          <p style={{ color: 'rgba(255,255,255,.5)', marginBottom: 24, fontSize: '.95rem' }}>
            Join hundreds of people already making a difference across Rivers State.
          </p>
          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 36px', borderRadius: 50, textDecoration: 'none',
            background: 'linear-gradient(135deg, #FF0090, #7C3AED, #0047AB)',
            color: '#fff', fontWeight: 700, fontSize: '1rem',
            boxShadow: '0 8px 24px rgba(255,0,144,.35)', transition: 'all .25s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 32px rgba(255,0,144,.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,0,144,.35)'; }}
          >
            Be Part of the Story →
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) { .stories-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .stories-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
