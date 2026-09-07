'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { Session } from '@supabase/supabase-js';
import {
  getSupabaseClient,
  ensureLearnerSession,
  isSupabaseConfigured,
} from '@/lib/supabase/client';
import { createLocalLearnerRepository } from '@/lib/data/learner-repository';
import { normalizeProfileName, profileNameError } from '@/lib/domain/profile';

type AuthState = {
  session: Session | null;
  ready: boolean;
  profileName: string | null;
  profileLoading: boolean;
  profileError: string | null;
  reloadProfile: () => void;
  saveName: (value: string) => Promise<void>;
  signOut: () => Promise<void>;
};
const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<{
    owner: string;
    name: string;
  } | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setReady(true);
      return;
    }
    let active = true;
    let authChanged = false;
    const client = getSupabaseClient();
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((event, next) => {
      if (!active) return;
      authChanged = true;
      setSession(next);
      setReady(true);
      if (event === 'SIGNED_OUT') {
        setProfile(null);
        try {
          createLocalLearnerRepository().clear();
        } catch {
          /* session is already invalidated */
        }
      }
      if (
        event === 'PASSWORD_RECOVERY' &&
        window.location.pathname !== '/account/reset'
      )
        window.location.replace('/account/reset');
    });
    void client.auth
      .getSession()
      .then(async ({ data, error }) => {
        if (error) throw error;
        let next = data.session;
        if (
          !next &&
          !window.location.pathname.startsWith('/account') &&
          !sessionStorage.getItem('arc:signed-out')
        )
          next = await ensureLearnerSession();
        if (active && !authChanged) setSession(next);
      })
      .catch(() => {
        if (active && !authChanged) setSession(null);
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const owner = session?.user.id;
  useEffect(() => {
    setProfile(null);
    setProfileError(null);
    if (!owner) {
      setProfileLoading(false);
      return;
    }
    let active = true;
    setProfileLoading(true);
    void getSupabaseClient()
      .from('profiles')
      .select('display_name')
      .eq('user_id', owner)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return;
        if (error)
          setProfileError(
            'Não foi possível carregar seu perfil. Tente novamente.',
          );
        else if (data) setProfile({ owner, name: data.display_name });
        setProfileLoading(false);
      });
    return () => {
      active = false;
    };
  }, [owner, revision]);

  async function saveName(value: string) {
    const validation = profileNameError(value);
    if (validation) throw new Error(validation);
    if (!owner) throw new Error('Entre novamente para salvar seu perfil.');
    const name = normalizeProfileName(value);
    const client = getSupabaseClient();
    let result =
      profile?.owner === owner
        ? await client
            .from('profiles')
            .update({ display_name: name })
            .eq('user_id', owner)
            .select('display_name')
            .single()
        : await client
            .from('profiles')
            .insert({ user_id: owner, display_name: name })
            .select('display_name')
            .single();
    if (result.error?.code === '23505')
      result = await client
        .from('profiles')
        .update({ display_name: name })
        .eq('user_id', owner)
        .select('display_name')
        .single();
    const { error } = result;
    if (error)
      throw new Error(
        'Não foi possível salvar. Seu nome digitado foi preservado; tente novamente.',
      );
    setProfile({ owner, name });
    setProfileError(null);
  }

  async function signOut() {
    if (!isSupabaseConfigured()) return;
    const { error } = await getSupabaseClient().auth.signOut({
      scope: 'local',
    });
    if (error)
      throw new Error(
        'Não foi possível sair. Verifique sua conexão e tente novamente.',
      );
    try {
      sessionStorage.setItem('arc:signed-out', '1');
      createLocalLearnerRepository().clear();
    } catch {
      /* storage can be disabled */
    }
    setSession(null);
    setProfile(null);
    window.location.replace('/account');
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        ready,
        profileName: profile && profile.owner === owner ? profile.name : null,
        profileLoading,
        profileError,
        reloadProfile: () => setRevision((value) => value + 1),
        saveName,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const state = useContext(AuthContext);
  if (!state) throw new Error('AuthProvider is required.');
  return state;
}
