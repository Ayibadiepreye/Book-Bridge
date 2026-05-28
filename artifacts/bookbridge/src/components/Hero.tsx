import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, BookOpen, Heart } from 'lucide-react';
import { heroCarousel } from '../lib/images';
import { motion } from 'framer-motion';

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [currentIdx, setCurrentIdx] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentIdx(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    const timer = setInterval(() => emblaApi.scrollNext(), 4500);
    return () => { clearInterval(timer); emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  function openTab(tab: 'request' | 'donate') {
    window.dispatchEvent(new CustomEvent('bb:setTab', { detail: tab }));
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'stretch',
      background: 'linear-gradient(135deg, #0A1628 0%, #0047AB 50%, #0A1628 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-15%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,0,144,.14) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', left: '30%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', padding: '100px 24px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}
        className="hero-grid">

        {/* Left: Text */}
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8, ease: 'easeOut' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,0,144,.15)', border: '1px solid rgba(255,0,144,.3)',
            borderRadius: 50, padding: '6px 16px', marginBottom: 28,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF0090', display: 'inline-block' }} />
            <span style={{ color: '#FFB3DC', fontSize: '.82rem', fontWeight: 600, letterSpacing: '.5px', textTransform: 'uppercase' }}>Supporting SDG 4 · Quality Education</span>
          </div>

          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#ffffff', lineHeight: 1.05, margin: 0 }}>
            <span style={{ display: 'block', fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', fontWeight: 400 }}>Connecting</span>
            <span style={{ display: 'block', fontSize: 'clamp(3rem, 5.5vw, 4.8rem)', fontWeight: 700, background: 'linear-gradient(90deg, #FF0090, #38BDF8, #FF0090)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic', backgroundSize: '200% auto', animation: 'shimmer 4s linear infinite' }}>Dreams</span>
            <span style={{ display: 'block', fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', fontWeight: 400 }}>with Knowledge</span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,.75)', fontSize: '1.05rem', lineHeight: 1.75, margin: '24px 0 36px', maxWidth: 480 }}>
            Project BookBridge empowers underserved junior secondary students across Rivers State, Nigeria with donated books and quality learning materials — one student at a time.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 48 }}>
            <button onClick={() => openTab('request')} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 50, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #0EA5E9, #0047AB)',
              color: '#fff', fontWeight: 700, fontSize: '1rem',
              boxShadow: '0 8px 24px rgba(14,165,233,.45)', transition: 'all .25s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 32px rgba(14,165,233,.55)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(14,165,233,.45)'; }}
            >
              <BookOpen size={18} /> Request Books
            </button>
            <button onClick={() => openTab('donate')} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 50, border: '2px solid rgba(255,0,144,.5)',
              background: 'rgba(255,0,144,.1)', cursor: 'pointer',
              color: '#fff', fontWeight: 700, fontSize: '1rem',
              transition: 'all .25s', backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,0,144,.25)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,0,144,.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              <Heart size={18} /> Donate Books
            </button>
          </div>

          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { value: '500+', label: 'Books Donated', color: '#38BDF8' },
              { value: '350+', label: 'Students Reached', color: '#FF0090' },
              { value: '12+', label: 'Communities', color: '#A78BFA' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ color: 'rgba(255,255,255,.55)', fontSize: '.8rem', fontWeight: 500, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Carousel */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8, ease: 'easeOut', delay: .15 }}
          style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,.4)', aspectRatio: '3/4', maxHeight: 560 }}>
          <div ref={emblaRef} style={{ overflow: 'hidden', height: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
              {heroCarousel.map((slide, i) => (
                <div key={i} style={{ flex: '0 0 100%', height: '100%', position: 'relative' }}>
                  <img src={slide.src} alt="BookBridge impact"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button onClick={scrollPrev} style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            width: 36, height: 36, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: 'rgba(255,255,255,.2)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background .2s', color: '#fff',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,.35)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.2)')}
          ><ChevronLeft size={18} /></button>
          <button onClick={scrollNext} style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            width: 36, height: 36, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: 'rgba(255,255,255,.2)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background .2s', color: '#fff',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,.35)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.2)')}
          ><ChevronRight size={18} /></button>

          {/* Dots */}
          <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
            {heroCarousel.map((_, i) => (
              <button key={i} onClick={() => emblaApi?.scrollTo(i)} style={{
                width: i === currentIdx ? 20 : 6, height: 6, borderRadius: 3,
                border: 'none', cursor: 'pointer', padding: 0,
                background: i === currentIdx ? '#FF0090' : 'rgba(255,255,255,.4)',
                transition: 'all .3s',
              }} />
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer { 0%{ background-position:0% center; } 100%{ background-position:200% center; } }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; padding-top: 88px !important; }
        }
      `}</style>
    </section>
  );
}
