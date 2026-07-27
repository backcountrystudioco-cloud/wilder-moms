import { chromium, devices } from 'playwright'

const BASE = 'http://localhost:4174'

const freshSeed = {
  onboarding: { completed: false, completedAt: null, answers: {}, contextAnswers: {} },
  history: [],
  earnedAchievementIds: [],
  activeDays: [],
  shownUpgradeIds: { habitat: [], neighborhood: [] },
  architectural: { currentMonthKey: null, currentId: null, shownIds: [], acknowledgments: [] },
}

const browser = await chromium.launch()
try {
  // Desktop
  const cd = await browser.newContext({ viewport: { width: 1280, height: 1100 } })
  const pd = await cd.newPage()
  await pd.addInitScript((s) => {
    try {
      localStorage.setItem('wilder_moms_index_v1', JSON.stringify(s))
      localStorage.setItem('wilder_welcomed', '1')
      localStorage.setItem('wilderMoms_launchPopupSeen', 'true')
    } catch (e) {}
  }, freshSeed)
  await pd.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await pd.waitForSelector('text=Build my Wilder Habitat', { timeout: 8000 })
  await pd.waitForTimeout(800)
  await pd.screenshot({ path: 'dist/landing-A-desktop-hero.png', fullPage: false })
  await pd.screenshot({ path: 'dist/landing-A-desktop-full.png', fullPage: true })
  console.log('A: desktop landing')
  await cd.close()

  // Mobile (iPhone 14 Pro)
  const cm = await browser.newContext({ ...devices['iPhone 14 Pro'] })
  const pm = await cm.newPage()
  await pm.addInitScript((s) => {
    try {
      localStorage.setItem('wilder_moms_index_v1', JSON.stringify(s))
      localStorage.setItem('wilder_welcomed', '1')
      localStorage.setItem('wilderMoms_launchPopupSeen', 'true')
    } catch (e) {}
  }, freshSeed)
  await pm.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await pm.waitForSelector('text=Build my Wilder Habitat', { timeout: 8000 })
  await pm.waitForTimeout(800)
  await pm.screenshot({ path: 'dist/landing-B-mobile-hero.png', fullPage: false })
  await pm.screenshot({ path: 'dist/landing-B-mobile-full.png', fullPage: true })
  console.log('B: mobile landing')

  console.log('Done.')
} finally {
  await browser.close()
}
