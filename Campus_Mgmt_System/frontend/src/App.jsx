import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import LostFoundPage from './pages/public/LostFoundPage';
import MarketplacePage from './pages/public/MarketplacePage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentAttendance from './pages/student/StudentAttendance';
import StudentTimetable from './pages/student/StudentTimetable';
import StudentAssignments from './pages/student/StudentAssignments';
import StudentResults from './pages/student/StudentResults';
import StudentNotices from './pages/student/StudentNotices';
import StudentEvents from './pages/student/StudentEvents';
import StudentLeave from './pages/student/StudentLeave';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import AttendanceManagement from './pages/teacher/AttendanceManagement';
import AssignmentManagement from './pages/teacher/AssignmentManagement';
import AtRiskStudents from './pages/teacher/AtRiskStudents';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentManagement from './pages/admin/StudentManagement';
import TeacherManagement from './pages/admin/TeacherManagement';
import TimetableManagement from './pages/admin/TimetableManagement';
import EmergencyReportsPage from './pages/admin/EmergencyReportsPage';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/public/lost-found" element={<LostFoundPage />} />
            <Route path="/public/marketplace" element={<MarketplacePage />} />

            {/* Student Routes */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_TEACHER', 'ROLE_ADMIN']}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/attendance"
              element={
                <ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_TEACHER', 'ROLE_ADMIN']}>
                  <StudentAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/timetable"
              element={
                <ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_TEACHER', 'ROLE_ADMIN']}>
                  <StudentTimetable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/assignments"
              element={
                <ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_TEACHER', 'ROLE_ADMIN']}>
                  <StudentAssignments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/results"
              element={
                <ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_TEACHER', 'ROLE_ADMIN']}>
                  <StudentResults />
                </ProtectedRoute>
              }
            />
            <Route path="/student/notices" element={<StudentNotices />} />
            <Route path="/student/events" element={<StudentEvents />} />
            <Route path="/student/leave" element={<StudentLeave />} />

            {/* Teacher Routes */}
            <Route
              path="/teacher/dashboard"
              element={
                <ProtectedRoute allowedRoles={['ROLE_TEACHER', 'ROLE_ADMIN']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/classes"
              element={
                <ProtectedRoute allowedRoles={['ROLE_TEACHER', 'ROLE_ADMIN']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/attendance"
              element={
                <ProtectedRoute allowedRoles={['ROLE_TEACHER', 'ROLE_ADMIN']}>
                  <AttendanceManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/assignments"
              element={
                <ProtectedRoute allowedRoles={['ROLE_TEACHER', 'ROLE_ADMIN']}>
                  <AssignmentManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/at-risk-students"
              element={
                <ProtectedRoute allowedRoles={['ROLE_TEACHER', 'ROLE_ADMIN']}>
                  <AtRiskStudents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/leave-requests"
              element={
                <ProtectedRoute allowedRoles={['ROLE_TEACHER', 'ROLE_ADMIN']}>
                  <StudentLeave />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/students"
              element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <StudentManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/teachers"
              element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <TeacherManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/departments"
              element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/timetable"
              element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <TimetableManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/notices"
              element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <StudentNotices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/events"
              element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <StudentEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/emergency"
              element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <EmergencyReportsPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
