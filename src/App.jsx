import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public Pages
import LandingPage from '../app/(public)/page.jsx';
import LoginPage from '../app/(public)/login/page.jsx';
import RegisterPage from '../app/(public)/register/page.jsx';
import OnboardingPage from '../app/(public)/onboarding/page.jsx';

// Student Pages
import StudentDashboardPage from '../app/(student)/app/dashboard/page.jsx';
import AdventurePage from '../app/(student)/app/adventure/page.jsx';
import LearnPage from '../app/(student)/app/learn/page.jsx';
import LessonDetailPage from '../app/(student)/app/learn/[lessonId]/page.jsx';
import PlaygroundPage from '../app/(student)/app/playground/page.jsx';
import ProjectsPage from '../app/(student)/app/projects/page.jsx';
import NewProjectPage from '../app/(student)/app/projects/new/page.jsx';
import ProjectDetailPage from '../app/(student)/app/projects/[id]/page.jsx';
import GalleryPage from '../app/(student)/app/gallery/page.jsx';
import AchievementsPage from '../app/(student)/app/achievements/page.jsx';
import ProgressPage from '../app/(student)/app/progress/page.jsx';
import SettingsPage from '../app/(student)/app/settings/page.jsx';

// Parent Pages
import ParentDashboardPage from '../app/(parent)/parent/page.jsx';
import ParentChildrenPage from '../app/(parent)/parent/children/page.jsx';
import ParentChildDetailPage from '../app/(parent)/parent/children/[id]/page.jsx';
import ParentReportsPage from '../app/(parent)/parent/reports/page.jsx';
import ParentSettingsPage from '../app/(parent)/parent/settings/page.jsx';

// Teacher Pages
import TeacherDashboardPage from '../app/(teacher)/teacher/page.jsx';
import TeacherClassesPage from '../app/(teacher)/teacher/classes/page.jsx';
import TeacherStudentsPage from '../app/(teacher)/teacher/students/page.jsx';
import TeacherAssignmentsPage from '../app/(teacher)/teacher/assignments/page.jsx';
import TeacherCurriculumPage from '../app/(teacher)/teacher/curriculum/page.jsx';
import TeacherReportsPage from '../app/(teacher)/teacher/reports/page.jsx';
import TeacherSettingsPage from '../app/(teacher)/teacher/settings/page.jsx';

// Admin Page
import AdminDashboardPage from '../app/(admin)/admin/page.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />

      {/* Student App Routes */}
      <Route path="/app" element={<StudentDashboardPage />} />
      <Route path="/app/dashboard" element={<StudentDashboardPage />} />
      <Route path="/app/adventure" element={<AdventurePage />} />
      <Route path="/app/learn" element={<LearnPage />} />
      <Route path="/app/learn/:lessonId" element={<LessonDetailPage />} />
      <Route path="/app/playground" element={<PlaygroundPage />} />
      <Route path="/app/projects" element={<ProjectsPage />} />
      <Route path="/app/projects/new" element={<NewProjectPage />} />
      <Route path="/app/projects/:id" element={<ProjectDetailPage />} />
      <Route path="/app/gallery" element={<GalleryPage />} />
      <Route path="/app/achievements" element={<AchievementsPage />} />
      <Route path="/app/progress" element={<ProgressPage />} />
      <Route path="/app/settings" element={<SettingsPage />} />

      {/* Parent Routes */}
      <Route path="/parent" element={<ParentDashboardPage />} />
      <Route path="/parent/children" element={<ParentChildrenPage />} />
      <Route path="/parent/children/:id" element={<ParentChildDetailPage />} />
      <Route path="/parent/reports" element={<ParentReportsPage />} />
      <Route path="/parent/settings" element={<ParentSettingsPage />} />

      {/* Teacher Routes */}
      <Route path="/teacher" element={<TeacherDashboardPage />} />
      <Route path="/teacher/classes" element={<TeacherClassesPage />} />
      <Route path="/teacher/students" element={<TeacherStudentsPage />} />
      <Route path="/teacher/assignments" element={<TeacherAssignmentsPage />} />
      <Route path="/teacher/curriculum" element={<TeacherCurriculumPage />} />
      <Route path="/teacher/reports" element={<TeacherReportsPage />} />
      <Route path="/teacher/settings" element={<TeacherSettingsPage />} />

      {/* Admin Route */}
      <Route path="/admin" element={<AdminDashboardPage />} />
    </Routes>
  );
}
