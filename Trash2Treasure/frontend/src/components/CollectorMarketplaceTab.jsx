import React, { useState, useRef } from 'react';
import {
  Truck,
  CheckCircle2,
  IndianRupee,
  Scale,
  Clock,
  MapPin,
  AlertCircle,
  ShoppingBag,
  Camera,
  AlertOctagon,
  UploadCloud,
  X
} from 'lucide-react';
import { MARKETPLACE_ITEMS } from '../mockData';

export default function CollectorMarketplaceTab({ pickupRequests, onApprovePickup, complaints = [], onUpdateStatus }) {
  const [requests, setRequests] = useState(pickupRequests);
  const [activeComplaintForResolution, setActiveComplaintForResolution] = useState(null);

  const handleApprove = (reqId) => {
    setRequests(prev =>
      prev.map(r => r.id === reqId ? { ...r, status: 'PICKED_UP' } : r)
    );
    if (onApprovePickup) onApprovePickup(reqId);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Collector Header Banner */}
      <div className="glass-panel rounded-3xl p-6 border border-amber-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Truck className="w-3.5 h-3.5" /> Sanitation Officer Duty Portal
          </div>
          <h2 className="text-2xl font-bold text-slate-100">
            Collector Dispatch & Citizen Waste Request Hub
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            View live citizen dumping reports with exact GPS locations, evaluate scrap materials for doorstep pickup, and record camera photo proof of cleanup.
          </p>
        </div>

        <div className="px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
          <span className="text-amber-400 font-bold block">
            {complaints.filter(c => c.status !== 'RESOLVED').length} Incident Reports Active
          </span>
          <span>Assigned Fleet Truck #04</span>
        </div>
      </div>

      {/* Live Citizen Reported Waste Incidents (Location Highlighted) */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-emerald-400" />
            <span>📍 Live Citizen Waste Incidents & Pickup Locations</span>
          </span>
          <span className="text-xs text-emerald-400 font-mono font-bold">
            {complaints.filter(c => c.status !== 'RESOLVED').length} Pending Cleanups
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {complaints.map((c) => {
            const isResolved = c.status === 'RESOLVED';
            return (
              <div
                key={c.id}
                className={`glass-card rounded-3xl p-5 border space-y-3 transition-all ${
                  isResolved
                    ? 'bg-slate-950/60 border-emerald-500/30 opacity-80'
                    : c.severity === 'EMERGENCY'
                    ? 'bg-rose-950/30 border-rose-500/60 ring-1 ring-rose-500/40'
                    : 'border-slate-800 hover:border-amber-500/40'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-emerald-400">{c.id}</span>
                    <h4 className="font-bold text-slate-100 text-sm mt-0.5">{c.title}</h4>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    isResolved
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : c.severity === 'EMERGENCY'
                      ? 'bg-rose-500/20 text-rose-300 animate-pulse'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {isResolved ? '✓ RESOLVED' : c.severity === 'EMERGENCY' ? '🚨 EMERGENCY' : '🚚 ACTIVE REPORT'}
                  </span>
                </div>

                {/* Exact Location Box */}
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Exact Location: {c.address}</span>
                  </div>
                  {(c.latitude || c.longitude) && (
                    <p className="text-[11px] text-slate-400 font-mono pl-5">
                      GPS Coords: {c.latitude || 28.6139}, {c.longitude || 77.2090}
                    </p>
                  )}
                  <p className="text-[11px] text-slate-300 pl-5">
                    Reported by Citizen: <strong>{c.citizenName || 'Aarav Sharma'}</strong>
                  </p>
                </div>

                {/* Photo & Description */}
                <div className="flex items-center gap-3">
                  {c.imageUrl && (
                    <img
                      src={c.imageUrl}
                      alt={c.title}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                    />
                  )}
                  <p className="text-xs text-slate-400 line-clamp-2">{c.description || 'Waste reported at street junction requiring sanitation squad dispatch.'}</p>
                </div>

                {/* Resolution proof preview if resolved */}
                {isResolved && c.resolutionImageUrl && (
                  <div className="p-2.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs flex items-center gap-3">
                    <img src={c.resolutionImageUrl} alt="Resolution" className="w-12 h-12 rounded-lg object-cover border border-emerald-500/50" />
                    <div>
                      <span className="font-bold text-emerald-400 text-[11px] block">✓ Resolution Proof Verified</span>
                      <p className="text-[10px] text-slate-400">{c.collectorNotes || 'Cleaned and cleared by Sanitation Squad'}</p>
                    </div>
                  </div>
                )}

                {/* Action button: Opens Camera / Resolution Modal */}
                {!isResolved && onUpdateStatus && (
                  <button
                    onClick={() => setActiveComplaintForResolution(c)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-extrabold text-xs shadow-md flex items-center justify-center gap-2 hover:brightness-110"
                  >
                    <Camera className="w-4 h-4" />
                    <span>📷 Capture Photo Evidence & Mark Resolved</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Doorstep Requests List & Scrap Rates Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Doorstep Requests Cards */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Active Citizen Doorstep Scrap Requests</span>
          </h3>

          <div className="space-y-3">
            {requests.map((req) => {
              const isCompleted = req.status === 'PICKED_UP';
              return (
                <div
                  key={req.id}
                  className={`glass-card rounded-3xl p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                    isCompleted
                      ? 'bg-slate-950/60 border-emerald-500/40'
                      : 'border-slate-800 hover:border-amber-500/40'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400">{req.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isCompleted ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {isCompleted ? '✓ PICKED UP & CREDITED' : '🚚 PICKUP PENDING'}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-100 text-sm">{req.material} ({req.quantityKg} kg)</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{req.address} • Citizen: <strong>{req.citizenName}</strong></span>
                    </p>

                    <div className="flex items-center gap-3 text-xs pt-1 font-mono">
                      <span className="text-amber-400 font-bold">Estimated Payout: {req.payout}</span>
                      <span className="text-emerald-400 font-bold">+{req.ecoPoints} Eco-Pts</span>
                    </div>
                  </div>

                  {/* Collector Action Button */}
                  <div className="shrink-0">
                    {!isCompleted ? (
                      <button
                        onClick={() => handleApprove(req.id)}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs shadow-lg hover:brightness-110 flex items-center gap-1.5"
                      >
                        <Scale className="w-4 h-4" />
                        <span>Weigh & Credit Payout (₹)</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 text-xs text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Payout Approved</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reference Rates Card */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-emerald-400" />
            <span>Official Scrap Rate Card (₹ / kg)</span>
          </h3>

          <div className="glass-card rounded-3xl p-5 border border-slate-800 space-y-3">
            {MARKETPLACE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-semibold text-slate-200">{item.material}</span>
                </div>
                <span className="font-mono font-bold text-amber-400">{item.rate}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Collector Photo Evidence Modal */}
      {activeComplaintForResolution && (
        <CollectorPhotoModal
          complaint={activeComplaintForResolution}
          onClose={() => setActiveComplaintForResolution(null)}
          onResolve={(id, status, photoUrl, notes) => {
            onUpdateStatus(id, status, photoUrl, notes);
            setActiveComplaintForResolution(null);
          }}
        />
      )}

    </div>
  );
}

function CollectorPhotoModal({ complaint, onClose, onResolve }) {
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1604186837056-8e7c286756f2?w=600&auto=format&fit=crop&q=80');
  const [collectorNotes, setCollectorNotes] = useState('Waste cleared completely from location and ground sanitized.');
  
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      setCameraStream(stream);
      setIsCameraActive(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 100);
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Camera access denied or unavailable. Please upload a photo file or select a preset.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setPhotoUrl(dataUrl);
      stopCamera();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const samplePresets = [
    { label: 'Clean Swept Sidewalk', url: 'https://images.unsplash.com/photo-1604186837056-8e7c286756f2?w=600&auto=format&fit=crop&q=80' },
    { label: 'Emptied Bin Area', url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80' },
    { label: 'Cleared E-Waste Zone', url: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=600&auto=format&fit=crop&q=80' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!photoUrl) {
      alert('Please capture or upload photo evidence before marking as resolved!');
      return;
    }
    onResolve(complaint.id, 'RESOLVED', photoUrl, collectorNotes);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#0e1626] border border-emerald-500/40 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto text-left">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-slate-100 text-base">
              Add Photo Evidence for #{complaint.id}
            </h3>
          </div>
          <button
            onClick={() => { stopCamera(); onClose(); }}
            className="p-1.5 rounded-full bg-slate-900 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Collector mandatory evidence: Capture live photo from device camera or upload image proof of cleaned spot.
        </p>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />
        <canvas ref={canvasRef} className="hidden" />

        {isCameraActive ? (
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video border border-emerald-500/50 flex flex-col items-center justify-center">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            <div className="absolute bottom-3 flex items-center gap-3 z-10">
              <button
                type="button"
                onClick={capturePhoto}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-lg flex items-center gap-1.5 hover:brightness-110"
              >
                <Camera className="w-4 h-4" /> Capture Snapshot
              </button>
              <button
                type="button"
                onClick={stopCamera}
                className="px-3 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 h-48 flex items-center justify-center">
              {photoUrl ? (
                <img src={photoUrl} alt="Evidence Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-slate-500">No Photo Selected</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={startCamera}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-110"
              >
                <Camera className="w-4 h-4" />
                <span>📷 Open Live Camera</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500 text-slate-200 font-bold text-xs flex items-center justify-center gap-2"
              >
                <UploadCloud className="w-4 h-4 text-emerald-400" />
                <span>📁 Upload Photo File</span>
              </button>
            </div>

            {cameraError && (
              <p className="text-[11px] text-rose-400 bg-rose-950/40 p-2 rounded-xl border border-rose-500/30">
                {cameraError}
              </p>
            )}

            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 font-medium">Sample Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {samplePresets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPhotoUrl(p.url)}
                    className={`text-[10px] px-2.5 py-1 rounded-lg border font-medium transition-all ${
                      photoUrl === p.url ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 font-bold' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Sanitation Officer Field Notes:</label>
              <textarea
                value={collectorNotes}
                onChange={e => setCollectorNotes(e.target.value)}
                rows={2}
                placeholder="Field notes (e.g. waste cleared, area disinfected)..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 hover:brightness-110 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Confirm & Submit Resolution Evidence</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
