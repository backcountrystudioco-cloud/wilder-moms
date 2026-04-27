import { hikes } from './hikes'

const FREE_QUERY_LIMIT = 3
const STORAGE_KEY = 'wilder_trails_ai_queries'
const API_ENDPOINT = '/api/ai-trail-finder' // Your backend endpoint

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

// Filter trails by basic criteria
function filterTrailsForAI(request) {
  let filtered = [...hikes]
  
  // Location filter
  if (request.location) {
    const loc = request.location.toLowerCase()
    filtered = filtered.filter(h => 
      h.region?.toLowerCase().includes(loc) ||
      h.state?.toLowerCase().includes(loc) ||
      h.title?.toLowerCase().includes(loc)
    )
  }
  
  // Age filter
  if (request.ageRange) {
    const age = request.ageRange
    filtered = filtered.filter(h => {
      const match = h.ageRange?.includes(String(age)) || 
        (age <= 3 && h.ageRange?.includes('2')) ||
        (age >= 8 && h.ageRange?.includes('8'))
      return match
    })
  }
  
  // Features filter
  if (request.features?.length > 0) {
    filtered = filtered.filter(h => {
      return request.features.every(f => {
        const featureMap = {
          'water': 'hasWater',
          'dogs': 'dogsAllowed',
          'stroller': 'strollerFriendly',
          'shade': 'shade',
          'views': 'hasViews',
          'easy': h.difficulty === 'easy',
          'flat': h.difficulty === 'easy'
        }
        const field = featureMap[f.toLowerCase()]
        return field ? h[field] === true : true
      })
    })
  }
  
  // Limit to top 15 most relevant
  return filtered.slice(0, 15)
}

// Simple parser for user requests
function parseUserRequest(request) {
  const lower = request.toLowerCase()
  const parsed = {}
  
  // Extract age
  const ageMatch = lower.match(/(\d+)\s*(year|yr|old)/)
  if (ageMatch) parsed.ageRange = parseInt(ageMatch[1])
  
  // Extract features
  parsed.features = []
  if (lower.includes('water') || lower.includes('splash') || lower.includes('creek') || lower.includes('river')) {
    parsed.features.push('water')
  }
  if (lower.includes('dog')) parsed.features.push('dogs')
  if (lower.includes('stroller')) parsed.features.push('stroller')
  if (lower.includes('shade') || lower.includes('shady')) parsed.features.push('shade')
  if (lower.includes('view') || lower.includes('scenic')) parsed.features.push('views')
  if (lower.includes('easy') || lower.includes('flat')) parsed.features.push('easy')
  
  // Extract location
  const locations = ['seattle', 'portland', 'denver', 'bend', 'moab', 'austin', 'houston', 'boulder', 'colorado', 'oregon', 'washington', 'texas']
  for (const loc of locations) {
    if (lower.includes(loc)) {
      parsed.location = loc.charAt(0).toUpperCase() + loc.slice(1)
      break
    }
  }
  
  return parsed
}

// Call backend API
export async function findTrailsWithAI(userRequest) {
  // Filter trails first
  const filteredTrails = filterTrailsForAI(parseUserRequest(userRequest))
  
  if (filteredTrails.length === 0) {
    return {
      recommendations: [],
      message: "I couldn't find trails matching your request. Try adjusting your search or browse all trails."
    }
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        request: userRequest,
        trails: filteredTrails
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

export { filterTrailsForAI, parseUserRequest }
