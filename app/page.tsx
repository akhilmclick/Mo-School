"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { DEMO_ACCOUNTS } from "@/lib/data/mockData";
import { Lock, Mail, GraduationCap, ArrowRight, Sparkles, Building, X, UserCheck } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoDrawerOpen, setIsDemoDrawerOpen] = useState(false);
  const { login, loginAsDemo } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const res = await login(email, password);
    setIsLoading(false);

    if (res.success && res.redirectUrl) {
      router.push(res.redirectUrl);
    } else {
      setError(res.error || "Invalid email or password");
    }
  };

  const handleQuickDemoSelect = async (demoEmail: string) => {
    setIsLoading(true);
    setIsDemoDrawerOpen(false);
    const res = await loginAsDemo(demoEmail);
    setIsLoading(false);
    if (res.success && res.redirectUrl) {
      router.push(res.redirectUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3F4F6] via-[#F8F9FA] to-[#ECEEF2] dark:from-[#0B0F17] dark:via-[#0F172A] dark:to-[#0B0F17] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden transition-colors duration-200">
      {/* Top Bar Theme Toggle */}
      <div className="fixed top-4 right-4 z-40">
        <ThemeToggle showLabel />
      </div>

      {/* Soft radiant ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-orange-200/30 via-purple-200/20 to-blue-200/30 dark:from-orange-500/10 dark:via-purple-500/10 dark:to-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Main Login Card */}
        <div className="bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-black/[0.04] dark:border-white/10 p-7 sm:p-9 transition-all">
          {/* School Brand Header */}
          <div className="text-center pb-6">
            <div className="w-14 h-14 rounded-3xl bg-[#111827] dark:bg-slate-800 text-white flex items-center justify-center mx-auto shadow-md mb-3.5 border border-white/5">
              <GraduationCap className="w-7 h-7 text-orange-400" />
            </div>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Mo-School
            </h2>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Unified Portal • Single Entry for Parents, Teachers & Administrators
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200/70 dark:border-rose-800/60 text-xs font-semibold text-rose-700 dark:text-rose-300 text-center animate-fade-in">
              {error}
            </div>
          )}

          {/* Unified Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@school.com"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-orange-500/20 focus:border-slate-900 dark:focus:border-slate-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-orange-500/20 focus:border-slate-900 dark:focus:border-slate-600 transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full mt-2 shadow-md"
              icon={<ArrowRight className="w-4 h-4 ml-1" />}
            >
              Sign In
            </Button>
          </form>

          {/* Onboarding New School Entry Link */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors bg-slate-50 dark:bg-slate-800/60 hover:bg-orange-50 dark:hover:bg-orange-950/40 border border-slate-200/80 dark:border-slate-700 hover:border-orange-200/80 px-4 py-2.5 rounded-2xl shadow-2xs"
            >
              <Building className="w-4 h-4 text-orange-500" />
              <span>Register new institution? <strong>Start Setup →</strong></span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6">
          Mo-School SaaS • Built for 1,400–2,000 Student Campuses
        </p>
      </div>


      {/* Discrete Floating Demo Button on the bottom-right corner */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsDemoDrawerOpen(true)}
          className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-full shadow-lg border border-slate-200/80 hover:bg-white text-slate-700 text-xs font-bold transition-all hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>Demo Accounts</span>
        </button>
      </div>

      {/* Slide-Over Demo Accounts Drawer (hidden unless clicked) */}
      {isDemoDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs animate-fade-in"
            onClick={() => setIsDemoDrawerOpen(false)}
          />

          <div className="relative w-full max-w-sm h-full bg-white dark:bg-[#111827] shadow-2xl p-6 z-10 flex flex-col justify-between overflow-y-auto animate-slide-in-right border-l border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Demo Testing Accounts</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">1-click login for evaluation</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDemoDrawerOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 mt-5">
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => handleQuickDemoSelect(acc.email)}
                    className="w-full text-left p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-orange-50/50 dark:hover:bg-orange-950/30 hover:border-orange-200 dark:hover:border-orange-800/60 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={acc.avatar}
                        alt={acc.name}
                        className="w-9 h-9 rounded-full object-cover border border-black/5 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors truncate">
                          {acc.name}
                        </div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono truncate">{acc.email}</div>
                      </div>
                    </div>

                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        acc.roles.includes("admin")
                          ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                          : acc.roles.includes("teacher") && acc.roles.includes("parent")
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                          : acc.roles.includes("teacher")
                          ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                          : "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300 border border-orange-200 dark:border-orange-800"
                      }`}
                    >
                      {acc.badge.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 block">
                Default password for all: <code className="font-mono text-slate-700 dark:text-slate-300 font-bold">password123</code>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

