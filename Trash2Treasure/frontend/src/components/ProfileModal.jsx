import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  MapPin,
  Sparkles,
  Award,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Edit3,
  Save,
  Clock,
  Gift,
  FileText,
  Recycle,
  UserX
} from 'lucide-react';

import * as api from '../api';

export default function ProfileModal({ user, setUser, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    locality: user.locality || 'Sector 14, Block B',
    email: user.email || ''
  });

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name: formData.name,
      locality: formData.locality,
      email: formData.email
    };

    setUser(updatedUser);

    try {
      localStorage.setItem('t2t_session_user', JSON.stringify(updatedUser));
    } catch (err) {}

    if (user.id) {
      await api.updateUserProfile(user.id, updatedUser);
    }

    setIsEditing(false);
  };

  const level = Math.floor((user.ecoPoints || 0) / 100) + 1;
  const currentProgress = (user.ecoPoints || 0) % 100;

  const activities = [
    { id: 1, type: 'REPORT', title: 'Submitted Waste Report T2T-8922', pts: '+25 Pts', time: 'Yesterday' },
    { id: 2, type: 'REWARD', title: 'Redeemed 50% Off Organic Coffee Voucher', pts: '-150 Pts', time: '3 days ago' },
    { id: 3, type: 'QUIZ', title: 'Passed AR Eco Quiz with 100% Score', pts: '+50 Pts', time: '5 days ago' },
    { id: 4, type: 'RECYCLE', title: 'Sold 12kg PET Plastic to Eco-Collector', pts: '+120 Pts', time: '1 week ago' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0e1626] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                alt={user.name}
                className="w-16 h-16 rounded-full border-2 border-white/80 object-cover shadow-xl"
              />
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#0e1626] flex items-center justify-center text-[10px] font-bold text-slate-950">
                ✓
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-slate-950/40 text-emerald-300 border border-emerald-400/30">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-emerald-100 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
                {user.locality || 'Sector 14, Block B'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-950/30 hover:bg-slate-950/60 text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-slate-200">

          {/* Account Status Alert if blocked */}
          {user.status === 'BLOCKED' && (
            <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/80 text-rose-200 text-xs flex items-center gap-3">
              <UserX className="w-5 h-5 text-rose-400 shrink-0" />
              <div>
                <p className="font-bold">Account Blocked</p>
                <p className="text-[11px] text-rose-300">Reason: {user.blockReason || 'Violating municipal guidelines.'}</p>
              </div>
            </div>
          )}

          {/* Eco Level & Points Summary Banner */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="font-bold text-sm text-slate-100">Level {level} Eco Warrior</h3>
                  <p className="text-[11px] text-slate-400">Total Points: <span className="text-emerald-400 font-extrabold">{user.ecoPoints} Pts</span></p>
                </div>
              </div>
              <span className="text-xs font-bold text-teal-300 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full">
                Rank #{user.rank || 3} Citywide
              </span>
            </div>

            {/* Progress to next level */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>Level {level}</span>
                <span>{currentProgress}/100 Pts to Level {level + 1}</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${currentProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Profile Details Edit / Display Form */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-400" />
                <span>Personal Information</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
              >
                {isEditing ? <Save className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Locality / Sector</label>
                  <input
                    type="text"
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-md"
                >
                  Save Profile Updates
                </button>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Email</span>
                  <span className="font-semibold text-slate-200">{user.email}</span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Locality</span>
                  <span className="font-semibold text-slate-200">{user.locality || 'Sector 14'}</span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Role</span>
                  <span className="font-semibold text-emerald-400">{user.role}</span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Account Status</span>
                  <span className="font-semibold text-emerald-400">ACTIVE ✓</span>
                </div>
              </div>
            )}
          </div>

          {/* Earned Badges Showcase */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Earned Badges & Achievements</span>
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {(user.badges || ["Eco Champion", "Zero Waste Novice", "Community Pillar"]).map((b, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center space-y-1 hover:border-emerald-500/50 transition-all"
                >
                  <span className="text-xl">
                    {idx === 0 ? '🌿' : idx === 1 ? '♻️' : '🏆'}
                  </span>
                  <span className="text-[11px] font-bold text-slate-200">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Recent Activity & History</span>
            </h3>
            <div className="space-y-2">
              {activities.map((act) => (
                <div
                  key={act.id}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    {act.type === 'REPORT' && <FileText className="w-4 h-4 text-emerald-400" />}
                    {act.type === 'REWARD' && <Gift className="w-4 h-4 text-purple-400" />}
                    {act.type === 'QUIZ' && <Sparkles className="w-4 h-4 text-amber-400" />}
                    {act.type === 'RECYCLE' && <Recycle className="w-4 h-4 text-teal-400" />}
                    <div>
                      <p className="font-semibold text-slate-200">{act.title}</p>
                      <p className="text-[10px] text-slate-500">{act.time}</p>
                    </div>
                  </div>
                  <span className={`font-mono font-bold text-xs ${
                    act.pts.startsWith('+') ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {act.pts}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
}
