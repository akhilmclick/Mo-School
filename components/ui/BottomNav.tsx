"use client";

import React from "react";
import { Home, CalendarCheck, Bell, User, Users, Shield, Layers } from "lucide-react";

export type NavTab = "home" | "attendance" | "classes" | "notices" | "profile" | "students" | "teachers";

interface BottomNavProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  role: "parent" | "teacher" | "admin";
}

export function BottomNav({ activeTab, onChangeTab, role }: BottomNavProps) {
  const getTabs = () => {
    switch (role) {
      case "parent":
        return [
          { id: "home" as NavTab, label: "Home", icon: Home },
          { id: "attendance" as NavTab, label: "Attendance", icon: CalendarCheck },
          { id: "notices" as NavTab, label: "Notices", icon: Bell },
          { id: "profile" as NavTab, label: "Profile", icon: User },
        ];
      case "teacher":
        return [
          { id: "home" as NavTab, label: "Home", icon: Home },
          { id: "classes" as NavTab, label: "Classes", icon: Users },
          { id: "notices" as NavTab, label: "Notices", icon: Bell },
          { id: "profile" as NavTab, label: "Profile", icon: User },
        ];
      case "admin":
        return [
          { id: "home" as NavTab, label: "Dashboard", icon: Layers },
          { id: "students" as NavTab, label: "Students", icon: Users },
          { id: "teachers" as NavTab, label: "Teachers", icon: Shield },
          { id: "notices" as NavTab, label: "Notices", icon: Bell },
        ];
    }
  };

  const tabs = getTabs();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 max-w-lg mx-auto pointer-events-none">
      <nav className="glass-dock pointer-events-auto rounded-full px-3 py-2 flex items-center justify-around shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-white/60">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-4 rounded-full transition-all duration-200 ${
                isActive
                  ? "bg-[#111827] text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/60"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-white stroke-[2.2]" : "stroke-[1.8]"}`} />
              <span className={`text-[10px] mt-0.5 tracking-tight font-medium ${isActive ? "text-white" : ""}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
