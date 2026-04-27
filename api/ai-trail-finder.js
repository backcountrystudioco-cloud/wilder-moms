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

${context ? `Here's what you know about this family:\n${context}\n` : ''}

A parent is asking for trail recommendations: "${request}"

Here are the most relevant trails from our database:
${trailList}

Based on the parent's request AND their family situation (from the context above), recommend the TOP 3 trails that best match their needs. 

For each recommendation:
1. State why this trail is perfect for their specific situation
2. Mention specific kid-friendly details (water splashing, easy terrain, fun features, etc.)
3. Keep it conversational and encouraging - like you're texting a friend who's a tired mom

Format your response as JSON:
{
  "trails": [
    { "id": "trail-id", "title": "Trail Title", "reason": "Why this trail is perfect for their situation..." },
    ...
  ]
}

Be warm, supportive, and specific. Parents want to know WHY this trail will work for their family.`

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
      return res.status(500).json({ error: error.error?.message || 'OpenAI API error' })
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
    res.status(500).json({ error: 'Failed to get recommendations' })
  }
}
