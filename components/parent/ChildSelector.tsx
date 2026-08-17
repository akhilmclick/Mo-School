"use client";

import React from "react";
import { Student } from "@/lib/types";
import { User, Sparkles } from "lucide-react";

interface ChildSelectorProps {
  childrenList: Student[];
  activeChildId: string | null;
  onSelectChild: (id: string) => void;
}

export function ChildSelector({
  childrenList,
  activeChildId,
  onSelectChild,
}: ChildSelectorProps) {
  if (childrenList.length <= 1) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          Select Student ({childrenList.length} Linked)
        </h3>
        <span className="text-[11px] text-slate-400">Tap to switch view</span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar -mx-1 px-1">
        {childrenList.map((child) => {
          const isActive = child.id === activeChildId;
          return (
            <button
              key={child.id}
              onClick={() => onSelectChild(child.id)}
              className={`flex items-center gap-3.5 p-3 rounded-2xl transition-all duration-200 shrink-0 text-left ${
                isActive
                  ? "bg-white shadow-[0_8px_24px_rgba(255,101,71,0.15)] ring-2 ring-[#FF6547] border-transparent"
                  : "bg-white/80 hover:bg-white shadow-card border border-black/[0.04] opacity-80 hover:opacity-100"
              }`}
              style={{ minWidth: "220px" }}
            >
              <div className="relative">
                {child.photo_url ? (
                  <img
                    src={child.photo_url}
                    alt={child.full_name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                    {child.full_name.charAt(0)}
                  </div>
                )}
                {isActive && (
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FF6547] text-white rounded-full flex items-center justify-center text-[9px] font-bold ring-2 ring-white">
                    ✓
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <div className="text-sm font-bold text-slate-900 truncate">
                  {child.full_name}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
                  <span className="bg-slate-100 px-2 py-0.5 rounded-md text-[10px] font-semibold text-slate-700">
                    Grade {child.class}-{child.section}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">
                  {child.student_id}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
