import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { FileText, Calendar, Plus, Clock, CheckCircle2, XCircle } from 'lucide-react';

const initialLeaves = [
  {
    id: 1,
    startDate: '2026-09-10',
    endDate: '2026-09-12',
    reason: 'Attending National Level Hackathon Competition',
    status: 'APPROVED',
    remarks: 'Approved by Head of Department'
  },
  {
    id: 2,
    startDate: '2026-09-25',
    endDate: '2026-09-26',
    reason: 'Medical Leave - Viral Fever',
    status: 'PENDING',
    remarks: 'Under Review'
  }
];

const StudentLeave = () => {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleCreateLeave = (e) => {
    e.preventDefault();
    const newLeave = {
      id: Date.now(),
      startDate,
      endDate,
      reason,
      status: 'PENDING',
      remarks: 'Submitted for faculty approval'
    };
    setLeaves([newLeave, ...leaves]);
    setShowModal(false);
    setStartDate('');
    setEndDate('');
    setReason('');
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Leave Application</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Apply for academic leave and track real-time approval status from faculty.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-violet text-white font-bold text-xs hover:bg-brand-violetHover transition-colors flex items-center gap-2 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Apply Leave</span>
        </button>
      </div>

      <div className="space-y-4">
        {leaves.map((leave) => (
          <div key={leave.id} className="glass-card p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Calendar className="w-4 h-4 text-brand-violet" />
                <span>{leave.startDate} to {leave.endDate}</span>
              </div>

              {leave.status === 'APPROVED' && (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                </span>
              )}
              {leave.status === 'PENDING' && (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <Clock className="w-3.5 h-3.5" /> Pending Review
                </span>
              )}
              {leave.status === 'REJECTED' && (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                  <XCircle className="w-3.5 h-3.5" /> Rejected
                </span>
              )}
            </div>

            <p className="text-xs text-slate-800 dark:text-slate-200 font-medium mb-2">Reason: {leave.reason}</p>
            <p className="text-[11px] text-slate-500 italic">Faculty Remarks: {leave.remarks}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card p-6 max-w-md w-full animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Apply for Leave</h3>
            <form onSubmit={handleCreateLeave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Reason for Leave</label>
                <textarea
                  rows={3}
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide valid academic or personal reason..."
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-violet text-white font-bold hover:bg-brand-violetHover"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default StudentLeave;
