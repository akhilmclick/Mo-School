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

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  roles: Role[];
  activeRole: Role;
  guardianProfile?: Guardian;
  teacherProfile?: Teacher;
}

