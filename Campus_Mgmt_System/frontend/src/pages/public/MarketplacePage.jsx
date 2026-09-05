import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import CampusAiChatbot from '../../components/ai/CampusAiChatbot';
import { ShoppingBag, Plus, Tag, Phone, IndianRupee } from 'lucide-react';

const initialItems = [
  {
    id: 1,
    title: 'Operating System Concepts (Silberschatz 10th Ed)',
    price: 450,
    condition: 'LIKE NEW',
    category: 'Textbooks',
    seller: 'Shlok Mishra',
    phone: '+91 9876543212',
    description: 'Clean textbook with zero pen markings. Essential reference for B.Tech CSE Semester 5.'
  },
  {
    id: 2,
    title: 'Arduino UNO R3 Starter Kit with Sensors',
    price: 850,
    condition: 'GOOD',
    category: 'Electronics / Projects',
    seller: 'Shivansh Tiwari',
    phone: '+91 9876543211',
    description: 'Includes breadboard, jumper wires, ultrasonic sensors, motors, and OLED display module.'
  }
];

const MarketplacePage = () => {
  const [items, setItems] = useState(initialItems);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('LIKE NEW');
  const [category, setCategory] = useState('Textbooks');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateListing = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      title,
      price: parseFloat(price) || 0,
      condition,
      category,
      seller: 'Shlok Mishra',
      phone,
      description
    };
    setItems([newItem, ...items]);
    setShowModal(false);
    setTitle('');
    setPrice('');
    setPhone('');
    setDescription('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <ShoppingBag className="w-8 h-8 text-brand-teal" />
              <span>Campus Marketplace</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Peer-to-peer student marketplace for used textbooks, calculators, project components, and lab gear.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-violet to-brand-teal text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Sell Used Item</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="glass-card p-6 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-brand-teal/10 text-brand-teal">
                    {item.category}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-500">
                    ₹{item.price}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 text-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span>Seller: <strong className="text-slate-800 dark:text-slate-200">{item.seller}</strong></span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold">{item.condition}</span>
                </div>

                <a
                  href={`tel:${item.phone}`}
                  className="w-full py-2 rounded-xl bg-brand-violet/10 text-brand-violet dark:text-brand-cyan hover:bg-brand-violet hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 mt-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Contact Seller ({item.phone})</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card p-6 max-w-md w-full animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Post Item on Marketplace</h3>
            <form onSubmit={handleCreateListing} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Item Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Operating System Concepts 10th Ed"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="450"
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Condition</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  >
                    <option value="LIKE NEW">LIKE NEW</option>
                    <option value="GOOD">GOOD</option>
                    <option value="FAIR">FAIR</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Contact Phone</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543212"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe item condition..."
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
                  List Item
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

export default MarketplacePage;
