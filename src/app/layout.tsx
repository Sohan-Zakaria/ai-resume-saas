import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'ResumeAI — AI ATS Resume Scanner & Builder SaaS',
  description:
    'AI-powered Applicant Tracking System (ATS) resume scanner, score analyzer, bullet rewrite generator, and live PDF resume builder. Next.js 15, Groq, OpenAI & Stripe.',
  keywords: [
    'ATS Resume Scanner',
    'AI Resume Builder',
    'ATS Score Check',
    'Next.js 15 SaaS',
    'Groq API',
    'Stripe Checkout',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
