import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

function reply(status: number, message: string) {
  return Response.json(
    { message },
    { status, headers: { 'Cache-Control': 'no-store' } },
  );
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL).origin
    : new URL(request.url).origin;
  if (!origin || origin !== siteOrigin)
    return reply(403, 'Abra esta ação pelo seu perfil.');
  const token = request.headers
    .get('authorization')
    ?.match(/^Bearer (\S+)$/)?.[1];
  if (!token) return reply(401, 'Entre novamente para continuar.');
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const adminKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !publicKey || !adminKey)
    return reply(
      503,
      'A exclusão está indisponível agora. Sua conta foi preservada.',
    );
  if (Number(request.headers.get('content-length') ?? 0) > 4096)
    return reply(400, 'Solicitação inválida.');
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body))
      return reply(400, 'Solicitação inválida.');
    const payload = body as Record<string, unknown>;
    if (
      Object.keys(payload).some(
        (key) => !['password', 'confirmation'].includes(key),
      ) ||
      payload.confirmation !== 'EXCLUIR MINHA CONTA' ||
      typeof payload.password !== 'string' ||
      !payload.password ||
      payload.password.length > 128
    )
      return reply(400, 'Confirme a exclusão e informe sua senha atual.');

    const options = {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    };
    const verifier = createClient(url, publicKey, options);
    const { data, error } = await verifier.auth.getUser(token);
    if (error || !data.user)
      return reply(401, 'Sua sessão expirou. Entre novamente.');
    const user = data.user;
    if (user.is_anonymous || !user.email)
      return reply(403, 'Esta ação exige uma conta com e-mail e senha.');
    const verified = await verifier.auth.signInWithPassword({
      email: user.email,
      password: payload.password,
    });
    if (verified.error || verified.data.user?.id !== user.id)
      return reply(403, 'Não foi possível confirmar sua senha atual.');
    try {
      const admin = createClient(url, adminKey, options);
      const deleted = await admin.auth.admin.deleteUser(user.id);
      if (deleted.error)
        return reply(
          503,
          'Não foi possível concluir a exclusão. Entre novamente para verificar sua conta antes de repetir.',
        );
    } finally {
      // Close the short-lived reauthentication session without revoking other devices.
      await verifier.auth.signOut({ scope: 'local' });
    }
    return reply(200, 'Conta e dados privados excluídos.');
  } catch {
    // Never serialize Supabase responses, credentials, passwords or request bodies.
    return reply(
      503,
      'Não foi possível confirmar o resultado. Verifique sua conexão e tente entrar novamente.',
    );
  }
}
