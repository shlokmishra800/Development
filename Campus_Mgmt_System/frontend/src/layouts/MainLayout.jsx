import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import CampusAiChatbot from '../components/ai/CampusAiChatbot';
import Footer from '../components/common/Footer';

const MainLayout = ({ children, isSyncing, lastSyncedAt }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isSyncing={isSyncing} lastSyncedAt={lastSyncedAt} />
      
      <div className="flex-1 flex relative">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 lg:pl-64 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full transition-all duration-200">
          {children}
        </main>
      </div>

      <CampusAiChatbot />
      <Footer />
    </div>
  );
};

export default MainLayout;
