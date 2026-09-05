import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Clock, Calendar, MapPin, User, ArrowRight } from 'lucide-react';

const schedule = [
  { day: 'MONDAY', subject: 'Java Programming', code: 'CS501', time: '09:30 AM - 10:30 AM', teacher: 'Prof. Alok Sharma', room: 'Room A-204' },
  { day: 'MONDAY', subject: 'DBMS Lab', code: 'CS502L', time: '10:45 AM - 12:45 PM', teacher: 'Prof. Alok Sharma', room: 'Lab-3' },
  { day: 'TUESDAY', subject: 'Computer Networks', code: 'CS503', time: '09:30 AM - 10:30 AM', teacher: 'Dr. Ananya Verma', room: 'Room B-102' },
  { day: 'TUESDAY', subject: 'Discrete Mathematics', code: 'MATH504', time: '11:00 AM - 12:00 PM', teacher: 'Dr. R. K. Sharma', room: 'Room A-101' },
  { day: 'WEDNESDAY', subject: 'Java Programming', code: 'CS501', time: '09:30 AM - 10:30 AM', teacher: 'Prof. Alok Sharma', room: 'Room A-204' },
  { day: 'THURSDAY', subject: 'Database Systems', code: 'CS502', time: '10:00 AM - 11:00 AM', teacher: 'Prof. Alok Sharma', room: 'Room A-204' },
  { day: 'FRIDAY', subject: 'Computer Networks Lab', code: 'CS503L', time: '02:00 PM - 04:00 PM', teacher: 'Dr. Ananya Verma', room: 'Lab-1' },
];

const StudentTimetable = () => {
  const [selectedDay, setSelectedDay] = useState('MONDAY');
  const [nextClassCountdown, setNextClassCountdown] = useState('34:50');

  useEffect(() => {
    const timer = setInterval(() => {
      setNextClassCountdown((prev) => {
        const [m, s] = prev.split(':').map(Number);
        if (s > 0) return `${m}:${s - 1 < 10 ? '0' : ''}${s - 1}`;
        if (m > 0) return `${m - 1}:59`;
        return '00:00';
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Class Timetable</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Weekly lecture schedules, teacher assignments, and classroom locations.
        </p>
      </div>

      {/* What is My Next Class Hero Widget */}
      <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-brand-violet to-brand-teal text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-white/20 text-brand-cyan text-xs font-bold uppercase tracking-wider">
            What is My Next Class?
          </span>
          <h2 className="text-2xl font-extrabold mt-2">Java Programming (CS501)</h2>
          <p className="text-xs text-white/90 mt-1">Instructor: Prof. Alok Sharma • Classroom A-204</p>
        </div>

        <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center min-w-[180px]">
          <p className="text-[10px] font-bold text-white/80 uppercase">Starts In</p>
          <p className="text-3xl font-mono font-extrabold text-brand-cyan mt-0.5">{nextClassCountdown}</p>
          <p className="text-[10px] text-white/80">Starts at 09:30 AM</p>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedDay === day
                ? 'bg-brand-violet text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Classes List */}
      <div className="space-y-4">
        {schedule
          .filter((item) => item.day === selectedDay)
          .map((item, idx) => (
            <div key={idx} className="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-brand-violet/10 text-brand-violet font-bold text-xs text-center shrink-0">
                  <Clock className="w-5 h-5 mx-auto mb-1" />
                  <span>{item.time.split('-')[0]}</span>
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">{item.subject}</h3>
                  <p className="text-xs text-slate-500">{item.code} • {item.teacher}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl font-medium">
                  <MapPin className="w-3.5 h-3.5 text-brand-violet" />
                  <span>{item.room}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </MainLayout>
  );
};

export default StudentTimetable;
