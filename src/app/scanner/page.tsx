'use client';

import React, { useState, useEffect } from 'react';
import FileUploader from '@/components/scanner/FileUploader';
import AnalysisResults from '@/components/scanner/AnalysisResults';
import { ScanResult } from '@/lib/types';
import { saveScanResult, getSavedScans } from '@/lib/storage';
import { Sparkles, History, ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ScannerPage() {
  const [currentScan, setCurrentScan] = useState<ScanResult | null>(null);
  const [recentScans, setRecentScans] = useState<ScanResult[]>([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    setRecentScans(getSavedScans());
    const handleUpdate = () => setRecentScans(getSavedScans());
    window.addEventListener('saas_scans_updated', handleUpdate);
    return () => window.removeEventListener('saas_scans_updated', handleUpdate);
  }, []);

  const handleScanComplete = (result: ScanResult) => {
    setCurrentScan(result);
    saveScanResult(result);
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Title */}
        {!currentScan && (
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Powered ATS Diagnostic Engine</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              ATS Resume Scanner & Optimizer
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Upload your resume (PDF/DOCX/TXT) to uncover ATS blockers, fix weak verbs, and tailor for top job matches.
            </p>
          </div>
        )}

        {/* Scanner Component / Results View */}
        {currentScan ? (
          <AnalysisResults
            result={currentScan}
            onReset={() => setCurrentScan(null)}
          />
        ) : (
          <div className="space-y-12">
            <FileUploader
              onScanComplete={handleScanComplete}
              onRequestUpgrade={() => setShowUpgradeModal(true)}
            />

            {/* Recent Scans Repository */}
            {recentScans.length > 0 && (
              <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                    <History className="w-4 h-4 text-blue-600" />
                    Previous Resume Scans ({recentScans.length})
                  </h3>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recentScans.slice(0, 5).map((scan) => (
                    <div
                      key={scan.id}
                      onClick={() => setCurrentScan(scan)}
                      className="py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 px-2 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
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
                          <p className="font-semibold text-xs text-slate-900 dark:text-white">{scan.fileName}</p>
                          <p className="text-[11px] text-slate-400">
                            {new Date(scan.uploadedAt).toLocaleDateString()} • {scan.wordCount} words
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold">
                        <span>View Results</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Upgrade Notice Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Free Scan Limit Reached</h3>
            <p className="text-xs text-slate-500">
              You&apos;ve used all 3 free starter scans. Upgrade to Pro for unlimited AI scans, job description matching, and AI bullet point generation.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/pricing"
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md"
              >
                View Pro Plans ($19/mo)
              </Link>
              <button
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                className="w-full py-2.5 rounded-xl text-slate-600 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
