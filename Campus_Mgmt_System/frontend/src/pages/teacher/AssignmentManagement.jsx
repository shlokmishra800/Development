import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { BookOpen, Plus, FileText, CheckCircle2, Star } from 'lucide-react';

const initialAssignments = [
  {
    id: 1,
    title: 'Spring Boot & Microservices Project',
    subject: 'Java Programming (CS501)',
    dueDate: '2026-09-15',
    submissionsCount: 18,
    gradedCount: 14
  },
  {
    id: 2,
    title: 'Database Normalization & Query Tuning',
    subject: 'DBMS (CS502)',
    dueDate: '2026-09-20',
    submissionsCount: 12,
    gradedCount: 8
  }
];

const AssignmentManagement = () => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Java Programming (CS501)');
  const [dueDate, setDueDate] = useState('');
  const [maxMarks, setMaxMarks] = useState('100');
  const [description, setDescription] = useState('');

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    const newAssignment = {
      id: Date.now(),
      title,
      subject,
      dueDate,
      submissionsCount: 0,
      gradedCount: 0
    };
    setAssignments([newAssignment, ...assignments]);
    setShowCreateModal(false);
    setTitle('');
    setDueDate('');
    setDescription('');
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Assignments & Evaluation</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create new student assignments, set deadlines, and grade project submissions.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-violet text-white font-bold text-xs hover:bg-brand-violetHover transition-colors flex items-center gap-2 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Create Assignment</span>
        </button>
      </div>

      <div className="space-y-4">
        {assignments.map((assign) => (
          <div key={assign.id} className="glass-card p-6 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-brand-violet/10 text-brand-violet dark:text-brand-cyan mb-2 inline-block">
                {assign.subject}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{assign.title}</h3>
              <p className="text-xs text-slate-500 mt-1">Due Date: {assign.dueDate}</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="text-right">
                <p className="text-slate-800 dark:text-slate-200">{assign.submissionsCount} Submissions</p>
                <p className="text-emerald-500 text-[11px] font-semibold">{assign.gradedCount} Graded</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-brand-violet text-white transition-colors">
                Review & Grade
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card p-6 max-w-md w-full animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Create New Assignment</h3>
            <form onSubmit={handleCreateAssignment} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Assignment Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Spring Boot Microservices Architecture"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                >
                  <option value="Java Programming (CS501)">Java Programming (CS501)</option>
                  <option value="DBMS (CS502)">DBMS (CS502)</option>
                  <option value="Computer Networks (CS503)">Computer Networks (CS503)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Due Date</label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Max Marks</label>
                  <input
                    type="number"
                    value={maxMarks}
                    onChange={(e) => setMaxMarks(e.target.value)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Instructions / Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details for students..."
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-violet text-white font-bold hover:bg-brand-violetHover"
                >
                  Post Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default AssignmentManagement;
