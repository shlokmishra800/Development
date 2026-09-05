import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Bell, Search, Filter, Calendar, Tag } from 'lucide-react';

const initialNotices = [
  {
    id: 1,
    title: 'Mid-Semester Examination Schedule Announced',
    category: 'EXAM',
    date: '2026-09-02',
    content: 'The Mid-Semester examinations for B.Tech Semester 5 will commence from October 15th, 2026. The detailed timetable has been uploaded to the student portal.'
  },
  {
    id: 2,
    title: 'Annual TechFest Hackathon 2026 Registration Open',
    category: 'EVENT',
    date: '2026-09-01',
    content: 'CampusConnect Smart Hackathon 2026 registration is officially open. Form teams of up to 4 members and submit your innovative project proposals.'
  },
  {
    id: 3,
    title: 'Library Extended Hours During Exam Week',
    category: 'GENERAL',
    date: '2026-08-30',
    content: 'Central Campus Library will remain open 24/7 starting October 1st to facilitate student examination preparations.'
  }
];

const StudentNotices = () => {
  const [notices] = useState(initialNotices);
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotices = notices.filter((n) => {
    const matchesCategory = filterCategory === 'ALL' || n.category === filterCategory;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Notice Board</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Official campus notices, academic circulars, and event announcements.
        </p>
      </div>

      {/* Search & Filter bar */}
      <div className="glass-card p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notices..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-violet"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'ACADEMIC', 'EXAM', 'EVENT', 'GENERAL'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                filterCategory === cat
                  ? 'bg-brand-violet text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notice List */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => (
          <div key={notice.id} className="glass-card p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-brand-violet/10 text-brand-violet dark:text-brand-cyan">
                {notice.category}
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {notice.date}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{notice.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{notice.content}</p>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default StudentNotices;
