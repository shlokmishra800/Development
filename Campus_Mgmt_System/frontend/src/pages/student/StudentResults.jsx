import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import PerformanceChart from '../../components/charts/PerformanceChart';
import { Award, FileSpreadsheet } from 'lucide-react';

const results = [
  { subject: 'Java Programming', code: 'CS501', midTerm: 92, assignment: 95, grade: 'A+', semester: 5 },
  { subject: 'Database Management Systems', code: 'CS502', midTerm: 85, assignment: 88, grade: 'A', semester: 5 },
  { subject: 'Computer Networks', code: 'CS503', midTerm: 78, assignment: 82, grade: 'B+', semester: 5 },
  { subject: 'Discrete Mathematics', code: 'MATH504', midTerm: 65, assignment: 70, grade: 'B', semester: 5 },
];

const StudentResults = () => {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Examination & Results</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review your academic scorecards, subject grades, and comparative performance.
        </p>
      </div>

      {/* CGPA Summary Banner */}
      <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-brand-violet to-brand-teal text-white shadow-xl flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-cyan">Academic Status</span>
          <h2 className="text-3xl font-extrabold mt-1">Semester 5 SGPA: 8.75</h2>
          <p className="text-xs text-white/80 mt-1">Overall Cumulative Grade Point Average (CGPA): 8.90</p>
        </div>

        <div className="p-3 bg-white/20 rounded-2xl">
          <Award className="w-10 h-10 text-brand-cyan" />
        </div>
      </div>

      {/* Recharts Academic Performance Graph */}
      <div className="glass-card p-6 mb-8">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Subject Marks Analytics</h3>
        <PerformanceChart />
      </div>

      {/* Results Table */}
      <div className="glass-card p-6 overflow-x-auto">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Scorecard Detail</h3>
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase">
              <th className="pb-3">Subject</th>
              <th className="pb-3">Code</th>
              <th className="pb-3">Mid-Term (100)</th>
              <th className="pb-3">Assignments</th>
              <th className="pb-3">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
            {results.map((r, idx) => (
              <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-3.5 font-bold text-slate-800 dark:text-slate-200">{r.subject}</td>
                <td className="py-3.5 text-slate-500">{r.code}</td>
                <td className="py-3.5 text-slate-800 dark:text-slate-200">{r.midTerm}</td>
                <td className="py-3.5 text-slate-800 dark:text-slate-200">{r.assignment}</td>
                <td className="py-3.5">
                  <span className="px-2.5 py-1 rounded-full bg-brand-violet/10 text-brand-violet dark:text-brand-cyan font-bold text-xs">
                    {r.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default StudentResults;
