"use client";

import React from "react";
import { ShieldCheck, Users, GraduationCap, CalendarCheck, Bell } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";

interface AdminHeroProps {
  totalStudents: number;
  totalTeachers: number;
  todayAttendancePercent: number;
  totalNotices: number;
}

export function AdminHero({
  totalStudents,
  totalTeachers,
  todayAttendancePercent,
  totalNotices,
}: AdminHeroProps) {
  const { school } = useAuth();

  return (
    <div className="space-y-3.5 sm:space-y-4">
      {/* Dark Slate Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] p-5 sm:p-7 text-white shadow-[0_16px_36px_rgba(15,23,42,0.25)] border border-white/10">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-start justify-between gap-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-semibold tracking-wide uppercase text-white border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>Admin Console • {school?.code || "CAMPUS"}</span>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
              {school?.name || "Mo-School Academy"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
              Active Session • {school?.academic_year || "2026-2027"} ({school?.current_term || "Term 1"})
            </p>
          </div>
        </div>
      </div>

      {/* 4 Key Metric Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-card border border-black/[0.03]">
          <div className="flex items-center justify-between">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-blue-50 text-blue-600">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
              Enrolled
            </span>
          </div>
          <div className="mt-2.5 sm:mt-3">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">
              {totalStudents}
            </div>
            <div className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5">
              Total Students
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-card border border-black/[0.03]">
          <div className="flex items-center justify-between">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-purple-50 text-purple-600">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
              Faculty
            </span>
          </div>
          <div className="mt-2.5 sm:mt-3">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">
              {totalTeachers}
            </div>
            <div className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5">
              Total Teachers
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-card border border-black/[0.03]">
          <div className="flex items-center justify-between">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-emerald-50 text-emerald-600">
              <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Today
            </span>
          </div>
          <div className="mt-2.5 sm:mt-3">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">
              {todayAttendancePercent}%
            </div>
            <div className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5">
              Daily Attendance
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-card border border-black/[0.03]">
          <div className="flex items-center justify-between">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-orange-50 text-orange-600">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full">
              Active
            </span>
          </div>
          <div className="mt-2.5 sm:mt-3">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">
              {totalNotices}
            </div>
            <div className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5">
              Active Notices
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
