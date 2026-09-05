import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import DepartmentAnalyticsChart from '../../components/charts/DepartmentAnalyticsChart';
import api from '../../services/api';
import { Users, UserCheck, Building2, BookOpen, Clock, ShieldAlert, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useLiveSync } from '../../hooks/useLiveSync';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const fetchAdminStats = async () => {
    const res = await api.get('/admin/dashboard/stats');
    return res.data;
  };

  const { data: stats, isSyncing, lastSyncedAt } = useLiveSync(fetchAdminStats, 5000);

  return (
    <MainLayout isSyncing={isSyncing} lastSyncedAt={lastSyncedAt}>
      {/* Admin Hero Header */}
      <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-yellow-500 to-amber-600 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900 dark:border dark:border-zinc-800 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-200 dark:text-zinc-400">Central Control System</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 text-white dark:text-zinc-100">Campus System Administration 🛡️</h1>
            <p className="text-xs text-white/90 dark:text-zinc-400 mt-1">
              Manage departments, faculty members, student enrollments, and system analytics.
            </p>
          </div>

          <button
            onClick={() => navigate('/admin/timetable')}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-yellow-400 to-amber-500 dark:bg-none dark:bg-zinc-800 dark:border dark:border-zinc-700 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all shrink-0"
          >
            Timetable Scheduler
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div
          onClick={() => navigate('/admin/students')}
          className="glass-card p-5 cursor-pointer hover:border-brand-violet transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Total Students</span>
            <div className="p-2 rounded-xl bg-brand-violet/10 text-brand-violet">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats?.totalStudents || '2,000+'}
          </p>
          <span className="text-[11px] font-semibold text-emerald-500">Active Registrations</span>
        </div>

        <div
          onClick={() => navigate('/admin/teachers')}
          className="glass-card p-5 cursor-pointer hover:border-brand-teal transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Faculty Members</span>
            <div className="p-2 rounded-xl bg-brand-teal/10 text-brand-teal">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats?.totalTeachers || '100+'}
          </p>
          <span className="text-[11px] font-semibold text-brand-teal">5 Departments</span>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Departments</span>
            <div className="p-2 rounded-xl bg-brand-amber/10 text-brand-amber">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats?.totalDepartments || '20+'}
          </p>
          <span className="text-[11px] font-semibold text-indigo-500">Academic Units</span>
        </div>

        <div
          onClick={() => navigate('/admin/emergency')}
          className="glass-card p-5 cursor-pointer hover:border-rose-500/50 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Emergency Reports</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-rose-500">
            {stats?.openEmergencyReports || '1'}
          </p>
          <span className="text-[11px] font-bold text-rose-500 flex items-center gap-1">
            <span>Requires Moderation</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Analytics Graph */}
      <div className="glass-card p-6 mb-8">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Campus-wide Department Distribution</h3>
        <DepartmentAnalyticsChart />
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
