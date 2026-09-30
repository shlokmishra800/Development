import React, { useState } from 'react';
import { ShieldCheck, UserCheck, ShieldAlert, UserX, AlertOctagon, CheckCircle2, Search, Filter } from 'lucide-react';

export default function AdminUserManagementTab({ usersList, onBlockUser, onUnblockUser }) {
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserToBlock, setSelectedUserToBlock] = useState(null);
  const [blockReasonInput, setBlockReasonInput] = useState('Violating website guidelines by posting fake hazard reports.');

  const filteredUsers = usersList.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === 'BLOCKED') return matchesSearch && u.status === 'BLOCKED';
    if (filter === 'ACTIVE') return matchesSearch && u.status === 'ACTIVE';
    if (filter === 'CITIZEN') return matchesSearch && u.role === 'CITIZEN';
    if (filter === 'COLLECTOR') return matchesSearch && u.role === 'COLLECTOR';
    return matchesSearch;
  });

  const handleConfirmBlock = () => {
    if (selectedUserToBlock) {
      onBlockUser(selectedUserToBlock.id, blockReasonInput);
      setSelectedUserToBlock(null);
    }
  };

  const activeCount = usersList.filter(u => u.status === 'ACTIVE').length;
  const blockedCount = usersList.filter(u => u.status === 'BLOCKED').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Admin Title Banner */}
      <div className="glass-panel rounded-3xl p-6 border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Municipal Governance Engine
          </div>
          <h2 className="text-2xl font-bold text-slate-100">
            User Governance & Account Blocking Control
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Admin master portal to supervise citizens and collectors. Block malicious accounts posting spam or fake reports.
          </p>
        </div>

        {/* Stats Badges */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Active Users</span>
            <span className="font-mono text-lg font-bold text-emerald-400">{activeCount}</span>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-slate-950/80 border border-rose-500/40 text-center">
            <span className="text-[10px] text-rose-300 uppercase font-bold block">Blocked Accounts</span>
            <span className="font-mono text-lg font-bold text-rose-400">{blockedCount}</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card rounded-2xl p-4 border border-slate-800">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by user name or email..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filter === 'ALL' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({usersList.length})
          </button>
          <button
            onClick={() => setFilter('CITIZEN')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filter === 'CITIZEN' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Citizens
          </button>
          <button
            onClick={() => setFilter('COLLECTOR')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filter === 'COLLECTOR' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Collectors
          </button>
          <button
            onClick={() => setFilter('BLOCKED')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filter === 'BLOCKED' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🚨 Blocked ({blockedCount})
          </button>
        </div>
      </div>

      {/* Users Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((userItem) => {
          const isBlocked = userItem.status === 'BLOCKED';
          return (
            <div
              key={userItem.id}
              className={`glass-card rounded-3xl p-5 border flex flex-col justify-between space-y-4 transition-all ${
                isBlocked
                  ? 'bg-rose-950/20 border-rose-500/50 shadow-lg shadow-rose-900/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={userItem.avatar}
                      alt={userItem.name}
                      className="w-11 h-11 rounded-full border border-slate-700 object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                        <span>{userItem.name}</span>
                      </h3>
                      <p className="text-[11px] text-slate-400">{userItem.email}</p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    isBlocked
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}>
                    {isBlocked ? '🚫 BLOCKED' : '✓ ACTIVE'}
                  </span>
                </div>

                {/* Role Details */}
                <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Role:</span>
                    <span className="font-bold text-slate-200">{userItem.role}</span>
                  </div>
                  {userItem.locality && (
                    <div className="flex justify-between text-slate-400">
                      <span>Locality:</span>
                      <span className="text-slate-300">{userItem.locality}</span>
                    </div>
                  )}
                  {userItem.vehicleId && (
                    <div className="flex justify-between text-slate-400">
                      <span>Vehicle Fleet:</span>
                      <span className="text-amber-400 font-mono font-bold">{userItem.vehicleId}</span>
                    </div>
                  )}
                  {isBlocked && userItem.blockReason && (
                    <div className="mt-2 pt-2 border-t border-rose-900/50 text-[11px] text-rose-300">
                      <span className="font-bold block">Reason for Block:</span>
                      <p className="italic">{userItem.blockReason}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button: Block or Unblock */}
              <div className="pt-2 border-t border-slate-800/80">
                {isBlocked ? (
                  <button
                    onClick={() => onUnblockUser(userItem.id)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:brightness-110"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Unblock Account & Restore Access</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedUserToBlock(userItem)}
                    className="w-full py-2.5 rounded-xl bg-slate-900 border border-rose-500/40 text-rose-300 hover:bg-rose-500/20 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <UserX className="w-4 h-4 text-rose-400" />
                    <span>Block Account (Restrict Access)</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Block Confirmation Modal Popup */}
      {selectedUserToBlock && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel rounded-3xl p-6 max-w-md w-full border border-rose-500/50 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400 border-b border-slate-800 pb-3">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
              <h3 className="font-bold text-lg text-slate-100">Block User Account</h3>
            </div>

            <p className="text-xs text-slate-300">
              Are you sure you want to block <strong className="text-rose-400">{selectedUserToBlock.name}</strong> ({selectedUserToBlock.email})? Blocked users will be restricted from reporting waste or claiming rewards.
            </p>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Specify Reason for Blocking:</label>
              <textarea
                rows="3"
                value={blockReasonInput}
                onChange={(e) => setBlockReasonInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-rose-500 resize-none"
              ></textarea>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedUserToBlock(null)}
                className="w-1/2 py-2.5 rounded-xl bg-slate-900 text-slate-400 font-semibold text-xs border border-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmBlock}
                className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold text-xs shadow-lg shadow-rose-600/30"
              >
                Confirm Block User
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
