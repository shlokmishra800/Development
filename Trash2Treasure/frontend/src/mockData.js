export const INITIAL_USER = {
  id: "usr-101",
  name: "Aarav Sharma",
  email: "citizen@t2t.org",
  role: "CITIZEN", // CITIZEN, COLLECTOR, ADMIN
  status: "ACTIVE", // ACTIVE, BLOCKED
  ecoPoints: 480,
  monthlyTargetKg: 50.0,
  recycledThisMonthKg: 38.5,
  badges: ["Eco Champion", "Zero Waste Novice", "Community Pillar"],
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  locality: "Sector 14, Block B"
};

export const INITIAL_USERS_LIST = [
  {
    id: "usr-101",
    name: "Aarav Sharma",
    email: "citizen@t2t.org",
    role: "CITIZEN",
    status: "ACTIVE",
    locality: "Sector 14, Block B",
    reportsCount: 5,
    warnings: 0,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "usr-102",
    name: "Priya Patel",
    email: "priya@t2t.org",
    role: "CITIZEN",
    status: "ACTIVE",
    locality: "Sector 9 Market",
    reportsCount: 3,
    warnings: 0,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "usr-103",
    name: "Vikram Malhotra (Spammer)",
    email: "vikram_fake@t2t.org",
    role: "CITIZEN",
    status: "BLOCKED",
    locality: "Commercial Area",
    reportsCount: 12,
    warnings: 3,
    blockReason: "Repeatedly posting fake emergency hazard reports.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "col-201",
    name: "Officer Rajesh K.",
    email: "collector@t2t.org",
    role: "COLLECTOR",
    status: "ACTIVE",
    vehicleId: "FLEET-TRUCK-04",
    phone: "+91 98765-43210",
    completedPickups: 42,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "col-202",
    name: "HazMat Squad One",
    email: "hazmat@t2t.org",
    role: "COLLECTOR",
    status: "ACTIVE",
    vehicleId: "HAZMAT-UNIT-01",
    phone: "+91 99999-00112",
    completedPickups: 18,
    avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_COMPLAINTS = [
  {
    id: "T2T-8921",
    citizenName: "Priya Patel",
    title: "Illegal E-Waste Spill Near City Park",
    category: "E_WASTE",
    severity: "HIGH",
    description: "Discarded computer monitors and battery components near children's playground.",
    address: "Central Park West Gate, Sector 14",
    latitude: 28.6139,
    longitude: 77.2090,
    status: "IN_PROGRESS", // SUBMITTED, ASSIGNED, IN_PROGRESS, RESOLVED
    createdAt: "2026-09-29T14:30:00Z",
    collectorName: "Green Squad - Rajesh K.",
    collectorPhone: "+91 98765-43210",
    eta: "25 mins",
    imageUrl: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=600&auto=format&fit=crop&q=80",
    resolutionImageUrl: null
  },
  {
    id: "T2T-8922",
    citizenName: "Aarav Sharma",
    title: "Overflowing Plastic & Paper Bin",
    category: "RECYCLABLE",
    severity: "MEDIUM",
    description: "Recycling bin #402 is full and plastics are spilling onto sidewalk.",
    address: "Market Road, Block B, Near Metro Station",
    latitude: 28.6210,
    longitude: 77.2150,
    status: "RESOLVED",
    createdAt: "2026-09-28T09:15:00Z",
    resolvedAt: "2026-09-28T11:40:00Z",
    collectorName: "Officer Rajesh K.",
    collectorPhone: "+91 98111-22334",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80",
    resolutionImageUrl: "https://images.unsplash.com/photo-1604186837056-8e7c286756f2?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "T2T-8923",
    citizenName: "Vikram Malhotra",
    title: "EMERGENCY: Chemical Container Leak",
    category: "HAZARD",
    severity: "EMERGENCY",
    description: "Leaking paint and unknown liquid drums behind commercial complex.",
    address: "Industrial Area Phase 2, Gate 4",
    latitude: 28.6050,
    longitude: 77.1980,
    status: "ASSIGNED",
    createdAt: "2026-09-30T08:20:00Z",
    collectorName: "HazMat Squad One",
    collectorPhone: "+91 99999-00112",
    eta: "10 mins",
    imageUrl: "https://images.unsplash.com/photo-1611284446314-60a55ac0d49d?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "T2T-8924",
    citizenName: "Sunita Roy",
    title: "Wet Organic Waste Accumulation",
    category: "ORGANIC",
    severity: "LOW",
    description: "Vegetable market food scraps piled up near compost station.",
    address: "Fresh Market, Sector 9",
    latitude: 28.6280,
    longitude: 77.2210,
    status: "SUBMITTED",
    createdAt: "2026-09-30T10:10:00Z",
    collectorName: "Unassigned",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80"
  }
];

export const SMART_BINS = [
  {
    id: "BIN-101",
    name: "Yashoda Nagar Main Market Smart Bin",
    binType: "RECYCLABLE",
    fillPercentage: 88,
    isAvailable: true,
    latitude: 26.4503,
    longitude: 80.3176,
    address: "Yashoda Nagar Main Market Road, Kanpur",
    lastEmptied: "4 hours ago"
  },
  {
    id: "BIN-102",
    name: "Kidwai Nagar By-Pass Smart Bin",
    binType: "ORGANIC",
    fillPercentage: 42,
    isAvailable: true,
    latitude: 26.4420,
    longitude: 80.3250,
    address: "Kidwai Nagar By-Pass Junction, Kanpur",
    lastEmptied: "1 hour ago"
  },
  {
    id: "BIN-103",
    name: "Barra Bypass E-Waste Drop Box",
    binType: "E_WASTE",
    fillPercentage: 95,
    isAvailable: false, // FULL!
    latitude: 26.4380,
    longitude: 80.3050,
    address: "Barra Bypass Gate 2, Kanpur",
    lastEmptied: "Yesterday"
  },
  {
    id: "BIN-104",
    name: "Yashoda Nagar Sector A Hazard Safe Bin",
    binType: "HAZARD",
    fillPercentage: 25,
    isAvailable: true,
    latitude: 26.4540,
    longitude: 80.3120,
    address: "Yashoda Nagar Block A Park, Kanpur",
    lastEmptied: "2 hours ago"
  }
];

export const REWARDS_STORE = [
  {
    id: "RWD-01",
    partnerName: "Green Beans Organic Cafe",
    title: "50% Off Organic Coffee & Pastry",
    category: "CAFE",
    ecoPointsCost: 150,
    discountPercent: 50,
    code: "ECOBEANS50",
    description: "Enjoy a hand-crafted eco-friendly brew made with 100% fair trade beans.",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "RWD-02",
    partnerName: "EarthFirst Grocery Store",
    title: "₹250 Voucher on Plastic-Free Shopping",
    category: "GROCERY",
    ecoPointsCost: 250,
    discountPercent: 30,
    code: "EARTHFREE250",
    description: "Valid on bulk zero-waste grains, spices, and refillable detergent.",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "RWD-03",
    partnerName: "EcoRide E-Bikes",
    title: "Free 1-Hour Electric Bicycle Rental",
    category: "TRANSPORT",
    ecoPointsCost: 200,
    discountPercent: 100,
    code: "GREENRIDE100",
    description: "Explore your city with zero carbon emissions.",
    imageUrl: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "RWD-04",
    partnerName: "ZeroWaste Goods Co.",
    title: "Free Stainless Steel Straw Kit",
    category: "SHOPPING",
    ecoPointsCost: 100,
    discountPercent: 100,
    code: "STEELSTRAW",
    description: "Re-usable travel straw with cleaning brush & hemp pouch.",
    imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80"
  }
];

export const LEADERBOARD = [
  { rank: 1, name: "Ananya Subramaniam", locality: "Sector 14", points: 1420, kgRecycled: 124.5, badge: "👑 Eco Empress" },
  { rank: 2, name: "Rajesh Malhotra", locality: "Block B", points: 1180, kgRecycled: 98.2, badge: "⭐ Waste Warrior" },
  { rank: 3, name: "Aarav Sharma (You)", locality: "Sector 14", points: 480, kgRecycled: 38.5, badge: "🌱 Green Champion" },
  { rank: 4, name: "Meera Sen", locality: "Market Road", points: 410, kgRecycled: 32.0, badge: "♻️ Recycler" },
  { rank: 5, name: "Karan Mehta", locality: "Cyber City", points: 390, kgRecycled: 31.4, badge: "♻️ Recycler" }
];

export const IMPACT_METRICS = {
  co2SavedKg: 148.5,
  waterSavedLiters: 1250,
  energySavedKwh: 340,
  treesEquivalent: 7,
  monthlyTrend: [
    { month: "May", wasteKg: 12, co2Kg: 36, points: 120 },
    { month: "Jun", wasteKg: 18, co2Kg: 54, points: 180 },
    { month: "Jul", wasteKg: 25, co2Kg: 75, points: 250 },
    { month: "Aug", wasteKg: 32, co2Kg: 96, points: 320 },
    { month: "Sep", wasteKg: 38.5, co2Kg: 115.5, points: 480 }
  ]
};

export const AI_SUGGESTIONS = [
  {
    name: "Plastic Water Bottle",
    category: "RECYCLABLE",
    binType: "Yellow Recycling Bin",
    ecoPoints: 15,
    tip: "Rinse bottle and flatten to save bin space.",
    imageUrl: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&auto=format&fit=crop&q=80"
  },
  {
    name: "Old Laptop Battery",
    category: "E_WASTE",
    binType: "Blue E-Waste Smart Bin",
    ecoPoints: 50,
    tip: "Keep terminals taped to prevent short circuits.",
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&auto=format&fit=crop&q=80"
  },
  {
    name: "Banana Peels & Kitchen Waste",
    category: "ORGANIC",
    binType: "Green Compost Bin",
    ecoPoints: 10,
    tip: "Great for community garden vermicomposting!",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80"
  }
];

export const MARKETPLACE_ITEMS = [
  { id: "MKT-1", material: "Clean Cardboard & Paper", rate: "₹15 / kg", minQty: "5 kg", icon: "📦" },
  { id: "MKT-2", material: "PET Plastic Bottles", rate: "₹30 / kg", minQty: "3 kg", icon: "🍾" },
  { id: "MKT-3", material: "Aluminum Cans & Scrap", rate: "₹115 / kg", minQty: "2 kg", icon: "🥫" },
  { id: "MKT-4", material: "Old E-Waste & Motherboards", rate: "₹310 / kg", minQty: "1 unit", icon: "💻" }
];

export const DOORSTEP_PICKUP_REQUESTS = [
  {
    id: "REQ-901",
    citizenName: "Aarav Sharma",
    material: "PET Plastic Bottles",
    quantityKg: 12,
    payout: "₹350",
    ecoPoints: 120,
    address: "Sector 14, Block B, House 42",
    status: "PENDING", // PENDING, EVALUATING, PICKED_UP, REJECTED
    createdAt: "2026-09-30T09:30:00Z"
  },
  {
    id: "REQ-902",
    citizenName: "Priya Patel",
    material: "Old E-Waste & Motherboards",
    quantityKg: 4,
    payout: "₹1,250",
    ecoPoints: 200,
    address: "Sector 9 Market, Store #12",
    status: "EVALUATING",
    createdAt: "2026-09-30T11:00:00Z"
  }
];
