"use client";

import React, { useState } from "react";
import { User, Mail, ShieldCheck, Lock, Sparkles, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/Button";

interface Step5Props {
  data: {
    admin_name: string;
    admin_email: string;
    admin_title: string;
    admin_password?: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step5AdminProfile({ data, onChange, onNext, onBack }: Step5Props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.admin_name.trim() || !data.admin_email.trim()) return;
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-black/[0.03] space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Step 5 of 6
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Primary Administrator Account
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Set up the root administrator account to access the school administration console.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Admin Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Administrator Full Name *
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={data.admin_name}
                onChange={(e) => onChange("admin_name", e.target.value)}
                placeholder="e.g. Principal Marcus Sterling"
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
              />
            </div>
          </div>

          {/* Official Designation */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Designation / Title *
            </label>
            <input
              type="text"
              required
              value={data.admin_title}
              onChange={(e) => onChange("admin_title", e.target.value)}
              placeholder="e.g. Principal / Head of School / Director"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
            />
          </div>

          {/* Official Admin Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Admin Login Email *
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={data.admin_email}
                onChange={(e) => onChange("admin_email", e.target.value)}
                placeholder="principal@school.edu"
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Used for logging into the root administration portal.
            </span>
          </div>

          {/* Admin Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Admin Password *
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={data.admin_password || ""}
                onChange={(e) => onChange("admin_password", e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-12 pr-12 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Default demo password: <code className="font-mono text-slate-700 font-bold">password123</code>
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <strong className="font-bold block">Root Administrator Permissions</strong>
            This account will possess comprehensive permissions across faculty assignments, student enrollment directories, noticeboard publication, and school policy management.
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-2xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
        >
          ← Back
        </button>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="px-8 shadow-md"
        >
          Next: Review & Launch →
        </Button>
      </div>
    </form>
  );
}
