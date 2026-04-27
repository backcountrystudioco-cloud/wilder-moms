import { hikes } from './hikes'

const FREE_QUERY_LIMIT = 3
const STORAGE_KEY = 'wilder_trails_ai_queries'
const API_ENDPOINT = '/api/ai-trail-finder'

export function getRemainingQueries() {
  if (typeof window === 'undefined') return FREE_QUERY_LIMIT
  const used = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10)
  return Math.max(0, FREE_QUERY_LIMIT - used)
}

export function incrementQueryCount() {
  if (typeof window === 'undefined') return
  const used = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10)
  localStorage.setItem(STORAGE_KEY, String(used + 1))
}

export function resetQueryCount() {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, '0')
}

// Build context info for the user
function buildContextSummary(context) {
  const parts = []
  
  if (context.location?.city) {
    parts.push(`Location: ${context.location.city}, ${context.location.state || ''}`)
  }
  
  if (context.familyInfo) {
    const fi = context.familyInfo
    const ageLabels = {
      '-1': 'Baby (in carrier)',
      '0': 'Toddler (stroller)',
      '2': 'Toddler (2-3)',
      '4': 'Preschool (4-5)',
      '7': 'School-age (6-7)',
      '10': 'Pre-teen (8+)'
    }
    
    if (fi.youngestAge !== undefined) {
      parts.push(`Family: Youngest child is ${ageLabels[String(fi.youngestAge)] || fi.youngestAge + ' years old'}`)
    }
    
    if (fi.numberOfKids > 1) {
      parts.push(`${fi.numberOfKids} kids total`)
    }
    
    if (fi.needsStroller) parts.push('Needs stroller-friendly')
    if (fi.needsDog) parts.push('Bringing dog')
    if (fi.wantsWater) parts.push('Wants water features')
    if (fi.needsRestrooms) parts.push('Needs restrooms nearby')
  }
  
  if (context.timeWindow) {
    parts.push(`Time available: ${context.timeWindow} minutes max`)
  }
  
  return parts.length > 0 ? parts.join('\n') : null
}

// Filter and score trails by user context
function filterAndScoreTrails(trails, context, request = '') {
  let scored = trails.map(h => {
    let score = 0
    const notes = []
    
    // Location match
    if (context.location?.city) {
      const loc = context.location.city.toLowerCase()
      if (h.region?.toLowerCase().includes(loc) || h.state?.toLowerCase().includes(loc)) {
        score += 10
      }
    }
    
    // Age appropriateness
    if (context.familyInfo?.youngestAge !== undefined) {
      const youngest = context.familyInfo.youngestAge
      
      // Check difficulty matches age
      if (youngest <= 3 && h.difficulty === 'easy') {
        score += 5
        notes.push('Great for young kids')
      }
      if (youngest >= 7 && h.difficulty === 'challenging') {
        score += 3
        notes.push('Good challenge for older kids')
      }
      
      // Stroller needs
      if (context.familyInfo.needsStroller && h.strollerFriendly) {
        score += 5
        notes.push('Stroller-friendly')
      }
      
      // Dog needs
      if (context.familyInfo.needsDog && h.dogsAllowed) {
        score += 4
        notes.push('Dogs welcome')
      }
      
      // Water preferences
      if (context.familyInfo.wantsWater && h.hasWater) {
        score += 4
        notes.push('Has water features')
      }
      
      // Restroom needs
      if (context.familyInfo.needsRestrooms && h.restrooms) {
        score += 3
        notes.push('Has restrooms')
      }
    }
    
    // Time constraint
    if (context.timeWindow) {
      const duration = parseInt(h.duration?.match(/\d+/)?.[0] || '60')
      if (duration <= context.timeWindow) {
        score += 3
      }
    }
    
    // Request-based scoring
    if (request) {
      const lower = request.toLowerCase()
      
      if (lower.includes('water') && h.hasWater) {
        score += 6
        notes.push('Water features')
      }
      if ((lower.includes('shade') || lower.includes('shady')) && h.shady) {
        score += 4
        notes.push('Shaded trail')
      }
      if ((lower.includes('easy') || lower.includes('gentle')) && h.difficulty === 'easy') {
        score += 5
      }
      if (lower.includes('view') && h.hasViews) {
        score += 4
        notes.push('Scenic views')
      }
      if (lower.includes('adventure') && h.difficulty !== 'easy') {
        score += 3
      }
      if ((lower.includes('paved') || lower.includes('flat')) && h.isPaved) {
        score += 5
        notes.push('Paved path')
      }
    }
    
    return { trail: h, score, notes }
  })
  
  // Sort by score descending
  scored.sort((a, b) => b.score - a.score)
  
  return scored.slice(0, 10)
}

// Generate a friendly auto-request based on context
function generateAutoRequest(context) {
  const parts = []
  
  if (context.familyInfo?.wantsWater) {
    parts.push('kid-friendly waterfall or water feature')
  }
  if (context.familyInfo?.youngestAge <= 3) {
    parts.push('easy trail suitable for toddlers')
  }
  if (context.familyInfo?.needsStroller) {
    parts.push('stroller-friendly')
  }
  
  if (parts.length > 0) {
    return `Find a ${parts.join(' with ')} trail for our family`
  }
  
  return 'Find the best trail for our family based on our situation'
}

// Call backend API
export async function findTrailsWithAI(userRequest, context = {}) {
  // Get scored/filtered trails
  const scoredTrails = filterAndScoreTrails(hikes, context, userRequest)
  
  if (scoredTrails.length === 0) {
    return {
      recommendations: [],
      message: "I couldn't find trails matching your request. Try adjusting your search or browse all trails."
    }
  }

  // If no request provided, generate one based on context
  const request = userRequest || generateAutoRequest(context)

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        request,
        context: buildContextSummary(context),
        trails: scoredTrails.map(s => s.trail)
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'API request failed')
    }

    const data = await response.json()
    
    // Map backend response to our format
    const recommendations = data.trails.map((trail, i) => ({
      title: trail.title,
      explanation: trail.reason,
      trail: scoredTrails.find(s => s.trail.id === trail.id)?.trail || scoredTrails[i]?.trail
    })).filter(r => r.trail)

    return {
      recommendations,
      remainingQueries: getRemainingQueries()
    }
  } catch (error) {
    console.error('AI Trail Finder error:', error)
    throw error
  }
}
