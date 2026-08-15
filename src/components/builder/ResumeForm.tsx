'use client';

import React, { useState } from 'react';
import {
  ResumeData,
  WorkExperience,
  Education,
  ProjectItem,
} from '@/lib/types';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Plus,
  Trash2,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { generateId } from '@/lib/utils';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (updated: ResumeData) => void;
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [activeSection, setActiveSection] = useState<
    'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications'
  >('personal');

  const [aiLoadingId, setAiLoadingId] = useState<string | null>(null);

  // Update personal fields
  const handlePersonalChange = (field: keyof ResumeData['personal'], value: string) => {
    onChange({
      ...data,
      personal: {
        ...data.personal,
        [field]: value,
      },
    });
  };

  // Add Work Experience
  const addExperience = () => {
    const newExp: WorkExperience = {
      id: 'exp_' + generateId(),
      company: 'Company Name',
      role: 'Job Title',
      location: 'City, State',
      startDate: '2023-01',
      endDate: 'Present',
      current: true,
      bullets: ['Spearheaded key initiatives delivering measurable results.'],
    };
    onChange({
      ...data,
      experience: [newExp, ...data.experience],
    });
  };

  // Update Experience
  const updateExperience = (id: string, updated: Partial<WorkExperience>) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) => (exp.id === id ? { ...exp, ...updated } : exp)),
    });
  };

  // Remove Experience
  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    });
  };

  // Bullet point AI improvement
  const handleImproveBullet = async (expId: string, bulletIndex: number, currentText: string, role: string) => {
    const loadingKey = `${expId}_${bulletIndex}`;
    setAiLoadingId(loadingKey);
    try {
      const res = await fetch('/api/improve-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalBullet: currentText, role }),
      });
      if (res.ok) {
        const { improvedBullet } = await res.json();
        const exp = data.experience.find((e) => e.id === expId);
        if (exp) {
          const newBullets = [...exp.bullets];
          newBullets[bulletIndex] = improvedBullet;
          updateExperience(expId, { bullets: newBullets });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoadingId(null);
    }
  };

  // Add bullet
  const addBullet = (expId: string) => {
    const exp = data.experience.find((e) => e.id === expId);
    if (exp) {
      updateExperience(expId, { bullets: [...exp.bullets, ''] });
    }
  };

  // Remove bullet
  const removeBullet = (expId: string, bulletIndex: number) => {
    const exp = data.experience.find((e) => e.id === expId);
    if (exp) {
      updateExperience(expId, {
        bullets: exp.bullets.filter((_, idx) => idx !== bulletIndex),
      });
    }
  };

  // Add Education
  const addEducation = () => {
    const newEdu: Education = {
      id: 'edu_' + generateId(),
      institution: 'University Name',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Major Field',
      location: 'City, State',
      startDate: '2019-09',
      endDate: '2023-05',
    };
    onChange({
      ...data,
      education: [...data.education, newEdu],
    });
  };

  // Update Education
  const updateEducation = (id: string, updated: Partial<Education>) => {
    onChange({
      ...data,
      education: data.education.map((edu) => (edu.id === id ? { ...edu, ...updated } : edu)),
    });
  };

  // Remove Education
  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  // Skills
  const addSkillCategory = () => {
    onChange({
      ...data,
      skills: [...data.skills, { category: 'New Skill Category', items: ['Skill 1', 'Skill 2'] }],
    });
  };

  const updateSkillCategory = (idx: number, category: string, itemsStr: string) => {
    const items = itemsStr.split(',').map((s) => s.trim()).filter(Boolean);
    const newSkills = [...data.skills];
    newSkills[idx] = { category, items };
    onChange({ ...data, skills: newSkills });
  };

  const removeSkillCategory = (idx: number) => {
    onChange({
      ...data,
      skills: data.skills.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
      {/* Section Navigation Header */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 overflow-x-auto scrollbar-none">
        {[
          { id: 'personal', label: 'Personal', icon: User },
          { id: 'experience', label: 'Experience', icon: Briefcase },
          { id: 'education', label: 'Education', icon: GraduationCap },
          { id: 'skills', label: 'Skills', icon: Wrench },
          { id: 'projects', label: 'Projects', icon: FolderGit2 },
          { id: 'certifications', label: 'Certs', icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as typeof activeSection)}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
                isActive
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Section Body */}
      <div className="p-5 sm:p-6 space-y-6 max-h-[720px] overflow-y-auto">
        {/* 1. PERSONAL INFORMATION */}
        {activeSection === 'personal' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Contact & Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={data.personal.fullName}
                  onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Target Job Title</label>
                <input
                  type="text"
                  value={data.personal.jobTitle}
                  onChange={(e) => handlePersonalChange('jobTitle', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  value={data.personal.email}
                  onChange={(e) => handlePersonalChange('email', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                <input
                  type="text"
                  value={data.personal.phone}
                  onChange={(e) => handlePersonalChange('phone', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  value={data.personal.location}
                  onChange={(e) => handlePersonalChange('location', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={data.personal.linkedin || ''}
                  onChange={(e) => handlePersonalChange('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/username"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Portfolio / GitHub</label>
                <input
                  type="text"
                  value={data.personal.website || data.personal.github || ''}
                  onChange={(e) => handlePersonalChange('website', e.target.value)}
                  placeholder="https://yourportfolio.com"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Executive Professional Summary
              </label>
              <textarea
                rows={4}
                value={data.personal.summary}
                onChange={(e) => handlePersonalChange('summary', e.target.value)}
                placeholder="2-3 powerful sentences summarizing your core skills, years of experience, and quantifiable achievements."
                className="w-full p-3 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* 2. WORK EXPERIENCE */}
        {activeSection === 'experience' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Work Experience</h3>
              <button
                type="button"
                onClick={addExperience}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Position
              </button>
            </div>

            {data.experience.map((exp, idx) => (
              <div
                key={exp.id}
                className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">Position #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeExperience(exp.id)}
                    className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Role / Title</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                      placeholder="e.g. 2022-03 or Mar 2022"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">End Date</label>
                    <input
                      type="text"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                      placeholder="e.g. Present or 2024-01"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Bullets */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Key Accomplishments & Bullets
                    </label>
                    <button
                      type="button"
                      onClick={() => addBullet(exp.id)}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
                    >
                      <Plus className="w-3 h-3" /> Add Bullet
                    </button>
                  </div>

                  {exp.bullets.map((bullet, bIdx) => {
                    const isEnhancing = aiLoadingId === `${exp.id}_${bIdx}`;
                    return (
                      <div key={bIdx} className="flex items-start gap-2">
                        <textarea
                          rows={2}
                          value={bullet}
                          onChange={(e) => {
                            const newBullets = [...exp.bullets];
                            newBullets[bIdx] = e.target.value;
                            updateExperience(exp.id, { bullets: newBullets });
                          }}
                          className="flex-1 p-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                        />
                        <div className="flex flex-col gap-1">
                          <button
                            type="button"
                            title="Rewrite with AI"
                            disabled={isEnhancing || !bullet}
                            onClick={() => handleImproveBullet(exp.id, bIdx, bullet, exp.role)}
                            className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
                          >
                            {isEnhancing ? (
                              <span className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin inline-block"></span>
                            ) : (
                              <Sparkles className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeBullet(exp.id, bIdx)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. EDUCATION */}
        {activeSection === 'education' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Education</h3>
              <button
                type="button"
                onClick={addEducation}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> Add Degree
              </button>
            </div>

            {data.education.map((edu) => (
              <div
                key={edu.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{edu.institution}</span>
                  <button
                    type="button"
                    onClick={() => removeEducation(edu.id)}
                    className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 p-1 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Field of Study</label>
                    <input
                      type="text"
                      value={edu.fieldOfStudy}
                      onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Graduation Year</label>
                    <input
                      type="text"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. SKILLS */}
        {activeSection === 'skills' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Skills & Proficiencies</h3>
              <button
                type="button"
                onClick={addSkillCategory}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> Add Category
              </button>
            </div>

            {data.skills.map((skillGroup, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={skillGroup.category}
                    onChange={(e) => updateSkillCategory(idx, e.target.value, skillGroup.items.join(', '))}
                    className="px-2 py-1 text-xs font-bold rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => removeSkillCategory(idx)}
                    className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 p-1 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    Skills (Comma separated list)
                  </label>
                  <input
                    type="text"
                    value={skillGroup.items.join(', ')}
                    onChange={(e) => updateSkillCategory(idx, skillGroup.category, e.target.value)}
                    placeholder="e.g. React, TypeScript, Next.js, Node.js, AWS"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. PROJECTS & CERTS */}
        {(activeSection === 'projects' || activeSection === 'certifications') && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-center text-xs text-slate-500 space-y-2">
            <p>Customize additional projects and certifications seamlessly.</p>
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              All entered details are rendered in real-time on the right preview!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
