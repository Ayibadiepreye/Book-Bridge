import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VIDEO_ID = 'laNbHZsr2jw';
const THUMBNAIL = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;
const VIDEO_URL = `https://youtu.be/${VIDEO_ID}`;

export default function VideoSection() {
  return (
    <section style={{
      background: 'linear-gradient(160deg, #f8fafc 0%, #EFF6FF 50%, #f0f9ff 100%)',
      padding: '96px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '-10%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,71,171,.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,0,144,.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}
          style={{ textAlign: 'center', marginBottom: 52 }}>
          <span style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, rgba(255,0,144,.1), rgba(0,71,171,.1))',
            border: '1px solid rgba(0,71,171,.2)',
            color: '#0047AB', fontWeight: 700, fontSize: '.78rem', letterSpacing: 1.5,
            textTransform: 'uppercase', padding: '5px 14px', borderRadius: 50, marginBottom: 16,
          }}>Our Documentary</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 700, color: '#0A1628', margin: '0 0 12px' }}>
            See BookBridge in Action
          </h2>
          <p style={{ color: '#6b7a99', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Watch our documentary to see firsthand how donated books are transforming lives and futures across Rivers State, Nigeria.
          </p>
        </motion.div>

        {/* Video Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          style={{ maxWidth: 860, margin: '0 auto' }}
        >
          <a
            href={VIDEO_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'block',
              position: 'relative',
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,71,171,.18)',
              border: '1px solid rgba(0,71,171,.1)',
              textDecoration: 'none',
              aspectRatio: '16 / 9',
              cursor: 'pointer',
            }}
            className="video-card"
          >
            {/* Thumbnail */}
            <img
              src={THUMBNAIL}
              alt="BookBridge Documentary"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s' }}
              className="video-thumb"
            />

            {/* Dark overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(10,22,40,.55) 0%, rgba(0,71,171,.35) 100%)',
              transition: 'opacity .3s',
            }} className="video-overlay" />

            {/* Play button */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF0090, #0047AB)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(255,0,144,.5)',
                transition: 'transform .3s, box-shadow .3s',
              }} className="play-btn">
                <Play size={32} color="#fff" fill="#fff" style={{ marginLeft: 4 }} />
              </div>
            </div>

            {/* YouTube badge */}
            <div style={{
              position: 'absolute', top: 20, right: 20,
              background: '#FF0000', color: '#fff', borderRadius: 8,
              padding: '5px 12px', fontWeight: 700, fontSize: '.78rem',
              display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: '0 4px 12px rgba(255,0,0,.4)',
            }}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
                <path d="M15.67 1.88A2 2 0 0 0 14.27.47C13.02.13 8 .13 8 .13s-5.02 0-6.27.34A2 2 0 0 0 .33 1.88 21.1 21.1 0 0 0 0 6a21.1 21.1 0 0 0 .33 4.12A2 2 0 0 0 1.73 11.53C3 11.87 8 11.87 8 11.87s5.02 0 6.27-.34a2 2 0 0 0 1.4-1.41A21.1 21.1 0 0 0 16 6a21.1 21.1 0 0 0-.33-4.12zM6.4 8.57V3.43L10.55 6 6.4 8.57z"/>
              </svg>
              YouTube
            </div>

            {/* Bottom caption */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(10,22,40,.9) 0%, transparent 100%)',
              padding: '32px 28px 24px',
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '1.3rem', fontWeight: 700 }}>
                Project BookBridge — Documentary Film
              </div>
              <div style={{ color: 'rgba(255,255,255,.65)', fontSize: '.82rem', marginTop: 4 }}>
                Click to watch on YouTube · Rivers State, Nigeria
              </div>
            </div>
          </a>

          {/* Stats row below video */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24 }} className="video-stats">
            {[
              { icon: '🎬', label: 'Documentary Film', value: '2025' },
              { icon: '📍', label: 'Filmed in', value: 'Rivers State' },
              { icon: '🎯', label: 'Mission', value: 'Quality Education' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .4, delay: .5 + i * .1 }}
                style={{
                  background: '#fff',
                  borderRadius: 16, padding: '18px 20px',
                  boxShadow: '0 4px 20px rgba(0,71,171,.07)',
                  border: '1px solid rgba(0,71,171,.07)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.6rem', marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, color: '#0A1628', fontSize: '.95rem' }}>{s.value}</div>
                <div style={{ color: '#6b7a99', fontSize: '.76rem', marginTop: 2 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .video-card:hover .video-thumb { transform: scale(1.03); }
        .video-card:hover .play-btn { transform: scale(1.12); box-shadow: 0 12px 40px rgba(255,0,144,.6) !important; }
        @media (max-width: 540px) {
          .video-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
