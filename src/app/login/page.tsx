'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { saveUser, getUser } from '@/lib/storage';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const current = getUser();
      saveUser({
        ...current,
        email: email || 'user@example.com',
        name: email.split('@')[0] || 'Candidate',
      });
      window.location.href = '/dashboard';
    }, 500);
  };

  const handleDemoLogin = (type: 'free' | 'pro') => {
    setLoading(true);
    setTimeout(() => {
      saveUser({
        id: 'usr_demo_101',
        name: type === 'pro' ? 'Sarah Jenkins (Pro Member)' : 'Alex Taylor',
        email: type === 'pro' ? 'sarah.pro@example.com' : 'alex@example.com',
        plan: type === 'pro' ? 'pro_monthly' : 'free',
        scansLeft: type === 'pro' ? 999 : 3,
        unlimitedScans: type === 'pro',
        createdAt: new Date().toISOString(),
      });
      window.location.href = '/dashboard';
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sign In to ResumeAI</h1>
          <p className="text-xs text-slate-500">Access your ATS diagnostics and saved resumes</p>
        </div>

        {/* Demo instant logins */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">1-Click Test Logins</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('free')}
              className="py-1.5 px-2 rounded-lg bg-white dark:bg-slate-900 border text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-blue-500"
            >
              Free Account
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('pro')}
              className="py-1.5 px-2 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 text-xs font-semibold text-blue-700 dark:text-blue-300"
            >
              Pro Member
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
