"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  AuthUser,
  Role,
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
  OnboardingData,
  AttendanceStatus,
} from "../types";

import {
  MOCK_STUDENTS,
  MOCK_GUARDIANS,
  MOCK_GUARDIAN_STUDENT,
  MOCK_TEACHERS,
  MOCK_TEACHER_ASSIGNMENTS,
  MOCK_ATTENDANCE,
  MOCK_NOTICES,
  MOCK_NOTICE_ACKNOWLEDGMENTS,
  DEFAULT_SCHOOL_PROFILE,
  DEFAULT_SCHOOL_GRADES,
  DEMO_ACCOUNTS,
} from "../data/mockData";

interface LoginResult {
  success: boolean;
  error?: string;
  user?: AuthUser;
  redirectUrl?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<LoginResult>;
  loginAsDemo: (email: string) => Promise<LoginResult>;
  logout: () => void;
  switchRole: (newRole: Role) => void;

  // School Profile & Multi-tenant State
  school: SchoolProfile;
  schoolGrades: GradeConfig[];
  updateSchoolProfile: (updates: Partial<SchoolProfile>) => void;
  completeOnboarding: (data: OnboardingData) => Promise<{ success: boolean; redirectUrl: string }>;

  // Data Store
  students: Student[];
  guardians: Guardian[];
  guardianStudents: GuardianStudent[];
  teachers: Teacher[];
  teacherAssignments: TeacherClassAssignment[];
  attendance: AttendanceRecord[];
  notices: Notice[];
  noticeAcknowledgments: NoticeAcknowledgment[];


  // Active Context for Multi-child Parent
  activeChildId: string | null;
  setActiveChildId: (id: string) => void;
  activeChild: Student | null;

  // Actions
  markAttendance: (records: { studentId: string; status: AttendanceStatus; date?: string }[]) => void;
  postNotice: (notice: {
    title: string;
    body: string;
    target_class?: string | null;
    target_section?: string | null;
    requires_acknowledgment?: boolean;
  }) => void;
  deleteNotice: (id: string) => void;
  acknowledgeNotice: (noticeId: string, studentId?: string) => void;
  addStudent: (
    studentData: Omit<Student, "id" | "created_at">,
    guardianData?: { full_name: string; phone: string; email: string; relationship: string }
  ) => void;
  addTeacher: (
    teacherData: Omit<Teacher, "id" | "created_at">,
    assignments: { class: string; section: string }[]
  ) => void;

  // Computed Helpers
  getParentChildren: (guardianId?: string) => Student[];
  getTeacherAssignedClasses: (teacherId?: string) => { class: string; section: string }[];
  getClassStudents: (className: string, section: string) => Student[];
  getStudentAttendance: (studentId: string) => AttendanceRecord[];
  getRelevantNotices: () => Notice[];
  isNoticeAcknowledged: (noticeId: string, studentId?: string) => boolean;
  getNoticeAcknowledgmentInfo: (noticeId: string, studentId?: string) => NoticeAcknowledgment | undefined;
  getNoticeAcknowledgmentStats: (noticeId: string) => {
    acknowledgedCount: number;
    totalTargetStudents: number;
    percentage: number;
    acknowledgments: NoticeAcknowledgment[];
  };
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // School Profile & Multi-tenant State
  const [school, setSchool] = useState<SchoolProfile>(DEFAULT_SCHOOL_PROFILE);
  const [schoolGrades, setSchoolGrades] = useState<GradeConfig[]>(DEFAULT_SCHOOL_GRADES);

  // Core App State (in-memory persistent across tabs via localStorage)
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [guardians, setGuardians] = useState<Guardian[]>(MOCK_GUARDIANS);
  const [guardianStudents, setGuardianStudents] = useState<GuardianStudent[]>(MOCK_GUARDIAN_STUDENT);
  const [teachers, setTeachers] = useState<Teacher[]>(MOCK_TEACHERS);
  const [teacherAssignments, setTeacherAssignments] = useState<TeacherClassAssignment[]>(MOCK_TEACHER_ASSIGNMENTS);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(MOCK_ATTENDANCE);
  const [notices, setNotices] = useState<Notice[]>(MOCK_NOTICES);
  const [noticeAcknowledgments, setNoticeAcknowledgments] = useState<NoticeAcknowledgment[]>(MOCK_NOTICE_ACKNOWLEDGMENTS);

  const [activeChildId, setActiveChildId] = useState<string | null>(null);

  // Initialize session and school from localStorage on mount
  useEffect(() => {
    try {
      const savedSchool = localStorage.getItem("school_saas_profile");
      const savedGrades = localStorage.getItem("school_saas_grades");
      if (savedSchool) {
        setSchool(JSON.parse(savedSchool));
      }
      if (savedGrades) {
        setSchoolGrades(JSON.parse(savedGrades));
      }

      const savedUser = localStorage.getItem("school_saas_user");
      const savedChildId = localStorage.getItem("school_saas_active_child");
      const savedAcks = localStorage.getItem("school_saas_acks");
      if (savedAcks) {
        setNoticeAcknowledgments(JSON.parse(savedAcks));
      }
      if (savedUser) {
        const parsed = JSON.parse(savedUser) as AuthUser;
        setUser(parsed);
        if (savedChildId) {
          setActiveChildId(savedChildId);
        } else if (parsed.activeRole === "parent") {
          const linkages = MOCK_GUARDIAN_STUDENT.filter((gs) => gs.guardian_id === parsed.id);
          if (linkages.length > 0) {
            setActiveChildId(linkages[0].student_id);
          }
        }
      }
    } catch (e) {
      console.error("Error restoring session:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save school profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("school_saas_profile", JSON.stringify(school));
      localStorage.setItem("school_saas_grades", JSON.stringify(schoolGrades));
    } catch (e) {
      console.error("Error saving school profile:", e);
    }
  }, [school, schoolGrades]);


  // Save acknowledgments to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("school_saas_acks", JSON.stringify(noticeAcknowledgments));
    } catch (e) {
      console.error("Error saving acks:", e);
    }
  }, [noticeAcknowledgments]);


  // Sync active child to storage
  useEffect(() => {
    if (activeChildId) {
      localStorage.setItem("school_saas_active_child", activeChildId);
    }
  }, [activeChildId]);

  // Auth Functions
  const login = async (email: string): Promise<LoginResult> => {
    setIsLoading(true);
    const normalizedEmail = email.trim().toLowerCase();

    // Check against demo accounts first
    const demo = DEMO_ACCOUNTS.find((d) => d.email.toLowerCase() === normalizedEmail);

    let authUser: AuthUser | null = null;

    if (demo) {
      const guardian = guardians.find((g) => g.email.toLowerCase() === normalizedEmail);
      const teacher = teachers.find((t) => t.email.toLowerCase() === normalizedEmail);
      const primaryRole = demo.roles[0];

      authUser = {
        id: guardian ? guardian.id : teacher ? teacher.id : "55555555-5555-5555-5555-555555555555",
        email: demo.email,
        full_name: demo.name,
        roles: demo.roles,
        activeRole: primaryRole,
        guardianProfile: guardian,
        teacherProfile: teacher,
      };
    } else {
      // Check teachers
      const teacher = teachers.find((t) => t.email.toLowerCase() === normalizedEmail);
      // Check guardians
      const guardian = guardians.find((g) => g.email.toLowerCase() === normalizedEmail);

      if (teacher && guardian) {
        authUser = {
          id: teacher.id,
          email: teacher.email,
          full_name: teacher.full_name,
          roles: ["teacher", "parent"],
          activeRole: "teacher",
          teacherProfile: teacher,
          guardianProfile: guardian,
        };
      } else if (teacher) {
        authUser = {
          id: teacher.id,
          email: teacher.email,
          full_name: teacher.full_name,
          roles: ["teacher"],
          activeRole: "teacher",
          teacherProfile: teacher,
        };
      } else if (guardian) {
        authUser = {
          id: guardian.id,
          email: guardian.email,
          full_name: guardian.full_name,
          roles: ["parent"],
          activeRole: "parent",
          guardianProfile: guardian,
        };
      } else if (normalizedEmail.includes("admin")) {
        authUser = {
          id: "55555555-5555-5555-5555-555555555555",
          email: normalizedEmail,
          full_name: "Principal Marcus Sterling",
          roles: ["admin"],
          activeRole: "admin",
        };
      }
    }

    if (!authUser) {
      setIsLoading(false);
      return { success: false, error: "Invalid email or password. Please use a demo account or valid credentials." };
    }

    setUser(authUser);
    localStorage.setItem("school_saas_user", JSON.stringify(authUser));

    // Handle initial active child if parent
    const childrenList = getParentChildren(authUser.id);
    if (childrenList.length > 0) {
      setActiveChildId(childrenList[0].id);
    }

    setIsLoading(false);

    // Role routing determination
    if (authUser.roles.length > 1) {
      return { success: true, user: authUser, redirectUrl: "/role-select" };
    } else {
      const redirectUrl = `/${authUser.roles[0]}`;
      return { success: true, user: authUser, redirectUrl };
    }
  };

  const updateSchoolProfile = (updates: Partial<SchoolProfile>) => {
    setSchool((prev) => ({ ...prev, ...updates }));
  };

  const completeOnboarding = async (data: OnboardingData): Promise<{ success: boolean; redirectUrl: string }> => {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const newSchoolId = `sch-${Date.now()}`;
    const newAdminId = `adm-${Date.now()}`;

    const newSchool: SchoolProfile = {
      id: newSchoolId,
      name: data.name,
      slug,
      code: data.code.toUpperCase(),
      email: data.email,
      phone: data.phone,
      address: data.address,
      website: data.website,
      motto: data.motto,
      logo_url: data.logo_url || "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=150&auto=format&fit=crop&q=80",
      academic_year: data.academic_year,
      current_term: data.current_term || "Term 1",
      term_system: data.term_system,
      attendance_days: data.attendance_days,
      student_id_format: data.student_id_format,
      admission_prefix: data.admission_prefix,
      admission_start_seq: data.admission_start_seq,
      admin_name: data.admin_name,
      admin_email: data.admin_email,
      admin_title: data.admin_title || "Principal",
      onboarding_completed: true,
      created_at: new Date().toISOString(),
    };

    const newAdminUser: AuthUser = {
      id: newAdminId,
      email: data.admin_email,
      full_name: data.admin_name,
      roles: ["admin"],
      activeRole: "admin",
      schoolId: newSchoolId,
    };

    setSchool(newSchool);
    setSchoolGrades(data.grades);
    setUser(newAdminUser);

    localStorage.setItem("school_saas_profile", JSON.stringify(newSchool));
    localStorage.setItem("school_saas_grades", JSON.stringify(data.grades));
    localStorage.setItem("school_saas_user", JSON.stringify(newAdminUser));

    return {
      success: true,
      redirectUrl: "/admin",
    };
  };

  const loginAsDemo = async (email: string): Promise<LoginResult> => {

    return login(email);
  };

  const logout = () => {
    setUser(null);
    setActiveChildId(null);
    localStorage.removeItem("school_saas_user");
    localStorage.removeItem("school_saas_active_child");
  };

  const switchRole = (newRole: Role) => {
    if (!user || !user.roles.includes(newRole)) return;
    const updated = { ...user, activeRole: newRole };
    setUser(updated);
    localStorage.setItem("school_saas_user", JSON.stringify(updated));

    if (newRole === "parent") {
      const childrenList = getParentChildren(updated.id);
      if (childrenList.length > 0 && !activeChildId) {
        setActiveChildId(childrenList[0].id);
      }
    }
  };

  // Helper Computations
  const getParentChildren = (guardianId?: string): Student[] => {
    const gId = guardianId || user?.id;
    if (!gId) return [];
    const linkedStudentIds = guardianStudents
      .filter((gs) => gs.guardian_id === gId)
      .map((gs) => gs.student_id);
    return students.filter((s) => linkedStudentIds.includes(s.id));
  };

  const getTeacherAssignedClasses = (teacherId?: string): { class: string; section: string }[] => {
    const tId = teacherId || user?.id;
    if (!tId) return [];
    return teacherAssignments
      .filter((ta) => ta.teacher_id === tId)
      .map((ta) => ({ class: ta.class, section: ta.section }));
  };

  const getClassStudents = (className: string, section: string): Student[] => {
    return students.filter(
      (s) => s.class.toLowerCase() === className.toLowerCase() && s.section.toUpperCase() === section.toUpperCase()
    );
  };

  const getStudentAttendance = (studentId: string): AttendanceRecord[] => {
    return attendance
      .filter((a) => a.student_id === studentId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const activeChild = students.find((s) => s.id === activeChildId) || null;

  const getRelevantNotices = (): Notice[] => {
    if (!user) return notices;

    if (user.activeRole === "admin") {
      return notices.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    if (user.activeRole === "parent") {
      const child = activeChild;
      return notices
        .filter((n) => {
          if (!n.target_class) return true; // School-wide
          if (child && n.target_class === child.class) {
            if (!n.target_section || n.target_section === child.section) {
              return true;
            }
          }
          return false;
        })
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    if (user.activeRole === "teacher") {
      const assigned = getTeacherAssignedClasses(user.id);
      return notices
        .filter((n) => {
          if (!n.target_class) return true; // School-wide
          if (n.posted_by === user.id) return true; // Posted by self
          return assigned.some(
            (as) => as.class === n.target_class && (!n.target_section || as.section === n.target_section)
          );
        })
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return notices;
  };

  // Actions
  const markAttendance = (records: { studentId: string; status: AttendanceStatus; date?: string }[]) => {
    const today = new Date().toISOString().split("T")[0];

    setAttendance((prev) => {
      const nextAttendance = [...prev];

      records.forEach((rec) => {
        const recordDate = rec.date || today;
        const existingIndex = nextAttendance.findIndex(
          (a) => a.student_id === rec.studentId && a.date === recordDate
        );

        if (existingIndex >= 0) {
          nextAttendance[existingIndex] = {
            ...nextAttendance[existingIndex],
            status: rec.status,
            marked_by: user?.id,
          };
        } else {
          nextAttendance.unshift({
            id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            student_id: rec.studentId,
            date: recordDate,
            status: rec.status,
            marked_by: user?.id,
            created_at: new Date().toISOString(),
          });
        }
      });

      return nextAttendance;
    });
  };

  const isNoticeAcknowledged = (noticeId: string, studentId?: string): boolean => {
    if (!user) return false;
    const targetStudentId = studentId || activeChildId;
    return noticeAcknowledgments.some((ack) => {
      if (ack.notice_id !== noticeId || ack.user_id !== user.id) return false;
      if (targetStudentId && ack.student_id) {
        return ack.student_id === targetStudentId;
      }
      return true;
    });
  };

  const getNoticeAcknowledgmentInfo = (noticeId: string, studentId?: string): NoticeAcknowledgment | undefined => {
    if (!user) return undefined;
    const targetStudentId = studentId || activeChildId;
    return noticeAcknowledgments.find((ack) => {
      if (ack.notice_id !== noticeId || ack.user_id !== user.id) return false;
      if (targetStudentId && ack.student_id) {
        return ack.student_id === targetStudentId;
      }
      return true;
    });
  };

  const getNoticeAcknowledgmentStats = (noticeId: string) => {
    const notice = notices.find((n) => n.id === noticeId);
    const acks = noticeAcknowledgments.filter((a) => a.notice_id === noticeId);

    let targetStudents = students;
    if (notice?.target_class) {
      targetStudents = students.filter(
        (s) =>
          s.class === notice.target_class &&
          (!notice.target_section || s.section === notice.target_section)
      );
    }

    const totalTarget = Math.max(targetStudents.length, 1);
    const percentage = Math.min(Math.round((acks.length / totalTarget) * 100), 100);

    return {
      acknowledgedCount: acks.length,
      totalTargetStudents: totalTarget,
      percentage,
      acknowledgments: acks,
    };
  };

  const acknowledgeNotice = (noticeId: string, studentId?: string) => {
    if (!user) return;
    const targetStudentId = studentId || activeChildId || undefined;
    const student = students.find((s) => s.id === targetStudentId);

    const existingIndex = noticeAcknowledgments.findIndex((ack) => {
      if (ack.notice_id !== noticeId || ack.user_id !== user.id) return false;
      if (targetStudentId && ack.student_id) {
        return ack.student_id === targetStudentId;
      }
      return true;
    });

    if (existingIndex >= 0) return; // Already acknowledged

    const newAck: NoticeAcknowledgment = {
      id: `ack-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      notice_id: noticeId,
      user_id: user.id,
      user_name: user.full_name,
      student_id: targetStudentId,
      student_name: student?.full_name,
      acknowledged_at: new Date().toISOString(),
    };

    setNoticeAcknowledgments((prev) => [newAck, ...prev]);
  };

  const postNotice = (noticeData: {
    title: string;
    body: string;
    target_class?: string | null;
    target_section?: string | null;
    requires_acknowledgment?: boolean;
  }) => {
    const newNotice: Notice = {
      id: `not-${Date.now()}`,
      title: noticeData.title,
      body: noticeData.body,
      target_class: noticeData.target_class || null,
      target_section: noticeData.target_section || null,
      posted_by: user?.id || "admin",
      author_name: user?.full_name || "School Administration",
      requires_acknowledgment:
        noticeData.requires_acknowledgment !== undefined ? noticeData.requires_acknowledgment : true,
      created_at: new Date().toISOString(),
    };

    setNotices((prev) => [newNotice, ...prev]);
  };


  const deleteNotice = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  const addStudent = (
    studentData: Omit<Student, "id" | "created_at">,
    guardianData?: { full_name: string; phone: string; email: string; relationship: string }
  ) => {
    const newStudentId = `std-${Date.now()}`;
    const newStudent: Student = {
      ...studentData,
      id: newStudentId,
      photo_url:
        studentData.photo_url ||
        `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80`,
      created_at: new Date().toISOString(),
    };

    setStudents((prev) => [newStudent, ...prev]);

    if (guardianData && guardianData.email) {
      let guardian = guardians.find((g) => g.email.toLowerCase() === guardianData.email.toLowerCase());
      let guardianId = guardian?.id;

      if (!guardian) {
        guardianId = `grd-${Date.now()}`;
        const newGuardian: Guardian = {
          id: guardianId,
          full_name: guardianData.full_name,
          phone: guardianData.phone,
          email: guardianData.email,
          created_at: new Date().toISOString(),
        };
        setGuardians((prev) => [...prev, newGuardian]);
      }

      if (guardianId) {
        setGuardianStudents((prev) => [
          ...prev,
          {
            guardian_id: guardianId!,
            student_id: newStudentId,
            relationship: guardianData.relationship || "guardian",
          },
        ]);
      }
    }
  };

  const addTeacher = (
    teacherData: Omit<Teacher, "id" | "created_at">,
    assignments: { class: string; section: string }[]
  ) => {
    const newTeacherId = `tch-${Date.now()}`;
    const newTeacher: Teacher = {
      ...teacherData,
      id: newTeacherId,
      created_at: new Date().toISOString(),
    };

    setTeachers((prev) => [...prev, newTeacher]);

    if (assignments.length > 0) {
      const newAssignments: TeacherClassAssignment[] = assignments.map((a) => ({
        teacher_id: newTeacherId,
        class: a.class,
        section: a.section,
      }));
      setTeacherAssignments((prev) => [...prev, ...newAssignments]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginAsDemo,
        logout,
        switchRole,
        school,
        schoolGrades,
        updateSchoolProfile,
        completeOnboarding,
        students,
        guardians,
        guardianStudents,

        teachers,
        teacherAssignments,
        attendance,
        notices,
        noticeAcknowledgments,
        activeChildId,
        setActiveChildId,
        activeChild,
        markAttendance,
        postNotice,
        deleteNotice,
        acknowledgeNotice,
        addStudent,
        addTeacher,
        getParentChildren,
        getTeacherAssignedClasses,
        getClassStudents,
        getStudentAttendance,
        getRelevantNotices,
        isNoticeAcknowledged,
        getNoticeAcknowledgmentInfo,
        getNoticeAcknowledgmentStats,
      }}
    >

      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
