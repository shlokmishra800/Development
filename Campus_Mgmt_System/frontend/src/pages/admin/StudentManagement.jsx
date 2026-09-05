import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Users, Plus, Search, Trash2, Edit, CheckCircle2 } from 'lucide-react';

const initialStudents = [
  { id: 'st1', name: 'Shlok Mishra', email: 'student@campus.edu', roll: '2026CSE001', dept: 'CSE', sem: 5, active: true },
  { id: 'st2', name: 'Rahul Kumar', email: 'rahul@campus.edu', roll: '2026CSE002', dept: 'CSE', sem: 5, active: true },
  { id: 'st3', name: 'Priya Sharma', email: 'priya@campus.edu', roll: '2026CSE003', dept: 'CSE', sem: 5, active: true },
];

const StudentManagement = () => {
  const [students, setStudents] = useState(initialStudents);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roll, setRoll] = useState('');

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newStudent = {
      id: Date.now().toString(),
      name,
      email,
      roll: roll || `2026CSE00${students.length + 1}`,
      dept: 'CSE',
      sem: 5,
      active: true
    };
    setStudents([newStudent, ...students]);
    setShowAddModal(false);
    setName('');
    setEmail('');
    setRoll('');
  };

  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Student Management</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Add, update, search, and manage student enrollments across departments.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-violet text-white font-bold text-xs hover:bg-brand-violetHover transition-colors flex items-center gap-2 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Student</span>
        </button>
      </div>

      <div className="glass-card p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search students by name or email..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          />
        </div>
      </div>

      <div className="glass-card p-6 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase">
              <th className="pb-3">Roll No</th>
              <th className="pb-3">Full Name</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Dept</th>
              <th className="pb-3">Sem</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
            {filteredStudents.map((st) => (
              <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-3.5 text-slate-500 font-mono">{st.roll}</td>
                <td className="py-3.5 font-bold text-slate-800 dark:text-slate-200">{st.name}</td>
                <td className="py-3.5 text-slate-500">{st.email}</td>
                <td className="py-3.5"><span className="px-2 py-0.5 rounded bg-brand-violet/10 text-brand-violet font-bold">{st.dept}</span></td>
                <td className="py-3.5">{st.sem}</td>
                <td className="py-3.5 text-right">
                  <button
                    onClick={() => handleDeleteStudent(st.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-colors"
                    title="Delete Student"
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
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Add New Student</h3>
            <form onSubmit={handleAddStudent} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Shlok Mishra"
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
                  placeholder="student@campus.edu"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Roll Number</label>
                <input
                  type="text"
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                  placeholder="2026CSE006"
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
                  Create Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default StudentManagement;
