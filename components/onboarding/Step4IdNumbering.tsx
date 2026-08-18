"use client";

import React, { useState } from "react";
import { Hash, Sparkles, Plus, Check, RefreshCw } from "lucide-react";
import { Button } from "../ui/Button";

interface Step4Props {
  data: {
    student_id_format: string;
    admission_prefix: string;
    admission_start_seq: number;
    code: string;
    academic_year: string;
  };
  onChange: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const AVAILABLE_TOKENS = [
  { token: "{YEAR}", label: "Session Year", sample: "2026" },
  { token: "{CLASS}", label: "Grade / Class", sample: "10" },
  { token: "{SECTION}", label: "Section Letter", sample: "A" },
  { token: "{SEQ}", label: "3-Digit Sequence", sample: "014" },
  { token: "{SCHOOL_CODE}", label: "Campus Code", sample: "BCA" },
];

export function Step4IdNumbering({ data, onChange, onNext, onBack }: Step4Props) {
  const insertToken = (token: string) => {
    onChange("student_id_format", `${data.student_id_format}${token}`);
  };

  // Generate live sample
  const generateSampleStudentId = () => {
    const year = data.academic_year.split("-")[0] || "2026";
    const code = data.code.split("-")[0] || "BCA";
    return data.student_id_format
      .replace(/{YEAR}/g, year)
      .replace(/{CLASS}/g, "10")
      .replace(/{SECTION}/g, "A")
      .replace(/{SEQ}/g, "014")
      .replace(/{SCHOOL_CODE}/g, code);
  };

  const generateSampleAdmissionId = () => {
    const year = data.academic_year.split("-")[0] || "2026";
    const seqStr = String(data.admission_start_seq || 1).padStart(4, "0");
    return `${data.admission_prefix || "ADM"}-${year}-${seqStr}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.student_id_format.trim() || !data.admission_prefix.trim()) return;
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-black/[0.03] space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Step 4 of 6
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Student ID & Admission Numbering Scheme
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Establish automated identification rules for student enrollments and administrative records.
          </p>
        </div>

        {/* Live Preview Box */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white space-y-3 shadow-lg">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Live Pattern Preview
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <span className="text-[10px] text-orange-300 font-semibold block">
                Generated Student Roll ID (Sample)
              </span>
              <div className="text-lg sm:text-xl font-mono font-black mt-1 text-white tracking-wider">
                {generateSampleStudentId()}
              </div>
              <span className="text-[10px] text-slate-400">
                Applied during class roster generation
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <span className="text-[10px] text-emerald-300 font-semibold block">
                Permanent Admission Number (Sample)
              </span>
              <div className="text-lg sm:text-xl font-mono font-black mt-1 text-white tracking-wider">
                {generateSampleAdmissionId()}
              </div>
              <span className="text-[10px] text-slate-400">
                Permanent institutional registry identifier
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* Student ID Format Builder */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Student ID Dynamic Pattern *
            </label>
            <input
              type="text"
              required
              value={data.student_id_format}
              onChange={(e) => onChange("student_id_format", e.target.value)}
              placeholder="{YEAR}-{CLASS}{SECTION}-{SEQ}"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
            />

            {/* Token Chips */}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-400 mr-1">Insert Token:</span>
              {AVAILABLE_TOKENS.map((t) => (
                <button
                  key={t.token}
                  type="button"
                  onClick={() => insertToken(t.token)}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold transition-all flex items-center gap-1"
                >
                  <Plus className="w-3 h-3 text-slate-400" />
                  {t.token}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Admission Prefix */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Admission Prefix *
              </label>
              <input
                type="text"
                required
                value={data.admission_prefix}
                onChange={(e) => onChange("admission_prefix", e.target.value.toUpperCase())}
                placeholder="ADM"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all uppercase"
              />
            </div>

            {/* Starting Sequence Number */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Starting Sequence Number
              </label>
              <input
                type="number"
                min={1}
                value={data.admission_start_seq}
                onChange={(e) => onChange("admission_start_seq", parseInt(e.target.value) || 1)}
                placeholder="1"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
              />
            </div>
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
          Next: Administrator Setup →
        </Button>
      </div>
    </form>
  );
}
