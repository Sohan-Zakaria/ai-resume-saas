import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function getScoreColor(score: number): {
  color: string;
  bg: string;
  border: string;
  text: string;
  label: string;
} {
  if (score >= 85) {
    return {
      color: '#10b981',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-500',
      label: 'Excellent',
    };
  }
  if (score >= 70) {
    return {
      color: '#0ea5e9',
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/30',
      text: 'text-sky-500',
      label: 'Good',
    };
  }
  if (score >= 50) {
    return {
      color: '#f59e0b',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-500',
      label: 'Needs Work',
    };
  }
  return {
    color: '#ef4444',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    text: 'text-rose-500',
    label: 'Critical ATS Issues',
  };
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}
