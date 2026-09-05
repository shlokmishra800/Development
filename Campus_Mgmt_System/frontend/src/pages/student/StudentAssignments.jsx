import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { BookOpen, Upload, Clock, CheckCircle2, FileText, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const initialAssignments = [
  {
    id: 'a1',
    title: 'Spring Boot & Microservices Architecture Project',
    subject: 'Java Programming (CS501)',
    dueDate: '2026-09-15T23:59:00',
    maxMarks: 100,
    description: 'Implement a RESTful full-stack application with JWT security, MongoDB Atlas, and Recharts dashboard analytics.',
    status: 'PENDING'
  },
  {
    id: 'a2',
    title: 'Database Normalization & Query Tuning',
    subject: 'DBMS (CS502)',
    dueDate: '2026-09-20T23:59:00',
    maxMarks: 50,
    description: 'Submit 3NF schema design and optimized query execution plans for a enterprise e-commerce platform.',
    status: 'SUBMITTED',
    submittedAt: '2026-09-01'
  }
];

const StudentAssignments = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState(initialAssignments);
  const [selectedAssign, setSelectedAssign] = useState(null);
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleOpenSubmitModal = (assign) => {
    setSelectedAssign(assign);
    setSubmissionUrl('');
    setSubmissionNotes('');
    setSuccessMsg('');
  };

  const handleSubmitAssignment = async (e) => {
    e.preventDefault();
    try {
      if (user?.profileDetails?.id && selectedAssign) {
        await api.post(`/student/assignments/${selectedAssign.id}/submit`, null, {
          params: {
            studentId: user.profileDetails.id,
            contentUrl: submissionUrl,
            submissionText: submissionNotes
          }
        });
      }
      setAssignments((prev) =>
        prev.map((a) => (a.id === selectedAssign.id ? { ...a, status: 'SUBMITTED' } : a))
      );
      setSuccessMsg('Assignment submitted successfully!');
      setTimeout(() => setSelectedAssign(null), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Assignments Portal</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Track deadlines, download instructions, and submit your homework projects.
        </p>
      </div>

      <div className="space-y-6">
        {assignments.map((assign) => (
          <div key={assign.id} className="glass-card p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-brand-violet/10 text-brand-violet dark:text-brand-cyan mb-2 inline-block">
                  {assign.subject}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{assign.title}</h3>
              </div>

              <div className="flex items-center gap-3">
                {assign.status === 'SUBMITTED' ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Submitted
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                    <Clock className="w-3.5 h-3.5" />
                    Pending Submission
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {assign.description}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-700/60 text-xs">
              <div className="flex items-center gap-4 text-slate-500">
                <span>Max Marks: <strong className="text-slate-800 dark:text-slate-200">{assign.maxMarks}</strong></span>
                <span>Due Date: <strong className="text-slate-800 dark:text-slate-200">{new Date(assign.dueDate).toLocaleDateString()}</strong></span>
              </div>

              {assign.status !== 'SUBMITTED' ? (
                <button
                  onClick={() => handleOpenSubmitModal(assign)}
                  className="px-4 py-2 rounded-xl bg-brand-violet text-white font-bold hover:bg-brand-violetHover transition-colors flex items-center gap-1.5 shadow"
                >
                  <Upload className="w-4 h-4" />
                  <span>Submit Assignment</span>
                </button>
              ) : (
                <span className="text-xs text-slate-400 font-medium">Submitted on {assign.submittedAt}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      {selectedAssign && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card p-6 max-w-md w-full animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Submit Assignment</h3>
            <p className="text-xs text-slate-500 mb-4">{selectedAssign.title}</p>

            {successMsg ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>{successMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitAssignment} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold mb-1">GitHub / Document URL</label>
                  <input
                    type="url"
                    required
                    value={submissionUrl}
                    onChange={(e) => setSubmissionUrl(e.target.value)}
                    placeholder="https://github.com/username/project"
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-violet"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Submission Comments / Notes</label>
                  <textarea
                    rows={3}
                    value={submissionNotes}
                    onChange={(e) => setSubmissionNotes(e.target.value)}
                    placeholder="Provide any additional comments for professor..."
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-violet"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedAssign(null)}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-brand-violet text-white font-bold hover:bg-brand-violetHover"
                  >
                    Confirm Submission
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default StudentAssignments;
