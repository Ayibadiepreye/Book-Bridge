import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '../lib/images';

export default function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    slidesToScroll: 1,
  });
  const [currentIdx, setCurrentIdx] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentIdx(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    const timer = setInterval(() => emblaApi.scrollNext(), 3500);
    return () => { clearInterval(timer); emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  return (
    <section id="gallery" style={{
      background: 'linear-gradient(160deg, #0A1628 0%, #0D1F45 50%, #0A1628 100%)',
      padding: '96px 0',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, rgba(255,0,144,.2), rgba(14,165,233,.2))',
            border: '1px solid rgba(255,0,144,.35)',
            color: '#FFB3DC', fontWeight: 700, fontSize: '.78rem', letterSpacing: 1.5,
            textTransform: 'uppercase', padding: '5px 14px', borderRadius: 50, marginBottom: 16,
          }}>Impact Gallery</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 700, color: '#ffffff', margin: '0 0 12px' }}>
            Our Impact in Pictures
          </h2>
          <p style={{ color: 'rgba(255,255,255,.55)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Real moments from our work across Rivers State — students and communities we've been privileged to serve.
          </p>
        </motion.div>
      </div>

      {/* Slideshow */}
      <div style={{ position: 'relative' }}>
        <div ref={emblaRef} style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 16, paddingLeft: 24, paddingRight: 24 }} className="gallery-slides">
            {galleryImages.map((src, i) => (
              <div key={i} style={{
                flex: '0 0 calc(33.333% - 11px)',
                borderRadius: 16, overflow: 'hidden',
                height: 320,
                boxShadow: '0 8px 32px rgba(0,0,0,.5)',
                border: '1px solid rgba(255,255,255,.06)',
                transition: 'transform .3s, box-shadow .3s',
                flexShrink: 0,
              }}
              className="gallery-slide"
              >
                <img
                  src={src}
                  alt="BookBridge impact"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform .6s' }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Arrow buttons */}
        <button onClick={scrollPrev} style={{
          position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
          width: 48, height: 48, borderRadius: '50%', border: 'none', cursor: 'pointer',
          background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', zIndex: 10, transition: 'background .2s',
          boxShadow: '0 4px 16px rgba(0,0,0,.3)',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,0,144,.4)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.15)')}
        ><ChevronLeft size={22} /></button>

        <button onClick={scrollNext} style={{
          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
          width: 48, height: 48, borderRadius: '50%', border: 'none', cursor: 'pointer',
          background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', zIndex: 10, transition: 'background .2s',
          boxShadow: '0 4px 16px rgba(0,0,0,.3)',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,0,144,.4)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.15)')}
        ><ChevronRight size={22} /></button>
      </div>

      {/* Dot navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 28, flexWrap: 'wrap', padding: '0 24px' }}>
        {galleryImages.map((_, i) => (
          <button key={i} onClick={() => emblaApi?.scrollTo(i)} style={{
            width: i === currentIdx ? 24 : 7, height: 7, borderRadius: 4,
            border: 'none', cursor: 'pointer', padding: 0,
            background: i === currentIdx ? 'linear-gradient(90deg, #FF0090, #0EA5E9)' : 'rgba(255,255,255,.25)',
            transition: 'all .3s', flexShrink: 0,
          }} />
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .gallery-slide { flex: 0 0 calc(50% - 8px) !important; }
        }
        @media (max-width: 540px) {
          .gallery-slide { flex: 0 0 calc(100% - 0px) !important; height: 260px !important; }
          .gallery-slides { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>
    </section>
  );
}
