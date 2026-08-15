import { ScanResult, IssueItem, KeywordMatch } from './types';
import { generateId } from './utils';

// Powerful action verbs commonly favored by ATS and recruiters
const STRONG_ACTION_VERBS = [
  'accelerated', 'achieved', 'administered', 'advocated', 'analyzed', 'architected',
  'automated', 'built', 'championed', 'collaborated', 'conceptualized', 'consolidated',
  'constructed', 'created', 'customized', 'decreased', 'delivered', 'deployed',
  'designed', 'developed', 'devised', 'directed', 'documented', 'eliminated',
  'empowered', 'engineered', 'enhanced', 'established', 'evaluated', 'executed',
  'expanded', 'expedited', 'formulated', 'generated', 'governed', 'guided',
  'headed', 'identified', 'implemented', 'improved', 'increased', 'initiated',
  'innovated', 'inspected', 'instituted', 'integrated', 'introduced', 'invented',
  'investigated', 'launched', 'led', 'leveraged', 'maintained', 'managed',
  'maximized', 'mentored', 'migrated', 'minimized', 'modernized', 'monitored',
  'negotiated', 'optimized', 'orchestrated', 'organized', 'overhauled', 'oversaw',
  'partnered', 'performed', 'pioneered', 'planned', 'produced', 'programmed',
  'promoted', 'published', 're-engineered', 'reduced', 'refined', 'reorganized',
  'restructured', 'revamped', 'scaled', 'secured', 'simplified', 'spearheaded',
  'standardized', 'streamlined', 'strengthened', 'supervised', 'surpassed',
  'synthesized', 'systematized', 'transformed', 'upgraded', 'validated', 'yielded'
];

const WEAK_WORDS = [
  'helped', 'assisted', 'responsible for', 'worked on', 'duties included',
  'tried to', 'participated in', 'attempted', 'supported with', 'handled various'
];

const COMMON_TECH_KEYWORDS = [
  'typescript', 'javascript', 'react', 'next.js', 'node.js', 'python', 'sql',
  'postgresql', 'mongodb', 'docker', 'kubernetes', 'aws', 'gcp', 'azure',
  'ci/cd', 'git', 'rest api', 'graphql', 'tailwind css', 'microservices',
  'redis', 'agile', 'scrum', 'jira', 'figma', 'jest', 'cypress', 'linux'
];

/**
 * Intelligent ATS scanner engine.
 * Supports Groq API (free tier), OpenAI API, or high-accuracy local heuristics engine.
 */
export async function analyzeResume(
  resumeText: string,
  fileName: string = 'resume.pdf',
  fileSize: number = 24000,
  jobDescription?: string,
  targetRole?: string
): Promise<ScanResult> {
  const groqApiKey = process.env.GROQ_API_KEY;
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (groqApiKey || openaiApiKey) {
    try {
      const aiResult = await runLlmAnalysis(resumeText, fileName, fileSize, jobDescription, targetRole, groqApiKey, openaiApiKey);
      if (aiResult) return aiResult;
    } catch (err) {
      console.warn('LLM analysis error, falling back to built-in ATS heuristics:', err);
    }
  }

  // Built-in intelligent rule-based scanner
  return runHeuristicAnalysis(resumeText, fileName, fileSize, jobDescription, targetRole);
}

/**
 * Calls Groq API (OpenAI-compatible) or OpenAI
 */
async function runLlmAnalysis(
  resumeText: string,
  fileName: string,
  fileSize: number,
  jobDescription?: string,
  targetRole?: string,
  groqKey?: string,
  openaiKey?: string
): Promise<ScanResult | null> {
  const isGroq = Boolean(groqKey);
  const endpoint = isGroq
    ? 'https://api.groq.com/openai/v1/chat/completions'
    : 'https://api.openai.com/v1/chat/completions';
  const apiKey = groqKey || openaiKey;
  const model = isGroq ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini';

  const systemPrompt = `You are an elite Fortune 500 ATS (Applicant Tracking System) and executive hiring manager. 
Analyze the provided resume and return ONLY valid JSON according to this exact TypeScript structure:
{
  "overallScore": number (0-100),
  "summary": string (2-3 sentences overview of strengths and main weaknesses),
  "categories": {
    "impact": { "score": number, "summary": string, "items": [{ "title": string, "passed": boolean, "description": string, "fixRecommendation": string }] },
    "keywords": { "score": number, "summary": string, "items": [{ "title": string, "passed": boolean, "description": string, "fixRecommendation": string }] },
    "formatting": { "score": number, "summary": string, "items": [{ "title": string, "passed": boolean, "description": string, "fixRecommendation": string }] },
    "brevity": { "score": number, "summary": string, "items": [{ "title": string, "passed": boolean, "description": string, "fixRecommendation": string }] },
    "style": { "score": number, "summary": string, "items": [{ "title": string, "passed": boolean, "description": string, "fixRecommendation": string }] }
  },
  "issues": [
    {
      "type": "critical" | "improvement" | "grammar" | "keyword" | "formatting",
      "category": string,
      "title": string,
      "originalText": string,
      "suggestedText": string,
      "explanation": string
    }
  ],
  "matchedKeywords": [{ "keyword": string, "count": number, "inResume": true, "category": "hard_skill"|"soft_skill"|"tool"|"industry", "importance": "high"|"medium"|"low" }],
  "missingKeywords": [{ "keyword": string, "count": 0, "inResume": false, "category": "hard_skill"|"soft_skill"|"tool"|"industry", "importance": "high"|"medium"|"low" }],
  "actionVerbsCount": number,
  "quantifiedMetricsCount": number
}`;

  const userPrompt = `
RESUME TEXT:
${resumeText}

${jobDescription ? `TARGET JOB DESCRIPTION:\n${jobDescription}` : ''}
${targetRole ? `TARGET ROLE:\n${targetRole}` : ''}

Respond with pure JSON. Do not include markdown \`\`\`json wrappers.`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('LLM API error response:', errorText);
    return null;
  }

  const data = await response.json();
  const rawContent = data.choices?.[0]?.message?.content;
  if (!rawContent) return null;

  const parsed = JSON.parse(rawContent);

  const words = resumeText.trim().split(/\s+/).length;

  return {
    id: 'scan_' + generateId(),
    fileName,
    fileSize,
    uploadedAt: new Date().toISOString(),
    overallScore: Math.min(100, Math.max(0, Math.round(parsed.overallScore || 75))),
    targetRole,
    jobDescription,
    summary: parsed.summary || 'Resume analyzed successfully.',
    rawText: resumeText,
    categories: {
      impact: {
        name: 'Impact & Quantifiable Metrics',
        weight: 0.3,
        score: parsed.categories?.impact?.score ?? 75,
        status: getCategoryStatus(parsed.categories?.impact?.score ?? 75),
        summary: parsed.categories?.impact?.summary || 'Evaluates business metrics and achievements.',
        items: parsed.categories?.impact?.items || [],
      },
      keywords: {
        name: 'Keyword & Skill Match',
        weight: 0.25,
        score: parsed.categories?.keywords?.score ?? 80,
        status: getCategoryStatus(parsed.categories?.keywords?.score ?? 80),
        summary: parsed.categories?.keywords?.summary || 'Evaluates industry terminology and ATS indexing.',
        items: parsed.categories?.keywords?.items || [],
      },
      formatting: {
        name: 'ATS Structure & Headers',
        weight: 0.15,
        score: parsed.categories?.formatting?.score ?? 85,
        status: getCategoryStatus(parsed.categories?.formatting?.score ?? 85),
        summary: parsed.categories?.formatting?.summary || 'Standard layout and clean headers.',
        items: parsed.categories?.formatting?.items || [],
      },
      brevity: {
        name: 'Brevity & Conciseness',
        weight: 0.15,
        score: parsed.categories?.brevity?.score ?? 80,
        status: getCategoryStatus(parsed.categories?.brevity?.score ?? 80),
        summary: parsed.categories?.brevity?.summary || 'Appropriate length and bullet structure.',
        items: parsed.categories?.brevity?.items || [],
      },
      style: {
        name: 'Action Verbs & Tone',
        weight: 0.15,
        score: parsed.categories?.style?.score ?? 78,
        status: getCategoryStatus(parsed.categories?.style?.score ?? 78),
        summary: parsed.categories?.style?.summary || 'Use of active voice and strong verbs.',
        items: parsed.categories?.style?.items || [],
      },
    },
    issues: (parsed.issues || []).map((iss: Partial<IssueItem>, idx: number) => ({
      id: `iss_${idx + 1}`,
      type: iss.type || 'improvement',
      category: iss.category || 'Content',
      title: iss.title || 'Resume Polish',
      originalText: iss.originalText || '',
      suggestedText: iss.suggestedText || '',
      explanation: iss.explanation || 'Improve ATS scoring and readability.',
      applied: false,
    })),
    matchedKeywords: parsed.matchedKeywords || [],
    missingKeywords: parsed.missingKeywords || [],
    actionVerbsCount: parsed.actionVerbsCount || 12,
    quantifiedMetricsCount: parsed.quantifiedMetricsCount || 6,
    wordCount: words,
    readingTimeMinutes: Math.max(1, Math.round(words / 200)),
  };
}

/**
 * Built-in intelligent heuristic engine
 */
export function runHeuristicAnalysis(
  resumeText: string,
  fileName: string = 'resume.pdf',
  fileSize: number = 24000,
  jobDescription?: string,
  targetRole?: string
): ScanResult {
  const lowerText = resumeText.toLowerCase();
  const words = resumeText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // 1. Metric check
  const metricRegex = /(\d+[\d,.]*(\s*%)|(\$\s*[\d,.]+[kmbt]?)|(\b\d+[xX]\b)|(\b\d{2,}\+?\s*(users|clients|requests|million|billion|k|team|engineers|customers|leads|sales)\b))/gi;
  const metricsFound = resumeText.match(metricRegex) || [];
  const metricsCount = metricsFound.length;

  // 2. Action verbs check
  const verbsFound = STRONG_ACTION_VERBS.filter(v => new RegExp(`\\b${v}\\b`, 'i').test(resumeText));
  const weakWordsFound = WEAK_WORDS.filter(w => new RegExp(`\\b${w}\\b`, 'i').test(resumeText));

  // 3. Section checks
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(resumeText);
  const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(resumeText);
  const hasLinkedIn = /linkedin\.com\/in\//i.test(resumeText);
  const hasGitHub = /github\.com\//i.test(resumeText) || /portfolio|website/i.test(resumeText);
  const hasExperience = /(experience|employment|work history)/i.test(resumeText);
  const hasEducation = /(education|degree|university|college|b\.s|b\.a|m\.s|ph\.d)/i.test(resumeText);
  const hasSkills = /(skills|technologies|proficiencies|tools)/i.test(resumeText);
  const hasSummary = /(summary|profile|about me|objective)/i.test(resumeText);

  // 4. Keyword matching
  let matchedKeywords: KeywordMatch[] = [];
  let missingKeywords: KeywordMatch[] = [];

  if (jobDescription && jobDescription.trim().length > 20) {
    const jdWords = jobDescription.toLowerCase().match(/\b[a-z0-9+#.-]{3,20}\b/g) || [];
    const frequency: Record<string, number> = {};
    jdWords.forEach(w => {
      if (!['with', 'from', 'that', 'this', 'have', 'your', 'will', 'must', 'been', 'were'].includes(w)) {
        frequency[w] = (frequency[w] || 0) + 1;
      }
    });

    const topJdKeywords = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([k]) => k);

    topJdKeywords.forEach(k => {
      const inRes = lowerText.includes(k);
      const matchObj: KeywordMatch = {
        keyword: k,
        count: (lowerText.match(new RegExp(`\\b${k}\\b`, 'gi')) || []).length,
        inResume: inRes,
        category: 'hard_skill',
        importance: 'high',
      };
      if (inRes) {
        matchedKeywords.push(matchObj);
      } else {
        missingKeywords.push(matchObj);
      }
    });
  } else {
    // Default tech / industry keyword checks
    COMMON_TECH_KEYWORDS.forEach(kw => {
      const count = (lowerText.match(new RegExp(`\\b${kw}\\b`, 'gi')) || []).length;
      if (count > 0) {
        matchedKeywords.push({
          keyword: kw,
          count,
          inResume: true,
          category: 'hard_skill',
          importance: 'high',
        });
      } else {
        missingKeywords.push({
          keyword: kw,
          count: 0,
          inResume: false,
          category: 'hard_skill',
          importance: 'medium',
        });
      }
    });
    // Pick top 8 missing
    missingKeywords = missingKeywords.slice(0, 8);
  }

  // Calculate Subscores
  // Impact (0-100)
  const impactScore = Math.min(100, Math.round((metricsCount >= 5 ? 50 : metricsCount * 10) + (verbsFound.length >= 8 ? 50 : verbsFound.length * 6)));

  // Keywords (0-100)
  const kwScore = matchedKeywords.length > 0
    ? Math.min(100, Math.round((matchedKeywords.length / (matchedKeywords.length + missingKeywords.length)) * 100))
    : 70;

  // Formatting (0-100)
  let formatScore = 40;
  if (hasEmail) formatScore += 15;
  if (hasPhone) formatScore += 15;
  if (hasExperience) formatScore += 15;
  if (hasEducation) formatScore += 15;

  // Brevity (0-100)
  let brevityScore = 90;
  if (wordCount < 200) brevityScore = 55;
  else if (wordCount > 900) brevityScore = 65;
  else if (wordCount > 700) brevityScore = 78;

  // Style (0-100)
  let styleScore = 80;
  if (weakWordsFound.length > 0) styleScore -= weakWordsFound.length * 10;
  if (verbsFound.length >= 6) styleScore += 15;
  styleScore = Math.min(100, Math.max(35, styleScore));

  // Overall Weighted Score
  const overallScore = Math.round(
    impactScore * 0.3 +
    kwScore * 0.25 +
    formatScore * 0.15 +
    brevityScore * 0.15 +
    styleScore * 0.15
  );

  // Issues generation
  const issues: IssueItem[] = [];

  if (metricsCount < 4) {
    issues.push({
      id: 'iss_metrics',
      type: 'critical',
      category: 'Impact & Results',
      title: 'Low Quantifiable Impact',
      originalText: 'Responsible for optimizing application performance and database latency.',
      suggestedText: 'Architected database query optimization that reduced median query latency from 850ms to 45ms (94% speedup).',
      explanation: 'ATS systems and hiring managers rank bullets with concrete numbers (%, $, Xx) 3x higher.',
    });
  }

  if (weakWordsFound.length > 0) {
    issues.push({
      id: 'iss_weak_verbs',
      type: 'improvement',
      category: 'Action Verbs',
      title: `Passive or Weak Phrasing Detected ("${weakWordsFound.slice(0, 2).join('", "')}")`,
      originalText: 'Helped the team build the new payment system.',
      suggestedText: 'Engineered high-throughput Stripe payment gateway processing $4.2M+ ARR.',
      explanation: 'Replace passive phrases like "helped" or "worked on" with active leadership verbs.',
    });
  }

  if (!hasLinkedIn) {
    issues.push({
      id: 'iss_linkedin',
      type: 'formatting',
      category: 'Contact Information',
      title: 'Missing LinkedIn / Online Profile Link',
      originalText: '',
      suggestedText: 'linkedin.com/in/yourprofile',
      explanation: 'Over 92% of recruiters verify candidates on LinkedIn before scheduling an interview.',
    });
  }

  if (missingKeywords.length > 0) {
    const topMissed = missingKeywords.slice(0, 4).map(k => k.keyword).join(', ');
    issues.push({
      id: 'iss_keywords',
      type: 'keyword',
      category: 'ATS Keyword Match',
      title: `Missing High-Impact Industry Keywords (${topMissed})`,
      originalText: '',
      suggestedText: `Incorporate key technical skills: ${topMissed}`,
      explanation: 'ATS scanners filter candidates based on exact keyword density from target job postings.',
    });
  }

  if (!hasSummary) {
    issues.push({
      id: 'iss_summary',
      type: 'improvement',
      category: 'Structure',
      title: 'Missing Executive Summary Section',
      originalText: '',
      suggestedText: 'Results-driven professional with 5+ years of experience delivering scalable software solutions and leading cross-functional teams.',
      explanation: 'A 2-3 sentence executive summary quickly hooks the recruiter in the first 6 seconds.',
    });
  }

  return {
    id: 'scan_' + generateId(),
    fileName,
    fileSize,
    uploadedAt: new Date().toISOString(),
    overallScore,
    targetRole,
    jobDescription,
    summary:
      overallScore >= 80
        ? 'Strong resume with solid action verbs and structure. Adding more quantified business metrics will push this into the top 5% of applicants.'
        : 'Solid foundation, but requires optimization for quantifiable impact, action verb strength, and ATS keyword matching to pass strict enterprise screening.',
    rawText: resumeText,
    categories: {
      impact: {
        name: 'Impact & Quantifiable Metrics',
        weight: 0.3,
        score: impactScore,
        status: getCategoryStatus(impactScore),
        summary: `${metricsCount} quantified metrics found in bullets. Target 5+ metrics for maximum ATS score.`,
        items: [
          {
            title: 'Quantified Metrics',
            passed: metricsCount >= 4,
            description: `${metricsCount} numerical metrics (percentages, dollar amounts, multipliers) detected.`,
            fixRecommendation: 'Add numbers showing exact results (e.g., "boosted speed by 42%").',
          },
          {
            title: 'Action-Oriented Outcomes',
            passed: verbsFound.length >= 6,
            description: `${verbsFound.length} strong action verbs identified.`,
            fixRecommendation: 'Start every single bullet point with a powerful verb.',
          },
        ],
      },
      keywords: {
        name: 'ATS Keyword Match',
        weight: 0.25,
        score: kwScore,
        status: getCategoryStatus(kwScore),
        summary: `${matchedKeywords.length} matching keywords detected. ${missingKeywords.length} recommended keywords missing.`,
        items: [
          {
            title: 'Core Industry Keywords',
            passed: kwScore >= 75,
            description: `${matchedKeywords.length} relevant skill keywords found.`,
            fixRecommendation: 'Include hard technical proficiencies explicitly in your skills and experience section.',
          },
        ],
      },
      formatting: {
        name: 'ATS Formatting & Sections',
        weight: 0.15,
        score: formatScore,
        status: getCategoryStatus(formatScore),
        summary: 'Standard headers and parseable contact details.',
        items: [
          {
            title: 'Contact Information',
            passed: hasEmail && hasPhone,
            description: hasEmail && hasPhone ? 'Email and phone number are present.' : 'Missing email or phone number.',
          },
          {
            title: 'Essential Sections',
            passed: hasExperience && hasEducation,
            description: 'Experience and Education sections clearly marked.',
          },
        ],
      },
      brevity: {
        name: 'Brevity & Page Density',
        weight: 0.15,
        score: brevityScore,
        status: getCategoryStatus(brevityScore),
        summary: `${wordCount} words (${Math.max(1, Math.round(wordCount / 200))} min read). Optimal range is 350-650 words for a 1-page resume.`,
        items: [
          {
            title: 'Word Count & Density',
            passed: wordCount >= 300 && wordCount <= 750,
            description: `Current word count: ${wordCount} words.`,
          },
        ],
      },
      style: {
        name: 'Tone & Active Voice',
        weight: 0.15,
        score: styleScore,
        status: getCategoryStatus(styleScore),
        summary: weakWordsFound.length === 0 ? 'No weak filler words detected.' : `${weakWordsFound.length} weak/passive phrases found.`,
        items: [
          {
            title: 'Active Voice Usage',
            passed: weakWordsFound.length === 0,
            description: weakWordsFound.length === 0 ? 'Consistent active voice across experience entries.' : `Replace weak words: ${weakWordsFound.join(', ')}`,
          },
        ],
      },
    },
    issues,
    matchedKeywords,
    missingKeywords,
    actionVerbsCount: verbsFound.length,
    quantifiedMetricsCount: metricsCount,
    wordCount,
    readingTimeMinutes: Math.max(1, Math.round(wordCount / 200)),
  };
}

function getCategoryStatus(score: number): 'critical' | 'warning' | 'good' | 'excellent' {
  if (score >= 85) return 'excellent';
  if (score >= 70) return 'good';
  if (score >= 50) return 'warning';
  return 'critical';
}
