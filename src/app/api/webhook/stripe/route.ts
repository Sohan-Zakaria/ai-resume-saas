import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ received: true, note: 'Webhook endpoint active (mock mode)' });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe signature' }, { status: 400 });
  }

  try {
    const rawBody = await req.text();
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log('Stripe checkout completed for customer:', session.customer);
        // Here you update user status in DB (e.g. Supabase/Postgres)
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        console.log('Stripe subscription cancelled:', subscription.id);
        break;
      }
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Webhook signature verification failed';
    console.error('Stripe webhook error:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
