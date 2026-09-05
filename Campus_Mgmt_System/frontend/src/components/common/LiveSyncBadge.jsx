import React, { useState, useEffect } from 'react';
import { RefreshCw, Database } from 'lucide-react';

export const LiveSyncBadge = ({ isSyncing, lastSyncedAt }) => {
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (lastSyncedAt) {
        const diff = Math.floor((new Date() - new Date(lastSyncedAt)) / 1000);
        setSecondsAgo(diff >= 0 ? diff : 0);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [lastSyncedAt]);

  return (
    <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold shadow-xs">
      <div className="relative flex items-center justify-center">
        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </div>
      <Database className="w-3.5 h-3.5" />
      <span>MongoDB Atlas Live</span>
      <RefreshCw className={`w-3 h-3 text-emerald-500 ${isSyncing ? 'animate-spin' : ''}`} />
      <span className="text-[10px] opacity-75 font-mono">
        {isSyncing ? 'Syncing...' : `${secondsAgo}s ago`}
      </span>
    </div>
  );
};

export default LiveSyncBadge;
