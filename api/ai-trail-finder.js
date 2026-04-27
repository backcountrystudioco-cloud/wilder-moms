// AI Trail Finder API - calls OpenAI to recommend trails
// Requires OPENAI_API_KEY in environment variables

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { request, context, trails } = req.body

  if (!request || !trails) {
    return res.status(400).json({ error: 'Missing request or trails' })
  }

  // Check for API key
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' })
  }

  // Build prompt for OpenAI with FULL trail data
  const trailList = trails.map(h => `
Trail #${h.id}:
Name: ${h.title}
Full Location: ${h.region}, ${h.state}
Distance: ${h.distance} miles (${h.distanceLabel})
Duration: ${h.durationLabel}
Difficulty: ${h.difficulty}
Elevation Gain: ${h.elevationLabel}
Kid-Friendly Age Range: ${h.ageRange || 'All ages'}
Terrain: ${[
    h.strollerFriendly && 'Stroller-friendly',
    h.isPaved && 'Paved path',
    h.hasWater && 'Water features nearby',
    h.hasViews && 'Scenic views',
    h.shadeLevel === 'high' && 'Shaded',
    h.shadeLevel === 'medium' && 'Partial shade'
  ].filter(Boolean).join(', ') || 'Natural terrain'}
Amenities: ${[
    h.restrooms && 'Restrooms available',
    h.dogsAllowed && 'Dogs allowed',
    h.parking === 'free_limited' && 'Limited free parking',
    h.parking === 'free' && 'Free parking',
    h.parking === 'fee' && 'Paid parking'
  ].filter(Boolean).join(', ') || 'Self-serve parking'}
Description: ${h.description || 'A great family trail.'}
`).join('\n---\n')

  // Extract location from context for the prompt
  const locationMatch = context.match(/Location: ([^,]+), ([^\n]+)/)
  const cityName = locationMatch ? locationMatch[1].trim() : ''
  const stateName = locationMatch ? locationMatch[2].trim() : ''

  const prompt = `You are a hiking guide for families with young children.

CRITICAL CONTEXT:
- Family is located in ${cityName || 'their area'}, ${stateName || ''}
- All trails below are from ${stateName || 'their state'} ONLY

FAMILY'S EXACT SITUATION:
${context}

STRICT RULES - Follow these exactly:
1. ONLY recommend from the provided trail list
2. PRIORITIZE trails in/near ${cityName || 'their city'}
3. Do NOT mention trails from other states in your response
4. Return exactly 5 trail recommendations
5. Each reason must mention specific features that match the family's needs

AVAILABLE TRAILS IN ${stateName?.toUpperCase() || 'THEIR STATE'}:
${trailList}

TASK: From the list above, recommend the TOP 5 trails closest to ${cityName || 'their location'}.

For each trail, write a reason that:
- Mentions specific features (water, paved, shade, etc.)
- Explains why it fits their family's situation (ages, needs, time)
- Is 1-2 sentences, friendly tone

Return as JSON with exactly 5 trails:
{
  "trails": [
    { "id": "exact-trail-id", "title": "Exact Trail Name", "reason": "Why this specific trail is perfect for this specific family..." }
  ]
}`

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
          { role: 'system', content: 'You are a helpful hiking expert for families. Always respond with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const error = await response.json()
      const errorMessage = error.error?.message || ''
      
      // User-friendly error messages
      if (errorMessage.includes('rate limit') || errorMessage.includes('Rate limit')) {
        return res.status(500).json({ error: "We're popular today! Too many people using Wilder Companion right now. Please try again in a moment." })
      }
      if (errorMessage.includes('token') || errorMessage.includes('quota') || errorMessage.includes('limit')) {
        return res.status(500).json({ error: "Wilder Companion is taking a quick break. Please try again shortly!" })
      }
      if (errorMessage.includes('Incorrect API key') || errorMessage.includes('Invalid API key')) {
        return res.status(500).json({ error: "Wilder Companion needs a moment to set up. We're on it!" })
      }
      
      return res.status(500).json({ error: errorMessage || "Something came up with Wilder Companion. Please try again!" })
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || ''

    // Parse JSON from response
    let trailsData
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        trailsData = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      // Fallback: return first 3 trails with generic reasons
      trailsData = {
        trails: trails.slice(0, 3).map(t => ({
          id: t.id,
          title: t.title,
          reason: `This ${t.difficulty} trail in ${t.region} is ${t.distance} miles - a great choice for your adventure!`
        }))
      }
    }

    res.status(200).json(trailsData)
  } catch (error) {
    console.error('AI Trail Finder error:', error)
    res.status(500).json({ error: "Wilder Companion is having trouble right now. Give it another try!" })
  }
}
