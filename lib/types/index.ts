export type Role = "parent" | "teacher" | "admin";

export type AttendanceStatus = "present" | "absent" | "late";

export interface Student {
  id: string;
  student_id: string; // e.g. "2026-10A-014"
  full_name: string;
  date_of_birth: string; // YYYY-MM-DD
  class: string; // e.g. "10", "7"
  section: string; // e.g. "A", "B"
  admission_number: string; // e.g. "ADM-2022-0941"
  address: string;
  photo_url?: string;
  created_at: string;
}

export interface Guardian {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  created_at: string;
}

export interface GuardianStudent {
  guardian_id: string;
  student_id: string;
  relationship: string; // "father", "mother", "guardian"
}

export interface Teacher {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  subjects: string[];
  created_at: string;
}

export interface TeacherClassAssignment {
  teacher_id: string;
  class: string;
  section: string;
}

export interface UserRole {
  user_id: string;
  role: Role;
}

export interface AttendanceRecord {
  id: string;
  student_id: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  marked_by?: string;
  created_at: string;
}

export interface Notice {
  id: string;
  title: string;
  body: string;
  target_class?: string | null; // null means school-wide
  target_section?: string | null;
  posted_by: string;
  author_name?: string;
  requires_acknowledgment?: boolean; // mandatory acknowledgment flag
  created_at: string;
}

export interface NoticeAcknowledgment {
  id: string;
  notice_id: string;
  user_id: string;
  user_name?: string;
  student_id?: string;
  student_name?: string;
  acknowledged_at: string;
}

export interface SchoolProfile {
  id: string;
  name: string;
  slug: string;
  code: string; // e.g. "BCA-2026"
  email: string;
  phone?: string;
  address?: string;
  website?: string;
  logo_url?: string;
  motto?: string;
  academic_year: string; // e.g. "2026-2027"
  current_term: string; // e.g. "Term 2"
  term_system: "terms" | "semesters" | "quarters";
  attendance_days: string[]; // e.g. ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  student_id_format: string; // e.g. "{YEAR}-{CLASS}{SECTION}-{SEQ}"
  admission_prefix: string; // e.g. "ADM"
  admission_start_seq: number;
  admin_name: string;
  admin_email: string;
  admin_title?: string;
  onboarding_completed: boolean;
  created_at: string;
}

export interface GradeConfig {
  id?: string;
  name: string; // e.g. "Grade 10"
  code: string; // e.g. "10"
  level_order: number;
  sections: string[]; // e.g. ["A", "B", "C"]
  capacity_per_section?: number;
}

export interface OnboardingData {
  // Step 1: Identity
  name: string;
  code: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  motto: string;
  logo_url?: string;

  // Step 2: Academic Session
  academic_year: string;
  term_system: "terms" | "semesters" | "quarters";
  current_term: string;
  attendance_days: string[];

  // Step 3: Class Topology
  grades: GradeConfig[];

  // Step 4: ID Formatting
  student_id_format: string;
  admission_prefix: string;
  admission_start_seq: number;

  // Step 5: Admin Account
  admin_name: string;
  admin_email: string;
  admin_title: string;
  admin_password?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  roles: Role[];
  activeRole: Role;
  schoolId?: string;
  guardianProfile?: Guardian;
  teacherProfile?: Teacher;
}


