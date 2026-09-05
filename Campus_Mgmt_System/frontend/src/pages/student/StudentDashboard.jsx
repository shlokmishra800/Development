import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import SubjectAttendanceChart from '../../components/charts/SubjectAttendanceChart';
import AttendanceTrendChart from '../../components/charts/AttendanceTrendChart';
import {
  Sun,
  Moon,
  Sunset,
  CalendarCheck,
  BookOpen,
  Clock,
  AlertTriangle,
  FileText,
  Calendar,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useLiveSync } from '../../hooks/useLiveSync';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [countdown, setCountdown] = useState('35:00');
  const navigate = useNavigate();

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    const name = user?.fullName?.split(' ')[0] || 'Student';
    if (hour < 12) return { text: `Good Morning, ${name} ☀️`, icon: Sun, color: 'text-amber-500' };
    if (hour < 17) return { text: `Good Afternoon, ${name} 👋`, icon: Sun, color: 'text-amber-500' };
    return { text: `Good Evening, ${name} 🌙`, icon: Moon, color: 'text-indigo-400' };
  };

  const greeting = getGreeting();

  // Real-time MongoDB Auto-Sync
  const fetchSummary = async () => {
    if (user?.profileDetails?.id) {
      const res = await api.get(`/student/dashboard/summary/${user.profileDetails.id}`);
      return res.data;
    }
    return null;
  };

  const { data: summary, isSyncing, lastSyncedAt } = useLiveSync(fetchSummary, 5000, [user?.profileDetails?.id]);

  // Live Countdown Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        const [m, s] = prev.split(':').map(Number);
        if (s > 0) return `${m}:${s - 1 < 10 ? '0' : ''}${s - 1}`;
        if (m > 0) return `${m - 1}:59`;
        return '00:00';
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <MainLayout isSyncing={isSyncing} lastSyncedAt={lastSyncedAt}>
      {/* Time-Based Greeting Banner */}
      <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-yellow-500 to-amber-600 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900 dark:border dark:border-zinc-800 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/10 dark:bg-zinc-800/30 skew-x-12 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-yellow-200 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">
              <greeting.icon className={`w-4 h-4 ${greeting.color}`} />
              <span>CampusConnect Student Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-zinc-100">{greeting.text}</h1>
            <p className="text-xs text-white/90 dark:text-zinc-400 mt-1 max-w-lg">
              Welcome back to your academic portal. You have 2 pending assignments and 4 scheduled classes today.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/20 dark:bg-zinc-800/80 backdrop-blur-md border border-white/30 dark:border-zinc-700 text-center min-w-[160px]">
            <p className="text-[10px] font-bold text-white/90 dark:text-zinc-400 uppercase">Next Class In</p>
            <p className="text-2xl font-mono font-extrabold text-yellow-300 dark:text-yellow-400 mt-0.5">{countdown}</p>
            <p className="text-[10px] text-white/90 dark:text-zinc-300 font-medium">Java Programming (A-204)</p>
          </div>
        </div>
      </div>

      {/* Attendance Warning Banner if < 75% */}
      {summary?.lowAttendanceWarning && (
        <div className="mb-8 p-4 rounded-2xl bg-rose-500/10 dark:bg-rose-950/30 border border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div className="text-xs">
              <p className="font-bold">Attendance Warning Notice</p>
              <p className="text-rose-600/90 dark:text-rose-400/90 mt-0.5">
                Your attendance in Discrete Mathematics is below 75% (68%). Please ensure regular attendance to remain eligible for examinations.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/student/attendance')}
            className="px-3 py-1.5 rounded-xl bg-rose-500 text-white font-bold text-xs shrink-0 hover:bg-rose-600 transition-colors"
          >
            View Attendance
          </button>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Attendance</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-zinc-800 dark:text-emerald-400">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
            {summary?.overallAttendancePercentage || 87}%
          </p>
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">Good Standing</span>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Classes Today</span>
            <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-600 dark:bg-zinc-800 dark:text-yellow-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">4</p>
          <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">Next: Java Prog</span>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Pending Assignments</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:bg-zinc-800 dark:text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
            {summary?.pendingAssignmentsCount || 2}
          </p>
          <span className="text-[11px] font-semibold text-rose-500">Due this week</span>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Upcoming Exams</span>
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:bg-zinc-800 dark:text-teal-400">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">3</p>
          <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400">Starts Oct 15</span>
        </div>
      </div>

      {/* Analytics Charts & Class Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Subject-wise Attendance Breakdown</h3>
            <span className="text-xs text-slate-500">Semester 5</span>
          </div>
          <SubjectAttendanceChart />
        </div>

        {/* What is My Next Class? Card */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-zinc-800 dark:text-zinc-200 dark:border dark:border-zinc-700 text-xs font-bold mb-4">
              <Clock className="w-3.5 h-3.5 text-yellow-500" />
              <span>What is My Next Class?</span>
            </div>

            <h4 className="text-xl font-extrabold text-zinc-900 dark:text-white">Java Programming</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Course Code: CS501 • 4 Credits</p>

            <div className="mt-6 space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80">
                <span className="text-zinc-500 dark:text-zinc-400">Faculty</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">Prof. Alok Sharma</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80">
                <span className="text-zinc-500 dark:text-zinc-400">Classroom</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">Room A-204</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80">
                <span className="text-zinc-500 dark:text-zinc-400">Time Slot</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">09:30 AM - 10:30 AM</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/student/timetable')}
            className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-yellow-400 to-amber-500 dark:bg-none dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:border dark:border-zinc-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 dark:shadow-none"
          >
            <span>View Full Timetable</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentDashboard;
