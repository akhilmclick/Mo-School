import React from "react";
import { AttendanceStatus } from "@/lib/types";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "present" | "absent" | "late" | "neutral" | "brand" | "indigo" | "purple";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Badge({ children, variant = "neutral", size = "md", className = "" }: BadgeProps) {
  const variantStyles = {
    present: "bg-emerald-50 text-emerald-700 border border-emerald-200/70",
    absent: "bg-rose-50 text-rose-700 border border-rose-200/70",
    late: "bg-amber-50 text-amber-700 border border-amber-200/70",
    neutral: "bg-slate-100 text-slate-700 border border-slate-200/60",
    brand: "bg-orange-50 text-orange-700 border border-orange-200/70",
    indigo: "bg-indigo-50 text-indigo-700 border border-indigo-200/70",
    purple: "bg-purple-50 text-purple-700 border border-purple-200/70",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5 font-semibold tracking-wide",
    md: "text-xs px-3 py-1 font-medium",
    lg: "text-sm px-3.5 py-1.5 font-medium",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
}

export function AttendanceBadge({ status }: { status: AttendanceStatus }) {
  const labels: Record<AttendanceStatus, string> = {
    present: "Present",
    absent: "Absent",
    late: "Late",
  };

  return (
    <Badge variant={status} size="sm">
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-80" />
      {labels[status]}
    </Badge>
  );
}
