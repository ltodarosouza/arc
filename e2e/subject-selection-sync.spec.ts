import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'arc:learner-state',
      JSON.stringify({
        version: 1,
        selectedSubjectIds: [],
        redoQuestionIds: [],
        attempts: [],
      }),
    );
  });
});

test('selected subjects update Home and Questions without a reload', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByText('Nenhuma disciplina selecionada.')).toBeVisible();

  await page
    .getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('link', { name: 'Disciplinas' })
    .click();
  await page.getByRole('button', { name: /Cálculo Vetorial/ }).click();

  await page
    .getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('link', { name: 'Início' })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Cálculo Vetorial' }),
  ).toBeVisible();
  await expect(page.getByText('Nenhuma disciplina selecionada.')).toHaveCount(
    0,
  );

  await page
    .getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('link', { name: 'Questões' })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Cálculo Vetorial' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Escolha suas disciplinas' }),
  ).toHaveCount(0);
});
