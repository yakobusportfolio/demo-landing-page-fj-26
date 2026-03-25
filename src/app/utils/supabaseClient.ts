import { createClient } from '@supabase/supabase-js';

// Mengambil variabel dari .env (Vite mode)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validasi sederhana agar tidak error jika .env lupa diisi
if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL atau Anon Key tidak ditemukan di file .env!");
}

export const supabase = createClient(supabaseUrl, supabaseKey);