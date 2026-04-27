// AI Build Generator API - calls OpenAI to generate outdoor builds from household items
// Requires OPENAI_API_KEY in environment variables

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { items } = req.body

  if (!items) {
    return res.status(400).json({ error: 'Missing items' })
  }

  // Check for API key
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' })
  }

  const prompt = `You are "Wilder Companion" - a creative architect who helps families create magical outdoor spaces using items they already have around the house.

Generate exactly 3 outdoor activities/builds for kids ages 2-10 using these household items: "${items}"

For each build, return a JSON object with this exact structure:
{
  "title": "Short, catchy title",
  "description": "2-3 sentence description of what to build and why kids love it",
  "materials": ["item 1", "item 2", "item 3", "item 4"],
  "steps": ["Step 1", "Step 2", "Step 3", "Step 4"],
  "whyKidsLoveIt": "One sentence about the magic for kids"
}

Return ONLY a valid JSON array with exactly 3 objects. No markdown, no explanation, just the raw JSON array starting with [ and ending with ].

Example response:
[
  {
    "title": "Backyard Butterfly Hotel",
    "description": "Turn empty paper towel rolls into a luxurious hotel for native bees and butterflies. Drill holes in logs or stack rolls in a box, then hang it in a sunny spot. Kids will love checking in on their tiny guests all summer long.",
    "materials": ["Empty paper towel rolls", "Drill or hammer", "Logs or wooden box", "String or wire"],
    "steps": ["Drill holes of various sizes (1/4\" to 3/8\") in wooden blocks or logs", "Bundle the paper towel rolls tightly together", "Stuff rolls into a box or attach to a log with wire", "Hang 5-7 feet high in a sunny, sheltered spot facing south"],
    "whyKidsLoveIt": "Checking on their hotel guests becomes a daily ritual that connects them to nature."
  }
]`

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
            content: 'You are Wilder Companion, a creative architect for families. You help parents create magical outdoor spaces for kids using household items. You are warm, playful, and practical. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.9,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', response.status, errorText)
      return res.status(500).json({ error: 'Failed to generate builds' })
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      return res.status(500).json({ error: 'No response from OpenAI' })
    }

    // Try to parse the JSON response
    let builds
    try {
      // Clean the response - remove markdown code blocks if present
      let cleanContent = content.trim()
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.slice(7)
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.slice(3)
      }
      if (cleanContent.endsWith('```')) {
        cleanContent = cleanContent.slice(0, -3)
      }
      builds = JSON.parse(cleanContent.trim())
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Content:', content)
      return res.status(500).json({ error: 'Failed to parse build response' })
    }

    // Validate we got 3 builds
    if (!Array.isArray(builds) || builds.length !== 3) {
      console.error('Invalid builds array:', builds)
      return res.status(500).json({ error: 'Invalid response format' })
    }

    return res.status(200).json({ builds })

  } catch (error) {
    console.error('Build generator error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
