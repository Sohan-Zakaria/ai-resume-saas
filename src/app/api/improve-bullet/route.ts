import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { originalBullet, role, action } = await req.json();

    if (!originalBullet || originalBullet.trim().length < 5) {
      return NextResponse.json({ error: 'Original bullet is too short.' }, { status: 400 });
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (groqApiKey || openaiApiKey) {
      try {
        const isGroq = Boolean(groqApiKey);
        const endpoint = isGroq
          ? 'https://api.groq.com/openai/v1/chat/completions'
          : 'https://api.openai.com/v1/chat/completions';
        const apiKey = groqApiKey || openaiApiKey;
        const model = isGroq ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini';

        const prompt = `Rewrite the following resume bullet point for a ${role || 'professional'} role.
Goal: Make it high-impact, start with a strong active verb, include realistic quantifiable metrics/outcomes, and optimize for ATS screening.
Action type requested: ${action || 'enhance_impact'}

Original bullet: "${originalBullet}"

Respond ONLY with the rewritten bullet point text as a single string. No quotes, no markdown, no preamble.`;

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.3,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const rewritten = data.choices?.[0]?.message?.content?.trim();
          if (rewritten) {
            return NextResponse.json({ improvedBullet: rewritten.replace(/^[-•*]\s*/, '') });
          }
        }
      } catch (err) {
        console.warn('AI bullet generation failed, fallback applied:', err);
      }
    }

    // Heuristic intelligent rewrite generator fallback
    const improved = generateImprovedBulletFallback(originalBullet, role);
    return NextResponse.json({ improvedBullet: improved });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

function generateImprovedBulletFallback(original: string, role?: string): string {
  const cleaned = original.replace(/^[-•*]\s*/, '').trim();

  // If already strong with numbers
  if (/\d+%\s*|\$\d+|\d+x/.test(cleaned)) {
    return cleaned.replace(/^(Worked on|Helped with|Responsible for)/i, 'Spearheaded');
  }

  // Prepend powerful verbs and metric anchors
  const verbs = ['Architected', 'Spearheaded', 'Engineered', 'Orchestrated', 'Delivered', 'Streamlined'];
  const verb = verbs[Math.floor(Math.random() * verbs.length)];

  if (/managed|led|directed/i.test(cleaned)) {
    return `Spearheaded cross-functional team execution, delivering critical milestones 2 weeks ahead of schedule and boosting productivity by 24%.`;
  }

  if (/built|developed|created|coded/i.test(cleaned)) {
    return `Architected and deployed scalable solution using modern architecture, reducing latency by 35% and supporting 10,000+ active users.`;
  }

  if (/tested|qa|quality/i.test(cleaned)) {
    return `Engineered automated test suites with 94% coverage, reducing production regression incidents by 40%.`;
  }

  return `${verb} end-to-end ${role ? `${role.toLowerCase()} ` : ''}workflows, improving operational efficiency by 28% and driving measurable stakeholder impact.`;
}
