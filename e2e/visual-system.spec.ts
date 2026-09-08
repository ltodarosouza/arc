import { expect, test } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

// Local fixture catalogue only. Never create attempts in a production account.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'arc:learner-state',
      JSON.stringify({
        version: 1,
        selectedSubjectIds: [
          'subject-calculus-2',
          'subject-linear-algebra',
          'subject-vector-calculus',
        ],
        redoQuestionIds: [],
        attempts: [
          {
            id: 'visual-1',
            questionId: 'question-calc2-substitution-01',
            outcome: 'incorrect',
            createdAt: '2026-09-01T12:00:00Z',
            gradingMethod: 'automatic',
            answer: { kind: 'selected_option', selectedOptionId: 'unused' },
          },
          {
            id: 'visual-2',
            questionId: 'question-calc2-substitution-01',
            outcome: 'correct',
            createdAt: '2026-09-02T12:00:00Z',
            gradingMethod: 'automatic',
            answer: { kind: 'selected_option', selectedOptionId: 'unused' },
          },
        ],
      }),
    );
  });
});

for (const width of [320, 390, 768, 1440]) {
  test(`visual hierarchy, navigation and no horizontal overflow at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      '/',
      '/explore',
      '/explore/calculo-2',
      '/questions?subject=calculo-2',
      '/practice?subject=calculo-2&question=question-calc2-substitution-01',
      '/progress',
      '/subjects',
    ]) {
      await page.goto(path);
      await expect(page.locator('h1')).toBeVisible();
      await expect
        .poll(() =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        )
        .toBe(true);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await expect(
        page.getByRole('link', { name: 'Abrir perfil' }),
      ).toBeInViewport();
      const nav = page.getByRole('navigation', {
        name: width < 768 ? 'Navegação móvel' : 'Navegação principal',
        exact: true,
      });
      await expect(nav).toBeInViewport();
      await expect(nav.locator('[aria-current="page"]')).toHaveCount(1);
      if (width < 768) {
        const content = await page.locator('#main-content').boundingBox();
        const menu = await nav.boundingBox();
        expect(content!.y + content!.height).toBeLessThan(menu!.y - 16);
      }
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();
      expect(results.violations).toEqual([]);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: testInfo.outputPath(
          `${path.split('?')[0].replaceAll('/', '-') || 'home'}-${width}.png`,
        ),
        fullPage: true,
        animations: 'disabled',
      });
    }
  });
}

test('advanced filters disclose accessibly and reduced motion keeps content visible', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/questions?subject=calculo-2');
  await expect(
    page.getByRole('heading', { name: 'Questões', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('combobox', { name: 'Unidade', exact: true }),
  ).toBeHidden();
  await page.getByText('Assuntos e filtros avançados', { exact: true }).click();
  await page.getByRole('combobox', { name: 'Unidade', exact: true }).click();
  await page.getByRole('option', { name: 'Integrais', exact: true }).click();
  await expect(
    page.getByRole('combobox', { name: 'Unidade', exact: true }),
  ).toContainText('Integrais');
  await page.getByRole('button', { name: 'Limpar tudo' }).click();
  await expect(
    page.getByRole('combobox', { name: 'Unidade', exact: true }),
  ).toContainText('Todas');
  await expect(page.locator('.reveal-pending')).toHaveCount(0);
});
