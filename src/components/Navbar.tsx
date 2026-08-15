'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, FileText, Scan, Layers, CheckCircle2, User as UserIcon, Menu, X, ArrowRight, Zap } from 'lucide-react';
import { getUser } from '@/lib/storage';
import { User } from '@/lib/types';
import AuthModal from './auth/AuthModal';

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setUser(getUser());
    const handleUpdate = () => setUser(getUser());
    window.addEventListener('saas_user_updated', handleUpdate);
    return () => window.removeEventListener('saas_user_updated', handleUpdate);
  }, []);

  const navLinks = [
    { name: 'ATS Scanner', href: '/scanner', icon: Scan },
    { name: 'Resume Builder', href: '/builder', icon: FileText },
    { name: 'Pricing', href: '/pricing', icon: Sparkles },
    { name: 'Dashboard', href: '/dashboard', icon: Layers },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                Resume<span className="text-blue-600 dark:text-blue-400">AI</span>
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                  ATS Pro
                </span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5">
                Scanner & Builder SaaS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-80" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-3">
            {user?.unlimitedScans || user?.plan !== 'free' ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>PRO UNLIMITED</span>
              </Link>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{user ? user.scansLeft : 3} Free Scans</span>
              </div>
            )}

            {user ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors text-sm text-slate-700 dark:text-slate-200"
              >
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="font-medium truncate max-w-[120px]">{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2"
              >
                <UserIcon className="w-4 h-4" />
                Sign In
              </button>
            )}

            <Link
              href="/scanner"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-all hover:shadow-blue-500/25 hover:shadow-md"
            >
              <span>Scan Resume</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <Link
                href="/scanner"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm"
              >
                Scan Resume Now
                <ArrowRight className="w-4 h-4" />
              </Link>

              {user ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium text-sm"
                >
                  <Layers className="w-4 h-4" />
                  My Dashboard ({user.name})
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium text-sm"
                >
                  <UserIcon className="w-4 h-4" />
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {authOpen && <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />}
    </>
  );
}
