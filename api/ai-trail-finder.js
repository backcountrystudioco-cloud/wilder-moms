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

  // Build prompt for OpenAI
  const trailList = trails.map(h => `
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
    h.isPaved && 'Paved',
    h.restrooms && 'Restrooms nearby'
  ].filter(Boolean).join(', ') || 'None listed'}
Description: ${h.description}
`).join('\n---\n')

  const prompt = `You are a friendly hiking expert for families with young children.

CRITICAL: You MUST recommend trails near the family's specific location. Distance is the #1 factor.

FAMILY SITUATION:
${context || 'No specific information provided - recommend generally kid-friendly trails'}

A parent is asking: "${request || 'Find trails that work for my family'}"

Here are the most relevant trails from our database:
${trailList}

Based on the family's location and situation, recommend the TOP 3 trails that are CLOSEST to their area.

For each recommendation:
1. State why this trail is close and perfect for their family's specific situation (age of kids, time limit, any special needs like stroller, dog, water features)
2. Mention the distance from their location
3. Keep it warm and encouraging

IMPORTANT: 
- Prioritize trails that are geographically closest to ${context.match(/Location: ([^,]+), ([^\n]+)/)?.[2] || 'their area'}
- Your "reason" for each trail MUST mention the distance and why it's a good fit for their specific family

Format your response as JSON:
{
  "trails": [
    { "id": "trail-id", "title": "Trail Title", "reason": "Why this trail is perfect for their specific situation..." },
    ...
  ]
}

Be warm, supportive, and specific about what makes each trail work for THEIR family.`

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
