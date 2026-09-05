import React from 'react';
import { GraduationCap, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-white font-extrabold text-xl mb-4">
              <div className="p-2 bg-gradient-to-tr from-brand-violet to-brand-teal rounded-xl text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="tracking-tight">Campus<span className="text-brand-cyan">Connect</span></span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              CampusConnect is a comprehensive Smart Campus Management System built with Spring Boot, MongoDB Atlas Cloud, and React. Empowering students, teachers, and administrators through unified digital workflows.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/#features" className="hover:text-brand-cyan transition-colors">Platform Features</a></li>
              <li><a href="/#how-it-works" className="hover:text-brand-cyan transition-colors">How It Works</a></li>
              <li><a href="/#dev-team" className="hover:text-brand-cyan transition-colors">Development Team</a></li>
              <li><a href="/public/lost-found" className="hover:text-brand-cyan transition-colors">Lost & Found</a></li>
              <li><a href="/public/marketplace" className="hover:text-brand-cyan transition-colors">Campus Marketplace</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Portals Access</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/login" className="hover:text-brand-cyan transition-colors">Student Portal Login</a></li>
              <li><a href="/login" className="hover:text-brand-cyan transition-colors">Teacher Portal Login</a></li>
              <li><a href="/login" className="hover:text-brand-cyan transition-colors">Admin Portal Login</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center md:text-left">
          <p className="font-medium">
            © 2026 CampusConnect. Developed by <span className="text-white font-semibold">Shlok Mishra</span>, <span className="text-white font-semibold">Shivansh Tiwari</span>, <span className="text-white font-semibold">Shubhansh Dwivedi</span> and <span className="text-white font-semibold">Shaurya Jadaun</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
