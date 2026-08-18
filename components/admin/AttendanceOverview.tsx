"use client";

import React from "react";
import { Student, AttendanceRecord } from "@/lib/types";
import { CalendarCheck, Users, TrendingUp, CheckCircle2 } from "lucide-react";

interface AttendanceOverviewProps {
  students: Student[];
  attendance: AttendanceRecord[];
}

export function AttendanceOverview({ students, attendance }: AttendanceOverviewProps) {
  const today = new Date().toISOString().split("T")[0];

  // Group classes
  const classesList = [
    { class: "10", section: "A" },
    { class: "10", section: "B" },
    { class: "9", section: "A" },
    { class: "8", section: "A" },
    { class: "7", section: "B" },
  ];

  // Calculate attendance statistics per class
  const classStats = classesList.map((c) => {
    const classStudents = students.filter(
      (s) => s.class === c.class && s.section === c.section
    );
    const studentIds = classStudents.map((s) => s.id);

    const todayRecords = attendance.filter(
      (a) => studentIds.includes(a.student_id) && a.date === today
    );

    const present = todayRecords.filter((r) => r.status === "present").length;
    const late = todayRecords.filter((r) => r.status === "late").length;
    const absent = todayRecords.filter((r) => r.status === "absent").length;

    const totalMarked = todayRecords.length;
    const totalEnrolled = classStudents.length;

    // Rate based on present + 0.8 * late or present / total
    const attendancePercent =
      totalEnrolled > 0
        ? Math.round(((present + late) / totalEnrolled) * 100)
        : 100;

    return {
      class: c.class,
      section: c.section,
      totalEnrolled,
      present,
      late,
      absent,
      totalMarked,
      attendancePercent,
    };
  });

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-4 sm:p-6 shadow-card border border-black/[0.03] dark:border-white/10 space-y-4 sm:space-y-5 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Attendance Overview by Class</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Real-time attendance rates for today ({new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })})</p>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200/50 dark:border-emerald-800/60">
          <TrendingUp className="w-3.5 h-3.5" /> Term 2 Active
        </span>
      </div>

      {/* Class breakdown rows */}
      <div className="space-y-3 sm:space-y-3.5">
        {classStats.map((item) => (
          <div
            key={`${item.class}-${item.section}`}
            className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-[#111827] dark:bg-slate-700 text-white flex items-center justify-center font-bold text-xs border border-white/5">
                  {item.class}{item.section}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Grade {item.class} — Section {item.section}
                  </h4>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500">
                    {item.totalEnrolled} Students Enrolled
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-base font-black text-slate-900 dark:text-white">
                  {item.attendancePercent}%
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Turnout</div>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-slate-200/80 dark:bg-slate-700 rounded-full h-2 overflow-hidden flex">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${item.attendancePercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
              <span>Present: <strong className="text-emerald-600 dark:text-emerald-400">{item.present}</strong></span>
              <span>Late: <strong className="text-amber-600 dark:text-amber-400">{item.late}</strong></span>
              <span>Absent: <strong className="text-rose-600 dark:text-rose-400">{item.absent}</strong></span>
              <span>Roster: <strong className="text-slate-700 dark:text-slate-300">{item.totalEnrolled}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

