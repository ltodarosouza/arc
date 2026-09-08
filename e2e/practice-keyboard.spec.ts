import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'arc:learner-state',
      JSON.stringify({
        version: 1,
        selectedSubjectIds: ['subject-calculus-2'],
        redoQuestionIds: [],
        attempts: [],
      }),
    );
  });
});

test('keyboard shortcuts do not override focused practice controls', async ({
  page,
}) => {
  await page.goto(
    '/practice?subject=calculo-2&question=question-calc2-substitution-01',
  );
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  const hint = page.getByRole('button', { name: /dica/i });
  await hint.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('region', { name: 'Dicas' })).toBeVisible();

  const backToQuestions = page.getByRole('link', {
    name: 'Voltar para questões',
    exact: true,
  });
  await backToQuestions.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/questions\?subject=calculo-2/);
  await expect(
    page.getByRole('heading', { name: 'Questões', exact: true }),
  ).toBeVisible();

  const state = await page.evaluate(() =>
    localStorage.getItem('arc:learner-state'),
  );
  expect(JSON.parse(state ?? '{}').attempts).toEqual([]);
});
