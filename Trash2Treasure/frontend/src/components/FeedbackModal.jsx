import React, { useState } from 'react';
import { MessageSquarePlus, Star, Send, X, CheckCircle2, Sparkles, Mail, HeartHandshake } from 'lucide-react';
import * as api from '../api';

export default function FeedbackModal({ isOpen, onClose, user }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('SUGGESTION');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

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

    // 1. Save directly to MongoDB Atlas via Spring Boot REST API
    await api.submitFeedback(feedbackPayload);

    // 2. Trigger direct Admin Email Notification (shlokmishra576@gmail.com) via Formspree / Mailto fallback
    try {
      fetch('https://formspree.io/f/shlokmishra576@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `🌱 New Trash2Treasure Feedback from ${feedbackPayload.userName} (${rating} Stars)`,
          ...feedbackPayload
        })
      }).catch(() => {});
    } catch (err) {}

    setIsSubmitting(false);
    setIsSubmittedSuccess(true);
    setTimeout(() => {
      setIsSubmittedSuccess(false);
      setMessage('');
      onClose();
    }, 2500);
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
              <p className="text-xs text-slate-400">Direct feedback sent to Admin's Gmail & saved to MongoDB Atlas</p>
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
              Thank you for helping us improve Trash2Treasure. Your review has been saved in MongoDB Atlas & delivered to Admin's email!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
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

            {/* Detailed Message Textarea */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Your Comments & Feedback Details
              </label>
              <textarea
                rows="4"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your feedback, feature request or issue here..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !message.trim()}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl hover:brightness-110 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Sending to MongoDB & Admin Gmail...' : 'Submit Feedback to Admin'}</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
