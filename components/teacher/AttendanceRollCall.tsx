"use client";

import React, { useState, useEffect } from "react";
import { Student, AttendanceStatus, AttendanceRecord } from "@/lib/types";
import { CheckCircle2, XCircle, Clock, Check, Sparkles, User, Info, Save } from "lucide-react";
import { Button } from "../ui/Button";

interface AttendanceRollCallProps {
  currentClass: { class: string; section: string };
  students: Student[];
  existingRecords: AttendanceRecord[];
  onSaveAttendance: (records: { studentId: string; status: AttendanceStatus }[]) => void;
  onSelectStudent: (student: Student) => void;
}

export function AttendanceRollCall({
  currentClass,
  students,
  existingRecords,
  onSaveAttendance,
  onSelectStudent,
}: AttendanceRollCallProps) {
  const today = new Date().toISOString().split("T")[0];

  // Local state for roll-call entries
  const [attendanceMap, setAttendanceMap] = useState<Record<string, AttendanceStatus>>({});
  const [isSaved, setIsSaved] = useState(false);

  // Initialize from existing records or default to present
  useEffect(() => {
    const initialMap: Record<string, AttendanceStatus> = {};
    students.forEach((student) => {
      const existing = existingRecords.find(
        (a) => a.student_id === student.id && a.date === today
      );
      initialMap[student.id] = existing ? existing.status : "present";
    });
    setAttendanceMap(initialMap);
    setIsSaved(false);
  }, [students, existingRecords, today]);

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: status,
    }));
    setIsSaved(false);
  };

  const handleMarkAllPresent = () => {
    const allPresent: Record<string, AttendanceStatus> = {};
    students.forEach((s) => {
      allPresent[s.id] = "present";
    });
    setAttendanceMap(allPresent);
    setIsSaved(false);
  };

  const handleSubmit = () => {
    const payload = Object.entries(attendanceMap).map(([studentId, status]) => ({
      studentId,
      status,
    }));
    onSaveAttendance(payload);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3500);
  };

  const presentCount = Object.values(attendanceMap).filter((s) => s === "present").length;
  const absentCount = Object.values(attendanceMap).filter((s) => s === "absent").length;
  const lateCount = Object.values(attendanceMap).filter((s) => s === "late").length;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-card border border-black/[0.03] space-y-5">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">
              Daily Attendance Roll Call
            </h3>
            <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-indigo-200/60">
              Class {currentClass.class}-{currentClass.section}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Date: <strong className="text-slate-700">{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</strong> • {students.length} Students Enrolled
          </p>
        </div>

        {/* Mark All Present Shortcut */}
        <button
          onClick={handleMarkAllPresent}
          className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold px-3.5 py-2 rounded-2xl border border-emerald-200/60 transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Mark All Present
        </button>
      </div>

      {/* Summary Chips */}
      <div className="flex items-center gap-2 text-xs">
        <span className="bg-emerald-50 text-emerald-700 font-semibold px-3 py-1 rounded-full border border-emerald-200/50">
          {presentCount} Present
        </span>
        <span className="bg-rose-50 text-rose-700 font-semibold px-3 py-1 rounded-full border border-rose-200/50">
          {absentCount} Absent
        </span>
        <span className="bg-amber-50 text-amber-700 font-semibold px-3 py-1 rounded-full border border-amber-200/50">
          {lateCount} Late
        </span>
      </div>

      {/* Student List with large tap-friendly toggle buttons */}
      {students.length === 0 ? (
        <div className="py-12 text-center text-slate-400 text-xs">
          No students found in Class {currentClass.class}-{currentClass.section}.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {students.map((student) => {
            const currentStatus = attendanceMap[student.id] || "present";
            return (
              <div
                key={student.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 px-2 rounded-2xl transition-colors"
              >
                {/* Student Info (Clickable for full profile) */}
                <button
                  onClick={() => onSelectStudent(student)}
                  className="flex items-center gap-3 text-left group min-w-0"
                >
                  <img
                    src={student.photo_url}
                    alt={student.full_name}
                    className="w-11 h-11 rounded-2xl object-cover border border-black/5 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5 truncate">
                      {student.full_name}
                      <Info className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {student.student_id}
                    </div>
                  </div>
                </button>

                {/* 3-Way Tap Selector: Present, Absent, Late */}
                <div className="grid grid-cols-3 gap-1.5 bg-slate-100/80 p-1 rounded-2xl shrink-0 sm:w-64">
                  <button
                    onClick={() => handleStatusChange(student.id, "present")}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                      currentStatus === "present"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Present
                  </button>

                  <button
                    onClick={() => handleStatusChange(student.id, "absent")}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                      currentStatus === "absent"
                        ? "bg-rose-600 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Absent
                  </button>

                  <button
                    onClick={() => handleStatusChange(student.id, "late")}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                      currentStatus === "late"
                        ? "bg-amber-600 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    Late
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Submit Button & Confirmation State */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        {isSaved ? (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3.5 py-2 rounded-2xl border border-emerald-200/60 animate-fade-in w-full sm:w-auto">
            <Check className="w-4 h-4" />
            Attendance successfully submitted & saved for Grade {currentClass.class}-{currentClass.section}!
          </div>
        ) : (
          <span className="text-xs text-slate-400">
            Unsaved changes will be updated upon submission.
          </span>
        )}

        <Button
          onClick={handleSubmit}
          variant="primary"
          size="md"
          icon={<Save className="w-4 h-4" />}
          className="w-full sm:w-auto px-6 ml-auto"
        >
          Submit Attendance
        </Button>
      </div>
    </div>
  );
}
