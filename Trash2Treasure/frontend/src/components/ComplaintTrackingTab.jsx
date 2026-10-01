import React, { useState, useRef } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  MapPin,
  User,
  Phone,
  Image as ImageIcon,
  ChevronRight,
  Filter,
  ShieldAlert,
  Camera,
  UploadCloud,
  X,
  Truck,
  Sparkles,
  Check
} from 'lucide-react';

export default function ComplaintTrackingTab({ complaints, onUpdateStatus, userRole, user }) {
  const [filter, setFilter] = useState('ALL');
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const [targetComplaintForResolution, setTargetComplaintForResolution] = useState(null);

  // Filter complaints based on citizen role vs all
  const userComplaints = complaints.filter(c => {
    if (userRole === 'CITIZEN') {
      if (user?.email) {
        return (c.citizenEmail && c.citizenEmail.toLowerCase() === user.email.toLowerCase()) ||
               (c.citizenId && c.citizenId === user.id) ||
               (c.citizenName && c.citizenName.toLowerCase() === user.name?.toLowerCase());
      }
    }
    return true;
  });

  // Track selected complaint by ID for 100% reactive state updates
  const [selectedId, setSelectedId] = useState(userComplaints[0]?.id || complaints[0]?.id || null);

  const selectedComplaint = complaints.find(c => c.id === selectedId) || userComplaints[0] || complaints[0] || null;

  const filteredComplaints = userComplaints.filter(c => {
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

  const isCollectorOrAdmin = (userRole && (userRole.toUpperCase() === 'COLLECTOR' || userRole.toUpperCase() === 'ADMIN')) ||
                             (user?.role && (user.role.toUpperCase() === 'COLLECTOR' || user.role.toUpperCase() === 'ADMIN'));

  const handleOpenResolutionModal = (complaint) => {
    setTargetComplaintForResolution(complaint);
    setShowResolutionModal(true);
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
            All ({userComplaints.length})
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
                  onClick={() => setSelectedId(item.id)}
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
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-emerald-400">{selectedComplaint.id}</span>
                    {getStatusBadge(selectedComplaint.status, selectedComplaint.severity)}
                    <span className="text-[10px] font-bold bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-800 text-slate-300">
                      👤 Reported by: {selectedComplaint.citizenName || 'Eco Citizen'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">{selectedComplaint.title}</h3>
                  <div className="flex flex-wrap items-center gap-2.5 mt-2">
                    <p className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{selectedComplaint.address}</span>
                    </p>
                    <a
                      href={`https://www.google.com/maps?q=${selectedComplaint.latitude || 28.6139},${selectedComplaint.longitude || 77.2090}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-400/50 text-[11px] font-bold flex items-center gap-1 transition-all"
                    >
                      🗺️ Open Live GPS on Google Maps (Lat: {selectedComplaint.latitude || 28.6139}, Lng: {selectedComplaint.longitude || 77.2090})
                    </a>
                  </div>
                </div>

                {/* Collector / Admin Action Controls */}
                {isCollectorOrAdmin && (
                  <div className="flex flex-wrap gap-2 shrink-0">
                    {selectedComplaint.status === 'SUBMITTED' && (
                      <button
                        onClick={() => onUpdateStatus(selectedComplaint.id, 'ASSIGNED')}
                        className="px-3 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 flex items-center gap-1"
                      >
                        <Truck className="w-3.5 h-3.5" /> Assign Squad
                      </button>
                    )}

                    {(selectedComplaint.status === 'SUBMITTED' || selectedComplaint.status === 'ASSIGNED') && (
                      <button
                        onClick={() => onUpdateStatus(selectedComplaint.id, 'IN_PROGRESS')}
                        className="px-3 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 flex items-center gap-1"
                      >
                        <Clock className="w-3.5 h-3.5" /> Start Cleanup
                      </button>
                    )}

                    <button
                      onClick={() => handleOpenResolutionModal(selectedComplaint)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:brightness-110 flex items-center gap-2"
                    >
                      <Camera className="w-4 h-4" />
                      <span>📷 Mark Resolved & Add Camera Photo</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Status Timeline Stepper */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Resolution Timeline & Live Progress</span>
                  <span className="text-emerald-400 font-normal">Real-Time Sync Active</span>
                </h4>
                <div className="grid grid-cols-4 gap-2 relative text-center">
                  
                  {/* Step 1: Submitted */}
                  <div className="space-y-1.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center mx-auto shadow-md shadow-emerald-500/30">
                      ✓
                    </div>
                    <p className="text-[11px] font-semibold text-slate-200">Submitted</p>
                    <p className="text-[10px] text-slate-400">Report Logged</p>
                  </div>

                  {/* Step 2: Collector Assigned */}
                  <div className="space-y-1.5">
                    <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center mx-auto transition-all ${
                      selectedComplaint.status !== 'SUBMITTED' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {selectedComplaint.status !== 'SUBMITTED' ? '✓' : '2'}
                    </div>
                    <p className="text-[11px] font-semibold text-slate-200">Assigned</p>
                    <p className="text-[10px] text-slate-400">{selectedComplaint.collectorName || 'Squad Fleet 04'}</p>
                  </div>

                  {/* Step 3: In Progress */}
                  <div className="space-y-1.5">
                    <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center mx-auto transition-all ${
                      selectedComplaint.status === 'IN_PROGRESS' || selectedComplaint.status === 'RESOLVED' ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {selectedComplaint.status === 'RESOLVED' ? '✓' : '3'}
                    </div>
                    <p className="text-[11px] font-semibold text-slate-200">In Progress</p>
                    <p className="text-[10px] text-slate-400">ETA: {selectedComplaint.eta || '30m'}</p>
                  </div>

                  {/* Step 4: Resolved */}
                  <div className="space-y-1.5">
                    <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center mx-auto transition-all ${
                      selectedComplaint.status === 'RESOLVED' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {selectedComplaint.status === 'RESOLVED' ? '✓' : '4'}
                    </div>
                    <p className="text-[11px] font-semibold text-slate-200">Resolved</p>
                    <p className="text-[10px] text-slate-400">Photo Verified</p>
                  </div>

                </div>
              </div>

              {/* Images Comparison: Reported vs Resolved */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Photo Evidence & Resolution Proof
                  </h4>
                  {isCollectorOrAdmin && (
                    <button
                      onClick={() => handleOpenResolutionModal(selectedComplaint)}
                      className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-bold"
                    >
                      <Camera className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{selectedComplaint.resolutionImageUrl ? '📷 Change Photo Evidence' : '📷 Capture / Add Photo Evidence'}</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">📸 Citizen Reported Issue</span>
                    <img
                      src={selectedComplaint.imageUrl}
                      alt="Reported Issue"
                      className="w-full h-48 object-cover rounded-2xl border border-slate-800"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">✨ Collector Resolution Proof (Verified)</span>
                    {selectedComplaint.resolutionImageUrl ? (
                      <div className="relative group">
                        <img
                          src={selectedComplaint.resolutionImageUrl}
                          alt="Resolution Proof"
                          className="w-full h-48 object-cover rounded-2xl border-2 border-emerald-500/60 shadow-lg shadow-emerald-500/10"
                        />
                        <div className="absolute top-2 right-2 bg-emerald-500 text-slate-950 font-extrabold text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> VERIFIED EVIDENCE
                        </div>
                        {isCollectorOrAdmin && (
                          <button
                            onClick={() => handleOpenResolutionModal(selectedComplaint)}
                            className="absolute bottom-2 left-2 right-2 py-1.5 bg-slate-950/90 text-emerald-300 text-xs font-bold rounded-xl border border-emerald-500/50 flex items-center justify-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity"
                          >
                            <Camera className="w-3.5 h-3.5" /> Re-take / Update Camera Photo
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-48 rounded-2xl border-2 border-dashed border-slate-800 bg-slate-950/50 flex flex-col items-center justify-center text-slate-400 text-xs p-4 text-center space-y-2">
                        <ImageIcon className="w-8 h-8 text-amber-400/60 opacity-80" />
                        <p className="font-semibold text-slate-300">Cleanup in progress</p>
                        <p className="text-[11px] text-slate-500">Proof photo will appear here when completed.</p>
                        {isCollectorOrAdmin ? (
                          <button
                            onClick={() => handleOpenResolutionModal(selectedComplaint)}
                            className="mt-1 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 hover:brightness-110"
                          >
                            <Camera className="w-4 h-4" />
                            <span>📷 Take Live Camera Photo / Upload Proof</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenResolutionModal(selectedComplaint)}
                            className="mt-1 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-500/30"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span>Open Camera / Add Photo</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {selectedComplaint.collectorNotes && (
                  <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200">
                    <span className="font-bold block text-emerald-400 mb-0.5">📝 Collector Field Notes:</span>
                    <p>{selectedComplaint.collectorNotes}</p>
                  </div>
                )}
              </div>

              {/* Collector Details Box */}
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 font-bold">
                    🚚
                  </div>
                  <div>
                    <p className="font-semibold text-slate-200">{selectedComplaint.collectorName || 'Green Squad - Officer Rajesh'}</p>
                    <p className="text-slate-400 text-[11px]">Sanitation Officer in Charge</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`Calling Collector: ${selectedComplaint.collectorPhone || '+91 98765-43210'}`)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 hover:bg-slate-800 flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Contact Squad</span>
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

      {/* Resolution Photo Evidence Modal */}
      {showResolutionModal && targetComplaintForResolution && (
        <ResolutionPhotoModal
          complaint={targetComplaintForResolution}
          onClose={() => {
            setShowResolutionModal(false);
            setTargetComplaintForResolution(null);
          }}
          onResolve={onUpdateStatus}
        />
      )}

    </div>
  );
}

// Sub-component: Photo Evidence Camera & Resolution Modal for Collector
function ResolutionPhotoModal({ complaint, onClose, onResolve }) {
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1604186837056-8e7c286756f2?w=600&auto=format&fit=crop&q=80');
  const [collectorNotes, setCollectorNotes] = useState('Spot cleaned completely, waste removed and area disinfected.');
  
  // Device camera stream state
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
      setCameraError('Device camera access denied or unavailable. Please upload a photo file or choose a preset.');
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
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const samplePresets = [
    { label: 'Clean Swept Sidewalk', url: 'https://images.unsplash.com/photo-1604186837056-8e7c286756f2?w=600&auto=format&fit=crop&q=80' },
    { label: 'Emptied Smart Bin', url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80' },
    { label: 'Cleared E-Waste Spot', url: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=600&auto=format&fit=crop&q=80' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!photoUrl) {
      alert('Please capture or upload photo evidence before marking as resolved!');
      return;
    }
    onResolve(complaint.id, 'RESOLVED', photoUrl, collectorNotes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#0e1626] border border-emerald-500/40 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
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
          Collector Evidence Requirement: Take a live photo using device camera or upload image proof of the cleaned location.
        </p>

        {/* Hidden inputs */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* Live Camera Viewfinder Stream */}
        {isCameraActive ? (
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video border border-emerald-500/50 flex flex-col items-center justify-center">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            
            {/* Viewfinder grid overlay */}
            <div className="absolute inset-0 border border-emerald-500/30 rounded-2xl pointer-events-none">
              <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                <div className="border border-emerald-500/10"></div>
                <div className="border border-emerald-500/10"></div>
                <div className="border border-emerald-500/10"></div>
              </div>
            </div>

            <div className="absolute bottom-3 flex items-center gap-3 z-10">
              <button
                type="button"
                onClick={capturePhoto}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-bold text-xs shadow-lg flex items-center gap-1.5 hover:brightness-110"
              >
                <Camera className="w-4 h-4" /> Capture Photo Snapshot
              </button>
              <button
                type="button"
                onClick={stopCamera}
                className="px-3 py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold hover:bg-slate-800"
              >
                Cancel Camera
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Selected Photo Preview */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 h-48 flex items-center justify-center">
              {photoUrl ? (
                <img src={photoUrl} alt="Evidence Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-slate-500">No Photo Selected</span>
              )}
            </div>

            {/* Photo Action Buttons: Camera & File Upload */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={startCamera}
                className="py-3 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-110"
              >
                <Camera className="w-4 h-4" />
                <span>📷 Open Live Camera</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="py-3 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500 text-slate-200 font-bold text-xs flex items-center justify-center gap-2"
              >
                <UploadCloud className="w-4 h-4 text-emerald-400" />
                <span>📁 Upload Photo File</span>
              </button>
            </div>

            {cameraError && (
              <p className="text-[11px] text-rose-400 bg-rose-950/40 p-2.5 rounded-xl border border-rose-500/30">
                {cameraError}
              </p>
            )}

            {/* Quick Sample Presets */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-400 font-medium">Sample Cleanup Proof Presets:</span>
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

            {/* Collector Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Sanitation Officer Field Notes:</label>
              <textarea
                value={collectorNotes}
                onChange={e => setCollectorNotes(e.target.value)}
                rows={2}
                placeholder="Write optional field notes (e.g. 40kg waste removed, disinfected ground)..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Confirm Submit Button */}
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
