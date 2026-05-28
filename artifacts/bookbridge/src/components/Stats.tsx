import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { icon: '📚', value: 500, suffix: '+', label: 'Books Donated', color: '#0047AB', grad: 'linear-gradient(135deg,#0047AB,#0EA5E9)' },
  { icon: '🎓', value: 350, suffix: '+', label: 'Students Reached', color: '#FF0090', grad: 'linear-gradient(135deg,#FF0090,#7C3AED)' },
  { icon: '🌍', value: 12,  suffix: '+', label: 'Communities Served', color: '#7C3AED', grad: 'linear-gradient(135deg,#7C3AED,#0EA5E9)' },
  { icon: '🤝', value: 100, suffix: '%', label: 'Free of Charge', color: '#10B981', grad: 'linear-gradient(135deg,#10B981,#0EA5E9)' },
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
    <section style={{
      background: 'linear-gradient(160deg,#f0f7ff 0%,#fdf4ff 40%,#f0fff8 100%)',
      padding: '80px 24px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative bubbles */}
      <div style={{ position: 'absolute', top: '10%', left: '3%', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,71,171,.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '5%', right: '5%', width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,0,144,.07) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: 300, height: 300, borderRadius: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle,rgba(124,58,237,.04) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 32, height: 4, borderRadius: 2, background: 'linear-gradient(90deg,#FF0090,#0047AB)' }} />
            <div style={{ width: 16, height: 4, borderRadius: 2, background: 'linear-gradient(90deg,#0047AB,#0EA5E9)' }} />
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 700, color: '#0A1628', margin: 0 }}>Our Growing Impact</h2>
          <p style={{ color: '#6b7a99', marginTop: 12, fontSize: '1rem', maxWidth: 500, margin: '12px auto 0' }}>
            Every number represents a student whose educational journey we've been privileged to touch across Rivers State.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: i * .1 }}
              style={{
                background: 'rgba(255,255,255,.85)',
                backdropFilter: 'blur(12px)',
                borderRadius: 20, padding: '32px 28px',
                boxShadow: '0 4px 24px rgba(0,71,171,.08)',
                border: '1px solid rgba(255,255,255,.9)',
                transition: 'all .3s', cursor: 'default', position: 'relative', overflow: 'hidden',
              }}
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,71,171,.14)' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: s.grad }} />
              <div style={{ position: 'absolute', bottom: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `radial-gradient(circle,${s.color}14 0%,transparent 70%)` }} />
              <div style={{ fontSize: '2.4rem', marginBottom: 12 }}>{s.icon}</div>
              <div style={{ background: s.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ color: '#6b7a99', fontWeight: 500, fontSize: '.88rem', marginTop: 6 }}>{s.label}</div>
              <div style={{ marginTop: 16, height: 3, borderRadius: 2, background: 'rgba(0,0,0,.06)' }}>
                <div style={{ height: '100%', width: '75%', borderRadius: 2, background: s.grad }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
