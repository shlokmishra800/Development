import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Bell,
  Sun,
  Moon,
  Search,
  LogOut,
  User,
  Shield,
  Menu,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import LiveSyncBadge from './LiveSyncBadge';

const Navbar = ({ onToggleSidebar, isSyncing, lastSyncedAt }) => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'ROLE_ADMIN':
        return <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-600 dark:bg-zinc-800 dark:text-zinc-200 dark:border dark:border-zinc-700">Admin</span>;
      case 'ROLE_TEACHER':
        return <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:bg-zinc-800 dark:text-zinc-200 dark:border dark:border-zinc-700">Teacher</span>;
      default:
        return <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:bg-zinc-800 dark:text-zinc-200 dark:border dark:border-zinc-700">Student</span>;
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-6 py-3 transition-colors duration-200">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 lg:hidden"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="p-2 bg-gradient-to-tr from-emerald-500 via-yellow-400 to-amber-500 rounded-xl text-white shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-zinc-900 dark:text-white">
              Campus<span className="text-emerald-500 dark:text-emerald-400">Connect</span>
            </span>
          </div>
        </div>

        {/* Center Live Sync Status Badge */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <LiveSyncBadge isSyncing={isSyncing} lastSyncedAt={lastSyncedAt} />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-zinc-600" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-zinc-950" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white">Notifications</h4>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">3 New</span>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/80 text-xs">
                  <div className="p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 cursor-pointer">
                    <p className="font-semibold text-zinc-800 dark:text-zinc-200">New Assignment Posted</p>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">Spring Boot REST API due in 3 days</p>
                  </div>
                  <div className="p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 cursor-pointer">
                    <p className="font-semibold text-zinc-800 dark:text-zinc-200">Exam Schedule Published</p>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">Mid-term exam date sheet released</p>
                  </div>
                  <div className="p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 cursor-pointer">
                    <p className="font-semibold text-zinc-800 dark:text-zinc-200">Event Registration Open</p>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">CampusConnect Smart Hackathon 2026</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-zinc-200/80 dark:border-zinc-800"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-tight">{user.fullName}</p>
                  <div className="mt-0.5">{getRoleBadge(user.role)}</div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-yellow-500 text-white flex items-center justify-center font-bold text-sm shadow">
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl py-2 z-50">
                  <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800">
                    <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">{user.fullName}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('/profile');
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-zinc-400" />
                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-500 via-yellow-400 to-emerald-600 hover:scale-105 text-white shadow-md transition-all"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
