import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Privacy Policy</h1>
      <div className="prose dark:prose-invert text-sm text-slate-600 dark:text-slate-300 space-y-4">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>
          At ResumeAI, we treat candidate privacy as our highest priority. When you upload a resume or paste text into our diagnostic tools, your document is processed in memory for scoring and optimization and is never sold or used to train third-party public models without explicit consent.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-6">1. Information We Collect</h2>
        <p>
          We collect the text and documents you upload to provide automated ATS scoring, keyword matching, and grammatical fixes.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-6">2. Data Retention & Deletion</h2>
        <p>
          You have full control over your scan history and saved resumes. You can clear or delete your saved records anytime from your dashboard.
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
