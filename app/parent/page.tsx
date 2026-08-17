"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { ParentHero } from "@/components/parent/ParentHero";
import { ChildSelector } from "@/components/parent/ChildSelector";
import { AttendanceList } from "@/components/parent/AttendanceList";
import { NoticesList } from "@/components/parent/NoticesList";
import { StudentInfoCard } from "@/components/parent/StudentInfoCard";
import { BottomNav, NavTab } from "@/components/ui/BottomNav";
import { Notice, AttendanceRecord } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";

export default function ParentDashboardPage() {
  const {
    user,
    isLoading,
    getParentChildren,
    activeChild,
    activeChildId,
    setActiveChildId,
    getStudentAttendance,
    getRelevantNotices,
  } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [modalNotice, setModalNotice] = useState<Notice | null>(null);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/");
      } else if (!user.roles.includes("parent")) {
        router.push(`/${user.activeRole}`);
      }
    }
  }, [user, isLoading, router]);

  if (!user || !user.roles.includes("parent")) return null;

  const childrenList = getParentChildren(user.id);
  const selectedChild = activeChild || (childrenList.length > 0 ? childrenList[0] : null);

  const attendanceRecords = selectedChild ? getStudentAttendance(selectedChild.id) : [];
  const notices = getRelevantNotices();
  const latestNotice = notices.length > 0 ? notices[0] : null;

  // Calculate monthly attendance % for selected child
  const presentCount = attendanceRecords.filter((r: AttendanceRecord) => r.status === "present").length;
  const lateCount = attendanceRecords.filter((r: AttendanceRecord) => r.status === "late").length;
  const totalRecords = attendanceRecords.length;
  const attendanceRate =
    totalRecords > 0 ? Math.round(((presentCount + lateCount * 0.8) / totalRecords) * 100) : 95;


  return (
    <div className="min-h-screen bg-[#F6F7FB] pb-28 pt-4 sm:pt-6 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Sibling Switcher (if multiple children linked) */}
        <ChildSelector
          childrenList={childrenList}
          activeChildId={activeChildId}
          onSelectChild={(id) => setActiveChildId(id)}
        />

        {/* Tab 1: Home Overview */}
        {(activeTab === "home" || activeTab === "profile") && (
          <>
            <ParentHero
              guardianName={user.full_name}
              activeChild={selectedChild}
              attendanceRate={attendanceRate}
              latestNotice={latestNotice}
              onOpenNotice={(notice) => setModalNotice(notice)}
              onViewAttendance={() => setActiveTab("attendance")}
            />

            {/* If Home tab, show preview of both Attendance and Notices */}
            {activeTab === "home" && (
              <div className="space-y-6">
                <AttendanceList
                  records={attendanceRecords}
                  studentName={selectedChild?.full_name || "Student"}
                />

                <NoticesList
                  notices={notices}
                  studentName={selectedChild?.full_name}
                  studentId={selectedChild?.id}
                />

                <StudentInfoCard student={selectedChild} />
              </div>
            )}

            {/* If Profile tab, focus on Student Info */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <StudentInfoCard student={selectedChild} />
              </div>
            )}
          </>
        )}

        {/* Tab 2: Attendance Focus */}
        {activeTab === "attendance" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-3xl p-5 shadow-card border border-black/[0.03] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Attendance Overview
                </span>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {selectedChild?.full_name}
                </h2>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-emerald-600">{attendanceRate}%</div>
                <span className="text-[10px] text-slate-400 font-medium">Monthly Turnout</span>
              </div>
            </div>

            <AttendanceList
              records={attendanceRecords}
              studentName={selectedChild?.full_name || "Student"}
            />
          </div>
        )}

        {/* Tab 3: Notices Focus */}
        {activeTab === "notices" && (
          <div className="space-y-6 animate-fade-in">
            <NoticesList
              notices={notices}
              studentName={selectedChild?.full_name}
              studentId={selectedChild?.id}
            />
          </div>
        )}

      </div>

      {/* Floating Bottom Nav */}
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} role="parent" />

      {/* Notice Dialog */}
      <Modal
        isOpen={!!modalNotice}
        onClose={() => setModalNotice(null)}
        title={modalNotice?.title || "Notice"}
        subtitle={modalNotice?.target_class ? `Class ${modalNotice.target_class}` : "School-Wide Announcement"}
      >
        <div className="space-y-4 pt-1 text-xs">
          <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-100">
            {modalNotice?.body}
          </p>
          <div className="text-[11px] text-slate-400">
            Issued on: {modalNotice?.created_at ? new Date(modalNotice.created_at).toLocaleDateString() : ""}
          </div>
        </div>
      </Modal>
    </div>
  );
}
