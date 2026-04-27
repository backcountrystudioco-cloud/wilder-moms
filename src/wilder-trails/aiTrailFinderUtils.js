import { hikes } from './hikes'

const FREE_QUERY_LIMIT = 3
const STORAGE_KEY = 'wilder_trails_ai_queries'

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

// Filter trails by basic criteria to reduce payload
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

// Build prompt for OpenAI
function buildPrompt(userRequest, filteredTrails) {
  const trailList = filteredTrails.map(h => `
Trail: ${h.title}
Location: ${h.region}, ${h.state}
Distance: ${h.distance} miles
Elevation: ${h.elevationLabel}
Difficulty: ${h.difficulty}
Duration: ${h.durationLabel}
Features: ${[
    h.strollerFriendly && 'Stroller-friendly',
    h.dogsAllowed && 'Dogs allowed',
    h.hasWater && 'Water features',
    h.hasViews && 'Scenic views',
    h.isPaved && 'Paved'
  ].filter(Boolean).join(', ') || 'None listed'}
Description: ${h.description}
`).join('\n---\n')

  return `You are a friendly hiking expert for families with young children. A parent is asking for trail recommendations.

Their request: "${userRequest}"

Here are the most relevant trails from our database:
${trailList}

Based on the parent's request, recommend the TOP 3 trails that best match their needs. For each recommendation:
1. State why this trail is perfect for their situation
2. Mention specific kid-friendly details (water splashing, interesting features, etc.)
3. Keep it conversational and encouraging

Format your response like this:
TITLES: [list the 3 trail titles, separated by |]
RECOMMENDATIONS: [your friendly explanation for each trail, separated by |]

Be warm, supportive, and specific. Parents want to know WHY this trail will work for their family.`
}

// Call OpenAI API
export async function findTrailsWithAI(userRequest, apiKey) {
  if (!apiKey) {
    throw new Error('OpenAI API key required')
  }

  // Filter trails first
  const filteredTrails = filterTrailsForAI(parseUserRequest(userRequest))
  
  if (filteredTrails.length === 0) {
    return {
      recommendations: [],
      message: "I couldn't find trails matching your request. Try adjusting your search or browse all trails."
    }
  }

  const prompt = buildPrompt(userRequest, filteredTrails)

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful hiking expert for families.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 800,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'API request failed')
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || ''

    // Parse the response
    const titlesMatch = content.match(/TITLES:\s*(.+)/i)
    const recsMatch = content.match(/RECOMMENDATIONS:\s*(.+)/i)

    if (titlesMatch && recsMatch) {
      const titles = titlesMatch[1].split('|').map(t => t.trim()).filter(Boolean)
      const recommendations = recsMatch[1].split('|').map((r, i) => ({
        title: titles[i] || 'Trail',
        explanation: r.trim(),
        trail: filteredTrails.find(t => t.title === titles[i]) || filteredTrails[i]
      })).filter(r => r.trail)

      return {
        recommendations,
        remainingQueries: getRemainingQueries()
      }
    }

    // Fallback if parsing fails
    return {
      recommendations: filteredTrails.slice(0, 3).map((trail, i) => ({
        title: trail.title,
        explanation: `This ${trail.difficulty} trail in ${trail.region} is ${trail.distance} miles - perfect for your adventure!`,
        trail
      })),
      remainingQueries: getRemainingQueries()
    }
  } catch (error) {
    console.error('AI Trail Finder error:', error)
    throw error
  }
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
  const locations = ['seattle', 'portland', 'denver', 'bend', ' Moab', 'austin', 'houston', 'boulder', 'colorado', 'oregon', 'washington', 'texas']
  for (const loc of locations) {
    if (lower.includes(loc)) {
      parsed.location = loc.charAt(0).toUpperCase() + loc.slice(1)
      break
    }
  }
  
  return parsed
}

export { filterTrailsForAI, parseUserRequest }
