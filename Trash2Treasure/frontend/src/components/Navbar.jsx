import React, { useState } from 'react';
import { Leaf, Bell, Wifi, WifiOff, ShieldCheck, UserCheck, Truck, Sparkles, CheckCircle2, AlertTriangle, LogIn, LogOut, MessageSquarePlus } from 'lucide-react';

export default function Navbar({ user, setUser, isOffline, setIsOffline, notifications, setNotifications, onOpenAuth, onOpenProfile, onRequireRoleAuth, onOpenFeedback, onNavigateTab }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleRoleClick = (targetRole) => {
    if (user?.role === targetRole) return;
    if (onRequireRoleAuth) {
      onRequireRoleAuth(targetRole);
    } else {
      onOpenAuth();
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const roleStyles = {
    CITIZEN: {
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      pill: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
    },
    COLLECTOR: {
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      pill: 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold shadow-md shadow-amber-500/20'
    },
    ADMIN: {
      badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      pill: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-md shadow-cyan-500/20'
    }
  };

  const currentRoleStyle = roleStyles[user?.role] || roleStyles.CITIZEN;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 shadow-lg shadow-emerald-500/20">
            <Leaf className="w-6 h-6 text-slate-950 animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                T2T
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Trash2Treasure
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block">
              "Recycle. Reward. Repeat."
            </p>
          </div>
        </div>

        {/* Center Actions: Role Switcher & Offline Mode */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Offline Mode Toggle Button */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isOffline
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
            }`}
            title={isOffline ? 'Offline Mode Active - Reports queued locally' : 'Online Mode - Live server sync'}
          >
            {isOffline ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="hidden sm:inline">Offline Mode</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Live Sync</span>
              </>
            )}
          </button>

          {/* Quick Role Switcher Pills (Requires Authentication!) */}
          <div className="bg-slate-900/80 p-1 rounded-xl border border-slate-800 flex items-center gap-1 text-xs">
            <button
              onClick={() => handleRoleClick('CITIZEN')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                user?.role === 'CITIZEN'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Citizen</span>
            </button>
            <button
              onClick={() => handleRoleClick('COLLECTOR')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                user?.role === 'COLLECTOR'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Collector (🔒)</span>
            </button>
            <button
              onClick={() => handleRoleClick('ADMIN')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                user?.role === 'ADMIN'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin (🔒)</span>
            </button>
          </div>
        </div>

        {/* Right Section: Eco Points, Feedback, Auth Modal Button, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Admin Feedback Button */}
          <button
            onClick={onOpenFeedback}
            className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-xs font-semibold text-emerald-300 flex items-center gap-1.5 transition-all"
            title="Send direct feedback to Admin's Gmail & MongoDB"
          >
            <MessageSquarePlus className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Feedback</span>
          </button>

          {/* Auth Portal Button */}
          <button
            onClick={onOpenAuth}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500 text-xs font-semibold text-slate-200 hover:text-emerald-400 flex items-center gap-1.5 transition-all"
          >
            <LogIn className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">{user?.name ? 'Switch Account / Logout' : 'Login / Sign Up'}</span>
          </button>

          {/* Eco-Points Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-500/30 text-emerald-400 shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-xs font-semibold text-slate-300 hidden md:inline">Eco-Pts:</span>
            <span className="text-sm font-extrabold text-emerald-400">{user?.ecoPoints || 0}</span>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-slate-700 transition-all"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-slate-950 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Drawer */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 glass-panel rounded-2xl border border-slate-700/80 shadow-2xl p-4 z-50">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-semibold text-sm text-slate-100">System Alerts & Status</h3>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] text-emerald-400 hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        if (n.type === 'HAZARD' && onNavigateTab) {
                          onNavigateTab('TRACKING');
                          setShowNotifications(false);
                        }
                      }}
                      className={`p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                        n.type === 'RESOLVED'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                          : n.type === 'HAZARD'
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-200 hover:bg-rose-500/20'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300'
                      } ${!n.read ? 'ring-1 ring-emerald-500/50' : 'opacity-80'}`}
                    >
                      <div className="flex items-start gap-2">
                        {n.type === 'RESOLVED' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                        {n.type === 'HAZARD' && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                        {n.type === 'INFO' && <Bell className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />}
                        <div className="flex-1">
                          <p className="font-semibold">{n.title}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{n.message}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] text-slate-500">{n.time}</span>
                            {n.type === 'HAZARD' && (
                              <span className="text-[10px] font-bold text-rose-400 underline">Respond Now ⚡</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Role Badge */}
          <div
            onClick={onOpenProfile}
            className="flex items-center gap-2.5 pl-2 border-l border-slate-800 cursor-pointer group"
            title="Click to view & edit your User Profile & Eco Rank"
          >
            <div className="relative">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                alt={user?.name || 'User'}
                className="w-9 h-9 rounded-full border-2 border-emerald-500/60 object-cover group-hover:scale-105 group-hover:border-emerald-400 transition-all shadow-md"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950"></span>
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors leading-tight">{user?.name || 'Guest User'}</p>
              <p className="text-[10px] text-slate-400">{user?.role || 'CITIZEN'}</p>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
