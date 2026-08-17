"use client";

import React from "react";
import { Sparkles, BookOpen, Users, PlusCircle, CheckCircle2 } from "lucide-react";

interface TeacherHeroProps {
  teacherName: string;
  subjects: string[];
  assignedClasses: { class: string; section: string }[];
  onOpenPostNotice: () => void;
  onJumpToAttendance: () => void;
}

export function TeacherHero({
  teacherName,
  subjects,
  assignedClasses,
  onOpenPostNotice,
  onJumpToAttendance,
}: TeacherHeroProps) {
  return (
    <div className="space-y-4 mb-6">
      {/* Indigo-Slate Gradient Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4F46E5] via-[#6366F1] to-[#818CF8] p-6 sm:p-7 text-white shadow-[0_16px_36px_rgba(79,70,229,0.28)] border border-white/20">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-black/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide uppercase text-white mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Teacher Workspace
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome Back, {teacherName}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {subjects.map((sub) => (
                <span
                  key={sub}
                  className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-2.5 py-0.5 rounded-lg border border-white/20"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onOpenPostNotice}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-white text-slate-900 font-bold px-4 py-2.5 rounded-2xl hover:bg-slate-50 transition-all text-xs shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-[#4F46E5]" />
              Post Notice
            </button>
            <button
              onClick={onJumpToAttendance}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-black/30 hover:bg-black/40 text-white font-medium px-4 py-2.5 rounded-2xl transition-all text-xs backdrop-blur-md border border-white/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              Roll Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
