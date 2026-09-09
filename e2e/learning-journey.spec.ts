import { expect, test } from '@playwright/test';

test('learner can answer, see the solution and review progress', async ({
  page,
}) => {
  // Fixtures use stable slugs, while production uses database UUIDs. The
  // public route accepts both, but the slug keeps this browser journey tied
  // to the question fixture it is meant to exercise.
  await page.goto('/questions?subject=calculo-2');
  await expect(
    page.getByRole('heading', { name: 'Questões', exact: true }),
  ).toBeVisible();
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
  await expect(
    page.getByText('Questões feitas', { exact: true }),
  ).toBeVisible();
  await expect(page.getByText('1', { exact: true }).first()).toBeVisible();
});
