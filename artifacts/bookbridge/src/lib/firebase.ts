declare global {
  interface Window { firebase: any; }
}

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBtFYTt_K3ggSjgBmBb-sn09l1hOGwxloM",
  authDomain: "bookbridge-admin.firebaseapp.com",
  databaseURL: "https://bookbridge-admin-default-rtdb.firebaseio.com",
  projectId: "bookbridge-admin",
  storageBucket: "bookbridge-admin.firebasestorage.app",
  messagingSenderId: "163400594978",
  appId: "1:163400594978:web:d1c46f6509090923e63c7b"
};

export function ensureFirebase() {
  const fb = window.firebase;
  if (!fb) return null;
  if (!fb.apps?.length) fb.initializeApp(FIREBASE_CONFIG);
  return fb;
}

export function db() {
  return ensureFirebase()?.database() ?? null;
}

export function fbAuth() {
  return ensureFirebase()?.auth() ?? null;
}

export function generateTrackingId(prefix: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  const num = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}-${num}`;
}
