"use client";

import React, { useState } from "react";
import { Notice } from "@/lib/types";
import { useAuth } from "@/lib/context/AuthContext";
import { Bell, Calendar, User, ChevronRight, CheckCircle2, AlertCircle, ShieldCheck, Check } from "lucide-react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

interface NoticesListProps {
  notices: Notice[];
  studentName?: string;
  studentId?: string;
}

export function NoticesList({ notices, studentName, studentId }: NoticesListProps) {
  const { user, isNoticeAcknowledged, getNoticeAcknowledgmentInfo, acknowledgeNotice, activeChild } = useAuth();
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [acknowledgedSuccess, setAcknowledgedSuccess] = useState(false);

  const currentStudentName = studentName || activeChild?.full_name || "Student";
  const currentStudentId = studentId || activeChild?.id;

  const formatNoticeDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return isoStr;
    }
  };

  const formatFullTimestamp = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return isoStr;
    }
  };

  // Count unacknowledged mandatory notices
  const unacknowledgedCount = notices.filter(
    (n) => n.requires_acknowledgment && !isNoticeAcknowledged(n.id, currentStudentId)
  ).length;

  const handleAcknowledge = (noticeId: string) => {
    acknowledgeNotice(noticeId, currentStudentId);
    setAcknowledgedSuccess(true);
    setTimeout(() => {
      setAcknowledgedSuccess(false);
    }, 2500);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-card border border-black/[0.03] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">Announcements & Notices</h3>
          <p className="text-xs text-slate-500">Official circulars, events, and classroom updates</p>
        </div>
        <div className="flex items-center gap-2">
          {unacknowledgedCount > 0 && (
            <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200/70 px-2.5 py-1 rounded-full animate-pulse flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {unacknowledgedCount} Action Required
            </span>
          )}
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {notices.length} Active
          </span>
        </div>
      </div>

      {/* Mandatory Acknowledgment Alert Banner if unacknowledged exist */}
      {unacknowledgedCount > 0 && (
        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3 animate-fade-in">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <h4 className="font-bold text-amber-900">Mandatory Acknowledgments Pending</h4>
            <p className="text-amber-800/90 mt-0.5">
              You have <strong className="text-amber-950">{unacknowledgedCount} notice(s)</strong> that require formal parental acknowledgment on behalf of {currentStudentName}. Please tap to review and acknowledge.
            </p>
          </div>
        </div>
      )}

      {notices.length === 0 ? (
        <div className="py-8 text-center text-slate-400 text-xs">
          No notices posted for your student&apos;s class or school.
        </div>
      ) : (
        <div className="space-y-3">
          {notices.map((notice) => {
            const isAck = isNoticeAcknowledged(notice.id, currentStudentId);
            const ackInfo = isAck ? getNoticeAcknowledgmentInfo(notice.id, currentStudentId) : null;
            const requiresAck = notice.requires_acknowledgment !== false;

            return (
              <div
                key={notice.id}
                onClick={() => setSelectedNotice(notice)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                  requiresAck && !isAck
                    ? "border-amber-200/90 bg-amber-50/30 hover:bg-amber-50/60 shadow-xs"
                    : "border-slate-100 hover:border-slate-300 hover:bg-slate-50/70"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          notice.target_class
                            ? "bg-purple-50 text-purple-700 border border-purple-200/60"
                            : "bg-blue-50 text-blue-700 border border-blue-200/60"
                        }`}
                      >
                        {notice.target_class
                          ? `Class ${notice.target_class}${notice.target_section ? `-${notice.target_section}` : ""}`
                          : "School-Wide"}
                      </span>

                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatNoticeDate(notice.created_at)}
                      </span>

                      {/* Acknowledgment Pill */}
                      {requiresAck && (
                        isAck ? (
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Acknowledged
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 border border-amber-300/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-amber-700" />
                            Acknowledgment Required
                          </span>
                        )
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {notice.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {notice.body}
                    </p>

                    {isAck && ackInfo && (
                      <div className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Acknowledged on {formatNoticeDate(ackInfo.acknowledged_at)}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-2 rounded-xl text-slate-300 group-hover:text-slate-700 group-hover:bg-slate-100 transition-all shrink-0">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Expanded Notice Modal with Mandatory Acknowledgment Section */}
      <Modal
        isOpen={!!selectedNotice}
        onClose={() => setSelectedNotice(null)}
        title={selectedNotice?.title || "Notice Details"}
        subtitle={
          selectedNotice
            ? `Posted on ${formatNoticeDate(selectedNotice.created_at)} ${
                selectedNotice.target_class ? `• Class ${selectedNotice.target_class}` : "• School-Wide"
              }`
            : undefined
        }
        maxWidth="lg"
      >
        {selectedNotice && (
          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <span>
                  Issued by: <strong className="text-slate-800">{selectedNotice.author_name || "Administration"}</strong>
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">
                Ref ID: {selectedNotice.id}
              </span>
            </div>

            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 sm:p-5 rounded-2xl border border-slate-100/80">
              {selectedNotice.body}
            </div>

            {/* MANDATORY ACKNOWLEDGMENT SECTION */}
            {selectedNotice.requires_acknowledgment !== false && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                {isNoticeAcknowledged(selectedNotice.id, currentStudentId) ? (
                  <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="text-xs">
                      <h5 className="font-bold text-emerald-950 flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600" />
                        Notice Formally Acknowledged
                      </h5>
                      <p className="text-emerald-800/90 mt-1">
                        Acknowledged by <strong className="text-emerald-950">{user?.full_name}</strong> on behalf of <strong className="text-emerald-950">{currentStudentName}</strong>.
                      </p>
                      {getNoticeAcknowledgmentInfo(selectedNotice.id, currentStudentId)?.acknowledged_at && (
                        <span className="text-[10px] text-emerald-700 font-mono mt-1 block">
                          Timestamp: {formatFullTimestamp(getNoticeAcknowledgmentInfo(selectedNotice.id, currentStudentId)!.acknowledged_at)} (Stored in database)
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 space-y-3">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-bold text-amber-950 text-xs">
                          Mandatory Parent Acknowledgment Required
                        </h5>
                        <p className="text-xs text-amber-800/90 mt-0.5">
                          School policy requires parents/guardians to explicitly acknowledge receipt and comprehension of this official circular for <strong className="text-amber-950">{currentStudentName}</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <span className="text-[11px] text-amber-700/90 font-medium">
                        Clicking acknowledge records your legal acknowledgment into the school audit log.
                      </span>

                      <Button
                        onClick={() => handleAcknowledge(selectedNotice.id)}
                        variant="primary"
                        size="md"
                        icon={acknowledgedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <ShieldCheck className="w-4 h-4 text-orange-400" />}
                        className="w-full sm:w-auto px-5 whitespace-nowrap shadow-md"
                      >
                        {acknowledgedSuccess ? "Acknowledged!" : "I Acknowledge This Notice"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-semibold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
