import { expect, test } from '@playwright/test';

test('an invalid requested question never opens a different exercise', async ({
  page,
}) => {
  await page.goto('/practice?subject=calculo-2&question=missing-question');

  await expect(
    page.getByRole('heading', {
      name: 'Esta questão não está disponível.',
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Responder', exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole('link', { name: 'Voltar para questões', exact: true }),
  ).toHaveAttribute('href', '/questions?subject=calculo-2');
});

test('an incompatible subject and question pair is explicitly unavailable', async ({
  page,
}) => {
  await page.goto(
    '/practice?subject=algebra-linear&question=question-calc2-substitution-01',
  );

  await expect(
    page.getByRole('heading', {
      name: 'Este link de prática não é válido.',
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Responder', exact: true }),
  ).toHaveCount(0);
});
