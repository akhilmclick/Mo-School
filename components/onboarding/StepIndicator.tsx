"use client";

import React from "react";
import { Check, Building2, Calendar, LayoutGrid, Hash, ShieldCheck, Rocket } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

const STEPS = [
  { id: 1, title: "Identity", subtitle: "School Profile", icon: Building2 },
  { id: 2, title: "Calendar", subtitle: "Session & Terms", icon: Calendar },
  { id: 3, title: "Topology", subtitle: "Classes & Sections", icon: LayoutGrid },
  { id: 4, title: "ID Rules", subtitle: "Numbering Scheme", icon: Hash },
  { id: 5, title: "Admin", subtitle: "Root Credentials", icon: ShieldCheck },
  { id: 6, title: "Launch", subtitle: "Review & Provision", icon: Rocket },
];

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-card border border-black/[0.03] mb-6">
      <div className="flex items-center justify-between overflow-x-auto pb-1 sm:pb-0 gap-2 sm:gap-4 no-scrollbar">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div
              key={step.id}
              onClick={() => isCompleted && onStepClick && onStepClick(step.id)}
              className={`flex items-center gap-3 shrink-0 transition-all ${
                isCompleted ? "cursor-pointer group" : ""
              }`}
            >
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs transition-all ${
                  isCompleted
                    ? "bg-emerald-500 text-white shadow-sm"
                    : isCurrent
                    ? "bg-slate-900 text-white ring-4 ring-slate-900/10 shadow-md"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[2.5]" /> : <Icon className="w-4 h-4" />}
              </div>

              <div className="hidden md:block text-left">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-xs font-extrabold ${
                      isCurrent
                        ? "text-slate-900"
                        : isCompleted
                        ? "text-emerald-700"
                        : "text-slate-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">{step.subtitle}</p>
              </div>

              {step.id < STEPS.length && (
                <div className="hidden lg:block w-6 h-[2px] bg-slate-200/80 rounded-full mx-1" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
