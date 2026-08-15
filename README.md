# 🚀 AI Resume Scanner & Builder SaaS

A full-stack, zero-cost AI Resume Scanner, ATS Optimizer, and live PDF Resume Builder SaaS built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Groq / OpenAI API**, and **Stripe Test Mode**.

![ResumeAI Preview](https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80)

---

## ✨ Features

- 🎯 **ATS Resume Scanner**: Drag-and-drop PDF, DOCX, or TXT resumes. Instant 0-100 ATS score calculation.
- ⚡ **AI Diagnostics & 1-Click Fixes**: Identifies weak verbs, missing numbers, and grammar issues with instant AI rewrites.
- 🎯 **Job Description Keyword Matcher**: Compare your resume against any target job post to uncover missing keywords.
- 📝 **Live Interactive Resume Builder**: Real-time split-screen editor with 4 templates (*Modern*, *Minimal*, *Tech*, *Executive*), custom colors, and 1-click vector PDF print/export.
- 🤖 **AI Bullet Point Enhancer**: Rewrites bullet points following the Google X-Y-Z formula.
- 💳 **Stripe Billing & Subscriptions**: Pricing plans (Free Starter, Pro Monthly $19/mo, Pro Annual $144/yr) with checkout sessions and webhook handling.
- 📊 **Candidate Dashboard**: Track scan history, review past ATS scores, and manage saved resumes.
- 🎨 **World-Class SaaS UI**: Polished hero, interactive score visualizers, responsive navigation, and dark/light mode.

---

## 🛠️ Zero-Cost Tech Stack

| Layer | Technology | Free Tier Details |
|---|---|---|
| **Framework** | Next.js 15 (App Router) + TypeScript | Unlimited |
| **Styling** | Tailwind CSS + Lucide Icons | Free |
| **AI Inference** | **Groq API** (Llama 3.3 70B / 3.1 8B) or OpenAI | Free tier with OpenAI-compatible endpoint |
| **Payments** | Stripe Test Mode | 100% Free for development & demos |
| **File Parsing** | `pdf-parse` & `mammoth` | Local Node.js parsing (Zero cost) |
| **Hosting** | Vercel Hobby Tier | 100GB bandwidth / mo |

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies
\`\`\`bash
git clone <your-repo-url>
cd ai-sass-boilerplate
npm install
\`\`\`

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
\`\`\`bash
cp .env.example .env.local
\`\`\`

*(Optional)* Add your free **Groq API Key** (`GROQ_API_KEY`) from [console.groq.com](https://console.groq.com) or **OpenAI Key**.  
*Note: If no API key is provided, the application automatically uses its built-in intelligent rule-based ATS engine so you can test all features right out of the box!*

### 3. Run Development Server
\`\`\`bash
npm run dev
\`\`\`
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

\`\`\`
ai-sass-boilerplate/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── scan/route.ts            # Resume parsing & ATS analysis
│   │   │   ├── improve-bullet/route.ts  # AI bullet point rewriter
│   │   │   ├── checkout/route.ts        # Stripe checkout session creator
│   │   │   └── webhook/stripe/route.ts  # Stripe webhook event listener
│   │   ├── scanner/page.tsx             # ATS Scanner & Diagnostic tool
│   │   ├── builder/page.tsx             # Live Split-screen Resume Builder
│   │   ├── pricing/page.tsx             # Pricing & Subscription Plans
│   │   ├── dashboard/page.tsx           # User Candidate Dashboard
│   │   ├── login/page.tsx               # Sign in page
│   │   ├── signup/page.tsx              # Sign up page
│   │   ├── layout.tsx                   # Root layout with Navbar & Footer
│   │   └── page.tsx                     # SaaS Landing page
│   ├── components/
│   │   ├── scanner/                     # ScoreGauge, FileUploader, AnalysisResults
│   │   ├── builder/                     # ResumeForm, ResumePreview
│   │   ├── pricing/                     # PricingCard
│   │   ├── auth/                        # AuthModal with instant demo test
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── lib/
│       ├── ai-analyzer.ts               # Groq / OpenAI / Heuristic ATS engine
│       ├── stripe.ts                    # Stripe config & plans
│       ├── sample-data.ts               # Sample resumes for 1-click test
│       ├── storage.ts                   # Client storage & credit management
│       ├── types.ts                     # TypeScript definitions
│       └── utils.ts                     # Utility helpers
└── package.json
\`\`\`

---

## 🚢 Vercel Deployment

1. Push your repository to GitHub.
2. Import project into [Vercel](https://vercel.com).
3. Add your environment variables (`GROQ_API_KEY`, `STRIPE_SECRET_KEY`, etc.).
4. Click **Deploy**.
