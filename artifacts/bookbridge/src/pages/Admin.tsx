import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Inbox, Gift, BookOpen, Settings, LogOut,
  Eye, Check, X, Trash2, Clock, AlertCircle, ChevronDown, Menu
} from 'lucide-react';
import { db, fbAuth, ensureFirebase } from '../lib/firebase';
import { LOGO } from '../lib/images';

type Section = 'dashboard' | 'requests' | 'donations' | 'resources' | 'settings';

interface BookRequest {
  firebaseKey: string;
  trackingId: string;
  studentName: string;
  school: string;
  bookTitle?: string;
  subject?: string;
  class?: string;
  phone: string;
  email?: string;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  createdAt: number;
}

interface BookDonation {
  firebaseKey: string;
  trackingId: string;
  donorName: string;
  phone: string;
  email?: string;
  bookTitle: string;
  subject?: string;
  quantity?: string;
  condition?: string;
  location?: string;
  message?: string;
  status: 'pending' | 'accepted' | 'received' | 'rejected';
  date: string;
  createdAt: number;
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
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      textTransform: 'capitalize',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.text, display: 'inline-block' }} />
      {status}
    </span>
  );
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [detailItem, setDetailItem] = useState<any>(null);
  const [settingsPass, setSettingsPass] = useState({ current: '', next: '', confirm: '' });
  const [settingsMsg, setSettingsMsg] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('bb_admin_auth');
    if (stored === '1') {
      signInAnon().then(() => { setLoggedIn(true); setAuthChecking(false); });
    } else {
      setAuthChecking(false);
    }
  }, []);

  async function signInAnon() {
    const auth = fbAuth();
    if (!auth) return;
    if (!auth.currentUser) {
      await auth.signInAnonymously().catch(() => {});
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (username !== 'admin' || password !== 'admin123') {
      setLoginError('Invalid credentials. Please try again.');
      return;
    }
    setLoginLoading(true);
    await signInAnon();
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

  function updateReqStatus(key: string, status: string) {
    db()?.ref('requests/' + key).update({ status });
  }
  function updateDonStatus(key: string, status: string) {
    db()?.ref('donations/' + key).update({ status });
  }
  function deleteReq(key: string) {
    if (confirm('Delete this request?')) db()?.ref('requests/' + key).remove();
  }
  function deleteDon(key: string) {
    if (confirm('Delete this donation?')) db()?.ref('donations/' + key).remove();
  }

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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0A1628 0%, #0047AB 60%, #0A1628 100%)', padding: 20 }}>
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{
          background: 'rgba(255,255,255,.97)', borderRadius: 24, padding: '44px 40px', width: '100%', maxWidth: 420,
          boxShadow: '0 40px 80px rgba(0,0,0,.3)',
        }}>
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
              background: 'linear-gradient(135deg,#0047AB,#0EA5E9)',
              color: '#fff', fontWeight: 700, fontSize: '1rem',
              boxShadow: '0 8px 20px rgba(0,71,171,.35)', transition: 'opacity .2s',
              opacity: loginLoading ? .6 : 1,
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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#f4f7fe' }}>
      {/* Sidebar */}
      <aside style={{
        width: 248, flexShrink: 0, background: '#0A1628', display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: sidebarOpen ? 0 : -248, bottom: 0, zIndex: 100, transition: 'left .3s',
      }} className="admin-sidebar">
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={LOGO} alt="" style={{ width: 38, height: 38, borderRadius: 9, objectFit: 'cover', border: '2px solid rgba(255,255,255,.15)' }} />
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.1 }}>Project BookBridge</div>
              <div style={{ color: '#7DD3FC', fontSize: '.72rem', fontWeight: 600 }}>Admin Panel</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '16px 12px', overflow: 'auto' }}>
          {NAV_ITEMS.map(item => (
            <button key={item.key} onClick={() => { setSection(item.key); setSidebarOpen(false); }} style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px',
              borderRadius: 10, border: 'none', cursor: 'pointer', marginBottom: 2,
              background: section === item.key ? 'rgba(14,165,233,.18)' : 'transparent',
              color: section === item.key ? '#7DD3FC' : 'rgba(255,255,255,.55)',
              fontWeight: section === item.key ? 700 : 500, fontSize: '.88rem', textAlign: 'left',
              transition: 'all .2s',
            }}
            onMouseEnter={e => { if (section !== item.key) { e.currentTarget.style.background = 'rgba(255,255,255,.06)'; e.currentTarget.style.color = '#fff'; } }}
            onMouseLeave={e => { if (section !== item.key) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,.55)'; } }}
            >
              {item.icon}
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && item.badge > 0 ? (
                <span style={{ background: '#FF0090', color: '#fff', borderRadius: 50, padding: '1px 7px', fontSize: '.7rem', fontWeight: 800 }}>{item.badge}</span>
              ) : null}
            </button>
          ))}
        </nav>

        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,.06)' }}>
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

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(0,0,0,.5)' }} className="admin-overlay" />}

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: 248, minHeight: '100vh', display: 'flex', flexDirection: 'column' }} className="admin-main">
        {/* Topbar */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 50, background: 'rgba(244,247,254,.97)',
          borderBottom: '1px solid #e8edf8', padding: '0 28px', height: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="admin-hamburger" onClick={() => setSidebarOpen(true)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#0A1628' }}>
              <Menu size={22} />
            </button>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 700, color: '#0A1628', margin: 0, textTransform: 'capitalize' }}>
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
          {section === 'dashboard' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 18, marginBottom: 32 }}>
                {[
                  { label: 'Total Requests', value: requests.length, icon: '📚', color: '#0047AB', bg: '#EFF6FF' },
                  { label: 'Pending Requests', value: pendingReqs, icon: '⏳', color: '#f59e0b', bg: '#fef9c3' },
                  { label: 'Total Donations', value: donations.length, icon: '❤️', color: '#FF0090', bg: '#fff0f7' },
                  { label: 'Pending Donations', value: pendingDons, icon: '📦', color: '#7C3AED', bg: '#F5F3FF' },
                ].map(s => (
                  <div key={s.label} style={{ background: '#fff', borderRadius: 16, padding: '22px 20px', boxShadow: '0 2px 16px rgba(0,71,171,.06)', border: '1px solid rgba(0,71,171,.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ color: '#6b7a99', fontSize: '.78rem', fontWeight: 600, letterSpacing: .5, textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</div>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
                      </div>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>{s.icon}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }} className="admin-overview-grid">
                {[
                  { title: 'Recent Requests', items: requests.slice(0, 5), nameKey: 'studentName', type: 'request' },
                  { title: 'Recent Donations', items: donations.slice(0, 5), nameKey: 'donorName', type: 'donation' },
                ].map(panel => (
                  <div key={panel.title} style={{ background: '#fff', borderRadius: 16, padding: '22px 20px', boxShadow: '0 2px 16px rgba(0,71,171,.06)' }}>
                    <h3 style={{ fontWeight: 700, color: '#0A1628', fontSize: '.95rem', margin: '0 0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {panel.title}
                      <button onClick={() => setSection(panel.type === 'request' ? 'requests' : 'donations')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0047AB', fontSize: '.78rem', fontWeight: 700 }}>View all →</button>
                    </h3>
                    {panel.items.length === 0 ? <p style={{ color: '#6b7a99', fontSize: '.85rem' }}>No entries yet.</p> : panel.items.map((item: any) => (
                      <div key={item.firebaseKey} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f4ff' }}>
                        <div>
                          <div style={{ fontWeight: 600, color: '#0A1628', fontSize: '.88rem' }}>{item[panel.nameKey]}</div>
                          <div style={{ color: '#6b7a99', fontSize: '.75rem' }}>{item.date}</div>
                        </div>
                        <Badge status={item.status} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === 'requests' && (
            <div>
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,71,171,.06)', overflow: 'hidden' }}>
                <div style={{ padding: '18px 22px', borderBottom: '1px solid #f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h2 style={{ fontWeight: 700, color: '#0A1628', fontSize: '1rem', margin: 0 }}>📚 Book Requests ({requests.length})</h2>
                </div>
                {requests.length === 0 ? (
                  <div style={{ padding: 40, textAlign: 'center', color: '#6b7a99' }}>No requests yet.</div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc' }}>
                          {['Student', 'School', 'Book/Subject', 'Phone', 'Date', 'Status', 'Actions'].map(h => (
                            <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '.73rem', fontWeight: 700, letterSpacing: .5, textTransform: 'uppercase', color: '#6b7a99', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {requests.map((r, i) => (
                          <tr key={r.firebaseKey} style={{ borderTop: '1px solid #f0f4ff', background: i % 2 === 0 ? '#fff' : '#fafbff' }}>
                            <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0A1628', fontSize: '.85rem', whiteSpace: 'nowrap' }}>{r.studentName}</td>
                            <td style={{ padding: '10px 14px', color: '#4b5880', fontSize: '.82rem' }}>{r.school}</td>
                            <td style={{ padding: '10px 14px', color: '#4b5880', fontSize: '.82rem', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.bookTitle || r.subject || '—'}</td>
                            <td style={{ padding: '10px 14px', color: '#4b5880', fontSize: '.82rem', whiteSpace: 'nowrap' }}>{r.phone}</td>
                            <td style={{ padding: '10px 14px', color: '#6b7a99', fontSize: '.78rem', whiteSpace: 'nowrap' }}>{r.date}</td>
                            <td style={{ padding: '10px 14px' }}><Badge status={r.status} /></td>
                            <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                              <div style={{ display: 'flex', gap: 4 }}>
                                <button onClick={() => setDetailItem({ ...r, _type: 'request' })} title="View" style={{ ...iconBtn }}><Eye size={14} /></button>
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
                )}
              </div>
            </div>
          )}

          {section === 'donations' && (
            <div>
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,71,171,.06)', overflow: 'hidden' }}>
                <div style={{ padding: '18px 22px', borderBottom: '1px solid #f0f4ff' }}>
                  <h2 style={{ fontWeight: 700, color: '#0A1628', fontSize: '1rem', margin: 0 }}>❤️ Book Donations ({donations.length})</h2>
                </div>
                {donations.length === 0 ? (
                  <div style={{ padding: 40, textAlign: 'center', color: '#6b7a99' }}>No donations yet.</div>
                ) : (
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
                                <button onClick={() => setDetailItem({ ...d, _type: 'donation' })} title="View" style={{ ...iconBtn }}><Eye size={14} /></button>
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
                )}
              </div>
            </div>
          )}

          {section === 'resources' && (
            <div style={{ maxWidth: 600 }}>
              <div style={{ background: '#fff', borderRadius: 20, padding: '48px 40px', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,71,171,.08)' }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>📚</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 700, color: '#0A1628', margin: '0 0 12px' }}>Learning Resources</h2>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg,#0A1628,#0047AB)',
                  borderRadius: 50, padding: '7px 18px', color: '#7DD3FC', fontWeight: 700, fontSize: '.82rem', marginBottom: 20,
                }}>
                  <Clock size={14} /> Coming Soon
                </div>
                <p style={{ color: '#6b7a99', lineHeight: 1.7, margin: 0 }}>
                  The digital learning resources library is under development. Once launched, you'll be able to upload and manage study materials, past question papers, and revision guides for all JSS subjects here.
                </p>
              </div>
            </div>
          )}

          {section === 'settings' && (
            <div style={{ maxWidth: 480 }}>
              <div style={{ background: '#fff', borderRadius: 20, padding: '32px 28px', boxShadow: '0 4px 24px rgba(0,71,171,.08)' }}>
                <h2 style={{ fontWeight: 700, color: '#0A1628', fontSize: '1.1rem', margin: '0 0 24px' }}>⚙️ Account Settings</h2>
                <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 12, padding: '12px 16px', marginBottom: 24, fontSize: '.83rem', color: '#0369a1' }}>
                  <strong>Current credentials:</strong> admin / admin123. To change the password for production, update the Admin.tsx comparison logic and redeploy.
                </div>
                {settingsMsg && (
                  <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: 10, padding: '10px 14px', marginBottom: 16, color: '#15803d', fontSize: '.85rem' }}>{settingsMsg}</div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {([['Current Password', 'current'], ['New Password', 'next'], ['Confirm New Password', 'confirm']] as const).map(([label, key]) => (
                    <div key={key}>
                      <label style={{ display: 'block', fontSize: '.73rem', fontWeight: 700, letterSpacing: .5, textTransform: 'uppercase', color: '#6b7a99', marginBottom: 6 }}>{label}</label>
                      <input type="password" value={settingsPass[key]} onChange={e => setSettingsPass(p => ({ ...p, [key]: e.target.value }))}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid #e8edf8', fontSize: '.9rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                        onFocus={e => (e.currentTarget.style.border = '1.5px solid #0EA5E9')}
                        onBlur={e => (e.currentTarget.style.border = '1.5px solid #e8edf8')}
                      />
                    </div>
                  ))}
                  <button onClick={() => {
                    if (settingsPass.current !== 'admin123') { setSettingsMsg('Current password is incorrect.'); return; }
                    if (settingsPass.next.length < 6) { setSettingsMsg('New password must be at least 6 characters.'); return; }
                    if (settingsPass.next !== settingsPass.confirm) { setSettingsMsg('Passwords do not match.'); return; }
                    setSettingsMsg('Password noted. Redeploy the app with the updated credentials to persist this change.');
                    setSettingsPass({ current: '', next: '', confirm: '' });
                  }} style={{
                    padding: '12px 0', borderRadius: 50, border: 'none', cursor: 'pointer',
                    background: 'linear-gradient(135deg,#0047AB,#0EA5E9)',
                    color: '#fff', fontWeight: 700, fontSize: '.9rem',
                  }}>Update Password</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Detail modal */}
      {detailItem && (
        <div onClick={e => { if (e.target === e.currentTarget) setDetailItem(null); }} style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(10,22,40,.65)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: '32px', width: '100%', maxWidth: 480, boxShadow: '0 40px 80px rgba(0,0,0,.25)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 700, color: '#0A1628', margin: 0 }}>
                {detailItem._type === 'request' ? '📚 Request Details' : '❤️ Donation Details'}
              </h3>
              <button onClick={() => setDetailItem(null)} style={{ background: '#f0f4ff', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={16} color="#6b7a99" />
              </button>
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              {Object.entries(detailItem)
                .filter(([k]) => !['firebaseKey', '_type', 'createdAt'].includes(k))
                .map(([k, v]) => (
                  <div key={k} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 10, borderBottom: '1px solid #f0f4ff', paddingBottom: 8 }}>
                    <div style={{ color: '#6b7a99', fontSize: '.78rem', fontWeight: 700, textTransform: 'capitalize', letterSpacing: .3 }}>
                      {k.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </div>
                    <div style={{ color: '#0A1628', fontSize: '.85rem', fontWeight: 500 }}>
                      {k === 'status' ? <Badge status={v as string} /> : String(v) || '—'}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:900px){
          .admin-sidebar{ left:-248px !important; }
          .admin-main{ margin-left:0 !important; }
          .admin-hamburger{ display:flex !important; }
          .admin-overview-grid{ grid-template-columns:1fr !important; }
        }
        @media(max-width:600px){
          .admin-sidebar.open{ left:0 !important; }
        }
      `}</style>
    </div>
  );
}

const iconBtn: React.CSSProperties = {
  background: '#f0f4ff', border: 'none', borderRadius: 6, width: 28, height: 28,
  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  color: '#6b7a99', transition: 'background .15s',
};
