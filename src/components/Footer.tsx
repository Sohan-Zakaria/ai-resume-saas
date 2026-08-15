import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Zap, Globe, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white">
                Resume<span className="text-blue-600">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Zero-cost AI Resume Scanner and ATS Optimization platform. Beat Applicant Tracking Systems, fix grammar, and craft interview-winning resumes in seconds.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400 dark:text-slate-500">
              <span className="inline-flex items-center gap-1 text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-md border border-emerald-500/20 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> ATS Compliant Engine
              </span>
              <span className="inline-flex items-center gap-1 text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md border border-blue-500/20 font-medium">
                <Zap className="w-3.5 h-3.5" /> Groq / OpenAI Powered
              </span>
            </div>
          </div>

          {/* Links 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/scanner" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  ATS Resume Scanner
                </Link>
              </li>
              <li>
                <Link href="/builder" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  AI Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Candidate Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-slate-500 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200">ATS Checklist 2026</span>
              </li>
              <li>
                <span className="text-slate-500 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200">Action Verbs Dictionary</span>
              </li>
              <li>
                <span className="text-slate-500 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200">Resume Templates</span>
              </li>
              <li>
                <span className="text-slate-500 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200">Job Match Guide</span>
              </li>
            </ul>
          </div>

          {/* Links 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Legal & Info</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-slate-500">Security & GDPR</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ResumeAI SaaS Boilerplate. Built with Next.js 15, Tailwind & Stripe.</p>
          <div className="flex items-center gap-4">
            <span>Powered by Groq Llama 3 & OpenAI API</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
