import { expect, test } from '@playwright/test';

test('progress exposes errors by their actual subject instead of a default subject', async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'arc:learner-state',
      JSON.stringify({
        version: 1,
        selectedSubjectIds: ['subject-calculus-2', 'subject-linear-algebra'],
        redoQuestionIds: [],
        attempts: [
          {
            id: 'linear-error',
            questionId: 'question-linear-determinant-01',
            outcome: 'incorrect',
            createdAt: '2026-09-08T12:00:00Z',
            gradingMethod: 'automatic',
            answer: {
              kind: 'selected_option',
              selectedOptionId: 'option-a',
            },
          },
        ],
      }),
    );
  });

  await page.goto('/progress');
  await page.locator('summary').filter({ hasText: 'Revisar erros' }).click();
  const reviewLink = page
    .locator('details')
    .filter({ hasText: 'Revisar erros' })
    .getByRole('link', { name: 'Álgebra Linear', exact: true });
  await expect(reviewLink).toHaveAttribute(
    'href',
    '/questions?subject=algebra-linear&status=incorrect',
  );
  await reviewLink.click();
  await expect(page).toHaveURL(
    /\/questions\?subject=algebra-linear&status=incorrect/,
  );
  await expect(
    page.getByRole('heading', { name: 'Questões', exact: true }),
  ).toBeVisible();
});
