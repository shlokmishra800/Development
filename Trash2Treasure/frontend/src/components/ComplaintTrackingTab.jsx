import React, { useState } from 'react';
import { Clock, CheckCircle2, AlertTriangle, ShieldCheck, MapPin, User, Phone, Image as ImageIcon, ChevronRight, Filter, ShieldAlert } from 'lucide-react';

export default function ComplaintTrackingTab({ complaints, onUpdateStatus, userRole }) {
  const [filter, setFilter] = useState('ALL');
  const [selectedComplaint, setSelectedComplaint] = useState(complaints[0] || null);

  const filteredComplaints = complaints.filter(c => {
    if (filter === 'IN_PROGRESS') return c.status === 'SUBMITTED' || c.status === 'ASSIGNED' || c.status === 'IN_PROGRESS';
    if (filter === 'RESOLVED') return c.status === 'RESOLVED';
    if (filter === 'HAZARD') return c.severity === 'EMERGENCY' || c.category === 'HAZARD';
    return true;
  });

  const getStatusBadge = (status, severity) => {
    if (severity === 'EMERGENCY') {
      return (
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
          🚨 EMERGENCY HAZARD
        </span>
      );
    }
    switch (status) {
      case 'RESOLVED':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            ✓ RESOLVED
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            ⚡ IN PROGRESS
          </span>
        );
      case 'ASSIGNED':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            🚚 COLLECTOR ASSIGNED
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
            🕒 SUBMITTED
          </span>
        );
    }
  };

  const handleResolveAction = (id) => {
    onUpdateStatus(id, 'RESOLVED', 'https://images.unsplash.com/photo-1604186837056-8e7c286756f2?w=600&auto=format&fit=crop&q=80');
    if (selectedComplaint && selectedComplaint.id === id) {
      setSelectedComplaint(prev => ({
        ...prev,
        status: 'RESOLVED',
        resolutionImageUrl: 'https://images.unsplash.com/photo-1604186837056-8e7c286756f2?w=600&auto=format&fit=crop&q=80'
      }));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Controls & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel rounded-2xl p-4 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <span>Complaint Tracking & Resolution Timeline</span>
          </h2>
          <p className="text-xs text-slate-400">Track real-time status of reported waste issues, assigned collectors & proof of cleanup.</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filter === 'ALL' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({complaints.length})
          </button>
          <button
            onClick={() => setFilter('IN_PROGRESS')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filter === 'IN_PROGRESS' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('RESOLVED')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filter === 'RESOLVED' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Resolved
          </button>
          <button
            onClick={() => setFilter('HAZARD')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filter === 'HAZARD' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Hazards
          </button>
        </div>
      </div>

      {/* Main Grid: List on Left, Active Selected Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Complaints Cards List */}
        <div className="lg:col-span-5 space-y-3 max-h-[750px] overflow-y-auto pr-1">
          {filteredComplaints.length === 0 ? (
            <div className="p-8 text-center glass-card rounded-2xl text-slate-400 text-sm">
              No complaints found in this category.
            </div>
          ) : (
            filteredComplaints.map((item) => {
              const isSelected = selectedComplaint && selectedComplaint.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedComplaint(item)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                      : 'glass-card border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">{item.id}</span>
                    {getStatusBadge(item.status, item.severity)}
                  </div>

                  <h3 className="font-semibold text-sm text-slate-100 line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">{item.description}</p>

                  <div className="flex items-center justify-between mt-3 text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span className="truncate max-w-[160px]">{item.address}</span>
                    </div>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Complaint Detail & Timeline View */}
        <div className="lg:col-span-7">
          {selectedComplaint ? (
            <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-6">
              
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-emerald-400">{selectedComplaint.id}</span>
                    {getStatusBadge(selectedComplaint.status, selectedComplaint.severity)}
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">{selectedComplaint.title}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{selectedComplaint.address}</span>
                  </p>
                </div>

                {/* Collector / Admin Action Button */}
                {(userRole === 'COLLECTOR' || userRole === 'ADMIN') && selectedComplaint.status !== 'RESOLVED' && (
                  <button
                    onClick={() => handleResolveAction(selectedComplaint.id)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:brightness-110 shrink-0"
                  >
                    Mark as Resolved & Cleaned
                  </button>
                )}
              </div>

              {/* Status Timeline Stepper */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Resolution Timeline
                </h4>
                <div className="grid grid-cols-4 gap-2 relative text-center">
                  
                  {/* Step 1: Submitted */}
                  <div className="space-y-1.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center mx-auto shadow-md shadow-emerald-500/30">
                      1
                    </div>
                    <p className="text-[11px] font-semibold text-slate-200">Submitted</p>
                    <p className="text-[10px] text-slate-400">Report Logged</p>
                  </div>

                  {/* Step 2: Collector Assigned */}
                  <div className="space-y-1.5">
                    <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center mx-auto ${
                      selectedComplaint.status !== 'SUBMITTED' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      2
                    </div>
                    <p className="text-[11px] font-semibold text-slate-200">Assigned</p>
                    <p className="text-[10px] text-slate-400">{selectedComplaint.collectorName || 'Squad 4'}</p>
                  </div>

                  {/* Step 3: In Progress */}
                  <div className="space-y-1.5">
                    <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center mx-auto ${
                      selectedComplaint.status === 'IN_PROGRESS' || selectedComplaint.status === 'RESOLVED' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      3
                    </div>
                    <p className="text-[11px] font-semibold text-slate-200">In Progress</p>
                    <p className="text-[10px] text-slate-400">ETA: {selectedComplaint.eta || '30m'}</p>
                  </div>

                  {/* Step 4: Resolved */}
                  <div className="space-y-1.5">
                    <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center mx-auto ${
                      selectedComplaint.status === 'RESOLVED' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      4
                    </div>
                    <p className="text-[11px] font-semibold text-slate-200">Resolved</p>
                    <p className="text-[10px] text-slate-400">Verified</p>
                  </div>

                </div>
              </div>

              {/* Images Comparison: Reported vs Resolved */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Photo Evidence & Resolution Proof
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">📸 Citizen Reported Issue</span>
                    <img
                      src={selectedComplaint.imageUrl}
                      alt="Reported Issue"
                      className="w-full h-44 object-cover rounded-2xl border border-slate-800"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">✨ Collector Resolution Proof</span>
                    {selectedComplaint.resolutionImageUrl ? (
                      <img
                        src={selectedComplaint.resolutionImageUrl}
                        alt="Resolution Proof"
                        className="w-full h-44 object-cover rounded-2xl border border-emerald-500/50"
                      />
                    ) : (
                      <div className="w-full h-44 rounded-2xl border border-dashed border-slate-800 bg-slate-950/50 flex flex-col items-center justify-center text-slate-500 text-xs p-4 text-center">
                        <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                        <span>Cleanup in progress. Proof photo will appear here when completed.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Collector Details Box */}
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 font-bold">
                    🚚
                  </div>
                  <div>
                    <p className="font-semibold text-slate-200">{selectedComplaint.collectorName || 'Green Squad - Rajesh K.'}</p>
                    <p className="text-slate-400 text-[11px]">Sanitation Officer in Charge</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`Calling Collector: ${selectedComplaint.collectorPhone || '+91 98765-43210'}`)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 hover:bg-slate-800 flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Contact</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center glass-card rounded-3xl text-slate-400">
              Select a complaint from the left panel to inspect timeline details.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
