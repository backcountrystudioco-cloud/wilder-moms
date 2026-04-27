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
    if (context.location.lat && context.location.lon) {
      parts.push(`(Coordinates: ${context.location.lat.toFixed(2)}, ${context.location.lon.toFixed(2)})`)
    }
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
  
  // CRITICAL: Emphasize location matching
  if (context.location?.city && context.location?.state) {
    parts.push('')
    parts.push(`CRITICAL: Only recommend trails in ${context.location.state}. The family is located in/near ${context.location.city}, ${context.location.state}. Do NOT recommend trails from any other state.`)
  }
  
  return parts.length > 0 ? parts.join('\n') : null
}

// Filter and score trails by user context
function filterAndScoreTrails(trails, context, request = '') {
  // CRITICAL: First filter to user's state ONLY
  let filteredTrails = trails
  
  if (context.location?.state) {
    const userState = context.location.state.toUpperCase()
    filteredTrails = trails.filter(h => h.state?.toUpperCase() === userState)
  }
  
  // If no trails in user's state, return empty
  if (filteredTrails.length === 0) {
    return []
  }
  
  // Score only the filtered trails from user's state
  let scored = filteredTrails.map(h => {
    let score = 0
    const notes = []
    
    // City/region match - highest priority
    if (context.location?.city) {
      const loc = context.location.city.toLowerCase()
      if (h.region?.toLowerCase().includes(loc)) {
        score += 50
        notes.push(`Near ${context.location.city}`)
      }
    }
    
    // Age appropriateness
    if (context.familyInfo?.youngestAge !== undefined) {
      const youngest = context.familyInfo.youngestAge
      
      if (youngest <= 3 && h.difficulty === 'easy') {
        score += 5
        notes.push('Great for young kids')
      }
      if (youngest >= 7 && h.difficulty === 'challenging') {
        score += 3
        notes.push('Good challenge for older kids')
      }
      
      if (context.familyInfo.needsStroller && h.strollerFriendly) {
        score += 5
        notes.push('Stroller-friendly')
      }
      
      if (context.familyInfo.needsDog && h.dogsAllowed) {
        score += 4
        notes.push('Dogs welcome')
      }
      
      if (context.familyInfo.wantsWater && h.hasWater) {
        score += 4
        notes.push('Has water features')
      }
      
      if (context.familyInfo.needsRestrooms && h.restrooms) {
        score += 3
        notes.push('Has restrooms')
      }
    }
    
    // Time constraint
    if (context.timeWindow) {
      const duration = parseInt(h.duration) || 60
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
  
  // Sort by city match first, then score
  const sortedTrails = scored.sort((a, b) => {
    const aCityMatch = context.location?.city && a.trail.region?.toLowerCase().includes(context.location.city.toLowerCase()) ? 1 : 0
    const bCityMatch = context.location?.city && b.trail.region?.toLowerCase().includes(context.location.city.toLowerCase()) ? 1 : 0
    if (aCityMatch !== bCityMatch) return bCityMatch - aCityMatch
    
    return b.score - a.score
  })
  
  return sortedTrails.slice(0, 15)
}

// Ensure at least one local trail (city match) is included
function ensureLocalTrailPresence(trails, context) {
  if (!context.location?.city || trails.length === 0) return trails
  
  const city = context.location.city.toLowerCase()
  const hasLocalTrail = trails.some(t => t.region?.toLowerCase().includes(city))
  
  // If no local trail, inject the best local one from all hikes
  if (!hasLocalTrail) {
    const allLocalTrails = hikes.filter(h => {
      if (h.state?.toUpperCase() !== context.location.state?.toUpperCase()) return false
      return h.region?.toLowerCase().includes(city)
    })
    
    if (allLocalTrails.length > 0) {
      // Add local trail at the start, remove last one to keep count
      return [allLocalTrails[0], ...trails.slice(0, 14)]
    }
  }
  
  return trails
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
  
  return 'Find the best trail for our family based on their situation'
}

// Call backend API
export async function findTrailsWithAI(userRequest, context = {}) {
  // Get scored/filtered trails from user's state
  let scoredTrails = filterAndScoreTrails(hikes, context, userRequest)
  
  // GUARANTEE: At least one local trail will be included
  scoredTrails = ensureLocalTrailPresence(scoredTrails, context)
  
  // If no trails in user's state, return empty
  if (scoredTrails.length === 0) {
    return {
      recommendations: [],
      message: "No trails found in your state yet. We're expanding our trail database!"
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
