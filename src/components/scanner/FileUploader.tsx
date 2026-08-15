'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Sparkles, Check, AlertCircle, ArrowRight, Target, Clipboard } from 'lucide-react';
import { SAMPLE_RESUMES } from '@/lib/sample-data';
import { ScanResult } from '@/lib/types';
import { decrementScanCredit, getUser } from '@/lib/storage';

interface FileUploaderProps {
  onScanComplete: (result: ScanResult) => void;
  onRequestUpgrade: () => void;
}

export default function FileUploader({ onScanComplete, onRequestUpgrade }: FileUploaderProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [showJdInput, setShowJdInput] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progressStage, setProgressStage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (uploadedFile: File) => {
    setError(null);
    const validExtensions = ['.pdf', '.docx', '.txt'];
    const fileName = uploadedFile.name.toLowerCase();
    const isValid = validExtensions.some(ext => fileName.endsWith(ext));

    if (!isValid) {
      setError('Please upload a valid PDF, DOCX, or TXT file.');
      return;
    }

    if (uploadedFile.size > 10 * 1024 * 1024) {
      setError('File size must be under 10MB.');
      return;
    }

    setFile(uploadedFile);
  };

  const handleLoadSample = (key: 'software_engineer' | 'product_manager') => {
    setError(null);
    const sample = SAMPLE_RESUMES[key];
    setPastedText(sample.rawText);
    setTargetRole(sample.role);
    setActiveTab('paste');
  };

  const handleStartScan = async () => {
    setError(null);

    // Check credits
    const user = getUser();
    if (!user.unlimitedScans && user.plan === 'free' && user.scansLeft <= 0) {
      onRequestUpgrade();
      return;
    }

    if (activeTab === 'upload' && !file) {
      setError('Please select or drop a resume file first.');
      return;
    }

    if (activeTab === 'paste' && (!pastedText || pastedText.trim().length < 30)) {
      setError('Please paste at least 30 characters of your resume content.');
      return;
    }

    setLoading(true);
    setProgressStage('Extracting document & formatting layout...');

    try {
      let scanResult: ScanResult;

      if (activeTab === 'upload' && file) {
        const formData = new FormData();
        formData.append('file', file);
        if (jobDescription) formData.append('jobDescription', jobDescription);
        if (targetRole) formData.append('targetRole', targetRole);

        const response = await fetch('/api/scan', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Failed to analyze resume');
        }

        scanResult = await response.json();
      } else {
        const response = await fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: pastedText,
            fileName: `${targetRole || 'candidate'}_resume.txt`,
            fileSize: pastedText.length,
            jobDescription: jobDescription || undefined,
            targetRole: targetRole || undefined,
          }),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Failed to analyze resume');
        }

        scanResult = await response.json();
      }

      decrementScanCredit();
      onScanComplete(scanResult);
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while scanning.';
      setError(errorMessage);
    } finally {
      setLoading(false);
      setProgressStage('');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 transition-all">
      {/* Mode Switcher */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab('upload');
              setError(null);
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'upload'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            Upload File (PDF / DOCX)
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('paste');
              setError(null);
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'paste'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Clipboard className="w-4 h-4" />
            Paste Text
          </button>
        </div>

        {/* 1-Click Samples */}
        <div className="hidden sm:flex items-center gap-2 text-xs">
          <span className="text-slate-400">Try sample:</span>
          <button
            type="button"
            onClick={() => handleLoadSample('software_engineer')}
            className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-700 dark:text-slate-300 hover:text-blue-600 font-medium transition-colors"
          >
            Engineer
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('product_manager')}
            className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-700 dark:text-slate-300 hover:text-blue-600 font-medium transition-colors"
          >
            Product Mgr
          </button>
        </div>
      </div>

      {/* Upload Dropzone */}
      {activeTab === 'upload' ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 scale-[0.99]'
              : file
              ? 'border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-950/20'
              : 'border-slate-300 dark:border-slate-700 hover:border-blue-400 bg-slate-50/50 dark:bg-slate-900/50'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.docx,.txt"
            className="hidden"
          />

          {file ? (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white text-base">{file.name}</p>
                <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB • Ready for ATS Analysis</p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                className="text-xs text-rose-500 hover:underline pt-1"
              >
                Remove / Change file
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner">
                <UploadCloud className="w-7 h-7" />
              </div>
              <div>
                <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
                  Drag and drop your resume here, or <span className="text-blue-600 dark:text-blue-400">browse</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Supports PDF, DOCX, and TXT up to 10MB. Privacy guaranteed.
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Direct Text Paste Area */
        <div className="space-y-3">
          <textarea
            rows={8}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste your raw resume text here (Summary, Experience, Education, Skills)..."
            className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{pastedText.split(/\s+/).filter(Boolean).length} words</span>
            <button
              type="button"
              onClick={() => setPastedText('')}
              className="hover:text-rose-500 transition-colors"
            >
              Clear Text
            </button>
          </div>
        </div>
      )}

      {/* Target Job Matcher Optional Toggle */}
      <div className="mt-5 pt-5 border-t border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowJdInput(!showJdInput)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <Target className="w-3.5 h-3.5" />
            {showJdInput ? 'Hide Target Job Description Matcher' : '+ Match against a Target Job Description (Recommended)'}
          </button>
        </div>

        {showJdInput && (
          <div className="space-y-3 p-4 rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 animate-in fade-in">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Target Role / Job Title (Optional)
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Software Engineer, Lead Product Manager"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Paste Job Description (Keywords will be cross-referenced by AI)
              </label>
              <textarea
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste requirements, responsibilities, and qualifications from the job posting..."
                className="w-full p-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* Error display */}
      {error && (
        <div className="mt-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Action Button */}
      <div className="mt-6">
        <button
          type="button"
          disabled={loading || (activeTab === 'upload' ? !file : !pastedText)}
          onClick={handleStartScan}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>{progressStage || 'Running AI ATS Analysis...'}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Analyze Resume with AI</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
