import {
  Student,
  Guardian,
  Teacher,
  TeacherClassAssignment,
  GuardianStudent,
  AttendanceRecord,
  Notice,
  NoticeAcknowledgment,
  SchoolProfile,
  GradeConfig,
} from "../types";

export const DEFAULT_SCHOOL_PROFILE: SchoolProfile = {
  id: "sch-001",
  name: "Mo-School Academy",
  slug: "mo-school",
  code: "MOS-2026",
  email: "admin@moschool.edu",
  phone: "+1 (555) 342-9000",
  address: "1000 Beacon Way, Springfield, IL 62701",
  website: "https://moschool.edu",
  logo_url: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=150&auto=format&fit=crop&q=80",
  motto: "Knowledge, Character, and Innovation for Tomorrow's Leaders",

  academic_year: "2026-2027",
  current_term: "Term 2",
  term_system: "terms",
  attendance_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  student_id_format: "{YEAR}-{CLASS}{SECTION}-{SEQ}",
  admission_prefix: "ADM",
  admission_start_seq: 1,
  admin_name: "Principal Marcus Sterling",
  admin_email: "admin@school.com",
  admin_title: "Head of School",
  onboarding_completed: true,
  created_at: "2026-08-01T00:00:00Z",
};

export const DEFAULT_SCHOOL_GRADES: GradeConfig[] = [
  { name: "Grade 7", code: "7", level_order: 7, sections: ["A", "B"], capacity_per_section: 35 },
  { name: "Grade 8", code: "8", level_order: 8, sections: ["A", "B"], capacity_per_section: 35 },
  { name: "Grade 9", code: "9", level_order: 9, sections: ["A", "B", "C"], capacity_per_section: 35 },
  { name: "Grade 10", code: "10", level_order: 10, sections: ["A", "B", "C"], capacity_per_section: 35 },
  { name: "Grade 11", code: "11", level_order: 11, sections: ["A", "B"], capacity_per_section: 30 },
  { name: "Grade 12", code: "12", level_order: 12, sections: ["A", "B"], capacity_per_section: 30 },
];

export const PRESET_K12: GradeConfig[] = [
  { name: "Kindergarten", code: "KG", level_order: 0, sections: ["A", "B"], capacity_per_section: 25 },
  { name: "Grade 1", code: "1", level_order: 1, sections: ["A", "B"], capacity_per_section: 30 },
  { name: "Grade 2", code: "2", level_order: 2, sections: ["A", "B"], capacity_per_section: 30 },
  { name: "Grade 3", code: "3", level_order: 3, sections: ["A", "B"], capacity_per_section: 30 },
  { name: "Grade 4", code: "4", level_order: 4, sections: ["A", "B"], capacity_per_section: 30 },
  { name: "Grade 5", code: "5", level_order: 5, sections: ["A", "B"], capacity_per_section: 30 },
  { name: "Grade 6", code: "6", level_order: 6, sections: ["A", "B"], capacity_per_section: 35 },
  { name: "Grade 7", code: "7", level_order: 7, sections: ["A", "B"], capacity_per_section: 35 },
  { name: "Grade 8", code: "8", level_order: 8, sections: ["A", "B"], capacity_per_section: 35 },
  { name: "Grade 9", code: "9", level_order: 9, sections: ["A", "B"], capacity_per_section: 35 },
  { name: "Grade 10", code: "10", level_order: 10, sections: ["A", "B"], capacity_per_section: 35 },
  { name: "Grade 11", code: "11", level_order: 11, sections: ["A", "B"], capacity_per_section: 35 },
  { name: "Grade 12", code: "12", level_order: 12, sections: ["A", "B"], capacity_per_section: 35 },
];

export const PRESET_SECONDARY: GradeConfig[] = [
  { name: "Grade 6", code: "6", level_order: 6, sections: ["A", "B", "C"], capacity_per_section: 35 },
  { name: "Grade 7", code: "7", level_order: 7, sections: ["A", "B", "C"], capacity_per_section: 35 },
  { name: "Grade 8", code: "8", level_order: 8, sections: ["A", "B", "C"], capacity_per_section: 35 },
  { name: "Grade 9", code: "9", level_order: 9, sections: ["A", "B", "C"], capacity_per_section: 35 },
  { name: "Grade 10", code: "10", level_order: 10, sections: ["A", "B", "C"], capacity_per_section: 35 },
  { name: "Grade 11", code: "11", level_order: 11, sections: ["A", "B"], capacity_per_section: 30 },
  { name: "Grade 12", code: "12", level_order: 12, sections: ["A", "B"], capacity_per_section: 30 },
];

export const PRESET_PRIMARY: GradeConfig[] = [
  { name: "Pre-K", code: "PK", level_order: -1, sections: ["A"], capacity_per_section: 20 },
  { name: "Kindergarten", code: "KG", level_order: 0, sections: ["A", "B"], capacity_per_section: 25 },
  { name: "Grade 1", code: "1", level_order: 1, sections: ["A", "B"], capacity_per_section: 28 },
  { name: "Grade 2", code: "2", level_order: 2, sections: ["A", "B"], capacity_per_section: 28 },
  { name: "Grade 3", code: "3", level_order: 3, sections: ["A", "B"], capacity_per_section: 28 },
  { name: "Grade 4", code: "4", level_order: 4, sections: ["A", "B"], capacity_per_section: 30 },
  { name: "Grade 5", code: "5", level_order: 5, sections: ["A", "B"], capacity_per_section: 30 },
];


export const MOCK_STUDENTS: Student[] = [
  {
    id: "a0000001-0000-0000-0000-000000000001",
    student_id: "2026-10A-014",
    full_name: "Leo Vance",
    date_of_birth: "2010-04-15",
    class: "10",
    section: "A",
    admission_number: "ADM-2022-0941",
    address: "742 Evergreen Terrace, Springfield",
    photo_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80",
    created_at: "2022-08-01T09:00:00Z",
  },
  {
    id: "a0000002-0000-0000-0000-000000000002",
    student_id: "2026-7B-019",
    full_name: "Maya Vance",
    date_of_birth: "2013-09-22",
    class: "7",
    section: "B",
    admission_number: "ADM-2024-1182",
    address: "742 Evergreen Terrace, Springfield",
    photo_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
    created_at: "2024-06-15T09:00:00Z",
  },
  {
    id: "a0000003-0000-0000-0000-000000000003",
    student_id: "2026-10A-002",
    full_name: "Ethan Miller",
    date_of_birth: "2010-06-11",
    class: "10",
    section: "A",
    admission_number: "ADM-2022-0812",
    address: "128 Willow Creek Road, Oakridge",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    created_at: "2022-08-01T09:00:00Z",
  },
  {
    id: "a0000004-0000-0000-0000-000000000004",
    student_id: "2026-8A-005",
    full_name: "Lucas Jenkins",
    date_of_birth: "2012-01-30",
    class: "8",
    section: "A",
    admission_number: "ADM-2023-1029",
    address: "45 Meadow Lane, Pinecrest",
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    created_at: "2023-07-10T09:00:00Z",
  },
  {
    id: "a0000005-0000-0000-0000-000000000005",
    student_id: "2026-10A-006",
    full_name: "Sophia Rodriguez",
    date_of_birth: "2010-02-18",
    class: "10",
    section: "A",
    admission_number: "ADM-2022-0855",
    address: "512 Sunset Blvd, Springfield",
    photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    created_at: "2022-08-01T09:00:00Z",
  },
  {
    id: "a0000006-0000-0000-0000-000000000006",
    student_id: "2026-10A-009",
    full_name: "Noah Campbell",
    date_of_birth: "2010-11-04",
    class: "10",
    section: "A",
    admission_number: "ADM-2022-0901",
    address: "89 Birchwood Drive, Springfield",
    photo_url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80",
    created_at: "2022-08-01T09:00:00Z",
  },
  {
    id: "a0000007-0000-0000-0000-000000000007",
    student_id: "2026-10B-003",
    full_name: "Emma Watson",
    date_of_birth: "2010-08-19",
    class: "10",
    section: "B",
    admission_number: "ADM-2022-0977",
    address: "34 Beacon Hill, Springfield",
    photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80",
    created_at: "2022-08-01T09:00:00Z",
  },
  {
    id: "a0000008-0000-0000-0000-000000000008",
    student_id: "2026-10B-011",
    full_name: "Oliver Queen",
    date_of_birth: "2010-05-12",
    class: "10",
    section: "B",
    admission_number: "ADM-2022-0988",
    address: "16 Starling Way, Springfield",
    photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    created_at: "2022-08-01T09:00:00Z",
  },
  {
    id: "a0000009-0000-0000-0000-000000000009",
    student_id: "2026-9A-001",
    full_name: "Ava Sinclair",
    date_of_birth: "2011-03-25",
    class: "9",
    section: "A",
    admission_number: "ADM-2023-0744",
    address: "90 Crescent Park, Springfield",
    photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
    created_at: "2023-08-01T09:00:00Z",
  },
  {
    id: "a0000010-0000-0000-0000-000000000010",
    student_id: "2026-9A-008",
    full_name: "Liam Foster",
    date_of_birth: "2011-07-14",
    class: "9",
    section: "A",
    admission_number: "ADM-2023-0789",
    address: "21 Maple Court, Springfield",
    photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
    created_at: "2023-08-01T09:00:00Z",
  }
];

export const MOCK_GUARDIANS: Guardian[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    full_name: "Eleanor Vance",
    phone: "+1 (555) 234-8901",
    email: "parent1@school.com",
    created_at: "2022-08-01T09:00:00Z",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    full_name: "David Miller",
    phone: "+1 (555) 987-6543",
    email: "parent2@school.com",
    created_at: "2022-08-01T09:00:00Z",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    full_name: "Dr. Sarah Jenkins",
    phone: "+1 (555) 432-1098",
    email: "teacher1@school.com",
    created_at: "2021-06-01T09:00:00Z",
  }
];

export const MOCK_GUARDIAN_STUDENT: GuardianStudent[] = [
  {
    guardian_id: "11111111-1111-1111-1111-111111111111",
    student_id: "a0000001-0000-0000-0000-000000000001", // Leo
    relationship: "mother",
  },
  {
    guardian_id: "11111111-1111-1111-1111-111111111111",
    student_id: "a0000002-0000-0000-0000-000000000002", // Maya
    relationship: "mother",
  },
  {
    guardian_id: "22222222-2222-2222-2222-222222222222",
    student_id: "a0000003-0000-0000-0000-000000000003", // Ethan
    relationship: "father",
  },
  {
    guardian_id: "33333333-3333-3333-3333-333333333333",
    student_id: "a0000004-0000-0000-0000-000000000004", // Lucas
    relationship: "mother",
  }
];

export const MOCK_TEACHERS: Teacher[] = [
  {
    id: "33333333-3333-3333-3333-333333333333",
    full_name: "Dr. Sarah Jenkins",
    phone: "+1 (555) 432-1098",
    email: "teacher1@school.com",
    subjects: ["Biology", "General Science", "Chemistry"],
    created_at: "2021-06-01T09:00:00Z",
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    full_name: "Prof. Robert Chen",
    phone: "+1 (555) 876-5432",
    email: "teacher2@school.com",
    subjects: ["Mathematics", "Advanced Calculus", "Physics"],
    created_at: "2020-04-12T09:00:00Z",
  }
];

export const MOCK_TEACHER_ASSIGNMENTS: TeacherClassAssignment[] = [
  {
    teacher_id: "33333333-3333-3333-3333-333333333333",
    class: "10",
    section: "A",
  },
  {
    teacher_id: "33333333-3333-3333-3333-333333333333",
    class: "10",
    section: "B",
  },
  {
    teacher_id: "44444444-4444-4444-4444-444444444444",
    class: "9",
    section: "A",
  },
  {
    teacher_id: "44444444-4444-4444-4444-444444444444",
    class: "10",
    section: "A",
  }
];

// Generate past 10 dates
const getDateDaysAgo = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
};

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  // Leo Vance
  { id: "att-001", student_id: "a0000001-0000-0000-0000-000000000001", date: getDateDaysAgo(0), status: "present", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-16T08:30:00Z" },
  { id: "att-002", student_id: "a0000001-0000-0000-0000-000000000001", date: getDateDaysAgo(1), status: "present", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-15T08:30:00Z" },
  { id: "att-003", student_id: "a0000001-0000-0000-0000-000000000001", date: getDateDaysAgo(2), status: "late", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-14T08:30:00Z" },
  { id: "att-004", student_id: "a0000001-0000-0000-0000-000000000001", date: getDateDaysAgo(3), status: "present", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-13T08:30:00Z" },
  { id: "att-005", student_id: "a0000001-0000-0000-0000-000000000001", date: getDateDaysAgo(4), status: "present", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-12T08:30:00Z" },
  { id: "att-006", student_id: "a0000001-0000-0000-0000-000000000001", date: getDateDaysAgo(5), status: "absent", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-11T08:30:00Z" },
  { id: "att-007", student_id: "a0000001-0000-0000-0000-000000000001", date: getDateDaysAgo(6), status: "present", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-10T08:30:00Z" },
  { id: "att-008", student_id: "a0000001-0000-0000-0000-000000000001", date: getDateDaysAgo(7), status: "present", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-09T08:30:00Z" },
  { id: "att-009", student_id: "a0000001-0000-0000-0000-000000000001", date: getDateDaysAgo(8), status: "present", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-08T08:30:00Z" },
  { id: "att-010", student_id: "a0000001-0000-0000-0000-000000000001", date: getDateDaysAgo(9), status: "present", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-07T08:30:00Z" },

  // Maya Vance
  { id: "att-011", student_id: "a0000002-0000-0000-0000-000000000002", date: getDateDaysAgo(0), status: "present", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-16T08:30:00Z" },
  { id: "att-012", student_id: "a0000002-0000-0000-0000-000000000002", date: getDateDaysAgo(1), status: "present", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-15T08:30:00Z" },
  { id: "att-013", student_id: "a0000002-0000-0000-0000-000000000002", date: getDateDaysAgo(2), status: "present", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-14T08:30:00Z" },
  { id: "att-014", student_id: "a0000002-0000-0000-0000-000000000002", date: getDateDaysAgo(3), status: "late", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-13T08:30:00Z" },
  { id: "att-015", student_id: "a0000002-0000-0000-0000-000000000002", date: getDateDaysAgo(4), status: "present", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-12T08:30:00Z" },
  { id: "att-016", student_id: "a0000002-0000-0000-0000-000000000002", date: getDateDaysAgo(5), status: "present", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-11T08:30:00Z" },

  // Ethan Miller
  { id: "att-021", student_id: "a0000003-0000-0000-0000-000000000003", date: getDateDaysAgo(0), status: "present", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-16T08:30:00Z" },
  { id: "att-022", student_id: "a0000003-0000-0000-0000-000000000003", date: getDateDaysAgo(1), status: "late", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-15T08:30:00Z" },
  { id: "att-023", student_id: "a0000003-0000-0000-0000-000000000003", date: getDateDaysAgo(2), status: "present", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-14T08:30:00Z" },

  // Sophia Rodriguez
  { id: "att-031", student_id: "a0000005-0000-0000-0000-000000000005", date: getDateDaysAgo(0), status: "present", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-16T08:30:00Z" },

  // Noah Campbell
  { id: "att-041", student_id: "a0000006-0000-0000-0000-000000000006", date: getDateDaysAgo(0), status: "absent", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-16T08:30:00Z" },

  // Emma Watson
  { id: "att-051", student_id: "a0000007-0000-0000-0000-000000000007", date: getDateDaysAgo(0), status: "present", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-16T08:30:00Z" },

  // Oliver Queen
  { id: "att-061", student_id: "a0000008-0000-0000-0000-000000000008", date: getDateDaysAgo(0), status: "late", marked_by: "33333333-3333-3333-3333-333333333333", created_at: "2026-08-16T08:30:00Z" }
];

export const MOCK_NOTICES: Notice[] = [
  {
    id: "not-001",
    title: "Annual Science & Tech Fair 2026",
    body: "We are thrilled to announce the 2026 Annual Science Fair scheduled for next Friday. All students in Grades 9–12 are invited to present their capstone experiments in the main auditorium. Parent walkthrough begins at 2:00 PM.",
    target_class: null, // School-wide
    target_section: null,
    posted_by: "55555555-5555-5555-5555-555555555555",
    author_name: "Principal Marcus Sterling",
    requires_acknowledgment: true,
    created_at: "2026-08-14T10:00:00Z",
  },
  {
    id: "not-002",
    title: "Term 2 Parent-Teacher Conference Schedule",
    body: "Term 2 Parent-Teacher Conferences will take place this Thursday starting at 3:30 PM. Parents may schedule their 15-minute 1-on-1 slots at the main reception or via academic counseling.",
    target_class: null, // School-wide
    target_section: null,
    posted_by: "55555555-5555-5555-5555-555555555555",
    author_name: "Principal Marcus Sterling",
    requires_acknowledgment: true,
    created_at: "2026-08-12T14:30:00Z",
  },
  {
    id: "not-003",
    title: "Grade 10 Biology Field Trip to Marine Center",
    body: "Grade 10-A and 10-B will be visiting the Coastal Ecology & Marine Research Center next Tuesday morning from 9:00 AM to 1:30 PM. Please ensure signed lab consent slips are submitted by Monday.",
    target_class: "10",
    target_section: null,
    posted_by: "33333333-3333-3333-3333-333333333333",
    author_name: "Dr. Sarah Jenkins",
    requires_acknowledgment: true,
    created_at: "2026-08-15T09:15:00Z",
  },
  {
    id: "not-004",
    title: "Grade 10-A Quadratic Equations Assessment",
    body: "A reminder that the chapter review test on Quadratic Equations and Parabolic Curves for Section 10-A will be administered during Period 3 this Wednesday. Bring scientific calculators.",
    target_class: "10",
    target_section: "A",
    posted_by: "44444444-4444-4444-4444-444444444444",
    author_name: "Prof. Robert Chen",
    requires_acknowledgment: false,
    created_at: "2026-08-15T16:00:00Z",
  }
];

export const MOCK_NOTICE_ACKNOWLEDGMENTS: NoticeAcknowledgment[] = [
  {
    id: "ack-001",
    notice_id: "not-002",
    user_id: "11111111-1111-1111-1111-111111111111", // Eleanor Vance
    user_name: "Eleanor Vance",
    student_id: "a0000001-0000-0000-0000-000000000001", // Leo Vance
    student_name: "Leo Vance",
    acknowledged_at: "2026-08-13T11:20:00Z",
  },
  {
    id: "ack-002",
    notice_id: "not-001",
    user_id: "22222222-2222-2222-2222-222222222222", // David Miller
    user_name: "David Miller",
    student_id: "a0000003-0000-0000-0000-000000000003", // Ethan Miller
    acknowledged_at: "2026-08-14T14:45:00Z",
  }
];


export interface DemoAccount {
  email: string;
  name: string;
  badge: string;
  description: string;
  roles: ("parent" | "teacher" | "admin")[];
  avatar: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: "parent1@school.com",
    name: "Eleanor Vance",
    badge: "Parent (2 Children)",
    description: "Mother to Leo Vance (10-A) and Maya Vance (7-B)",
    roles: ["parent"],
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  },
  {
    email: "parent2@school.com",
    name: "David Miller",
    badge: "Parent (1 Child)",
    description: "Father to Ethan Miller (10-A)",
    roles: ["parent"],
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
  },
  {
    email: "teacher1@school.com",
    name: "Dr. Sarah Jenkins",
    badge: "Teacher & Parent (Dual Role)",
    description: "Teaches 10-A & 10-B + Mother to Lucas (8-A)",
    roles: ["teacher", "parent"],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
  {
    email: "teacher2@school.com",
    name: "Prof. Robert Chen",
    badge: "Teacher",
    description: "Mathematics Teacher for 9-A & 10-A",
    roles: ["teacher"],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    email: "admin@school.com",
    name: "Principal Marcus Sterling",
    badge: "School Admin",
    description: "Complete administration & oversight access",
    roles: ["admin"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  }
];
