'use client';

import React, { useState } from 'react';
import { PRICING_PLANS } from '@/lib/stripe';
import { PricingPlan } from '@/lib/types';
import { Check, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { getUser, upgradeUserToPro } from '@/lib/storage';

interface PricingCardProps {
  onSelectPlan?: (planId: string) => void;
}

export default function PricingCard({ onSelectPlan }: PricingCardProps) {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('monthly');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (plan: PricingPlan) => {
    if (plan.id === 'free') {
      window.location.href = '/scanner';
      return;
    }

    setLoadingPlan(plan.id);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: plan.id,
          billingInterval,
        }),
      });

      const data = await response.json();
      if (data.url) {
        if (data.isMock) {
          // Instantly upgrade local user in mock test mode
          upgradeUserToPro(plan.id === 'pro_annual' ? 'pro_annual' : 'pro_monthly');
        }
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      alert('Unable to start checkout session.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12">
      {/* Interval Toggle */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="inline-flex items-center p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setBillingInterval('monthly')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              billingInterval === 'monthly'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            onClick={() => setBillingInterval('annual')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              billingInterval === 'annual'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Annual Billing</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-bold">
              Save 30%
            </span>
          </button>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          No contracts. Cancel anytime with 1 click.
        </span>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const isProAnnual = plan.id === 'pro_annual';
          const isProMonthly = plan.id === 'pro_monthly';
          const price =
            billingInterval === 'annual'
              ? plan.priceAnnual
              : plan.priceMonthly;

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-500/25 ring-2 ring-blue-500 scale-105 z-10'
                  : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl'
              }`}
            >
              {plan.badge && (
                <div
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    plan.highlighted
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                  }`}
                >
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p
                  className={`text-xs mt-2 min-h-[36px] ${
                    plan.highlighted ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight">
                    ${billingInterval === 'annual' && isProMonthly ? Math.round(plan.priceAnnual / 12) : price}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      plan.highlighted ? 'text-blue-200' : 'text-slate-500'
                    }`}
                  >
                    {plan.id === 'free'
                      ? 'forever'
                      : billingInterval === 'annual'
                      ? '/ month (billed yearly)'
                      : '/ month'}
                  </span>
                </div>

                {/* Feature Checklist */}
                <div className="mt-8 space-y-3.5 border-t border-slate-200/20 dark:border-slate-800 pt-6">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider block ${
                      plan.highlighted ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    What&apos;s Included:
                  </span>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          plan.highlighted
                            ? 'bg-blue-500/40 text-white'
                            : 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className={plan.highlighted ? 'text-blue-50' : 'text-slate-600 dark:text-slate-300'}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTA Button */}
              <div className="mt-8 pt-4">
                <button
                  type="button"
                  disabled={loadingPlan === plan.id}
                  onClick={() => handleCheckout(plan)}
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? 'bg-white text-blue-700 hover:bg-blue-50 hover:shadow-lg'
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/20'
                  }`}
                >
                  {loadingPlan === plan.id ? (
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      {plan.highlighted && <Zap className="w-4 h-4 fill-current" />}
                      <span>{plan.ctaText}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guarantee & Test Mode info */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center text-xs text-slate-500 dark:text-slate-400 pt-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>14-day money-back guarantee</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span>Stripe Test Mode active — test for $0</span>
        </div>
      </div>
    </div>
  );
}
