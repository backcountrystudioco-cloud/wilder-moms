// Trail Craft API
// Receives a photo of items found on a trail, identifies them
// with OpenAI vision, then returns a craft idea + step-by-step
// directions for a tired parent + a sketched image of the
// finished craft (DALL-E 3, natural style, watercolor / ink
// sketch feel).
//
// Requires OPENAI_API_KEY in environment variables.
//
// Body: { image: <base64 data URL or https URL of the photo> }
// Returns: { items, title, summary, materials, steps, imageUrl }

const OPENAI_BASE = 'https://api.openai.com/v1'
const VISION_MODEL = 'gpt-4o-mini'
const IMAGE_MODEL = 'dall-e-3'

const VISION_PROMPT = `You are "Wilder Companion" — a kind, low-key craft designer for tired parents. A family just got home from a nature walk. Look at the photo of what they collected and propose ONE simple, beautiful nature craft or art project they can do at home.

Hard requirements:
- Use mostly the items visible in the photo.
- Doable by a tired parent in 15-30 minutes.
- Appropriate for kids ages 2-10 (no sharp tools, nothing toxic).
- Needs at most 3 additional supplies (glue, scissors, paper, paint, string).
- Feels magical, not precious. Kids lead, parent helps.
- The steps must be short, clear sentences. Imagine a parent reading them at 5 p.m. with a child tugging at their sleeve.

Return ONLY valid JSON in this exact shape (no markdown, no prose outside the JSON):
{
  "items": ["the items you can see in the photo"],
  "title": "Short title (max 5 words)",
  "summary": "One sentence about why kids will love this.",
  "materials": ["item 1", "item 2", ...],
  "steps": ["Step 1.", "Step 2.", "Step 3.", "Step 4.", "Step 5."],
  "imagePrompt": "A description for an illustrator. Start with: 'A soft watercolor and ink sketch on cream paper showing' and describe the finished craft using the items the family found. End with: 'Hand-drawn lines, warm and inviting, like an illustration from a children's nature book. No text in the image.' Keep it under 80 words total."
}`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { image } = req.body || {}
  if (!image || typeof image !== 'string') {
    return res.status(400).json({ error: 'Missing image' })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' })
  }

  try {
    // Step 1 — Vision + craft generation
    const visionRes = await fetch(`${OPENAI_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: VISION_MODEL,
        messages: [
          { role: 'system', content: VISION_PROMPT },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Here is the photo of items my kids and I found on the trail. Please propose one craft.',
              },
              { type: 'image_url', image_url: { url: image } },
            ],
          },
        ],
        response_format: { type: 'json_object' },
        max_tokens: 1200,
      }),
    })

    if (!visionRes.ok) {
      const errText = await visionRes.text()
      console.error('[trail-craft] vision failed', errText)
      return res.status(502).json({ error: 'Vision request failed' })
    }

    const visionData = await visionRes.json()
    let craft
    try {
      craft = JSON.parse(visionData.choices[0].message.content)
    } catch (err) {
      console.error('[trail-craft] vision JSON parse failed', err)
      return res.status(502).json({ error: 'Vision response could not be parsed' })
    }

    // Step 2 — Sketched image generation
    const imagePrompt =
      craft.imagePrompt ||
      'A soft watercolor and ink sketch on cream paper showing a simple nature craft made from leaves and sticks. Hand-drawn lines, warm and inviting, like an illustration from a children\'s nature book. No text in the image.'

    const imageRes = await fetch(`${OPENAI_BASE}/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: IMAGE_MODEL,
        prompt: imagePrompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        style: 'natural',
      }),
    })

    if (!imageRes.ok) {
      const errText = await imageRes.text()
      console.error('[trail-craft] image gen failed', errText)
      // Still return the craft text — better than nothing.
      return res.status(200).json({
        items: craft.items || [],
        title: craft.title || 'A trail craft',
        summary: craft.summary || '',
        materials: craft.materials || [],
        steps: craft.steps || [],
        imageUrl: null,
        imageError: 'Image generation is taking a moment. Try again in a sec.',
      })
    }

    const imageData = await imageRes.json()
    const imageUrl = imageData?.data?.[0]?.url || null

    return res.status(200).json({
      items: craft.items || [],
      title: craft.title || 'A trail craft',
      summary: craft.summary || '',
      materials: craft.materials || [],
      steps: craft.steps || [],
      imageUrl,
    })
  } catch (err) {
    console.error('[trail-craft] handler failed', err)
    return res.status(500).json({ error: 'Trail craft generation failed' })
  }
}
