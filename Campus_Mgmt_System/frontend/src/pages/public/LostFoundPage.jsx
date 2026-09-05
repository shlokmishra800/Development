import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import CampusAiChatbot from '../../components/ai/CampusAiChatbot';
import { HelpCircle, Plus, Search, MapPin, Phone, Tag } from 'lucide-react';

const initialItems = [
  {
    id: 1,
    title: 'Casio Scientific Calculator fx-991EX',
    type: 'LOST',
    location: 'Room A-204',
    contact: 'Call Shlok: +91 9876543212',
    description: 'Left on desk row 3 after Java Programming lecture.',
    status: 'OPEN'
  },
  {
    id: 2,
    title: 'Black HP Laptop Adapter 65W',
    type: 'FOUND',
    location: 'Central Library 2nd Floor',
    contact: 'Report to Library Front Desk',
    description: 'Found plugged into charging socket near window desk.',
    status: 'OPEN'
  }
];

const LostFoundPage = () => {
  const [items, setItems] = useState(initialItems);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('LOST');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateItem = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      title,
      type,
      location,
      contact,
      description,
      status: 'OPEN'
    };
    setItems([newItem, ...items]);
    setShowModal(false);
    setTitle('');
    setLocation('');
    setContact('');
    setDescription('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-8 h-8 text-brand-violet" />
              <span>Campus Lost & Found</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Report lost items or post items you found around campus to help classmates recover their belongings.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 rounded-xl bg-brand-violet text-white font-bold text-xs hover:bg-brand-violetHover transition-colors flex items-center gap-2 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Report Item</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div key={item.id} className="glass-card p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full ${
                  item.type === 'LOST' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                }`}>
                  {item.type} ITEM
                </span>
                <span className="text-xs font-bold text-slate-400">OPEN</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{item.description}</p>

              <div className="space-y-2 text-xs text-slate-500 border-t border-slate-100 dark:border-slate-700/60 pt-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-violet" />
                  <span>Location: {item.location}</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                  <Phone className="w-4 h-4 text-brand-teal" />
                  <span>{item.contact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card p-6 max-w-md w-full animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Report Lost / Found Item</h3>
            <form onSubmit={handleCreateItem} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Item Category Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                >
                  <option value="LOST">I Lost Something</option>
                  <option value="FOUND">I Found Something</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Item Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Casio fx-991EX Calculator"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Room A-204 / Library"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Contact Info / Phone</label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Call Shlok: +91 9876543212"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add details..."
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-violet text-white font-bold hover:bg-brand-violetHover"
                >
                  Post Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <CampusAiChatbot />
      <Footer />
    </div>
  );
};

export default LostFoundPage;
