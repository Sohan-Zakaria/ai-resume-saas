'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ScanResult,
  IssueItem,
  KeywordMatch,
} from '@/lib/types';
import { getScoreColor } from '@/lib/utils';
import ScoreGauge from './ScoreGauge';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
  Zap,
  Target,
  FileCheck,
  FileText,
  TrendingUp,
  Download,
  Search,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AnalysisResultsProps {
  result: ScanResult;
  onReset: () => void;
}

export default function AnalysisResults({ result, onReset }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'issues' | 'keywords' | 'impact' | 'formatting'>('overview');
  const [issuesList, setIssuesList] = useState<IssueItem[]>(result.issues);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (result.overallScore >= 80) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [result.overallScore]);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApplyFix = (issueId: string) => {
    setIssuesList((prev) =>
      prev.map((iss) => (iss.id === issueId ? { ...iss, applied: !iss.applied } : iss))
    );
  };

  const scoreTheme = getScoreColor(result.overallScore);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
          {/* Left: Score Gauge */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <ScoreGauge score={result.overallScore} size={190} strokeWidth={16} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
              Scanned: {result.fileName}
            </span>
          </div>

          {/* Center: Executive Summary & Highlights */}
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI ATS Diagnostic Summary</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {result.overallScore >= 85
                  ? 'Outstanding! Top 5% ATS Match'
                  : result.overallScore >= 70
                  ? 'Strong Resume — A Few Fixes Recommended'
                  : 'Action Required: High Risk of ATS Filtering'}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {result.summary}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Action Verbs</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  {result.actionVerbsCount} strong
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Metrics & Numbers</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  {result.quantifiedMetricsCount} metrics
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Word Count</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                  <FileText className="w-4 h-4 text-blue-500" />
                  {result.wordCount} words
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Critical Issues</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  {issuesList.length} items
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick actions */}
          <div className="flex lg:flex-col items-center gap-3 shrink-0 w-full lg:w-48">
            <Link
              href="/builder"
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm text-center shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Edit in Builder</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={onReset}
              className="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Scan Another</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          ATS Breakdown
        </button>
        <button
          onClick={() => setActiveTab('issues')}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'issues'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          AI Fixes & Rewrites ({issuesList.length})
        </button>
        <button
          onClick={() => setActiveTab('keywords')}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'keywords'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Target className="w-4 h-4" />
          Keywords & Skills Match
        </button>
        <button
          onClick={() => setActiveTab('impact')}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'impact'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Impact & Action Verbs
        </button>
      </div>

      {/* Tab Contents */}

      {/* 1. Overview Breakdown */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(result.categories).map(([key, category]) => {
            const catTheme = getScoreColor(category.score);
            return (
              <div
                key={key}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${catTheme.bg} ${catTheme.text}`}
                    >
                      {category.score}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">{category.name}</h4>
                      <p className="text-xs text-slate-500">Weight: {category.weight * 100}%</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${catTheme.bg} ${catTheme.text} ${catTheme.border} border`}
                  >
                    {category.status.toUpperCase()}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300">{category.summary}</p>

                {/* Checklist items */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      {item.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="font-medium text-slate-800 dark:text-slate-200">{item.title}: </span>
                        <span className="text-slate-500 dark:text-slate-400">{item.description}</span>
                        {item.fixRecommendation && !item.passed && (
                          <p className="text-[11px] text-blue-600 dark:text-blue-400 mt-0.5 font-medium">
                            💡 Fix: {item.fixRecommendation}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. AI Fixes & 1-Click Rewrites */}
      {activeTab === 'issues' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Instant AI Rewrites & Suggestions ({issuesList.length})
            </h3>
            <span className="text-xs text-slate-500">Click &apos;Copy Fix&apos; to paste into your resume</span>
          </div>

          {issuesList.map((issue) => (
            <div
              key={issue.id}
              className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border transition-all shadow-sm ${
                issue.applied
                  ? 'border-emerald-500/50 bg-emerald-50/10 dark:bg-emerald-950/20'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      issue.type === 'critical'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                    }`}
                  >
                    {issue.category}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">{issue.title}</h4>
                </div>
                <span className="text-xs text-slate-400">{issue.explanation}</span>
              </div>

              {/* Diff View */}
              {issue.originalText && (
                <div className="space-y-2 mt-4 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-800 dark:text-rose-300 flex items-start gap-2">
                    <span className="font-bold select-none text-rose-500">- Original:</span>
                    <span className="break-all">{issue.originalText}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                    <span className="font-bold select-none text-emerald-500">+ AI Fix:</span>
                    <span className="break-all font-semibold">{issue.suggestedText}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                {issue.suggestedText && (
                  <button
                    onClick={() => handleCopyText(issue.suggestedText!, issue.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {copiedId === issue.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Fix</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={() => handleApplyFix(issue.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    issue.applied
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{issue.applied ? 'Applied' : 'Mark as Fixed'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Keywords & Skills Match */}
      {activeTab === 'keywords' && (
        <div className="space-y-6">
          {/* Matched Keywords */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Matched ATS Keywords ({result.matchedKeywords.length})
              </h4>
              <span className="text-xs text-slate-500">Indexed successfully by ATS</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.matchedKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold"
                >
                  <span>{kw.keyword}</span>
                  {kw.count > 1 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-emerald-200/60 dark:bg-emerald-800/60 text-[10px]">
                      {kw.count}x
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Keywords */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Recommended Missing Keywords ({result.missingKeywords.length})
              </h4>
              <span className="text-xs text-slate-500">Add these to pass resume filters</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Recruiters and automated ATS algorithms search for these specific industry terms. Include them where applicable in your skills or experience.
            </p>
            <div className="flex flex-wrap gap-2">
              {result.missingKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-xs font-semibold"
                >
                  <span>+ {kw.keyword}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Impact & Action Verbs */}
      {activeTab === 'impact' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              Quantifiable Impact & Achievement Metrics
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every bullet point on a top-tier resume should follow the Google X-Y-Z formula: 
              <span className="font-semibold text-slate-800 dark:text-slate-200"> &ldquo;Accomplished [X] as measured by [Y], by doing [Z]&rdquo;</span>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Target Metric Density
                </span>
                <p className="text-xs text-slate-500">
                  Aim for at least 1 quantifiable outcome (percentage boost, dollar growth, speed increase) per role.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Active Leadership Verbs
                </span>
                <p className="text-xs text-slate-500">
                  Replace &ldquo;Responsible for&rdquo; and &ldquo;Assisted with&rdquo; with decisive words like &ldquo;Architected&rdquo;, &ldquo;Pioneered&rdquo;, &ldquo;Orchestrated&rdquo;.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
