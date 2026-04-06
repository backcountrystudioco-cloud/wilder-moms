import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, criteria } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }

  try {
    // Send to your email
    await resend.emails.send({
      from: 'Wilder Moms <onboarding@resend.dev>',
      to: process.env.RECIPIENT_EMAIL || 'your@email.com',
      subject: `New Wilder Moms Signup: ${name}`,
      html: `
        <h2>New Signup</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${criteria ? `<p><strong>Looking for:</strong> ${criteria}</p>` : ''}
      `,
    });

    // Add to audience if RESEND_AUDIENCE_ID is set
    if (process.env.RESEND_AUDIENCE_ID) {
      await resend.contacts.create({
        audienceId: process.env.RESEND_AUDIENCE_ID,
        email,
        firstName: name,
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to subscribe' });
  }
}
