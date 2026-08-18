"use client";

import React from "react";
import { Student } from "@/lib/types";
import { User, Calendar, MapPin, Hash, Bookmark, ShieldCheck } from "lucide-react";

interface StudentInfoCardProps {
  student: Student | null;
}

export function StudentInfoCard({ student }: StudentInfoCardProps) {
  if (!student) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-card border border-black/[0.03] text-center text-slate-400 text-xs">
        No student selected.
      </div>
    );
  }

  const formatDob = (dobStr: string) => {
    try {
      const d = new Date(dobStr + "T00:00:00");
      return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    } catch {
      return dobStr;
    }
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-5 sm:p-6 shadow-card border border-black/[0.03] dark:border-white/10 space-y-5 transition-colors">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Student Profile & Records</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Official academic enrollment details</p>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200/50 dark:border-emerald-800/60">
          <ShieldCheck className="w-3.5 h-3.5" /> Enrolled
        </span>
      </div>

      {/* Main Student Header Card */}
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-orange-50/40 dark:from-slate-800/80 dark:to-orange-950/30 border border-slate-100 dark:border-slate-800">
        {student.photo_url ? (
          <img
            src={student.photo_url}
            alt={student.full_name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white dark:border-slate-700 shadow-sm"
          />
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-2xl">
            {student.full_name.charAt(0)}
          </div>
        )}

        <div className="min-w-0">
          <h4 className="text-lg font-extrabold text-slate-900 dark:text-white truncate">{student.full_name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-[#111827] dark:bg-slate-700 text-white text-xs font-semibold px-2.5 py-0.5 rounded-lg border border-white/5">
              Class {student.class}-{student.section}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">ID: {student.student_id}</span>
          </div>
        </div>
      </div>

      {/* Grid of Key Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-xs">
            <Hash className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Student ID
            </div>
            <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {student.student_id}
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-xs">
            <Bookmark className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Admission No (Permanent)
            </div>
            <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {student.admission_number}
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-xs">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Date of Birth
            </div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
              {formatDob(student.date_of_birth)}
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-xs">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Residential Address
            </div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5 line-clamp-2">
              {student.address}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

