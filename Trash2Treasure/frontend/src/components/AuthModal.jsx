import React, { useState, useEffect } from 'react';
import { Leaf, User, Truck, ShieldCheck, Mail, Lock, Sparkles, MapPin, Phone, Key, ArrowRight, CheckCircle2, Shield, Award, AlertCircle } from 'lucide-react';
import * as api from '../api';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, initialRole = 'CITIZEN' }) {
  const [mode, setMode] = useState('LOGIN'); // 'LOGIN' or 'SIGNUP'
  const [role, setRole] = useState(initialRole); // 'CITIZEN', 'COLLECTOR', 'ADMIN'

  useEffect(() => {
    if (initialRole) {
      setRole(initialRole);
      if (initialRole === 'ADMIN') {
        setMode('LOGIN');
        setEmail('shlokmishra576@gmail.com');
        setPassword('shlok123');
      }
    }
  }, [initialRole]);

  // Common fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Role-specific fields
  const [locality, setLocality] = useState('Sector 14');
  const [vehicleId, setVehicleId] = useState('TRUCK-04');
  const [phone, setPhone] = useState('+91 98765-43210');
  const [departmentId, setDepartmentId] = useState('MUN-DEPT-882');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [authSuccessMsg, setAuthSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    let avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
    if (role === 'COLLECTOR') avatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80';
    if (role === 'ADMIN') avatar = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80';

    try {
      const normalizedEmail = (email || '').toLowerCase().trim();
      const targetPass = password || '';

      if (!normalizedEmail) {
        setIsLoading(false);
        setErrorMsg('Please enter a valid email address');
        return;
      }

      if (role === 'ADMIN' && mode === 'SIGNUP') {
        setErrorMsg('Admin account creation is prohibited. Only pre-authorized Admin login is allowed.');
        setIsLoading(false);
        return;
      }

      if (mode === 'LOGIN') {
        // A. Special Check for Fixed Admin Credentials
        if (role === 'ADMIN' || normalizedEmail === 'shlokmishra576@gmail.com') {
          if (normalizedEmail !== 'shlokmishra576@gmail.com' || targetPass !== 'shlok123') {
            setErrorMsg('Invalid Admin Credentials. Required: shlokmishra576@gmail.com / password: shlok123');
            setIsLoading(false);
            return;
          }
          const adminUser = {
            id: 'adm-301',
            name: 'Shlok Mishra (Admin)',
            email: 'shlokmishra576@gmail.com',
            password: 'shlok123',
            role: 'ADMIN',
            status: 'ACTIVE',
            ecoPoints: 5000,
            recycledThisMonthKg: 450.0,
            monthlyTargetKg: 500.0,
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
            departmentId: 'MUN-DEPT-882'
          };
          setAuthSuccessMsg(true);
          setTimeout(() => {
            setIsLoading(false);
            setAuthSuccessMsg(false);
            onLoginSuccess(adminUser);
            onClose();
          }, 600);
          return;
        }

        // B. Try real Spring Boot / MongoDB Atlas Login
        const loginResult = await api.loginUser(normalizedEmail, targetPass);

        if (loginResult && loginResult.email && !loginResult.error) {
          setAuthSuccessMsg(true);
          setTimeout(() => {
            setIsLoading(false);
            setAuthSuccessMsg(false);
            onLoginSuccess(loginResult);
            onClose();
          }, 600);
          return;
        }

        if (loginResult && loginResult.error) {
          if (loginResult.message && loginResult.message.toLowerCase().includes('password')) {
            setErrorMsg(loginResult.message);
            setIsLoading(false);
            return;
          }
        }

        // C. Check Local Registered Users Array
        let registeredUsers = [];
        try {
          registeredUsers = JSON.parse(localStorage.getItem('t2t_registered_users') || '[]');
        } catch (e) {}

        const matchedLocalUser = registeredUsers.find(u => u.email.toLowerCase() === normalizedEmail);

        if (matchedLocalUser) {
          if (matchedLocalUser.password && targetPass && matchedLocalUser.password !== targetPass) {
            setErrorMsg('Invalid password entered for this account.');
            setIsLoading(false);
            return;
          }
          setAuthSuccessMsg(true);
          setTimeout(() => {
            setIsLoading(false);
            setAuthSuccessMsg(false);
            onLoginSuccess(matchedLocalUser);
            onClose();
          }, 600);
          return;
        }

        // D. Check Pre-Seeded Accounts
        const preSeededUsers = [
          {
            id: 'col-201',
            name: 'Officer Rajesh K.',
            email: 'collector@t2t.org',
            password: 'demo12345',
            role: 'COLLECTOR',
            ecoPoints: 1250,
            recycledThisMonthKg: 95.0,
            monthlyTargetKg: 100.0,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
            vehicleId: 'FLEET-TRUCK-04'
          }
        ];

        const matchedSeededUser = preSeededUsers.find(u => u.email.toLowerCase() === normalizedEmail);
        if (matchedSeededUser) {
          if (matchedSeededUser.password && targetPass && matchedSeededUser.password !== targetPass) {
            setErrorMsg('Invalid password entered for this account.');
            setIsLoading(false);
            return;
          }
          setAuthSuccessMsg(true);
          setTimeout(() => {
            setIsLoading(false);
            setAuthSuccessMsg(false);
            onLoginSuccess(matchedSeededUser);
            onClose();
          }, 600);
          return;
        }

        setErrorMsg(`Account "${normalizedEmail}" not found. Please click "Create Account" tab to register your real profile.`);
        setIsLoading(false);
        return;

      } else {
        // SIGNUP / REGISTER Mode: Create Real New Account in MongoDB Atlas & Local Storage
        if (!name.trim()) {
          setErrorMsg('Please enter your Full Name to register.');
          setIsLoading(false);
          return;
        }

        const newUserData = {
          id: `usr-${Date.now()}`,
          name: name.trim(),
          email: normalizedEmail,
          password: targetPass || 'pass12345',
          role: role || 'CITIZEN',
          status: 'ACTIVE',
          ecoPoints: 0,
          recycledThisMonthKg: 0.0,
          monthlyTargetKg: 50.0,
          reportsCount: 0,
          badges: ['New Eco Member'],
          locality: locality || 'Sector 14',
          avatar,
          phone,
          vehicleId,
          departmentId,
          createdAt: new Date().toISOString()
        };

        const registerResult = await api.registerUser(newUserData);

        if (registerResult && registerResult.error) {
          setErrorMsg(registerResult.message);
          setIsLoading(false);
          return;
        }

        const createdAccount = (registerResult && registerResult.email) ? registerResult : newUserData;

        // Persist locally in registeredUsers list
        try {
          let registeredUsers = JSON.parse(localStorage.getItem('t2t_registered_users') || '[]');
          const idx = registeredUsers.findIndex(u => u.email.toLowerCase() === createdAccount.email.toLowerCase());
          if (idx >= 0) {
            registeredUsers[idx] = createdAccount;
          } else {
            registeredUsers.push(createdAccount);
          }
          localStorage.setItem('t2t_registered_users', JSON.stringify(registeredUsers));
        } catch (e) {}

        setAuthSuccessMsg(true);
        setTimeout(() => {
          setIsLoading(false);
          setAuthSuccessMsg(false);
          onLoginSuccess(createdAccount);
          onClose();
        }, 600);
      }
    } catch (err) {
      console.error('Auth error:', err);
      setIsLoading(false);
      setErrorMsg('Authentication error. Please check server connection.');
    }
  };

  // Distinct Theme Styles by Role
  const roleThemes = {
    CITIZEN: {
      gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
      bgGlow: 'bg-emerald-950/40 border-emerald-500/40',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      btnGradient: 'from-emerald-500 to-teal-500 text-slate-950 shadow-emerald-500/20',
      iconColor: 'text-emerald-400',
      tagline: '🌱 Citizen Portal • Recycle, Earn Rewards & Impact Locality'
    },
    COLLECTOR: {
      gradient: 'from-amber-500 via-orange-500 to-yellow-600',
      bgGlow: 'bg-amber-950/40 border-amber-500/40',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      btnGradient: 'from-amber-500 to-orange-500 text-slate-950 shadow-amber-500/20',
      iconColor: 'text-amber-400',
      tagline: '🚚 Collector Portal • Manage Pickups, Verify Proof & Route Fleet'
    },
    ADMIN: {
      gradient: 'from-cyan-500 via-blue-600 to-indigo-600',
      bgGlow: 'bg-cyan-950/40 border-cyan-500/40',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      btnGradient: 'from-cyan-500 to-blue-600 text-white shadow-cyan-500/20',
      iconColor: 'text-cyan-400',
      tagline: '⚡ Admin Portal • Authorized Login Only (shlokmishra576@gmail.com)'
    }
  };

  const currentTheme = roleThemes[role];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      
      {/* Modal Main Box */}
      <div className={`glass-panel rounded-3xl max-w-xl w-full border shadow-2xl overflow-hidden transition-all duration-300 ${currentTheme.bgGlow}`}>
        
        {/* Top Header Banner with Role Gradient */}
        <div className={`p-6 bg-gradient-to-r ${currentTheme.gradient} text-slate-950 relative overflow-hidden`}>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-950/20 backdrop-blur-sm flex items-center justify-center font-bold text-slate-950">
                {role === 'CITIZEN' && <Leaf className="w-6 h-6" />}
                {role === 'COLLECTOR' && <Truck className="w-6 h-6" />}
                {role === 'ADMIN' && <ShieldCheck className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-extrabold text-xl tracking-tight">
                  {role === 'ADMIN' ? 'Admin Authorized Gateway' : 'MongoDB Atlas Auth'}
                </h3>
                <p className="text-xs font-semibold opacity-90">{currentTheme.tagline}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-950/20 text-slate-950 font-bold flex items-center justify-center hover:bg-slate-950/40"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Role Selection Buttons */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Select User Role / Persona:
            </label>
            <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              
              {/* Citizen Role Tab */}
              <button
                type="button"
                onClick={() => { setRole('CITIZEN'); setErrorMsg(null); }}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  role === 'CITIZEN'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20 scale-[1.02]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Leaf className="w-3.5 h-3.5" />
                <span>Citizen</span>
              </button>

              {/* Collector Role Tab */}
              <button
                type="button"
                onClick={() => { setRole('COLLECTOR'); setErrorMsg(null); }}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  role === 'COLLECTOR'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20 scale-[1.02]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Collector</span>
              </button>

              {/* Admin Role Tab */}
              <button
                type="button"
                onClick={() => { setRole('ADMIN'); setMode('LOGIN'); setEmail('shlokmishra576@gmail.com'); setPassword('shlok123'); setErrorMsg(null); }}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  role === 'ADMIN'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 scale-[1.02]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>

            </div>
          </div>

          {/* Mode Switcher Pill */}
          {role !== 'ADMIN' ? (
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-4 text-sm font-bold">
                <button
                  type="button"
                  onClick={() => { setMode('LOGIN'); setErrorMsg(null); }}
                  className={`transition-colors pb-1 border-b-2 ${
                    mode === 'LOGIN' ? `${currentTheme.iconColor} border-current` : 'text-slate-400 border-transparent'
                  }`}
                >
                  Login to Account
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('SIGNUP'); setErrorMsg(null); }}
                  className={`transition-colors pb-1 border-b-2 ${
                    mode === 'SIGNUP' ? `${currentTheme.iconColor} border-current` : 'text-slate-400 border-transparent'
                  }`}
                >
                  Create New Account (0% Progress)
                </button>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${currentTheme.badgeBg}`}>
                {role} {mode}
              </span>
            </div>
          ) : (
            <div className="w-full py-2.5 px-4 rounded-xl bg-slate-950 text-cyan-400 font-bold text-center border border-cyan-500/30 text-xs">
              ⚡ Single Pre-authorized Admin Login (shlokmishra576@gmail.com)
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/80 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success Notification */}
          {authSuccessMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Authentication Successful! Loading {role} dashboard...</span>
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name for Sign Up */}
            {mode === 'SIGNUP' && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300">
                  {role === 'CITIZEN' ? 'Citizen Full Name' : role === 'COLLECTOR' ? 'Collector Officer Name' : 'Municipal Authority Admin Name'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={role === 'CITIZEN' ? 'e.g. Aarav Sharma' : role === 'COLLECTOR' ? 'e.g. Officer Rajesh K.' : 'e.g. Director Sunita Roy'}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-slate-600"
                />
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">
                {role === 'ADMIN' ? 'Govt / Municipal Email' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={`${role.toLowerCase()}@t2t.org`}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-slate-600"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-slate-600"
                />
              </div>
            </div>

            {/* Role-Specific Sign Up Fields */}
            {mode === 'SIGNUP' && role === 'CITIZEN' && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300">Locality / Sector Address</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    placeholder="e.g. Sector 14, Block B"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs"
                  />
                </div>
              </div>
            )}

            {mode === 'SIGNUP' && role === 'COLLECTOR' && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-300">Fleet Vehicle ID</label>
                  <input
                    type="text"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    placeholder="e.g. TRUCK-04"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-300">Official Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765-43210"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs"
                  />
                </div>
              </div>
            )}

            {mode === 'SIGNUP' && role === 'ADMIN' && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300">Municipal Dept Security Key</label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                    placeholder="e.g. MUN-DEPT-882-KEY"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 rounded-2xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 bg-gradient-to-r ${currentTheme.btnGradient} transition-all hover:brightness-110 shadow-lg`}
            >
              {isLoading ? (
                <span>Saving to MongoDB Atlas...</span>
              ) : (
                <>
                  <span>{mode === 'LOGIN' ? `Login as ${role}` : `Save Real Account (0% Progress)`}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}
