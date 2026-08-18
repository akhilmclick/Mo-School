"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { DEMO_ACCOUNTS } from "@/lib/data/mockData";
import { Sparkles, UserCheck, ChevronDown, LogOut, RefreshCw, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export function DemoSwitcher() {
  const { user, loginAsDemo, logout, switchRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSelectDemo = async (email: string) => {
    const res = await loginAsDemo(email);
    setIsOpen(false);
    if (res.success && res.redirectUrl) {
      router.push(res.redirectUrl);
    }
  };

  const handleRoleToggle = (role: "parent" | "teacher" | "admin") => {
    switchRole(role);
    setIsOpen(false);
    router.push(`/${role}`);
  };

  return (
    <>
      {/* Floating Demo Switcher Pill placed at bottom-left to avoid any overlap with top-right ThemeToggle */}
      <div className="fixed bottom-4 left-4 z-40 hidden sm:block">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-white/90 dark:bg-[#111827]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-card border border-black/[0.06] dark:border-white/10 hover:bg-white dark:hover:bg-[#111827] transition-all text-xs font-semibold text-slate-800 dark:text-slate-200 hover:shadow-md"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-400 dark:text-slate-500 font-normal">Demo:</span>
          <span className="max-w-[120px] truncate">{user?.full_name || "Quick Switcher"}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
        </button>
      </div>

      {/* Switcher Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white dark:bg-[#111827] rounded-3xl shadow-2xl border border-black/[0.05] dark:border-white/10 p-6 z-10 animate-scale-up transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Quick Demo Switcher</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Jump between roles to test all flows</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Active User Details & Multi-role switch */}
            {user && (
              <div className="my-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#111827] dark:bg-slate-700 text-white flex items-center justify-center font-bold text-sm border border-white/10">
                      {user.full_name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{user.full_name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">
                        Active View: <span className="font-semibold text-slate-800 dark:text-slate-200">{user.activeRole}</span>
                      </div>
                    </div>
                  </div>
                  {user.roles.length > 1 && (
                    <div className="flex gap-1">
                      {user.roles.map((r) => (
                        <button
                          key={r}
                          onClick={() => handleRoleToggle(r)}
                          className={`text-[11px] font-medium px-2 py-1 rounded-lg capitalize transition-colors ${
                            user.activeRole === r
                              ? "bg-[#111827] dark:bg-slate-100 text-white dark:text-slate-900 font-bold"
                              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Account Presets */}
            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {DEMO_ACCOUNTS.map((acc) => {
                const isSelected = user?.email.toLowerCase() === acc.email.toLowerCase();
                return (
                  <button
                    key={acc.email}
                    onClick={() => handleSelectDemo(acc.email)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center gap-3 ${
                      isSelected
                        ? "bg-orange-50/70 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800/60 ring-1 ring-orange-400/30"
                        : "bg-white dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:border-slate-200 dark:hover:border-slate-700"
                    }`}
                  >
                    <img
                      src={acc.avatar}
                      alt={acc.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0 border border-black/5 dark:border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold text-xs text-slate-900 dark:text-white truncate">{acc.name}</span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                            acc.roles.includes("admin")
                              ? "bg-slate-900 dark:bg-slate-700 text-white"
                              : acc.roles.includes("teacher") && acc.roles.includes("parent")
                              ? "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300"
                              : acc.roles.includes("teacher")
                              ? "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300"
                              : "bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300"
                          }`}
                        >
                          {acc.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{acc.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Logout and close */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              {user && (
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                    router.push("/");
                  }}
                  className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 font-medium px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 ml-auto font-medium px-3 py-1.5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

