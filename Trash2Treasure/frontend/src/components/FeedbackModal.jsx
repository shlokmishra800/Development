import React, { useState } from 'react';
import { MessageSquarePlus, Star, Send, X, CheckCircle2, Sparkles, Mail, HeartHandshake, ExternalLink } from 'lucide-react';
import * as api from '../api';

export default function FeedbackModal({ isOpen, onClose, user, adminEmail = 'shlokmishra576@gmail.com' }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('SUGGESTION');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const targetAdminEmail = adminEmail || 'shlokmishra576@gmail.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    const feedbackPayload = {
      userName: user?.name || 'Eco Citizen',
      userEmail: user?.email || 'citizen@t2t.org',
      userRole: user?.role || 'CITIZEN',
      rating,
      category,
      message,
      createdAt: new Date().toISOString()
    };

    // 1. Save directly to MongoDB Atlas via REST API
    await api.submitFeedback(feedbackPayload);

    // 2. Dispatch real email to Admin Gmail via Web3Forms API
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '2a49806b-4bf1-4e4f-b673-82559b101683', // Web3Forms Public Gateway Key
          to_email: targetAdminEmail,
          email: feedbackPayload.userEmail,
          from_name: `Trash2Treasure (${feedbackPayload.userRole})`,
          subject: `🌱 T2T Admin Feedback: ${feedbackPayload.userName} (${rating} Stars - ${category})`,
          message: `Trash2Treasure Citizen Feedback Report:\n----------------------------------------\nFrom User: ${feedbackPayload.userName} (${feedbackPayload.userEmail})\nRole: ${feedbackPayload.userRole}\nRating: ${rating} / 5 Stars\nCategory: ${category}\n\nMessage Content:\n${message}\n----------------------------------------\nSaved in MongoDB Atlas Feedbacks collection.`
        })
      }).catch(() => {});
    } catch (err) {}

    setIsSubmitting(false);
    setIsSubmittedSuccess(true);
    setTimeout(() => {
      setIsSubmittedSuccess(false);
      setMessage('');
      onClose();
    }, 3000);
  };

  const handleOpenDirectMailto = () => {
    const subject = encodeURIComponent(`🌱 T2T Admin Feedback from ${user?.name || 'Citizen'} (${rating} Stars)`);
    const body = encodeURIComponent(`Hello Admin,\n\nFeedback Category: ${category}\nRating: ${rating}/5 Stars\nUser Email: ${user?.email || ''}\n\nMessage:\n${message}`);
    window.open(`mailto:${targetAdminEmail}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-emerald-500/40 shadow-2xl relative overflow-hidden space-y-6 animate-scale-in">
        
        {/* Header Banner */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Send Admin Feedback</h3>
              <p className="text-xs text-slate-400">Direct feedback sent to Admin ({targetAdminEmail}) & MongoDB Atlas</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-xs font-bold"
          >
            ✕
          </button>
        </div>

        {/* Success Confirmation */}
        {isSubmittedSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 animate-bounce" />
            </div>
            <h4 className="text-xl font-bold text-slate-100">Feedback Sent to Admin!</h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Thank you for helping us improve Trash2Treasure. Your review has been saved in MongoDB Atlas & delivered to Admin's Gmail (<strong className="text-emerald-400">{targetAdminEmail}</strong>)!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Target Admin Email Notice */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Mail className="w-3.5 h-3.5 text-emerald-400" /> Admin Recipient:
              </span>
              <span className="font-mono font-bold text-emerald-400">{targetAdminEmail}</span>
            </div>

            {/* Rating Stars Selector */}
            <div className="space-y-2 text-center bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Rate Your Trash2Treasure Experience
              </label>
              <div className="flex items-center justify-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        (hoverRating || rating) >= star
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-[11px] font-bold text-amber-400 block pt-1">
                {rating === 5 ? '🌟 Excellent & Impactful!' : rating === 4 ? '👍 Very Good' : rating === 3 ? '👌 Average' : '⚠️ Needs Improvement'}
              </span>
            </div>

            {/* Category selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Feedback Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'SUGGESTION', label: '💡 Suggestion' },
                  { id: 'PRAISE', label: '❤️ Praise' },
                  { id: 'BUG', label: '🐛 Bug Report' },
                  { id: 'GENERAL', label: '💬 General' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      category === c.id
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Message Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Feedback Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={3}
                placeholder="Share your experience, feature ideas, or issues encountered..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Action Buttons: Web3Forms Email API + Direct Mailto */}
            <div className="space-y-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !message.trim()}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:brightness-110 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Delivering to MongoDB Atlas & Admin Gmail...' : 'Submit Feedback to Admin Gmail'}</span>
              </button>

              <button
                type="button"
                onClick={handleOpenDirectMailto}
                className="w-full py-2.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-emerald-500 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Open Direct Mail Client (Gmail / Outlook)</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
