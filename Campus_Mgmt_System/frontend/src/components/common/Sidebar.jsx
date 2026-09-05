import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  CalendarCheck,
  Clock,
  BookOpen,
  FileText,
  Bell,
  Calendar,
  FileSpreadsheet,
  Users,
  UserCheck,
  Building2,
  GraduationCap,
  AlertTriangle,
  ShoppingBag,
  HelpCircle,
  ShieldAlert,
  BarChart3
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const role = user?.role || 'ROLE_STUDENT';

  const studentNav = [
    { title: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { title: 'My Attendance', path: '/student/attendance', icon: CalendarCheck },
    { title: 'Timetable', path: '/student/timetable', icon: Clock },
    { title: 'Assignments', path: '/student/assignments', icon: BookOpen },
    { title: 'Exams & Results', path: '/student/results', icon: FileSpreadsheet },
    { title: 'Notices', path: '/student/notices', icon: Bell },
    { title: 'Campus Events', path: '/student/events', icon: Calendar },
    { title: 'Leave Application', path: '/student/leave', icon: FileText },
    { title: 'Lost & Found', path: '/public/lost-found', icon: HelpCircle },
    { title: 'Campus Marketplace', path: '/public/marketplace', icon: ShoppingBag },
  ];

  const teacherNav = [
    { title: 'Dashboard', path: '/teacher/dashboard', icon: LayoutDashboard },
    { title: 'My Classes', path: '/teacher/classes', icon: BookOpen },
    { title: 'Mark Attendance', path: '/teacher/attendance', icon: CalendarCheck },
    { title: 'Assignments & Grading', path: '/teacher/assignments', icon: FileText },
    { title: 'At-Risk Students', path: '/teacher/at-risk-students', icon: AlertTriangle, badge: 'Smart' },
    { title: 'Leave Requests', path: '/teacher/leave-requests', icon: Clock },
    { title: 'Lost & Found', path: '/public/lost-found', icon: HelpCircle },
    { title: 'Campus Marketplace', path: '/public/marketplace', icon: ShoppingBag },
  ];

  const adminNav = [
    { title: 'Admin Analytics', path: '/admin/dashboard', icon: BarChart3 },
    { title: 'Student Management', path: '/admin/students', icon: Users },
    { title: 'Teacher Management', path: '/admin/teachers', icon: UserCheck },
    { title: 'Department & Courses', path: '/admin/departments', icon: Building2 },
    { title: 'Timetable & Conflicts', path: '/admin/timetable', icon: Clock },
    { title: 'Campus Notices', path: '/admin/notices', icon: Bell },
    { title: 'Event Management', path: '/admin/events', icon: Calendar },
    { title: 'Emergency Reports', path: '/admin/emergency', icon: ShieldAlert, badge: 'Alert' },
  ];

  let navItems = studentNav;
  if (role === 'ROLE_TEACHER') navItems = teacherNav;
  if (role === 'ROLE_ADMIN') navItems = adminNav;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 transition-transform duration-300 ease-in-out flex flex-col pt-16 lg:pt-20 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
            Main Portal Menu
          </span>
          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:bg-zinc-800 dark:text-zinc-200 dark:border dark:border-zinc-700">
            {role.replace('ROLE_', '')}
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={idx}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 via-yellow-400 to-amber-500 text-white font-bold shadow-md shadow-emerald-500/20 dark:bg-none dark:bg-zinc-800 dark:text-zinc-100 dark:border dark:border-zinc-700 dark:shadow-none'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.title}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-rose-500 text-white shadow-sm">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-yellow-50 dark:from-zinc-900 dark:to-zinc-900 border border-emerald-200/60 dark:border-zinc-800">
            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">CampusConnect v1.0</p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">MongoDB Cloud & Spring Boot</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
