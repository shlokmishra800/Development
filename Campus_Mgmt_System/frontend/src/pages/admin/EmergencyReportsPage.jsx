import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { ShieldAlert, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

const initialReports = [
  {
    id: 1,
    type: 'MEDICAL',
    reporter: 'Shlok Mishra',
    location: 'Sports Complex / Gymnasium',
    description: 'Student twisted ankle during basketball practice. Requires first-aid assistance.',
    priority: 'HIGH',
    status: 'OPEN',
    time: '10 mins ago'
  },
  {
    id: 2,
    type: 'INFRASTRUCTURE',
    reporter: 'Ankit Verma',
    location: 'Lab-3 Computer Center',
    description: 'AC unit short circuit causing localized smoke.',
    priority: 'CRITICAL',
    status: 'INVESTIGATING',
    time: '2 hours ago'
  }
];

const EmergencyReportsPage = () => {
  const [reports, setReports] = useState(initialReports);

  const handleResolve = (id) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'RESOLVED' } : r))
    );
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldAlert className="w-7 h-7 text-rose-500" />
          <span>Campus Emergency Command Desk</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Real-time incident reports submitted by students and campus security personnel.
        </p>
      </div>

      <div className="space-y-4">
        {reports.map((r) => (
          <div key={r.id} className="glass-card p-6 border-l-4 border-rose-500">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-rose-500 text-white">
                  {r.type} EMERGENCY
                </span>
                <span className="text-xs text-slate-400 font-medium">{r.time}</span>
              </div>

              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                r.status === 'RESOLVED' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500 animate-pulse'
              }`}>
                {r.status}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Reported by {r.reporter}</h3>
            <p className="text-xs text-brand-teal font-semibold mb-2">Location: {r.location}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{r.description}</p>

            {r.status !== 'RESOLVED' && (
              <button
                onClick={() => handleResolve(r.id)}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-bold text-xs hover:bg-emerald-600 transition-colors shadow"
              >
                Mark Incident Resolved
              </button>
            )}
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default EmergencyReportsPage;
