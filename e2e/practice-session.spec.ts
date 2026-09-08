import { expect, test } from '@playwright/test';

test('practice keeps the filtered queue and returns to the same question list', async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'arc:learner-state',
      JSON.stringify({
        version: 1,
        selectedSubjectIds: ['subject-calculus-2'],
        redoQuestionIds: [
          'question-calc2-substitution-01',
          'question-calc2-geometric-series-01',
        ],
        attempts: [],
      }),
    );
  });

  await page.goto('/questions?subject=calculo-2&status=redo');
  await page
    .getByRole('link', { name: 'Resolver', exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/practice\?.*session=/);
  await page.getByRole('button', { name: 'Pular questão' }).click();
  await expect(page).toHaveURL(/\/practice\?.*session=/);
  await page.getByRole('link', { name: 'Voltar para questões' }).click();
  await expect(page).toHaveURL('/questions?subject=calculo-2&status=redo');
});
