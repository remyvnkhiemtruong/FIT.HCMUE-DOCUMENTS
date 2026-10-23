import { contrastSamples } from './contrast'
import { test, expect } from '@playwright/test'

test('course tabs support keyboard, shared URLs, history, anchors and printing', async ({ page }) => {
  await page.goto('mon-hoc/comp1800/?cohort=K52')
  const all = page.getByRole('tab', { name: 'Tất cả', exact: true })
  await all.focus()
  await page.keyboard.press('End')
  const last = page.getByRole('tab').last()
  await expect(last).toBeFocused()
  await page.keyboard.press('Home')
  await expect(all).toBeFocused()
  const exams = page.getByRole('tab', { name: 'Đề thi', exact: true })
  await exams.click()
  await expect(exams).toHaveAttribute('aria-selected', 'true')
  await expect(page).toHaveURL(/cohort=K52&tab=de-thi/)
  await expect(page.locator('[data-material-kind="ly-thuyet"]')).toBeHidden()
  await page.reload()
  await expect(exams).toHaveAttribute('aria-selected', 'true')
  await all.click()
  await page.goBack()
  await expect(exams).toHaveAttribute('aria-selected', 'true')
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('[data-material-kind="ly-thuyet"]')).toBeVisible()
  await page.emulateMedia({ media: 'screen' })
  await page.locator('.VPDocAsideOutline a[href="#ly-thuyet"]').click()
  await expect(page.locator('#ly-thuyet')).toBeVisible()
})

test('all course material groups remain readable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto(`${baseURL}mon-hoc/comp1800/`)
  for (const section of await page.locator('[data-material-kind]').all()) {
    await expect(section).toBeVisible()
    await expect(section.locator('li a').first()).toHaveAttribute('href', /FIT\.HCMUE-DOCUMENTS/)
  }
  await context.close()
})

test('mobile filters expand and preserve the selected URL', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 850 })
  await page.goto('hoc-lieu/?course=COMP1800&kind=de-thi')
  const advanced = page.locator('.filter-options')
  await expect(advanced).not.toHaveAttribute('open', '')
  await page.getByText('Bộ lọc bổ sung', { exact: true }).click()
  await expect(page.locator('#catalog-kind')).toHaveValue('de-thi')
  await page.locator('#catalog-kind').selectOption('ly-thuyet')
  await expect(page).toHaveURL(/kind=ly-thuyet/)
  await expect(page.locator('.resource-result').first()).toBeVisible()
})

test('student pages fit all four widths in both persisted themes', async ({ page }) => {
  test.setTimeout(150_000)
  for (const width of [360, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    for (const theme of ['light', 'dark']) {
      await page.goto('./')
      const toggle = page.getByRole('switch')
      if ((await toggle.getAttribute('aria-checked') === 'true') !== (theme === 'dark')) await toggle.click()
      await page.reload()
      await expect(toggle).toHaveAttribute('aria-checked', String(theme === 'dark'))
      for (const [name, path] of [['home', './'], ['course', 'mon-hoc/comp1800/'], ['reading', 'calculus/01-gioi-han-day-va-ham']]) {
        await page.goto(path)
        await expect(page.locator('h1').first()).toBeVisible()
        for (const sample of await page.evaluate(contrastSamples)) expect(sample.ratio, sample.name).toBeGreaterThanOrEqual(sample.minimum)
        await expect(page.getByRole('switch')).toHaveAttribute('aria-checked', String(theme === 'dark'))
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
        expect(await page.locator('.brand-lockup img').evaluateAll(images => images.every(image => (image as HTMLImageElement).naturalWidth > 0))).toBe(true)
        await page.screenshot({ path: `test-results/static-${name}-${width}-${theme}.png`, animations: 'disabled' })
      }
    }
  }
})

test('reduced motion removes decorative entrance effects', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('./')
  expect(await page.locator('.home-lookup').evaluate(e => getComputedStyle(e).animationName)).toBe('none')
  await page.getByRole('link', { name: 'Xem tất cả học liệu', exact: true }).click()
  expect(await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length)).toBe(0)
})
