import React, { useState } from 'react';
import { ShoppingBag, Truck, IndianRupee, Calculator, CheckCircle2 } from 'lucide-react';
import { MARKETPLACE_ITEMS } from '../mockData';

export default function MarketplaceTab() {
  const [selectedItem, setSelectedItem] = useState(MARKETPLACE_ITEMS[0]);
  const [quantity, setQuantity] = useState(10);
  const [scheduledSuccess, setScheduledSuccess] = useState(false);

  const calculatePayout = () => {
    const rateNumber = parseFloat(selectedItem.rate.replace(/[^0-9.]/g, '')) || 15;
    return (rateNumber * quantity).toFixed(2);
  };

  const handleSchedulePickup = (e) => {
    e.preventDefault();
    setScheduledSuccess(true);
    setTimeout(() => setScheduledSuccess(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="glass-panel rounded-3xl p-6 border border-amber-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <IndianRupee className="w-3.5 h-3.5" /> Recycling Marketplace (INR)
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
          Sell & Exchange Recyclables for Cash (₹)
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Turn household recyclables into cash payouts (₹) or Eco-Points! Schedule verified doorstep eco-pickup by authorized local recycling partners.
        </p>
      </div>

      {scheduledSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-sm flex items-center gap-3 animate-fade-in shadow-lg">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <p className="font-bold">Eco-Pickup Scheduled!</p>
            <p className="text-xs text-emerald-300">Partner vehicle assigned for doorstep evaluation tomorrow between 10 AM - 2 PM.</p>
          </div>
        </div>
      )}

      {/* Material Rates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MARKETPLACE_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className={`p-4 rounded-3xl cursor-pointer border transition-all ${
              selectedItem.id === item.id
                ? 'bg-slate-900 border-amber-500 ring-2 ring-amber-500/30 shadow-lg'
                : 'glass-card border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-3xl mb-2 block">{item.icon}</span>
            <h3 className="font-bold text-sm text-slate-100">{item.material}</h3>
            <p className="text-xs font-mono font-bold text-amber-400 mt-1">{item.rate}</p>
            <span className="text-[10px] text-slate-500 mt-2 block">Min Qty: {item.minQty}</span>
          </div>
        ))}
      </div>

      {/* Payout Calculator & Booking Form */}
      <form onSubmit={handleSchedulePickup} className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-amber-400" />
          <span>Doorstep Pickup & Payout Calculator</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Selected Recyclable Material</label>
            <input
              type="text"
              readOnly
              value={`${selectedItem.icon} ${selectedItem.material} (${selectedItem.rate})`}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 font-bold text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Estimated Quantity (kg)</label>
            <input
              type="number"
              min="1"
              max="200"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Estimated Earnings Card */}
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-bold">Estimated Cash Payout</span>
            <p className="text-2xl font-mono font-extrabold text-amber-400">₹{calculatePayout()} INR</p>
          </div>
          <span className="text-xs text-slate-300 font-semibold bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            +{(quantity * 10)} Eco-Pts Bonus
          </span>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-xl hover:brightness-110"
        >
          <Truck className="w-5 h-5" />
          <span>Confirm Doorstep Eco-Pickup Schedule</span>
        </button>
      </form>

    </div>
  );
}
