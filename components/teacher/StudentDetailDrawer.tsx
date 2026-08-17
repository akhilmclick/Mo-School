"use client";

import React from "react";
import { Student, Guardian, GuardianStudent } from "@/lib/types";
import { Modal } from "../ui/Modal";
import { Calendar, MapPin, Hash, Phone, Mail, User, ShieldCheck } from "lucide-react";

interface StudentDetailDrawerProps {
  student: Student | null;
  onClose: () => void;
  guardian: Guardian | null;
  guardianRelationship?: string;
}

export function StudentDetailDrawer({
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
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-50/70 to-slate-50 border border-indigo-100/60">
          <img
            src={student.photo_url}
            alt={student.full_name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm"
          />
          <div>
            <h4 className="text-base font-extrabold text-slate-900">{student.full_name}</h4>
            <div className="text-xs text-slate-500 font-mono mt-0.5">ID: {student.student_id}</div>
            <div className="text-[11px] text-indigo-700 font-semibold mt-1">
              Admission No: {student.admission_number}
            </div>
          </div>
        </div>

        {/* Academic & Personal Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-slate-400 font-medium uppercase text-[10px]">Date of Birth</div>
            <div className="font-semibold text-slate-800 mt-0.5">{formatDob(student.date_of_birth)}</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-slate-400 font-medium uppercase text-[10px]">Class & Section</div>
            <div className="font-semibold text-slate-800 mt-0.5">
              Grade {student.class} — Section {student.section}
            </div>
          </div>

          <div className="sm:col-span-2 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-slate-400 font-medium uppercase text-[10px]">Residential Address</div>
            <div className="font-semibold text-slate-800 mt-0.5 flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>{student.address}</span>
            </div>
          </div>
        </div>

        {/* Guardian Emergency Contact Section */}
        <div className="pt-2 border-t border-slate-100">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-indigo-600" />
            Guardian / Emergency Contact
          </h5>

          {guardian ? (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">{guardian.full_name}</span>
                <span className="text-[10px] font-semibold uppercase bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full capitalize">
                  {guardianRelationship}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 text-xs text-slate-600 pt-1">
                <a
                  href={`tel:${guardian.phone}`}
                  className="flex items-center gap-1.5 text-indigo-600 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {guardian.phone}
                </a>
                <span className="hidden sm:inline text-slate-300">•</span>
                <a
                  href={`mailto:${guardian.email}`}
                  className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {guardian.email}
                </a>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400 p-3 bg-slate-50 rounded-2xl text-center">
              No linked guardian record found.
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#111827] text-white rounded-2xl text-xs font-semibold hover:bg-black transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
