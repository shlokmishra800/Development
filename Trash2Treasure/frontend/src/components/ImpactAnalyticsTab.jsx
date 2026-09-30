import React from 'react';
import { BarChart3, TrendingUp, Droplets, Zap, TreePine, ShieldAlert, Clock, CheckCircle2, AlertOctagon } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid, Legend } from 'recharts';

export default function ImpactAnalyticsTab({ impactMetrics, complaints, smartBins, userRole }) {
  const categoryData = [
    { name: 'Recyclables', count: 182, kg: 4500 },
    { name: 'E-Waste', count: 64, kg: 1200 },
    { name: 'Organic', count: 145, kg: 6800 },
    { name: 'Hazardous', count: 18, kg: 350 },
    { name: 'General', count: 73, kg: 1400 },
  ];

  const activeHazards = complaints.filter(c => c.severity === 'EMERGENCY' && c.status !== 'RESOLVED');
  const fullBins = smartBins.filter(b => b.fillPercentage >= 80);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Impact Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* CO2 Saved */}
        <div className="glass-card rounded-3xl p-5 border border-emerald-500/30 bg-gradient-to-br from-slate-900 to-emerald-950/30 space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">CO₂ Offset</span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">
            {impactMetrics.co2SavedKg} <span className="text-sm font-normal text-slate-400">kg</span>
          </div>
          <p className="text-[11px] text-slate-400">Equivalent to avoiding 380 km car driving!</p>
        </div>

        {/* Water Saved */}
        <div className="glass-card rounded-3xl p-5 border border-cyan-500/30 bg-gradient-to-br from-slate-900 to-cyan-950/30 space-y-2">
          <div className="flex items-center justify-between text-cyan-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Water Conserved</span>
            <Droplets className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-cyan-400 font-mono">
            {impactMetrics.waterSavedLiters} <span className="text-sm font-normal text-slate-400">L</span>
          </div>
          <p className="text-[11px] text-slate-400">Through paper & plastic recycling efficiency.</p>
        </div>

        {/* Energy Saved */}
        <div className="glass-card rounded-3xl p-5 border border-amber-500/30 bg-gradient-to-br from-slate-900 to-amber-950/30 space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Energy Saved</span>
            <Zap className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-amber-400 font-mono">
            {impactMetrics.energySavedKwh} <span className="text-sm font-normal text-slate-400">kWh</span>
          </div>
          <p className="text-[11px] text-slate-400">Powers 12 households for a full month!</p>
        </div>

        {/* Trees Saved */}
        <div className="glass-card rounded-3xl p-5 border border-teal-500/30 bg-gradient-to-br from-slate-900 to-teal-950/30 space-y-2">
          <div className="flex items-center justify-between text-teal-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Trees Saved</span>
            <TreePine className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-teal-400 font-mono">
            {impactMetrics.treesEquivalent} <span className="text-sm font-normal text-slate-400">trees</span>
          </div>
          <p className="text-[11px] text-slate-400">Preserved via local paper recycling drives.</p>
        </div>

      </div>

      {/* Admin Authority Alert Banner (If Admin Role or Hazard active) */}
      {(userRole === 'ADMIN' || activeHazards.length > 0) && (
        <div className="glass-panel rounded-3xl p-5 border border-rose-500/40 bg-gradient-to-r from-rose-950/60 via-slate-900 to-slate-900 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertOctagon className="w-5 h-5 animate-pulse" />
              <span>Authority Dashboard • Live Incident & Smart Bin Telemetry</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
              {activeHazards.length} Emergency Hazards Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Avg Resolution SLA</span>
              <span className="font-mono text-base font-bold text-emerald-400">4.2 Hours</span>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">High Capacity Bins (&gt;80%)</span>
              <span className="font-mono text-base font-bold text-amber-400">{fullBins.length} Bins Alerted</span>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Total Complaints Logged</span>
              <span className="font-mono text-base font-bold text-cyan-400">{complaints.length} Total</span>
            </div>
          </div>
        </div>
      )}

      {/* Recharts Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Monthly Waste & CO2 Trend Line Chart */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
          <div>
            <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <span>Monthly Recycling & Impact Growth Trend</span>
            </h3>
            <p className="text-xs text-slate-400">Community waste diverted (kg) vs CO₂ offset (kg)</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={impactMetrics.monthlyTrend}>
                <defs>
                  <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="wasteKg" name="Waste Recycled (kg)" stroke="#10b981" fillOpacity={1} fill="url(#colorWaste)" />
                <Area type="monotone" dataKey="co2Kg" name="CO₂ Offset (kg)" stroke="#06b6d4" fillOpacity={1} fill="url(#colorCo2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Waste Breakdown by Category Bar Chart */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
          <div>
            <h3 className="font-bold text-slate-100 text-base">Waste Breakdown by Category</h3>
            <p className="text-xs text-slate-400">Total volume in kilograms collected this month</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="kg" name="Weight (kg)" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
