'use client';

import { ScanResult, ResumeData, User } from './types';
import { SAMPLE_RESUMES } from './sample-data';

const USER_KEY = 'ai_saas_user';
const SCANS_KEY = 'ai_saas_scans';
const RESUMES_KEY = 'ai_saas_resumes';

export const DEFAULT_USER: User = {
  id: 'usr_demo_101',
  name: 'Demo Candidate',
  email: 'candidate@example.com',
  plan: 'free',
  scansLeft: 3,
  unlimitedScans: false,
  createdAt: new Date().toISOString(),
};

export function getUser(): User {
  if (typeof window === 'undefined') return DEFAULT_USER;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) {
      localStorage.setItem(USER_KEY, JSON.stringify(DEFAULT_USER));
      return DEFAULT_USER;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_USER;
  }
}

export function saveUser(user: User): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event('saas_user_updated'));
  } catch (e) {
    console.error('Failed to save user:', e);
  }
}

export function decrementScanCredit(): boolean {
  const user = getUser();
  if (user.unlimitedScans || user.plan !== 'free') return true;
  if (user.scansLeft <= 0) return false;

  user.scansLeft -= 1;
  saveUser(user);
  return true;
}

export function upgradeUserToPro(plan: 'pro_monthly' | 'pro_annual' = 'pro_monthly'): void {
  const user = getUser();
  user.plan = plan;
  user.unlimitedScans = true;
  saveUser(user);
}

export function getSavedScans(): ScanResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SCANS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveScanResult(scan: ScanResult): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getSavedScans();
    const updated = [scan, ...current.filter(s => s.id !== scan.id)].slice(0, 30);
    localStorage.setItem(SCANS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('saas_scans_updated'));
  } catch (e) {
    console.error('Failed to save scan:', e);
  }
}

export function getSavedResumes(): ResumeData[] {
  if (typeof window === 'undefined') return [SAMPLE_RESUMES.software_engineer.data];
  try {
    const raw = localStorage.getItem(RESUMES_KEY);
    if (!raw) {
      const initial = [SAMPLE_RESUMES.software_engineer.data];
      localStorage.setItem(RESUMES_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [SAMPLE_RESUMES.software_engineer.data];
  }
}

export function saveResume(resume: ResumeData): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getSavedResumes();
    const updated = [resume, ...current.filter(r => r.id !== resume.id)];
    localStorage.setItem(RESUMES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('saas_resumes_updated'));
  } catch (e) {
    console.error('Failed to save resume:', e);
  }
}

export function deleteResume(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getSavedResumes();
    const updated = current.filter(r => r.id !== id);
    localStorage.setItem(RESUMES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('saas_resumes_updated'));
  } catch (e) {
    console.error('Failed to delete resume:', e);
  }
}
