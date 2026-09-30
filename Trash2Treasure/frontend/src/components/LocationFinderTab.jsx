import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  AlertCircle,
  CheckCircle2,
  Battery,
  RefreshCw,
  Filter,
  Trash2,
  Cpu,
  Biohazard,
  Apple,
  Recycle,
  Compass,
  Zap,
  LocateFixed,
  Radio,
  ExternalLink
} from 'lucide-react';

// Haversine formula for calculating exact distance in km & meters
function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return { km: 0.5, meters: 500, formatted: '500m' };
  
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const km = R * c;
  const meters = Math.round(km * 1000);

  if (meters < 1000) {
    return { km, meters, formatted: `${meters}m` };
  }
  return { km, meters, formatted: `${km.toFixed(1)}km` };
}

export default function LocationFinderTab({ smartBins, onEmptyBin }) {
  const [filterType, setFilterType] = useState('ALL');
  const [selectedBin, setSelectedBin] = useState(smartBins[0] || null);

  // Live GPS User Location State
  const [userGps, setUserGps] = useState({
    latitude: 28.6139,
    longitude: 77.2090,
    isLive: false,
    accuracy: null,
    statusText: 'Default Grid Location (Sector 14)'
  });

  const [isLocating, setIsLocating] = useState(false);
  const [gpsError, setGpsError] = useState(null);

  // Function to acquire real live GPS position via browser Geolocation API
  const handleAcquireLiveGps = () => {
    setIsLocating(true);
    setGpsError(null);

    if (!navigator.geolocation) {
      setGpsError('Geolocation API is not supported by your browser.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setUserGps({
          latitude,
          longitude,
          isLive: true,
          accuracy: Math.round(accuracy),
          statusText: `Live GPS Locked (±${Math.round(accuracy)}m accuracy)`
        });
        setIsLocating(false);
      },
      (error) => {
        let msg = 'Failed to retrieve live location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'GPS permission denied. Using default Sector 14 coords.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'GPS position unavailable.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'GPS request timed out.';
        }
        setGpsError(msg);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Compute live dynamic distances to all smart bins
  const binsWithDistance = smartBins.map(bin => {
    const dist = calculateDistance(
      userGps.latitude,
      userGps.longitude,
      bin.latitude || 28.6150,
      bin.longitude || 77.2100
    );
    return { ...bin, distanceInfo: dist };
  }).sort((a, b) => a.distanceInfo.meters - b.distanceInfo.meters);

  const filteredBins = binsWithDistance.filter(b => {
    if (filterType === 'FULL') return b.fillPercentage >= 80 || !b.isAvailable;
    if (filterType === 'AVAILABLE') return b.isAvailable && b.fillPercentage < 80;
    if (filterType !== 'ALL') return b.binType === filterType;
    return true;
  });

  const getBinIcon = (type) => {
    switch (type) {
      case 'E_WASTE': return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'ORGANIC': return <Apple className="w-5 h-5 text-amber-400" />;
      case 'HAZARD': return <Biohazard className="w-5 h-5 text-rose-400" />;
      default: return <Recycle className="w-5 h-5 text-emerald-400" />;
    }
  };

  // Open Google Maps navigation directly
  const handleOpenGoogleMaps = (bin) => {
    const lat = bin.latitude || 28.6210;
    const lng = bin.longitude || 77.2150;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Banner & Live GPS Radar Control */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 glass-panel rounded-3xl p-5 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-emerald-400" />
              <span>Smart Bin Live GPS Radar</span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Live Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-400">Real-time GPS proximity tracking for smart waste drop-boxes, e-waste hubs, and municipal bins.</p>
        </div>

        {/* Live GPS Lock Button & Filters */}
        <div className="flex flex-wrap items-center gap-3">
          
          <button
            onClick={handleAcquireLiveGps}
            disabled={isLocating}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg ${
              userGps.isLive
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-emerald-500/20'
                : 'bg-slate-900 border border-slate-700 hover:border-emerald-500 text-emerald-400'
            }`}
          >
            <LocateFixed className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Locking GPS Signal...' : userGps.isLive ? '✓ GPS Radar Active' : '📍 Activate Live GPS'}</span>
          </button>

          {/* Filter Options */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterType === 'ALL' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({smartBins.length})
            </button>
            <button
              onClick={() => setFilterType('AVAILABLE')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterType === 'AVAILABLE' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Available
            </button>
            <button
              onClick={() => setFilterType('FULL')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterType === 'FULL' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🚨 Full
            </button>
          </div>

        </div>
      </div>

      {/* GPS Status Banner */}
      {gpsError && (
        <div className="p-3 rounded-2xl bg-amber-950/70 border border-amber-500/50 text-amber-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{gpsError}</span>
        </div>
      )}

      {/* Main Radar Map Grid & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Animated Radar Radar Canvas */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-4 border border-slate-800 flex flex-col justify-between relative overflow-hidden min-h-[440px]">
          
          {/* Radar Header Overlay */}
          <div className="absolute top-6 left-6 z-20 bg-slate-950/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2 shadow-xl">
            <span className={`w-2.5 h-2.5 rounded-full ${userGps.isLive ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
            <div>
              <p className="font-bold text-slate-100">{userGps.statusText}</p>
              <p className="text-[10px] text-slate-400">Lat: {userGps.latitude.toFixed(4)} • Lng: {userGps.longitude.toFixed(4)}</p>
            </div>
          </div>

          {/* Simulated Radar Visual Canvas */}
          <div className="w-full h-full min-h-[380px] bg-slate-950 rounded-2xl relative border border-slate-900 overflow-hidden flex items-center justify-center">
            
            {/* Grid background lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>

            {/* Pulsing Radar Sonar Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 rounded-full border border-emerald-500/20 animate-ping" style={{ animationDuration: '4s' }}></div>
              <div className="absolute w-72 h-72 rounded-full border border-emerald-500/15 animate-ping" style={{ animationDuration: '6s' }}></div>
              <div className="absolute w-[360px] h-[360px] rounded-full border border-teal-500/10"></div>
            </div>

            {/* Radar Sweeping Line */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-96 h-96 rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(16,185,129,0.15)_360deg)] animate-spin" style={{ animationDuration: '8s' }}></div>
            </div>

            {/* User Center GPS Marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-emerald-400 shadow-xl shadow-emerald-500/50">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              </div>
              <span className="mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-950/90 text-emerald-300 border border-emerald-500/30">
                YOU ARE HERE
              </span>
            </div>

            {/* Smart Bins Pins on Map */}
            {filteredBins.map((bin, index) => {
              const positions = [
                { top: '28%', left: '42%' },
                { top: '68%', left: '22%' },
                { top: '22%', left: '78%' },
                { top: '78%', left: '72%' },
              ];
              const pos = positions[index % positions.length];
              const isSelected = selectedBin && selectedBin.id === bin.id;
              const isFull = bin.fillPercentage >= 80;

              return (
                <div
                  key={bin.id}
                  onClick={() => setSelectedBin(bin)}
                  style={{ top: pos.top, left: pos.left }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                    isSelected ? 'scale-125 z-40' : 'hover:scale-110 z-30'
                  }`}
                >
                  <div className={`p-2 rounded-2xl border flex items-center gap-1.5 shadow-2xl backdrop-blur-md ${
                    isFull
                      ? 'bg-rose-950/95 border-rose-500 text-rose-300 animate-pulse'
                      : 'bg-slate-900/95 border-emerald-500/60 text-emerald-400'
                  }`}>
                    {getBinIcon(bin.binType)}
                    <div>
                      <p className="text-[10px] font-bold leading-tight">{bin.fillPercentage}%</p>
                      <p className="text-[8px] text-slate-400 font-mono">{bin.distanceInfo?.formatted}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Live Collector Truck Indicator */}
            <div className="absolute top-[55%] left-[45%] z-30 flex items-center gap-1 bg-amber-500 text-slate-950 px-2 py-1 rounded-full text-[10px] font-bold shadow-lg animate-bounce">
              🚚 Fleet Truck #04
            </div>

          </div>

          {/* Map Footer Note */}
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 px-2">
            <span>Click pin to view live capacity telemetry & route navigation</span>
            <span className="text-emerald-400 font-bold">{filteredBins.length} Radar Bins Locked</span>
          </div>

        </div>

        {/* Selected Smart Bin Details Card & Capacity Meter */}
        <div className="lg:col-span-5 space-y-4">
          {selectedBin ? (
            <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-5">
              
              <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-emerald-400 font-bold">{selectedBin.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                      {selectedBin.binType}
                    </span>
                    {selectedBin.distanceInfo && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        📍 {selectedBin.distanceInfo.formatted} away
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-100 text-base">{selectedBin.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedBin.address}</p>
                </div>
                {getBinIcon(selectedBin.binType)}
              </div>

              {/* Fill Capacity Bar */}
              <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-300">Bin Fill Telemetry</span>
                  <span className={`font-mono text-sm font-bold ${
                    selectedBin.fillPercentage >= 80 ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {selectedBin.fillPercentage}% Full
                  </span>
                </div>

                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      selectedBin.fillPercentage >= 80
                        ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    }`}
                    style={{ width: `${selectedBin.fillPercentage}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Last Emptied: {selectedBin.lastEmptied || '2 hours ago'}</span>
                  <span>{selectedBin.isAvailable ? '✅ Ready for use' : '⚠️ Bin Full'}</span>
                </div>
              </div>

              {/* Navigation & Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleOpenGoogleMaps(selectedBin)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:brightness-110"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Start Turn-By-Turn GPS Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </button>

                {onEmptyBin && (
                  <button
                    type="button"
                    onClick={() => onEmptyBin(selectedBin.id)}
                    className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-slate-700 text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Simulate Servicing / Emptying Smart Bin</span>
                  </button>
                )}
              </div>

            </div>
          ) : (
            <div className="p-8 text-center glass-card rounded-3xl text-slate-400">
              Select a smart bin from the radar map to view telemetry.
            </div>
          )}

          {/* List of nearby bins sorted by real GPS proximity */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1 flex items-center justify-between">
              <span>Nearby Bins (Sorted by Proximity)</span>
              <span className="text-emerald-400">{filteredBins.length} Bins</span>
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {filteredBins.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setSelectedBin(b)}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                    selectedBin && selectedBin.id === b.id
                      ? 'bg-slate-900 border-emerald-500/80 shadow-md ring-1 ring-emerald-500/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {getBinIcon(b.binType)}
                    <div>
                      <p className="font-semibold text-slate-200">{b.name}</p>
                      <p className="text-[10px] text-slate-400">{b.address}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      b.fillPercentage >= 80 ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {b.fillPercentage}% Full
                    </span>
                    {b.distanceInfo && (
                      <p className="text-[10px] text-emerald-400 font-mono font-semibold mt-0.5">
                        📍 {b.distanceInfo.formatted}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
