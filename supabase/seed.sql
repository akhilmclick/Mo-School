-- ==============================================================================
-- PHASE 1: SCHOOL MANAGEMENT SAAS - SEED DATA SCRIPT
-- ==============================================================================

-- 1. SEED AUTH USERS & APP DATA
-- Parent 1 (Eleanor Vance - 2 children: Leo Vance in 10-A, Maya Vance in 7-B)
-- Parent 2 (David Miller - 1 child: Ethan Miller in 10-A)
-- Teacher 1 (Dr. Sarah Jenkins - Classes 10-A, 10-B; also mother to Lucas Jenkins in 8-A -> Dual Role)
-- Teacher 2 (Prof. Robert Chen - Classes 9-A, 10-A)
-- Admin (Principal Marcus Sterling)

DO $$
DECLARE
    -- User UUIDs
    uid_parent_eleanor UUID := '11111111-1111-1111-1111-111111111111';
    uid_parent_david UUID := '22222222-2222-2222-2222-222222222222';
    uid_teacher_sarah UUID := '33333333-3333-3333-3333-333333333333';
    uid_teacher_robert UUID := '44444444-4444-4444-4444-444444444444';
    uid_admin_marcus UUID := '55555555-5555-5555-5555-555555555555';

    -- Student UUIDs
    sid_leo UUID := 'a0000001-0000-0000-0000-000000000001';
    sid_maya UUID := 'a0000002-0000-0000-0000-000000000002';
    sid_ethan UUID := 'a0000003-0000-0000-0000-000000000003';
    sid_lucas UUID := 'a0000004-0000-0000-0000-000000000004';
    sid_sophia UUID := 'a0000005-0000-0000-0000-000000000005';
    sid_noah UUID := 'a0000006-0000-0000-0000-000000000006';
    sid_emma UUID := 'a0000007-0000-0000-0000-000000000007';
    sid_oliver UUID := 'a0000008-0000-0000-0000-000000000008';

    -- Notice UUIDs
    nid_science UUID := 'b0000001-0000-0000-0000-000000000001';
    nid_conference UUID := 'b0000002-0000-0000-0000-000000000002';
    nid_biology UUID := 'b0000003-0000-0000-0000-000000000003';
    nid_math UUID := 'b0000004-0000-0000-0000-000000000004';
BEGIN

    -- Create corresponding records in auth.users if running directly on Supabase
    BEGIN
        INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, aud)
        VALUES
        (uid_parent_eleanor, '00000000-0000-0000-0000-000000000000', 'parent1@school.com', crypt('password123', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Eleanor Vance"}', NOW(), NOW(), 'authenticated', 'authenticated'),
        (uid_parent_david, '00000000-0000-0000-0000-000000000000', 'parent2@school.com', crypt('password123', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"David Miller"}', NOW(), NOW(), 'authenticated', 'authenticated'),
        (uid_teacher_sarah, '00000000-0000-0000-0000-000000000000', 'teacher1@school.com', crypt('password123', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Dr. Sarah Jenkins"}', NOW(), NOW(), 'authenticated', 'authenticated'),
        (uid_teacher_robert, '00000000-0000-0000-0000-000000000000', 'teacher2@school.com', crypt('password123', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Prof. Robert Chen"}', NOW(), NOW(), 'authenticated', 'authenticated'),
        (uid_admin_marcus, '00000000-0000-0000-0000-000000000000', 'admin@school.com', crypt('password123', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Principal Marcus Sterling"}', NOW(), NOW(), 'authenticated', 'authenticated')
        ON CONFLICT (id) DO NOTHING;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE 'Skipping auth.users insertion: %', SQLERRM;
    END;

    -- 2. INSERT USER ROLES
    INSERT INTO public.user_roles (user_id, role) VALUES
    (uid_parent_eleanor, 'parent'),
    (uid_parent_david, 'parent'),
    (uid_teacher_sarah, 'teacher'),
    (uid_teacher_sarah, 'parent'), -- Dual Role!
    (uid_teacher_robert, 'teacher'),
    (uid_admin_marcus, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;

    -- 3. INSERT GUARDIANS
    INSERT INTO public.guardians (id, full_name, phone, email) VALUES
    (uid_parent_eleanor, 'Eleanor Vance', '+1 (555) 234-8901', 'parent1@school.com'),
    (uid_parent_david, 'David Miller', '+1 (555) 987-6543', 'parent2@school.com'),
    (uid_teacher_sarah, 'Dr. Sarah Jenkins', '+1 (555) 432-1098', 'teacher1@school.com')
    ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, phone = EXCLUDED.phone;

    -- 4. INSERT TEACHERS
    INSERT INTO public.teachers (id, full_name, phone, email, subjects) VALUES
    (uid_teacher_sarah, 'Dr. Sarah Jenkins', '+1 (555) 432-1098', 'teacher1@school.com', ARRAY['Biology', 'General Science', 'Chemistry']),
    (uid_teacher_robert, 'Prof. Robert Chen', '+1 (555) 876-5432', 'teacher2@school.com', ARRAY['Mathematics', 'Advanced Calculus', 'Physics'])
    ON CONFLICT (id) DO UPDATE SET subjects = EXCLUDED.subjects;

    -- 5. TEACHER CLASS ASSIGNMENTS
    INSERT INTO public.teacher_class_assignments (teacher_id, class, section) VALUES
    (uid_teacher_sarah, '10', 'A'),
    (uid_teacher_sarah, '10', 'B'),
    (uid_teacher_robert, '9', 'A'),
    (uid_teacher_robert, '10', 'A')
    ON CONFLICT (teacher_id, class, section) DO NOTHING;

    -- 6. INSERT STUDENTS
    INSERT INTO public.students (id, student_id, full_name, date_of_birth, class, section, admission_number, address, photo_url) VALUES
    (sid_leo, '2026-10A-014', 'Leo Vance', '2010-04-15', '10', 'A', 'ADM-2022-0941', '742 Evergreen Terrace, Springfield', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'),
    (sid_maya, '2026-7B-019', 'Maya Vance', '2013-09-22', '7', 'B', 'ADM-2024-1182', '742 Evergreen Terrace, Springfield', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'),
    (sid_ethan, '2026-10A-002', 'Ethan Miller', '2010-06-11', '10', 'A', 'ADM-2022-0812', '128 Willow Creek Road, Oakridge', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'),
    (sid_lucas, '2026-8A-005', 'Lucas Jenkins', '2012-01-30', '8', 'A', 'ADM-2023-1029', '45 Meadow Lane, Pinecrest', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'),
    (sid_sophia, '2026-10A-006', 'Sophia Rodriguez', '2010-02-18', '10', 'A', 'ADM-2022-0855', '512 Sunset Blvd, Springfield', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'),
    (sid_noah, '2026-10A-009', 'Noah Campbell', '2010-11-04', '10', 'A', 'ADM-2022-0901', '89 Birchwood Drive, Springfield', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80'),
    (sid_emma, '2026-10B-003', 'Emma Watson', '2010-08-19', '10', 'B', 'ADM-2022-0977', '34 Beacon Hill, Springfield', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80'),
    (sid_oliver, '2026-10B-011', 'Oliver Queen', '2010-05-12', '10', 'B', 'ADM-2022-0988', '16 Starling Way, Springfield', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80')
    ON CONFLICT (id) DO NOTHING;

    -- 7. GUARDIAN STUDENT RELATIONSHIPS
    INSERT INTO public.guardian_student (guardian_id, student_id, relationship) VALUES
    (uid_parent_eleanor, sid_leo, 'mother'),
    (uid_parent_eleanor, sid_maya, 'mother'),
    (uid_parent_david, sid_ethan, 'father'),
    (uid_teacher_sarah, sid_lucas, 'mother')
    ON CONFLICT (guardian_id, student_id) DO NOTHING;

    -- 8. INSERT NOTICES
    INSERT INTO public.notices (id, title, body, target_class, target_section, posted_by, requires_acknowledgment, created_at) VALUES
    (nid_science, 'Annual Science & Tech Fair 2026', 'We are thrilled to announce the 2026 Annual Science Fair scheduled for next Friday. All students in Grades 9–12 are invited to present their capstone experiments in the main auditorium.', NULL, NULL, uid_admin_marcus, true, NOW() - INTERVAL '2 days'),
    (nid_conference, 'Parent-Teacher Conference Schedule', 'Term 2 Parent-Teacher Conferences will take place this Thursday starting at 3:30 PM. Slots can be confirmed through the school reception.', NULL, NULL, uid_admin_marcus, true, NOW() - INTERVAL '4 days'),
    (nid_biology, 'Grade 10 Biology Lab Field Trip', 'Grade 10-A and 10-B will be visiting the Marine Biology Research Center next Tuesday morning. Please ensure lab safety permission forms are acknowledged.', '10', NULL, uid_teacher_sarah, true, NOW() - INTERVAL '1 day'),
    (nid_math, 'Grade 10-A Math Quiz Announcement', 'A reminder that the Quadratic Equations review quiz for Section 10-A will be held this Wednesday during Period 3.', '10', 'A', uid_teacher_robert, false, NOW() - INTERVAL '12 hours')
    ON CONFLICT (id) DO NOTHING;

    -- 9. INSERT NOTICE ACKNOWLEDGMENTS
    INSERT INTO public.notice_acknowledgments (id, notice_id, user_id, student_id, acknowledged_at) VALUES
    (gen_random_uuid(), nid_conference, uid_parent_eleanor, sid_leo, NOW() - INTERVAL '3 days'),
    (gen_random_uuid(), nid_science, uid_parent_david, sid_ethan, NOW() - INTERVAL '1 day')
    ON CONFLICT (notice_id, user_id, student_id) DO NOTHING;

    -- 10. SEED ATTENDANCE RECORDS (Past 10 days for students)
    INSERT INTO public.attendance (student_id, date, status, marked_by) VALUES
    -- Leo Vance (10-A)
    (sid_leo, CURRENT_DATE, 'present', uid_teacher_sarah),
    (sid_leo, CURRENT_DATE - INTERVAL '1 day', 'present', uid_teacher_sarah),
    (sid_leo, CURRENT_DATE - INTERVAL '2 days', 'present', uid_teacher_sarah),
    (sid_leo, CURRENT_DATE - INTERVAL '3 days', 'late', uid_teacher_sarah),
    (sid_leo, CURRENT_DATE - INTERVAL '4 days', 'present', uid_teacher_sarah),
    (sid_leo, CURRENT_DATE - INTERVAL '5 days', 'present', uid_teacher_sarah),
    (sid_leo, CURRENT_DATE - INTERVAL '6 days', 'absent', uid_teacher_sarah),
    (sid_leo, CURRENT_DATE - INTERVAL '7 days', 'present', uid_teacher_sarah),
    (sid_leo, CURRENT_DATE - INTERVAL '8 days', 'present', uid_teacher_sarah),
    (sid_leo, CURRENT_DATE - INTERVAL '9 days', 'present', uid_teacher_sarah),

    -- Maya Vance (7-B)
    (sid_maya, CURRENT_DATE, 'present', uid_teacher_sarah),
    (sid_maya, CURRENT_DATE - INTERVAL '1 day', 'present', uid_teacher_sarah),
    (sid_maya, CURRENT_DATE - INTERVAL '2 days', 'present', uid_teacher_sarah),
    (sid_maya, CURRENT_DATE - INTERVAL '3 days', 'present', uid_teacher_sarah),
    (sid_maya, CURRENT_DATE - INTERVAL '4 days', 'present', uid_teacher_sarah),
    (sid_maya, CURRENT_DATE - INTERVAL '5 days', 'present', uid_teacher_sarah),
    (sid_maya, CURRENT_DATE - INTERVAL '6 days', 'present', uid_teacher_sarah),
    (sid_maya, CURRENT_DATE - INTERVAL '7 days', 'late', uid_teacher_sarah),
    (sid_maya, CURRENT_DATE - INTERVAL '8 days', 'present', uid_teacher_sarah),
    (sid_maya, CURRENT_DATE - INTERVAL '9 days', 'present', uid_teacher_sarah),

    -- Ethan Miller (10-A)
    (sid_ethan, CURRENT_DATE, 'present', uid_teacher_sarah),
    (sid_ethan, CURRENT_DATE - INTERVAL '1 day', 'late', uid_teacher_sarah),
    (sid_ethan, CURRENT_DATE - INTERVAL '2 days', 'present', uid_teacher_sarah),
    (sid_ethan, CURRENT_DATE - INTERVAL '3 days', 'present', uid_teacher_sarah),
    (sid_ethan, CURRENT_DATE - INTERVAL '4 days', 'absent', uid_teacher_sarah),

    -- Sophia Rodriguez (10-A)
    (sid_sophia, CURRENT_DATE, 'present', uid_teacher_sarah),
    (sid_sophia, CURRENT_DATE - INTERVAL '1 day', 'present', uid_teacher_sarah),

    -- Noah Campbell (10-A)
    (sid_noah, CURRENT_DATE, 'absent', uid_teacher_sarah),
    (sid_noah, CURRENT_DATE - INTERVAL '1 day', 'present', uid_teacher_sarah),

    -- Emma Watson (10-B)
    (sid_emma, CURRENT_DATE, 'present', uid_teacher_sarah),
    (sid_oliver, CURRENT_DATE, 'late', uid_teacher_sarah)
    ON CONFLICT (student_id, date) DO NOTHING;

END $$;
