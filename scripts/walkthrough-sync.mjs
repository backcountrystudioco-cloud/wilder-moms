import { chromium } from 'playwright'

const BASE = 'http://localhost:4174'

const completedSeed = {
  onboarding: {
    completed: true,
    completedAt: new Date().toISOString(),
    answers: {
      'specifics.kids': ['2-4', '5-7'],
      'specifics.block': ['library', 'park', 'transit', 'trees', 'cornerstore'],
      'specifics.when': 'weekday_pickup',
      'specifics.car': 'occasional',
      'specifics.obstacle': 'energy after work, the 5pm collapse',
    },
    contextAnswers: {
      'context.area': 'urban',
      'context.homeType': 'apartment',
      'context.outdoorSpace': 'shared',
      'context.zip': '',
    },
  },
  history: [
    { id: 'hab.belonging.1', kind: 'habitat', dimension: 'belonging', title: 'Put two chairs by the door', completedAt: new Date().toISOString(), checkIn: 'we-did-it' },
  ],
  earnedAchievementIds: ['field-noted'],
  activeDays: [new Date().toISOString().slice(0, 10)],
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
      localStorage.setItem('wilder_moms_index_reveal_seen', '1')
      localStorage.setItem('wilder_welcomed', '1')
      localStorage.setItem('wilderMoms_launchPopupSeen', 'true')
    } catch (e) {}
  }, completedSeed)
  page.on('pageerror', (err) => console.log('   PAGE ERROR:', err.message))
  page.on('console', (msg) => { if (msg.type() === 'error') console.log('   CONSOLE ERROR:', msg.text()) })

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)
  const lsKeys = await page.evaluate(() => Object.keys(localStorage))
  console.log('   localStorage keys:', lsKeys)
  const storedData = await page.evaluate(() => {
    try {
      const k = 'wilder_moms_index_v1'
      const raw = localStorage.getItem(k)
      if (!raw) return 'NO-DATA'
      const data = JSON.parse(raw)
      return JSON.stringify({
        completed: data?.onboarding?.completed,
        keys: Object.keys(data || {}),
        onboardKeys: Object.keys(data?.onboarding || {}),
        raw: raw.slice(0, 200),
      })
    } catch (e) { return 'parse-error: ' + e.message }
  })
  console.log('   storage debug:', storedData)

  // Check what the page rendered
  const heroVisible = await page.locator('h1:has-text("Wilder Habitat")').isVisible().catch(() => false)
  const welcomeVisible = await page.locator('text=Begin the field check').isVisible().catch(() => false)
  const dashboardVisible = await page.locator('text=Six dimensions').isVisible().catch(() => false)
  console.log('   hero (welcome):', heroVisible, '| welcome-cta:', welcomeVisible, '| dashboard:', dashboardVisible)
  const titleVisible = await page.locator('text=The Wilder Index').isVisible().catch(() => false)
  console.log('   Header visible:', titleVisible)
  await page.screenshot({ path: 'dist/sync-A-signedout.png', fullPage: false })
} finally {
  await browser.close()
}
