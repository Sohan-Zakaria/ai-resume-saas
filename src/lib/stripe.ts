import Stripe from 'stripe';
import { PricingPlan } from './types';

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-03-25.acacia' as unknown as Stripe.LatestApiVersion,
      appInfo: {
        name: 'AI Resume SaaS',
        version: '1.0.0',
      },
    })
  : null;

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free Starter',
    priceMonthly: 0,
    priceAnnual: 0,
    description: 'Perfect for quick resume checkups and exploring the platform.',
    features: [
      '3 Complete ATS Resume Scans',
      'Basic ATS Score & Grade',
      'Access to 2 Resume Templates',
      'Standard PDF Resume Download',
      'Community Support',
    ],
    ctaText: 'Get Started Free',
  },
  {
    id: 'pro_monthly',
    name: 'Pro Monthly',
    badge: 'Most Popular',
    priceMonthly: 19,
    priceAnnual: 15,
    description: 'For active job seekers aiming to land interviews 3x faster.',
    features: [
      'Unlimited AI Resume Scans',
      'Deep Job Description ATS Matcher',
      '1-Click "Fix with AI" Auto-Rewrite',
      'All 4 Premium Templates & Colors',
      'AI Bullet Point & Metric Booster',
      'Priority ATS Parser & Export',
      '24/7 Priority Support',
    ],
    highlighted: true,
    ctaText: 'Upgrade to Pro Monthly',
    priceIdTest: 'price_test_monthly_19',
  },
  {
    id: 'pro_annual',
    name: 'Pro Annual',
    badge: 'Save 30%',
    priceMonthly: 12,
    priceAnnual: 144,
    description: 'Full career advantage with unlimited optimizations year-round.',
    features: [
      'Everything in Pro Monthly',
      'Unlimited AI Resume Scans for 1 Year',
      'Unlimited Target Job Match Scans',
      'AI Cover Letter Generator (Included)',
      'LinkedIn Profile Optimizer',
      'Early Access to New AI Models',
      'Lifetime Updates & VIP Support',
    ],
    ctaText: 'Get Pro Annual Plan',
    priceIdTest: 'price_test_annual_144',
  },
];
