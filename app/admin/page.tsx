"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { AdminHero } from "@/components/admin/AdminHero";
import { AdminNavigation, AdminTab } from "@/components/admin/AdminNavigation";
import { StudentManager } from "@/components/admin/StudentManager";
import { TeacherManager } from "@/components/admin/TeacherManager";
import { NoticesManager } from "@/components/admin/NoticesManager";
import { AttendanceOverview } from "@/components/admin/AttendanceOverview";
import { BottomNav, NavTab } from "@/components/ui/BottomNav";
import { AttendanceRecord } from "@/lib/types";

export default function AdminDashboardPage() {
  const {
    user,
    isLoading,
    students,
    teachers,
    teacherAssignments,
    attendance,
    notices,
    addStudent,
    addTeacher,
    postNotice,
    deleteNotice,
  } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/");
      } else if (!user.roles.includes("admin")) {
        router.push(`/${user.activeRole}`);
      }
    }
  }, [user, isLoading, router]);

  if (!user || !user.roles.includes("admin")) return null;

  // Calculate today's attendance rate
  const today = new Date().toISOString().split("T")[0];
  const todayRecords = attendance.filter((a: AttendanceRecord) => a.date === today);
  const presentRecords = todayRecords.filter((a: AttendanceRecord) => a.status === "present" || a.status === "late");
  const todayAttendancePercent =
    todayRecords.length > 0
      ? Math.round((presentRecords.length / todayRecords.length) * 100)
      : 96;


  // Map admin tab to bottom nav tab for mobile
  const mapAdminTabToNav = (tab: AdminTab): NavTab => {
    if (tab === "dashboard") return "home";
    if (tab === "students") return "students";
    if (tab === "teachers") return "teachers";
    if (tab === "notices") return "notices";
    return "home";
  };

  const handleMobileNavChange = (navTab: NavTab) => {
    if (navTab === "home") setActiveTab("dashboard");
    else if (navTab === "students") setActiveTab("students");
    else if (navTab === "teachers") setActiveTab("teachers");
    else if (navTab === "notices") setActiveTab("notices");
  };

  return (
    <div className="min-h-screen bg-[#F6F7FB] flex">
      {/* Desktop Sidebar */}
      <AdminNavigation activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto pb-28 lg:pb-12 space-y-6">
        {/* KPI Overview Hero */}
        <AdminHero
          totalStudents={students.length}
          totalTeachers={teachers.length}
          todayAttendancePercent={todayAttendancePercent}
          totalNotices={notices.length}
        />

        {/* Dynamic Tab Views */}
        {activeTab === "dashboard" && (
          <div className="space-y-6 animate-fade-in">
            <AttendanceOverview students={students} attendance={attendance} />
            <NoticesManager
              notices={notices}
              onPostNotice={postNotice}
              onDeleteNotice={deleteNotice}
            />
            <StudentManager students={students} onAddStudent={addStudent} />
          </div>
        )}

        {activeTab === "students" && (
          <div className="space-y-6 animate-fade-in">
            <StudentManager students={students} onAddStudent={addStudent} />
          </div>
        )}

        {activeTab === "teachers" && (
          <div className="space-y-6 animate-fade-in">
            <TeacherManager
              teachers={teachers}
              assignments={teacherAssignments}
              onAddTeacher={addTeacher}
            />
          </div>
        )}

        {activeTab === "notices" && (
          <div className="space-y-6 animate-fade-in">
            <NoticesManager
              notices={notices}
              onPostNotice={postNotice}
              onDeleteNotice={deleteNotice}
            />
          </div>
        )}

        {activeTab === "attendance" && (
          <div className="space-y-6 animate-fade-in">
            <AttendanceOverview students={students} attendance={attendance} />
          </div>
        )}
      </main>

      {/* Mobile Floating Bottom Nav for smaller screens */}
      <div className="lg:hidden">
        <BottomNav
          activeTab={mapAdminTabToNav(activeTab)}
          onChangeTab={handleMobileNavChange}
          role="admin"
        />
      </div>
    </div>
  );
}
