import { chromium, devices } from 'playwright'

const BASE = 'http://localhost:4174'

const indexSeedCompleted = {
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
    { id: 'hab.belonging.1', kind: 'habitat', dimension: 'belonging', title: 'Put two chairs by the door', completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), checkIn: 'we-did-it' },
    { id: 'nbh.wonder.1', kind: 'neighborhood', dimension: 'wonder', title: 'A "three tiny discoveries" walk', completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), checkIn: 'we-did-it' },
  ],
  earnedAchievementIds: ['field-noted'],
  activeDays: [new Date().toISOString().slice(0, 10)],
  shownUpgradeIds: { habitat: [], neighborhood: [] },
  architectural: { currentMonthKey: null, currentId: null, shownIds: [], acknowledgments: [] },
}

const indexSeedFresh = {
  onboarding: { completed: false, completedAt: null, answers: {}, contextAnswers: {} },
  history: [],
  earnedAchievementIds: [],
  activeDays: [],
  shownUpgradeIds: { habitat: [], neighborhood: [] },
  architectural: { currentMonthKey: null, currentId: null, shownIds: [], acknowledgments: [] },
}

const trailsSeed = {
  location: { lat: 39.7392, lon: -104.9903, city: 'Denver Metro', state: 'Colorado', name: 'Denver Metro' },
  familyInfo: { youngestAge: 3, hasBabyInCarrier: false, numberOfKids: 2, needsStroller: false, needsDog: false, wantsWater: true, needsRestrooms: true },
  timeWindow: 60,
  vibe: 'justneedout',
}

const iphone = devices['iPhone 14 Pro']

const browser = await chromium.launch()
try {
  // Mobile · fresh profile → onboarding
  const c1 = await browser.newContext({ ...iphone })
  const p1 = await c1.newPage()
  await p1.addInitScript((s) => {
    try {
      localStorage.setItem('wilder_moms_index_v1', JSON.stringify(s))
      localStorage.setItem('wilder_welcomed', '1')
      localStorage.setItem('wilderMoms_launchPopupSeen', 'true')
    } catch (e) {}
  }, indexSeedFresh)

  await p1.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await p1.waitForSelector('text=Begin with the reading', { timeout: 8000 })
  await p1.waitForTimeout(700)
  await p1.screenshot({ path: 'dist/mobile-A-onboarding-welcome.png', fullPage: false })
  console.log('A: mobile onboarding welcome')

  await p1.locator('text=Begin with the reading').click()
  await p1.waitForSelector('text=The question we start from.', { timeout: 6000 })
  await p1.waitForTimeout(700)
  await p1.screenshot({ path: 'dist/mobile-B-brand-card-1.png', fullPage: false })
  console.log('B: mobile brand card 1')

  await p1.locator('text=Continue reading').first().click()
  await p1.waitForSelector('text=Five things we believe.', { timeout: 6000 })
  await p1.waitForTimeout(700)
  await p1.screenshot({ path: 'dist/mobile-C-brand-card-2.png', fullPage: false })
  console.log('C: mobile brand card 2')
  await c1.close()

  // Mobile · completed profile
  const c2 = await browser.newContext({ ...iphone })
  const p2 = await c2.newPage()
  await p2.addInitScript(({ completedSeed, trailsData }) => {
    try {
      localStorage.setItem('wilder_moms_index_v1', JSON.stringify(completedSeed))
      localStorage.setItem('wilder_moms_index_reveal_seen', '1')
      localStorage.setItem('wilder_trails_session', JSON.stringify(trailsData))
      localStorage.setItem('wilder_welcomed', '1')
      localStorage.setItem('wilderMoms_launchPopupSeen', 'true')
    } catch (e) {}
  }, { completedSeed: indexSeedCompleted, trailsData: trailsSeed })

  await p2.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await p2.waitForSelector('text=Today', { timeout: 8000 })
  await p2.waitForTimeout(900)
  await p2.screenshot({ path: 'dist/mobile-D-dashboard.png', fullPage: false })
  await p2.screenshot({ path: 'dist/mobile-D-dashboard-full.png', fullPage: true })
  console.log('D: mobile dashboard')

  await p2.goto(`${BASE}/wilder-homes?tab=guides`, { waitUntil: 'networkidle' })
  await p2.waitForSelector('text=For your Wilder pattern', { timeout: 12000 })
  await p2.waitForTimeout(900)
  await p2.screenshot({ path: 'dist/mobile-E-homes.png', fullPage: false })
  console.log('E: mobile homes')

  await p2.goto(`${BASE}/wilder-trails/trails`, { waitUntil: 'networkidle' })
  await p2.waitForSelector('text=Your Perfect Trails', { timeout: 12000 })
  await p2.waitForTimeout(3500)
  await p2.screenshot({ path: 'dist/mobile-F-trails.png', fullPage: false })
  console.log('F: mobile trails')

  console.log('All mobile captures complete.')
} finally {
  await browser.close()
}
