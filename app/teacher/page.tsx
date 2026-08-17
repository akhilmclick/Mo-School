"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { TeacherHero } from "@/components/teacher/TeacherHero";
import { ClassSelector } from "@/components/teacher/ClassSelector";
import { AttendanceRollCall } from "@/components/teacher/AttendanceRollCall";
import { StudentDetailDrawer } from "@/components/teacher/StudentDetailDrawer";
import { PostNoticeModal } from "@/components/teacher/PostNoticeModal";
import { NoticesList } from "@/components/parent/NoticesList";
import { BottomNav, NavTab } from "@/components/ui/BottomNav";
import { Student } from "@/lib/types";

export default function TeacherDashboardPage() {
  const {
    user,
    isLoading,
    getTeacherAssignedClasses,
    getClassStudents,
    attendance,
    markAttendance,
    postNotice,
    getRelevantNotices,
    guardians,
    guardianStudents,
  } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isPostNoticeOpen, setIsPostNoticeOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/");
      } else if (!user.roles.includes("teacher")) {
        router.push(`/${user.activeRole}`);
      }
    }
  }, [user, isLoading, router]);

  const assignedClasses = user ? getTeacherAssignedClasses(user.id) : [];
  const defaultClass = assignedClasses.length > 0 ? assignedClasses[0] : { class: "10", section: "A" };
  const [currentClass, setCurrentClass] = useState<{ class: string; section: string }>(defaultClass);

  useEffect(() => {
    if (assignedClasses.length > 0 && (!currentClass.class || !currentClass.section)) {
      setCurrentClass(assignedClasses[0]);
    }
  }, [assignedClasses, currentClass]);

  if (!user || !user.roles.includes("teacher")) return null;

  const currentClassStudents = getClassStudents(currentClass.class, currentClass.section);
  const notices = getRelevantNotices();

  // Find linked guardian for active student detail modal
  const selectedStudentGuardianLink = selectedStudent
    ? guardianStudents.find((gs) => gs.student_id === selectedStudent.id)
    : null;
  const selectedStudentGuardian = selectedStudentGuardianLink
    ? guardians.find((g) => g.id === selectedStudentGuardianLink.guardian_id) || null
    : null;

  return (
    <div className="min-h-screen bg-[#F6F7FB] pb-28 pt-4 sm:pt-6 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Tab 1: Home / Classes Roll Call */}
        {(activeTab === "home" || activeTab === "classes") && (
          <>
            <TeacherHero
              teacherName={user.full_name}
              subjects={user.teacherProfile?.subjects || ["Science", "General"]}
              assignedClasses={assignedClasses}
              onOpenPostNotice={() => setIsPostNoticeOpen(true)}
              onJumpToAttendance={() => setActiveTab("classes")}
            />

            {/* Class Switcher */}
            <ClassSelector
              assignedClasses={assignedClasses}
              selectedClass={currentClass}
              onSelectClass={(c) => setCurrentClass(c)}
            />

            {/* Fast Roll-Call Attendance Component */}
            <AttendanceRollCall
              currentClass={currentClass}
              students={currentClassStudents}
              existingRecords={attendance}
              onSaveAttendance={(records) => markAttendance(records)}
              onSelectStudent={(student) => setSelectedStudent(student)}
            />

            {/* If on home, show notices preview */}
            {activeTab === "home" && <NoticesList notices={notices} />}
          </>
        )}

        {/* Tab 2: Notices Focus */}
        {activeTab === "notices" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center bg-white p-5 rounded-3xl shadow-card border border-black/[0.03]">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Teacher Notice Board
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  Class & Campus Announcements
                </h2>
              </div>
              <button
                onClick={() => setIsPostNoticeOpen(true)}
                className="bg-[#111827] text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-sm hover:bg-black"
              >
                + Post Notice
              </button>
            </div>

            <NoticesList notices={notices} />
          </div>
        )}

        {/* Tab 3: Profile */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-3xl p-6 shadow-card border border-black/[0.03] space-y-4 animate-fade-in">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-[#4F46E5] text-white flex items-center justify-center font-bold text-xl">
                {user.full_name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">{user.full_name}</h3>
                <p className="text-xs text-slate-500">{user.email}</p>
                <div className="mt-1 flex gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                    Faculty ID: TCH-2026-08
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between">
                <span className="text-slate-400 font-medium">Assigned Classes:</span>
                <span className="font-bold text-slate-800">
                  {assignedClasses.map((a) => `${a.class}-${a.section}`).join(", ")}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between">
                <span className="text-slate-400 font-medium">Subjects Taught:</span>
                <span className="font-bold text-slate-800">
                  {user.teacherProfile?.subjects.join(", ") || "General Science"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Nav */}
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} role="teacher" />

      {/* Student Details & Guardian Contact Drawer */}
      <StudentDetailDrawer
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        guardian={selectedStudentGuardian}
        guardianRelationship={selectedStudentGuardianLink?.relationship}
      />

      {/* Post Notice Modal */}
      <PostNoticeModal
        isOpen={isPostNoticeOpen}
        onClose={() => setIsPostNoticeOpen(false)}
        onSubmit={(noticeData) => postNotice(noticeData)}
        availableClasses={assignedClasses}
        isTeacher={true}
      />
    </div>
  );
}
