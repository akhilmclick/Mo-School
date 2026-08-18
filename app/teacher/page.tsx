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
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LogOut } from "lucide-react";

export default function TeacherDashboardPage() {
  const {
    user,
    isLoading,
    school,
    getTeacherAssignedClasses,
    getClassStudents,
    attendance,
    markAttendance,
    postNotice,
    getRelevantNotices,
    guardians,
    guardianStudents,
    logout,
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
    <div className="min-h-screen bg-[#F6F7FB] dark:bg-[#0B0F17] pb-28 pt-3 sm:pt-6 px-3.5 sm:px-6 transition-colors duration-200">
      <div className="max-w-2xl mx-auto space-y-5 sm:space-y-6">
        {/* Top Header Bar for Teachers */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
              M
            </div>
            <span className="font-extrabold text-xs text-slate-900 dark:text-white">
              {school?.name || "Mo-School"} • Faculty
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle size="sm" />
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

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
          </>
        )}

        {/* Tab 2: Notices Focus */}
        {activeTab === "notices" && (
          <div className="space-y-5 sm:space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Announcements</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Classroom notices and school circulars</p>
              </div>
              <button
                onClick={() => setIsPostNoticeOpen(true)}
                className="px-4 py-2 bg-[#111827] dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl text-xs font-bold shadow-sm"
              >
                + Post Notice
              </button>
            </div>

            <NoticesList notices={notices} />
          </div>
        )}

        {/* Tab 3: Profile Focus */}
        {activeTab === "profile" && (
          <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-card border border-black/[0.03] dark:border-white/10 space-y-4 animate-fade-in transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-xl">
                {user.full_name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{user.full_name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                <span className="inline-block mt-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold px-2 py-0.5 rounded-full text-[10px]">
                  Faculty Member
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="text-slate-400 dark:text-slate-500 uppercase font-semibold text-[10px]">
                Teaching Subjects
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(user.teacherProfile?.subjects || ["Science", "General"]).map((sub) => (
                  <span
                    key={sub}
                    className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium px-2.5 py-1 rounded-xl"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="text-slate-400 dark:text-slate-500 uppercase font-semibold text-[10px]">
                Assigned Classes & Sections
              </div>
              <div className="flex flex-wrap gap-1.5">
                {assignedClasses.map((ac, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-mono font-bold px-2.5 py-1 rounded-xl"
                  >
                    Grade {ac.class}-{ac.section}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Nav */}
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} role="teacher" />

      {/* Student Details Drawer */}
      <StudentDetailDrawer
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        student={selectedStudent}
        guardian={selectedStudentGuardian}
      />

      {/* Post Notice Modal */}
      <PostNoticeModal
        isOpen={isPostNoticeOpen}
        onClose={() => setIsPostNoticeOpen(false)}
        onSubmit={(notice) => postNotice(notice)}
        availableClasses={assignedClasses}
        isTeacher={true}
      />
    </div>
  );
}
