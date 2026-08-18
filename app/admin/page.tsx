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
import { Layers, Users, Shield, Bell, CalendarCheck, LogOut, Building, Sparkles } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const MOBILE_TABS: { id: AdminTab; label: string; icon: any }[] = [
  { id: "dashboard", label: "Overview", icon: Layers },
  { id: "students", label: "Students", icon: Users },
  { id: "teachers", label: "Teachers", icon: Shield },
  { id: "notices", label: "Notices", icon: Bell },
  { id: "attendance", label: "Attendance", icon: CalendarCheck },
];


export default function AdminDashboardPage() {
  const {
    user,
    isLoading,
    school,
    students,
    teachers,
    teacherAssignments,
    attendance,
    notices,
    addStudent,
    addTeacher,
    postNotice,
    deleteNotice,
    logout,
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
  const presentRecords = todayRecords.filter(
    (a: AttendanceRecord) => a.status === "present" || a.status === "late"
  );
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

  const brandInitial = school?.name ? school.name[0] : "M";

  return (
    <div className="min-h-screen bg-[#F6F7FB] dark:bg-[#0B0F17] flex flex-col lg:flex-row transition-colors duration-200">
      {/* Desktop Sidebar (hidden on mobile) */}
      <AdminNavigation activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* Mobile Top Header (visible only on mobile) */}
      <header className="lg:hidden sticky top-0 z-30 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 py-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-black text-sm shadow-sm shrink-0 border border-white/5">
              {brandInitial}
            </div>
            <div className="min-w-0">
              <h1 className="font-black text-sm text-slate-900 dark:text-white truncate leading-tight">
                {school?.name || "Mo-School"}
              </h1>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">
                Admin Console • {school?.code || "CAMPUS"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle size="sm" />

            <Link
              href="/onboarding"
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Onboard New School"
            >
              <Building className="w-4 h-4 text-orange-500" />
            </Link>

            <button
              onClick={logout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Scrollable Tab Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2.5 pb-0.5 no-scrollbar">
          {MOBILE_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-orange-400 dark:text-orange-600" : "text-slate-400 dark:text-slate-500"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>


      {/* Main Content Area */}
      <main className="flex-1 w-full p-3.5 sm:p-6 lg:p-8 max-w-5xl mx-auto pb-28 lg:pb-12 space-y-5 sm:space-y-6">
        {/* KPI Overview Hero */}
        <AdminHero
          totalStudents={students.length}
          totalTeachers={teachers.length}
          todayAttendancePercent={todayAttendancePercent}
          totalNotices={notices.length}
        />

        {/* Dynamic Tab Views */}
        {activeTab === "dashboard" && (
          <div className="space-y-5 sm:space-y-6 animate-fade-in">
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
          <div className="space-y-5 sm:space-y-6 animate-fade-in">
            <StudentManager students={students} onAddStudent={addStudent} />
          </div>
        )}

        {activeTab === "teachers" && (
          <div className="space-y-5 sm:space-y-6 animate-fade-in">
            <TeacherManager
              teachers={teachers}
              assignments={teacherAssignments}
              onAddTeacher={addTeacher}
            />
          </div>
        )}

        {activeTab === "notices" && (
          <div className="space-y-5 sm:space-y-6 animate-fade-in">
            <NoticesManager
              notices={notices}
              onPostNotice={postNotice}
              onDeleteNotice={deleteNotice}
            />
          </div>
        )}

        {activeTab === "attendance" && (
          <div className="space-y-5 sm:space-y-6 animate-fade-in">
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
