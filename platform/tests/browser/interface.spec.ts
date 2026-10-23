import { contrastSamples } from './contrast'
import { expect, test } from '@playwright/test'

test('authentication tabs keep return URL, keyboard behavior and password visibility', async ({ page }) => {
  await page.goto('/dang-nhap?return=%2Fmon-hoc%2Fcomp1800%2F')
  const login = page.getByRole('tab', { name: 'Đăng nhập', exact: true })
  await login.focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('tab', { name: 'Đăng ký', exact: true })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByLabel('MSSV', { exact: true })).toBeVisible()
  await expect(page).toHaveURL(/tab=signup/)
  await expect(page).toHaveURL(/return=/)
  await page.reload()
  await expect(page.getByRole('tab', { name: 'Đăng ký', exact: true })).toHaveAttribute('aria-selected', 'true')
  await login.click()
  await page.getByLabel('Mật khẩu', { exact: true }).fill('a-local-test-value')
  await page.getByRole('button', { name: 'Hiện', exact: true }).click()
  await expect(page.getByLabel('Mật khẩu', { exact: true })).toHaveAttribute('type', 'text')
  await page.getByRole('button', { name: 'Ẩn', exact: true }).click()
  await expect(page.getByLabel('Mật khẩu', { exact: true })).toHaveAttribute('type', 'password')
  await page.goBack()
  await expect(page.getByRole('tab', { name: 'Đăng ký', exact: true })).toHaveAttribute('aria-selected', 'true')
})

test('recovery and token routes render inside the authentication card', async ({ page }) => {
  await page.goto('/dang-nhap')
  await page.getByRole('button', { name: 'Quên mật khẩu?' }).click()
  await expect(page.getByRole('heading', { name: 'Quên mật khẩu', exact: true })).toBeVisible()
  await expect(page.getByLabel('Email trường', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Về đăng nhập' }).click()
  await expect(page.getByRole('tab', { name: 'Đăng nhập', exact: true })).toBeVisible()
  await page.goto('/dang-nhap?token=expired-test-token')
  await expect(page.getByRole('heading', { name: 'Đặt lại mật khẩu', exact: true })).toBeVisible()
  await expect(page.getByLabel('Mật khẩu mới', { exact: true })).toHaveAttribute('minlength', '12')
})

test('login fits all widths and persists the theme through real controls', async ({ page }) => {
  test.setTimeout(90_000)
  const failures: string[] = []
  page.on('pageerror', e => failures.push(e.message))
  for (const width of [360, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    for (const mode of ['light', 'dark']) {
      await page.goto('/dang-nhap')
      if (width < 768) await page.getByRole('button', { name: 'Menu', exact: true }).click()
      const toggle = page.getByRole('switch', { name: 'Giao diện tối' })
      if ((await toggle.getAttribute('aria-checked') === 'true') !== (mode === 'dark')) await toggle.click()
      await page.reload()
      await expect(page.locator('html')).toHaveAttribute('data-theme', mode)
      if (width < 768) await page.getByRole('button', { name: 'Menu', exact: true }).click()
      await expect(toggle).toHaveAttribute('aria-checked', String(mode === 'dark'))
      if (width < 768) {
        await toggle.focus()
        await page.keyboard.press('Escape')
        await expect(page.locator('#main-nav')).toBeHidden()
      }
      await expect(page.locator('.auth-card')).toBeVisible()
      for (const sample of await page.evaluate(contrastSamples)) expect(sample.ratio, sample.name).toBeGreaterThanOrEqual(sample.minimum)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      expect(await page.locator('.auth-card img').evaluateAll(images => images.every(i => (i as HTMLImageElement).naturalWidth > 0))).toBe(true)
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.screenshot({ path: `test-results/platform-login-${width}-${mode}.png`, animations: 'disabled' })
    }
  }
  expect(failures).toEqual([])
})

test('reduced motion keeps authentication stable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/dang-nhap')
  expect(await page.locator('.auth-card').evaluate(e => getComputedStyle(e).animationName)).toBe('none')
  await page.getByRole('tab', { name: 'Đăng ký', exact: true }).click()
  expect(await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length)).toBe(0)
})
