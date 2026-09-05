import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { UserCheck, Plus, Search, Trash2 } from 'lucide-react';

const initialTeachers = [
  { id: 't1', name: 'Prof. Alok Sharma', email: 'teacher@campus.edu', empId: 'EMP-1001', dept: 'CSE', designation: 'Associate Professor' },
  { id: 't2', name: 'Dr. Ananya Verma', email: 'ananya@campus.edu', empId: 'EMP-1002', dept: 'ECE', designation: 'Professor' },
];

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleAddTeacher = (e) => {
    e.preventDefault();
    const newTeacher = {
      id: Date.now().toString(),
      name,
      email,
      empId: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      dept: 'CSE',
      designation: 'Assistant Professor'
    };
    setTeachers([newTeacher, ...teachers]);
    setShowAddModal(false);
    setName('');
    setEmail('');
  };

  const handleDeleteTeacher = (id) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Teacher Management</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage faculty profiles, employee IDs, and subject assignments.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-violet text-white font-bold text-xs hover:bg-brand-violetHover transition-colors flex items-center gap-2 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Teacher</span>
        </button>
      </div>

      <div className="glass-card p-6 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase">
              <th className="pb-3">Emp ID</th>
              <th className="pb-3">Faculty Name</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Department</th>
              <th className="pb-3">Designation</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
            {teachers.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-3.5 text-slate-500 font-mono">{t.empId}</td>
                <td className="py-3.5 font-bold text-slate-800 dark:text-slate-200">{t.name}</td>
                <td className="py-3.5 text-slate-500">{t.email}</td>
                <td className="py-3.5"><span className="px-2 py-0.5 rounded bg-brand-teal/10 text-brand-teal font-bold">{t.dept}</span></td>
                <td className="py-3.5">{t.designation}</td>
                <td className="py-3.5 text-right">
                  <button
                    onClick={() => handleDeleteTeacher(t.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card p-6 max-w-md w-full animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Add Faculty Member</h3>
            <form onSubmit={handleAddTeacher} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Prof. Alok Sharma"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="teacher@campus.edu"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-violet text-white font-bold hover:bg-brand-violetHover"
                >
                  Save Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default TeacherManagement;
