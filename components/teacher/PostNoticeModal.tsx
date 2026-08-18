"use client";

import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Send, CheckCircle2, ShieldAlert } from "lucide-react";

interface PostNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    body: string;
    target_class?: string | null;
    target_section?: string | null;
    requires_acknowledgment?: boolean;
  }) => void;
  availableClasses: { class: string; section: string }[];
  isTeacher?: boolean;
}

export function PostNoticeModal({
  isOpen,
  onClose,
  onSubmit,
  availableClasses,
  isTeacher = true,
}: PostNoticeModalProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [targetType, setTargetType] = useState<"school" | "class">("school");
  const [selectedClass, setSelectedClass] = useState<string>("10");
  const [selectedSection, setSelectedSection] = useState<string>("A");
  const [requiresAck, setRequiresAck] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    onSubmit({
      title: title.trim(),
      body: body.trim(),
      target_class: targetType === "class" ? selectedClass : null,
      target_section: targetType === "class" ? selectedSection : null,
      requires_acknowledgment: requiresAck,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setTitle("");
      setBody("");
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Post School Announcement / Notice"
      subtitle="Publish an official announcement to students and parents"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {/* Notice Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
            Notice Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Science Lab Field Trip Permission Slips Due"
            className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
          />
        </div>

        {/* Target Audience Picker */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
            Target Audience *
          </label>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              type="button"
              onClick={() => setTargetType("school")}
              className={`p-3 rounded-2xl text-xs font-bold border transition-all text-center ${
                targetType === "school"
                  ? "bg-[#111827] dark:bg-slate-100 text-white dark:text-slate-900 border-[#111827] dark:border-slate-100 shadow-sm"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              School-Wide (All Grades)
            </button>
            <button
              type="button"
              onClick={() => setTargetType("class")}
              className={`p-3 rounded-2xl text-xs font-bold border transition-all text-center ${
                targetType === "class"
                  ? "bg-[#111827] dark:bg-slate-100 text-white dark:text-slate-900 border-[#111827] dark:border-slate-100 shadow-sm"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              Specific Class / Section
            </button>
          </div>

          {/* Conditional Class & Section Selectors */}
          {targetType === "class" && (
            <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 animate-fade-in">
              <div>
                <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Grade / Class
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="10">Grade 10</option>
                  <option value="9">Grade 9</option>
                  <option value="8">Grade 8</option>
                  <option value="7">Grade 7</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Section
                </label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Notice Message Body */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
            Notice Body / Message *
          </label>
          <textarea
            required
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write the full announcement details here..."
            className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all resize-none"
          />
        </div>

        {/* Mandatory Parent Acknowledgment Checkbox Toggle */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-start gap-3">
          <input
            type="checkbox"
            id="requires-ack"
            checked={requiresAck}
            onChange={(e) => setRequiresAck(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded-lg text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600"
          />
          <label htmlFor="requires-ack" className="text-xs cursor-pointer select-none">
            <span className="font-bold text-slate-900 dark:text-white block">
              Require Mandatory Parent Acknowledgment
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
              Parents will see an acknowledgment warning and must click a digital receipt to confirm receipt.
            </span>
          </label>
        </div>

        {/* Modal Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 px-3 py-2"
          >
            Cancel
          </button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            icon={isSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Send className="w-4 h-4" />}
          >
            {isSuccess ? "Published Successfully!" : "Publish Notice"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
