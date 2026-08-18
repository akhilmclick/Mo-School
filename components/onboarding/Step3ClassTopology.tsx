"use client";

import React, { useState } from "react";
import { GradeConfig } from "@/lib/types";
import { PRESET_K12, PRESET_SECONDARY, PRESET_PRIMARY } from "@/lib/data/mockData";
import { LayoutGrid, Plus, Trash2, Sparkles, Check, Users } from "lucide-react";
import { Button } from "../ui/Button";

interface Step3Props {
  grades: GradeConfig[];
  onChange: (grades: GradeConfig[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step3ClassTopology({ grades, onChange, onNext, onBack }: Step3Props) {
  const [newGradeName, setNewGradeName] = useState("");
  const [newGradeCode, setNewGradeCode] = useState("");

  const applyPreset = (preset: GradeConfig[]) => {
    onChange([...preset]);
  };

  const addSectionToGrade = (gradeIndex: number) => {
    const grade = grades[gradeIndex];
    const nextChar = String.fromCharCode(65 + grade.sections.length); // A, B, C, D...
    const updatedGrades = [...grades];
    updatedGrades[gradeIndex] = {
      ...grade,
      sections: [...grade.sections, nextChar],
    };
    onChange(updatedGrades);
  };

  const removeSectionFromGrade = (gradeIndex: number, sectionIndex: number) => {
    const grade = grades[gradeIndex];
    if (grade.sections.length <= 1) return; // Keep at least one section
    const updatedGrades = [...grades];
    updatedGrades[gradeIndex] = {
      ...grade,
      sections: grade.sections.filter((_, idx) => idx !== sectionIndex),
    };
    onChange(updatedGrades);
  };

  const removeGrade = (gradeIndex: number) => {
    if (grades.length <= 1) return;
    onChange(grades.filter((_, idx) => idx !== gradeIndex));
  };

  const handleAddGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGradeName.trim()) return;
    const code = newGradeCode.trim() || newGradeName.replace(/[^0-9a-zA-Z]/g, "");
    const newGrade: GradeConfig = {
      name: newGradeName.trim(),
      code,
      level_order: grades.length + 1,
      sections: ["A", "B"],
      capacity_per_section: 35,
    };
    onChange([...grades, newGrade]);
    setNewGradeName("");
    setNewGradeCode("");
  };

  const totalClasses = grades.reduce((acc, g) => acc + g.sections.length, 0);
  const totalCapacity = grades.reduce(
    (acc, g) => acc + g.sections.length * (g.capacity_per_section || 35),
    0
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-black/[0.03] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Step 3 of 6
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Classes & Sections Topology
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Configure grade levels and classroom divisions offered by your campus.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 shrink-0">
            <Users className="w-4 h-4 text-slate-500" />
            <div className="text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Topology</span>
              <strong className="text-slate-900 font-extrabold">
                {grades.length} Grades • {totalClasses} Sections (~{totalCapacity} cap)
              </strong>
            </div>
          </div>
        </div>

        {/* 1-Click Fast Presets */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            1-Click Preset Templates
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => applyPreset(PRESET_K12)}
              className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-left transition-all group"
            >
              <div className="font-bold text-xs text-slate-900 group-hover:text-orange-600 transition-colors">
                Full K-12 Academy
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Kindergarten to Grade 12 (13 Levels)</div>
            </button>

            <button
              type="button"
              onClick={() => applyPreset(PRESET_SECONDARY)}
              className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-left transition-all group"
            >
              <div className="font-bold text-xs text-slate-900 group-hover:text-orange-600 transition-colors">
                Secondary & High (6-12)
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Grades 6 to 12 with 3 sections</div>
            </button>

            <button
              type="button"
              onClick={() => applyPreset(PRESET_PRIMARY)}
              className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-left transition-all group"
            >
              <div className="font-bold text-xs text-slate-900 group-hover:text-orange-600 transition-colors">
                Primary & Elementary (PK-5)
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Pre-K to Grade 5 (7 Levels)</div>
            </button>
          </div>
        </div>

        {/* Grades & Sections List */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Active Grade Levels ({grades.length})
          </label>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {grades.map((grade, gIdx) => (
              <div
                key={gIdx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-800 shadow-xs shrink-0">
                    {grade.code}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{grade.name}</h4>
                    <span className="text-[11px] text-slate-400">
                      Code: <code className="font-mono text-slate-600 font-bold">{grade.code}</code>
                    </span>
                  </div>
                </div>

                {/* Sections & Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200">
                    {grade.sections.map((sec, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-800 flex items-center gap-1"
                      >
                        Section {sec}
                        {grade.sections.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSectionFromGrade(gIdx, sIdx)}
                            className="hover:text-rose-600 transition-colors ml-0.5"
                            title="Remove section"
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}

                    <button
                      type="button"
                      onClick={() => addSectionToGrade(gIdx)}
                      className="px-2 py-1 rounded-lg text-xs font-bold text-orange-600 hover:bg-orange-50 transition-colors flex items-center gap-0.5"
                      title="Add Section"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeGrade(gIdx)}
                    disabled={grades.length <= 1}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-30"
                    title="Delete Grade Level"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Custom Grade Form */}
        <form
          onSubmit={handleAddGrade}
          className="p-3.5 rounded-2xl bg-slate-100/80 border border-slate-200/80 flex flex-col sm:flex-row items-center gap-2"
        >
          <input
            type="text"
            value={newGradeName}
            onChange={(e) => setNewGradeName(e.target.value)}
            placeholder="Add custom grade (e.g. Advanced Diploma)"
            className="flex-1 w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
          <input
            type="text"
            value={newGradeCode}
            onChange={(e) => setNewGradeCode(e.target.value)}
            placeholder="Code (e.g. AD)"
            className="w-full sm:w-28 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Grade
          </button>
        </form>
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
          type="button"
          onClick={onNext}
          variant="primary"
          size="lg"
          className="px-8 shadow-md"
        >
          Next: ID Numbering Scheme →
        </Button>
      </div>
    </div>
  );
}
