import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { planId, billingInterval } = await req.json();
    const origin = req.headers.get('origin') || 'http://localhost:3000';

    // If Stripe secret is configured, create live/test Stripe session
    if (stripe && process.env.STRIPE_SECRET_KEY) {
      const isAnnual = billingInterval === 'annual';
      const unitAmount = planId === 'pro_annual' || isAnnual ? 14400 : 1900;
      const planName = planId === 'pro_annual' || isAnnual ? 'Pro Annual Plan' : 'Pro Monthly Plan';

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `AI Resume SaaS - ${planName}`,
                description: 'Unlimited AI Resume Scans, ATS Optimization, and Pro Templates',
              },
              unit_amount: unitAmount,
              recurring: {
                interval: isAnnual ? 'year' : 'month',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${origin}/dashboard?upgrade=success&plan=${planId}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing?canceled=true`,
        metadata: {
          planId,
          interval: isAnnual ? 'annual' : 'monthly',
        },
      });

      return NextResponse.json({ url: session.url });
    }

    // Demo/Simulated test checkout mode when keys are not yet configured
    const targetPlan = planId === 'pro_annual' ? 'pro_annual' : 'pro_monthly';
    const mockSuccessUrl = `${origin}/dashboard?upgrade=success&plan=${targetPlan}&mode=mock_test`;

    return NextResponse.json({
      url: mockSuccessUrl,
      isMock: true,
      message: 'Running in zero-cost mock checkout mode. Set STRIPE_SECRET_KEY in .env for live Stripe Test Mode.',
    });
  } catch (error: unknown) {
    console.error('Checkout creation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
