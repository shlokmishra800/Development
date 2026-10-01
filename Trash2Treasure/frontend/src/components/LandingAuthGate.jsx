import React, { useState } from 'react';
import { Leaf, User, Truck, ShieldCheck, Mail, Lock, Sparkles, MapPin, Phone, Key, ArrowRight, CheckCircle2, Shield, Play, AlertCircle } from 'lucide-react';
import * as api from '../api';

export default function LandingAuthGate({ onLoginSuccess }) {
  const [role, setRole] = useState('CITIZEN'); // 'CITIZEN', 'COLLECTOR', 'ADMIN'
  const [mode, setMode] = useState('LOGIN'); // 'LOGIN' or 'SIGNUP'

  // Common fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Role-specific fields
  const [locality, setLocality] = useState('Sector 14, Block B');
  const [vehicleId, setVehicleId] = useState('FLEET-TRUCK-04');
  const [phone, setPhone] = useState('+91 98765-43210');
  const [departmentId, setDepartmentId] = useState('MUN-DEPT-882');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const roleConfigs = {
    CITIZEN: {
      title: 'Citizen Eco Portal',
      desc: 'Report waste, earn Eco-Points, track cleanups, and redeem local shop discounts.',
      accent: 'emerald',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      glow: 'shadow-emerald-500/20 border-emerald-500/40',
      bgGradient: 'from-emerald-950/40 via-slate-900 to-slate-950',
      icon: Leaf,
      badge: '🌱 Community Eco Hero'
    },
    COLLECTOR: {
      title: 'Sanitation Collector Portal',
      desc: 'Receive pickup routes, inspect bin levels, clean overflow points, and upload proof.',
      accent: 'amber',
      gradient: 'from-amber-500 via-orange-500 to-yellow-500',
      glow: 'shadow-amber-500/20 border-amber-500/40',
      bgGradient: 'from-amber-950/40 via-slate-900 to-slate-950',
      icon: Truck,
      badge: '🚚 Sanitation Officer'
    },
    ADMIN: {
      title: 'Municipal Authority Portal',
      desc: 'Monitor city-wide smart bins, dispatch emergency hazards, and inspect resolution SLAs.',
      accent: 'cyan',
      gradient: 'from-cyan-500 via-blue-600 to-indigo-600',
      glow: 'shadow-cyan-500/20 border-cyan-500/40',
      bgGradient: 'from-cyan-950/40 via-slate-900 to-slate-950',
      icon: ShieldCheck,
      badge: '⚡ Municipal Admin'
    }
  };

  const currentConfig = roleConfigs[role];
  const IconComponent = currentConfig.icon;

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
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
        // A. Check for Fixed Admin Credentials
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
          setIsLoading(false);
          onLoginSuccess(adminUser);
          return;
        }

        // B. Try real Spring Boot / MongoDB Atlas Login
        const loginResult = await api.loginUser(normalizedEmail, targetPass);

        if (loginResult && loginResult.email && !loginResult.error) {
          setIsLoading(false);
          onLoginSuccess(loginResult);
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
          setIsLoading(false);
          onLoginSuccess(matchedLocalUser);
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
          setIsLoading(false);
          onLoginSuccess(matchedSeededUser);
          return;
        }

        setErrorMsg(`Account "${normalizedEmail}" not found. Please click "Create New Account" below to register your real profile.`);
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

        setIsLoading(false);
        onLoginSuccess(createdAccount);
      }
    } catch (err) {
      console.error('Auth error:', err);
      setIsLoading(false);
      setErrorMsg('Authentication error. Please check server connection.');
    }
  };

  const handleQuickDemo = (selectedRole) => {
    setRole(selectedRole);
    setMode('LOGIN');
    if (selectedRole === 'ADMIN') {
      setEmail('shlokmishra576@gmail.com');
      setPassword('shlok123');
      setName('Shlok Mishra (Admin)');
    } else {
      setEmail(`${selectedRole.toLowerCase()}@t2t.org`);
      setPassword('demo12345');
      setName(selectedRole === 'CITIZEN' ? 'Aarav Sharma' : 'Officer Rajesh K.');
    }
    
    setTimeout(() => {
      handleSubmit(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      
      {/* Dynamic Background Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#0f172a_0%,#070a12_100%)]"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Brand Header */}
      <header className="relative z-10 p-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Leaf className="w-6 h-6 text-slate-950 animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
          <div>
            <h1 className="font-extrabold text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Trash2Treasure (T2T)
            </h1>
            <p className="text-xs text-slate-400">"Recycle. Reward. Repeat."</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>MongoDB Atlas Auth Gateway</span>
        </div>
      </header>

      {/* Main Center Auth Container */}
      <main className="relative z-10 max-w-6xl mx-auto w-full p-4 sm:p-6 my-auto space-y-8">
        
        {/* Hero Title & Vision Statement */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 inline-block">
            🔐 Live MongoDB Atlas Secured Access Gateway
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100">
            Select Your Role to Enter
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Transforming waste into community treasure through technology, motivation, and transparency. Login or create a new real account below.
          </p>
        </div>

        {/* 3 Interactive Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* 1. Citizen Card */}
          <div
            onClick={() => setRole('CITIZEN')}
            className={`p-5 rounded-3xl cursor-pointer border transition-all duration-300 flex flex-col justify-between ${
              role === 'CITIZEN'
                ? 'bg-slate-900/90 border-emerald-500/80 ring-2 ring-emerald-500/40 shadow-2xl scale-[1.02]'
                : 'glass-card border-slate-800/80 opacity-70 hover:opacity-100 hover:border-slate-700'
            }`}
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Citizen Persona</span>
                <h3 className="text-lg font-bold text-slate-100">Citizen Portal</h3>
                <p className="text-xs text-slate-400 mt-1">Report waste geotags, earn Eco-Points, claim shop discounts & view local leaderboard.</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>Select Citizen</span>
              {role === 'CITIZEN' && <CheckCircle2 className="w-4 h-4" />}
            </div>
          </div>

          {/* 2. Collector Card */}
          <div
            onClick={() => setRole('COLLECTOR')}
            className={`p-5 rounded-3xl cursor-pointer border transition-all duration-300 flex flex-col justify-between ${
              role === 'COLLECTOR'
                ? 'bg-slate-900/90 border-amber-500/80 ring-2 ring-amber-500/40 shadow-2xl scale-[1.02]'
                : 'glass-card border-slate-800/80 opacity-70 hover:opacity-100 hover:border-slate-700'
            }`}
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Sanitation Officer</span>
                <h3 className="text-lg font-bold text-slate-100">Collector Portal</h3>
                <p className="text-xs text-slate-400 mt-1">Manage assigned waste pickups, route fleet trucks & upload cleanup proof photos.</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400">
              <span>Select Collector</span>
              {role === 'COLLECTOR' && <CheckCircle2 className="w-4 h-4" />}
            </div>
          </div>

          {/* 3. Admin Card */}
          <div
            onClick={() => { setRole('ADMIN'); setMode('LOGIN'); setEmail('shlokmishra576@gmail.com'); setPassword('shlok123'); setErrorMsg(null); }}
            className={`p-5 rounded-3xl cursor-pointer border transition-all duration-300 flex flex-col justify-between ${
              role === 'ADMIN'
                ? 'bg-slate-900/90 border-cyan-500/80 ring-2 ring-cyan-500/40 shadow-2xl scale-[1.02]'
                : 'glass-card border-slate-800/80 opacity-70 hover:opacity-100 hover:border-slate-700'
            }`}
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Municipal Authority</span>
                <h3 className="text-lg font-bold text-slate-100">Admin Portal</h3>
                <p className="text-xs text-slate-400 mt-1">City-wide smart bin telemetry, emergency hazard dispatching & SLA metrics.</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400">
              <span>Select Admin</span>
              {role === 'ADMIN' && <CheckCircle2 className="w-4 h-4" />}
            </div>
          </div>

        </div>

        {/* Selected Persona Login / Sign Up Form Box */}
        <div className={`glass-panel rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6 transition-all duration-300 ${currentConfig.glow} ${currentConfig.bgGradient}`}>
          
          {/* Header Row & Quick Demo Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center">
                <IconComponent className={`w-5 h-5 text-${currentConfig.accent}-400`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">{currentConfig.title}</h3>
                <p className="text-xs text-slate-400">{currentConfig.desc}</p>
              </div>
            </div>

            {/* Quick Demo Instant Login Button */}
            <button
              type="button"
              onClick={() => handleQuickDemo(role)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-semibold text-slate-200 flex items-center gap-1.5 shadow-md shrink-0"
            >
              <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              <span>Instant Demo Login ({role})</span>
            </button>
          </div>

          {/* Error Message Banner */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/80 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Mode Switcher: Login vs Sign Up */}
          <div className="flex items-center justify-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 max-w-sm mx-auto text-xs font-bold">
            <button
              type="button"
              onClick={() => { setMode('LOGIN'); setErrorMsg(null); }}
              className={`w-1/2 py-2 rounded-xl transition-all ${
                mode === 'LOGIN' ? `bg-gradient-to-r ${currentConfig.gradient} text-slate-950 shadow-md` : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Login to Account
            </button>
            {role !== 'ADMIN' ? (
              <button
                type="button"
                onClick={() => { setMode('SIGNUP'); setErrorMsg(null); }}
                className={`w-1/2 py-2 rounded-xl transition-all ${
                  mode === 'SIGNUP' ? `bg-gradient-to-r ${currentConfig.gradient} text-slate-950 shadow-md` : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Create New Account (0% Progress)
              </button>
            ) : (
              <span className="w-1/2 py-2 text-[10px] text-center text-slate-500 italic">
                🔒 Signup Disabled for Admin
              </span>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
            
            {mode === 'SIGNUP' && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300">
                  {role === 'CITIZEN' ? 'Citizen Full Name' : role === 'COLLECTOR' ? 'Sanitation Officer Name' : 'Municipal Admin Name'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={role === 'CITIZEN' ? 'e.g. Aarav Sharma' : role === 'COLLECTOR' ? 'e.g. Officer Rajesh K.' : 'e.g. Director Sunita Roy'}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-slate-600"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300">
                  {role === 'ADMIN' ? 'Govt / Municipal Email' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={`${role.toLowerCase()}@t2t.org`}
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-slate-600"
                  />
                </div>
              </div>
            </div>

            {/* Role-Specific Sign Up Fields */}
            {mode === 'SIGNUP' && role === 'CITIZEN' && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300">Locality / Sector Address</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    placeholder="e.g. Sector 14, Block B, Community Park Zone"
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm"
                  />
                </div>
              </div>
            )}

            {mode === 'SIGNUP' && role === 'COLLECTOR' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-300">Assigned Vehicle ID</label>
                  <input
                    type="text"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    placeholder="e.g. FLEET-TRUCK-04"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-300">Official Contact</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765-43210"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm"
                  />
                </div>
              </div>
            )}

            {mode === 'SIGNUP' && role === 'ADMIN' && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300">Municipal Security Dept Code</label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                    placeholder="e.g. MUN-DEPT-882-KEY"
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 bg-gradient-to-r ${currentConfig.gradient} text-slate-950 shadow-xl transition-all hover:brightness-110`}
            >
              {isLoading ? (
                <span>Connecting to MongoDB Atlas...</span>
              ) : (
                <>
                  <span>{mode === 'LOGIN' ? `Login & Authenticate (${role})` : `Save Real Account to MongoDB (0% Progress)`}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-xs text-slate-600 border-t border-slate-900/60">
        <p>Trash2Treasure (T2T) Security Gateway • Connected to MongoDB Atlas Cloud</p>
      </footer>

    </div>
  );
}
