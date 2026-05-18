/**
 * Security Utilities — Faralljibrill Photography
 * ─────────────────────────────────────────────────────────────────────────
 * Lokasi   : src/app/utils/security-utils.ts
 * Deskripsi: Frontend security helpers sesuai OWASP best practices
 * Dipakai  : src/app/App.tsx → initSecurityMeasures()
 * ─────────────────────────────────────────────────────────────────────────
 */

// ============================================================================
// ENVIRONMENT HELPER (Vite uses import.meta.env, NOT process.env)
// ============================================================================

const isProd = import.meta.env.PROD;       // true in production build
const isDev  = import.meta.env.DEV;        // true in dev server

// ============================================================================
// 1. CONSOLE SECURITY
//    Disable console output in production to prevent info disclosure
// ============================================================================

export function setupConsoleSecurity(): void {
  if (isProd) {
    console.log   = () => {};
    console.debug = () => {};
    console.info  = () => {};
    // console.error stays active for error tracking (Sentry, etc.)
  }
}

// ============================================================================
// 2. URL VALIDATION
//    Whitelist-based URL validation — prevent open redirect attacks
// ============================================================================

const ALLOWED_DOMAINS: readonly string[] = [
  'wa.me',                    // WhatsApp
  'instagram.com',            // Instagram
  'www.instagram.com',
  'tiktok.com',               // TikTok
  'www.tiktok.com',
  'youtube.com',              // YouTube
  'www.youtube.com',
  'maps.google.com',          // Google Maps
  'maps.app.goo.gl',          // Google Maps short URL
  'www.google.com',           // Google Maps embed
];

export function isUrlSafe(url: string): boolean {
  if (!url || typeof url !== 'string') return false;

  try {
    const parsed = new URL(url);

    // Allow http/https only
    if (!['http:', 'https:'].includes(parsed.protocol)) return false;

    // Check against whitelist
    return ALLOWED_DOMAINS.some(domain =>
      parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
}

export function sanitizeUrl(url: string): string | null {
  return isUrlSafe(url) ? url : null;
}

// ============================================================================
// 3. RATE LIMITER
//    Simple in-memory rate limiter — prevent form spam / button abuse
// ============================================================================

interface RateRequest {
  key: string;
  timestamp: number;
}

export class RateLimiter {
  private requests: RateRequest[] = [];

  constructor(
    private readonly maxRequests: number = 5,
    private readonly windowMs: number = 60_000
  ) {}

  isAllowed(key: string = 'default'): boolean {
    const now = Date.now();

    // Remove expired entries
    this.requests = this.requests.filter(r => now - r.timestamp < this.windowMs);

    // Count matching key
    const count = this.requests.filter(r => r.key === key).length;
    if (count >= this.maxRequests) return false;

    this.requests.push({ key, timestamp: now });
    return true;
  }

  reset(key: string): void {
    this.requests = this.requests.filter(r => r.key !== key);
  }
}

// Singleton untuk form submissions (3 per 5 detik)
export const formRateLimiter = new RateLimiter(3, 5_000);

// ============================================================================
// 4. INPUT SANITIZER
//    Escape user-facing strings — prevent XSS via DOM manipulation
//    Note: JSX auto-escapes — ini diperlukan jika ada raw DOM manipulation
// ============================================================================

export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

// ============================================================================
// 5. SAFE ERROR
//    Wraps errors without leaking stack traces to the user
// ============================================================================

export class SafeError extends Error {
  constructor(message: string, originalError?: unknown) {
    super(message);
    this.name = 'SafeError';

    // Only log full error in development
    if (isDev && originalError) {
      console.error('[Dev] Original error:', originalError);
    }
  }

  toUserMessage(): string {
    // Safe message to show to users
    return this.message;
  }
}

// ============================================================================
// 6. ENVIRONMENT VARIABLE VALIDATOR
//    Vite exposes env via import.meta.env.VITE_*
// ============================================================================

const REQUIRED_ENV_VARS: readonly string[] = [
  // Tambahkan env vars yang wajib ada di sini
  // Contoh: 'VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'
];

export function validateEnvVars(): void {
  if (!isDev) return; // Only warn in development

  const missing = REQUIRED_ENV_VARS.filter(
    key => !import.meta.env[key]
  );

  if (missing.length > 0) {
    console.warn('[Security] Missing env vars:', missing);
    console.warn('[Security] Check your .env file');
  }
}

// ============================================================================
// 7. SECURITY HEADERS CHECK (Client-side hint)
//    Server-side headers di-handle di hosting (Nginx/Vercel/Netlify)
//    Ini hanya reminder untuk developers
// ============================================================================

export function checkSecurityHeaders(): void {
  if (!isDev) return;

  const recommended = {
    'Content-Security-Policy': 'Set by server/hosting',
    'X-Content-Type-Options' : 'nosniff',
    'X-Frame-Options'        : 'SAMEORIGIN',
    'Referrer-Policy'        : 'strict-origin-when-cross-origin',
  };

  console.info(
    '%c[Security] Recommended server headers:',
    'color: #70161e; font-weight: bold',
    recommended
  );
}

// ============================================================================
// 8. EXTERNAL LINK ATTRIBUTES
//    Consistent safe attributes for all external links
// ============================================================================

export const EXTERNAL_LINK_ATTRS = {
  target : '_blank',
  rel    : 'noopener noreferrer',
} as const;

// ============================================================================
// MAIN INIT — Called once in App.tsx
// ============================================================================

export function initSecurityMeasures(): void {
  setupConsoleSecurity();
  validateEnvVars();

  if (isDev) {
    checkSecurityHeaders();
    console.info(
      '%c[Security] Initialized — Faralljibrill Photography',
      'color: #041e48; font-weight: bold'
    );
  }
}