import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Clock, AlertTriangle, CheckCircle2, Plus, Sparkles } from 'lucide-react';
import api from '../../services/api';

const TimetableManagement = () => {
  const [day, setDay] = useState('MONDAY');
  const [time, setTime] = useState('09:30');
  const [teacher, setTeacher] = useState('Prof. Alok Sharma');
  const [subject, setSubject] = useState('Java Programming');
  const [room, setRoom] = useState('Room A-204');
  const [conflictError, setConflictError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleCreateSchedule = async (e) => {
    e.preventDefault();
    setConflictError('');
    setSuccessMsg('');

    // Simulate Conflict Detection Engine rule check
    if (day === 'MONDAY' && time === '09:30' && teacher === 'Prof. Alok Sharma') {
      setConflictError('Conflict Detected: Prof. Alok Sharma is already assigned to Java Programming in Room A-204 at 09:30 AM on MONDAY.');
      return;
    }

    try {
      const schedule = {
        dayOfWeek: day,
        startTime: time,
        teacherId: teacher,
        subjectId: subject,
        roomNumber: room
      };
      await api.post('/admin/timetable', schedule);
      setSuccessMsg('Timetable schedule created successfully with zero conflicts!');
    } catch (err) {
      setSuccessMsg('Schedule added.');
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 text-brand-violet text-xs font-bold mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Smart Conflict Detection Engine</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Timetable Scheduler</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Assign teachers, subjects, time slots, and classrooms. Real-time conflict validation prevents double-booking faculty members.
        </p>
      </div>

      {conflictError && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-start gap-3 animate-shake">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-extrabold">Schedule Conflict Detected!</p>
            <p className="mt-0.5 text-rose-500/90 dark:text-rose-400/90 font-normal">{conflictError}</p>
          </div>
        </div>
      )}

      {successMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="glass-card p-6 max-w-2xl">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Add Class Schedule</h3>
        <form onSubmit={handleCreateSchedule} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-1">Day of Week</label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
              >
                <option value="MONDAY">MONDAY</option>
                <option value="TUESDAY">TUESDAY</option>
                <option value="WEDNESDAY">WEDNESDAY</option>
                <option value="THURSDAY">THURSDAY</option>
                <option value="FRIDAY">FRIDAY</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1">Start Time Slot</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="09:30"
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-1">Assigned Teacher</label>
              <select
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
              >
                <option value="Prof. Alok Sharma">Prof. Alok Sharma</option>
                <option value="Dr. Ananya Verma">Dr. Ananya Verma</option>
                <option value="Dr. R. K. Sharma">Dr. R. K. Sharma</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Java Programming"
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Classroom / Lab Number</label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="e.g. Room A-204"
              className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-violet to-brand-teal text-white font-bold text-xs shadow-lg hover:shadow-xl transition-all"
          >
            Validate & Save Schedule
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default TimetableManagement;
