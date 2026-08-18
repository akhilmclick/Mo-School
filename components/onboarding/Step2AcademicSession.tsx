"use client";

import React from "react";
import { Calendar, Clock, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";

interface Step2Props {
  data: {
    academic_year: string;
    term_system: "terms" | "semesters" | "quarters";
    current_term: string;
    attendance_days: string[];
  };
  onChange: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const ALL_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function Step2AcademicSession({ data, onChange, onNext, onBack }: Step2Props) {
  const handleTermSystemChange = (system: "terms" | "semesters" | "quarters") => {
    onChange("term_system", system);
    if (system === "semesters") {
      onChange("current_term", "Semester 1");
    } else if (system === "quarters") {
      onChange("current_term", "Quarter 1");
    } else {
      onChange("current_term", "Term 1");
    }
  };

  const toggleDay = (day: string) => {
    if (data.attendance_days.includes(day)) {
      if (data.attendance_days.length > 1) {
        onChange(
          "attendance_days",
          data.attendance_days.filter((d) => d !== day)
        );
      }
    } else {
      onChange("attendance_days", [...data.attendance_days, day]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.academic_year.trim()) return;
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-black/[0.03] space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Step 2 of 6
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Academic Calendar & Session Schedule
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Define your active academic session, grading term structure, and school attendance operating days.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Active Academic Year */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Active Academic Year *
            </label>
            <div className="relative">
              <Calendar className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={data.academic_year}
                onChange={(e) => onChange("academic_year", e.target.value)}
                placeholder="2026-2027"
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Format: YYYY-YYYY (e.g. 2026-2027 or 2026)
            </span>
          </div>

          {/* Current Active Term */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Initial Active Term / Session *
            </label>
            <select
              value={data.current_term}
              onChange={(e) => onChange("current_term", e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
            >
              {data.term_system === "semesters" ? (
                <>
                  <option value="Semester 1">Semester 1 (Fall / Monsoon)</option>
                  <option value="Semester 2">Semester 2 (Spring / Winter)</option>
                </>
              ) : data.term_system === "quarters" ? (
                <>
                  <option value="Quarter 1">Quarter 1 (Q1)</option>
                  <option value="Quarter 2">Quarter 2 (Q2)</option>
                  <option value="Quarter 3">Quarter 3 (Q3)</option>
                  <option value="Quarter 4">Quarter 4 (Q4)</option>
                </>
              ) : (
                <>
                  <option value="Term 1">Term 1 (First Term)</option>
                  <option value="Term 2">Term 2 (Mid Term)</option>
                  <option value="Term 3">Term 3 (Final Term)</option>
                </>
              )}
            </select>
          </div>

          {/* Term Structure System */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Session Evaluation System
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "terms", title: "3 Terms / Trimesters", desc: "Term 1, Term 2, Term 3" },
                { id: "semesters", title: "2 Semesters", desc: "Semester 1 & Semester 2" },
                { id: "quarters", title: "4 Quarters", desc: "Q1, Q2, Q3, Q4" },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleTermSystemChange(item.id as any)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    data.term_system === item.id
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="font-bold text-xs">{item.title}</div>
                  <div
                    className={`text-[11px] mt-0.5 ${
                      data.term_system === item.id ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* School Operating / Attendance Days */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Official School Attendance Days
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_DAYS.map((day) => {
                const isSelected = data.attendance_days.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300/80 shadow-xs"
                        : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    {day}
                  </button>
                );
              })}
            </div>
            <span className="text-[11px] text-slate-400 mt-1.5 block">
              Roll call and turnout statistics will calculate percentages based on selected operating days.
            </span>
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
          Next: Class Structure →
        </Button>
      </div>
    </form>
  );
}
