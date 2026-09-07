import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'node:crypto';

test.describe('real account flows in disposable local Supabase', () => {
  test.skip(
    process.env.ARC_ACCOUNT_QA !== '1',
    'Requires an isolated local Supabase environment.',
  );
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '';
  const adminKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
  const password = 'Arc-test-' + randomUUID();
  const nextPassword = 'Arc-next-' + randomUUID();
  const address = 'arc-qa-' + randomUUID();
  const email = address + '@example.test';
  const otherEmail = 'arc-qa-' + randomUUID() + '@example.test';
  let userId = '';
  let otherId = '';
  const options = { auth: { persistSession: false, autoRefreshToken: false } };
  const admin = () => {
    if (!['127.0.0.1', 'localhost'].includes(new URL(url).hostname))
      throw new Error('Account QA only runs against local Supabase.');
    return createClient(url, adminKey, options);
  };
  test.beforeAll(async () => {
    const client = admin();
    for (const value of [email, otherEmail]) {
      const { data, error } = await client.auth.admin.createUser({
        email: value,
        password,
        email_confirm: true,
      });
      if (error || !data.user)
        throw new Error('Could not create disposable account.');
      if (value === email) userId = data.user.id;
      else otherId = data.user.id;
    }
  });
  test.afterAll(async () => {
    const client = admin();
    if (userId) await client.auth.admin.deleteUser(userId);
    if (otherId) await client.auth.admin.deleteUser(otherId);
  });

  test('profile, RLS, recovery, password change, sign-out and deletion', async ({
    page,
    request,
  }) => {
    test.setTimeout(120_000);
    await page.goto('/account/sign-in');
    await page.getByLabel('E-mail', { exact: true }).fill(email);
    await page.getByLabel('Senha', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Entrar', exact: true }).click();
    await expect(
      page.getByRole('heading', { name: 'Perfil', exact: true }),
    ).toBeVisible();
    await page.getByLabel('Como quer ser chamado').fill('  Ana   D’Ávila  ');
    await page.getByRole('button', { name: 'Salvar nome' }).click();
    await expect(
      page.getByRole('status').filter({ hasText: 'Nome de perfil salvo.' }),
    ).toBeVisible();
    await page.reload();
    await expect(page.getByLabel('Como quer ser chamado')).toHaveValue(
      'Ana D’Ávila',
    );
    await page.getByLabel('Como quer ser chamado').fill('Ana Revisada');
    await page.getByRole('button', { name: 'Salvar nome' }).click();
    await expect(
      page.getByRole('link', { name: 'Abrir perfil' }),
    ).toContainText('Ana Revisada');
    await page.getByLabel('Como quer ser chamado').fill('<script>');
    await page.getByRole('button', { name: 'Salvar nome' }).click();
    await expect(
      page.getByRole('alert').filter({ hasText: 'Não use' }),
    ).toBeVisible();
    await page.getByLabel('Como quer ser chamado').fill('Ana Revisada');

    const other = createClient(url, key, options);
    await other.auth.signInWithPassword({ email: otherEmail, password });
    const hidden = await other
      .from('profiles')
      .select('display_name')
      .eq('user_id', userId);
    expect(hidden.error).toBeNull();
    expect(hidden.data).toEqual([]);
    const blocked = await other
      .from('profiles')
      .update({ display_name: 'Changed' })
      .eq('user_id', userId)
      .select();
    expect(blocked.data).toEqual([]);
    await other.auth.signOut();

    // Narrow viewport and keyboard access; no personal production data used.
    await page.setViewportSize({ width: 390, height: 844 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page
      .getByRole('button', { name: 'Excluir minha conta', exact: true })
      .focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('alertdialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('alertdialog')).not.toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Excluir minha conta', exact: true }),
    ).toBeFocused();

    await page
      .getByRole('button', { name: 'Sair da conta', exact: true })
      .click();
    await expect(
      page.getByRole('heading', { name: 'Entre na sua conta' }),
    ).toBeVisible();
    await page.goto('/account/recover');
    await page.getByLabel('E-mail', { exact: true }).fill(email);
    await page.getByRole('button', { name: 'Enviar link' }).click();
    await expect(page.getByRole('status')).toContainText('Se houver uma conta');
    let messageId = '';
    await expect
      .poll(async () => {
        const response = await request.get(
          'http://127.0.0.1:54324/api/v1/messages',
        );
        const inbox = await response.json();
        const message = inbox.messages.find(
          (item: { ID: string; To: { Address: string }[] }) =>
            item.To.some((recipient) => recipient.Address === email),
        );
        messageId = message?.ID ?? '';
        return Boolean(messageId);
      })
      .toBe(true);
    const mail = await (
      await request.get('http://127.0.0.1:54324/api/v1/message/' + messageId)
    ).json();
    const mailText = mail.Text || mail.HTML;
    const link = String(mailText)
      .match(/http:\/\/127\.0\.0\.1:54321\/auth\/v1\/verify[^\s<>"]+/)?.[0]
      ?.replaceAll('&amp;', '&');
    if (!link) throw new Error('Recovery email is missing a link.');
    await page.goto(link);
    await expect(page.getByLabel('Nova senha', { exact: true })).toBeVisible();
    await page.getByLabel('Nova senha', { exact: true }).fill(nextPassword);
    await page
      .getByLabel('Confirmar nova senha', { exact: true })
      .fill(nextPassword);
    await page.getByRole('button', { name: 'Atualizar senha' }).click();
    await expect(page.getByRole('status')).toContainText('Senha atualizada');
    await page.goto('/account');
    await page
      .getByRole('button', { name: 'Sair da conta', exact: true })
      .click();
    await page.getByLabel('E-mail', { exact: true }).fill(email);
    await page.getByLabel('Senha', { exact: true }).fill(nextPassword);
    await page.getByRole('button', { name: 'Entrar', exact: true }).click();
    await expect(
      page.getByRole('heading', { name: 'Perfil', exact: true }),
    ).toBeVisible();

    const learner = createClient(url, key, options);
    const login = await learner.auth.signInWithPassword({
      email,
      password: nextPassword,
    });
    const token = login.data.session?.access_token;
    expect(Boolean(token)).toBe(true);
    const subjects = await learner.from('subjects').select('id').limit(1);
    const questions = await learner.from('questions').select('id').limit(1);
    const questionId = questions.data![0].id;
    const choices = await learner
      .from('question_options')
      .select('id')
      .eq('question_id', questionId)
      .limit(1);
    await learner
      .from('user_subjects')
      .insert({ user_id: userId, subject_id: subjects.data![0].id });
    const attempt = await learner.rpc('submit_multiple_choice_attempt', {
      p_question_id: questionId,
      p_selected_option_id: choices.data![0].id,
    });
    expect(attempt.error).toBeNull();
    await learner
      .from('redo_questions')
      .upsert({ user_id: userId, question_id: questionId });
    const forbidden = await request.post('/api/account/delete', {
      headers: {
        Origin: 'https://untrusted.invalid',
        Authorization: 'Bearer ' + token,
      },
      data: { confirmation: 'EXCLUIR MINHA CONTA', password: nextPassword },
    });
    expect(forbidden.status()).toBe(403);

    await page
      .getByRole('button', { name: 'Excluir minha conta', exact: true })
      .click();
    await page
      .getByLabel('Senha atual para excluir', { exact: true })
      .fill(nextPassword);
    await page
      .getByLabel('Digite EXCLUIR MINHA CONTA')
      .fill('EXCLUIR MINHA CONTA');
    await page
      .getByRole('button', { name: 'Excluir definitivamente', exact: true })
      .click();
    await expect(
      page.getByRole('heading', { name: 'Conta excluída' }),
    ).toBeVisible();
    for (const table of [
      'profiles',
      'user_subjects',
      'question_attempts',
      'redo_questions',
    ]) {
      const result = await admin()
        .from(table)
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);
      expect(result.error).toBeNull();
      expect(result.count).toBe(0);
    }
    const otherStillExists = await admin().auth.admin.getUserById(otherId);
    expect(otherStillExists.data.user?.id).toBe(otherId);
    const stale = await learner.from('profiles').select('*');
    expect(stale.data ?? []).toEqual([]);
    await page.reload();
    await page.goto('/account');
    await expect(
      page.getByRole('heading', { name: 'Entre na sua conta' }),
    ).toBeVisible();
  });
});
