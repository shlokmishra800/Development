import React, { useState } from 'react';
import { Sparkles, Camera, ArrowRight, CheckCircle2, AlertTriangle, Info, HelpCircle } from 'lucide-react';
import { AI_SUGGESTIONS } from '../mockData';

export default function AiWasteGuideTab() {
  const [selectedSample, setSelectedSample] = useState(AI_SUGGESTIONS[0]);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanSample = (sample) => {
    setIsScanning(true);
    setTimeout(() => {
      setSelectedSample(sample);
      setIsScanning(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="glass-panel rounded-3xl p-6 border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
          AI Waste Segregation Assistant
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
          Smart Waste Photo Classifier
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Not sure which bin to throw an item into? Scan or pick a sample photo below to get instant bin classification, disposal tips & eco-points!
        </p>
      </div>

      {/* Sample Selector Buttons */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 text-center">
          Select item photo for instant AI scan:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {AI_SUGGESTIONS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleScanSample(item)}
              className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                selectedSample.name === item.name
                  ? 'bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/40 shadow-lg'
                  : 'glass-card border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <p className="font-bold text-xs text-slate-100">{item.name}</p>
                <p className="text-[10px] text-cyan-400 font-semibold">{item.binType}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* AI Analysis Result Card */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-6">
        {isScanning ? (
          <div className="p-12 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-200">Analyzing image neural network embeddings...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 aspect-video shadow-xl">
              <img src={selectedSample.imageUrl} alt={selectedSample.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-400 border border-emerald-500/30">
                +{selectedSample.ecoPoints} Eco-Pts Available
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Identified Object</span>
                <h3 className="text-xl font-bold text-slate-100">{selectedSample.name}</h3>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-950/50 border border-cyan-500/40 space-y-2">
                <span className="text-[10px] font-bold uppercase text-cyan-300 block">Recommended Smart Bin</span>
                <p className="text-base font-extrabold text-cyan-400 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  <span>{selectedSample.binType}</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Eco-Disposal Tip</span>
                <p className="text-xs text-slate-300">{selectedSample.tip}</p>
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
