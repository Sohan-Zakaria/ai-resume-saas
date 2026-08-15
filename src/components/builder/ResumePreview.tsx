'use client';

import React, { useRef } from 'react';
import { ResumeData } from '@/lib/types';
import { Download, Printer, Palette, Type, Check, Sparkles } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  onChangeTemplate: (template: ResumeData['template']) => void;
  onChangeColor: (color: string) => void;
  onChangeFont: (font: ResumeData['fontFamily']) => void;
}

const ACCENT_COLORS = [
  { name: 'Royal Blue', value: '#2563eb' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Teal', value: '#0f766e' },
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Crimson', value: '#dc2626' },
  { name: 'Slate Dark', value: '#334155' },
];

export default function ResumePreview({
  data,
  onChangeTemplate,
  onChangeColor,
  onChangeFont,
}: ResumePreviewProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const fontClass =
    data.fontFamily === 'serif'
      ? 'font-serif'
      : data.fontFamily === 'mono'
      ? 'font-mono'
      : 'font-sans';

  return (
    <div className="flex flex-col space-y-4">
      {/* Customization Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm print:hidden">
        {/* Templates */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Template:</span>
          <div className="flex items-center gap-1">
            {(['modern', 'minimal', 'tech', 'executive'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onChangeTemplate(t)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                  data.template === t
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Accent Colors */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Accent:</span>
          <div className="flex items-center gap-1.5">
            {ACCENT_COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => onChangeColor(c.value)}
                style={{ backgroundColor: c.value }}
                className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform ${
                  data.accentColor === c.value ? 'scale-125 ring-2 ring-offset-2 ring-blue-500' : 'hover:scale-110'
                }`}
              >
                {data.accentColor === c.value && <Check className="w-3 h-3 text-white" />}
              </button>
            ))}
          </div>
        </div>

        {/* Print / Download Button */}
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs sm:text-sm font-bold shadow-md hover:opacity-90 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* The Printable Paper Container */}
      <div className="bg-slate-100 dark:bg-slate-950 p-2 sm:p-6 rounded-2xl flex justify-center items-start overflow-auto">
        <div
          ref={printRef}
          id="resume-printable-area"
          style={{
            ['--accent' as string]: data.accentColor,
          }}
          className={`w-full max-w-[800px] min-h-[1050px] bg-white text-slate-900 shadow-2xl p-8 sm:p-12 rounded-sm border border-slate-200 transition-all ${fontClass}`}
        >
          {/* ================= TEMPLATE: MODERN ================= */}
          {data.template === 'modern' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="border-b-2 pb-4" style={{ borderColor: data.accentColor }}>
                <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: data.accentColor }}>
                  {data.personal.fullName || 'Your Name'}
                </h1>
                <p className="text-base font-semibold text-slate-700 mt-1">
                  {data.personal.jobTitle || 'Your Job Title'}
                </p>

                {/* Contact row */}
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600 mt-2">
                  {data.personal.email && <span>{data.personal.email}</span>}
                  {data.personal.phone && <span>• {data.personal.phone}</span>}
                  {data.personal.location && <span>• {data.personal.location}</span>}
                  {data.personal.linkedin && <span>• {data.personal.linkedin}</span>}
                  {data.personal.website && <span>• {data.personal.website}</span>}
                </div>
              </div>

              {/* Summary */}
              {data.personal.summary && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: data.accentColor }}>
                    Professional Summary
                  </h2>
                  <p className="text-xs leading-relaxed text-slate-700">{data.personal.summary}</p>
                </div>
              )}

              {/* Experience */}
              {data.experience.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: data.accentColor }}>
                    Work Experience
                  </h2>
                  <div className="space-y-4">
                    {data.experience.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-900">{exp.role}</span>
                          <span className="text-slate-500 font-normal">
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-slate-600">
                          {exp.company} • {exp.location}
                        </div>
                        <ul className="list-disc list-outside ml-4 text-xs text-slate-700 space-y-1 pt-1">
                          {exp.bullets.map((b, idx) => b && <li key={idx}>{b}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {data.education.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: data.accentColor }}>
                    Education
                  </h2>
                  <div className="space-y-2">
                    {data.education.map((edu) => (
                      <div key={edu.id} className="text-xs">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>
                            {edu.degree} in {edu.fieldOfStudy}
                          </span>
                          <span className="text-slate-500 font-normal">{edu.endDate}</span>
                        </div>
                        <p className="text-slate-600">{edu.institution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {data.skills.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: data.accentColor }}>
                    Skills & Competencies
                  </h2>
                  <div className="space-y-1.5 text-xs">
                    {data.skills.map((grp, idx) => (
                      <div key={idx} className="flex items-baseline gap-2">
                        <span className="font-bold text-slate-800 shrink-0">{grp.category}:</span>
                        <span className="text-slate-700">{grp.items.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TEMPLATE: MINIMAL ================= */}
          {data.template === 'minimal' && (
            <div className="space-y-6 text-slate-900">
              <div className="text-center space-y-1 border-b pb-4 border-slate-300">
                <h1 className="text-3xl font-light tracking-wide uppercase">{data.personal.fullName || 'Your Name'}</h1>
                <p className="text-xs font-medium uppercase tracking-widest text-slate-600">{data.personal.jobTitle}</p>
                <p className="text-xs text-slate-500 pt-1">
                  {[data.personal.email, data.personal.phone, data.personal.location, data.personal.linkedin]
                    .filter(Boolean)
                    .join(' | ')}
                </p>
              </div>

              {data.personal.summary && (
                <div className="space-y-1">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Summary</h2>
                  <p className="text-xs leading-relaxed text-slate-700">{data.personal.summary}</p>
                </div>
              )}

              {data.experience.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Experience</h2>
                  {data.experience.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>
                          {exp.role}, {exp.company}
                        </span>
                        <span className="text-slate-500 font-normal">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <ul className="list-disc list-outside ml-4 text-xs text-slate-700 space-y-1">
                        {exp.bullets.map((b, idx) => b && <li key={idx}>{b}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {data.education.length > 0 && (
                <div className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Education</h2>
                  {data.education.map((edu) => (
                    <div key={edu.id} className="flex justify-between text-xs">
                      <span>
                        <strong className="font-semibold">{edu.institution}</strong> — {edu.degree} in {edu.fieldOfStudy}
                      </span>
                      <span className="text-slate-500">{edu.endDate}</span>
                    </div>
                  ))}
                </div>
              )}

              {data.skills.length > 0 && (
                <div className="space-y-1">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Skills</h2>
                  <div className="text-xs space-y-1">
                    {data.skills.map((grp, idx) => (
                      <div key={idx}>
                        <strong className="font-medium text-slate-800">{grp.category}: </strong>
                        <span className="text-slate-600">{grp.items.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TEMPLATE: TECH ================= */}
          {data.template === 'tech' && (
            <div className="space-y-5">
              <div className="p-4 rounded-lg bg-slate-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h1 className="text-2xl font-bold font-mono text-emerald-400">
                    &gt; {data.personal.fullName || 'User_Name'}
                  </h1>
                  <p className="text-xs text-slate-300 font-mono mt-0.5">{data.personal.jobTitle}</p>
                </div>
                <div className="text-right text-[11px] font-mono text-slate-300 space-y-0.5">
                  <div>{data.personal.email}</div>
                  <div>{data.personal.location}</div>
                  <div className="text-emerald-400">{data.personal.linkedin}</div>
                </div>
              </div>

              {data.personal.summary && (
                <div className="p-3 bg-slate-50 border-l-4 border-emerald-500 text-xs text-slate-700 leading-relaxed">
                  {data.personal.summary}
                </div>
              )}

              {data.experience.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-700 border-b pb-1">
                    // Experience
                  </h2>
                  {data.experience.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-900">
                        <span>{exp.role} @ {exp.company}</span>
                        <span className="font-mono text-slate-500 font-normal">
                          [{exp.startDate} ~ {exp.endDate}]
                        </span>
                      </div>
                      <ul className="list-disc list-outside ml-4 text-xs text-slate-700 space-y-1">
                        {exp.bullets.map((b, idx) => b && <li key={idx}>{b}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {data.skills.length > 0 && (
                <div className="space-y-2">
                  <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-700 border-b pb-1">
                    // Tech Stack & Skills
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {data.skills.flatMap((grp) => grp.items).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-800 text-[11px] font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TEMPLATE: EXECUTIVE ================= */}
          {data.template === 'executive' && (
            <div className="space-y-6">
              <div className="text-center space-y-1 border-b-2 pb-4" style={{ borderColor: data.accentColor }}>
                <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
                  {data.personal.fullName || 'Your Name'}
                </h1>
                <p className="text-sm font-semibold tracking-wide uppercase" style={{ color: data.accentColor }}>
                  {data.personal.jobTitle}
                </p>
                <p className="text-xs text-slate-600 pt-1">
                  {[data.personal.location, data.personal.phone, data.personal.email, data.personal.linkedin]
                    .filter(Boolean)
                    .join(' • ')}
                </p>
              </div>

              {data.personal.summary && (
                <div>
                  <h2 className="text-xs font-serif font-bold uppercase tracking-wider mb-1" style={{ color: data.accentColor }}>
                    Executive Profile
                  </h2>
                  <p className="text-xs leading-relaxed text-slate-800">{data.personal.summary}</p>
                </div>
              )}

              {data.experience.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xs font-serif font-bold uppercase tracking-wider mb-2" style={{ color: data.accentColor }}>
                    Leadership & Career History
                  </h2>
                  {data.experience.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-900">
                        <span>{exp.role}</span>
                        <span className="font-normal text-slate-600">
                          {exp.startDate} – {exp.endDate}
                        </span>
                      </div>
                      <div className="text-xs italic text-slate-700">
                        {exp.company} — {exp.location}
                      </div>
                      <ul className="list-disc list-outside ml-4 text-xs text-slate-800 space-y-1 pt-1">
                        {exp.bullets.map((b, idx) => b && <li key={idx}>{b}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {data.education.length > 0 && (
                <div>
                  <h2 className="text-xs font-serif font-bold uppercase tracking-wider mb-2" style={{ color: data.accentColor }}>
                    Education & Credentials
                  </h2>
                  {data.education.map((edu) => (
                    <div key={edu.id} className="flex justify-between text-xs">
                      <span>
                        <strong>{edu.institution}</strong>, {edu.degree} in {edu.fieldOfStudy}
                      </span>
                      <span className="text-slate-600">{edu.endDate}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
