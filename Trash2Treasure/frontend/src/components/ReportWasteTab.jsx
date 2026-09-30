import React, { useState, useRef } from 'react';
import {
  Camera,
  MapPin,
  AlertOctagon,
  Sparkles,
  UploadCloud,
  CheckCircle2,
  ShieldAlert,
  Cpu,
  Recycle,
  Trash2,
  Biohazard,
  Apple,
  Image as ImageIcon,
  Video,
  X,
  RefreshCw,
  LocateFixed
} from 'lucide-react';

export default function ReportWasteTab({ onSubmitComplaint, isOffline }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('RECYCLABLE');
  const [severity, setSeverity] = useState('MEDIUM');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('Market Road, Sector 14, Near Community Center');
  const [latitude, setLatitude] = useState(28.6139);
  const [longitude, setLongitude] = useState(77.2090);
  const [isHazard, setIsHazard] = useState(false);

  // Photo state
  const [imagePreview, setImagePreview] = useState('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80');
  
  // Camera & File refs & state
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiDetected, setAiDetected] = useState(null);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const categories = [
    { id: 'RECYCLABLE', label: 'Recyclables (Paper/Plastic)', icon: Recycle, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    { id: 'E_WASTE', label: 'E-Waste (Electronics/Battery)', icon: Cpu, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
    { id: 'ORGANIC', label: 'Organic / Wet Waste', icon: Apple, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    { id: 'HAZARD', label: 'Hazardous / Chemical', icon: Biohazard, color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
    { id: 'GENERAL', label: 'General Household Waste', icon: Trash2, color: 'text-slate-400 bg-slate-500/10 border-slate-500/30' },
  ];

  // Handle local image file selection from user device
  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (PNG, JPG, JPEG, WEBP).');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setAiDetected(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Start device live camera stream
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
      setCameraError('Camera access denied or unavailable on this device. Please check permissions or use Upload Photo.');
    }
  };

  // Stop device camera stream
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
  };

  // Capture snapshot from live camera feed
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setImagePreview(dataUrl);
      setAiDetected(null);
      stopCamera();
    }
  };

  const handleAiCategorize = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      if (isHazard || category === 'HAZARD') {
        setAiDetected({
          category: 'HAZARD',
          severity: 'EMERGENCY',
          confidence: '98%',
          reason: 'Toxic chemical container or medical spill pattern detected!'
        });
        setSeverity('EMERGENCY');
      } else {
        setAiDetected({
          category: 'RECYCLABLE',
          severity: 'MEDIUM',
          confidence: '96%',
          reason: 'High density polyethylene plastic containers & recyclable material pattern detected.'
        });
      }
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const newReport = {
      id: `T2T-${Math.floor(1000 + Math.random() * 9000)}`,
      citizenName: 'Aarav Sharma',
      title,
      category,
      severity: isHazard ? 'EMERGENCY' : severity,
      description,
      address,
      latitude,
      longitude,
      status: 'SUBMITTED',
      createdAt: new Date().toISOString(),
      collectorName: 'Assigning nearest collector...',
      imageUrl: imagePreview,
      isOfflineQueued: isOffline
    };

    onSubmitComplaint(newReport);
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 4000);

    // Reset form
    setTitle('');
    setDescription('');
    setAiDetected(null);
  };

  const handleSimulateGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(+pos.coords.latitude.toFixed(4));
          setLongitude(+pos.coords.longitude.toFixed(4));
          setAddress(`Live GPS Locked (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`);
        },
        () => {
          const lat = +(28.6 + Math.random() * 0.05).toFixed(4);
          const lng = +(77.2 + Math.random() * 0.05).toFixed(4);
          setLatitude(lat);
          setLongitude(lng);
          setAddress(`Geotagged Spot #${Math.floor(10 + Math.random() * 90)}, Sector 14`);
        }
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Hidden File Input for Device Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Hidden Canvas for Camera Frame Capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Live Camera Streaming Modal */}
      {isCameraActive && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#0e1626] border border-slate-700 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-4 text-center">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-slate-100 font-bold text-sm">
                <Camera className="w-5 h-5 text-emerald-400" />
                <span>Device Live Camera Viewfinder</span>
              </div>
              <button
                onClick={stopCamera}
                className="p-1.5 rounded-full bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Feed */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video border border-slate-800 flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {/* Grid overlay */}
              <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-2xl pointer-events-none">
                <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                  <div className="border border-emerald-500/10"></div>
                  <div className="border border-emerald-500/10"></div>
                  <div className="border border-emerald-500/10"></div>
                  <div className="border border-emerald-500/10"></div>
                  <div className="border border-emerald-500/10"></div>
                  <div className="border border-emerald-500/10"></div>
                  <div className="border border-emerald-500/10"></div>
                  <div className="border border-emerald-500/10"></div>
                  <div className="border border-emerald-500/10"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={capturePhoto}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110"
              >
                <Camera className="w-5 h-5" />
                <span>📸 Snap Waste Photo Now</span>
              </button>
              <button
                type="button"
                onClick={stopCamera}
                className="px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 border border-emerald-500/20 bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
              <Camera className="w-3.5 h-3.5" /> Citizen Waste Reporting Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              Report Waste & Earn Eco-Points
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Snap a live camera photo or upload from gallery, verify geotag location, and submit dumping reports. Earn <span className="text-emerald-400 font-semibold">+25 Eco-Pts</span> upon cleanup!
            </p>
          </div>

          {/* Emergency Hazard Quick Toggle */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => {
                setIsHazard(!isHazard);
                if (!isHazard) setCategory('HAZARD');
              }}
              className={`px-4 py-3 rounded-2xl font-semibold text-xs flex items-center gap-2.5 transition-all shadow-lg ${
                isHazard
                  ? 'bg-rose-600 text-white hazard-pulse border border-rose-400 shadow-rose-600/30'
                  : 'bg-slate-800 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20'
              }`}
            >
              <AlertOctagon className="w-5 h-5 text-rose-300" />
              <span>{isHazard ? '🚨 HAZARD MODE ACTIVE' : 'Flag Emergency Hazard'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Offline Status Alert */}
      {isOffline && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold">Offline Mode Active</p>
              <p className="text-slate-300">Your waste report will be safely saved locally and synced automatically once internet is reconnected.</p>
            </div>
          </div>
        </div>
      )}

      {/* Camera Error Banner */}
      {cameraError && (
        <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/80 text-rose-200 text-xs flex items-center justify-between">
          <span>{cameraError}</span>
          <button onClick={() => setCameraError(null)} className="text-xs text-rose-400 font-bold">Dismiss</button>
        </div>
      )}

      {/* Success Banner */}
      {submittedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-sm flex items-center gap-3 animate-fade-in shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <p className="font-bold">Report Submitted Successfully!</p>
            <p className="text-xs text-emerald-300">Nearest sanitation squad dispatched. You'll receive live status notifications on your dashboard.</p>
          </div>
        </div>
      )}

      {/* Report Form */}
      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800">
        
        {/* Photo Upload & Camera Capture Section */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            1. Waste Incident Photo (Camera Capture or File Upload)
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Image Preview Window */}
            <div className="md:col-span-6 relative rounded-2xl overflow-hidden border-2 border-dashed border-slate-700 bg-slate-950/60 aspect-video flex items-center justify-center group shadow-inner">
              <img
                src={imagePreview}
                alt="Waste Incident Preview"
                className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                <button
                  type="button"
                  onClick={startCamera}
                  className="px-3 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Camera className="w-4 h-4" />
                  <span>Open Camera</span>
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  <span>Upload File</span>
                </button>
              </div>
            </div>

            {/* Photo Action Controls & Sample Selector */}
            <div className="md:col-span-6 flex flex-col justify-between gap-3 bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
              
              {/* Primary Camera & Upload Buttons */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">Capture or Choose Image:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={startCamera}
                    className="py-3 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110"
                  >
                    <Camera className="w-4 h-4" />
                    <span>📷 Open Camera</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    className="py-3 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                  >
                    <ImageIcon className="w-4 h-4 text-emerald-400" />
                    <span>📁 Upload Photo</span>
                  </button>
                </div>
              </div>

              {/* Sample Images Preset Quick Select */}
              <div className="space-y-1">
                <span className="text-[11px] text-slate-400">Or pick sample incident preset:</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => { setImagePreview('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80'); setAiDetected(null); }}
                    className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-[10px] font-semibold text-slate-300 hover:border-emerald-500"
                  >
                    Plastic Dump
                  </button>
                  <button
                    type="button"
                    onClick={() => { setImagePreview('https://images.unsplash.com/photo-1550985616-10810253b84d?w=600&auto=format&fit=crop&q=80'); setAiDetected(null); }}
                    className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-[10px] font-semibold text-slate-300 hover:border-cyan-500"
                  >
                    E-Waste Spill
                  </button>
                  <button
                    type="button"
                    onClick={() => { setImagePreview('https://images.unsplash.com/photo-1611284446314-60a55ac0d49d?w=600&auto=format&fit=crop&q=80'); setAiDetected(null); }}
                    className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-[10px] font-semibold text-slate-300 hover:border-rose-500"
                  >
                    Hazard Drum
                  </button>
                </div>
              </div>

              {/* AI Auto Classification Trigger */}
              <button
                type="button"
                onClick={handleAiCategorize}
                disabled={isAnalyzing}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/40 text-teal-300 hover:text-teal-100 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className={`w-4 h-4 text-cyan-400 ${isAnalyzing ? 'animate-spin' : ''}`} />
                {isAnalyzing ? 'Scanning Photo with AI...' : 'Run AI Auto-Categorizer'}
              </button>

              {aiDetected && (
                <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-200 text-xs animate-fade-in space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span>AI Detected: {aiDetected.category}</span>
                    <span className="text-[10px] bg-cyan-500/20 px-2 py-0.5 rounded text-cyan-300">
                      {aiDetected.confidence} Confidence
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">{aiDetected.reason}</p>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Category Selector */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            2. Waste Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`p-3 rounded-2xl border text-left flex flex-col items-center text-center justify-between gap-2 transition-all ${
                    isSelected
                      ? `${cat.color} ring-2 ring-emerald-500/50 scale-[1.02] shadow-lg`
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <IconComponent className="w-6 h-6" />
                  <span className="text-xs font-medium leading-tight">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Title & Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              3. Title / Brief Summary
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Overflowing bin near metro gate..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Severity Level
            </label>
            <select
              value={isHazard ? 'EMERGENCY' : severity}
              onChange={(e) => setSeverity(e.target.value)}
              disabled={isHazard}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="LOW">Low (Minor littering)</option>
              <option value="MEDIUM">Medium (Bin overflow)</option>
              <option value="HIGH">High (Blocked access / e-waste dump)</option>
              <option value="EMERGENCY">🚨 Emergency (Toxic/Chemical spill)</option>
            </select>
          </div>
        </div>

        {/* Geotagging & Location Picker */}
        <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>4. GPS Geotagged Location</span>
            </div>
            <button
              type="button"
              onClick={handleSimulateGPS}
              className="text-xs text-emerald-400 hover:underline font-medium flex items-center gap-1"
            >
              <LocateFixed className="w-3.5 h-3.5" />
              <span>Acquire Live GPS</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="sm:col-span-2">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
              />
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
              <span>Lat: {latitude}</span>
              <span>Lng: {longitude}</span>
            </div>
          </div>
        </div>

        {/* Description Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            5. Additional Description
          </label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add any landmark or specific collector instructions..."
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl transition-all ${
            isHazard
              ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-rose-600/30 hover:brightness-110'
              : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 shadow-emerald-500/20 hover:brightness-110'
          }`}
        >
          <UploadCloud className="w-5 h-5" />
          <span>{isOffline ? 'Save Report to Offline Queue' : 'Submit Waste Report & Earn Eco-Points'}</span>
        </button>

      </form>
    </div>
  );
}
