"use client";

import React from "react";
import { Users } from "lucide-react";

interface ClassSelectorProps {
  assignedClasses: { class: string; section: string }[];
  selectedClass: { class: string; section: string };
  onSelectClass: (c: { class: string; section: string }) => void;
}

export function ClassSelector({
  assignedClasses,
  selectedClass,
  onSelectClass,
}: ClassSelectorProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1 shrink-0">
        Class:
      </span>
      {assignedClasses.map((c) => {
        const isSelected =
          c.class === selectedClass.class && c.section === selectedClass.section;
        return (
          <button
            key={`${c.class}-${c.section}`}
            onClick={() => onSelectClass(c)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 shrink-0 ${
              isSelected
                ? "bg-[#111827] dark:bg-slate-100 text-white dark:text-slate-900 shadow-md scale-[1.02]"
                : "bg-white dark:bg-[#111827] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs"
            }`}
          >
            Grade {c.class} — {c.section}
          </button>
        );
      })}
    </div>
  );
}
