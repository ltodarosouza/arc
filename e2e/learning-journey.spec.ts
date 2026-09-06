import { expect, test } from '@playwright/test';

test('learner can answer, see the solution and review progress', async ({
  page,
}) => {
  await page.goto('/questions?subject=20000000-0000-4000-8000-000000000001');
  await expect(page.getByRole('heading', { name: 'Questões.' })).toBeVisible();
  await page
    .getByRole('link', { name: /resolver/i })
    .first()
    .click();
  await page.locator('button[aria-pressed]').first().click();
  await page.getByRole('button', { name: 'Responder' }).click();
  await expect(
    page.getByRole('heading', { name: 'Gabarito comentado' }),
  ).toBeVisible();
  await page.goto('/progress');
  await expect(page.getByText('1 questão respondida.')).toBeVisible();
  await expect(page.getByText('1', { exact: true }).first()).toBeVisible();
});
