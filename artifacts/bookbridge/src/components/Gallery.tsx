import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '../lib/images';

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  function prev() { setLightbox(i => i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length); }
  function next() { setLightbox(i => i === null ? null : (i + 1) % galleryImages.length); }

  return (
    <section id="gallery" style={{ background: '#0A1628', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            display: 'inline-block', background: 'rgba(14,165,233,.15)', border: '1px solid rgba(14,165,233,.3)',
            color: '#7DD3FC', fontWeight: 700, fontSize: '.78rem', letterSpacing: 1.5,
            textTransform: 'uppercase', padding: '5px 14px', borderRadius: 50, marginBottom: 16,
          }}>Impact Gallery</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 700, color: '#ffffff', margin: '0 0 12px' }}>
            Our Impact in Pictures
          </h2>
          <p style={{ color: 'rgba(255,255,255,.55)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Real moments from our work across Nigeria — students, schools, and communities we've been privileged to serve.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div style={{ columns: 3, columnGap: 14 }} className="gallery-columns">
          {galleryImages.map((img, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: .5, delay: (i % 6) * .06 }}
              onClick={() => setLightbox(i)}
              style={{
                breakInside: 'avoid', marginBottom: 14, borderRadius: 14, overflow: 'hidden',
                cursor: 'pointer', position: 'relative', display: 'block',
                boxShadow: '0 4px 20px rgba(0,0,0,.4)',
              }}
            >
              <img src={img.src} alt={img.caption}
                style={{ width: '100%', display: 'block', transition: 'transform .4s' }}
                loading="lazy"
                onMouseEnter={e => { (e.currentTarget.style.transform = 'scale(1.05)'); }}
                onMouseLeave={e => { (e.currentTarget.style.transform = 'scale(1)'); }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 50%)',
                opacity: 0, transition: 'opacity .3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
              >
                <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '.83rem' }}>{img.caption}</div>
                  <div style={{ color: 'rgba(255,255,255,.7)', fontSize: '.72rem' }}>{img.date}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={e => { if (e.target === e.currentTarget) setLightbox(null); }}
            style={{
              position: 'fixed', inset: 0, zIndex: 3000,
              background: 'rgba(0,0,0,.92)', backdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
            }}
          >
            <button onClick={() => setLightbox(null)} style={{
              position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,.15)',
              border: 'none', borderRadius: '50%', width: 42, height: 42, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            }}><X size={20} /></button>

            <button onClick={prev} style={{
              position: 'absolute', left: 16, background: 'rgba(255,255,255,.15)', border: 'none',
              borderRadius: '50%', width: 48, height: 48, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            }}><ChevronLeft size={24} /></button>

            <motion.div key={lightbox} initial={{ scale: .88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .25 }}
              style={{ maxWidth: 800, maxHeight: '80vh', textAlign: 'center' }}>
              <img src={galleryImages[lightbox].src} alt={galleryImages[lightbox].caption}
                style={{ maxWidth: '100%', maxHeight: '72vh', borderRadius: 16, objectFit: 'contain', boxShadow: '0 40px 80px rgba(0,0,0,.6)' }} />
              <div style={{ marginTop: 14, color: 'rgba(255,255,255,.8)', fontSize: '.9rem' }}>
                <strong style={{ color: '#fff' }}>{galleryImages[lightbox].caption}</strong> · {galleryImages[lightbox].date}
              </div>
              <div style={{ color: 'rgba(255,255,255,.35)', fontSize: '.78rem', marginTop: 4 }}>{lightbox + 1} / {galleryImages.length}</div>
            </motion.div>

            <button onClick={next} style={{
              position: 'absolute', right: 16, background: 'rgba(255,255,255,.15)', border: 'none',
              borderRadius: '50%', width: 48, height: 48, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            }}><ChevronRight size={24} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:900px){ .gallery-columns{ columns:2 !important; } }
        @media(max-width:540px){ .gallery-columns{ columns:1 !important; } }
      `}</style>
    </section>
  );
}
