import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@magicwrxtools/auth-tool';
import { calculateTokensForAmount, calculateTiers } from '@/lib/tokens';

/**
 * POST /api/tokens/purchase
 *
 * Creates a Stripe Checkout Session for a one-time token purchase.
 * Supports predefined tiers (tierId) and custom amounts (customAmount).
 *
 * Body: { tierId?: number, customAmount?: number }
 * Returns: { url: string } — redirect client to this Stripe Checkout URL
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { tierId, customAmount } = body;

    // Determine amount and tokens
    let amountUsd: number;
    let tokenCount: number;

    if (customAmount && typeof customAmount === 'number' && customAmount >= 1 && customAmount <= 1000) {
      amountUsd = customAmount;
      tokenCount = calculateTokensForAmount(customAmount);
    } else if (tierId && typeof tierId === 'number') {
      const tiers = calculateTiers();
      const tier = tiers.find((t) => t.usd === tierId);
      if (!tier) {
        return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
      }
      amountUsd = tier.usd;
      tokenCount = tier.messages;
    } else {
      // Default: $1 = 50 tokens
      amountUsd = 1;
      tokenCount = 50;
    }

    // Price in cents for Stripe
    const priceInCents = Math.round(amountUsd * 100);

    // Use raw stripe for one-time payment checkout (stripe-tool only supports subscriptions)
    const Stripe = require('stripe');
    const stripeKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SANDBOX_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
    }
    const stripe = new Stripe(stripeKey, { apiVersion: '2025-02-24.acacia' });

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${tokenCount.toLocaleString()} Trusties Tokens`,
              description: `$${amountUsd} — ${tokenCount.toLocaleString()} tokens (${(amountUsd / tokenCount).toFixed(4)}¢ per token)`,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      customer_email: session.user.email || undefined,
      metadata: {
        userId: session.user.id,
        tokens: String(tokenCount),
        amountUsd: String(amountUsd),
        type: 'token_purchase',
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://trusties.uk'}/account?purchase=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://trusties.uk'}/pricing?purchase=cancelled`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    console.error('Token purchase error:', err);
    const message = err instanceof Error ? err.message : 'Purchase failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
