// TODO-FX: Replace with real API endpoint when backend ready

export const keyMetrics = [
  { title: "Active Auctions", value: 128 },
  { title: "Vehicles Listed", value: 4720 },
  { title: "Delivered Vehicles", value: 9081 },
  { title: "Partner Carriers", value: 86 }
];

// TODO-FX: Replace with real API call. Mock at least 15 cars for initial display.
export const topAuctions = [
  {
    id: 1,
    title: "2020 Honda Civic",
    lotId: "AA-2024-001",
    currentBid: 12500,
    startingBid: 11000,
    photos: [
      "https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2127732/pexels-photo-2127732.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    year: 2020,
    mileage: 45000,
    condition: "Excellent",
    bodyType: "Sedan",
    location: "Los Angeles, CA",
    timeLeft: "2h 15m",
    bids: 23
  },
  {
    id: 2,
    title: "2019 Toyota Camry",
    lotId: "AA-2024-002",
    currentBid: 15800,
    startingBid: 14500,
    photos: [
      "https://images.pexels.com/photos/2127734/pexels-photo-2127734.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2127735/pexels-photo-2127735.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    year: 2019,
    mileage: 32000,
    condition: "Very Good",
    bodyType: "Sedan",
    location: "Dallas, TX",
    timeLeft: "4h 30m",
    bids: 18
  },
  {
    id: 3,
    title: "2021 Ford F-150",
    lotId: "AA-2024-003",
    currentBid: 28500,
    startingBid: 27000,
    photos: [
      "https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2127732/pexels-photo-2127732.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    year: 2021,
    mileage: 28000,
    condition: "Good",
    bodyType: "Truck",
    location: "Phoenix, AZ",
    timeLeft: "6h 45m",
    bids: 31
  },
  {
    id: 4,
    title: "2018 BMW X3",
    lotId: "AA-2024-004",
    currentBid: 22500,
    startingBid: 21000,
    photos: [
      "https://images.pexels.com/photos/2127734/pexels-photo-2127734.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2127735/pexels-photo-2127735.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    year: 2018,
    mileage: 55000,
    condition: "Good",
    bodyType: "SUV",
    location: "Seattle, WA",
    timeLeft: "1h 20m",
    bids: 15
  },
  {
    id: 5,
    title: "2022 Tesla Model 3",
    lotId: "AA-2024-005",
    currentBid: 42500,
    startingBid: 41000,
    photos: [
      "https://images.pexels.com/photos/1719650/pexels-photo-1719650.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2127736/pexels-photo-2127736.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    year: 2022,
    mileage: 15000,
    condition: "Excellent",
    bodyType: "Sedan",
    location: "San Francisco, CA",
    timeLeft: "8h 12m",
    bids: 42
  },
  {
    id: 6,
    title: "2017 Mercedes-Benz C-Class",
    lotId: "AA-2024-006",
    currentBid: 19800,
    startingBid: 18500,
    photos: [
      "https://images.pexels.com/photos/2127736/pexels-photo-2127736.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1719651/pexels-photo-1719651.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2127735/pexels-photo-2127735.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    year: 2017,
    mileage: 68000,
    condition: "Good",
    bodyType: "Sedan",
    location: "Miami, FL",
    timeLeft: "12h 30m",
    bids: 27
  },
  {
    id: 7,
    title: "2020 Chevrolet Silverado",
    lotId: "AA-2024-007",
    currentBid: 33500,
    startingBid: 32000,
    photos: [
      "https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2127734/pexels-photo-2127734.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    year: 2020,
    mileage: 35000,
    condition: "Very Good",
    bodyType: "Truck",
    location: "Denver, CO",
    timeLeft: "1d 2h",
    bids: 19
  },
  {
    id: 8,
    title: "2019 Jeep Grand Cherokee",
    lotId: "AA-2024-008",
    currentBid: 26500,
    startingBid: 25000,
    photos: [
      "https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2127732/pexels-photo-2127732.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1719650/pexels-photo-1719650.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    year: 2019,
    mileage: 42000,
    condition: "Excellent",
    bodyType: "SUV",
    location: "Atlanta, GA",
    timeLeft: "3h 45m",
    bids: 33
  },
  {
    id: 9,
    title: "2021 Nissan Rogue",
    lotId: "AA-2024-009",
    currentBid: 22800,
    startingBid: 21500,
    photos: [
      "https://images.pexels.com/photos/1719651/pexels-photo-1719651.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2127736/pexels-photo-2127736.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2127735/pexels-photo-2127735.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    year: 2021,
    mileage: 28000,
    condition: "Very Good",
    bodyType: "SUV",
    location: "Portland, OR",
    timeLeft: "5h 20m",
    bids: 21
  },
  {
    id: 10,
    title: "2018 Audi Q5",
    lotId: "AA-2024-010",
    currentBid: 31200,
    startingBid: 29500,
    photos: [
      "https://images.pexels.com/photos/2127734/pexels-photo-2127734.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1719650/pexels-photo-1719650.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    year: 2018,
    mileage: 52000,
    condition: "Good",
    bodyType: "SUV",
    location: "Boston, MA",
    timeLeft: "7h 10m",
    bids: 38
  },
  {
    id: 11,
    title: "2022 Hyundai Tucson",
    lotId: "AA-2024-011",
    currentBid: 24800,
    startingBid: 23500,
    photos: [
      "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2127732/pexels-photo-2127732.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    year: 2022,
    mileage: 18000,
    condition: "Excellent",
    bodyType: "SUV",
    location: "Nashville, TN",
    timeLeft: "9h 55m",
    bids: 16
  },
  {
    id: 12,
    title: "2019 Volkswagen Golf",
    lotId: "AA-2024-012",
    currentBid: 17500,
    startingBid: 16200,
    photos: [
      "https://images.pexels.com/photos/2127735/pexels-photo-2127735.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2127736/pexels-photo-2127736.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1719651/pexels-photo-1719651.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    year: 2019,
    mileage: 38000,
    condition: "Very Good",
    bodyType: "Hatchback",
    location: "Austin, TX",
    timeLeft: "11h 40m",
    bids: 24
  },
  {
    id: 13,
    title: "2020 Subaru Outback",
    lotId: "AA-2024-013",
    currentBid: 26800,
    startingBid: 25500,
    photos: [
      "https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2127734/pexels-photo-2127734.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1719650/pexels-photo-1719650.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    year: 2020,
    mileage: 29000,
    condition: "Excellent",
    bodyType: "Wagon",
    location: "Salt Lake City, UT",
    timeLeft: "14h 25m",
    bids: 29
  },
  {
    id: 14,
    title: "2017 Lexus RX",
    lotId: "AA-2024-014",
    currentBid: 29500,
    startingBid: 28000,
    photos: [
      "https://images.pexels.com/photos/2127736/pexels-photo-2127736.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2127732/pexels-photo-2127732.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    year: 2017,
    mileage: 61000,
    condition: "Good",
    bodyType: "SUV",
    location: "Raleigh, NC",
    timeLeft: "16h 15m",
    bids: 22
  },
  {
    id: 15,
    title: "2021 Mazda CX-5",
    lotId: "AA-2024-015",
    currentBid: 25900,
    startingBid: 24500,
    photos: [
      "https://images.pexels.com/photos/1719651/pexels-photo-1719651.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2127735/pexels-photo-2127735.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    year: 2021,
    mileage: 25000,
    condition: "Very Good",
    bodyType: "SUV",
    location: "Minneapolis, MN",
    timeLeft: "18h 5m",
    bids: 31
  },
  {
    id: 16,
    title: "2019 GMC Yukon",
    lotId: "AA-2024-016",
    currentBid: 37800,
    startingBid: 36500,
    photos: [
      "https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2127734/pexels-photo-2127734.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1719650/pexels-photo-1719650.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    year: 2019,
    mileage: 45000,
    condition: "Good",
    bodyType: "SUV",
    location: "Las Vegas, NV",
    timeLeft: "20h 30m",
    bids: 35
  }
];

export const aiRecommendations = [
  {
    id: 1,
    title: "2022 Tesla Model 3",
    price: 45000,
    image: "https://images.pexels.com/photos/1719650/pexels-photo-1719650.jpeg?auto=compress&cs=tinysrgb&w=400",
    year: 2022,
    mileage: 12000,
    location: "San Francisco, CA",
    matchScore: 95
  },
  {
    id: 2,
    title: "2021 Mercedes-Benz C-Class",
    price: 38500,
    image: "https://images.pexels.com/photos/2127736/pexels-photo-2127736.jpeg?auto=compress&cs=tinysrgb&w=400",
    year: 2021,
    mileage: 25000,
    location: "Chicago, IL",
    matchScore: 88
  },
  {
    id: 3,
    title: "2020 Lexus RX",
    price: 42500,
    image: "https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400",
    year: 2020,
    mileage: 18000,
    location: "Miami, FL",
    matchScore: 82
  }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/logistics/routes/active
// Expected Data: Array of active logistics routes with real-time data
export const activeLogisticsRoutes = [
  {
    id: "C-781",
    title: "Container C-781",
    subtitle: "Miami → Poti",
    progress: 60,
    eta: "Oct 21, 2025",
    status: "In Transit",
    statusColor: "blue",
    details: {
      vessel: "MSC Aurora",
      lastUpdate: "2h ago",
      location: "Mid-Atlantic Ocean",
      coords: [20.0, -40.0],
      icon: "ship"
    }
  },
  {
    id: "C-905",
    title: "Container C-905",
    subtitle: "New York → Rotterdam",
    progress: 45,
    eta: "Oct 25, 2025",
    status: "In Transit",
    statusColor: "indigo",
    details: {
      vessel: "Ever Glory",
      lastUpdate: "1h ago",
      location: "North Atlantic",
      coords: [-40.0, 45.0],
      icon: "ship"
    }
  }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/logistics/routes/map-data
// Expected Data: Map configuration with routes and interactive elements
export const activeLogisticsRoutesMap = {
  center: [31.0, -25.0],
  zoom: 3,
  theme: "light",
  routes: [
    {
      id: "route-miami-poti",
      from: {
        city: "Miami, USA",
        coords: [25.7617, -80.1918]
      },
      to: {
        city: "Poti, Georgia",
        coords: [42.1500, 41.6670]
      },
      path: {
        style: {
          color: "#2563eb",
          width: 4,
          animated: true
        },
        coordinates: [
          [25.7617, -80.1918], // Miami, USA
          [20.0, -50.0],       // Atlantic Ocean start
          [15.0, -40.0],       // Mid-Atlantic
          [10.0, -30.0],       // Approaching Africa
          [5.0, -20.0],        // Near Equator
          [0.0, -10.0],        // Atlantic crossing
          [10.0, 0.0],         // Approaching Europe
          [20.0, 10.0],        // Mediterranean approach
          [30.0, 20.0],        // Eastern Mediterranean
          [35.0, 25.0],        // Near Turkey
          [40.0, 30.0],        // Black Sea approach
          [42.1500, 41.6670]   // Poti, Georgia
        ]
      },
      containers: [
        {
          id: "C-781",
          status: "In Transit",
          eta: "2025-10-21",
          progress: 60,
          current_coords: [20.0, -40.0]
        }
      ]
    },
    {
      id: "route-nyc-rotterdam",
      from: {
        city: "New York, USA",
        coords: [40.7128, -74.0060]
      },
      to: {
        city: "Rotterdam, Netherlands",
        coords: [51.9225, 4.4792]
      },
      path: {
        style: {
          color: "#7c3aed",
          width: 4,
          animated: true
        },
        coordinates: [
          [40.7128, -74.0060], // New York, USA
          [45.0, -50.0],       // North Atlantic start
          [50.0, -30.0],       // Mid-Atlantic
          [45.0, -20.0],       // Approaching Europe
          [40.0, -15.0],       // Near UK
          [35.0, -10.0],       // English Channel approach
          [45.0, 0.0],         // North Sea
          [50.0, 2.0],         // Near Belgium
          [51.9225, 4.4792]    // Rotterdam, Netherlands
        ]
      },
      containers: [
        {
          id: "C-905",
          status: "In Transit",
          eta: "2025-10-25",
          progress: 45,
          current_coords: [-40.0, 45.0]
        }
      ]
    }
  ],
  ui_style: {
    colors: {
      route: "#2563eb",
      container_icon: "#1e40af",
      progress_bar: "#22c55e"
    },
    font: "Inter",
    animation: "ease-in-out"
  }
};

// Route demo data for map visualization
export const routeDemo = {
  origin: { city: "Los Angeles", country: "USA", coords: [-118.2437, 34.0522] },
  destination: { city: "Poti", country: "Georgia", coords: [41.6796, 42.1508] },
  path: {
    style: { color: "#2563eb", width: 4, animated: true },
    coordinates: [
      [-118.2437, 34.0522], // Los Angeles
      [-120.0, 35.0],       // Pacific Ocean start
      [-90.0, 30.0],        // Gulf of Mexico
      [-50.0, 35.0],        // Atlantic Ocean
      [-10.0, 40.0],        // Near Portugal
      [10.0, 42.0],         // Mediterranean Sea
      [41.6796, 42.1508]    // Poti, Georgia
    ]
  },
  vehicles: [
    {
      id: "C1",
      label: "Container #C1",
      coords: [-30.0, 38.0],
      eta: "4 days",
      status: "On Route",
      icon: "ship"
    },
    {
      id: "C2",
      label: "Container #C2",
      coords: [-10.5, 40.5],
      eta: "2 days",
      status: "Approaching Europe",
      icon: "ship"
    },
    {
      id: "C3",
      label: "Container #C3",
      coords: [20.2, 41.3],
      eta: "8 hours",
      status: "Near Georgia",
      icon: "truck"
    }
  ]
};

export const shipmentRoutes = [
  {
    id: 1,
    origin: "Los Angeles, CA",
    destination: "New York, NY",
    status: "In Transit",
    vehicleCount: 12,
    eta: "3 days"
  },
  {
    id: 2,
    origin: "Houston, TX",
    destination: "Vancouver, BC",
    status: "Loading",
    vehicleCount: 8,
    eta: "5 days"
  },
  {
    id: 3,
    origin: "Atlanta, GA",
    destination: "Toronto, ON",
    status: "Delivered",
    vehicleCount: 15,
    eta: "Completed"
  }
];

export const partners = [
  // Logistics & Shipping Companies
  { name: "Maersk", logo: "https://logos-world.net/wp-content/uploads/2020/11/Maersk-Logo.png", type: "logistics" },
  { name: "MSC", logo: "https://logos-world.net/wp-content/uploads/2020/11/Mediterranean-Shipping-Company-MSC-Logo.png", type: "logistics" },
  { name: "CMA CGM", logo: "https://logos-world.net/wp-content/uploads/2020/11/CMA-CGM-Logo.png", type: "logistics" },
  { name: "Hapag-Lloyd", logo: "https://logos-world.net/wp-content/uploads/2020/11/Hapag-Lloyd-Logo.png", type: "logistics" },
  { name: "Evergreen Marine", logo: "https://logos-world.net/wp-content/uploads/2020/11/Evergreen-Marine-Logo.png", type: "logistics" },
  { name: "COSCO", logo: "https://logos-world.net/wp-content/uploads/2020/11/China-Ocean-Shipping-Company-COSCO-Logo.png", type: "logistics" },
  { name: "DHL", logo: "https://logos-world.net/wp-content/uploads/2020/11/DHL-Logo.png", type: "logistics" },
  { name: "FedEx", logo: "https://logos-world.net/wp-content/uploads/2020/11/FedEx-Logo.png", type: "logistics" },
  { name: "UPS", logo: "https://logos-world.net/wp-content/uploads/2020/11/UPS-Logo.png", type: "logistics" },
  { name: "Kuehne+Nagel", logo: "https://logos-world.net/wp-content/uploads/2020/11/Kuehne-Nagel-Logo.png", type: "logistics" },
  { name: "DSV", logo: "https://logos-world.net/wp-content/uploads/2020/11/DSV-Logo.png", type: "logistics" },
  { name: "TNT", logo: "https://logos-world.net/wp-content/uploads/2020/11/TNT-Logo.png", type: "logistics" },

  // Insurance Companies
  { name: "Allianz", logo: "https://logos-world.net/wp-content/uploads/2020/12/Allianz-Logo.png", type: "insurance" },
  { name: "AIG", logo: "https://logos-world.net/wp-content/uploads/2020/12/AIG-Logo.png", type: "insurance" },
  { name: "Zurich Insurance", logo: "https://logos-world.net/wp-content/uploads/2020/12/Zurich-Insurance-Logo.png", type: "insurance" },
  { name: "AXA", logo: "https://logos-world.net/wp-content/uploads/2020/12/AXA-Logo.png", type: "insurance" },
  { name: "Munich Re", logo: "https://logos-world.net/wp-content/uploads/2020/12/Munich-Re-Logo.png", type: "insurance" },
  { name: "Swiss Re", logo: "https://logos-world.net/wp-content/uploads/2020/12/Swiss-Re-Logo.png", type: "insurance" },
  { name: "Lloyd's of London", logo: "https://logos-world.net/wp-content/uploads/2020/12/Lloyds-of-London-Logo.png", type: "insurance" },
  { name: "Chubb", logo: "https://logos-world.net/wp-content/uploads/2020/12/Chubb-Logo.png", type: "insurance" },
  { name: "Generali", logo: "https://logos-world.net/wp-content/uploads/2020/12/Generali-Logo.png", type: "insurance" },
  { name: "Berkshire Hathaway", logo: "https://logos-world.net/wp-content/uploads/2020/12/Berkshire-Hathaway-Logo.png", type: "insurance" }
];

export const navigation = [
  { key: "home", label: "Home", path: "/" },
  { key: "auctions", label: "Auctions", path: "/auctions" },
  { key: "logistics", label: "Logistics", path: "/logistics" },
  { key: "crm", label: "CRM", path: "/crm" },
  { key: "support", label: "Support", path: "/support" }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/footer/config
// Expected Data: Footer configuration with brand, navigation, resources, and contact sections
export const footerConfig = {
  brand: {
    title: "AutoMarketLogistic",
    tagline: "Smart Global Vehicle Trade & Logistics Platform",
    description: "Connecting global buyers, sellers, and transporters in one intelligent ecosystem.",
    logo: "/assets/logo-light.svg",
    socialLinks: [
      { icon: "twitter", url: "https://twitter.com/automarket", label: "Follow us on Twitter" },
      { icon: "linkedin", url: "https://linkedin.com/company/automarket", label: "Connect on LinkedIn" },
      { icon: "youtube", url: "https://youtube.com/@automarket", label: "Watch our videos" }
    ],
    schemaMarkup: {
      "@type": "Organization",
      "name": "AutoMarketLogistic",
      "url": "https://automarketlogistic.com",
      "sameAs": [
        "https://twitter.com/automarket",
        "https://linkedin.com/company/automarket"
      ]
    }
  },
  navigation: {
    title: "Platform",
    links: [
      { label: "Auctions", url: "/auctions" },
      { label: "Logistics", url: "/logistics" },
      { label: "CRM", url: "/crm" },
      { label: "AI Assistant", url: "/ai-agent" },
      { label: "About Us", url: "/about" }
    ],
    schemaMarkup: {
      "@type": "SiteNavigationElement",
      "name": "Platform Navigation"
    }
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Help Center", url: "/help" },
      { label: "Docs", url: "/docs" },
      { label: "Blog", url: "/blog" },
      { label: "Privacy Policy", url: "/privacy" },
      { label: "Terms of Service", url: "/terms" }
    ],
    richSnippet: {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How to track my shipment?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Log into your dashboard and open 'Active Logistics Routes' to view real-time tracking."
          }
        }
      ]
    }
  },
  contact: {
    title: "Contact",
    address: "100 SE 2nd St, Miami, FL 33131, USA",
    phone: "+1 (305) 555-1023",
    email: "support@automarketlogistic.com",
    hours: "Mon–Fri 9:00–18:00 GMT+4",
    cta: {
      label: "Get a Quote",
      url: "/contact",
      variant: "primary",
      icon: "mail"
    },
    schemaMarkup: {
      "@type": "LocalBusiness",
      "name": "AutoMarketLogistic",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "100 SE 2nd St",
        "addressLocality": "Miami",
        "addressRegion": "FL",
        "postalCode": "33131",
        "addressCountry": "US"
      },
      "telephone": "+13055551023"
    }
  },
  subfooter: {
    copyright: "© 2025 AutoMarketLogistic. All rights reserved.",
    links: [
      { label: "Sitemap", url: "/sitemap.xml" },
      { label: "Accessibility", url: "/accessibility" },
      { label: "Cookies", url: "/cookies" }
    ]
  }
};

export const footerLinks = [
  { label: "Terms of Service", path: "/terms" },
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Contact Us", path: "/contact" },
  { label: "About Us", path: "/about" }
];

// Mock car-specific notifications
export const getCarNotifications = (carId) => {
  const carNotifications = {
    'AA-2024-001': [
      {
        id: 'car-1-1',
        type: 'bid_update',
        title: 'New Bid Placed',
        message: 'A new bid of $12,800 was placed on your tracked vehicle',
        bidder: 'john_doe_123',
        newBid: 12800,
        timestamp: '2024-10-15T11:45:00Z',
        read: false
      },
      {
        id: 'car-1-2',
        type: 'price_alert',
        title: 'Price Alert',
        message: 'This vehicle is 15% below market value',
        marketValue: 14750,
        currentBid: 12500,
        timestamp: '2024-10-15T09:30:00Z',
        read: false
      },
      {
        id: 'car-1-3',
        type: 'auction_update',
        title: 'Auction Extended',
        message: 'Auction time extended by 30 minutes due to last-minute bids',
        extension: '30 minutes',
        timestamp: '2024-10-14T15:15:00Z',
        read: true
      }
    ],
    'AA-2024-002': [
      {
        id: 'car-2-1',
        type: 'bid_update',
        title: 'Outbid Notification',
        message: 'You have been outbid! Current highest bid is $15,800',
        newBid: 15800,
        timestamp: '2024-10-14T17:00:00Z',
        read: false
      },
      {
        id: 'car-2-2',
        type: 'similar_vehicle',
        title: 'Similar Vehicle Found',
        message: 'Similar 2019 Toyota Camry available in nearby location',
        similarLotId: 'AA-2024-025',
        location: 'Los Angeles, CA',
        timestamp: '2024-10-14T12:30:00Z',
        read: true
      }
    ],
    'AA-2024-003': [
      {
        id: 'car-3-1',
        type: 'auction_ending',
        title: 'Auction Ending Soon',
        message: 'Only 2 hours remaining! Current bid: $28,500',
        currentBid: 28500,
        timeLeft: '2 hours',
        timestamp: '2024-10-14T14:20:00Z',
        read: false
      },
      {
        id: 'car-3-2',
        type: 'watchlist_update',
        title: 'Watchlist Reminder',
        message: 'This vehicle is on your watchlist and ends soon',
        timestamp: '2024-10-14T10:00:00Z',
        read: true
      }
    ]
  };

  return carNotifications[carId] || [];
};

// TODO-FX: Mock data for featured auctions horizontal carousel
// TODO-FX: Mock data for featured auctions (carousel section) - Updated for AuctionCard2025
export const featuredAuctions = [
  {
    id: 'featured-1',
    title: 'BMW 3 Series 330i',
    currentBid: 22500,
    startingBid: 21000,
    timeLeft: '1h 45m',
    endTime: new Date(Date.now() + 1.75 * 60 * 60 * 1000).toISOString(), // 1h 45m from now
    year: 2018,
    mileage: 45000,
    location: 'Los Angeles, CA, USA',
    image: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400',
    photos: [
      'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/2127734/pexels-photo-2127734.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1719650/pexels-photo-1719650.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/2127735/pexels-photo-2127735.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    engine: '2.0L Turbo',
    transmission: 'Automatic',
    condition: 'Excellent',
    isLive: true,
    isHotDeal: false,
    transportReady: true,
    verifiedSeller: true,
    biddersCount: Math.floor(Math.random() * 60) + 8,
    recentBidders: [
      { name: 'John D.', avatar: '/slider/avatars/0450249b131eec36dc8333b7cf847bc4.webp' },
      { name: 'Sarah M.', avatar: '/slider/avatars/1a3318330cf1734feb84887e9453fb1b.webp' }
    ]
  },
  {
    id: 'featured-2',
    title: 'Mercedes-Benz C-Class C300',
    currentBid: 31200,
    startingBid: 29500,
    timeLeft: '3h 20m',
    endTime: new Date(Date.now() + 3.33 * 60 * 60 * 1000).toISOString(),
    year: 2020,
    mileage: 32000,
    location: 'Chicago, IL, USA',
    image: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=400',
    photos: [
      'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/2127734/pexels-photo-2127734.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1719650/pexels-photo-1719650.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/2127735/pexels-photo-2127735.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    engine: '2.0L Turbo',
    transmission: 'Automatic',
    condition: 'Very Good',
    isLive: true,
    isHotDeal: true,
    transportReady: false,
    verifiedSeller: true,
    biddersCount: Math.floor(Math.random() * 55) + 12,
    recentBidders: [
      { name: 'Mike R.', avatar: '/slider/avatars/27d73d5efa51661b5feb1e29cc389257.webp' },
      { name: 'Anna L.', avatar: '/slider/avatars/40687889cb61a06b242aafb9e02f5204.webp' }
    ]
  },
  {
    id: 'featured-3',
    title: 'Audi A4 Premium Plus',
    currentBid: 26800,
    startingBid: 25000,
    timeLeft: '5h 10m',
    endTime: new Date(Date.now() + 5.17 * 60 * 60 * 1000).toISOString(),
    year: 2019,
    mileage: 28000,
    location: 'Miami, FL, USA',
    image: 'https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400',
    photos: [
      'https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/2127734/pexels-photo-2127734.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1719650/pexels-photo-1719650.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/2127735/pexels-photo-2127735.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    engine: '2.0L Turbo',
    transmission: 'Automatic',
    condition: 'Good',
    isLive: false,
    isHotDeal: false,
    transportReady: true,
    verifiedSeller: false,
    biddersCount: Math.floor(Math.random() * 40) + 5,
    recentBidders: [
      { name: 'Carlos M.', avatar: '/slider/avatars/622e4c7767d4eb0307179d6dfda9248b.webp' }
    ]
  },
  {
    id: 'featured-4',
    title: 'Lexus RX 350',
    currentBid: 35800,
    startingBid: 34000,
    timeLeft: '2h 30m',
    endTime: new Date(Date.now() + 2.5 * 60 * 60 * 1000).toISOString(),
    year: 2021,
    mileage: 25000,
    location: 'Seattle, WA, USA',
    image: 'https://images.pexels.com/photos/2127734/pexels-photo-2127734.jpeg?auto=compress&cs=tinysrgb&w=400',
    photos: [
      'https://images.pexels.com/photos/2127734/pexels-photo-2127734.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1719650/pexels-photo-1719650.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/2127735/pexels-photo-2127735.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    engine: '3.5L V6',
    transmission: 'Automatic',
    condition: 'Excellent',
    isLive: true,
    isHotDeal: true,
    transportReady: true,
    verifiedSeller: true,
    biddersCount: Math.floor(Math.random() * 70) + 15,
    recentBidders: [
      { name: 'David K.', avatar: '/slider/avatars/78529e2ec8eb4a2eb2fb961e04915b0a.webp' },
      { name: 'Lisa T.', avatar: '/slider/avatars/0450249b131eec36dc8333b7cf847bc4.webp' },
      { name: 'Tom W.', avatar: '/slider/avatars/1a3318330cf1734feb84887e9453fb1b.webp' }
    ]
  },
  {
    id: 'featured-5',
    title: 'Tesla Model 3 Long Range',
    currentBid: 42500,
    startingBid: 41000,
    timeLeft: '4h 15m',
    endTime: new Date(Date.now() + 4.25 * 60 * 60 * 1000).toISOString(),
    year: 2022,
    mileage: 15000,
    location: 'San Francisco, CA, USA',
    image: 'https://images.pexels.com/photos/1719650/pexels-photo-1719650.jpeg?auto=compress&cs=tinysrgb&w=400',
    photos: [
      'https://images.pexels.com/photos/1719650/pexels-photo-1719650.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/2127736/pexels-photo-2127736.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    engine: 'Electric',
    transmission: 'Single-Speed',
    condition: 'Excellent',
    isLive: true,
    isHotDeal: false,
    transportReady: true,
    verifiedSeller: true,
    biddersCount: Math.floor(Math.random() * 80) + 20,
    recentBidders: [
      { name: 'Emma R.', avatar: '/slider/avatars/27d73d5efa51661b5feb1e29cc389257.webp' },
      { name: 'James P.', avatar: '/slider/avatars/40687889cb61a06b242aafb9e02f5204.webp' },
      { name: 'Nina S.', avatar: '/slider/avatars/622e4c7767d4eb0307179d6dfda9248b.webp' }
    ]
  },
  {
    id: 'featured-6',
    title: 'Mercedes-Benz S-Class S500',
    currentBid: 29500,
    startingBid: 28000,
    timeLeft: '6h 45m',
    endTime: new Date(Date.now() + 6.75 * 60 * 60 * 1000).toISOString(),
    year: 2017,
    mileage: 55000,
    location: 'Dallas, TX, USA',
    image: 'https://images.pexels.com/photos/2127736/pexels-photo-2127736.jpeg?auto=compress&cs=tinysrgb&w=400',
    photos: [
      'https://images.pexels.com/photos/2127736/pexels-photo-2127736.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    engine: '3.0L V6 Turbo',
    transmission: 'Automatic',
    condition: 'Good',
    isLive: false,
    isHotDeal: false,
    transportReady: false,
    verifiedSeller: true,
    biddersCount: Math.floor(Math.random() * 45) + 10,
    recentBidders: [
      { name: 'Robert L.', avatar: '/slider/avatars/78529e2ec8eb4a2eb2fb961e04915b0a.webp' }
    ]
  }
];

// TODO-FX: Mock data for special offers (grid section)
export const specialOffers = [
  {
    id: 'special-1',
    title: 'Limited Time Deal',
    subtitle: 'Ends in 3 days',
    description: 'Exclusive limited-time offer for verified bidders. Premium vehicles at unbeatable prices.',
    image: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount: 'Up to 25% Off'
  },
  {
    id: 'special-2',
    title: 'Flash Sale',
    subtitle: 'Ends in 2 days',
    description: 'Lightning-fast deals on certified pre-owned luxury vehicles. Limited availability.',
    image: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount: 'Up to 30% Off'
  },
  {
    id: 'special-3',
    title: 'Seasonal Special',
    subtitle: 'Ends in 5 days',
    description: 'Take advantage of our seasonal promotions on SUVs and trucks. Perfect for family needs.',
    image: 'https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount: 'Up to 20% Off'
  }
];

// TODO-FX: Mock data for AI picks (masonry section) - Updated for AuctionCard2025
export const aiPicks = [
  {
    id: 'ai-1',
    title: 'Tesla Model 3 Performance',
    currentBid: 45000,
    startingBid: 43000,
    timeLeft: '8h 30m',
    endTime: new Date(Date.now() + 8.5 * 60 * 60 * 1000).toISOString(),
    year: 2022,
    mileage: 12000,
    location: 'San Francisco, CA, USA',
    photos: [
      'https://images.pexels.com/photos/1719650/pexels-photo-1719650.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/2127736/pexels-photo-2127736.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    image: 'https://images.pexels.com/photos/1719650/pexels-photo-1719650.jpeg?auto=compress&cs=tinysrgb&w=400',
    engine: 'Electric',
    transmission: 'Single-Speed',
    condition: 'Excellent',
    isLive: true,
    isHotDeal: true,
    transportReady: true,
    verifiedSeller: true,
    aiMatchScore: 95,
    biddersCount: 89,
    recentBidders: [
      { name: 'Alex C.', avatar: '/slider/avatars/0450249b131eec36dc8333b7cf847bc4.webp' },
      { name: 'Maria G.', avatar: '/slider/avatars/1a3318330cf1734feb84887e9453fb1b.webp' },
      { name: 'David L.', avatar: '/slider/avatars/27d73d5efa51661b5feb1e29cc389257.webp' }
    ]
  },
  {
    id: 'ai-2',
    title: 'Mercedes-Benz C-Class C300',
    currentBid: 38500,
    startingBid: 37500,
    timeLeft: '12h 45m',
    endTime: new Date(Date.now() + 12.75 * 60 * 60 * 1000).toISOString(),
    year: 2021,
    mileage: 25000,
    location: 'Chicago, IL, USA',
    photos: [
      'https://images.pexels.com/photos/2127736/pexels-photo-2127736.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    image: 'https://images.pexels.com/photos/2127736/pexels-photo-2127736.jpeg?auto=compress&cs=tinysrgb&w=400',
    engine: '2.0L Turbo',
    transmission: 'Automatic',
    condition: 'Very Good',
    isLive: false,
    isHotDeal: false,
    transportReady: true,
    verifiedSeller: true,
    aiMatchScore: 88,
    biddersCount: 45,
    recentBidders: [
      { name: 'Sarah K.', avatar: '/slider/avatars/40687889cb61a06b242aafb9e02f5204.webp' },
      { name: 'Mike T.', avatar: '/slider/avatars/622e4c7767d4eb0307179d6dfda9248b.webp' }
    ]
  },
  {
    id: 'ai-3',
    title: 'Lexus RX 350 F Sport',
    currentBid: 42500,
    startingBid: 41000,
    timeLeft: '6h 15m',
    endTime: new Date(Date.now() + 6.25 * 60 * 60 * 1000).toISOString(),
    year: 2020,
    mileage: 18000,
    location: 'Miami, FL, USA',
    photos: [
      'https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/2127734/pexels-photo-2127734.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    image: 'https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400',
    engine: '3.5L V6',
    transmission: 'Automatic',
    condition: 'Excellent',
    isLive: true,
    isHotDeal: false,
    transportReady: false,
    verifiedSeller: true,
    aiMatchScore: 82,
    biddersCount: 56,
    recentBidders: [
      { name: 'Jennifer R.', avatar: '/slider/avatars/78529e2ec8eb4a2eb2fb961e04915b0a.webp' },
      { name: 'Carlos D.', avatar: '/slider/avatars/0450249b131eec36dc8333b7cf847bc4.webp' }
    ]
  },
  {
    id: 'ai-4',
    title: 'BMW X5 xDrive40i',
    currentBid: 39800,
    startingBid: 38500,
    timeLeft: '10h 20m',
    endTime: new Date(Date.now() + 10.33 * 60 * 60 * 1000).toISOString(),
    year: 2019,
    mileage: 32000,
    location: 'Seattle, WA, USA',
    photos: [
      'https://images.pexels.com/photos/2127734/pexels-photo-2127734.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1719650/pexels-photo-1719650.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    image: 'https://images.pexels.com/photos/2127734/pexels-photo-2127734.jpeg?auto=compress&cs=tinysrgb&w=400',
    engine: '3.0L Turbo',
    transmission: 'Automatic',
    condition: 'Very Good',
    isLive: true,
    isHotDeal: true,
    transportReady: true,
    verifiedSeller: false,
    aiMatchScore: 91,
    biddersCount: 73,
    recentBidders: [
      { name: 'Robert M.', avatar: '/slider/avatars/1a3318330cf1734feb84887e9453fb1b.webp' },
      { name: 'Anna S.', avatar: '/slider/avatars/27d73d5efa51661b5feb1e29cc389257.webp' },
      { name: 'Tom H.', avatar: '/slider/avatars/40687889cb61a06b242aafb9e02f5204.webp' }
    ]
  },
  {
    id: 'ai-5',
    title: 'Audi Q5 Premium Plus',
    currentBid: 36200,
    startingBid: 35000,
    timeLeft: '14h 5m',
    endTime: new Date(Date.now() + 14.08 * 60 * 60 * 1000).toISOString(),
    year: 2021,
    mileage: 28000,
    location: 'Austin, TX, USA',
    photos: [
      'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/2127732/pexels-photo-2127732.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    image: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400',
    engine: '2.0L Turbo',
    transmission: 'Automatic',
    condition: 'Excellent',
    isLive: false,
    isHotDeal: false,
    transportReady: true,
    verifiedSeller: true,
    aiMatchScore: 87,
    biddersCount: 38,
    recentBidders: [
      { name: 'Lisa P.', avatar: '/slider/avatars/622e4c7767d4eb0307179d6dfda9248b.webp' }
    ]
  },
  {
    id: 'ai-6',
    title: 'Porsche Cayenne S',
    currentBid: 52800,
    startingBid: 51000,
    timeLeft: '5h 40m',
    endTime: new Date(Date.now() + 5.67 * 60 * 60 * 1000).toISOString(),
    year: 2020,
    mileage: 22000,
    location: 'Los Angeles, CA, USA',
    photos: [
      'https://images.pexels.com/photos/2127732/pexels-photo-2127732.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    image: 'https://images.pexels.com/photos/2127732/pexels-photo-2127732.jpeg?auto=compress&cs=tinysrgb&w=400',
    engine: '3.0L V6 Turbo',
    transmission: 'Automatic',
    condition: 'Very Good',
    isLive: true,
    isHotDeal: true,
    transportReady: false,
    verifiedSeller: true,
    aiMatchScore: 79,
    biddersCount: 92,
    recentBidders: [
      { name: 'Michael B.', avatar: '/slider/avatars/78529e2ec8eb4a2eb2fb961e04915b0a.webp' },
      { name: 'Emma W.', avatar: '/slider/avatars/0450249b131eec36dc8333b7cf847bc4.webp' },
      { name: 'James L.', avatar: '/slider/avatars/1a3318330cf1734feb84887e9453fb1b.webp' }
    ]
  }
];

// TODO-FX: Mock authentication data and functions
export const mockUsers = [
  {
    id: 1,
    full_name: "John Doe",
    email: "john@example.com",
    password: "Password123", // Mock password - never store real passwords like this
    role: "user",
    created_at: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    full_name: "Jane Smith",
    email: "jane@example.com",
    password: "Password123",
    role: "dealer",
    created_at: "2024-02-20T14:30:00Z"
  },
  {
    id: 3,
    full_name: "Bob Johnson",
    email: "bob@example.com",
    password: "Password123",
    role: "user",
    created_at: "2024-03-10T09:15:00Z"
  }
];

// TODO-FX: Mock user profile data for ProfileDrawer
export const mockUserProfile = {
  id: 1,
  name: "Demo User",
  email: "demo@example.com",
  role: "user", // "user" or "dealer"
  avatar: "/slider/avatars/0450249b131eec36dc8333b7cf847bc4.webp",
  isLoggedIn: true,
  preferences: {
    theme: "dark",
    language: "en",
    notifications: true
  }
};

// TODO-FX: Mock AI assistant conversation data
// TODO-FX: Replace with real API call.
// API Endpoint: POST /api/ai/chat
// Expected Data: { response: string, suggestions?: string[] }
export const mockAIConversations = [
  {
    id: 'conv-1',
    userMessage: "What vehicles are available in Los Angeles?",
    aiResponse: "I found 23 vehicles currently available in Los Angeles, CA. Here are some highlights:\n\n• 2020 Honda Civic - $12,500 (45k miles)\n• 2019 Toyota Camry - $15,800 (32k miles)\n• 2021 Ford F-150 - $28,500 (28k miles)\n\nWould you like me to show you more details or help you find specific types of vehicles?",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    suggestions: ["Show me SUVs", "Filter by price under $20k", "What's the closest auction?"]
  },
  {
    id: 'conv-2',
    userMessage: "How does shipping work?",
    aiResponse: "We partner with trusted carriers for secure vehicle transportation worldwide. Here's how it works:\n\n1. **Booking**: Schedule pickup after winning auction\n2. **Insurance**: Full coverage during transit\n3. **Tracking**: Real-time GPS updates via our platform\n4. **Delivery**: Door-to-door service\n\nShipping costs start from $800 for domestic routes. International shipping available.",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    suggestions: ["Calculate shipping cost", "View active routes", "Partner carriers"]
  },
  {
    id: 'conv-3',
    userMessage: "Tell me about Tesla Model 3",
    aiResponse: "The Tesla Model 3 is one of our most popular electric vehicles. Currently available:\n\n• **Price Range**: $41,000 - $45,000\n• **Condition**: Excellent (avg 15k miles)\n• **Features**: Autopilot, Supercharger access, 358 miles range\n• **Location**: San Francisco, CA\n\nThis vehicle has a 95% AI match score for electric vehicle enthusiasts. Ready for immediate shipping.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    suggestions: ["View similar EVs", "Check auction schedule", "Calculate shipping"]
  }
];

// TODO-FX: Mock AI assistant suggestions for new conversations
export const aiSuggestions = [
  "What vehicles are available near me?",
  "How do auctions work?",
  "What's the shipping cost to Europe?",
  "Show me electric vehicles",
  "Help me find a family SUV"
];

// TODO-FX: Mock AI assistant quick responses
export const mockAIResponses = {
  welcome: "Hello! I'm your AI assistant for vehicle auctions and logistics. I can help you find vehicles, answer questions about shipping, or guide you through the auction process. What would you like to know?",
  typing: "AI is typing...",
  error: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
  suggestions: ["Tell me about available vehicles", "How does shipping work?", "What are the current auctions?"]
};

// TODO-FX: Replace with real authentication API calls
export const mockAuth = {
  login: async (credentials) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u =>
      u.email === credentials.email &&
      u.password === credentials.password &&
      u.role === credentials.role
    );

    if (!user) {
      throw new Error('Invalid credentials or account type');
    }

    // Return mock JWT token and user data
    return {
      token: `mock-jwt-token-${user.id}`,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    };
  },

  register: async (userData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      full_name: userData.full_name,
      email: userData.email,
      password: userData.password, // Mock - never store real passwords
      role: userData.role,
      created_at: new Date().toISOString()
    };

    mockUsers.push(newUser);

    // Return mock JWT token and user data
    return {
      token: `mock-jwt-token-${newUser.id}`,
      user: {
        id: newUser.id,
        full_name: newUser.full_name,
        email: newUser.email,
        role: newUser.role
      }
    };
  },

  socialAuth: async (provider) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Mock social auth response
    return {
      token: `mock-social-${provider}-token`,
      user: {
        id: Date.now(),
        full_name: `Social ${provider} User`,
        email: `user@${provider}.com`,
        role: 'user'
      }
    };
  }
};

// TODO-FX: Mock data for news section
// TODO-FX: Mock data for news section with random engagement metrics and avatars
export const newsArticles = [
  {
    id: 'news-1',
    title: 'Auto Auction Market Shows Strong Recovery in Q3 2024',
    summary: 'Industry analysts report a 15% increase in auction volumes compared to last quarter, with electric vehicle auctions seeing the highest growth at 28%.',
    image: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Market Report',
    date: 'Oct 15, 2024',
    author: 'Sarah Johnson',
    avatar: '/slider/avatars/0450249b131eec36dc8333b7cf847bc4.webp',
    readTime: '3 min read',
    views: Math.floor(Math.random() * 5000) + 1000, // Random 1000-6000
    comments: Math.floor(Math.random() * 50) + 10, // Random 10-60
    shares: Math.floor(Math.random() * 100) + 20 // Random 20-120
  },
  {
    id: 'news-2',
    title: 'New Logistics Partnerships Expand Global Reach',
    summary: 'AutoAuction announces strategic partnerships with 12 new international carriers, enabling faster delivery times and improved service coverage across 45 countries.',
    image: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Company News',
    date: 'Oct 14, 2024',
    author: 'Michael Chen',
    avatar: '/slider/avatars/1a3318330cf1734feb84887e9453fb1b.webp',
    readTime: '4 min read',
    views: Math.floor(Math.random() * 5000) + 1000,
    comments: Math.floor(Math.random() * 50) + 10,
    shares: Math.floor(Math.random() * 100) + 20
  },
  {
    id: 'news-3',
    title: 'AI-Powered Vehicle Inspection Technology Goes Live',
    summary: 'Revolutionary AI inspection system reduces vehicle assessment time by 60% while improving accuracy. Early adopters report significant cost savings and faster auction turnaround.',
    image: 'https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Technology',
    date: 'Oct 13, 2024',
    author: 'Dr. Emily Rodriguez',
    avatar: '/slider/avatars/27d73d5efa51661b5feb1e29cc389257.webp',
    readTime: '5 min read',
    views: Math.floor(Math.random() * 5000) + 1000,
    comments: Math.floor(Math.random() * 50) + 10,
    shares: Math.floor(Math.random() * 100) + 20
  },
  {
    id: 'news-4',
    title: 'Industry Leaders Discuss Future of Electric Vehicle Auctions',
    summary: 'Panel discussion at AutoTech Summit explores challenges and opportunities in EV auction market, with projections for 40% market share by 2026.',
    image: 'https://images.pexels.com/photos/2127734/pexels-photo-2127734.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Industry Insights',
    date: 'Oct 12, 2024',
    author: 'David Park',
    avatar: '/slider/avatars/40687889cb61a06b242aafb9e02f5204.webp',
    readTime: '6 min read',
    views: Math.floor(Math.random() * 5000) + 1000,
    comments: Math.floor(Math.random() * 50) + 10,
    shares: Math.floor(Math.random() * 100) + 20
  },
  {
    id: 'news-5',
    title: 'Record-Breaking Auction Week Sets New Industry Standards',
    summary: 'Last week saw the highest volume of transactions in company history, with over $45 million in successful bids and 98% seller satisfaction rate.',
    image: 'https://images.pexels.com/photos/2127735/pexels-photo-2127735.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Market Report',
    date: 'Oct 11, 2024',
    author: 'Lisa Thompson',
    avatar: '/slider/avatars/622e4c7767d4eb0307179d6dfda9248b.webp',
    readTime: '3 min read',
    views: Math.floor(Math.random() * 5000) + 1000,
    comments: Math.floor(Math.random() * 50) + 10,
    shares: Math.floor(Math.random() * 100) + 20
  },
  {
    id: 'news-6',
    title: 'Sustainability Initiative Reduces Carbon Footprint by 25%',
    summary: 'New eco-friendly shipping practices and digital documentation processes contribute to significant environmental impact reduction across operations.',
    image: 'https://images.pexels.com/photos/1719650/pexels-photo-1719650.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Sustainability',
    date: 'Oct 10, 2024',
    author: 'Robert Green',
    avatar: '/slider/avatars/78529e2ec8eb4a2eb2fb961e04915b0a.webp',
    readTime: '4 min read',
    views: Math.floor(Math.random() * 5000) + 1000,
    comments: Math.floor(Math.random() * 50) + 10,
    shares: Math.floor(Math.random() * 100) + 20
  }
];