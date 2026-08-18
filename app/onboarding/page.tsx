"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { OnboardingData, GradeConfig } from "@/lib/types";
import { DEFAULT_SCHOOL_GRADES } from "@/lib/data/mockData";
import { StepIndicator } from "@/components/onboarding/StepIndicator";
import { Step1SchoolIdentity } from "@/components/onboarding/Step1SchoolIdentity";
import { Step2AcademicSession } from "@/components/onboarding/Step2AcademicSession";
import { Step3ClassTopology } from "@/components/onboarding/Step3ClassTopology";
import { Step4IdNumbering } from "@/components/onboarding/Step4IdNumbering";
import { Step5AdminProfile } from "@/components/onboarding/Step5AdminProfile";
import { Step6LaunchSummary } from "@/components/onboarding/Step6LaunchSummary";
import { Sparkles, Building, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding } = useAuth();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<OnboardingData>({
    name: "Oakridge International Academy",
    code: "OAK-2026",
    email: "admissions@oakridge.edu",
    phone: "+1 (555) 890-1234",
    address: "4500 Oakridge Parkway, Austin, TX 78701",
    website: "https://oakridge.edu",
    motto: "Excellence in Leadership, Academics, and Character",
    academic_year: "2026-2027",
    term_system: "terms",
    current_term: "Term 1",
    attendance_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    grades: DEFAULT_SCHOOL_GRADES,
    student_id_format: "{YEAR}-{CLASS}{SECTION}-{SEQ}",
    admission_prefix: "ADM",
    admission_start_seq: 1,
    admin_name: "Dr. Arthur Pendelton",
    admin_email: "principal@oakridge.edu",
    admin_title: "Headmaster & Principal",
    admin_password: "password123",
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLaunch = async () => {
    const res = await completeOnboarding(formData);
    if (res.success) {
      router.push(res.redirectUrl);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7FB] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portal Login
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              <Building className="w-4 h-4 text-orange-400" />
            </div>
            <span className="text-xs font-extrabold text-slate-900">
              School Setup Wizard
            </span>
          </div>
        </div>

        {/* Step Indicator */}
        <StepIndicator
          currentStep={currentStep}
          totalSteps={6}
          onStepClick={(step) => setCurrentStep(step)}
        />

        {/* Dynamic Step Content */}
        {currentStep === 1 && (
          <Step1SchoolIdentity
            data={{
              name: formData.name,
              code: formData.code,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              website: formData.website,
              motto: formData.motto,
              logo_url: formData.logo_url,
            }}
            onChange={updateField}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <Step2AcademicSession
            data={{
              academic_year: formData.academic_year,
              term_system: formData.term_system,
              current_term: formData.current_term,
              attendance_days: formData.attendance_days,
            }}
            onChange={updateField}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <Step3ClassTopology
            grades={formData.grades}
            onChange={(grades: GradeConfig[]) => updateField("grades", grades)}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <Step4IdNumbering
            data={{
              student_id_format: formData.student_id_format,
              admission_prefix: formData.admission_prefix,
              admission_start_seq: formData.admission_start_seq,
              code: formData.code,
              academic_year: formData.academic_year,
            }}
            onChange={updateField}
            onNext={() => setCurrentStep(5)}
            onBack={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 5 && (
          <Step5AdminProfile
            data={{
              admin_name: formData.admin_name,
              admin_email: formData.admin_email,
              admin_title: formData.admin_title,
              admin_password: formData.admin_password,
            }}
            onChange={updateField}
            onNext={() => setCurrentStep(6)}
            onBack={() => setCurrentStep(4)}
          />
        )}

        {currentStep === 6 && (
          <Step6LaunchSummary
            data={formData}
            onLaunch={handleLaunch}
            onBack={() => setCurrentStep(5)}
          />
        )}
      </div>
    </div>
  );
}
