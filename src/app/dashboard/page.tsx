'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  getUser,
  getSavedScans,
  getSavedResumes,
  deleteResume,
  upgradeUserToPro,
} from '@/lib/storage';
import { User, ScanResult, ResumeData } from '@/lib/types';
import {
  Sparkles,
  FileText,
  Scan,
  Zap,
  Trash2,
  ArrowRight,
  TrendingUp,
  Plus,
} from 'lucide-react';
import confetti from 'canvas-confetti';

function DashboardContent() {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [showUpgradeSuccess, setShowUpgradeSuccess] = useState(false);

  useEffect(() => {
    const upgradeParam = searchParams.get('upgrade');
    const planParam = searchParams.get('plan') as 'pro_monthly' | 'pro_annual' | null;

    if (upgradeParam === 'success') {
      upgradeUserToPro(planParam || 'pro_monthly');
      setShowUpgradeSuccess(true);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    }

    setUser(getUser());
    setScans(getSavedScans());
    setResumes(getSavedResumes());

    const handleUpdate = () => {
      setUser(getUser());
      setScans(getSavedScans());
      setResumes(getSavedResumes());
    };

    window.addEventListener('saas_user_updated', handleUpdate);
    window.addEventListener('saas_scans_updated', handleUpdate);
    window.addEventListener('saas_resumes_updated', handleUpdate);

    return () => {
      window.removeEventListener('saas_user_updated', handleUpdate);
      window.removeEventListener('saas_scans_updated', handleUpdate);
      window.removeEventListener('saas_resumes_updated', handleUpdate);
    };
  }, [searchParams]);

  const handleDeleteResume = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this resume?')) {
      deleteResume(id);
    }
  };

  const avgScore =
    scans.length > 0
      ? Math.round(scans.reduce((acc, s) => acc + s.overallScore, 0) / scans.length)
      : 0;

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Success Banner */}
        {showUpgradeSuccess && (
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500 text-white shadow-lg flex items-center justify-between animate-in slide-in-from-top">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base">Subscription Activated! Welcome to Pro!</h3>
                <p className="text-xs text-emerald-100">
                  You now have unlimited AI scans, job match analysis, and all pro templates unlocked.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowUpgradeSuccess(false)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* User Profile Header Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-black shadow-md">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.name || 'Candidate'}</h1>
                {user?.unlimitedScans || user?.plan !== 'free' ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-current" /> PRO
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-xs font-medium">
                    Free Starter Plan
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">{user?.email || 'user@example.com'}</p>
            </div>
          </div>

          {/* Credits & Action */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className="p-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
              <span className="text-xs text-slate-400 block">Scans Available</span>
              <span className="text-lg font-black text-slate-900 dark:text-white">
                {user?.unlimitedScans ? 'Unlimited' : `${user?.scansLeft ?? 3} left`}
              </span>
            </div>

            {!user?.unlimitedScans && user?.plan === 'free' && (
              <Link
                href="/pricing"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
              >
                <Zap className="w-4 h-4" />
                <span>Upgrade to Pro</span>
              </Link>
            )}
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Scans Run</span>
            <div className="text-3xl font-black text-slate-900 dark:text-white flex items-center justify-between">
              <span>{scans.length}</span>
              <Scan className="w-6 h-6 text-blue-500 opacity-60" />
            </div>
            <p className="text-xs text-slate-500">Historical ATS evaluations</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Average ATS Score</span>
            <div className="text-3xl font-black text-slate-900 dark:text-white flex items-center justify-between">
              <span>{avgScore > 0 ? `${avgScore}/100` : '—'}</span>
              <TrendingUp className="w-6 h-6 text-emerald-500 opacity-60" />
            </div>
            <p className="text-xs text-slate-500">Across all uploaded drafts</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Saved Resumes</span>
            <div className="text-3xl font-black text-slate-900 dark:text-white flex items-center justify-between">
              <span>{resumes.length}</span>
              <FileText className="w-6 h-6 text-indigo-500 opacity-60" />
            </div>
            <p className="text-xs text-slate-500">In the interactive builder</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Saved Resumes */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Saved Resumes ({resumes.length})
              </h2>
              <Link
                href="/builder"
                className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Create New
              </Link>
            </div>

            <div className="space-y-3">
              {resumes.map((res) => (
                <div
                  key={res.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-blue-500/50 transition-all flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{res.title}</h3>
                    <p className="text-xs text-slate-500">
                      Template: <span className="capitalize font-medium">{res.template}</span> • {res.personal.fullName}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/builder"
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                    >
                      Open
                    </Link>
                    <button
                      onClick={(e) => handleDeleteResume(res.id, e)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scan History */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Scan className="w-5 h-5 text-indigo-600" />
                Recent ATS Scans
              </h2>
              <Link
                href="/scanner"
                className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                New Scan
              </Link>
            </div>

            {scans.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400 space-y-3">
                <p>No scans performed yet.</p>
                <Link
                  href="/scanner"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs"
                >
                  <span>Upload your first resume</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {scans.slice(0, 6).map((scan) => (
                  <div
                    key={scan.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                          scan.overallScore >= 80
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : scan.overallScore >= 60
                            ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                            : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {scan.overallScore}
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white">{scan.fileName}</h3>
                        <p className="text-[11px] text-slate-500">
                          {new Date(scan.uploadedAt).toLocaleDateString()} • {scan.actionVerbsCount} action verbs
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/scanner"
                      className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>Results</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
