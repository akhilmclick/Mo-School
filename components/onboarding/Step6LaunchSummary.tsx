"use client";

import React, { useState } from "react";
import { OnboardingData } from "@/lib/types";
import {
  Building2,
  Calendar,
  LayoutGrid,
  Hash,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Button } from "../ui/Button";

interface Step6Props {
  data: OnboardingData;
  onLaunch: () => Promise<void>;
  onBack: () => void;
}

export function Step6LaunchSummary({ data, onLaunch, onBack }: Step6Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLaunchClick = async () => {
    setIsSubmitting(true);
    try {
      await onLaunch();
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  const totalSections = data.grades.reduce((acc, g) => acc + g.sections.length, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-black/[0.03] space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Step 6 of 6
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Review & Launch Institution Workspace
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Please verify your campus settings before provisioning your live administrative dashboard.
          </p>
        </div>

        {/* Hero Card of New School */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-black text-xl text-orange-400">
                {data.code.slice(0, 3)}
              </div>
              <div>
                <span className="text-[10px] text-orange-400 font-bold uppercase tracking-widest block">
                  Campus Code: {data.code}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">{data.name}</h3>
                {data.motto && (
                  <p className="text-xs text-slate-300 italic mt-0.5 max-w-md">&ldquo;{data.motto}&rdquo;</p>
                )}
              </div>
            </div>

            <div className="text-left sm:text-right bg-white/5 sm:bg-transparent p-3 sm:p-0 rounded-2xl">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                Session Status
              </span>
              <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 sm:justify-end">
                <CheckCircle2 className="w-4 h-4" />
                {data.academic_year} • {data.current_term}
              </div>
            </div>
          </div>
        </div>

        {/* 4-Grid Summary Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: Identity & Contact */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Building2 className="w-4 h-4 text-orange-600" />
              Contact & Address
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <div>
                <span className="text-slate-400">Email:</span> <strong>{data.email}</strong>
              </div>
              {data.phone && (
                <div>
                  <span className="text-slate-400">Phone:</span> <strong>{data.phone}</strong>
                </div>
              )}
              {data.address && (
                <div>
                  <span className="text-slate-400">Address:</span> {data.address}
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Academic Session */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Calendar className="w-4 h-4 text-indigo-600" />
              Academic Calendar
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <div>
                <span className="text-slate-400">Evaluation:</span>{" "}
                <strong className="capitalize">{data.term_system}</strong>
              </div>
              <div>
                <span className="text-slate-400">Working Days:</span>{" "}
                <strong>{data.attendance_days.length} Days/Week</strong>
              </div>
              <div className="text-[11px] text-slate-500">
                {data.attendance_days.slice(0, 5).join(", ")}
              </div>
            </div>
          </div>

          {/* Card 3: Class Topology */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <LayoutGrid className="w-4 h-4 text-purple-600" />
              Class Topology
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <div>
                <span className="text-slate-400">Configured Levels:</span>{" "}
                <strong>{data.grades.length} Grades</strong>
              </div>
              <div>
                <span className="text-slate-400">Total Classrooms:</span>{" "}
                <strong>{totalSections} Sections</strong>
              </div>
              <div className="text-[11px] text-slate-500 truncate">
                {data.grades.map((g) => g.name).join(", ")}
              </div>
            </div>
          </div>

          {/* Card 4: ID Numbering & Root Admin */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Administrator & ID Rules
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <div>
                <span className="text-slate-400">Root Admin:</span>{" "}
                <strong>{data.admin_name}</strong> ({data.admin_title})
              </div>
              <div>
                <span className="text-slate-400">Admin Email:</span> <strong>{data.admin_email}</strong>
              </div>
              <div>
                <span className="text-slate-400">ID Formula:</span>{" "}
                <code className="font-mono text-slate-800 font-bold">{data.student_id_format}</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-6 py-3 rounded-2xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all disabled:opacity-50"
        >
          ← Back to Edit
        </button>

        <Button
          type="button"
          onClick={handleLaunchClick}
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          icon={isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Rocket className="w-5 h-5 text-orange-400" />}
          className="px-8 shadow-xl hover:shadow-2xl"
        >
          {isSubmitting ? "Provisioning School..." : "🚀 Launch School Workspace"}
        </Button>
      </div>
    </div>
  );
}
