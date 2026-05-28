import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Inbox, Gift, BookOpen, Settings, LogOut,
  Eye, Check, X, Trash2, Clock, AlertCircle, Menu
} from 'lucide-react';
import { db, fbAuth } from '../lib/firebase';
import { LOGO } from '../lib/images';

type Section = 'dashboard' | 'requests' | 'donations' | 'resources' | 'settings';

interface BookRequest {
  firebaseKey: string; trackingId: string; studentName: string; school: string;
  bookTitle?: string; subject?: string; class?: string; phone: string; email?: string;
  reason?: string; status: 'pending' | 'approved' | 'rejected'; date: string; createdAt: number;
}
interface BookDonation {
  firebaseKey: string; trackingId: string; donorName: string; phone: string; email?: string;
  bookTitle: string; subject?: string; quantity?: string; condition?: string; location?: string;
  message?: string; status: 'pending' | 'accepted' | 'received' | 'rejected'; date: string; createdAt: number;
}

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  pending:  { bg: '#fef9c3', text: '#a16207', border: '#fde047' },
  approved: { bg: '#dcfce7', text: '#15803d', border: '#86efac' },
  accepted: { bg: '#dcfce7', text: '#15803d', border: '#86efac' },
  received: { bg: '#dbeafe', text: '#1d4ed8', border: '#93c5fd' },
  rejected: { bg: '#fee2e2', text: '#b91c1c', border: '#fca5a5' },
};

function Badge({ status }: { status: string }) {
  const c = STATUS_COLORS[status] ?? STATUS_COLORS.pending;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 10px', borderRadius: 50, fontSize: '.73rem', fontWeight: 700,
      background: c.bg, color: c.text, border: `1px solid ${c.border}`, textTransform: 'capitalize',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.text, display: 'inline-block' }} />
      {status}
    </span>
  );
}

const iconBtn: React.CSSProperties = {
  background: '#f0f4ff', border: 'none', borderRadius: 6, width: 28, height: 28,
  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  color: '#6b7a99', transition: 'background .15s',
};

function useAdminMobile() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 900);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', fn, { passive: true });
    return () => window.removeEventListener('resize', fn);
  }, []);
  return isMobile;
}

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [section, setSection] = useState<Section>('dashboard');
  const [requests, setRequests] = useState<BookRequest[]>([]);
  const [donations, setDonations] = useState<BookDonation[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailItem, setDetailItem] = useState<any>(null);
  const [settingsPass, setSettingsPass] = useState({ current: '', next: '', confirm: '' });
  const [settingsMsg, setSettingsMsg] = useState('');
  const [settingsMsgType, setSettingsMsgType] = useState<'ok'|'err'>('ok');
  const [storedPassword, setStoredPassword] = useState('admin123');
  const [pwLoading, setPwLoading] = useState(false);
  const isMobile = useAdminMobile();

  async function fetchStoredPassword() {
    try {
      const database = db();
      if (!database) return 'admin123';
      const snap = await database.ref('admin/config/password').once('value');
      return snap.val() ?? 'admin123';
    } catch { return 'admin123'; }
  }

  useEffect(() => {
    const stored = sessionStorage.getItem('bb_admin_auth');
    if (stored === '1') {
      signInAnon().then(async () => {
        const pw = await fetchStoredPassword();
        setStoredPassword(pw);
        setLoggedIn(true);
        setAuthChecking(false);
      });
    } else {
      setAuthChecking(false);
    }
  }, []);

  async function signInAnon() {
    const auth = fbAuth();
    if (!auth) return;
    if (!auth.currentUser) await auth.signInAnonymously().catch(() => {});
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    if (username !== 'admin') {
      setLoginError('Invalid credentials. Please try again.');
      setLoginLoading(false);
      return;
    }
    await signInAnon();
    const currentPw = await fetchStoredPassword();
    if (password !== currentPw) {
      setLoginError('Invalid credentials. Please try again.');
      setLoginLoading(false);
      return;
    }
    setStoredPassword(currentPw);
    sessionStorage.setItem('bb_admin_auth', '1');
    setLoggedIn(true);
    setLoginLoading(false);
  }

  useEffect(() => {
    if (!loggedIn) return;
    const database = db();
    if (!database) return;
    const reqRef = database.ref('requests');
    const donRef = database.ref('donations');
    reqRef.on('value', (snap: any) => {
      const val = snap.val() ?? {};
      const items = Object.entries(val).map(([k, v]: [string, any]) => ({ firebaseKey: k, ...v } as BookRequest));
      items.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
      setRequests(items);
    });
    donRef.on('value', (snap: any) => {
      const val = snap.val() ?? {};
      const items = Object.entries(val).map(([k, v]: [string, any]) => ({ firebaseKey: k, ...v } as BookDonation));
      items.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
      setDonations(items);
    });
    return () => { reqRef.off(); donRef.off(); };
  }, [loggedIn]);

  function updateReqStatus(key: string, status: string) { db()?.ref('requests/' + key).update({ status }); }
  function updateDonStatus(key: string, status: string) { db()?.ref('donations/' + key).update({ status }); }
  function deleteReq(key: string) { if (confirm('Delete this request?')) db()?.ref('requests/' + key).remove(); }
  function deleteDon(key: string) { if (confirm('Delete this donation?')) db()?.ref('donations/' + key).remove(); }

  function logout() {
    sessionStorage.removeItem('bb_admin_auth');
    fbAuth()?.signOut().catch(() => {});
    setLoggedIn(false);
  }

  if (authChecking) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A1628' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid #0EA5E9', borderTopColor: 'transparent', animation: 'spin .8s linear infinite' }} />
        <style>{`@keyframes spin{ to{ transform:rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#0A1628 0%,#0047AB 60%,#0A1628 100%)', padding: 20, position: 'relative' }}>
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(14,165,233,.15) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,.1) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ background: 'rgba(255,255,255,.97)', borderRadius: 24, padding: '44px 40px', width: '100%', maxWidth: 420, boxShadow: '0 40px 80px rgba(0,0,0,.3)', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <img src={LOGO} alt="BookBridge" style={{ width: 72, height: 72, borderRadius: 18, objectFit: 'cover', boxShadow: '0 12px 30px rgba(0,71,171,.25)', marginBottom: 16 }} />
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.9rem', fontWeight: 700, color: '#0A1628', margin: '0 0 6px' }}>Admin Dashboard</h1>
            <p style={{ color: '#6b7a99', fontSize: '.875rem', margin: 0 }}>Sign in to manage Project BookBridge</p>
          </div>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '.73rem', fontWeight: 700, letterSpacing: .5, textTransform: 'uppercase', color: '#6b7a99', marginBottom: 6 }}>Username</label>
              <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username"
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e8edf8', fontSize: '.9rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border .2s' }}
                onFocus={e => (e.currentTarget.style.border = '1.5px solid #0EA5E9')}
                onBlur={e => (e.currentTarget.style.border = '1.5px solid #e8edf8')}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: '.73rem', fontWeight: 700, letterSpacing: .5, textTransform: 'uppercase', color: '#6b7a99', marginBottom: 6 }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password"
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e8edf8', fontSize: '.9rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border .2s' }}
                onFocus={e => (e.currentTarget.style.border = '1.5px solid #0EA5E9')}
                onBlur={e => (e.currentTarget.style.border = '1.5px solid #e8edf8')}
              />
            </div>
            {loginError && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 8, padding: '10px 12px', marginBottom: 16 }}>
                <AlertCircle size={15} color="#b91c1c" />
                <span style={{ color: '#b91c1c', fontSize: '.83rem' }}>{loginError}</span>
              </div>
            )}
            <button type="submit" disabled={loginLoading} style={{
              width: '100%', padding: '13px 0', borderRadius: 50, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg,#0047AB,#0EA5E9)', color: '#fff', fontWeight: 700, fontSize: '1rem',
              boxShadow: '0 8px 20px rgba(0,71,171,.35)', opacity: loginLoading ? .6 : 1,
            }}>{loginLoading ? 'Signing in…' : 'Sign In'}</button>
          </form>
        </div>
      </div>
    );
  }

  const pendingReqs = requests.filter(r => r.status === 'pending').length;
  const pendingDons = donations.filter(d => d.status === 'pending').length;

  const NAV_ITEMS: { key: Section; label: string; icon: React.ReactNode; badge?: number }[] = [
    { key: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { key: 'requests', label: 'Book Requests', icon: <Inbox size={18} />, badge: pendingReqs },
    { key: 'donations', label: 'Book Donations', icon: <Gift size={18} />, badge: pendingDons },
    { key: 'resources', label: 'Resources', icon: <BookOpen size={18} /> },
    { key: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  const sidebarVisible = !isMobile || drawerOpen;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#f4f7fe' }}>

      {/* Mobile overlay behind drawer */}
      {isMobile && drawerOpen && (
        <div onClick={() => setDrawerOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(3px)' }} />
      )}

      {/* Sidebar — always visible on desktop, drawer on mobile */}
      {sidebarVisible && (
        <aside style={{
          width: 248, flexShrink: 0, background: 'linear-gradient(180deg,#0A1628 0%,#0D1F3C 100%)',
          display: 'flex', flexDirection: 'column',
          position: isMobile ? 'fixed' : 'sticky',
          top: 0, left: 0, bottom: 0,
          height: isMobile ? '100vh' : '100vh',
          zIndex: isMobile ? 100 : 10,
          boxShadow: isMobile ? '4px 0 40px rgba(0,0,0,.35)' : '2px 0 20px rgba(0,71,171,.1)',
        }}>
          {/* Logo area */}
          <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src={LOGO} alt="" style={{ width: 38, height: 38, borderRadius: 9, objectFit: 'cover', border: '2px solid rgba(255,255,255,.2)' }} />
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.1 }}>Project BookBridge</div>
                <div style={{ color: '#7DD3FC', fontSize: '.7rem', fontWeight: 600, letterSpacing: .5 }}>ADMIN PANEL</div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
            <div style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: 1, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', padding: '0 10px', marginBottom: 8 }}>Menu</div>
            {NAV_ITEMS.map(item => (
              <button key={item.key}
                onClick={() => { setSection(item.key); if (isMobile) setDrawerOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px',
                  borderRadius: 10, border: 'none', cursor: 'pointer', marginBottom: 2,
                  background: section === item.key ? 'rgba(14,165,233,.18)' : 'transparent',
                  color: section === item.key ? '#7DD3FC' : 'rgba(255,255,255,.55)',
                  fontWeight: section === item.key ? 700 : 500, fontSize: '.88rem', textAlign: 'left',
                  transition: 'all .2s',
                }}
                onMouseEnter={e => { if (section !== item.key) { e.currentTarget.style.background = 'rgba(255,255,255,.07)'; e.currentTarget.style.color = '#fff'; } }}
                onMouseLeave={e => { if (section !== item.key) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,.55)'; } }}
              >
                <span style={{ opacity: section === item.key ? 1 : .7 }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && item.badge > 0 ? (
                  <span style={{ background: '#FF0090', color: '#fff', borderRadius: 50, padding: '2px 8px', fontSize: '.68rem', fontWeight: 800 }}>{item.badge}</span>
                ) : null}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,.07)' }}>
            <div style={{ fontSize: '.73rem', color: 'rgba(255,255,255,.3)', padding: '0 10px 8px' }}>Logged in as Admin</div>
            <button onClick={logout} style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px',
              borderRadius: 10, border: 'none', cursor: 'pointer', background: 'transparent',
              color: 'rgba(255,255,255,.45)', fontWeight: 500, fontSize: '.88rem', transition: 'all .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,.15)'; e.currentTarget.style.color = '#f87171'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,.45)'; }}
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </aside>
      )}

      {/* Main content */}
      <main style={{ flex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', marginLeft: 0 }}>
        {/* Topbar */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: 'rgba(244,247,254,.97)', borderBottom: '1px solid #e8edf8',
          padding: '0 24px', height: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backdropFilter: 'blur(12px)', boxShadow: '0 1px 12px rgba(0,71,171,.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {isMobile && (
              <button onClick={() => setDrawerOpen(true)} style={{ display: 'flex', background: '#f0f4ff', border: 'none', cursor: 'pointer', color: '#0A1628', padding: 8, borderRadius: 8 }}>
                <Menu size={20} />
              </button>
            )}
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 700, color: '#0A1628', margin: 0 }}>
              {NAV_ITEMS.find(n => n.key === section)?.label}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#0047AB,#0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '.85rem' }}>A</div>
            <span style={{ color: '#1a2744', fontWeight: 600, fontSize: '.88rem' }}>Admin</span>
          </div>
        </header>

        {/* Page content */}
        <div style={{ padding: '28px', flex: 1 }}>

          {/* ── OVERVIEW ── */}
          {section === 'dashboard' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 18, marginBottom: 28 }}>
                {[
                  { label: 'Total Requests',   value: requests.length,  icon: '📚', color: '#0047AB', bg: '#EFF6FF', border: '#BFDBFE' },
                  { label: 'Pending Requests', value: pendingReqs,      icon: '⏳', color: '#d97706', bg: '#fef9c3', border: '#fde68a' },
                  { label: 'Total Donations',  value: donations.length, icon: '❤️', color: '#FF0090', bg: '#fff0f7', border: '#fbcfe8' },
                  { label: 'Pending Donations',value: pendingDons,      icon: '📦', color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
                ].map(s => (
                  <div key={s.label} style={{ background: '#fff', borderRadius: 16, padding: '20px 18px', boxShadow: '0 2px 16px rgba(0,71,171,.06)', border: `1px solid ${s.border}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ color: '#6b7a99', fontSize: '.75rem', fontWeight: 700, letterSpacing: .5, textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</div>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.4rem', fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
                      </div>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>{s.icon}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 18 }}>
                {[
                  { title: 'Recent Requests', items: requests.slice(0, 5), nameKey: 'studentName', type: 'request' as const },
                  { title: 'Recent Donations', items: donations.slice(0, 5), nameKey: 'donorName', type: 'donation' as const },
                ].map(panel => (
                  <div key={panel.title} style={{ background: '#fff', borderRadius: 16, padding: '22px 20px', boxShadow: '0 2px 16px rgba(0,71,171,.06)' }}>
                    <h3 style={{ fontWeight: 700, color: '#0A1628', fontSize: '.95rem', margin: '0 0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {panel.title}
                      <button onClick={() => setSection(panel.type === 'request' ? 'requests' : 'donations')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0047AB', fontSize: '.78rem', fontWeight: 700 }}>View all →</button>
                    </h3>
                    {panel.items.length === 0
                      ? <p style={{ color: '#6b7a99', fontSize: '.85rem', margin: 0 }}>No entries yet.</p>
                      : panel.items.map((item: any) => (
                        <div key={item.firebaseKey} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f4ff' }}>
                          <div>
                            <div style={{ fontWeight: 600, color: '#0A1628', fontSize: '.88rem' }}>{item[panel.nameKey]}</div>
                            <div style={{ color: '#6b7a99', fontSize: '.75rem' }}>{item.date}</div>
                          </div>
                          <Badge status={item.status} />
                        </div>
                      ))
                    }
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── REQUESTS ── */}
          {section === 'requests' && (
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,71,171,.06)', overflow: 'hidden' }}>
              <div style={{ padding: '18px 22px', borderBottom: '1px solid #f0f4ff' }}>
                <h2 style={{ fontWeight: 700, color: '#0A1628', fontSize: '1rem', margin: 0 }}>📚 Book Requests ({requests.length})</h2>
              </div>
              {requests.length === 0
                ? <div style={{ padding: 40, textAlign: 'center', color: '#6b7a99' }}>No requests yet.</div>
                : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc' }}>
                          {['Student', 'School', 'Book / Subject', 'Phone', 'Date', 'Status', 'Actions'].map(h => (
                            <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '.73rem', fontWeight: 700, letterSpacing: .5, textTransform: 'uppercase', color: '#6b7a99', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {requests.map((r, i) => (
                          <tr key={r.firebaseKey} style={{ borderTop: '1px solid #f0f4ff', background: i % 2 === 0 ? '#fff' : '#fafbff' }}>
                            <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0A1628', fontSize: '.85rem', whiteSpace: 'nowrap' }}>{r.studentName}</td>
                            <td style={{ padding: '10px 14px', color: '#4b5880', fontSize: '.82rem' }}>{r.school || '—'}</td>
                            <td style={{ padding: '10px 14px', color: '#4b5880', fontSize: '.82rem', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.bookTitle || r.subject || '—'}</td>
                            <td style={{ padding: '10px 14px', color: '#4b5880', fontSize: '.82rem', whiteSpace: 'nowrap' }}>{r.phone}</td>
                            <td style={{ padding: '10px 14px', color: '#6b7a99', fontSize: '.78rem', whiteSpace: 'nowrap' }}>{r.date}</td>
                            <td style={{ padding: '10px 14px' }}><Badge status={r.status} /></td>
                            <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                              <div style={{ display: 'flex', gap: 4 }}>
                                <button onClick={() => setDetailItem({ ...r, _type: 'request' })} title="View" style={iconBtn}><Eye size={14} /></button>
                                {r.status !== 'approved' && <button onClick={() => updateReqStatus(r.firebaseKey, 'approved')} title="Approve" style={{ ...iconBtn, color: '#15803d' }}><Check size={14} /></button>}
                                {r.status !== 'rejected' && <button onClick={() => updateReqStatus(r.firebaseKey, 'rejected')} title="Reject" style={{ ...iconBtn, color: '#b91c1c' }}><X size={14} /></button>}
                                <button onClick={() => deleteReq(r.firebaseKey)} title="Delete" style={{ ...iconBtn, color: '#9ca3af' }}><Trash2 size={14} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              }
            </div>
          )}

          {/* ── DONATIONS ── */}
          {section === 'donations' && (
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,71,171,.06)', overflow: 'hidden' }}>
              <div style={{ padding: '18px 22px', borderBottom: '1px solid #f0f4ff' }}>
                <h2 style={{ fontWeight: 700, color: '#0A1628', fontSize: '1rem', margin: 0 }}>❤️ Book Donations ({donations.length})</h2>
              </div>
              {donations.length === 0
                ? <div style={{ padding: 40, textAlign: 'center', color: '#6b7a99' }}>No donations yet.</div>
                : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc' }}>
                          {['Donor', 'Books', 'Qty', 'Condition', 'Location', 'Phone', 'Date', 'Status', 'Actions'].map(h => (
                            <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '.73rem', fontWeight: 700, letterSpacing: .5, textTransform: 'uppercase', color: '#6b7a99', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {donations.map((d, i) => (
                          <tr key={d.firebaseKey} style={{ borderTop: '1px solid #f0f4ff', background: i % 2 === 0 ? '#fff' : '#fafbff' }}>
                            <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0A1628', fontSize: '.85rem', whiteSpace: 'nowrap' }}>{d.donorName}</td>
                            <td style={{ padding: '10px 14px', color: '#4b5880', fontSize: '.82rem', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.bookTitle}</td>
                            <td style={{ padding: '10px 14px', color: '#4b5880', fontSize: '.82rem' }}>{d.quantity || '—'}</td>
                            <td style={{ padding: '10px 14px', color: '#4b5880', fontSize: '.82rem' }}>{d.condition || '—'}</td>
                            <td style={{ padding: '10px 14px', color: '#4b5880', fontSize: '.82rem' }}>{d.location || '—'}</td>
                            <td style={{ padding: '10px 14px', color: '#4b5880', fontSize: '.82rem', whiteSpace: 'nowrap' }}>{d.phone}</td>
                            <td style={{ padding: '10px 14px', color: '#6b7a99', fontSize: '.78rem', whiteSpace: 'nowrap' }}>{d.date}</td>
                            <td style={{ padding: '10px 14px' }}><Badge status={d.status} /></td>
                            <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                              <div style={{ display: 'flex', gap: 4 }}>
                                <button onClick={() => setDetailItem({ ...d, _type: 'donation' })} title="View" style={iconBtn}><Eye size={14} /></button>
                                {d.status !== 'accepted' && <button onClick={() => updateDonStatus(d.firebaseKey, 'accepted')} title="Accept" style={{ ...iconBtn, color: '#15803d' }}><Check size={14} /></button>}
                                {d.status !== 'received' && <button onClick={() => updateDonStatus(d.firebaseKey, 'received')} title="Mark Received" style={{ ...iconBtn, color: '#1d4ed8' }}><Clock size={14} /></button>}
                                {d.status !== 'rejected' && <button onClick={() => updateDonStatus(d.firebaseKey, 'rejected')} title="Reject" style={{ ...iconBtn, color: '#b91c1c' }}><X size={14} /></button>}
                                <button onClick={() => deleteDon(d.firebaseKey)} title="Delete" style={{ ...iconBtn, color: '#9ca3af' }}><Trash2 size={14} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              }
            </div>
          )}

          {/* ── RESOURCES ── */}
          {section === 'resources' && (
            <div style={{ maxWidth: 600 }}>
              <div style={{ background: '#fff', borderRadius: 20, padding: '48px 40px', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,71,171,.08)' }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>📚</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 700, color: '#0A1628', margin: '0 0 12px' }}>Learning Resources</h2>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg,#0A1628,#0047AB)', borderRadius: 50, padding: '7px 18px', color: '#7DD3FC', fontWeight: 700, fontSize: '.82rem', marginBottom: 20 }}>
                  <Clock size={14} /> Coming Soon
                </div>
                <p style={{ color: '#6b7a99', lineHeight: 1.7, margin: 0 }}>The digital learning resources library is under development. You'll be able to upload and manage study materials, past questions, and revision guides for all JSS subjects here.</p>
              </div>
            </div>
          )}

          {/* ── SETTINGS ── */}
          {section === 'settings' && (
            <div style={{ maxWidth: 480 }}>
              <div style={{ background: '#fff', borderRadius: 20, padding: '32px 28px', boxShadow: '0 4px 24px rgba(0,71,171,.08)', marginBottom: 20 }}>
                <h2 style={{ fontWeight: 700, color: '#0A1628', fontSize: '1.1rem', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#0047AB,#0EA5E9)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>⚙️</span>
                  Change Admin Password
                </h2>

                <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 12, padding: '12px 16px', marginBottom: 20, fontSize: '.83rem', color: '#0369a1', lineHeight: 1.7 }}>
                  Your password is stored securely in Firebase and will persist even after the site is redeployed. Username is always <code style={{ background: '#dbeafe', padding: '1px 5px', borderRadius: 4 }}>admin</code>.
                </div>

                {settingsMsg && (
                  <div style={{
                    display: 'flex', gap: 8, alignItems: 'center',
                    background: settingsMsgType === 'ok' ? '#dcfce7' : '#fee2e2',
                    border: `1px solid ${settingsMsgType === 'ok' ? '#86efac' : '#fca5a5'}`,
                    borderRadius: 10, padding: '10px 14px', marginBottom: 16,
                    color: settingsMsgType === 'ok' ? '#15803d' : '#b91c1c', fontSize: '.85rem',
                  }}>
                    {settingsMsgType === 'ok' ? '✅' : '❌'} {settingsMsg}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {([['Current Password', 'current'], ['New Password', 'next'], ['Confirm New Password', 'confirm']] as const).map(([label, key]) => (
                    <div key={key}>
                      <label style={{ display: 'block', fontSize: '.73rem', fontWeight: 700, letterSpacing: .5, textTransform: 'uppercase', color: '#6b7a99', marginBottom: 6 }}>{label}</label>
                      <input type="password" value={settingsPass[key]} onChange={e => setSettingsPass(p => ({ ...p, [key]: e.target.value }))}
                        placeholder={key === 'current' ? 'Enter current password' : key === 'next' ? 'At least 6 characters' : 'Repeat new password'}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid #e8edf8', fontSize: '.9rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border .2s' }}
                        onFocus={e => (e.currentTarget.style.border = '1.5px solid #0EA5E9')}
                        onBlur={e => (e.currentTarget.style.border = '1.5px solid #e8edf8')}
                      />
                    </div>
                  ))}
                  <button
                    disabled={pwLoading}
                    onClick={async () => {
                      setSettingsMsg('');
                      if (settingsPass.current !== storedPassword) {
                        setSettingsMsgType('err');
                        setSettingsMsg('Current password is incorrect.');
                        return;
                      }
                      if (settingsPass.next.length < 6) {
                        setSettingsMsgType('err');
                        setSettingsMsg('New password must be at least 6 characters.');
                        return;
                      }
                      if (settingsPass.next !== settingsPass.confirm) {
                        setSettingsMsgType('err');
                        setSettingsMsg('Passwords do not match.');
                        return;
                      }
                      setPwLoading(true);
                      try {
                        const database = db();
                        if (database) {
                          await database.ref('admin/config/password').set(settingsPass.next);
                          setStoredPassword(settingsPass.next);
                          setSettingsMsgType('ok');
                          setSettingsMsg('Password updated successfully! Use your new password next time you log in.');
                          setSettingsPass({ current: '', next: '', confirm: '' });
                        } else {
                          setSettingsMsgType('err');
                          setSettingsMsg('Database connection failed. Try again.');
                        }
                      } catch {
                        setSettingsMsgType('err');
                        setSettingsMsg('Failed to save. Please check your connection.');
                      }
                      setPwLoading(false);
                    }}
                    style={{
                      padding: '13px 0', borderRadius: 50, border: 'none', cursor: pwLoading ? 'not-allowed' : 'pointer',
                      background: 'linear-gradient(135deg,#0047AB,#0EA5E9)',
                      color: '#fff', fontWeight: 700, fontSize: '.9rem',
                      boxShadow: '0 6px 16px rgba(0,71,171,.3)',
                      opacity: pwLoading ? .6 : 1, transition: 'opacity .2s',
                    }}
                  >
                    {pwLoading ? 'Saving…' : '🔐 Update Password'}
                  </button>
                </div>
              </div>

              {/* Danger zone */}
              <div style={{ background: '#fff', borderRadius: 20, padding: '24px 28px', boxShadow: '0 4px 24px rgba(0,71,171,.08)', border: '1px solid #fee2e2' }}>
                <h3 style={{ fontWeight: 700, color: '#b91c1c', fontSize: '.9rem', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  🔓 Session
                </h3>
                <p style={{ color: '#6b7a99', fontSize: '.83rem', lineHeight: 1.6, marginBottom: 16 }}>
                  You are currently logged in as <strong>admin</strong>. Click below to sign out of this session.
                </p>
                <button onClick={logout} style={{
                  padding: '10px 24px', borderRadius: 50, border: '2px solid #fee2e2', cursor: 'pointer',
                  background: 'transparent', color: '#b91c1c', fontWeight: 700, fontSize: '.85rem',
                  transition: 'all .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fee2e2'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >Sign Out</button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Detail modal */}
      {detailItem && (
        <div onClick={e => { if (e.target === e.currentTarget) setDetailItem(null); }} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(10,22,40,.65)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: '32px', width: '100%', maxWidth: 480, boxShadow: '0 40px 80px rgba(0,0,0,.25)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 700, color: '#0A1628', margin: 0 }}>
                {detailItem._type === 'request' ? '📚 Request Details' : '❤️ Donation Details'}
              </h3>
              <button onClick={() => setDetailItem(null)} style={{ background: '#f0f4ff', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={16} color="#6b7a99" />
              </button>
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              {Object.entries(detailItem)
                .filter(([k]) => !['firebaseKey', '_type', 'createdAt'].includes(k))
                .map(([k, v]) => (
                  <div key={k} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 10, borderBottom: '1px solid #f0f4ff', paddingBottom: 8 }}>
                    <div style={{ color: '#6b7a99', fontSize: '.78rem', fontWeight: 700, textTransform: 'capitalize', letterSpacing: .3 }}>{k.replace(/([A-Z])/g, ' $1').toLowerCase()}</div>
                    <div style={{ color: '#0A1628', fontSize: '.85rem', fontWeight: 500 }}>
                      {k === 'status' ? <Badge status={v as string} /> : String(v) || '—'}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
