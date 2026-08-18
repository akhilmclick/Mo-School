"use client";

import React, { useState } from "react";
import { Student } from "@/lib/types";
import { Search, Plus, UserPlus, Filter, Hash, MapPin, Calendar, CheckCircle2, User } from "lucide-react";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";

interface StudentManagerProps {
  students: Student[];
  onAddStudent: (
    studentData: Omit<Student, "id" | "created_at">,
    guardianData?: { full_name: string; phone: string; email: string; relationship: string }
  ) => void;
}

export function StudentManager({ students, onAddStudent }: StudentManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [studentClass, setStudentClass] = useState("10");
  const [section, setSection] = useState("A");
  const [sequence, setSequence] = useState("025");
  const [dob, setDob] = useState("2010-05-15");
  const [admissionNumber, setAdmissionNumber] = useState(`ADM-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [address, setAddress] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  // Optional Guardian Info
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [guardianRelationship, setGuardianRelationship] = useState("mother");

  // Dynamic Student ID generator format: YEAR-CLASSSECTION-SEQUENCE
  const generatedStudentId = `2026-${studentClass}${section}-${sequence.padStart(3, "0")}`;

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.admission_number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter === "all" || s.class === classFilter;
    return matchesSearch && matchesClass;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    onAddStudent(
      {
        student_id: generatedStudentId,
        full_name: fullName.trim(),
        date_of_birth: dob,
        class: studentClass,
        section,
        admission_number: admissionNumber,
        address: address.trim() || "Springfield District",
        photo_url: photoUrl.trim() || undefined,
      },
      guardianEmail.trim()
        ? {
            full_name: guardianName.trim() || `${fullName.split(" ")[0]}'s Parent`,
            phone: guardianPhone.trim() || "+1 (555) 000-0000",
            email: guardianEmail.trim(),
            relationship: guardianRelationship,
          }
        : undefined
    );

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsAddModalOpen(false);
      // Reset form
      setFullName("");
      setAddress("");
      setPhotoUrl("");
      setGuardianName("");
      setGuardianEmail("");
      setGuardianPhone("");
    }, 1200);
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-card border border-black/[0.03] space-y-4 sm:space-y-5">
      {/* Header with Search and Add Student Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">Manage Students Directory</h3>
          <p className="text-xs text-slate-500">Search, inspect and enroll school students</p>
        </div>

        <Button
          onClick={() => setIsAddModalOpen(true)}
          variant="primary"
          size="md"
          icon={<UserPlus className="w-4 h-4" />}
          className="w-full sm:w-auto justify-center shadow-sm"
        >
          Add Student
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student name, ID or admission no..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none"
          >
            <option value="all">All Classes</option>
            <option value="10">Grade 10</option>
            <option value="9">Grade 9</option>
            <option value="8">Grade 8</option>
            <option value="7">Grade 7</option>
          </select>
        </div>
      </div>

      {/* MOBILE VIEW: Touch-Friendly Card List (visible on small screens) */}
      <div className="block md:hidden space-y-2.5">
        {filteredStudents.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No students found matching your search.
          </div>
        ) : (
          filteredStudents.map((s) => (
            <div
              key={s.id}
              className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={s.photo_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                    alt={s.full_name}
                    className="w-10 h-10 rounded-2xl object-cover border border-black/5 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 truncate">{s.full_name}</h4>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold block">
                      {s.student_id}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="bg-slate-900 text-white font-bold px-2 py-0.5 rounded-lg text-[10px]">
                    {s.class}-{s.section}
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full text-[9px] border border-emerald-200/60">
                    Active
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/50 flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-mono">Adm: {s.admission_number}</span>
                <span>DOB: {s.date_of_birth}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP VIEW: Clean Table (visible on md+ screens) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
              <th className="pb-3 px-2">Student</th>
              <th className="pb-3 px-2">Student ID</th>
              <th className="pb-3 px-2">Class</th>
              <th className="pb-3 px-2">Admission No</th>
              <th className="pb-3 px-2">DOB</th>
              <th className="pb-3 px-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={s.photo_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                      alt={s.full_name}
                      className="w-9 h-9 rounded-2xl object-cover border border-black/5 shrink-0"
                    />
                    <div>
                      <div className="font-bold text-slate-900">{s.full_name}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[160px]">{s.address}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 font-mono font-semibold text-slate-700">{s.student_id}</td>
                <td className="py-3 px-2">
                  <span className="bg-slate-100 font-bold px-2 py-0.5 rounded-lg text-slate-800 text-[11px]">
                    {s.class}-{s.section}
                  </span>
                </td>
                <td className="py-3 px-2 font-mono text-slate-500">{s.admission_number}</td>
                <td className="py-3 px-2 text-slate-500">{s.date_of_birth}</td>
                <td className="py-3 px-2 text-right">
                  <span className="bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full text-[10px]">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Student Modal Form */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Enroll New Student"
        subtitle="Register a new student and generate their academic identifier"
        maxWidth="lg"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">
                Generated Student ID
              </span>
              <strong className="text-slate-900 font-mono text-sm">{generatedStudentId}</strong>
            </div>
            <span className="text-[11px] text-slate-500 bg-white px-2.5 py-1 rounded-xl border border-slate-200">
              Format: YEAR-CLASS-SEQ
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Alexander Wright"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Class *
              </label>
              <select
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none"
              >
                <option value="10">10</option>
                <option value="9">9</option>
                <option value="8">8</option>
                <option value="7">7</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Section *
              </label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Roll Seq *
              </label>
              <input
                type="text"
                value={sequence}
                onChange={(e) => setSequence(e.target.value)}
                placeholder="025"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Permanent Admission No *
              </label>
              <input
                type="text"
                required
                value={admissionNumber}
                onChange={(e) => setAdmissionNumber(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Residential Address *
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. 504 Willow Boulevard, Springfield"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none"
            />
          </div>

          {/* Linked Parent Information */}
          <div className="pt-2 border-t border-slate-100">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Guardian Linkage (Optional)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <input
                type="text"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                placeholder="Guardian Full Name"
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
              />
              <input
                type="email"
                value={guardianEmail}
                onChange={(e) => setGuardianEmail(e.target.value)}
                placeholder="Guardian Email"
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
              />
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
              {isSuccess ? "Enrolled Successfully!" : "Save Student"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
