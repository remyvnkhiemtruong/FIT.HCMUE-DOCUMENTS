import { expect, test } from '@playwright/test'

test('home hydrates, renders identity and provides student navigation', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Kho học liệu Khoa Công nghệ Thông tin')
  await expect(page.getByRole('link', { name: 'Đăng nhập', exact: true })).toHaveAttribute('href', '/dang-nhap')
  const logos = page.locator('.identity img')
  await expect(logos).toHaveCount(2)
  expect(await logos.evaluateAll(images => images.every(image => (image as HTMLImageElement).naturalWidth > 0))).toBe(true)
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Đến nội dung chính' })).toBeFocused()
  await page.screenshot({ path: 'test-results/home-desktop.png', fullPage: true })
  expect(errors).toEqual([])
})

test('unknown route gives HTTP 404 and recovers to home', async ({ page }) => {
  const response = await page.goto('/duong-dan-khong-ton-tai')
  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Không tìm thấy trang')
  await page.getByRole('link', { name: 'Về trang chủ', exact: true }).click()
  await expect(page).toHaveURL('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Kho học liệu Khoa Công nghệ Thông tin')
})

test('home remains readable on a 360px screen', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 })
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.screenshot({ path: 'test-results/home-mobile.png', fullPage: true })
})
