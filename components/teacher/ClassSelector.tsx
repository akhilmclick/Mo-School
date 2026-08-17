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
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-indigo-600" />
          My Assigned Classes
        </h3>
        <span className="text-[11px] text-slate-400">Select class to manage</span>
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
        {assignedClasses.map((item) => {
          const isSelected =
            selectedClass.class === item.class && selectedClass.section === item.section;
          return (
            <button
              key={`${item.class}-${item.section}`}
              onClick={() => onSelectClass(item)}
              className={`px-5 py-2.5 rounded-full font-bold text-xs transition-all duration-200 shrink-0 ${
                isSelected
                  ? "bg-[#111827] text-white shadow-md ring-2 ring-[#111827]/20"
                  : "bg-white text-slate-700 hover:bg-slate-50 shadow-card border border-black/[0.04]"
              }`}
            >
              Grade {item.class}-{item.section}
            </button>
          );
        })}
      </div>
    </div>
  );
}
