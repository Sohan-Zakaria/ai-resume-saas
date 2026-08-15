'use client';

import React from 'react';
import PricingCard from '@/components/pricing/PricingCard';
import { Sparkles, Check, HelpCircle, ShieldCheck } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen py-12 sm:py-20 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple, Fair Pricing</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Supercharge Your Job Search
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Unlimited ATS diagnostics, AI bullet point generation, and premium templates. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <PricingCard />

        {/* Feature Comparison Matrix */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">
            Detailed Plan Feature Comparison
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4 text-center">Free Starter</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-600">Pro Monthly</th>
                  <th className="py-3 px-4 text-center font-bold text-indigo-600">Pro Annual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-3 px-4 font-medium">ATS Resume Scans</td>
                  <td className="py-3 px-4 text-center">3 total</td>
                  <td className="py-3 px-4 text-center font-semibold text-blue-600">Unlimited</td>
                  <td className="py-3 px-4 text-center font-semibold text-indigo-600">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Job Description Keyword Matcher</td>
                  <td className="py-3 px-4 text-center">Basic</td>
                  <td className="py-3 px-4 text-center font-semibold">Deep Semantic Match</td>
                  <td className="py-3 px-4 text-center font-semibold">Deep Semantic Match</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">1-Click AI Bullet Rewrites</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-600">Included</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-600">Included</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">ATS Templates Available</td>
                  <td className="py-3 px-4 text-center">2 Templates</td>
                  <td className="py-3 px-4 text-center font-semibold">All 4 Templates</td>
                  <td className="py-3 px-4 text-center font-semibold">All 4 Templates</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">PDF Vector Export</td>
                  <td className="py-3 px-4 text-center">Standard</td>
                  <td className="py-3 px-4 text-center font-semibold">High-Res Vector</td>
                  <td className="py-3 px-4 text-center font-semibold">High-Res Vector</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
