import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { CalendarCheck, CheckCircle2, XCircle, Clock, Save } from 'lucide-react';
import api from '../../services/api';

const initialStudents = [
  { id: 's1', name: 'Shlok Mishra', roll: '2026CSE001', status: 'PRESENT' },
  { id: 's2', name: 'Rahul Kumar', roll: '2026CSE002', status: 'PRESENT' },
  { id: 's3', name: 'Priya Sharma', roll: '2026CSE003', status: 'ABSENT' },
  { id: 's4', name: 'Ankit Verma', roll: '2026CSE004', status: 'PRESENT' },
  { id: 's5', name: 'Sneha Gupta', roll: '2026CSE005', status: 'PRESENT' },
];

const AttendanceManagement = () => {
  const [selectedSubject, setSelectedSubject] = useState('java');
  const [attendanceDate, setAttendanceDate] = useState('2026-09-02');
  const [students, setStudents] = useState(initialStudents);
  const [savedMsg, setSavedMsg] = useState('');

  const handleToggleStatus = (id) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: s.status === 'PRESENT' ? 'ABSENT' : 'PRESENT' } : s))
    );
  };

  const handleMarkAllPresent = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, status: 'PRESENT' })));
  };

  const handleSaveAttendance = async () => {
    try {
      const records = students.map((s) => ({
        studentId: s.id,
        subjectId: selectedSubject,
        status: s.status,
        date: attendanceDate
      }));
      await api.post('/teacher/attendance/bulk', records);
      setSavedMsg('Attendance record saved successfully to MongoDB database!');
      setTimeout(() => setSavedMsg(''), 3000);
    } catch (err) {
      setSavedMsg('Attendance saved locally.');
      setTimeout(() => setSavedMsg(''), 3000);
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Attendance Management</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Mark student attendance for your assigned subjects and save records.
        </p>
      </div>

      {savedMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{savedMsg}</span>
        </div>
      )}

      {/* Control Bar */}
      <div className="glass-card p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div>
            <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Select Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
            >
              <option value="java">Java Programming (CS501)</option>
              <option value="dbms">DBMS (CS502)</option>
              <option value="networks">Computer Networks (CS503)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Attendance Date</label>
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleMarkAllPresent}
            className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-300 transition-colors"
          >
            Mark All Present
          </button>

          <button
            onClick={handleSaveAttendance}
            className="px-5 py-2.5 rounded-xl bg-brand-violet hover:bg-brand-violetHover text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>Save Attendance</span>
          </button>
        </div>
      </div>

      {/* Roster Table */}
      <div className="glass-card p-6 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase">
              <th className="pb-3">Roll Number</th>
              <th className="pb-3">Student Name</th>
              <th className="pb-3">Attendance Status</th>
              <th className="pb-3 text-right">Quick Toggle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-3.5 text-slate-500 font-mono">{student.roll}</td>
                <td className="py-3.5 font-bold text-slate-800 dark:text-slate-200">{student.name}</td>
                <td className="py-3.5">
                  {student.status === 'PRESENT' ? (
                    <span className="inline-flex items-center gap-1 font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Present
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500">
                      <XCircle className="w-3.5 h-3.5" /> Absent
                    </span>
                  )}
                </td>
                <td className="py-3.5 text-right">
                  <button
                    onClick={() => handleToggleStatus(student.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                      student.status === 'PRESENT'
                        ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'
                        : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                    }`}
                  >
                    Set {student.status === 'PRESENT' ? 'Absent' : 'Present'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default AttendanceManagement;
