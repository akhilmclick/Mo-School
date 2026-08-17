# Mo-School — School Management SaaS (Phase 1)

A modern, role-based School Management SaaS web app built for mid-size educational institutions (1,400–2,000 students). Features a single unified entry portal with role-based routing for **Parents**, **Teachers**, and **Administrators**, powered by PostgreSQL + Row-Level Security (RLS).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript + React
- **Styling**: Tailwind CSS + Lucide React
- **Database & Auth**: PostgreSQL / Supabase with Row-Level Security (RLS)
- **Design System**: Mobile-first responsive UI with warm gradient hero banners, pill badge status chips, and glassmorphic floating dock navigation

---

## 🌟 Key Features

### 1. Unified Authentication & Role Gateway (`/`)
- Single unified login screen for all user roles.
- Intelligent automatic routing to `/parent`, `/teacher`, or `/admin`.
- Multi-role gateway (`/role-select`) for accounts with dual roles (e.g. teachers whose own children study at the school).
- 1-click Quick Demo logins for testing all personas instantly.

### 2. Parent Workspace (`/parent`)
- **Multi-Child Sibling Switcher**: Seamless horizontal scroll switcher to toggle between linked students (e.g. Leo Vance in 10-A, Maya Vance in 7-B).
- **Recent Attendance Timeline**: 10-day history with colored pill status badges (`Present`, `Absent`, `Late`).
- **Official Notices & Circulars**: Class-targeted and school-wide announcements with expandable view.
- **Mandatory Notice Acknowledgment**: Prominent acknowledgment banners, action alerts, and digital receipt logging stored in database.
- **Student Profile**: Academic identifier, permanent admission number, DOB, and residential address.
- **4-Tab Bottom Dock**: Home, Attendance, Notices, Profile.

### 3. Teacher Workspace (`/teacher`)
- **Assigned Class Chips**: Switch between assigned class-sections (`10-A`, `10-B`, `9-A`).
- **Fast Roll-Call UI**: Tap-friendly 3-way toggle buttons (`Present`, `Absent`, `Late`) per student, with a "Mark All Present" shortcut and submission feedback.
- **Student Profile & Emergency Contacts Drawer**: Direct access to student details and linked guardian emergency phone/email.
- **Notice Publishing**: Compose announcements targeting the whole school or specific grade/sections with optional mandatory parent acknowledgment.
- **4-Tab Bottom Dock**: Home, Classes, Notices, Profile.

### 4. Administrator Console (`/admin`)
- **KPI Metrics Dashboard**: Live counters for total students, total faculty, daily attendance turnout %, and active circulars.
- **Student Directory Management**: Live search by name or student ID, class filter, and new student enrollment form (with auto-generated `YEAR-CLASS-SEQ` IDs).
- **Faculty Directory & Assignments**: Manage teaching staff, subject specializations, and class assignments.
- **Notice Compliance Audit Log**: School-wide circulars manager with real-time acknowledgment compliance percentages and verified receipt logs.
- **Class Turnout Breakdown**: Real-time attendance rate progress bars by grade and section.

---

## 🗄️ PostgreSQL Database Schema & RLS

Complete SQL migration and seed scripts are included in `supabase/`:
- `supabase/schema.sql`: Tables (`students`, `guardians`, `guardian_student`, `teachers`, `teacher_class_assignments`, `user_roles`, `attendance`, `notices`, `notice_acknowledgments`), indexes, and Row-Level Security policies.
- `supabase/seed.sql`: Realistic seed data matching test scenarios.

---

## 🚀 Getting Started

### Installation
```bash
# Clone the repository
git clone https://github.com/akhilmclick/Mo-School.git
cd Mo-School

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| Parent (2 Kids) | `parent1@school.com` | `password123` |
| Parent (1 Kid) | `parent2@school.com` | `password123` |
| Teacher & Parent (Dual) | `teacher1@school.com` | `password123` |
| Teacher | `teacher2@school.com` | `password123` |
| Admin | `admin@school.com` | `password123` |
