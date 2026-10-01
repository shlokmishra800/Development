// Centralized REST API Service for Trash2Treasure (T2T)
// Connects React Frontend to Spring Boot Backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Helper for safe fetch calls with automatic backend fallback
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      if (data && data.message) {
        return { error: true, message: data.message };
      }
      return { error: true, message: `HTTP Error ${response.status}: ${response.statusText}` };
    }

    return data;
  } catch (error) {
    console.warn(`[API Fallback] Backend call failed for ${endpoint}:`, error.message);
    return null;
  }
}

// 1. User & Authentication APIs
export const fetchUsers = async () => apiRequest('/users');
export const fetchUserById = async (id) => apiRequest(`/users/${id}`);
export const loginUser = async (email, password) => apiRequest('/users/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password }),
});
export const registerUser = async (userData) => apiRequest('/users/register', {
  method: 'POST',
  body: JSON.stringify(userData),
});
export const updateUserProfile = async (id, updatedData) => apiRequest(`/users/${id}`, {
  method: 'PUT',
  body: JSON.stringify(updatedData),
});
export const updateUserPoints = async (id, pointsDelta) => apiRequest(`/users/${id}/points`, {
  method: 'PUT',
  body: JSON.stringify({ pointsDelta }),
});

// 2. Smart Bins & Telemetry APIs
export const fetchSmartBins = async () => apiRequest('/bins');
export const updateBinCapacity = async (id, fillPercentage) => apiRequest(`/bins/${id}/capacity`, {
  method: 'PUT',
  body: JSON.stringify({ fillPercentage }),
});

// 3. Waste Complaints & Cleanup APIs
export const fetchComplaints = async () => apiRequest('/complaints');
export const fetchUserComplaints = async (userId) => apiRequest(`/complaints/user/${userId}`);
export const createComplaint = async (complaintData) => apiRequest('/complaints', {
  method: 'POST',
  body: JSON.stringify(complaintData),
});
export const updateComplaintStatus = async (id, status, resolutionImageUrl, collectorNotes) => apiRequest(`/complaints/${id}/status`, {
  method: 'PUT',
  body: JSON.stringify({ status, resolutionImageUrl, collectorNotes }),
});

// 4. Eco Rewards Store APIs
export const fetchRewards = async () => apiRequest('/rewards');
export const createReward = async (rewardData) => apiRequest('/rewards', {
  method: 'POST',
  body: JSON.stringify(rewardData),
});

// 5. City Analytics Summary API
export const fetchAnalyticsSummary = async () => apiRequest('/analytics/summary');

// 6. User Feedback APIs (Saved to MongoDB Atlas)
export const submitFeedback = async (feedbackData) => apiRequest('/feedbacks', {
  method: 'POST',
  body: JSON.stringify(feedbackData),
});
export const fetchFeedbacks = async () => apiRequest('/feedbacks');

