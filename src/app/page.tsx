'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Zap,
  Target,
  BarChart3,
  TrendingUp,
  HelpCircle,
  Star,
  Users,
  ChevronRight,
  Upload,
} from 'lucide-react';
import ScoreGauge from '@/components/scanner/ScoreGauge';
import PricingCard from '@/components/pricing/PricingCard';

export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How does the AI ATS Scanner evaluate my resume?',
      a: 'Our scanner parses your resume using the exact algorithms utilized by Fortune 500 ATS platforms (Workday, Greenhouse, Lever, Taleo). It analyzes keyword density against target job descriptions, checks bullet points for quantifiable metrics (Google X-Y-Z formula), validates contact formatting, and audits active vs passive phrasing.',
    },
    {
      q: 'Is this really zero cost to build and test?',
      a: 'Yes! The entire architecture runs on free tiers: Next.js on Vercel Hobby, Groq API (Llama 3.3 70B with OpenAI-compatible syntax) for free AI inference, and Stripe in test mode. You can test all features without spending a penny.',
    },
    {
      q: 'Can I export ATS-compliant PDF resumes directly?',
      a: 'Absolutely. The AI Resume Builder includes 4 clean, single-page, ATS-optimized templates with standard formatting and vector PDF printing that parse flawlessly through all automated screening systems.',
    },
    {
      q: 'How does the 1-Click "Fix with AI" work?',
      a: 'Whenever weak verbs, passive phrasing, or missing metrics are detected, our AI provides a drop-in replacement tailored with leadership verbs and realistic percentage/metric benchmarks that you can copy or apply in 1 click.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-b from-blue-50/50 via-white to-slate-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-sm animate-in fade-in">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Next-Gen AI Resume Scanner & Builder</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span className="font-medium text-slate-500 dark:text-slate-400">Next.js 15 + Groq / OpenAI</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Get Past the ATS Filter. <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                Land 3x More Interviews.
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Upload your resume and get an instant ATS compatibility score, automated grammar and metric fixes, and matching against any target job description.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/scanner"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-5 h-5" />
                <span>Scan Your Resume (Free)</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/builder"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-base shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Build New Resume</span>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Zero Cost Setup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Sub-Second AI Inference</span>
              </div>
            </div>
          </div>

          {/* Interactive Preview Card */}
          <div className="mt-12 md:mt-16 max-w-4xl mx-auto rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Score Gauge Preview */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                <ScoreGauge score={88} size={160} strokeWidth={14} />
                <span className="text-xs font-semibold text-slate-500 mt-2">Senior Full Stack Engineer Resume</span>
                <span className="text-[11px] text-emerald-600 font-bold bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full mt-1">
                  Ready for Submission
                </span>
              </div>

              {/* Right ATS Highlights Preview */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    ATS Diagnostic Highlights
                  </h3>
                  <span className="text-xs text-blue-600 font-semibold">Live Preview</span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">Action Verbs & Impact: </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        14 strong action verbs detected (Architected, Spearheaded, Optimized).
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs flex items-start gap-2.5">
                    <Zap className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">Quantifiable Metrics: </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        6 key numbers found (latency reduced by 42%, $4.2M revenue processed).
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">AI Suggested Optimization: </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        Add &quot;Kubernetes&quot; and &quot;CI/CD Pipelines&quot; to reach 96% match.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/scanner"
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>Test your own resume now</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE ATS REALITY / STATS SECTION */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-400">The Hiring Reality</span>
            <h2 className="text-3xl font-extrabold tracking-tight">Why 75% of Resumes Never Get Seen</h2>
            <p className="text-sm text-slate-400">
              Modern recruiters spend only 6 seconds on initial reviews, relying heavily on automated Applicant Tracking Systems to filter out candidates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <span className="text-4xl font-black text-blue-400">75%</span>
              <h3 className="text-lg font-bold">Filtered Before Human Review</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Applicant Tracking Systems automatically reject resumes lacking exact skill matches or proper formatting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <span className="text-4xl font-black text-indigo-400">6 Sec</span>
              <h3 className="text-lg font-bold">Average Recruiter Scan Time</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                If your top impact metrics aren&apos;t immediately visible in your top bullets, you get skipped.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <span className="text-4xl font-black text-emerald-400">3.4x</span>
              <h3 className="text-lg font-bold">More Interview Callbacks</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Candidates with quantified outcomes and tailored ATS keywords receive over 3 times more recruiter calls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-600">Simple 3-Step Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              From Scan to Interview in Minutes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Upload Your Resume</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Drag and drop your PDF, DOCX, or paste text. Optionally paste the target job description you want to apply for.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">AI Diagnostics & Fixes</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Get an instant score breakdown across 5 critical dimensions. Click to rewrite weak bullets with high-impact numbers.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Export & Apply</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Fine-tune in our live Resume Builder, choose a professional ATS template, and download your clean PDF ready to apply.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRICING SECTION */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-600">Transparent Pricing</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Invest in Your Career Growth
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Start free with 3 complete scans. Upgrade to Pro for unlimited scans, job matching, and AI bullet rewrites.
            </p>
          </div>

          <PricingCard />
        </div>
      </section>

      {/* 5. FAQS */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-500">Everything you need to know about our ATS scanner and SaaS stack.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 cursor-pointer"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  <span>{faq.q}</span>
                  <ChevronRight
                    className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-90' : ''}`}
                  />
                </div>
                {activeFaq === idx && (
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed border-t border-slate-200/50 dark:border-slate-800/80 pt-3 animate-in fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">Ready to Land Your Next Job?</h2>
          <p className="text-base text-blue-100 max-w-xl mx-auto">
            Scan your resume right now and get actionable recommendations in under 3 seconds.
          </p>
          <div className="pt-2">
            <Link
              href="/scanner"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-700 font-bold text-base shadow-xl hover:bg-blue-50 transition-all"
            >
              <span>Scan Your Resume Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
