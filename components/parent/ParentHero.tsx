"use client";

import React from "react";
import { Student, Notice } from "@/lib/types";
import { Sparkles, Calendar, Bell, ChevronRight, TrendingUp } from "lucide-react";

interface ParentHeroProps {
  guardianName: string;
  activeChild: Student | null;
  attendanceRate: number;
  latestNotice: Notice | null;
  onOpenNotice: (notice: Notice) => void;
  onViewAttendance: () => void;
}

export function ParentHero({
  guardianName,
  activeChild,
  attendanceRate,
  latestNotice,
  onOpenNotice,
  onViewAttendance,
}: ParentHeroProps) {
  return (
    <div className="space-y-4 mb-6">
      {/* Warm Sunset Gradient Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF6547] via-[#FF7A5C] to-[#FFA07A] p-6 sm:p-7 text-white shadow-[0_16px_36px_rgba(255,101,71,0.28)] border border-white/20">
        {/* Soft decorative background circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-black/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide uppercase text-white mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Parent Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome Back, {guardianName.split(" ")[0]}
            </h1>
            {activeChild ? (
              <p className="text-sm text-white/90 font-medium mt-1">
                Viewing academic overview for <span className="underline font-bold text-white">{activeChild.full_name}</span> (Class {activeChild.class}-{activeChild.section})
              </p>
            ) : (
              <p className="text-sm text-white/90 font-medium mt-1">
                Stay updated with your child&apos;s daily attendance and notices.
              </p>
            )}
          </div>

          {activeChild && (
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 px-4 border border-white/30 text-right shrink-0">
              <div className="text-[11px] text-white/80 font-medium uppercase tracking-wider">Student ID</div>
              <div className="text-sm font-mono font-bold text-white">{activeChild.student_id}</div>
            </div>
          )}
        </div>
      </div>

      {/* Two-Column Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Attendance Card */}
        <button
          onClick={onViewAttendance}
          className="text-left bg-white rounded-3xl p-5 shadow-card border border-black/[0.03] hover:shadow-md transition-all group relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <TrendingUp className="w-3 h-3 mr-1" />
              This Month
            </span>
          </div>

          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {attendanceRate}%
            </div>
            <div className="text-xs font-medium text-slate-500 mt-0.5 flex items-center justify-between">
              <span>Monthly Attendance Rate</span>
              <span className="text-[11px] text-slate-400 group-hover:text-slate-800 transition-colors flex items-center">
                Details <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </span>
            </div>
          </div>
        </button>

        {/* Latest Notice Preview Card */}
        <button
          onClick={() => latestNotice && onOpenNotice(latestNotice)}
          disabled={!latestNotice}
          className="text-left bg-white rounded-3xl p-5 shadow-card border border-black/[0.03] hover:shadow-md transition-all group relative"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-orange-50 text-orange-600">
              <Bell className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {latestNotice?.target_class ? `Class ${latestNotice.target_class}` : "School-Wide"}
            </span>
          </div>

          <div className="mt-3">
            <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-orange-600 transition-colors">
              {latestNotice?.title || "No notices posted"}
            </h4>
            <p className="text-xs text-slate-500 line-clamp-1 mt-1">
              {latestNotice?.body || "Check back soon for school announcements."}
            </p>
          </div>

          {latestNotice?.requires_acknowledgment && (
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="font-bold text-amber-700">Action Required:</span>
              <span className="text-slate-500 font-medium group-hover:text-slate-900 transition-colors">
                Tap to Acknowledge →
              </span>
            </div>
          )}
        </button>

      </div>
    </div>
  );
}
