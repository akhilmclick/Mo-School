"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { Role } from "@/lib/types";
import { Users, GraduationCap, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function RoleSelectPage() {
  const { user, switchRole, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (!user) return null;

  const handleSelectRole = (role: Role) => {
    switchRole(role);
    router.push(`/${role}`);
  };

  const roleCards = [
    {
      role: "teacher" as Role,
      title: "Continue as Teacher",
      subtitle: "Access classroom rosters, mark daily attendance, and post student announcements.",
      icon: GraduationCap,
      color: "from-indigo-600 to-indigo-800",
      bgBadge: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-800/60",
      badgeText: "Faculty Portal",
    },
    {
      role: "parent" as Role,
      title: "Continue as Parent",
      subtitle: "Review your children's attendance history, school notices, and academic profile.",
      icon: HeartHandshake,
      color: "from-[#FF6547] to-[#FF8866]",
      bgBadge: "bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-200/60 dark:border-orange-800/60",
      badgeText: "Parent Portal",
    },
    {
      role: "admin" as Role,
      title: "Continue as Admin",
      subtitle: "Full administrative controls across students, teachers, notices, and analytics.",
      icon: ShieldCheck,
      color: "from-slate-800 to-slate-950 dark:from-slate-700 dark:to-slate-900",
      bgBadge: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700",
      badgeText: "Administrator",
    },
  ];

  // Filter only roles that the user holds
  const availableRoleCards = roleCards.filter((c) => user.roles.includes(c.role));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3F4F6] via-[#F8F9FA] to-[#ECEEF2] dark:from-[#0B0F17] dark:via-[#111827] dark:to-[#0B0F17] flex items-center justify-center p-4 sm:p-6 relative transition-colors duration-200">
      {/* Top right theme switcher */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle size="sm" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold mb-3 shadow-sm">
            Multi-Role Account Detected
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Welcome, {user.full_name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Your account is linked to multiple roles in the school system. Please choose your desired workspace for this session:
          </p>
        </div>

        <div className="space-y-3.5">
          {availableRoleCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.role}
                onClick={() => handleSelectRole(card.role)}
                className="w-full text-left bg-white/95 dark:bg-[#111827] backdrop-blur-md rounded-3xl p-5 shadow-card border border-black/[0.04] dark:border-white/10 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all group relative overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shrink-0 shadow-sm`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${card.bgBadge}`}>
                        {card.badgeText}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all flex items-center font-semibold">
                        Enter <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-slate-950 dark:group-hover:text-white">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-center mt-6 text-xs text-slate-400 dark:text-slate-500">
          You can toggle between roles at any time from the top navigation switch.
        </div>
      </div>
    </div>
  );
}
