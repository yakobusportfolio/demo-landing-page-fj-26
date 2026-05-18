/// <reference types="vite/client" />

/**
 * Vite Environment Variables Type Definitions
 * Lokasi: src/app/vite-env.d.ts
 */

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_API_URL?: string;
  // Add more env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}