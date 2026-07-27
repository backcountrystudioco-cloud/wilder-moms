import { chromium } from 'playwright'

const BASE = 'http://localhost:4174'

const fresh = {
  onboarding: { completed: false, completedAt: null, answers: {}, contextAnswers: {} },
  history: [], earnedAchievementIds: [], activeDays: [],
  shownUpgradeIds: { habitat: [], neighborhood: [] },
  architectural: { currentMonthKey: null, currentId: null, shownIds: [], acknowledgments: [] },
}

const browser = await chromium.launch()
try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const page = await ctx.newPage()
  await page.addInitScript((s) => {
    try {
      localStorage.setItem('wilder_moms_index_v1', JSON.stringify(s))
      localStorage.setItem('wilder_welcomed', '1')
      localStorage.setItem('wilderMoms_launchPopupSeen', 'true')
    } catch (e) {}
  }, fresh)
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })

  // Walk welcome → brand cards → all chapters
  await page.waitForSelector('text=Build my Wilder Habitat', { timeout: 8000 })
  await page.locator('text=Build my Wilder Habitat').click()

  // brand cards: walk through all 4 by clicking the primary ember CTA
  for (let i = 0; i < 4; i++) {
    await page.waitForSelector('button.bg-ember', { timeout: 6000 })
    await page.locator('button.bg-ember').first().click()
  }

  // Walk through 6 dimension chapters — click "Begin chapter" once, then 5
  // option clicks. Each option click auto-advances after 220ms.
  for (let i = 0; i < 6; i++) {
    await page.waitForSelector('text=Begin chapter', { timeout: 6000 })
    await page.locator('button:has-text("Begin chapter")').first().click()
    for (let q = 0; q < 5; q++) {
      await page.waitForSelector('button.rounded-xl.border-2', { timeout: 6000 })
      await page.locator('button.rounded-xl.border-2').first().click()
      await page.waitForTimeout(280) // let auto-advance settle
    }
  }

  // After 6 chapters, we should be at chapter 7 (specifics) intro
  await page.waitForSelector('text=Chapter 7 of 7', { timeout: 8000 })
  await page.waitForTimeout(800)
  await page.screenshot({ path: 'dist/chapter7-A-before-click.png', fullPage: false })

  // CRITICAL: tap the chapter card text itself, not just the inner button.
  // The new implementation wraps the whole intro in a <button>.
  await page.locator('h2:has-text("Your Specifics")').click()

  // After the click, the chapter intro disappears and we're on question 0 of
  // the specifics chapter. Wait for any question-style heading or a Continue
  // button to confirm we advanced.
  await page.waitForSelector('button.rounded-xl.border-2', { timeout: 6000 })
  await page.waitForTimeout(500)
  await page.screenshot({ path: 'dist/chapter7-B-after-click.png', fullPage: false })
  console.log('OK: chapter card is tappable, advanced to first specifics question')
} catch (e) {
  console.error('FAIL:', e.message)
} finally {
  await browser.close()
}
