import { useState, useEffect } from 'react';
import { WA_NUMBERS, SOCIALS } from '../lib/social';

function IGIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="white" strokeWidth="2"/>
      <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="2"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
    </svg>
  );
}
function YTIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" fill="#FF0000"/>
    </svg>
  );
}
function WAIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  );
}

const BARS = [
  {
    key: 'instagram',
    href: SOCIALS.instagram,
    label: 'Instagram',
    icon: <IGIcon />,
    grad: 'linear-gradient(135deg,#405DE6,#833AB4,#E1306C,#FD1D1D)',
    shadow: 'rgba(193,53,132,.5)',
  },
  {
    key: 'whatsapp',
    href: `https://wa.me/${WA_NUMBERS[1].number}`,
    label: 'WhatsApp',
    icon: <WAIcon />,
    grad: 'linear-gradient(135deg,#25D366,#128C7E)',
    shadow: 'rgba(37,211,102,.5)',
  },
  {
    key: 'youtube',
    href: SOCIALS.youtube,
    label: 'YouTube',
    icon: <YTIcon />,
    grad: 'linear-gradient(135deg,#FF0000,#CC0000)',
    shadow: 'rgba(255,0,0,.5)',
  },
];

export default function SocialBar() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 200);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <div style={{
        position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)',
        zIndex: 900, display: 'flex', flexDirection: 'column', gap: 8,
        opacity: visible ? 1 : 0,
        transition: 'opacity .4s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}>
        {BARS.map(b => (
          <a
            key={b.key}
            href={b.href}
            target="_blank"
            rel="noreferrer"
            title={b.label}
            onMouseEnter={() => setHovered(b.key)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              height: 42, borderRadius: 50,
              background: b.grad,
              textDecoration: 'none',
              boxShadow: hovered === b.key ? `0 8px 24px ${b.shadow}` : `0 3px 10px ${b.shadow.replace('.5', '.3')}`,
              transform: hovered === b.key ? 'translateX(-4px) scale(1.06)' : 'translateX(0) scale(1)',
              transition: 'all .25s ease',
              overflow: 'hidden',
              width: hovered === b.key ? 'auto' : 42,
              paddingLeft: 12,
              paddingRight: hovered === b.key ? 16 : 12,
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>{b.icon}</span>
            <span style={{
              color: '#fff', fontWeight: 700, fontSize: '.8rem',
              maxWidth: hovered === b.key ? 90 : 0,
              overflow: 'hidden',
              transition: 'max-width .25s ease',
            }}>{b.label}</span>
          </a>
        ))}
      </div>
    </>
  );
}
