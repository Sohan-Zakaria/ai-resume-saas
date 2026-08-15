import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Terms of Service</h1>
      <div className="prose dark:prose-invert text-sm text-slate-600 dark:text-slate-300 space-y-4">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>
          By using ResumeAI, you agree to these Terms. ResumeAI provides resume evaluation, ATS simulation, and resume building tools.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-6">1. Subscriptions & Billing</h2>
        <p>
          Paid subscriptions (Pro Monthly and Pro Annual) are managed through Stripe. You may cancel your subscription at any time.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-6">2. Fair Use</h2>
        <p>
          Our services are intended for individual job seekers and recruiters optimizing application documents.
        </p>
        <div className="pt-8">
          <Link href="/" className="text-blue-600 font-semibold hover:underline">
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
