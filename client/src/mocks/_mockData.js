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
    id: "C1",
    title: "Container #C1",
    subtitle: "Los Angeles → Poti",
    progress: 65,
    eta: "4 days",
    status: "On Route",
    statusColor: "blue",
    details: {
      vessel: "MSC Aurora",
      lastUpdate: "2h ago",
      location: "Mid-Atlantic Ocean",
      coords: [-30.0, 38.0],
      icon: "ship"
    }
  },
  {
    id: "C2",
    title: "Container #C2",
    subtitle: "Los Angeles → Poti",
    progress: 85,
    eta: "2 days",
    status: "Approaching Europe",
    statusColor: "indigo",
    details: {
      vessel: "Ever Glory",
      lastUpdate: "1h ago",
      location: "Near Portugal",
      coords: [-10.5, 40.5],
      icon: "ship"
    }
  },
  {
    id: "C3",
    title: "Container #C3",
    subtitle: "Los Angeles → Poti",
    progress: 98,
    eta: "8 hours",
    status: "Near Georgia",
    statusColor: "green",
    details: {
      vessel: "Land Truck #45",
      lastUpdate: "5m ago",
      location: "Entering Georgia",
      coords: [20.2, 41.3],
      icon: "truck"
    }
  }
];

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
  { name: "FedEx", logo: "https://via.placeholder.com/120x60/0066CC/FFFFFF?text=FedEx" },
  { name: "UPS", logo: "https://via.placeholder.com/120x60/Brown/FFFFFF?text=UPS" },
  { name: "DHL", logo: "https://via.placeholder.com/120x60/FFCC00/000000?text=DHL" },
  { name: "Geico", logo: "https://via.placeholder.com/120x60/0066CC/FFFFFF?text=Geico" },
  { name: "Progressive", logo: "https://via.placeholder.com/120x60/0066CC/FFFFFF?text=Progressive" },
  { name: "State Farm", logo: "https://via.placeholder.com/120x60/FF0000/FFFFFF?text=State+Farm" }
];

export const navigation = [
  { key: "home", label: "Home", path: "/" },
  { key: "auctions", label: "Auctions", path: "/auctions" },
  { key: "logistics", label: "Logistics", path: "/logistics" },
  { key: "crm", label: "CRM", path: "/crm" },
  { key: "support", label: "Support", path: "/support" }
];

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
// TODO-FX: Mock data for featured auctions (carousel section)
export const featuredAuctions = [
  {
    id: 'featured-1',
    title: '2018 BMW 3 Series',
    currentBid: 22500,
    startingBid: 21000,
    timeLeft: '1h 45m',
    year: 2018,
    mileage: 45000,
    location: 'Los Angeles, CA',
    image: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'featured-2',
    title: '2020 Mercedes C-Class',
    currentBid: 31200,
    startingBid: 29500,
    timeLeft: '3h 20m',
    year: 2020,
    mileage: 32000,
    location: 'Chicago, IL',
    image: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'featured-3',
    title: '2019 Audi A4',
    currentBid: 26800,
    startingBid: 25000,
    timeLeft: '5h 10m',
    year: 2019,
    mileage: 28000,
    location: 'Miami, FL',
    image: 'https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'featured-4',
    title: '2021 Lexus RX',
    currentBid: 35800,
    startingBid: 34000,
    timeLeft: '2h 30m',
    year: 2021,
    mileage: 25000,
    location: 'Seattle, WA',
    image: 'https://images.pexels.com/photos/2127734/pexels-photo-2127734.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'featured-5',
    title: '2022 Tesla Model 3',
    currentBid: 42500,
    startingBid: 41000,
    timeLeft: '4h 15m',
    year: 2022,
    mileage: 15000,
    location: 'San Francisco, CA',
    image: 'https://images.pexels.com/photos/1719650/pexels-photo-1719650.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'featured-6',
    title: '2017 Mercedes-Benz S-Class',
    currentBid: 29500,
    startingBid: 28000,
    timeLeft: '6h 45m',
    year: 2017,
    mileage: 55000,
    location: 'Dallas, TX',
    image: 'https://images.pexels.com/photos/2127736/pexels-photo-2127736.jpeg?auto=compress&cs=tinysrgb&w=400'
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

// TODO-FX: Mock data for AI picks (masonry section)
export const aiPicks = [
  {
    id: 'ai-1',
    title: '2022 Tesla Model 3',
    price: 45000,
    matchScore: 95,
    year: 2022,
    mileage: 12000,
    location: 'San Francisco, CA',
    image: 'https://images.pexels.com/photos/1719650/pexels-photo-1719650.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'ai-2',
    title: '2021 Mercedes-Benz C-Class',
    price: 38500,
    matchScore: 88,
    year: 2021,
    mileage: 25000,
    location: 'Chicago, IL',
    image: 'https://images.pexels.com/photos/2127736/pexels-photo-2127736.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'ai-3',
    title: '2020 Lexus RX',
    price: 42500,
    matchScore: 82,
    year: 2020,
    mileage: 18000,
    location: 'Miami, FL',
    image: 'https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'ai-4',
    title: '2019 BMW X5',
    price: 39800,
    matchScore: 91,
    year: 2019,
    mileage: 32000,
    location: 'Seattle, WA',
    image: 'https://images.pexels.com/photos/2127734/pexels-photo-2127734.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'ai-5',
    title: '2021 Audi Q5',
    price: 36200,
    matchScore: 87,
    year: 2021,
    mileage: 28000,
    location: 'Austin, TX',
    image: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'ai-6',
    title: '2020 Porsche Cayenne',
    price: 52800,
    matchScore: 79,
    year: 2020,
    mileage: 22000,
    location: 'Los Angeles, CA',
    image: 'https://images.pexels.com/photos/2127732/pexels-photo-2127732.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

// TODO-FX: Mock data for news section
export const newsArticles = [
  {
    id: 'news-1',
    title: 'Auto Auction Market Shows Strong Recovery in Q3 2024',
    summary: 'Industry analysts report a 15% increase in auction volumes compared to last quarter, with electric vehicle auctions seeing the highest growth at 28%.',
    image: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Market Report',
    date: 'Oct 15, 2024',
    author: 'Sarah Johnson',
    readTime: '3 min read'
  },
  {
    id: 'news-2',
    title: 'New Logistics Partnerships Expand Global Reach',
    summary: 'AutoAuction announces strategic partnerships with 12 new international carriers, enabling faster delivery times and improved service coverage across 45 countries.',
    image: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Company News',
    date: 'Oct 14, 2024',
    author: 'Michael Chen',
    readTime: '4 min read'
  },
  {
    id: 'news-3',
    title: 'AI-Powered Vehicle Inspection Technology Goes Live',
    summary: 'Revolutionary AI inspection system reduces vehicle assessment time by 60% while improving accuracy. Early adopters report significant cost savings and faster auction turnaround.',
    image: 'https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Technology',
    date: 'Oct 13, 2024',
    author: 'Dr. Emily Rodriguez',
    readTime: '5 min read'
  },
  {
    id: 'news-4',
    title: 'Industry Leaders Discuss Future of Electric Vehicle Auctions',
    summary: 'Panel discussion at AutoTech Summit explores challenges and opportunities in EV auction market, with projections for 40% market share by 2026.',
    image: 'https://images.pexels.com/photos/2127734/pexels-photo-2127734.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Industry Insights',
    date: 'Oct 12, 2024',
    author: 'David Park',
    readTime: '6 min read'
  },
  {
    id: 'news-5',
    title: 'Record-Breaking Auction Week Sets New Industry Standards',
    summary: 'Last week saw the highest volume of transactions in company history, with over $45 million in successful bids and 98% seller satisfaction rate.',
    image: 'https://images.pexels.com/photos/2127735/pexels-photo-2127735.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Market Report',
    date: 'Oct 11, 2024',
    author: 'Lisa Thompson',
    readTime: '3 min read'
  },
  {
    id: 'news-6',
    title: 'Sustainability Initiative Reduces Carbon Footprint by 25%',
    summary: 'New eco-friendly shipping practices and digital documentation processes contribute to significant environmental impact reduction across operations.',
    image: 'https://images.pexels.com/photos/1719650/pexels-photo-1719650.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Sustainability',
    date: 'Oct 10, 2024',
    author: 'Robert Green',
    readTime: '4 min read'
  }
];