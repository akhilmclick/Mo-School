"use client";

import React from "react";
import { Student, Guardian, GuardianStudent } from "@/lib/types";
import { Modal } from "../ui/Modal";
import { Calendar, MapPin, Hash, Phone, Mail, User, ShieldCheck } from "lucide-react";

interface StudentDetailDrawerProps {
  isOpen?: boolean;
  student: Student | null;
  onClose: () => void;
  guardian: Guardian | null;
  guardianRelationship?: string;
}

export function StudentDetailDrawer({
  isOpen,
  student,
  onClose,
  guardian,
  guardianRelationship = "guardian",
}: StudentDetailDrawerProps) {
  if (!student) return null;


  const formatDob = (dobStr: string) => {
    try {
      const d = new Date(dobStr + "T00:00:00");
      return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    } catch {
      return dobStr;
    }
  };

  return (
    <Modal
      isOpen={!!student}
      onClose={onClose}
      title="Student Details & Contact"
      subtitle={`Enrolled in Grade ${student.class}-${student.section}`}
    >
      <div className="space-y-4 pt-1">
        {/* Student Avatar Header */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-50/70 to-slate-50 dark:from-indigo-950/40 dark:to-slate-800/60 border border-indigo-100/60 dark:border-indigo-800/40">
          <img
            src={student.photo_url}
            alt={student.full_name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white dark:border-slate-700 shadow-sm"
          />
          <div>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white">{student.full_name}</h4>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">ID: {student.student_id}</div>
            <div className="text-[11px] text-indigo-700 dark:text-indigo-300 font-semibold mt-1">
              Admission No: {student.admission_number}
            </div>
          </div>
        </div>

        {/* Academic & Personal Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700">
            <div className="text-slate-400 dark:text-slate-500 font-medium uppercase text-[10px]">Date of Birth</div>
            <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{formatDob(student.date_of_birth)}</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700">
            <div className="text-slate-400 dark:text-slate-500 font-medium uppercase text-[10px]">Class & Section</div>
            <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
              Grade {student.class} — Section {student.section}
            </div>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 text-xs">
          <div className="text-slate-400 dark:text-slate-500 font-medium uppercase text-[10px]">Residential Address</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{student.address}</div>
        </div>

        {/* Guardian Emergency Contact Information */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
          <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Guardian Emergency Contact
          </h5>

          {guardian ? (
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-sm">{guardian.full_name}</span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-md">
                  {guardianRelationship}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-1">
                <a
                  href={`tel:${guardian.phone}`}
                  className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {guardian.phone}
                </a>
                <span className="hidden sm:inline text-slate-300 dark:text-slate-600">•</span>
                <a
                  href={`mailto:${guardian.email}`}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {guardian.email}
                </a>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 text-xs text-slate-400 dark:text-slate-500">
              No registered guardian contact linked for this student record.
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#111827] dark:bg-slate-100 hover:bg-black text-white dark:text-slate-900 rounded-2xl text-xs font-semibold transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
}
