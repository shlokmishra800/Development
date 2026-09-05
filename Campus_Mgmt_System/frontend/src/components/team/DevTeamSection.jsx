import React from 'react';
import { Code2, Sparkles } from 'lucide-react';

const developers = [
  {
    name: 'Shlok Mishra',
    description: 'Specialized in Spring Boot microservices, security architecture, and system integration.',
    avatar: '/team/shlok.jpg'
  },
  {
    name: 'Shivansh Tiwari',
    description: 'Expert in React UI engineering, Tailwind CSS design systems, and state management.',
    avatar: '/team/shivansh.jpg'
  },
  {
    name: 'Shubhansh Dwivedi',
    description: 'Focuses on database normalization, REST API performance, and MongoDB query optimization.',
    avatar: '/team/shubhansh.jpg'
  },
  {
    name: 'Shaurya Jadaun',
    description: 'Passionate about algorithm optimization, analytics engines, and responsive user experience.',
    avatar: '/team/shaurya.jpg'
  }
];

const DevTeamSection = () => {
  return (
    <section id="dev-team" className="py-20 bg-zinc-100/70 dark:bg-zinc-950/60 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-yellow-500/20 text-emerald-700 dark:text-emerald-400 text-sm font-bold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span>Meet Our Development Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Designed & Developed by Passionate Engineers
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 italic">
            "Designed and developed with dedication by a team of passionate developers."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {developers.map((dev, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover p-6 flex flex-col items-center text-center group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-yellow-400 to-amber-500 opacity-80 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative mb-4 mt-2">
                <img
                  src={dev.avatar}
                  alt={dev.name}
                  className="w-28 h-28 rounded-full object-cover ring-4 ring-emerald-500/30 group-hover:ring-yellow-400 transition-all duration-300 shadow-md"
                />
                <span className="absolute bottom-0 right-0 p-1.5 bg-gradient-to-r from-emerald-500 to-yellow-500 text-white rounded-full shadow-lg">
                  <Code2 className="w-3.5 h-3.5" />
                </span>
              </div>

              <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-3">
                {dev.name}
              </h3>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
                {dev.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevTeamSection;
