import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { AlertTriangle, User, BookOpen, CalendarCheck, ShieldAlert, Sparkles } from 'lucide-react';

const atRiskStudents = [
  {
    name: 'Rahul Kumar',
    rollNumber: '2026CSE002',
    attendancePct: 62.0,
    missingAssignments: 3,
    avgMarks: 54.0,
    riskLevel: 'HIGH',
    reason: 'Attendance below 75% (62%), 3 missing assignments'
  },
  {
    name: 'Priya Sharma',
    rollNumber: '2026CSE003',
    attendancePct: 78.0,
    missingAssignments: 1,
    avgMarks: 48.0,
    riskLevel: 'MEDIUM',
    reason: 'Average Marks below 50% (48%)'
  }
];

const AtRiskStudents = () => {
  return (
    <MainLayout>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-bold mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Smart Academic Detection Engine</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">At-Risk Student Detection</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Automated risk analysis identifying students requiring immediate academic intervention based on low attendance (&lt;75%), missing assignments (&ge;2), or low average marks (&lt;50%).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {atRiskStudents.map((student, idx) => (
          <div key={idx} className="glass-card p-6 border-l-4 border-rose-500 relative overflow-hidden">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold text-sm">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">{student.name}</h3>
                  <p className="text-xs text-slate-500">Roll: {student.rollNumber}</p>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-extrabold shadow-sm ${
                student.riskLevel === 'HIGH' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white'
              }`}>
                {student.riskLevel} RISK
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4 text-center">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Attendance</p>
                <p className={`text-lg font-extrabold mt-0.5 ${student.attendancePct < 75 ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {student.attendancePct}%
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Missing Homework</p>
                <p className={`text-lg font-extrabold mt-0.5 ${student.missingAssignments >= 2 ? 'text-rose-500' : 'text-slate-800 dark:text-slate-200'}`}>
                  {student.missingAssignments}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Avg Score</p>
                <p className={`text-lg font-extrabold mt-0.5 ${student.avgMarks < 50 ? 'text-rose-500' : 'text-slate-800 dark:text-slate-200'}`}>
                  {student.avgMarks}%
                </p>
              </div>
            </div>

            <p className="text-xs text-rose-600 dark:text-rose-400 font-medium bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
              Trigger Reason: {student.reason}
            </p>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default AtRiskStudents;
