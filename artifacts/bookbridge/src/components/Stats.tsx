import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { icon: '📚', value: 500, suffix: '+', label: 'Books Donated', color: '#0047AB', bg: '#EFF6FF' },
  { icon: '🎓', value: 350, suffix: '+', label: 'Students Reached', color: '#7C3AED', bg: '#F5F3FF' },
  { icon: '🏫', value: 12,  suffix: '+', label: 'Schools Supported', color: '#0EA5E9', bg: '#F0F9FF' },
  { icon: '🌍', value: 8,   suffix: '+', label: 'Communities Served', color: '#10B981', bg: '#ECFDF5' },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !startedRef.current) {
        startedRef.current = true;
        const duration = 1600;
        const startTime = performance.now();
        function step(now: number) {
          const p = Math.min((now - startTime) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(ease * target));
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }
    }, { threshold: .4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <div ref={elRef} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 700, lineHeight: 1 }}>{count}{suffix}</div>;
}

export default function Stats() {
  return (
    <section style={{ background: '#f8fafc', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#0047AB,#0EA5E9)', borderRadius: 6, width: 48, height: 4, marginBottom: 16 }} />
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: '#0A1628', margin: 0 }}>Our Growing Impact</h2>
          <p style={{ color: '#6b7a99', marginTop: 12, fontSize: '1rem', maxWidth: 500, margin: '12px auto 0' }}>Every number represents a student whose educational journey we've touched across Nigeria.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: i * .1 }}
              style={{
                background: '#ffffff', borderRadius: 20, padding: '32px 28px',
                boxShadow: '0 4px 24px rgba(0,71,171,.07)', border: '1px solid rgba(0,71,171,.06)',
                transition: 'all .3s', cursor: 'default',
              }}
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,71,171,.12)' }}
            >
              <div style={{ fontSize: '2.4rem', marginBottom: 12 }}>{s.icon}</div>
              <div style={{ color: s.color }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ color: '#6b7a99', fontWeight: 500, fontSize: '.88rem', marginTop: 6 }}>{s.label}</div>
              <div style={{ marginTop: 16, height: 3, borderRadius: 2, background: s.bg }}>
                <div style={{ height: '100%', width: '70%', borderRadius: 2, background: s.color, opacity: .6 }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
