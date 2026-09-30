import React, { useState } from 'react';
import { Award, Sparkles, ShoppingBag, QrCode, Copy, CheckCircle2, Trophy, Star, Gift, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RewardsTab({ user, rewardsStore, leaderboard, onRedeemReward }) {
  const [selectedReward, setSelectedReward] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleRedeem = (reward) => {
    if (user.ecoPoints < reward.ecoPointsCost) {
      alert(`You need ${reward.ecoPointsCost} Eco-Points to redeem this reward. Keep recycling!`);
      return;
    }

    onRedeemReward(reward.ecoPointsCost);
    setSelectedReward(reward);

    // Trigger fireworks confetti!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const targetPercentage = Math.min(
    100,
    Math.round(((user?.recycledThisMonthKg || 0) / (user?.monthlyTargetKg || 50)) * 100)
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Banner: User Points & Monthly Recycling Target */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Points & Progress Card */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Eco-Rewards Hub
              </span>
              <span className="text-xs text-slate-400">{user?.locality || 'Sector 14 Locality'}</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                {user?.ecoPoints ?? 0}
              </span>
              <span className="text-sm font-bold text-slate-300">Available Eco-Points</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Redeem points at local eco-friendly cafes, stores, and sustainable transport options.
            </p>
          </div>

          {/* Monthly Recycling Progress Bar */}
          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold">Monthly Target ({user?.recycledThisMonthKg || 0}kg / {user?.monthlyTargetKg || 50}kg)</span>
              <span className="text-emerald-400 font-mono font-bold">{targetPercentage}% Reached</span>
            </div>
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-700"
                style={{ width: `${targetPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* User Badges Card */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-slate-100 text-sm">Earned Achievements & Badges</h3>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {(user?.badges || ['Eco Champion', 'Zero Waste Novice']).map((badge, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2 hover:border-amber-500/40 transition-colors"
              >
                <span className="text-base">🏅</span>
                <span className="truncate">{badge}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Main Content Grid: Store Offers + Community Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Eco-Partner Offers Store */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <span>Eco-Partner Discount Store</span>
            </h3>
            <span className="text-xs text-slate-400">Local Shop Integrations</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rewardsStore.map((reward) => (
              <div
                key={reward.id}
                className="glass-card rounded-3xl overflow-hidden border border-slate-800 flex flex-col justify-between group hover:border-emerald-500/40"
              >
                <div>
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={reward.imageUrl}
                      alt={reward.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                      {reward.discountPercent}% OFF
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                      {reward.partnerName}
                    </span>
                    <h4 className="font-bold text-sm text-slate-100 group-hover:text-emerald-400 transition-colors">
                      {reward.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{reward.description}</p>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-800/80 flex items-center justify-between bg-slate-950/40">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{reward.ecoPointsCost} Pts</span>
                  </div>

                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={user.ecoPoints < reward.ecoPointsCost}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all ${
                      user.ecoPoints >= reward.ecoPointsCost
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:brightness-110 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Redeem Coupon
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Leaderboard */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>Locality Leaderboard</span>
            </h3>
            <span className="text-xs text-emerald-400 font-semibold">Top Recyclers</span>
          </div>

          <div className="glass-card rounded-3xl p-4 border border-slate-800 space-y-3">
            {leaderboard.map((item) => (
              <div
                key={item.rank}
                className={`p-3 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                  item.name.includes('You')
                    ? 'bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/40'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full font-extrabold flex items-center justify-center text-xs ${
                    item.rank === 1 ? 'bg-amber-400 text-slate-950' :
                    item.rank === 2 ? 'bg-slate-300 text-slate-950' :
                    item.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.rank}
                  </span>
                  <div>
                    <p className="font-bold text-slate-100">{item.name}</p>
                    <p className="text-[10px] text-slate-400">{item.badge} • {item.kgRecycled}kg</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-extrabold text-emerald-400 font-mono text-sm block">{item.points}</span>
                  <span className="text-[10px] text-slate-500">Pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Redeem Coupon Modal */}
      {selectedReward && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel rounded-3xl p-6 max-w-md w-full border border-emerald-500/40 shadow-2xl space-y-5 animate-scale-in">
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <Gift className="w-6 h-6 animate-bounce" />
              </div>
              <h3 className="text-xl font-bold text-slate-100">Coupon Redeemed!</h3>
              <p className="text-xs text-slate-300">{selectedReward.title} from <span className="text-emerald-400 font-semibold">{selectedReward.partnerName}</span></p>
            </div>

            {/* QR Code Container */}
            <div className="bg-white p-4 rounded-2xl max-w-[200px] mx-auto text-center space-y-2 shadow-lg">
              <div className="aspect-square bg-slate-900 rounded-xl p-2 flex items-center justify-center">
                <QrCode className="w-32 h-32 text-emerald-400" />
              </div>
              <p className="text-[10px] text-slate-700 font-bold uppercase tracking-wider">Scan at Register</p>
            </div>

            {/* Promo Code Copy Box */}
            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Promo Code</span>
                <span className="font-mono text-sm font-extrabold text-emerald-400">{selectedReward.code}</span>
              </div>
              <button
                onClick={() => handleCopyCode(selectedReward.code)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:text-emerald-400 text-xs font-semibold flex items-center gap-1.5"
              >
                {copiedCode ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <button
              onClick={() => setSelectedReward(null)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs"
            >
              Done & Return to Store
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
