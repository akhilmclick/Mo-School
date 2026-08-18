"use client";

import React, { useState } from "react";
import { Notice, NoticeAcknowledgment } from "@/lib/types";
import { useAuth } from "@/lib/context/AuthContext";
import { Bell, Plus, Trash2, Calendar, User, ShieldCheck, Users, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { PostNoticeModal } from "../teacher/PostNoticeModal";

interface NoticesManagerProps {
  notices: Notice[];
  onPostNotice: (notice: {
    title: string;
    body: string;
    target_class?: string | null;
    target_section?: string | null;
    requires_acknowledgment?: boolean;
  }) => void;
  onDeleteNotice: (id: string) => void;
}

export function NoticesManager({
  notices,
  onPostNotice,
  onDeleteNotice,
}: NoticesManagerProps) {
  const { getNoticeAcknowledgmentStats } = useAuth();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedAuditNotice, setSelectedAuditNotice] = useState<Notice | null>(null);

  const formatNoticeDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return isoStr;
    }
  };

  const formatTimestamp = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return isoStr;
    }
  };

  const auditStats = selectedAuditNotice
    ? getNoticeAcknowledgmentStats(selectedAuditNotice.id)
    : null;

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-4 sm:p-6 shadow-card border border-black/[0.03] dark:border-white/10 space-y-4 sm:space-y-5 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">School Notices & Circulars</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Publish, manage, and track parental acknowledgment rates</p>
        </div>

        <Button
          onClick={() => setIsPostModalOpen(true)}
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4" />}
          className="w-full sm:w-auto justify-center shadow-sm"
        >
          New Notice
        </Button>
      </div>

      {/* Notices List */}
      <div className="space-y-3">
        {notices.map((notice) => {
          const stats = getNoticeAcknowledgmentStats(notice.id);
          const requiresAck = notice.requires_acknowledgment !== false;

          return (
            <div
              key={notice.id}
              className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      notice.target_class
                        ? "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300"
                        : "bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300"
                    }`}
                  >
                    {notice.target_class
                      ? `Class ${notice.target_class}${notice.target_section ? `-${notice.target_section}` : ""}`
                      : "School-Wide"}
                  </span>

                  <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatNoticeDate(notice.created_at)}
                  </span>

                  {/* Acknowledgment Rate Pill */}
                  {requiresAck ? (
                    <button
                      onClick={() => setSelectedAuditNotice(notice)}
                      className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors flex items-center gap-1"
                    >
                      <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      {stats.acknowledgedCount} Acknowledged ({stats.percentage}%)
                    </button>
                  ) : (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      Informational
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{notice.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1">{notice.body}</p>
                <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>Author: {notice.author_name || "Administration"}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 dark:border-slate-700/60 justify-between sm:justify-end">
                {requiresAck && (
                  <button
                    onClick={() => setSelectedAuditNotice(notice)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-xs flex items-center gap-1.5"
                  >
                    <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    Audit Log
                  </button>
                )}

                <button
                  onClick={() => onDeleteNotice(notice.id)}
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
                  title="Delete Notice"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>


      {/* Post Notice Modal */}
      <PostNoticeModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSubmit={onPostNotice}
        availableClasses={[
          { class: "10", section: "A" },
          { class: "10", section: "B" },
          { class: "9", section: "A" },
          { class: "8", section: "A" },
          { class: "7", section: "B" },
        ]}
        isTeacher={false}
      />

      {/* Acknowledgment Audit Log Modal */}
      <Modal
        isOpen={!!selectedAuditNotice}
        onClose={() => setSelectedAuditNotice(null)}
        title="Notice Acknowledgment Audit Log"
        subtitle={selectedAuditNotice?.title}
        maxWidth="lg"
      >
        {selectedAuditNotice && auditStats && (
          <div className="space-y-4 pt-1 text-xs">
            {/* KPI Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Receipt Compliance Rate
                </span>
                <div className="text-lg sm:text-xl font-black">{auditStats.percentage}% Acknowledged</div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-400">
                  {auditStats.acknowledgedCount} Confirmed
                </span>
                <div className="text-[10px] text-slate-400">
                  Target: {auditStats.totalTargetStudents} students
                </div>
              </div>
            </div>

            {/* Acknowledgment Records Table */}
            <div>
              <h5 className="font-bold text-slate-900 text-xs mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Stored Supabase Acknowledgments ({auditStats.acknowledgments.length})
              </h5>

              {auditStats.acknowledgments.length === 0 ? (
                <div className="p-6 bg-slate-50 rounded-2xl text-center text-slate-400">
                  No parent acknowledgments logged yet for this notice.
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {auditStats.acknowledgments.map((ack) => (
                    <div
                      key={ack.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2"
                    >
                      <div>
                        <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          {ack.user_name || "Parent / Guardian"}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Student: <strong>{ack.student_name || "Linked Child"}</strong>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {formatTimestamp(ack.acknowledged_at)}
                        </span>
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md mt-0.5 inline-block">
                          Verified Receipt
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedAuditNotice(null)}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#111827] text-white rounded-2xl text-xs font-semibold hover:bg-black"
              >
                Close Audit
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
