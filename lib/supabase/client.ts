import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | undefined;

function getConfiguration() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.');
  }

  return { url, publishableKey };
}

/**
 * Browser client only. The publishable key is safe to expose because database
 * access is constrained by Supabase Row Level Security policies.
 */
export function getSupabaseClient(): SupabaseClient {
  if (client) return client;
  const { url, publishableKey } = getConfiguration();
  client = createClient(url, publishableKey);
  return client;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
}
