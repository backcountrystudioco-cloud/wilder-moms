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
  }
  
  if (context.timeWindow) {
    parts.push(`Time available: ${context.timeWindow} minutes`)
  }
  
  return parts.length > 0 ? parts.join('\n') : null
}

// Filter trails by user context
function filterTrailsByContext(trails, context) {
  let filtered = [...trails]
  
  // Location filter
  if (context.location?.city) {
    const loc = context.location.city.toLowerCase()
    filtered = filtered.filter(h => 
      h.region?.toLowerCase().includes(loc) ||
      h.state?.toLowerCase().includes(loc)
    )
    // If no matches, try broader search
    if (filtered.length < 3) {
      filtered = [...trails].filter(h => 
        h.region?.toLowerCase().includes(loc) ||
        h.state?.toLowerCase().includes(loc)
      )
    }
  }
  
  // Age filter - prioritize appropriate trails
  if (context.familyInfo?.youngestAge !== undefined) {
    const youngestAge = context.familyInfo.youngestAge
    
    // Reorder trails - put most appropriate ones first
    filtered.sort((a, b) => {
      const aAge = parseInt(a.ageRange?.match(/\d+/)?.[0] || '5')
      const bAge = parseInt(b.ageRange?.match(/\d+/)?.[0] || '5')
      
      // Trails for younger kids should come first
      if (youngestAge <= 3) {
        return aAge - bAge
      }
      return 0
    })
  }
  
  // Feature filters
  const features = []
  if (context.familyInfo?.needsStroller) features.push('strollerFriendly')
  if (context.familyInfo?.needsDog) features.push('dogsAllowed')
  if (context.familyInfo?.wantsWater) features.push('hasWater')
  if (context.familyInfo?.needsRestrooms) features.push('restrooms')
  
  if (features.length > 0) {
    // Boost trails that match features
    filtered = filtered.sort((a, b) => {
      const aScore = features.filter(f => a[f]).length
      const bScore = features.filter(f => b[f]).length
      return bScore - aScore
    })
  }
  
  // Time filter
  if (context.timeWindow) {
    filtered = filtered.filter(h => {
      const duration = parseInt(h.duration?.match(/\d+/)?.[0] || '60')
      return duration <= context.timeWindow
    })
  }
  
  // Limit to top 15
  return filtered.slice(0, 15)
}

// Simple parser for user requests
function parseUserRequest(request) {
  const lower = request.toLowerCase()
  const parsed = {
    features: []
  }
  
  // Extract features from natural language
  if (lower.includes('water') || lower.includes('splash') || lower.includes('creek') || lower.includes('river')) {
    parsed.features.push('hasWater')
  }
  if (lower.includes('dog')) parsed.features.push('dogsAllowed')
  if (lower.includes('stroller') || lower.includes('paved') || lower.includes('flat')) parsed.features.push('strollerFriendly')
  if (lower.includes('shade') || lower.includes('shady')) parsed.features.push('shade')
  if (lower.includes('view') || lower.includes('scenic')) parsed.features.push('hasViews')
  if (lower.includes('easy') || lower.includes('short')) parsed.features.push('easy')
  if (lower.includes('waterfall')) parsed.features.push('hasWater')
  
  // Extract difficulty preferences
  if (lower.includes('challenging') || lower.includes('hard') || lower.includes('adventure')) {
    parsed.difficulty = 'challenging'
  } else if (lower.includes('moderate')) {
    parsed.difficulty = 'moderate'
  } else if (lower.includes('easy') || lower.includes('gentle') || lower.includes('toddler')) {
    parsed.difficulty = 'easy'
  }
  
  // Extract any additional locations mentioned
  const locations = ['seattle', 'portland', 'denver', 'bend', 'moab', 'austin', 'houston', 'boulder', 'colorado', 'oregon', 'washington', 'texas']
  for (const loc of locations) {
    if (lower.includes(loc) && !lower.includes(context?.location?.city?.toLowerCase())) {
      parsed.location = loc.charAt(0).toUpperCase() + loc.slice(1)
      break
    }
  }
  
  return parsed
}

// Call backend API
export async function findTrailsWithAI(userRequest, context = {}) {
  // Filter trails by context first
  const contextFilteredTrails = filterTrailsByContext(hikes, context)
  
  // Then apply user request filters
  const requestFilters = parseUserRequest(userRequest)
  let filteredTrails = contextFilteredTrails
  
  if (requestFilters.features.length > 0) {
    filteredTrails = contextFilteredTrails.filter(h => {
      return requestFilters.features.every(f => {
        if (f === 'easy') return h.difficulty === 'easy'
        return h[f] === true
      })
    })
  }
  
  if (requestFilters.difficulty) {
    // Prefer difficulty but don't exclude
    filteredTrails = filteredTrails.sort((a, b) => {
      if (a.difficulty === requestFilters.difficulty) return -1
      if (b.difficulty === requestFilters.difficulty) return 1
      return 0
    })
  }
  
  if (filteredTrails.length === 0) {
    filteredTrails = contextFilteredTrails.slice(0, 5)
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        request: userRequest,
        context: buildContextSummary(context),
        trails: filteredTrails.slice(0, 10)
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
      trail: filteredTrails.find(t => t.id === trail.id) || filteredTrails[i]
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


