import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import AttendanceTrendChart from '../../components/charts/AttendanceTrendChart';
import SubjectAttendanceChart from '../../components/charts/SubjectAttendanceChart';
import { CalendarCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';

const subjects = [
  { name: 'Java Programming', code: 'CS501', present: 18, total: 20, pct: 90 },
  { name: 'Database Management Systems', code: 'CS502', present: 17, total: 20, pct: 85 },
  { name: 'Computer Networks', code: 'CS503', present: 15, total: 19, pct: 78.9 },
  { name: 'Discrete Mathematics', code: 'MATH504', present: 13, total: 19, pct: 68.4, warning: true },
];

const StudentAttendance = () => {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Attendance Analytics</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Monitor your subject-wise attendance and overall progress. Maintain above 75% in all subjects.
        </p>
      </div>

      {/* Warning Alert */}
      <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center gap-3 text-xs">
        <AlertTriangle className="w-5 h-5 shrink-0" />
        <div>
          <p className="font-bold">Attendance Policy Warning:</p>
          <p className="mt-0.5">Discrete Mathematics (68.4%) is currently below the mandatory 75% threshold.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="glass-card p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Monthly Attendance Trend</h3>
          <AttendanceTrendChart />
        </div>

        <div className="glass-card p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Subject Percentage Comparison</h3>
          <SubjectAttendanceChart />
        </div>
      </div>

      {/* Subject Wise Detail Cards */}
      <div className="glass-card p-6">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Subject-Wise Breakdown</h3>
        <div className="space-y-4">
          {subjects.map((sub, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{sub.name} ({sub.code})</h4>
                  <p className="text-xs text-slate-500">{sub.present} Attended / {sub.total} Conducted</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-extrabold ${sub.pct < 75 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {sub.pct}%
                  </span>
                  {sub.warning && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-500">
                      Below 75%
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    sub.pct < 75 ? 'bg-rose-500' : 'bg-gradient-to-r from-brand-violet to-brand-teal'
                  }`}
                  style={{ width: `${sub.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentAttendance;
