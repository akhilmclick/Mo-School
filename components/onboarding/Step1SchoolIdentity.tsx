"use client";

import React from "react";
import { Building2, Mail, Phone, MapPin, Globe, Sparkles, Image as ImageIcon } from "lucide-react";
import { Button } from "../ui/Button";

interface Step1Props {
  data: {
    name: string;
    code: string;
    email: string;
    phone: string;
    address: string;
    website: string;
    motto: string;
    logo_url?: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
}

export function Step1SchoolIdentity({ data, onChange, onNext }: Step1Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name.trim() || !data.code.trim() || !data.email.trim()) return;
    onNext();
  };

  const handleNameChange = (val: string) => {
    onChange("name", val);
    if (!data.code || data.code.startsWith("SCH-")) {
      // Auto-generate a clean 3-4 letter acronym from school name
      const acronym = val
        .split(" ")
        .filter((w) => w.length > 0)
        .map((w) => w[0].toUpperCase())
        .join("")
        .slice(0, 4);
      if (acronym.length >= 2) {
        onChange("code", `${acronym}-2026`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-black/[0.03] space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Step 1 of 6
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Institution Identity & Profile
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Set up the official public name, campus code, and contact information for your school.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* School Full Name */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Official School / Institution Name *
            </label>
            <div className="relative">
              <Building2 className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={data.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Beacon Crest Academy"
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
              />
            </div>
          </div>

          {/* Campus Code */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Campus Identifier Code *
            </label>
            <input
              type="text"
              required
              value={data.code}
              onChange={(e) => onChange("code", e.target.value.toUpperCase())}
              placeholder="e.g. BCA-2026"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all uppercase"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Unique short code used in official IDs and portal URLs.
            </span>
          </div>

          {/* Official Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Official Contact Email *
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={data.email}
                onChange={(e) => onChange("email", e.target.value)}
                placeholder="admin@school.edu"
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
              />
            </div>
          </div>

          {/* Official Phone */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => onChange("phone", e.target.value)}
                placeholder="+1 (555) 342-9000"
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              School Website URL
            </label>
            <div className="relative">
              <Globe className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={data.website}
                onChange={(e) => onChange("website", e.target.value)}
                placeholder="https://beaconcrest.edu"
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
              />
            </div>
          </div>

          {/* Campus Address */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Campus Physical Address
            </label>
            <div className="relative">
              <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-3" />
              <textarea
                rows={2}
                value={data.address}
                onChange={(e) => onChange("address", e.target.value)}
                placeholder="1000 Beacon Way, Springfield, IL 62701"
                className="w-full pl-12 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all resize-none"
              />
            </div>
          </div>

          {/* Motto / Tagline */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              School Motto or Vision Statement
            </label>
            <input
              type="text"
              value={data.motto}
              onChange={(e) => onChange("motto", e.target.value)}
              placeholder="e.g. Knowledge, Character, and Innovation for Tomorrow's Leaders"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="px-8 shadow-md"
        >
          Next: Academic Calendar →
        </Button>
      </div>
    </form>
  );
}
