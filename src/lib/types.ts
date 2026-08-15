export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro_monthly' | 'pro_annual';
  scansLeft: number;
  unlimitedScans: boolean;
  avatarUrl?: string;
  createdAt: string;
}

export interface ATSCategoryScore {
  name: string;
  score: number; // 0 - 100
  weight: number;
  status: 'critical' | 'warning' | 'good' | 'excellent';
  summary: string;
  items: {
    title: string;
    passed: boolean;
    description: string;
    fixRecommendation?: string;
  }[];
}

export interface IssueItem {
  id: string;
  type: 'critical' | 'improvement' | 'grammar' | 'keyword' | 'formatting';
  category: string;
  title: string;
  originalText?: string;
  suggestedText?: string;
  explanation: string;
  applied?: boolean;
}

export interface KeywordMatch {
  keyword: string;
  count: number;
  inResume: boolean;
  category: 'hard_skill' | 'soft_skill' | 'tool' | 'industry' | 'certification';
  importance: 'high' | 'medium' | 'low';
}

export interface ScanResult {
  id: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  overallScore: number;
  targetRole?: string;
  jobDescription?: string;
  summary: string;
  rawText: string;
  categories: {
    impact: ATSCategoryScore;
    keywords: ATSCategoryScore;
    formatting: ATSCategoryScore;
    brevity: ATSCategoryScore;
    style: ATSCategoryScore;
  };
  issues: IssueItem[];
  matchedKeywords: KeywordMatch[];
  missingKeywords: KeywordMatch[];
  actionVerbsCount: number;
  quantifiedMetricsCount: number;
  wordCount: number;
  readingTimeMinutes: number;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  link?: string;
  technologies: string[];
  bullets: string[];
}

export interface ResumeData {
  id: string;
  title: string;
  lastModified: string;
  template: 'modern' | 'minimal' | 'tech' | 'executive';
  accentColor: string;
  fontFamily: 'sans' | 'serif' | 'mono';
  personal: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    github?: string;
    summary: string;
  };
  experience: WorkExperience[];
  education: Education[];
  skills: {
    category: string;
    items: string[];
  }[];
  projects: ProjectItem[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    date: string;
    link?: string;
  }[];
}

export interface PricingPlan {
  id: 'free' | 'pro_monthly' | 'pro_annual';
  name: string;
  badge?: string;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  priceIdTest?: string;
}
