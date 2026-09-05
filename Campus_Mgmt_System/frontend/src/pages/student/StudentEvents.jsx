import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Calendar, MapPin, Users, CheckCircle2, Trophy } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const initialEvents = [
  {
    id: 'e1',
    title: 'CampusConnect Smart Hackathon 2026',
    description: '24-Hour full-stack web application & AI challenge. Win cash prizes worth ₹1,00,000!',
    date: '2026-09-12',
    time: '09:00 AM Onwards',
    location: 'Main Auditorium & Innovation Center',
    organizer: 'Department of CSE',
    category: 'Hackathon',
    banner: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    registered: false
  },
  {
    id: 'e2',
    title: 'AI & Cloud Computing Workshop',
    description: 'Hands-on training session on microservices architecture, Spring Boot, and cloud deployment.',
    date: '2026-09-18',
    time: '02:00 PM - 05:00 PM',
    location: 'Seminar Hall B',
    organizer: 'IEEE Student Chapter',
    category: 'Workshop',
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    registered: false
  }
];

const StudentEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState(initialEvents);

  const handleRegister = async (eventId) => {
    try {
      if (user?.id) {
        await api.post(`/student/events/${eventId}/register`, null, {
          params: { userId: user.id }
        });
      }
      setEvents((prev) =>
        prev.map((ev) => (ev.id === eventId ? { ...ev, registered: true } : ev))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Campus Events & Fest</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Explore upcoming hackathons, technical workshops, sports, and cultural festivals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event) => (
          <div key={event.id} className="glass-card overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div>
              <div className="h-48 relative overflow-hidden">
                <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-brand-cyan text-xs font-bold">
                  {event.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{event.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{event.description}</p>

                <div className="space-y-2 text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-violet" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-teal" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              {event.registered ? (
                <div className="w-full py-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center justify-center gap-2 border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Registered Successfully</span>
                </div>
              ) : (
                <button
                  onClick={() => handleRegister(event.id)}
                  className="w-full py-2.5 rounded-xl bg-brand-violet hover:bg-brand-violetHover text-white font-bold text-xs transition-colors shadow"
                >
                  Register Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default StudentEvents;
