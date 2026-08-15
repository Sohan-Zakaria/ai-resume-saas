'use client';

import React, { useState, useEffect } from 'react';
import ResumeForm from '@/components/builder/ResumeForm';
import ResumePreview from '@/components/builder/ResumePreview';
import { ResumeData } from '@/lib/types';
import { SAMPLE_RESUMES } from '@/lib/sample-data';
import { getSavedResumes, saveResume } from '@/lib/storage';
import { Sparkles, Save, RotateCcw, Check, FileText } from 'lucide-react';

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(SAMPLE_RESUMES.software_engineer.data);
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  useEffect(() => {
    const resumes = getSavedResumes();
    if (resumes.length > 0) {
      setResumeData(resumes[0]);
    }
  }, []);

  const handleDataChange = (updated: ResumeData) => {
    setResumeData(updated);
    saveResume(updated);
    setSavedStatus('Auto-saved');
    setTimeout(() => setSavedStatus(null), 2500);
  };

  const handleLoadTemplate = (key: 'software_engineer' | 'product_manager') => {
    const selected = SAMPLE_RESUMES[key].data;
    setResumeData(selected);
    saveResume(selected);
  };

  return (
    <div className="min-h-screen py-8 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Interactive AI Resume Builder
            </h1>
            <p className="text-xs text-slate-500">
              Live split-screen editor with ATS-optimized templates & 1-click PDF vector printing.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {savedStatus && (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                {savedStatus}
              </span>
            )}

            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400">Load sample:</span>
              <button
                type="button"
                onClick={() => handleLoadTemplate('software_engineer')}
                className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 text-slate-700 dark:text-slate-300 font-medium"
              >
                Engineer
              </button>
              <button
                type="button"
                onClick={() => handleLoadTemplate('product_manager')}
                className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 text-slate-700 dark:text-slate-300 font-medium"
              >
                Product Mgr
              </button>
            </div>
          </div>
        </div>

        {/* Split Screen Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Form (5 cols) */}
          <div className="lg:col-span-5 w-full">
            <ResumeForm data={resumeData} onChange={handleDataChange} />
          </div>

          {/* Right: Live Preview & Printable Paper (7 cols) */}
          <div className="lg:col-span-7 w-full sticky top-20">
            <ResumePreview
              data={resumeData}
              onChangeTemplate={(t) => handleDataChange({ ...resumeData, template: t })}
              onChangeColor={(c) => handleDataChange({ ...resumeData, accentColor: c })}
              onChangeFont={(f) => handleDataChange({ ...resumeData, fontFamily: f })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
