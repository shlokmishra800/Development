import React, { useState, useEffect } from 'react';
import LandingAuthGate from './components/LandingAuthGate';
import AuthModal from './components/AuthModal';
import Navbar from './components/Navbar';
import ReportWasteTab from './components/ReportWasteTab';
import ComplaintTrackingTab from './components/ComplaintTrackingTab';
import LocationFinderTab from './components/LocationFinderTab';
import RewardsTab from './components/RewardsTab';
import ImpactAnalyticsTab from './components/ImpactAnalyticsTab';
import AiWasteGuideTab from './components/AiWasteGuideTab';
import MarketplaceTab from './components/MarketplaceTab';
import CollectorMarketplaceTab from './components/CollectorMarketplaceTab';
import AdminUserManagementTab from './components/AdminUserManagementTab';
import ArEducationTab from './components/ArEducationTab';
import ProfileModal from './components/ProfileModal';
import * as api from './api';

import {
  INITIAL_USER,
  INITIAL_USERS_LIST,
  INITIAL_COMPLAINTS,
  SMART_BINS,
  REWARDS_STORE,
  LEADERBOARD,
  IMPACT_METRICS,
  DOORSTEP_PICKUP_REQUESTS
} from './mockData';

import {
  Camera,
  Clock,
  MapPin,
  Gift,
  BarChart3,
  Sparkles,
  ShoppingBag,
  Gamepad2,
  Leaf,
  ShieldCheck,
  Truck,
  UserCheck,
  LogOut,
  UserX,
  Scale
} from 'lucide-react';

// Helper to read initial session user from localStorage
const getInitialUser = () => {
  try {
    const saved = localStorage.getItem('t2t_session_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.email) return parsed;
    }
  } catch (e) {
    console.error('Failed to parse saved session user:', e);
  }
  return INITIAL_USER;
};

const getInitialAuth = () => {
  return localStorage.getItem('t2t_is_authenticated') === 'true';
};

export default function App() {
  // Authentication Gate State
  const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuth);
  const [user, setUser] = useState(getInitialUser);
  const [usersList, setUsersList] = useState(INITIAL_USERS_LIST);

  const [activeTab, setActiveTab] = useState('REPORT');
  const [isOffline, setIsOffline] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [authRoleModalTarget, setAuthRoleModalTarget] = useState(null);
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [smartBins, setSmartBins] = useState(SMART_BINS);
  const [pickupRequests, setPickupRequests] = useState(DOORSTEP_PICKUP_REQUESTS);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'RESOLVED',
      title: 'Complaint #T2T-8922 Resolved!',
      message: 'Overflowing Plastic Bin #402 has been cleaned & emptied by Eco-Fleet 4.',
      time: '10 mins ago',
      read: false
    },
    {
      id: 2,
      type: 'HAZARD',
      title: '🚨 Hazard Alert Dispatched',
      message: 'HazMat Team One dispatched to Industrial Area Phase 2 chemical leak.',
      time: '25 mins ago',
      read: false
    }
  ]);

  const handleLoginSuccess = (authenticatedUser) => {
    if (!authenticatedUser || !authenticatedUser.email) return;

    // Direct assignment of logged-in / registered user details
    setUser(authenticatedUser);
    setIsAuthenticated(true);

    try {
      localStorage.setItem('t2t_session_user', JSON.stringify(authenticatedUser));
      localStorage.setItem('t2t_is_authenticated', 'true');
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }

    // Add or update registered user in usersList
    setUsersList(prev => {
      const idx = prev.findIndex(u => u.email.toLowerCase() === authenticatedUser.email.toLowerCase());
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], ...authenticatedUser };
        return updated;
      }
      return [authenticatedUser, ...prev];
    });

    // Filter active tab according to persona
    if (authenticatedUser.role === 'COLLECTOR') setActiveTab('TRACKING');
    else if (authenticatedUser.role === 'ADMIN') setActiveTab('ADMIN_GOVERNANCE');
    else setActiveTab('REPORT');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('t2t_session_user');
      localStorage.removeItem('t2t_is_authenticated');
    } catch (e) {}
  };

  // Admin Blocking / Unblocking handlers
  const handleBlockUser = (userId, reason) => {
    setUsersList(prev =>
      prev.map(u => u.id === userId ? { ...u, status: 'BLOCKED', blockReason: reason } : u)
    );
    if (user.id === userId) {
      setUser(u => ({ ...u, status: 'BLOCKED', blockReason: reason }));
    }
  };

  const handleUnblockUser = (userId) => {
    setUsersList(prev =>
      prev.map(u => u.id === userId ? { ...u, status: 'ACTIVE', blockReason: null } : u)
    );
    if (user.id === userId) {
      setUser(u => ({ ...u, status: 'ACTIVE', blockReason: null }));
    }
  };

  // Fetch live backend data from Spring Boot when online
  useEffect(() => {
    if (isOffline) return;

    async function syncBackendData() {
      // Fetch Bins
      const backendBins = await api.fetchSmartBins();
      if (backendBins && backendBins.length > 0) {
        setSmartBins(backendBins);
      }

      // Fetch Complaints
      const backendComplaints = await api.fetchComplaints();
      if (backendComplaints && backendComplaints.length > 0) {
        setComplaints(backendComplaints);
      }

      // Fetch Users list
      const backendUsers = await api.fetchUsers();
      if (backendUsers && backendUsers.length > 0) {
        setUsersList(backendUsers);
      }
    }

    syncBackendData();
  }, [isOffline]);

  const handleAddComplaint = (newReport) => {
    if (user.status === 'BLOCKED') {
      alert('Your account is blocked by municipal admin. You cannot submit waste reports.');
      return;
    }
    setComplaints(prev => [newReport, ...prev]);
    setUser(u => ({ ...u, ecoPoints: u.ecoPoints + 25 }));

    // Post to Spring Boot Backend if online
    if (!isOffline) {
      api.createComplaint(newReport);
      api.updateUserPoints(user.id, 25);
    }
  };

  const handleUpdateComplaintStatus = (id, newStatus, resolutionUrl) => {
    setComplaints(prev =>
      prev.map(c => {
        if (c.id === id) {
          return {
            ...c,
            status: newStatus,
            resolvedAt: newStatus === 'RESOLVED' ? new Date().toISOString() : c.resolvedAt,
            resolutionImageUrl: resolutionUrl || c.resolutionImageUrl
          };
        }
        return c;
      })
    );

    // Sync status with Spring Boot Backend if online
    if (!isOffline) {
      api.updateComplaintStatus(id, newStatus, resolutionUrl);
    }
  };

  const handleEmptyBin = (binId) => {
    setSmartBins(prev =>
      prev.map(b => (b.id === binId ? { ...b, fillPercentage: 0, isAvailable: true, lastEmptied: 'Just now' } : b))
    );

    // Update bin capacity in Spring Boot Backend if online
    if (!isOffline) {
      api.updateBinCapacity(binId, 0);
    }
  };

  const handleRedeemReward = (cost) => {
    if (user.status === 'BLOCKED') {
      alert('Your account is blocked by municipal admin. You cannot redeem rewards.');
      return;
    }
    setUser(u => ({ ...u, ecoPoints: u.ecoPoints - cost }));

    // Deduct points in Spring Boot Backend if online
    if (!isOffline) {
      api.updateUserPoints(user.id, -cost);
    }
  };

  const handleEarnBonusPoints = (pts) => {
    setUser(u => ({ ...u, ecoPoints: u.ecoPoints + pts }));
  };

  // 1. Mandatory Landing / Auth Gateway
  if (!isAuthenticated) {
    return <LandingAuthGate onLoginSuccess={handleLoginSuccess} />;
  }

  // Define strictly tailored tabs per role!
  const citizenTabs = [
    { id: 'REPORT', label: 'Report Waste', icon: Camera, badge: '+25 Pts' },
    { id: 'TRACKING', label: 'My Reports', icon: Clock, count: complaints.filter(c => c.status !== 'RESOLVED').length },
    { id: 'MAP', label: 'Smart Bin Finder', icon: MapPin },
    { id: 'REWARDS', label: 'Eco Rewards', icon: Gift },
    { id: 'AI', label: 'AI Waste Guide', icon: Sparkles },
    { id: 'MARKETPLACE', label: 'Recycling Marketplace', icon: ShoppingBag },
    { id: 'AR_QUIZ', label: 'AR Eco Quiz', icon: Gamepad2 },
    { id: 'IMPACT', label: 'My Impact', icon: BarChart3 }
  ];

  const collectorTabs = [
    { id: 'TRACKING', label: 'Assigned Pickups & Cleanups', icon: Clock, count: complaints.filter(c => c.status !== 'RESOLVED').length },
    { id: 'COLLECTOR_PICKUPS', label: 'Doorstep Marketplace Scrap Pickups', icon: Scale, count: pickupRequests.filter(r => r.status !== 'PICKED_UP').length },
    { id: 'MAP', label: 'Smart Bin Telemetry & Servicing', icon: MapPin }
  ];

  const adminTabs = [
    { id: 'ADMIN_GOVERNANCE', label: 'User Governance & Blocking', icon: UserX, badge: 'Governance' },
    { id: 'IMPACT', label: 'City SLA & Analytics', icon: BarChart3 },
    { id: 'TRACKING', label: 'Complaints Master Control', icon: Clock, count: complaints.length },
    { id: 'MAP', label: 'Smart Bin Telemetry', icon: MapPin }
  ];

  const roleTabs = user.role === 'ADMIN' ? adminTabs : user.role === 'COLLECTOR' ? collectorTabs : citizenTabs;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Header Navigation */}
      <Navbar
        user={user}
        setUser={setUser}
        isOffline={isOffline}
        setIsOffline={setIsOffline}
        notifications={notifications}
        setNotifications={setNotifications}
        onOpenAuth={handleLogout}
        onOpenProfile={() => setShowProfileModal(true)}
        onRequireRoleAuth={(targetRole) => setAuthRoleModalTarget(targetRole)}
      />

      {/* Role-Specific Filtered Tab Navigation Bar */}
      <div className="glass-panel border-b border-slate-800 sticky top-[65px] z-40 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-2 py-1">
          {roleTabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;

            let activeColorClass = 'from-emerald-500 to-teal-500 text-slate-950 shadow-emerald-500/20';
            if (user.role === 'COLLECTOR') activeColorClass = 'from-amber-500 to-orange-500 text-slate-950 shadow-amber-500/20';
            if (user.role === 'ADMIN') activeColorClass = 'from-cyan-500 to-blue-600 text-white shadow-cyan-500/20';

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
                  isActive
                    ? `bg-gradient-to-r ${activeColorClass} shadow-lg font-bold scale-[1.02]`
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-slate-950 text-emerald-300' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-slate-950 text-amber-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Body View Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Blocked User Warning Banner (If Account Blocked by Admin!) */}
        {user.status === 'BLOCKED' && (
          <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/80 text-rose-200 text-xs flex items-center justify-between shadow-xl animate-pulse">
            <div className="flex items-center gap-3">
              <UserX className="w-6 h-6 text-rose-400 shrink-0" />
              <div>
                <p className="font-bold text-sm">🚫 Account Blocked by Municipal Admin</p>
                <p className="text-rose-300 mt-0.5">
                  Reason: {user.blockReason || 'Violating website policies or submitting fake hazard reports.'}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase bg-rose-500/30 px-3 py-1 rounded-full text-rose-300 border border-rose-500/50">
              Restricted Mode
            </span>
          </div>
        )}

        {/* Active Logged In Persona Header Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Active Session Persona:</span>
            {user.role === 'CITIZEN' && (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <UserCheck className="w-4 h-4" /> Citizen Portal ({user.name} • {user.locality || 'Sector 14'})
              </span>
            )}
            {user.role === 'COLLECTOR' && (
              <span className="text-amber-400 font-bold flex items-center gap-1.5">
                <Truck className="w-4 h-4" /> Collector Duty Portal ({user.name} • {user.vehicleId || 'FLEET-TRUCK-04'})
              </span>
            )}
            {user.role === 'ADMIN' && (
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Municipal Authority Control ({user.name} • {user.departmentId || 'MUN-DEPT-882'})
              </span>
            )}
          </div>
          
          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 hover:border-rose-500 text-slate-300 hover:text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out / Switch Persona</span>
          </button>
        </div>

        {/* Tab Render Switch */}
        {activeTab === 'REPORT' && (
          <ReportWasteTab onSubmitComplaint={handleAddComplaint} isOffline={isOffline} />
        )}

        {activeTab === 'TRACKING' && (
          <ComplaintTrackingTab
            complaints={complaints}
            onUpdateStatus={handleUpdateComplaintStatus}
            userRole={user.role}
          />
        )}

        {activeTab === 'MAP' && (
          <LocationFinderTab smartBins={smartBins} onEmptyBin={handleEmptyBin} />
        )}

        {activeTab === 'REWARDS' && (
          <RewardsTab
            user={user}
            rewardsStore={REWARDS_STORE}
            leaderboard={LEADERBOARD}
            onRedeemReward={handleRedeemReward}
          />
        )}

        {activeTab === 'IMPACT' && (
          <ImpactAnalyticsTab
            impactMetrics={IMPACT_METRICS}
            complaints={complaints}
            smartBins={smartBins}
            userRole={user.role}
          />
        )}

        {activeTab === 'AI' && (
          <AiWasteGuideTab />
        )}

        {activeTab === 'MARKETPLACE' && (
          <MarketplaceTab />
        )}

        {activeTab === 'COLLECTOR_PICKUPS' && (
          <CollectorMarketplaceTab
            pickupRequests={pickupRequests}
            complaints={complaints}
            onUpdateStatus={handleUpdateComplaintStatus}
          />
        )}

        {activeTab === 'ADMIN_GOVERNANCE' && (
          <AdminUserManagementTab
            usersList={usersList}
            onBlockUser={handleBlockUser}
            onUnblockUser={handleUnblockUser}
          />
        )}

        {activeTab === 'AR_QUIZ' && (
          <ArEducationTab onEarnPoints={handleEarnBonusPoints} />
        )}

      </main>

      {/* User Profile Drawer Modal */}
      {showProfileModal && (
        <ProfileModal
          user={user}
          setUser={setUser}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {/* Role Switch Security Auth Modal */}
      {authRoleModalTarget && (
        <AuthModal
          isOpen={!!authRoleModalTarget}
          onClose={() => setAuthRoleModalTarget(null)}
          initialRole={authRoleModalTarget}
          onLoginSuccess={(authenticatedUser) => {
            setAuthRoleModalTarget(null);
            handleLoginSuccess(authenticatedUser);
          }}
        />
      )}

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-900 py-6 px-4 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-2 text-slate-300 font-bold">
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span>Trash2Treasure (T2T) • Role-Tailored Interfaces</span>
        </div>
        <p>"Transforming waste into community treasure through technology, motivation, and transparency."</p>
      </footer>

    </div>
  );
}
