-- ==============================================================================
-- PHASE 1: SCHOOL MANAGEMENT SAAS - POSTGRESQL & SUPABASE SCHEMA WITH RLS
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. STUDENTS TABLE
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id TEXT UNIQUE NOT NULL, -- e.g. "2026-10A-014"
    full_name TEXT NOT NULL,
    date_of_birth DATE,
    class TEXT NOT NULL,
    section TEXT NOT NULL,
    admission_number TEXT UNIQUE NOT NULL,
    address TEXT,
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_students_class_section ON public.students(class, section);
CREATE INDEX IF NOT EXISTS idx_students_student_id ON public.students(student_id);

-- 2. GUARDIANS TABLE (PARENTS)
CREATE TABLE IF NOT EXISTS public.guardians (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. GUARDIAN_STUDENT (JOIN TABLE: SIBLINGS & MULTIPLE GUARDIANS SUPPORT)
CREATE TABLE IF NOT EXISTS public.guardian_student (
    guardian_id UUID REFERENCES public.guardians(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    relationship TEXT NOT NULL DEFAULT 'guardian', -- 'father', 'mother', 'guardian'
    PRIMARY KEY (guardian_id, student_id)
);

CREATE INDEX IF NOT EXISTS idx_guardian_student_guardian ON public.guardian_student(guardian_id);
CREATE INDEX IF NOT EXISTS idx_guardian_student_student ON public.guardian_student(student_id);

-- 4. TEACHERS TABLE
CREATE TABLE IF NOT EXISTS public.teachers (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    email TEXT UNIQUE NOT NULL,
    subjects TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. TEACHER_CLASS_ASSIGNMENTS
CREATE TABLE IF NOT EXISTS public.teacher_class_assignments (
    teacher_id UUID REFERENCES public.teachers(id) ON DELETE CASCADE,
    class TEXT NOT NULL,
    section TEXT NOT NULL,
    PRIMARY KEY (teacher_id, class, section)
);

CREATE INDEX IF NOT EXISTS idx_teacher_assignments_class_sec ON public.teacher_class_assignments(class, section);

-- 6. USER_ROLES (SUPPORTS MULTI-ROLE USERS, E.G. TEACHER WHO IS ALSO A PARENT)
CREATE TABLE IF NOT EXISTS public.user_roles (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('parent', 'teacher', 'admin')),
    PRIMARY KEY (user_id, role)
);

CREATE INDEX IF NOT EXISTS idx_user_roles_user ON public.user_roles(user_id);

-- 7. ATTENDANCE TABLE
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late')),
    marked_by UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE (student_id, date)
);

CREATE INDEX IF NOT EXISTS idx_attendance_student_date ON public.attendance(student_id, date);

-- 8. NOTICES TABLE
CREATE TABLE IF NOT EXISTS public.notices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    target_class TEXT, -- NULL means school-wide
    target_section TEXT, -- NULL means entire class
    posted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    requires_acknowledgment BOOLEAN NOT NULL DEFAULT true, -- mandatory acknowledgment flag
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_notices_target ON public.notices(target_class, target_section);

-- 9. NOTICE_ACKNOWLEDGMENTS TABLE (STORES MANDATORY PARENT/USER ACKNOWLEDGMENTS)
CREATE TABLE IF NOT EXISTS public.notice_acknowledgments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    notice_id UUID NOT NULL REFERENCES public.notices(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    acknowledged_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE (notice_id, user_id, student_id)
);

CREATE INDEX IF NOT EXISTS idx_notice_ack_notice ON public.notice_acknowledgments(notice_id);
CREATE INDEX IF NOT EXISTS idx_notice_ack_user ON public.notice_acknowledgments(user_id);


-- ==============================================================================
-- HELPER FUNCTIONS FOR ROW-LEVEL SECURITY
-- ==============================================================================

-- Function to check if user has admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has teacher role
CREATE OR REPLACE FUNCTION public.is_teacher()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() AND role = 'teacher'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has parent role
CREATE OR REPLACE FUNCTION public.is_parent()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() AND role = 'parent'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if teacher is assigned to a student's class and section
CREATE OR REPLACE FUNCTION public.is_teacher_assigned_to_student(student_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.students s
        JOIN public.teacher_class_assignments tca 
          ON s.class = tca.class AND s.section = tca.section
        WHERE s.id = student_uuid AND tca.teacher_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guardian_student ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_class_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notice_acknowledgments ENABLE ROW LEVEL SECURITY;


-- ------------------------------------------------------------------------------
-- 1. USER_ROLES POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can read own roles"
    ON public.user_roles FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Admin full management of user_roles"
    ON public.user_roles FOR ALL
    USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- 2. STUDENTS POLICIES
-- ------------------------------------------------------------------------------
-- Admin: Full access
CREATE POLICY "Admin full access to students"
    ON public.students FOR ALL
    USING (public.is_admin());

-- Parents: Can view only their linked children
CREATE POLICY "Parents can select linked students"
    ON public.students FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.guardian_student gs
            WHERE gs.student_id = students.id
              AND gs.guardian_id = auth.uid()
        )
    );

-- Teachers: Can view students in their assigned classes/sections
CREATE POLICY "Teachers can select assigned class students"
    ON public.students FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.teacher_class_assignments tca
            WHERE tca.teacher_id = auth.uid()
              AND tca.class = students.class
              AND tca.section = students.section
        )
    );

-- ------------------------------------------------------------------------------
-- 3. GUARDIANS & GUARDIAN_STUDENT POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Admin full access to guardians"
    ON public.guardians FOR ALL
    USING (public.is_admin());

CREATE POLICY "Guardians can view own profile"
    ON public.guardians FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Teachers can view guardians of their assigned students"
    ON public.guardians FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.guardian_student gs
            JOIN public.students s ON s.id = gs.student_id
            JOIN public.teacher_class_assignments tca ON tca.class = s.class AND tca.section = s.section
            WHERE gs.guardian_id = guardians.id AND tca.teacher_id = auth.uid()
        )
    );

CREATE POLICY "Admin full access to guardian_student"
    ON public.guardian_student FOR ALL
    USING (public.is_admin());

CREATE POLICY "Guardians view own linkages"
    ON public.guardian_student FOR SELECT
    USING (guardian_id = auth.uid());

CREATE POLICY "Teachers view linkages for assigned students"
    ON public.guardian_student FOR SELECT
    USING (public.is_teacher_assigned_to_student(student_id));

-- ------------------------------------------------------------------------------
-- 4. TEACHERS & ASSIGNMENTS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Admin full access to teachers"
    ON public.teachers FOR ALL
    USING (public.is_admin());

CREATE POLICY "Teachers view own profile"
    ON public.teachers FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "All authenticated users view teacher public directory"
    ON public.teachers FOR SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access to teacher assignments"
    ON public.teacher_class_assignments FOR ALL
    USING (public.is_admin());

CREATE POLICY "Teachers view own assignments"
    ON public.teacher_class_assignments FOR SELECT
    USING (teacher_id = auth.uid());

-- ------------------------------------------------------------------------------
-- 5. ATTENDANCE POLICIES
-- ------------------------------------------------------------------------------
-- Admin: Full access
CREATE POLICY "Admin full access to attendance"
    ON public.attendance FOR ALL
    USING (public.is_admin());

-- Parents: Can view attendance of their linked children only
CREATE POLICY "Parents view own children attendance"
    ON public.attendance FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.guardian_student gs
            WHERE gs.student_id = attendance.student_id
              AND gs.guardian_id = auth.uid()
        )
    );

-- Teachers: Can view and insert/update attendance for assigned classes
CREATE POLICY "Teachers view attendance for assigned classes"
    ON public.attendance FOR SELECT
    USING (public.is_teacher_assigned_to_student(student_id));

CREATE POLICY "Teachers insert attendance for assigned classes"
    ON public.attendance FOR INSERT
    WITH CHECK (
        public.is_teacher_assigned_to_student(student_id)
        AND marked_by = auth.uid()
    );

CREATE POLICY "Teachers update attendance for assigned classes"
    ON public.attendance FOR UPDATE
    USING (public.is_teacher_assigned_to_student(student_id))
    WITH CHECK (
        public.is_teacher_assigned_to_student(student_id)
        AND marked_by = auth.uid()
    );

-- ------------------------------------------------------------------------------
-- 6. NOTICES POLICIES
-- ------------------------------------------------------------------------------
-- Admin: Full access
CREATE POLICY "Admin full access to notices"
    ON public.notices FOR ALL
    USING (public.is_admin());

-- Parents: Can view school-wide notices or notices targeted to their children's class/section
CREATE POLICY "Parents view relevant notices"
    ON public.notices FOR SELECT
    USING (
        target_class IS NULL -- School wide
        OR EXISTS (
            SELECT 1 FROM public.guardian_student gs
            JOIN public.students s ON s.id = gs.student_id
            WHERE gs.guardian_id = auth.uid()
              AND (notices.target_class = s.class)
              AND (notices.target_section IS NULL OR notices.target_section = s.section)
        )
    );

-- Teachers: Can view school-wide notices, notices they posted, or notices for their assigned classes
CREATE POLICY "Teachers view relevant notices"
    ON public.notices FOR SELECT
    USING (
        target_class IS NULL 
        OR posted_by = auth.uid()
        OR EXISTS (
            SELECT 1 FROM public.teacher_class_assignments tca
            WHERE tca.teacher_id = auth.uid()
              AND (notices.target_class = tca.class)
              AND (notices.target_section IS NULL OR notices.target_section = tca.section)
        )
    );

-- Teachers: Can insert notices
CREATE POLICY "Teachers can post notices"
    ON public.notices FOR INSERT
    WITH CHECK (
        public.is_teacher() 
        AND posted_by = auth.uid()
    );

-- ------------------------------------------------------------------------------
-- 7. NOTICE ACKNOWLEDGMENTS POLICIES
-- ------------------------------------------------------------------------------
-- Admin: Full access
CREATE POLICY "Admin full access to notice_acknowledgments"
    ON public.notice_acknowledgments FOR ALL
    USING (public.is_admin());

-- Users / Parents: Can view own acknowledgments
CREATE POLICY "Users view own notice acknowledgments"
    ON public.notice_acknowledgments FOR SELECT
    USING (user_id = auth.uid());

-- Users / Parents: Can insert own acknowledgment
CREATE POLICY "Users insert own notice acknowledgments"
    ON public.notice_acknowledgments FOR INSERT
    WITH CHECK (user_id = auth.uid());

-- Teachers: Can view acknowledgments for notices they posted or for assigned classes
CREATE POLICY "Teachers view relevant notice acknowledgments"
    ON public.notice_acknowledgments FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.notices n
            WHERE n.id = notice_acknowledgments.notice_id
              AND (
                  n.posted_by = auth.uid()
                  OR n.target_class IS NULL
                  OR EXISTS (
                      SELECT 1 FROM public.teacher_class_assignments tca
                      WHERE tca.teacher_id = auth.uid() AND tca.class = n.target_class
                  )
              )
        )
    );

