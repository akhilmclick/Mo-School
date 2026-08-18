"use client";

import React from "react";
import { AttendanceRecord } from "@/lib/types";
import { AttendanceBadge } from "../ui/Badge";
import { Calendar, CheckCircle2, XCircle, Clock, Info } from "lucide-react";

interface AttendanceListProps {
  records: AttendanceRecord[];
  studentName: string;
}

export function AttendanceList({ records, studentName }: AttendanceListProps) {
  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr + "T00:00:00");
      const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
      const month = d.toLocaleDateString("en-US", { month: "short" });
      const day = d.getDate();
      return { weekday, formatted: `${month} ${day}, ${d.getFullYear()}` };
    } catch {
      return { weekday: "", formatted: dateStr };
    }
  };

  const presentCount = records.filter((r) => r.status === "present").length;
  const absentCount = records.filter((r) => r.status === "absent").length;
  const lateCount = records.filter((r) => r.status === "late").length;

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-5 sm:p-6 shadow-card border border-black/[0.03] dark:border-white/10 space-y-4 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Attendance (Last 10 Days)</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Official roll-call record for {studentName}</p>
        </div>

        {/* Quick summary counters */}
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200/50 dark:border-emerald-800/60">
            <CheckCircle2 className="w-3.5 h-3.5" /> {presentCount} Present
          </span>
          {absentCount > 0 && (
            <span className="flex items-center gap-1 font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded-full border border-rose-200/50 dark:border-rose-800/60">
              <XCircle className="w-3.5 h-3.5" /> {absentCount} Absent
            </span>
          )}
          {lateCount > 0 && (
            <span className="flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-200/50 dark:border-amber-800/60">
              <Clock className="w-3.5 h-3.5" /> {lateCount} Late
            </span>
          )}
        </div>
      </div>

      {records.length === 0 ? (
        <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs">
          No attendance records logged for this period.
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {records.slice(0, 10).map((record) => {
            const { weekday, formatted } = formatDate(record.date);
            return (
              <div
                key={record.id}
                className="py-3 flex items-center justify-between hover:bg-slate-50/70 dark:hover:bg-slate-800/40 px-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center font-bold text-slate-700 dark:text-slate-300 text-xs shrink-0">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium uppercase leading-none">
                      {weekday}
                    </span>
                    <span className="text-sm leading-tight">{record.date.split("-")[2]}</span>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{formatted}</div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500">Regular Roll Call Session</div>
                  </div>
                </div>

                <AttendanceBadge status={record.status} />
              </div>
            );
          })}

        </div>
      )}
    </div>
  );
}
