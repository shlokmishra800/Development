import React, { useState, useEffect } from 'react';
import LandingAuthGate from './components/LandingAuthGate';
import AuthModal from './components/AuthModal';
import FeedbackModal from './components/FeedbackModal';
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
  return null;
};

const getInitialAuth = () => {
  const initialUser = getInitialUser();
  return localStorage.getItem('t2t_is_authenticated') === 'true' && initialUser !== null;
};

export default function App() {
  // Authentication Gate State
  const [user, setUser] = useState(getInitialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuth);
  const [usersList, setUsersList] = useState(INITIAL_USERS_LIST);

  const [activeTab, setActiveTab] = useState('REPORT');
  const [isOffline, setIsOffline] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
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
    setUser(null);
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

    const pointsAdded = 25;
    const kgAdded = 5.0;

    let updatedPoints = (user.ecoPoints || 0) + pointsAdded;

    setUser(u => {
      const updated = {
        ...u,
        ecoPoints: (u.ecoPoints || 0) + pointsAdded,
        recycledThisMonthKg: +((u.recycledThisMonthKg || 0) + kgAdded).toFixed(1),
        reportsCount: (u.reportsCount || 0) + 1
      };
      try {
        localStorage.setItem('t2t_session_user', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    setUsersList(prev =>
      prev.map(u => (u.email?.toLowerCase() === user.email?.toLowerCase() || u.id === user.id)
        ? {
            ...u,
            ecoPoints: (u.ecoPoints || 0) + pointsAdded,
            recycledThisMonthKg: +((u.recycledThisMonthKg || 0) + kgAdded).toFixed(1),
            reportsCount: (u.reportsCount || 0) + 1
          }
        : u
      )
    );

    // Create live notification for Citizen & System Notification Bell
    const citizenNotif = {
      id: Date.now(),
      type: newReport.severity === 'EMERGENCY' || newReport.category === 'HAZARD' ? 'HAZARD' : 'INFO',
      title: `📝 Report #${newReport.id} Registered!`,
      message: `Waste report "${newReport.title}" logged. +25 Eco-Pts & +5kg Recycling credited! Total: ${updatedPoints} Pts.`,
      time: 'Just now',
      read: false
    };

    if (newReport.severity === 'EMERGENCY' || newReport.category === 'HAZARD') {
      const adminEmergencyNotif = {
        id: Date.now() + 1,
        type: 'HAZARD',
        title: `🚨 EMERGENCY HAZARD DISPATCHED: #${newReport.id}`,
        message: `⚡ Citizen "${newReport.citizenName}" reported an EMERGENCY HAZARD at "${newReport.address}". Live GPS: Lat ${newReport.latitude || 28.6139}, Lng ${newReport.longitude || 77.2090}. Immediate HazMat response required.`,
        time: 'Just now',
        read: false,
        complaintId: newReport.id,
        imageUrl: newReport.imageUrl,
        address: newReport.address,
        latitude: newReport.latitude || 28.6139,
        longitude: newReport.longitude || 77.2090,
        citizenName: newReport.citizenName,
        isEmergency: true
      };
      setNotifications(prev => [adminEmergencyNotif, citizenNotif, ...prev]);
    } else {
      setNotifications(prev => [citizenNotif, ...prev]);
    }

    // Post to Spring Boot Backend if online
    if (!isOffline) {
      api.createComplaint(newReport);
      api.updateUserPoints(user.id, pointsAdded);
    }
  };

  const handleUpdateComplaintStatus = (id, newStatus, resolutionUrl, collectorNotes) => {
    let complaintTitle = `Complaint #${id}`;

    setComplaints(prev =>
      prev.map(c => {
        if (c.id === id) {
          if (c.title) complaintTitle = c.title;
          return {
            ...c,
            status: newStatus,
            resolvedAt: newStatus === 'RESOLVED' ? new Date().toISOString() : c.resolvedAt,
            resolutionImageUrl: resolutionUrl || c.resolutionImageUrl,
            collectorNotes: collectorNotes || c.collectorNotes
          };
        }
        return c;
      })
    );

    // Create live notification for Citizen & Collector Notification Bell
    let notifTitle = `⚡ Progress Update: #${id}`;
    let notifMessage = `Status changed to ${newStatus}`;
    let notifType = 'INFO';

    if (newStatus === 'ASSIGNED') {
      notifTitle = `🚚 Squad Assigned: #${id}`;
      notifMessage = `Sanitation squad assigned to "${complaintTitle}". Collector is en route.`;
    } else if (newStatus === 'IN_PROGRESS') {
      notifTitle = `🧹 Cleanup In Progress: #${id}`;
      notifMessage = `Sanitation crew is actively clearing waste for "${complaintTitle}".`;
    } else if (newStatus === 'RESOLVED') {
      notifTitle = `🎉 Report #${id} RESOLVED!`;
      notifMessage = `Waste at "${complaintTitle}" has been fully cleared with photo evidence uploaded!`;
      notifType = 'RESOLVED';
    }

    const newNotif = {
      id: Date.now(),
      type: notifType,
      title: notifTitle,
      message: notifMessage,
      time: 'Just now',
      read: false
    };

    setNotifications(prev => [newNotif, ...prev]);

    // Sync status with Spring Boot Backend if online
    if (!isOffline) {
      api.updateComplaintStatus(id, newStatus, resolutionUrl, collectorNotes);
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

  const roleTabs = user?.role === 'ADMIN' ? adminTabs : user?.role === 'COLLECTOR' ? collectorTabs : citizenTabs;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Header Navigation */}
      <Navbar
        user={user || { name: 'Guest', role: 'CITIZEN', ecoPoints: 0 }}
        setUser={setUser}
        isOffline={isOffline}
        setIsOffline={setIsOffline}
        notifications={notifications}
        setNotifications={setNotifications}
        onOpenAuth={handleLogout}
        onOpenProfile={() => setShowProfileModal(true)}
        onRequireRoleAuth={(targetRole) => setAuthRoleModalTarget(targetRole)}
        onOpenFeedback={() => setShowFeedbackModal(true)}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      {/* Role-Specific Filtered Tab Navigation Bar */}
      <div className="glass-panel border-b border-slate-800 sticky top-[65px] z-40 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-2 py-1">
          {roleTabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;

            let activeColorClass = 'from-emerald-500 to-teal-500 text-slate-950 shadow-emerald-500/20';
            if (user?.role === 'COLLECTOR') activeColorClass = 'from-amber-500 to-orange-500 text-slate-950 shadow-amber-500/20';
            if (user?.role === 'ADMIN') activeColorClass = 'from-cyan-500 to-blue-600 text-white shadow-cyan-500/20';

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
        {user?.status === 'BLOCKED' && (
          <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/80 text-rose-200 text-xs flex items-center justify-between shadow-xl animate-pulse">
            <div className="flex items-center gap-3">
              <UserX className="w-6 h-6 text-rose-400 shrink-0" />
              <div>
                <p className="font-bold text-sm">🚫 Account Blocked by Municipal Admin</p>
                <p className="text-rose-300 mt-0.5">
                  Reason: {user?.blockReason || 'Violating website policies or submitting fake hazard reports.'}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase bg-rose-500/30 px-3 py-1 rounded-full text-rose-300 border border-rose-500/50">
              Restricted Mode
            </span>
          </div>
        )}

        {/* Admin Live Emergency Hazard Dispatch Banner */}
        {user?.role === 'ADMIN' && notifications.some(n => n.type === 'HAZARD' && !n.read) && (() => {
          const activeNotif = notifications.find(n => n.type === 'HAZARD' && !n.read);
          const lat = activeNotif?.latitude || 28.6139;
          const lng = activeNotif?.longitude || 77.2090;
          return (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 border-2 border-rose-500 text-rose-100 text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl shadow-rose-600/30 animate-pulse">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-400 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <p className="font-extrabold text-sm text-rose-200 uppercase tracking-wider flex items-center gap-2">
                    <span>🚨 HIGH-PRIORITY EMERGENCY HAZARD REPORTED!</span>
                  </p>
                  <p className="text-slate-200 text-xs font-semibold">
                    {activeNotif?.message}
                  </p>
                  
                  {/* Location & Google Maps Geotag Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="bg-rose-500/20 px-2.5 py-1 rounded-xl border border-rose-500/40 text-rose-300 font-bold text-[11px] flex items-center gap-1">
                      📍 Incident Location: {activeNotif?.address || 'Sector 14 Area'}
                    </span>
                    <span className="bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-700 text-cyan-300 font-mono text-[11px]">
                      GPS: Lat {lat}, Lng {lng}
                    </span>
                    <a
                      href={`https://www.google.com/maps?q=${lat},${lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] flex items-center gap-1 shadow-md transition-all"
                    >
                      🗺️ Open Live GPS on Google Maps
                    </a>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setActiveTab('TRACKING');
                  setNotifications(prev => prev.map(n => n.type === 'HAZARD' ? { ...n, read: true } : n));
                }}
                className="px-4 py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-black text-xs uppercase tracking-wide flex items-center gap-1.5 shadow-lg shrink-0 transition-all cursor-pointer"
              >
                <span>⚡ View Location & Dispatch Squad</span>
              </button>
            </div>
          );
        })()}

        {/* Active Logged In Persona Header Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Active Session Persona:</span>
            {(!user?.role || user?.role === 'CITIZEN') && (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <UserCheck className="w-4 h-4" /> Citizen Portal ({user?.name || 'Citizen'} • {user?.locality || 'Sector 14'})
              </span>
            )}
            {user?.role === 'COLLECTOR' && (
              <span className="text-amber-400 font-bold flex items-center gap-1.5">
                <Truck className="w-4 h-4" /> Collector Duty Portal ({user?.name} • {user?.vehicleId || 'FLEET-TRUCK-04'})
              </span>
            )}
            {user?.role === 'ADMIN' && (
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Municipal Authority Control ({user?.name} • {user?.departmentId || 'MUN-DEPT-882'})
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
          <ReportWasteTab onSubmitComplaint={handleAddComplaint} isOffline={isOffline} user={user} />
        )}

        {activeTab === 'TRACKING' && (
          <ComplaintTrackingTab
            complaints={complaints}
            onUpdateStatus={handleUpdateComplaintStatus}
            userRole={user.role}
            user={user}
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

      {/* Feedback Security Auth Modal */}
      {showFeedbackModal && (
        <FeedbackModal
          isOpen={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
          user={user}
          adminEmail={usersList.find(u => u.role === 'ADMIN')?.email || 'shlokmishra576@gmail.com'}
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
