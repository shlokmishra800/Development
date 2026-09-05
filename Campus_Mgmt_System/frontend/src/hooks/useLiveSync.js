import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for live data polling & real-time synchronization with MongoDB backend.
 * 
 * @param {Function} fetcherFn Async function returning data
 * @param {number} intervalMs Auto-refresh interval in milliseconds (default: 6000ms)
 * @param {Array} dependencies React dependency array to trigger refetch on change
 */
export function useLiveSync(fetcherFn, intervalMs = 6000, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState(null);
  const [lastSyncedAt, setLastSyncedAt] = useState(new Date());

  const fetcherRef = useRef(fetcherFn);
  useEffect(() => {
    fetcherRef.current = fetcherFn;
  }, [fetcherFn]);

  const executeSync = useCallback(async (isInitial = false) => {
    if (isInitial) {
      setLoading(true);
    } else {
      setIsSyncing(true);
    }
    setError(null);

    try {
      if (fetcherRef.current) {
        const result = await fetcherRef.current();
        setData(result);
        setLastSyncedAt(new Date());
      }
    } catch (err) {
      console.warn('LiveSync data fetch failed:', err);
      setError(err.message || 'Synchronization pause');
    } finally {
      setLoading(false);
      setIsSyncing(false);
    }
  }, []);

  // Initial fetch and dependency re-fetch
  useEffect(() => {
    executeSync(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  // Periodic polling & Window focus refetch
  useEffect(() => {
    if (!intervalMs) return;

    const timer = setInterval(() => {
      executeSync(false);
    }, intervalMs);

    const handleFocus = () => {
      executeSync(false);
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(timer);
      window.removeEventListener('focus', handleFocus);
    };
  }, [intervalMs, executeSync]);

  return {
    data,
    loading,
    isSyncing,
    error,
    lastSyncedAt,
    triggerSync: () => executeSync(false),
  };
}

export default useLiveSync;
