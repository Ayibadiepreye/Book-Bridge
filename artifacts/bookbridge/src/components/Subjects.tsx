import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const SUBJECTS = [
  { emoji: '📖', name: 'English Language', desc: 'Grammar, comprehension, essay writing and oral English preparation for Junior WAEC.' },
  { emoji: '📐', name: 'Mathematics', desc: 'Algebra, geometry, statistics and number theory aligned with WAEC syllabus.' },
  { emoji: '🔬', name: 'Integrated Science', desc: 'Biology, chemistry and physics fundamentals for Nigerian JSS students.' },
  { emoji: '🗺️', name: 'Social Studies', desc: 'Nigerian history, civic education, geography and social science foundations.' },
  { emoji: '💼', name: 'Business Studies', desc: 'Commerce, economics, typewriting and office practice for JSS level.' },
  { emoji: '🌾', name: 'Agricultural Science', desc: 'Crop science, animal husbandry, farm management and agro-economics.' },
];

export default function Subjects() {
  return (
    <section id="subjects" style={{ background: '#f8fafc', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}
          style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{
            display: 'inline-block', background: 'linear-gradient(135deg,rgba(124,58,237,.1),rgba(14,165,233,.1))',
            color: '#7C3AED', fontWeight: 700, fontSize: '.78rem', letterSpacing: 1.5,
            textTransform: 'uppercase', padding: '5px 14px', borderRadius: 50, marginBottom: 16,
            border: '1px solid rgba(124,58,237,.2)',
          }}>Junior WAEC Subjects</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 700, color: '#0A1628', margin: '0 0 12px' }}>
            Supported Learning Areas
          </h2>
          <p style={{ color: '#6b7a99', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            We provide donated books and materials for every core Junior WAEC subject, giving students a complete toolkit for examination success.
          </p>
        </motion.div>

        {/* Coming Soon Banner */}
        <motion.div initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .5, delay: .1 }}
          style={{
            margin: '32px auto 48px', maxWidth: 600,
            background: 'linear-gradient(135deg, #0A1628, #0047AB)',
            borderRadius: 16, padding: '18px 28px',
            display: 'flex', alignItems: 'center', gap: 16,
            boxShadow: '0 12px 40px rgba(0,71,171,.25)',
          }}>
          <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={22} color="#38BDF8" />
          </div>
          <div>
            <div style={{ color: '#38BDF8', fontWeight: 700, fontSize: '.85rem', marginBottom: 2 }}>📣 Coming Soon</div>
            <div style={{ color: 'rgba(255,255,255,.85)', fontSize: '.88rem', lineHeight: 1.5 }}>
              Digital learning resources for each subject are under development. We'll notify you when they launch — <strong style={{ color: '#fff' }}>drop your contact below</strong> to be first to know.
            </div>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {SUBJECTS.map((s, i) => (
            <motion.div key={s.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5, delay: i * .07 }}
              style={{
                background: '#ffffff', borderRadius: 18, padding: '28px 24px',
                boxShadow: '0 4px 20px rgba(0,71,171,.06)', border: '1px solid rgba(0,71,171,.07)',
                transition: 'all .3s', position: 'relative', overflow: 'hidden',
              }}
              whileHover={{ y: -5, boxShadow: '0 16px 40px rgba(0,71,171,.13)' }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: 'linear-gradient(90deg, #0047AB, #0EA5E9)',
              }} />
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                  flexShrink: 0, width: 52, height: 52, borderRadius: 14,
                  background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem',
                }}>{s.emoji}</div>
                <div>
                  <h3 style={{ fontWeight: 700, color: '#0A1628', fontSize: '1rem', margin: '0 0 6px' }}>{s.name}</h3>
                  <p style={{ color: '#6b7a99', fontSize: '.84rem', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
              <div style={{
                marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 5,
                background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 50,
                padding: '4px 12px', fontSize: '.73rem', color: '#0EA5E9', fontWeight: 600,
              }}>
                <Clock size={11} /> Resources Coming Soon
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
