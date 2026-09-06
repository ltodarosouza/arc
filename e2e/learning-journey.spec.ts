import { expect, test } from '@playwright/test';

test('learner can select a subject, answer, see the solution and review progress', async ({
  page,
}) => {
  await page.goto('/subjects');
  await page.getByRole('button', { name: /cálculo ii/i }).click();
  await page
    .getByRole('link', { name: /questões/i })
    .first()
    .click();
  await page.getByRole('link', { name: /ver todas/i }).click();
  await page
    .getByRole('link', { name: /resolver/i })
    .first()
    .click();
  await page.locator('button[aria-pressed]').first().click();
  await page.getByRole('button', { name: 'Responder' }).click();
  await expect(
    page.getByRole('heading', { name: 'Gabarito comentado' }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Progresso' }).click();
  await expect(page.getByText('1 questão respondida.')).toBeVisible();
  await expect(page.getByText('1', { exact: true }).first()).toBeVisible();
});
