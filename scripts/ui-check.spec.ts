import { test, expect } from '@playwright/test'

const pages = [
  { path: '/', name: 'Landing' },
  { path: '/signup', name: 'SignUp' },
  { path: '/signin', name: 'SignIn' },
  { path: '/dashboard', name: 'Dashboard' },
]

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]

for (const vp of viewports) {
  for (const p of pages) {
    test(`${p.name} - ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      const port = process.env.PORT || '5175'
      await page.goto(`http://localhost:${port}${p.path}`)
      await page.waitForLoadState('networkidle')

      // Basic accessibility and layout checks
      const body = await page.locator('body')
      await expect(body).toBeVisible()

      // Take screenshot for manual inspection
      await page.screenshot({ path: `./screenshots/${p.name}-${vp.name}.png`, fullPage: true })

      // Check for overflowing elements
      const overflowElements = await page.evaluate(() => {
        const els = Array.from(document.querySelectorAll('*'))
        return els
          .filter((el) => {
            const cs = getComputedStyle(el)
            if (cs.pointerEvents === 'none') return false
            if (el.className && String(el.className).includes('pointer-events-none')) return false
            const r = el.getBoundingClientRect()
            const tolerance = 8
            return r.width > window.innerWidth + tolerance || r.right > window.innerWidth + tolerance || r.left < -tolerance
          })
          .map((el) => el.tagName + (el.id ? `#${el.id}` : el.className ? `.${el.className.split(' ').slice(0,2).join('.')}` : ''))
      })
      // Fail the test if overflow elements found
      expect(overflowElements.length, `Overflowing elements: ${overflowElements.join(', ')}`).toBe(0)
    })
  }
}
