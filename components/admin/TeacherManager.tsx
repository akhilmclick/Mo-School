"use client";

import React, { useState } from "react";
import { Teacher, TeacherClassAssignment } from "@/lib/types";
import { UserPlus, Plus, Mail, Phone, BookOpen, CheckCircle2, Shield } from "lucide-react";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";

interface TeacherManagerProps {
  teachers: Teacher[];
  assignments: TeacherClassAssignment[];
  onAddTeacher: (
    teacherData: Omit<Teacher, "id" | "created_at">,
    assignments: { class: string; section: string }[]
  ) => void;
}

export function TeacherManager({ teachers, assignments, onAddTeacher }: TeacherManagerProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subjectsText, setSubjectsText] = useState("Biology, General Science");
  const [assignedClass, setAssignedClass] = useState("10");
  const [assignedSection, setAssignedSection] = useState("A");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    const subjects = subjectsText
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    onAddTeacher(
      {
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || "+1 (555) 000-0000",
        subjects,
      },
      [{ class: assignedClass, section: assignedSection }]
    );

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsAddModalOpen(false);
      setFullName("");
      setEmail("");
      setPhone("");
    }, 1200);
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-card border border-black/[0.03] space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">Faculty & Teachers Directory</h3>
          <p className="text-xs text-slate-500">Manage teaching staff and classroom assignments</p>
        </div>

        <Button
          onClick={() => setIsAddModalOpen(true)}
          variant="primary"
          size="md"
          icon={<UserPlus className="w-4 h-4" />}
          className="w-full sm:w-auto justify-center shadow-sm"
        >
          Add Teacher
        </Button>
      </div>

      {/* Teachers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {teachers.map((teacher) => {
          const teacherAssigned = assignments.filter((a) => a.teacher_id === teacher.id);
          return (
            <div
              key={teacher.id}
              className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-100">
                    {teacher.full_name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{teacher.full_name}</h4>
                    <span className="text-[11px] text-slate-500 truncate block">{teacher.email}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60 shrink-0">
                  {teacherAssigned.length} Classes
                </span>
              </div>

              {/* Subjects */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {teacher.subjects.map((sub) => (
                  <span
                    key={sub}
                    className="bg-white text-slate-700 border border-slate-200 text-[10px] font-semibold px-2 py-0.5 rounded-lg"
                  >
                    {sub}
                  </span>
                ))}
              </div>

              {/* Assigned Classes */}
              <div className="pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px] font-medium">Assigned:</span>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {teacherAssigned.map((a, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-900 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-md"
                    >
                      {a.class}-{a.section}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Teacher Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Faculty Member"
        subtitle="Create teacher profile and assign their initial classroom roster"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Dr. Eleanor Gray"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teacher@school.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Phone Number *
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Subjects (comma separated)
            </label>
            <input
              type="text"
              value={subjectsText}
              onChange={(e) => setSubjectsText(e.target.value)}
              placeholder="Mathematics, Physics, Geometry"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Class & Section Assignment
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-medium">Grade</span>
                <select
                  value={assignedClass}
                  onChange={(e) => setAssignedClass(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 mt-1"
                >
                  <option value="10">Grade 10</option>
                  <option value="9">Grade 9</option>
                  <option value="8">Grade 8</option>
                  <option value="7">Grade 7</option>
                </select>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase font-medium">Section</span>
                <select
                  value={assignedSection}
                  onChange={(e) => setAssignedSection(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 mt-1"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 px-3 py-2"
            >
              Cancel
            </button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={isSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4" />}
            >
              {isSuccess ? "Teacher Added!" : "Save Teacher"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
