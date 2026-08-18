"use client";

import React from "react";
import { Layers, Users, Shield, Bell, CalendarCheck, LogOut } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

export type AdminTab = "dashboard" | "students" | "teachers" | "notices" | "attendance";

interface AdminNavigationProps {
  activeTab: AdminTab;
  onChangeTab: (tab: AdminTab) => void;
}

export function AdminNavigation({ activeTab, onChangeTab }: AdminNavigationProps) {
  const { logout, user, school } = useAuth();
  const router = useRouter();

  const navItems = [
    { id: "dashboard" as AdminTab, label: "Overview", icon: Layers },
    { id: "students" as AdminTab, label: "Students", icon: Users },
    { id: "teachers" as AdminTab, label: "Teachers", icon: Shield },
    { id: "notices" as AdminTab, label: "Notices", icon: Bell },
    { id: "attendance" as AdminTab, label: "Attendance", icon: CalendarCheck },
  ];

  const brandInitial = school?.name ? school.name[0] : "A";

  return (
    <div className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 p-5 shrink-0 min-h-screen sticky top-0">
      {/* Brand Header */}
      <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
        <div className="w-10 h-10 rounded-2xl bg-[#111827] text-white flex items-center justify-center font-black text-lg shadow-sm">
          {brandInitial}
        </div>
        <div className="min-w-0">
          <h2 className="font-extrabold text-sm text-slate-900 leading-tight truncate">
            {school?.name || "Aura Crest"}
          </h2>
          <span className="text-[11px] text-slate-400 font-medium">Administration Hub</span>
        </div>
      </div>


      {/* Nav List */}
      <div className="py-6 space-y-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-xs transition-all ${
                isActive
                  ? "bg-[#111827] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* User Info & Logout */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
            {user?.full_name?.charAt(0) || "A"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-900 truncate">
              {user?.full_name || "Administrator"}
            </div>
            <div className="text-[10px] text-slate-400 truncate">{user?.email}</div>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
