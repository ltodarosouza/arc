import { expect, test } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

// Local fixture catalogue only. Never create attempts in a production account.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    if (sessionStorage.getItem('arc:visual-fixture-seeded')) {
      return;
    }

    sessionStorage.setItem('arc:visual-fixture-seeded', 'true');
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

for (const width of [390, 1440]) {
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

test('taxonomy filters expose the subject, topic and subtopic flow', async ({
  page,
}) => {
  await page.goto('/questions?subject=calculo-2');
  await expect(
    page.getByRole('heading', { name: 'Questões', exact: true }),
  ).toBeVisible();

  const filters = page.locator('details', {
    has: page.getByText('Assuntos e filtros avançados', { exact: true }),
  });
  const assunto = filters.getByRole('combobox', {
    name: 'Assunto',
    exact: true,
  });
  const subassunto = filters.getByRole('combobox', {
    name: 'Subassunto',
    exact: true,
  });

  await expect(filters).not.toHaveAttribute('open', '');
  await filters
    .getByText('Assuntos e filtros avançados', { exact: true })
    .click();
  await expect(filters).toHaveAttribute('open', '');
  await expect(assunto).toBeVisible();
  await expect(subassunto).toBeVisible();

  await assunto.click();
  const assuntoOptions = page
    .getByRole('option')
    .filter({ hasNotText: 'Todas' });
  await expect.poll(() => assuntoOptions.count()).toBeGreaterThan(0);
  await assuntoOptions.first().click();
  await expect(page).toHaveURL(/unit=/);
  await expect(subassunto).toBeEnabled();

  await subassunto.click();
  const subassuntoOptions = page
    .getByRole('option')
    .filter({ hasNotText: 'Todos' });
  await expect.poll(() => subassuntoOptions.count()).toBeGreaterThan(0);
  await subassuntoOptions.first().click();
  await expect(page).toHaveURL(/topic=/);

  await page.getByRole('button', { name: 'Limpar tudo' }).click();
  await expect(page).toHaveURL(/\/questions\?subject=calculo-2$/);
  await expect(assunto).toContainText('Todas');
  await expect(subassunto).toContainText('Todos');
});

test('persistent navigation remains usable by keyboard after a long scroll', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/progress');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  const navigation = page.getByRole('navigation', {
    name: 'Navegação principal',
    exact: true,
  });
  const questions = navigation.getByRole('link', {
    name: 'Questões',
    exact: true,
  });
  await questions.focus();
  await expect(questions).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/\/explore$/);
  await expect(
    page.getByRole('heading', { name: 'Questões', exact: true }),
  ).toBeVisible();
});

test('subject areas link to the matching question filter', async ({ page }) => {
  await page.goto('/explore/calculo-1');
  const areaLinks = page.locator(
    'a[href^="/questions?subject=calculo-1&unit="]',
  );
  await expect.poll(() => areaLinks.count()).toBeGreaterThan(0);
  await expect(areaLinks.first()).toHaveAttribute(
    'href',
    /\/questions\?subject=calculo-1&unit=.+/,
  );
});

test('rapid subject changes preserve the final selection', async ({ page }) => {
  await page.goto('/subjects');
  await expect(
    page.getByRole('heading', { name: 'Minhas disciplinas', exact: true }),
  ).toBeVisible();

  const subjects = page.locator('button[aria-pressed]');
  await expect.poll(() => subjects.count()).toBeGreaterThan(0);
  await subjects.evaluateAll((buttons) => {
    buttons
      .filter((button) => button.getAttribute('aria-pressed') === 'true')
      .forEach((button) => {
        if (button instanceof HTMLButtonElement) button.click();
      });
  });
  await expect
    .poll(() =>
      subjects.evaluateAll((buttons) =>
        buttons.map((button) => button.getAttribute('aria-pressed')),
      ),
    )
    .toEqual(['false', 'false', 'false', 'false']);

  await page.reload();
  await expect
    .poll(() =>
      subjects.evaluateAll((buttons) =>
        buttons.map((button) => button.getAttribute('aria-pressed')),
      ),
    )
    .toEqual(['false', 'false', 'false', 'false']);
});
