import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { BookOpen, Users, Clock, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useLiveSync } from '../../hooks/useLiveSync';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchTeacherData = async () => {
    if (user?.profileDetails?.id) {
      const [subjectsRes, atRiskRes] = await Promise.all([
        api.get(`/teacher/subjects/${user.profileDetails.id}`),
        api.get(`/teacher/at-risk-students/${user.profileDetails.id}`)
      ]);
      return {
        subjects: subjectsRes.data || [],
        atRiskStudents: atRiskRes.data || []
      };
    }
    return { subjects: [], atRiskStudents: [] };
  };

  const { data, isSyncing, lastSyncedAt } = useLiveSync(fetchTeacherData, 5000, [user?.profileDetails?.id]);
  const subjects = data?.subjects || [];
  const atRiskStudents = data?.atRiskStudents || [];

  return (
    <MainLayout isSyncing={isSyncing} lastSyncedAt={lastSyncedAt}>
      {/* Teacher Welcome Banner */}
      <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-yellow-500 to-amber-600 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900 dark:border dark:border-zinc-800 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-200 dark:text-zinc-400">Faculty Command Center</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 text-white dark:text-zinc-100">Welcome, {user?.fullName || 'Professor'} 👨‍🏫</h1>
            <p className="text-xs text-white/90 dark:text-zinc-400 mt-1">
              Associate Professor • Computer Science & Engineering Department
            </p>
          </div>

          <button
            onClick={() => navigate('/teacher/attendance')}
            className="px-5 py-3 rounded-2xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold text-xs shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:border dark:border-zinc-700 transition-all flex items-center gap-2 shrink-0"
          >
            <span>Mark Today's Attendance</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Classes Today</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">3</p>
          <span className="text-[11px] font-semibold text-brand-teal">Room A-204 & Lab-3</span>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Total Students</span>
            <div className="p-2 rounded-xl bg-brand-violet/10 text-brand-violet">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">120</p>
          <span className="text-[11px] font-semibold text-emerald-500">4 Active Sections</span>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Pending Submissions</span>
            <div className="p-2 rounded-xl bg-brand-amber/10 text-brand-amber">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">14</p>
          <span className="text-[11px] font-semibold text-rose-500">Requires Grading</span>
        </div>

        <div
          onClick={() => navigate('/teacher/at-risk-students')}
          className="glass-card p-5 cursor-pointer hover:border-rose-500/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">At-Risk Students</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-rose-500">{atRiskStudents.length}</p>
          <span className="text-[11px] font-bold text-rose-500 flex items-center gap-1">
            <span>Attendance &lt; 75%</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Assigned Subjects Overview */}
      <div className="glass-card p-6 mb-8">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Assigned Subjects & Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Java Programming (CS501)</h4>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-violet/10 text-brand-violet">B.Tech CSE - Sem 5</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">60 Students • 4 Credits • Room A-204</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-500 font-bold">Avg Attendance: 88%</span>
              <button
                onClick={() => navigate('/teacher/attendance')}
                className="text-brand-violet dark:text-brand-cyan font-bold hover:underline"
              >
                Mark Attendance
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Database Management Systems (CS502)</h4>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-teal/10 text-brand-teal">B.Tech CSE - Sem 5</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">60 Students • 4 Credits • Lab-3</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-500 font-bold">Avg Attendance: 84%</span>
              <button
                onClick={() => navigate('/teacher/attendance')}
                className="text-brand-violet dark:text-brand-cyan font-bold hover:underline"
              >
                Mark Attendance
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TeacherDashboard;
