import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Session } from '@supabase/supabase-js';

let client: SupabaseClient | undefined;

function getConfiguration() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.',
    );
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
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}

/** Creates a private learner identity when the visitor has not signed in yet. */
export async function ensureLearnerSession(): Promise<Session> {
  const supabase = getSupabaseClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (session) return session;
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error || !data.session)
    throw error ?? new Error('Não foi possível iniciar sua sessão de estudo.');
  return data.session;
}
