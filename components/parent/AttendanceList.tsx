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
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-card border border-black/[0.03] space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">Recent Attendance (Last 10 Days)</h3>
          <p className="text-xs text-slate-500">Official roll-call record for {studentName}</p>
        </div>

        {/* Quick summary counters */}
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/50">
            <CheckCircle2 className="w-3.5 h-3.5" /> {presentCount} Present
          </span>
          {absentCount > 0 && (
            <span className="flex items-center gap-1 font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200/50">
              <XCircle className="w-3.5 h-3.5" /> {absentCount} Absent
            </span>
          )}
          {lateCount > 0 && (
            <span className="flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/50">
              <Clock className="w-3.5 h-3.5" /> {lateCount} Late
            </span>
          )}
        </div>
      </div>

      {records.length === 0 ? (
        <div className="py-8 text-center text-slate-400 text-xs">
          No attendance records logged for this period.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {records.slice(0, 10).map((record) => {
            const { weekday, formatted } = formatDate(record.date);
            return (
              <div
                key={record.id}
                className="py-3 flex items-center justify-between hover:bg-slate-50/70 px-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-slate-100 flex flex-col items-center justify-center font-bold text-slate-700 shrink-0">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider leading-tight">
                      {weekday}
                    </span>
                    <span className="text-xs text-slate-800 leading-tight">
                      {record.date.split("-")[2]}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900">{formatted}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <span>Daily Roll Call</span>
                    </div>
                  </div>
                </div>

                <div>
                  <AttendanceBadge status={record.status} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
