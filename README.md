# 🚀 Next-Gen AI Resume Scanner & Builder

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Groq](https://img.shields.io/badge/Groq-API-orange)](https://groq.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?logo=openai)](https://openai.com/)

**Get Past the ATS Filter. Land 3x More Interviews.**

An AI-powered SaaS platform that instantly scans resumes, provides ATS compatibility scores, and offers intelligent suggestions to optimize your resume for specific job descriptions.

[Live Demo](https://ai-resume-saas-one.vercel.app/)

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [📂 Project Structure](#-project-structure)
- [🔧 Core Functionality](#-core-functionality)
- [💳 Payment Integration](#-payment-integration)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### User Features
- **📄 Resume Upload**: Drag-and-drop support for PDF and DOCX files, or plain text input
- **🎯 Job Description Matching**: Paste target job descriptions for tailored optimization
- **📊 ATS Compatibility Score**: Get an instant 0-100 score with detailed grade (e.g., "Excellent")
- **🔍 Diagnostic Highlights**:
  - Action verb detection and count
  - Quantifiable metrics extraction (numbers, percentages, dollar amounts)
  - Keyword gap analysis with suggested improvements
- **⚡ 1-Click AI Rewrites**: Auto-improve weak bullet points with high-impact language
- **📝 Live Resume Builder**: Edit and fine-tune your resume in real-time
- **📥 ATS-Friendly Export**: Download as clean, properly formatted PDF
- **🎨 Professional Templates**: Multiple templates with color options (4 in Pro)

### Technical Features
- **Sub-Second AI Inference**: Leveraging Groq's ultra-fast inference
- **Secure Payment Processing**: Stripe integration (test mode available)
- **Responsive Design**: Works on all devices
- **Free Tier**: 3 complete scans with no credit card required
- **Pro Features**: Unlimited scans, AI cover letter generator, LinkedIn optimizer

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (assumed based on design)

### Backend
- **Runtime**: Node.js
- **API Routes**: Next.js API routes
- **AI Integration**:
  - Groq API (primary for speed)
  - OpenAI API (fallback/alternative)
- **Authentication**: (Not explicitly stated - implement as needed)
- **Database**: (Not specified - consider Prisma + PostgreSQL)

### Payments
- **Processor**: Stripe
- **Plans**: Free, Pro Monthly ($19), Pro Annual ($12/month)

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, or pnpm
- API keys for Groq and/or OpenAI
- Stripe account (for payment processing)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-resume-saas.git
cd ai-resume-saas
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables** (see below)

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open** [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# AI API Keys
GROQ_API_KEY=your_groq_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional: Database (if implemented)
DATABASE_URL=your_database_connection_string

# Optional: Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

**Important**: For local development with Stripe, use the test mode keys. The site is currently configured with "Stripe Test Mode active — test for $0".

## 📂 Project Structure

```
ai-resume-saas/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── resume/       # Resume scanning and analysis
│   │   ├── ai/           # AI rewrite and optimization
│   │   └── payment/      # Stripe webhooks and checkout
│   ├── components/        # Reusable UI components
│   ├── lib/              # Utility functions and configurations
│   ├── types/            # TypeScript type definitions
│   └── page.tsx          # Landing page
├── public/               # Static assets
├── styles/              # Global styles
├── .env.local           # Environment variables (gitignored)
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # This file
```

## 🔧 Core Functionality

### ATS Scanner
The AI analyzes resumes across 5 critical dimensions:
1. **Keyword Optimization**: Match rate with target job descriptions
2. **Action Verbs**: Strength and variety of impact verbs
3. **Quantifiable Metrics**: Presence of numbers, percentages, and dollar amounts
4. **Formatting**: ATS-friendly layout and structure
5. **Content Quality**: Overall readability and impact

### AI Suggestions Flow
1. User uploads resume (PDF/DOCX/text)
2. System extracts and parses content
3. AI generates diagnostic report
4. User can click "Fix with AI" on specific sections
5. AI rewrites content with high-impact language and metrics
6. User fine-tunes in the live builder
7. Download optimized PDF

### API Integration Points
- **/api/resume/scan**: Analyze resume and return ATS score
- **/api/resume/fix**: AI-powered rewrite of bullet points
- **/api/job/match**: Compare resume against job description
- **/api/payment/create-checkout**: Generate Stripe checkout session
- **/api/payment/webhook**: Handle Stripe webhook events

## 💳 Payment Integration

The platform uses Stripe for payment processing with three tiers:

| Plan | Price | Features |
|------|-------|----------|
| **Free** | $0 | 3 scans, 2 templates, basic score |
| **Pro Monthly** | $19/month | Unlimited scans, AI rewrite, 4 templates, priority support |
| **Pro Annual** | $12/month | All Pro + cover letter generator, LinkedIn optimizer |

For development, the platform runs in Stripe test mode, allowing full testing without real charges.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow the TypeScript best practices
- Write meaningful commit messages
- Update documentation for new features
- Test your changes thoroughly
- Ensure responsive design works on all devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Groq](https://groq.com/) - Lightning-fast AI inference
- [OpenAI](https://openai.com/) - AI models
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Hosting platform
- [shadcn/ui](https://ui.shadcn.com/) - UI components

## 📞 Support

For support, feature requests, or bug reports:
- Open an issue in this repository
- Contact the development team through the platform

---

**Built with ❤️ for job seekers everywhere**

*"75% of resumes never get seen. Make yours stand out with AI."*
