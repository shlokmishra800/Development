import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import DevTeamSection from '../../components/team/DevTeamSection';
import Footer from '../../components/common/Footer';
import CampusAiChatbot from '../../components/ai/CampusAiChatbot';
import {
  CalendarCheck,
  BookOpen,
  Clock,
  BarChart3,
  Calendar,
  Bell,
  FileText,
  MessageSquare,
  Users,
  Building2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Smart Attendance',
      desc: 'Real-time subject-wise tracking with low attendance warning alerts below 75%.',
      icon: CalendarCheck,
      color: 'text-brand-violet bg-brand-violet/10'
    },
    {
      title: 'Assignment Management',
      desc: 'Digital submissions, deadline countdowns, attachment downloads, and teacher feedback.',
      icon: BookOpen,
      color: 'text-brand-teal bg-brand-teal/10'
    },
    {
      title: 'Digital Timetable',
      desc: 'Dynamic schedule view with "What is My Next Class?" real-time countdown timer.',
      icon: Clock,
      color: 'text-brand-amber bg-brand-amber/10'
    },
    {
      title: 'Academic Analytics',
      desc: 'Interactive Recharts graphs tracking grades, marks progress, and subject performance.',
      icon: BarChart3,
      color: 'text-rose-500 bg-rose-500/10'
    },
    {
      title: 'Campus Events',
      desc: 'Register for hackathons, college fests, sports tournaments, and technical seminars.',
      icon: Calendar,
      color: 'text-emerald-500 bg-emerald-500/10'
    },
    {
      title: 'Instant Notifications',
      desc: 'Real-time alerts for published results, leave approvals, and exam date updates.',
      icon: Bell,
      color: 'text-sky-500 bg-sky-500/10'
    },
    {
      title: 'Study Materials',
      desc: 'Download subject notes, PDF lectures, PPT slides, and curated learning resources.',
      icon: FileText,
      color: 'text-indigo-500 bg-indigo-500/10'
    },
    {
      title: 'At-Risk Student Detection',
      desc: 'Smart teacher engine identifying students needing academic attention.',
      icon: Zap,
      color: 'text-amber-500 bg-amber-500/10'
    }
  ];

  const stats = [
    { label: 'Students Enrolled', value: '2000+', icon: Users },
    { label: 'Faculty Members', value: '100+', icon: GraduationCap },
    { label: 'Departments', value: '20+', icon: Building2 },
    { label: 'Courses Offered', value: '500+', icon: BookOpen }
  ];

  const steps = [
    { num: '01', title: 'Create Account', desc: 'Register as Student, Teacher, or Administrator.' },
    { num: '02', title: 'Login Securely', desc: 'Authenticate via JWT-encrypted credentials.' },
    { num: '03', title: 'Access Dashboard', desc: 'Personalized role-based navigation and analytics.' },
    { num: '04', title: 'Manage Activities', desc: 'Seamlessly coordinate campus academic workflows.' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 overflow-hidden bg-gradient-to-b from-emerald-500/10 via-yellow-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-yellow-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-6 shadow-sm">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span>Smart Campus Platform 2026</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
                One Platform. <br />
                One Campus. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-yellow-500 to-amber-500">
                  Endless Possibilities.
                </span>
              </h1>

              <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl">
                "CampusConnect simplifies academic management by connecting students, teachers, and administrators through one intelligent platform."
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-yellow-500 to-amber-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/20 hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#features"
                  className="px-6 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 font-bold text-sm hover:bg-emerald-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Explore Campus Features
                </a>
              </div>

              <div className="mt-10 flex items-center gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>JWT Secured</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>MongoDB Atlas Cloud</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  <span>Role-Based Access</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 via-yellow-400 to-violet-600 rounded-3xl opacity-20 blur-2xl pointer-events-none" />
              <div className="relative glass-card p-6 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">CampusConnect Live Dashboard</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 dark:bg-slate-800/80 border border-emerald-500/20">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Attendance</p>
                    <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">87%</p>
                    <span className="text-[10px] text-emerald-600 font-bold">Good Standing</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-yellow-500/10 dark:bg-slate-800/80 border border-yellow-500/20">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Classes Today</p>
                    <p className="text-2xl font-extrabold text-yellow-600 dark:text-yellow-400">4</p>
                    <span className="text-[10px] text-yellow-600 font-bold">Next in 35 mins</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-yellow-500/10 border border-emerald-500/20 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Next Class: Java Programming</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Room A-204 • Prof. Alok Sharma</p>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 bg-gradient-to-r from-emerald-500 to-yellow-500 text-white rounded-lg shadow">
                    35:00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-brand-violet/20 text-brand-cyan flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-slate-400">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Complete Educational Ecosystem
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
              Designed specifically to digitize every aspect of campus management for students, teachers, and administrators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="glass-card glass-card-hover p-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feat.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-100/60 dark:bg-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">How CampusConnect Works</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">Simple 4-step workflow to manage all campus activities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="glass-card p-6 relative">
                <span className="text-4xl font-extrabold text-brand-violet/20 dark:text-brand-violet/30 absolute top-4 right-4">
                  {step.num}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 mt-4">{step.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Team Section */}
      <DevTeamSection />

      <CampusAiChatbot />
      <Footer />
    </div>
  );
};

export default LandingPage;
