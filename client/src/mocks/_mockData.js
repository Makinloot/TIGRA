// TODO-FX: Replace with real API endpoint when backend ready

// Utility function to generate random car images from local collection
export const getRandomCarImages = (count = 3) => {
  const totalImages = 480; // We have 480 car images (1.jpg to 480.jpg)
  const selectedIndices = new Set();

  // Ensure we don't select the same image twice
  while (selectedIndices.size < count) {
    const randomIndex = Math.floor(Math.random() * totalImages) + 1; // 1 to 480
    selectedIndices.add(randomIndex);
  }

  return Array.from(selectedIndices).map(index => `/cars/${index}.jpg`);
};

// Utility function to get a single random car image
export const getRandomCarImage = () => {
  const randomIndex = Math.floor(Math.random() * 480) + 1; // 1 to 480
  return `/cars/${randomIndex}.jpg`;
};

export const keyMetrics = [
  { title: "Active Auctions", value: 128 },
  { title: "Vehicles Listed", value: 4720 },
  { title: "Delivered Vehicles", value: 9081 },
  { title: "Partner Carriers", value: 86 }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/auctions/items
// Expected Data: Array of auction items with isAuction: true
// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/catalog/items
// Expected Data: Array of catalog items with isAuction: false

export const mockItems = [{
    id: 1,
    title: "2020 Honda Civic",
    lotId: "AA-2024-001",
    currentBid: 12500,
    startingBid: 11000,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 45000,
    condition: "Excellent",
    bodyType: "Sedan",
    location: "Los Angeles, CA",
    timeLeft: "2h 15m",
    bids: 23,
    isAuction: true
  },
  {
    id: 2,
    title: "2019 Toyota Camry",
    lotId: "AA-2024-002",
    currentBid: 15800,
    startingBid: 14500,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 32000,
    condition: "Very Good",
    bodyType: "Sedan",
    location: "Dallas, TX",
    timeLeft: "4h 30m",
    bids: 18,
    isAuction: true
  },
  {
    id: 3,
    title: "2021 Ford F-150",
    lotId: "AA-2024-003",
    currentBid: 28500,
    startingBid: 27000,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 28000,
    condition: "Good",
    bodyType: "Truck",
    location: "Phoenix, AZ",
    timeLeft: "6h 45m",
    bids: 31,
    isAuction: true
  },
  {
    id: 4,
    title: "2018 BMW X3",
    lotId: "AA-2024-004",
    currentBid: 22500,
    startingBid: 21000,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 55000,
    condition: "Good",
    bodyType: "SUV",
    location: "Seattle, WA",
    timeLeft: "1h 20m",
    bids: 15,
    isAuction: true
  },
  {
    id: 5,
    title: "2022 Tesla Model 3",
    lotId: "AA-2024-005",
    currentBid: 42500,
    startingBid: 41000,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 15000,
    condition: "Excellent",
    bodyType: "Sedan",
    location: "San Francisco, CA",
    timeLeft: "8h 12m",
    bids: 42,
    isAuction: true
  },
  {
    id: 6,
    title: "2017 Mercedes-Benz C-Class",
    lotId: "AA-2024-006",
    currentBid: 19800,
    startingBid: 18500,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 68000,
    condition: "Good",
    bodyType: "Sedan",
    location: "Miami, FL",
    timeLeft: "12h 30m",
    bids: 27,
    isAuction: true
  },
  {
    id: 7,
    title: "2020 Chevrolet Silverado",
    lotId: "AA-2024-007",
    currentBid: 33500,
    startingBid: 32000,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 35000,
    condition: "Very Good",
    bodyType: "Truck",
    location: "Denver, CO",
    timeLeft: "1d 2h",
    bids: 19,
    isAuction: true
  },
  {
    id: 8,
    title: "2019 Jeep Grand Cherokee",
    lotId: "AA-2024-008",
    currentBid: 26500,
    startingBid: 25000,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 42000,
    condition: "Excellent",
    bodyType: "SUV",
    location: "Atlanta, GA",
    timeLeft: "3h 45m",
    bids: 33,
    isAuction: true
  },
  {
    id: 9,
    title: "2021 Nissan Rogue",
    lotId: "AA-2024-009",
    currentBid: 22800,
    startingBid: 21500,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 28000,
    condition: "Very Good",
    bodyType: "SUV",
    location: "Portland, OR",
    timeLeft: "5h 20m",
    bids: 21,
    isAuction: true
  },
  {
    id: 10,
    title: "2018 Audi Q5",
    lotId: "AA-2024-010",
    currentBid: 31200,
    startingBid: 29500,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 52000,
    condition: "Good",
    bodyType: "SUV",
    location: "Boston, MA",
    timeLeft: "7h 10m",
    bids: 38,
    isAuction: true
  },
  {
    id: 11,
    title: "2022 Hyundai Tucson",
    lotId: "AA-2024-011",
    currentBid: 24800,
    startingBid: 23500,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 18000,
    condition: "Excellent",
    bodyType: "SUV",
    location: "Nashville, TN",
    timeLeft: "9h 55m",
    bids: 16,
    isAuction: true
  },
  {
    id: 12,
    title: "2019 Volkswagen Golf",
    lotId: "AA-2024-012",
    currentBid: 17500,
    startingBid: 16200,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 38000,
    condition: "Very Good",
    bodyType: "Hatchback",
    location: "Austin, TX",
    timeLeft: "11h 40m",
    bids: 24,
    isAuction: true
  },
  {
    id: 13,
    title: "2020 Subaru Outback",
    lotId: "AA-2024-013",
    currentBid: 26800,
    startingBid: 25500,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 29000,
    condition: "Excellent",
    bodyType: "Wagon",
    location: "Salt Lake City, UT",
    timeLeft: "14h 25m",
    bids: 29,
    isAuction: true
  },
  {
    id: 14,
    title: "2017 Lexus RX",
    lotId: "AA-2024-014",
    currentBid: 29500,
    startingBid: 28000,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 61000,
    condition: "Good",
    bodyType: "SUV",
    location: "Raleigh, NC",
    timeLeft: "16h 15m",
    bids: 22,
    isAuction: true
  },
  {
    id: 15,
    title: "2021 Mazda CX-5",
    lotId: "AA-2024-015",
    currentBid: 25900,
    startingBid: 24500,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 25000,
    condition: "Very Good",
    bodyType: "SUV",
    location: "Minneapolis, MN",
    timeLeft: "18h 5m",
    bids: 31,
    isAuction: true
  },
  {
    id: 16,
    title: "2019 GMC Yukon",
    lotId: "AA-2024-016",
    currentBid: 37800,
    startingBid: 36500,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 45000,
    condition: "Good",
    bodyType: "SUV",
    location: "Las Vegas, NV",
    timeLeft: "20h 30m",
    bids: 35,
    isAuction: true
  },
  {
    id: 17,
    title: "2023 Toyota Corolla",
    lotId: null,
    currentBid: 18900,
    startingBid: null,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 8500,
    condition: "Excellent",
    bodyType: "Sedan",
    location: "Los Angeles, CA",
    timeLeft: null,
    bids: null,
    isAuction: false
  },
  {
    id: 18,
    title: "2022 Honda CR-V",
    lotId: null,
    currentBid: 26900,
    startingBid: null,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 12000,
    condition: "Very Good",
    bodyType: "SUV",
    location: "Dallas, TX",
    timeLeft: null,
    bids: null,
    isAuction: false
  },
  {
    id: 19,
    title: "2021 Ford Explorer",
    lotId: null,
    currentBid: 31900,
    startingBid: null,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 18000,
    condition: "Excellent",
    bodyType: "SUV",
    location: "Phoenix, AZ",
    timeLeft: null,
    bids: null,
    isAuction: false
  },
  {
    id: 20,
    title: "2020 BMW 3 Series",
    lotId: null,
    currentBid: 28900,
    startingBid: null,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 22000,
    condition: "Good",
    bodyType: "Sedan",
    location: "Seattle, WA",
    timeLeft: null,
    bids: null,
    isAuction: false
  },
  {
    id: 21,
    title: "2022 Ram 2500",
    lotId: "AA-2024-021",
    currentBid: 33186,
    startingBid: 28774,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 19883,
    condition: "Good",
    bodyType: "SUV",
    location: "Nashville, TN",
    timeLeft: "18h 10m",
    bids: 22,
    isAuction: true
  },
  {
    id: 22,
    title: "2021 Polestar 2",
    lotId: "AA-2024-022",
    currentBid: 52417,
    startingBid: 48172,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 65215,
    condition: "Excellent",
    bodyType: "Convertible",
    location: "Fort Worth, TX",
    timeLeft: "2d 1h",
    bids: 56,
    isAuction: true
  },
  {
    id: 23,
    title: "2017 Rolls-Royce Wraith",
    lotId: "AA-2024-023",
    currentBid: 259213,
    startingBid: 234662,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 19819,
    condition: "Excellent",
    bodyType: "Crossover",
    location: "Jacksonville, FL",
    timeLeft: "1h 15m",
    bids: 53,
    isAuction: true
  },
  {
    id: 24,
    title: "2017 Chevrolet Tahoe",
    lotId: "AA-2024-024",
    currentBid: 22585,
    startingBid: 20212,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 58630,
    condition: "Fair",
    bodyType: "SUV",
    location: "San Antonio, TX",
    timeLeft: "1d 6h",
    bids: 13,
    isAuction: true
  },
  {
    id: 25,
    title: "2019 Subaru Impreza",
    lotId: "AA-2024-025",
    currentBid: 34435,
    startingBid: 30590,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 18819,
    condition: "Very Good",
    bodyType: "SUV",
    location: "Detroit, MI",
    timeLeft: "15h 15m",
    bids: 43,
    isAuction: false
  },
  {
    id: 26,
    title: "2022 Volvo S60",
    lotId: "AA-2024-026",
    currentBid: 42013,
    startingBid: 38896,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 29616,
    condition: "Good",
    bodyType: "Hatchback",
    location: "Baltimore, MD",
    timeLeft: "1d 2h",
    bids: 21,
    isAuction: true
  },
  {
    id: 27,
    title: "2022 Lexus LX",
    lotId: "AA-2024-027",
    currentBid: 39192,
    startingBid: 34657,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 40632,
    condition: "Very Good",
    bodyType: "Luxury Sedan",
    location: "Mesa, AZ",
    timeLeft: "3h 45m",
    bids: 53,
    isAuction: true
  },
  {
    id: 28,
    title: "2021 Lexus GX",
    lotId: "AA-2024-028",
    currentBid: 45340,
    startingBid: 43054,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 20251,
    condition: "Excellent",
    bodyType: "Coupe",
    location: "Louisville, KY",
    timeLeft: "11h 35m",
    bids: 56,
    isAuction: true
  },
  {
    id: 29,
    title: "2020 Kia Optima",
    lotId: "AA-2024-029",
    currentBid: 24178,
    startingBid: 22796,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 64240,
    condition: "Very Good",
    bodyType: "Luxury Sedan",
    location: "Tucson, AZ",
    timeLeft: "18h 10m",
    bids: 28,
    isAuction: true
  },
  {
    id: 30,
    title: "2019 Jeep Wrangler",
    lotId: "AA-2024-030",
    currentBid: 33243,
    startingBid: 30624,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 10387,
    condition: "Good",
    bodyType: "Crossover",
    location: "Kansas City, MO",
    timeLeft: "21h 20m",
    bids: 43,
    isAuction: true
  },
  {
    id: 31,
    title: "2019 Audi A4",
    lotId: "AA-2024-031",
    currentBid: 39297,
    startingBid: 33798,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 46390,
    condition: "Good",
    bodyType: "SUV",
    location: "New York, NY",
    timeLeft: "21h 20m",
    bids: 44,
    isAuction: true
  },
  {
    id: 32,
    title: "2022 Tesla Model 3",
    lotId: "AA-2024-032",
    currentBid: 40268,
    startingBid: 37720,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 62516,
    condition: "Good",
    bodyType: "SUV",
    location: "Phoenix, AZ",
    timeLeft: "15h 15m",
    bids: 29,
    isAuction: true
  },
  {
    id: 33,
    title: "2021 Lincoln Corsair",
    lotId: "AA-2024-033",
    currentBid: 56388,
    startingBid: 51525,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 21692,
    condition: "Excellent",
    bodyType: "Wagon",
    location: "El Paso, TX",
    timeLeft: "23h 30m",
    bids: 46,
    isAuction: false
  },
  {
    id: 34,
    title: "2022 Volkswagen Jetta",
    lotId: "AA-2024-034",
    currentBid: 33272,
    startingBid: 31484,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 26108,
    condition: "Very Good",
    bodyType: "SUV",
    location: "Oakland, CA",
    timeLeft: "19h 55m",
    bids: 57,
    isAuction: false
  },
  {
    id: 35,
    title: "2020 Ford Explorer",
    lotId: "AA-2024-035",
    currentBid: 29975,
    startingBid: 26877,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 54084,
    condition: "Very Good",
    bodyType: "Luxury Sedan",
    location: "Los Angeles, CA",
    timeLeft: "2h 30m",
    bids: 21,
    isAuction: true
  },
  {
    id: 36,
    title: "2021 Ferrari SF90",
    lotId: "AA-2024-036",
    currentBid: 120521,
    startingBid: 113444,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 23814,
    condition: "Fair",
    bodyType: "SUV",
    location: "Kansas City, MO",
    timeLeft: "8h 25m",
    bids: 12,
    isAuction: true
  },
  {
    id: 37,
    title: "2020 Rolls-Royce Wraith",
    lotId: "AA-2024-037",
    currentBid: 246722,
    startingBid: 217372,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 60657,
    condition: "Very Good",
    bodyType: "Coupe",
    location: "Jacksonville, FL",
    timeLeft: "11h 35m",
    bids: 44,
    isAuction: true
  },
  {
    id: 38,
    title: "2023 Acura MDX",
    lotId: "AA-2024-038",
    currentBid: 47996,
    startingBid: 44573,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 53510,
    condition: "Excellent",
    bodyType: "Sedan",
    location: "Fort Worth, TX",
    timeLeft: "7h 40m",
    bids: 22,
    isAuction: false
  },
  {
    id: 39,
    title: "2019 Cadillac XT5",
    lotId: "AA-2024-039",
    currentBid: 32531,
    startingBid: 28616,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 44434,
    condition: "Fair",
    bodyType: "Coupe",
    location: "Milwaukee, WI",
    timeLeft: "2h 30m",
    bids: 11,
    isAuction: false
  },
  {
    id: 40,
    title: "2020 Chevrolet Tahoe",
    lotId: "AA-2024-040",
    currentBid: 29342,
    startingBid: 27149,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 44450,
    condition: "Good",
    bodyType: "Convertible",
    location: "Tucson, AZ",
    timeLeft: "17h 25m",
    bids: 18,
    isAuction: true
  },
  {
    id: 41,
    title: "2018 Chrysler Voyager",
    lotId: "AA-2024-041",
    currentBid: 29895,
    startingBid: 27187,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 31617,
    condition: "Very Good",
    bodyType: "Wagon",
    location: "New York, NY",
    timeLeft: "13h 45m",
    bids: 49,
    isAuction: true
  },
  {
    id: 42,
    title: "2019 Rolls-Royce Dawn",
    lotId: "AA-2024-042",
    currentBid: 212770,
    startingBid: 199817,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 57631,
    condition: "Good",
    bodyType: "Coupe",
    location: "Oklahoma City, OK",
    timeLeft: "2d 5h",
    bids: 17,
    isAuction: true
  },
  {
    id: 43,
    title: "2020 Volkswagen Tiguan",
    lotId: "AA-2024-043",
    currentBid: 30064,
    startingBid: 26835,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 32807,
    condition: "Excellent",
    bodyType: "Crossover",
    location: "Jacksonville, FL",
    timeLeft: "23h 30m",
    bids: 38,
    isAuction: true
  },
  {
    id: 44,
    title: "2019 Toyota RAV4",
    lotId: "AA-2024-044",
    currentBid: 23756,
    startingBid: 22195,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 25331,
    condition: "Fair",
    bodyType: "Sedan",
    location: "Houston, TX",
    timeLeft: "1d 6h",
    bids: 46,
    isAuction: false
  },
  {
    id: 45,
    title: "2021 Ferrari SF90",
    lotId: "AA-2024-045",
    currentBid: 135391,
    startingBid: 117040,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 50773,
    condition: "Good",
    bodyType: "Wagon",
    location: "Detroit, MI",
    timeLeft: "13h 45m",
    bids: 14,
    isAuction: true
  },
  {
    id: 46,
    title: "2020 Mercedes-Benz GLE",
    lotId: "AA-2024-046",
    currentBid: 48731,
    startingBid: 42072,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 19787,
    condition: "Good",
    bodyType: "Van",
    location: "Kansas City, MO",
    timeLeft: "8h 25m",
    bids: 48,
    isAuction: false
  },
  {
    id: 47,
    title: "2018 BMW 3 Series",
    lotId: "AA-2024-047",
    currentBid: 41175,
    startingBid: 36547,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 62723,
    condition: "Very Good",
    bodyType: "Truck",
    location: "Omaha, NE",
    timeLeft: "2d 3h",
    bids: 29,
    isAuction: false
  },
  {
    id: 48,
    title: "2023 Maserati Ghibli",
    lotId: "AA-2024-048",
    currentBid: 76227,
    startingBid: 69334,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 62340,
    condition: "Excellent",
    bodyType: "Hatchback",
    location: "San Diego, CA",
    timeLeft: "4h 20m",
    bids: 20,
    isAuction: false
  },
  {
    id: 49,
    title: "2023 Toyota Prius",
    lotId: "AA-2024-049",
    currentBid: 30757,
    startingBid: 28380,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 65415,
    condition: "Excellent",
    bodyType: "SUV",
    location: "Fresno, CA",
    timeLeft: "3h 45m",
    bids: 35,
    isAuction: false
  },
  {
    id: 50,
    title: "2022 Maserati Quattroporte",
    lotId: "AA-2024-050",
    currentBid: 82257,
    startingBid: 72097,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 29965,
    condition: "Excellent",
    bodyType: "SUV",
    location: "Houston, TX",
    timeLeft: "10h 50m",
    bids: 44,
    isAuction: true
  },
  {
    id: 51,
    title: "2019 Subaru Crosstrek",
    lotId: "AA-2024-051",
    currentBid: 36324,
    startingBid: 30886,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 23273,
    condition: "Excellent",
    bodyType: "Van",
    location: "Miami, FL",
    timeLeft: "23h 30m",
    bids: 15,
    isAuction: false
  },
  {
    id: 52,
    title: "2020 Volkswagen Golf",
    lotId: "AA-2024-052",
    currentBid: 29421,
    startingBid: 27854,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 36276,
    condition: "Good",
    bodyType: "Hatchback",
    location: "Nashville, TN",
    timeLeft: "23h 30m",
    bids: 54,
    isAuction: true
  },
  {
    id: 53,
    title: "2021 Honda Accord",
    lotId: "AA-2024-053",
    currentBid: 23827,
    startingBid: 21280,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 47286,
    condition: "Fair",
    bodyType: "Truck",
    location: "Charlotte, NC",
    timeLeft: "14h 30m",
    bids: 45,
    isAuction: false
  },
  {
    id: 54,
    title: "2017 Cadillac XT6",
    lotId: "AA-2024-054",
    currentBid: 34558,
    startingBid: 32509,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 48484,
    condition: "Good",
    bodyType: "Truck",
    location: "Virginia Beach, VA",
    timeLeft: "8h 25m",
    bids: 42,
    isAuction: true
  },
  {
    id: 55,
    title: "2020 Nissan 370Z",
    lotId: "AA-2024-055",
    currentBid: 27284,
    startingBid: 25842,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 28832,
    condition: "Very Good",
    bodyType: "Convertible",
    location: "Milwaukee, WI",
    timeLeft: "13h 45m",
    bids: 44,
    isAuction: true
  },
  {
    id: 56,
    title: "2020 Lucid Air",
    lotId: "AA-2024-056",
    currentBid: 70086,
    startingBid: 66308,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 56816,
    condition: "Good",
    bodyType: "Hatchback",
    location: "Albuquerque, NM",
    timeLeft: "20h 30m",
    bids: 46,
    isAuction: true
  },
  {
    id: 57,
    title: "2021 Dodge Journey",
    lotId: "AA-2024-057",
    currentBid: 37998,
    startingBid: 33851,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 12005,
    condition: "Excellent",
    bodyType: "Coupe",
    location: "Columbus, OH",
    timeLeft: "2d 3h",
    bids: 36,
    isAuction: true
  },
  {
    id: 58,
    title: "2019 Genesis G90",
    lotId: "AA-2024-058",
    currentBid: 33800,
    startingBid: 29005,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 50675,
    condition: "Good",
    bodyType: "Sedan",
    location: "Tucson, AZ",
    timeLeft: "13h 45m",
    bids: 20,
    isAuction: false
  },
  {
    id: 59,
    title: "2017 Genesis GV80",
    lotId: "AA-2024-059",
    currentBid: 39125,
    startingBid: 36153,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 17944,
    condition: "Excellent",
    bodyType: "Convertible",
    location: "San Antonio, TX",
    timeLeft: "1h 15m",
    bids: 39,
    isAuction: false
  },
  {
    id: 60,
    title: "2021 Mercedes-Benz S-Class",
    lotId: "AA-2024-060",
    currentBid: 41323,
    startingBid: 35880,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 37269,
    condition: "Fair",
    bodyType: "Wagon",
    location: "Houston, TX",
    timeLeft: "12h 20m",
    bids: 28,
    isAuction: false
  },
  {
    id: 61,
    title: "2019 Maserati GranTurismo",
    lotId: "AA-2024-061",
    currentBid: 60513,
    startingBid: 52201,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 47703,
    condition: "Good",
    bodyType: "Convertible",
    location: "Mesa, AZ",
    timeLeft: "10h 50m",
    bids: 29,
    isAuction: true
  },
  {
    id: 62,
    title: "2019 Lamborghini Huracan",
    lotId: "AA-2024-062",
    currentBid: 193445,
    startingBid: 174223,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 68183,
    condition: "Very Good",
    bodyType: "Van",
    location: "Atlanta, GA",
    timeLeft: "15h 15m",
    bids: 28,
    isAuction: true
  },
  {
    id: 63,
    title: "2017 Infiniti QX80",
    lotId: "AA-2024-063",
    currentBid: 38701,
    startingBid: 36633,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 31139,
    condition: "Very Good",
    bodyType: "SUV",
    location: "Portland, OR",
    timeLeft: "16h 40m",
    bids: 10,
    isAuction: false
  },
  {
    id: 64,
    title: "2018 Chrysler Pacifica",
    lotId: "AA-2024-064",
    currentBid: 28468,
    startingBid: 24330,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 28404,
    condition: "Good",
    bodyType: "Crossover",
    location: "Louisville, KY",
    timeLeft: "20h 30m",
    bids: 10,
    isAuction: false
  },
  {
    id: 65,
    title: "2017 Ford Bronco",
    lotId: "AA-2024-065",
    currentBid: 24589,
    startingBid: 23113,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 27739,
    condition: "Fair",
    bodyType: "Hatchback",
    location: "Portland, OR",
    timeLeft: "11h 35m",
    bids: 53,
    isAuction: true
  },
  {
    id: 66,
    title: "2019 Honda CR-V",
    lotId: "AA-2024-066",
    currentBid: 35576,
    startingBid: 30961,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 15254,
    condition: "Excellent",
    bodyType: "Hatchback",
    location: "Atlanta, GA",
    timeLeft: "11h 35m",
    bids: 29,
    isAuction: true
  },
  {
    id: 67,
    title: "2017 Dodge Charger",
    lotId: "AA-2024-067",
    currentBid: 24528,
    startingBid: 21070,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 57018,
    condition: "Very Good",
    bodyType: "Wagon",
    location: "Kansas City, MO",
    timeLeft: "19h 55m",
    bids: 43,
    isAuction: false
  },
  {
    id: 68,
    title: "2017 Maserati Ghibli",
    lotId: "AA-2024-068",
    currentBid: 73736,
    startingBid: 66279,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 55058,
    condition: "Excellent",
    bodyType: "SUV",
    location: "Louisville, KY",
    timeLeft: "3h 45m",
    bids: 20,
    isAuction: true
  },
  {
    id: 69,
    title: "2023 Porsche Boxster",
    lotId: "AA-2024-069",
    currentBid: 51977,
    startingBid: 48753,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 63428,
    condition: "Very Good",
    bodyType: "Hatchback",
    location: "Columbus, OH",
    timeLeft: "6h 55m",
    bids: 12,
    isAuction: false
  },
  {
    id: 70,
    title: "2021 Mazda CX-5",
    lotId: "AA-2024-070",
    currentBid: 35337,
    startingBid: 31496,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 12796,
    condition: "Very Good",
    bodyType: "Wagon",
    location: "Miami, FL",
    timeLeft: "21h 20m",
    bids: 33,
    isAuction: true
  },
  {
    id: 71,
    title: "2019 Lexus ES",
    lotId: "AA-2024-071",
    currentBid: 29579,
    startingBid: 25883,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 43275,
    condition: "Fair",
    bodyType: "Van",
    location: "Portland, OR",
    timeLeft: "21h 20m",
    bids: 30,
    isAuction: true
  },
  {
    id: 72,
    title: "2023 Lamborghini Urus",
    lotId: "AA-2024-072",
    currentBid: 199740,
    startingBid: 182022,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 49837,
    condition: "Good",
    bodyType: "SUV",
    location: "Miami, FL",
    timeLeft: "2d 1h",
    bids: 9,
    isAuction: true
  },
  {
    id: 73,
    title: "2018 Infiniti Q60",
    lotId: "AA-2024-073",
    currentBid: 30743,
    startingBid: 26813,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 47106,
    condition: "Fair",
    bodyType: "Luxury Sedan",
    location: "San Diego, CA",
    timeLeft: "20h 30m",
    bids: 38,
    isAuction: true
  },
  {
    id: 74,
    title: "2021 Hyundai Sonata",
    lotId: "AA-2024-074",
    currentBid: 21703,
    startingBid: 18551,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 57295,
    condition: "Fair",
    bodyType: "Coupe",
    location: "San Francisco, CA",
    timeLeft: "1d 8h",
    bids: 44,
    isAuction: true
  },
  {
    id: 75,
    title: "2022 Ferrari SF90",
    lotId: "AA-2024-075",
    currentBid: 157902,
    startingBid: 143861,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 35916,
    condition: "Very Good",
    bodyType: "Van",
    location: "Kansas City, MO",
    timeLeft: "15h 15m",
    bids: 50,
    isAuction: true
  },
  {
    id: 76,
    title: "2017 Jeep Wrangler",
    lotId: "AA-2024-076",
    currentBid: 25020,
    startingBid: 22745,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 49269,
    condition: "Good",
    bodyType: "Wagon",
    location: "Phoenix, AZ",
    timeLeft: "12h 20m",
    bids: 56,
    isAuction: true
  },
  {
    id: 77,
    title: "2023 Lincoln Nautilus",
    lotId: "AA-2024-077",
    currentBid: 43494,
    startingBid: 40794,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 17365,
    condition: "Good",
    bodyType: "Convertible",
    location: "Nashville, TN",
    timeLeft: "4h 20m",
    bids: 29,
    isAuction: true
  },
  {
    id: 78,
    title: "2022 Lamborghini Aventador",
    lotId: "AA-2024-078",
    currentBid: 222583,
    startingBid: 197598,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 24916,
    condition: "Excellent",
    bodyType: "Hatchback",
    location: "New York, NY",
    timeLeft: "8h 25m",
    bids: 8,
    isAuction: true
  },
  {
    id: 79,
    title: "2022 Porsche 911",
    lotId: "AA-2024-079",
    currentBid: 62269,
    startingBid: 54240,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 24509,
    condition: "Very Good",
    bodyType: "Truck",
    location: "Los Angeles, CA",
    timeLeft: "8h 25m",
    bids: 56,
    isAuction: true
  },
  {
    id: 80,
    title: "2023 Honda CR-V",
    lotId: "AA-2024-080",
    currentBid: 25049,
    startingBid: 23679,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 16572,
    condition: "Fair",
    bodyType: "Convertible",
    location: "Seattle, WA",
    timeLeft: "1h 15m",
    bids: 32,
    isAuction: true
  },
  {
    id: 81,
    title: "2022 Audi A4",
    lotId: "AA-2024-081",
    currentBid: 37275,
    startingBid: 34913,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 37486,
    condition: "Good",
    bodyType: "Wagon",
    location: "Baltimore, MD",
    timeLeft: "3h 45m",
    bids: 18,
    isAuction: true
  },
  {
    id: 82,
    title: "2019 Chevrolet Camaro",
    lotId: "AA-2024-082",
    currentBid: 23971,
    startingBid: 20897,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 58233,
    condition: "Good",
    bodyType: "Van",
    location: "Austin, TX",
    timeLeft: "1d 2h",
    bids: 10,
    isAuction: true
  },
  {
    id: 83,
    title: "2022 Mazda CX-9",
    lotId: "AA-2024-083",
    currentBid: 31776,
    startingBid: 27845,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 45600,
    condition: "Good",
    bodyType: "Crossover",
    location: "San Francisco, CA",
    timeLeft: "4h 20m",
    bids: 38,
    isAuction: true
  },
  {
    id: 84,
    title: "2021 Volvo XC90",
    lotId: "AA-2024-084",
    currentBid: 34398,
    startingBid: 29845,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 45216,
    condition: "Fair",
    bodyType: "Coupe",
    location: "Columbus, OH",
    timeLeft: "9h 5m",
    bids: 46,
    isAuction: true
  },
  {
    id: 85,
    title: "2023 Toyota RAV4",
    lotId: "AA-2024-085",
    currentBid: 34671,
    startingBid: 30631,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 62194,
    condition: "Excellent",
    bodyType: "Crossover",
    location: "Charlotte, NC",
    timeLeft: "5h 10m",
    bids: 39,
    isAuction: false
  },
  {
    id: 86,
    title: "2022 Jaguar F-TYPE",
    lotId: "AA-2024-086",
    currentBid: 53399,
    startingBid: 49914,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 66605,
    condition: "Very Good",
    bodyType: "Crossover",
    location: "San Diego, CA",
    timeLeft: "21h 20m",
    bids: 46,
    isAuction: false
  },
  {
    id: 87,
    title: "2018 Genesis GV70",
    lotId: "AA-2024-087",
    currentBid: 32711,
    startingBid: 28239,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 43721,
    condition: "Good",
    bodyType: "SUV",
    location: "Oklahoma City, OK",
    timeLeft: "9h 5m",
    bids: 52,
    isAuction: true
  },
  {
    id: 88,
    title: "2023 Dodge Ram",
    lotId: "AA-2024-088",
    currentBid: 28758,
    startingBid: 26898,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 32646,
    condition: "Fair",
    bodyType: "Hatchback",
    location: "Charlotte, NC",
    timeLeft: "23h 30m",
    bids: 41,
    isAuction: true
  },
  {
    id: 89,
    title: "2021 Kia Telluride",
    lotId: "AA-2024-089",
    currentBid: 34881,
    startingBid: 31220,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 13449,
    condition: "Excellent",
    bodyType: "Van",
    location: "Detroit, MI",
    timeLeft: "22h 45m",
    bids: 53,
    isAuction: true
  },
  {
    id: 90,
    title: "2018 Chrysler Voyager",
    lotId: "AA-2024-090",
    currentBid: 25836,
    startingBid: 24407,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 35641,
    condition: "Good",
    bodyType: "Sedan",
    location: "Fort Worth, TX",
    timeLeft: "21h 20m",
    bids: 22,
    isAuction: true
  },
  {
    id: 91,
    title: "2021 Lamborghini Gallardo",
    lotId: "AA-2024-091",
    currentBid: 231519,
    startingBid: 210898,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 28990,
    condition: "Very Good",
    bodyType: "Coupe",
    location: "San Jose, CA",
    timeLeft: "3h 45m",
    bids: 11,
    isAuction: true
  },
  {
    id: 92,
    title: "2019 Nissan Altima",
    lotId: "AA-2024-092",
    currentBid: 22490,
    startingBid: 21198,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 65702,
    condition: "Good",
    bodyType: "Convertible",
    location: "Memphis, TN",
    timeLeft: "9h 5m",
    bids: 34,
    isAuction: false
  },
  {
    id: 93,
    title: "2018 Acura TLX",
    lotId: "AA-2024-093",
    currentBid: 35398,
    startingBid: 33244,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 19448,
    condition: "Good",
    bodyType: "Van",
    location: "Philadelphia, PA",
    timeLeft: "2d 5h",
    bids: 16,
    isAuction: false
  },
  {
    id: 94,
    title: "2018 Honda Civic",
    lotId: "AA-2024-094",
    currentBid: 20880,
    startingBid: 18266,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 40152,
    condition: "Fair",
    bodyType: "Van",
    location: "Louisville, KY",
    timeLeft: "2h 30m",
    bids: 27,
    isAuction: true
  },
  {
    id: 95,
    title: "2019 Chevrolet Silverado",
    lotId: "AA-2024-095",
    currentBid: 22109,
    startingBid: 20381,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 67364,
    condition: "Fair",
    bodyType: "Hatchback",
    location: "Atlanta, GA",
    timeLeft: "3h 45m",
    bids: 37,
    isAuction: true
  },
  {
    id: 96,
    title: "2017 Honda CR-V",
    lotId: "AA-2024-096",
    currentBid: 24038,
    startingBid: 22600,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 35908,
    condition: "Good",
    bodyType: "Truck",
    location: "Houston, TX",
    timeLeft: "12h 20m",
    bids: 50,
    isAuction: true
  },
  {
    id: 97,
    title: "2020 Ram Chassis Cab",
    lotId: "AA-2024-097",
    currentBid: 37671,
    startingBid: 32640,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 51930,
    condition: "Excellent",
    bodyType: "Crossover",
    location: "San Diego, CA",
    timeLeft: "10h 50m",
    bids: 57,
    isAuction: true
  },
  {
    id: 98,
    title: "2021 Rivian R1T",
    lotId: "AA-2024-098",
    currentBid: 74549,
    startingBid: 64661,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 28014,
    condition: "Very Good",
    bodyType: "Coupe",
    location: "Philadelphia, PA",
    timeLeft: "18h 10m",
    bids: 52,
    isAuction: true
  },
  {
    id: 99,
    title: "2019 Hyundai Santa Fe",
    lotId: "AA-2024-099",
    currentBid: 26424,
    startingBid: 22461,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 47950,
    condition: "Very Good",
    bodyType: "Luxury Sedan",
    location: "Colorado Springs, CO",
    timeLeft: "3h 45m",
    bids: 18,
    isAuction: true
  },
  {
    id: 100,
    title: "2017 Toyota 4Runner",
    lotId: "AA-2024-100",
    currentBid: 25833,
    startingBid: 24263,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 18902,
    condition: "Good",
    bodyType: "Hatchback",
    location: "Fort Worth, TX",
    timeLeft: "7h 40m",
    bids: 45,
    isAuction: true
  },
  {
    id: 101,
    title: "2020 Mazda Mazda3",
    lotId: "AA-2024-101",
    currentBid: 22732,
    startingBid: 20201,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 49826,
    condition: "Fair",
    bodyType: "Truck",
    location: "Chicago, IL",
    timeLeft: "12h 20m",
    bids: 54,
    isAuction: false
  },
  {
    id: 102,
    title: "2023 Dodge Challenger",
    lotId: "AA-2024-102",
    currentBid: 40443,
    startingBid: 36576,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 29789,
    condition: "Excellent",
    bodyType: "Hatchback",
    location: "Miami, FL",
    timeLeft: "2d 5h",
    bids: 8,
    isAuction: false
  },
  {
    id: 103,
    title: "2017 Dodge Durango",
    lotId: "AA-2024-103",
    currentBid: 26930,
    startingBid: 24084,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 21172,
    condition: "Good",
    bodyType: "Convertible",
    location: "Minneapolis, MN",
    timeLeft: "6h 55m",
    bids: 50,
    isAuction: true
  },
  {
    id: 104,
    title: "2020 Rolls-Royce Ghost",
    lotId: "AA-2024-104",
    currentBid: 260415,
    startingBid: 223324,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 17782,
    condition: "Good",
    bodyType: "Van",
    location: "Atlanta, GA",
    timeLeft: "6h 55m",
    bids: 49,
    isAuction: true
  },
  {
    id: 105,
    title: "2018 Dodge Journey",
    lotId: "AA-2024-105",
    currentBid: 25235,
    startingBid: 23775,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 60872,
    condition: "Good",
    bodyType: "Wagon",
    location: "Tucson, AZ",
    timeLeft: "2h 30m",
    bids: 54,
    isAuction: true
  },
  {
    id: 106,
    title: "2018 Cadillac XT6",
    lotId: "AA-2024-106",
    currentBid: 36049,
    startingBid: 31496,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 37776,
    condition: "Good",
    bodyType: "SUV",
    location: "Boston, MA",
    timeLeft: "15h 15m",
    bids: 18,
    isAuction: true
  },
  {
    id: 107,
    title: "2017 Acura MDX",
    lotId: "AA-2024-107",
    currentBid: 31270,
    startingBid: 28001,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 60728,
    condition: "Very Good",
    bodyType: "Truck",
    location: "Charlotte, NC",
    timeLeft: "16h 40m",
    bids: 54,
    isAuction: true
  },
  {
    id: 108,
    title: "2023 Dodge Challenger",
    lotId: "AA-2024-108",
    currentBid: 34167,
    startingBid: 29290,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 64022,
    condition: "Very Good",
    bodyType: "Crossover",
    location: "San Jose, CA",
    timeLeft: "2d 3h",
    bids: 20,
    isAuction: false
  },
  {
    id: 109,
    title: "2020 Volvo V60",
    lotId: "AA-2024-109",
    currentBid: 37620,
    startingBid: 35506,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 67214,
    condition: "Very Good",
    bodyType: "Coupe",
    location: "Atlanta, GA",
    timeLeft: "23h 30m",
    bids: 54,
    isAuction: false
  },
  {
    id: 110,
    title: "2019 Polestar 3",
    lotId: "AA-2024-110",
    currentBid: 37776,
    startingBid: 35577,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 40338,
    condition: "Fair",
    bodyType: "Luxury Sedan",
    location: "Albuquerque, NM",
    timeLeft: "15h 15m",
    bids: 12,
    isAuction: false
  },
  {
    id: 111,
    title: "2021 Rivian R1S",
    lotId: "AA-2024-111",
    currentBid: 64617,
    startingBid: 57802,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 32678,
    condition: "Good",
    bodyType: "Sedan",
    location: "Phoenix, AZ",
    timeLeft: "23h 30m",
    bids: 21,
    isAuction: true
  },
  {
    id: 112,
    title: "2020 Ford Mustang",
    lotId: "AA-2024-112",
    currentBid: 24544,
    startingBid: 22792,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 50733,
    condition: "Fair",
    bodyType: "Convertible",
    location: "Mesa, AZ",
    timeLeft: "4h 20m",
    bids: 50,
    isAuction: true
  },
  {
    id: 113,
    title: "2018 Lamborghini Aventador",
    lotId: "AA-2024-113",
    currentBid: 179338,
    startingBid: 168334,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 68055,
    condition: "Good",
    bodyType: "SUV",
    location: "Fresno, CA",
    timeLeft: "2d 1h",
    bids: 14,
    isAuction: false
  },
  {
    id: 114,
    title: "2019 Dodge Charger",
    lotId: "AA-2024-114",
    currentBid: 29120,
    startingBid: 25539,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 35281,
    condition: "Good",
    bodyType: "Convertible",
    location: "Oklahoma City, OK",
    timeLeft: "12h 20m",
    bids: 24,
    isAuction: false
  },
  {
    id: 115,
    title: "2022 Porsche Cayenne",
    lotId: "AA-2024-115",
    currentBid: 58726,
    startingBid: 52500,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 20206,
    condition: "Good",
    bodyType: "Convertible",
    location: "Boston, MA",
    timeLeft: "12h 20m",
    bids: 41,
    isAuction: true
  },
  {
    id: 116,
    title: "2021 Toyota Camry",
    lotId: "AA-2024-116",
    currentBid: 29548,
    startingBid: 26414,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 35387,
    condition: "Good",
    bodyType: "Truck",
    location: "Baltimore, MD",
    timeLeft: "1d 2h",
    bids: 35,
    isAuction: true
  },
  {
    id: 117,
    title: "2023 Lexus RX",
    lotId: "AA-2024-117",
    currentBid: 39173,
    startingBid: 37170,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 67826,
    condition: "Good",
    bodyType: "Truck",
    location: "Long Beach, CA",
    timeLeft: "13h 45m",
    bids: 31,
    isAuction: false
  },
  {
    id: 118,
    title: "2017 Ferrari 812",
    lotId: "AA-2024-118",
    currentBid: 121429,
    startingBid: 113698,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 40365,
    condition: "Fair",
    bodyType: "Wagon",
    location: "Nashville, TN",
    timeLeft: "6h 55m",
    bids: 48,
    isAuction: true
  },
  {
    id: 119,
    title: "2021 Polestar 2",
    lotId: "AA-2024-119",
    currentBid: 35068,
    startingBid: 33275,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 65792,
    condition: "Fair",
    bodyType: "Truck",
    location: "New York, NY",
    timeLeft: "19h 55m",
    bids: 20,
    isAuction: true
  },
  {
    id: 120,
    title: "2023 Jeep Renegade",
    lotId: "AA-2024-120",
    currentBid: 31650,
    startingBid: 29211,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 24679,
    condition: "Good",
    bodyType: "SUV",
    location: "Omaha, NE",
    timeLeft: "1d 8h",
    bids: 38,
    isAuction: false
  },
  {
    id: 121,
    title: "2018 Lamborghini Aventador",
    lotId: "AA-2024-121",
    currentBid: 203484,
    startingBid: 185920,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 19384,
    condition: "Good",
    bodyType: "Truck",
    location: "Philadelphia, PA",
    timeLeft: "11h 35m",
    bids: 49,
    isAuction: true
  },
  {
    id: 122,
    title: "2021 Porsche Panamera",
    lotId: "AA-2024-122",
    currentBid: 45971,
    startingBid: 43669,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 25332,
    condition: "Fair",
    bodyType: "Crossover",
    location: "El Paso, TX",
    timeLeft: "7h 40m",
    bids: 27,
    isAuction: true
  },
  {
    id: 123,
    title: "2017 Acura RDX",
    lotId: "AA-2024-123",
    currentBid: 34767,
    startingBid: 32840,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 54783,
    condition: "Excellent",
    bodyType: "Luxury Sedan",
    location: "Nashville, TN",
    timeLeft: "1d 8h",
    bids: 18,
    isAuction: false
  },
  {
    id: 124,
    title: "2019 Infiniti QX80",
    lotId: "AA-2024-124",
    currentBid: 34367,
    startingBid: 29933,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 61173,
    condition: "Fair",
    bodyType: "Crossover",
    location: "Philadelphia, PA",
    timeLeft: "2d 5h",
    bids: 22,
    isAuction: true
  },
  {
    id: 125,
    title: "2017 Audi A6",
    lotId: "AA-2024-125",
    currentBid: 49194,
    startingBid: 43751,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 28450,
    condition: "Excellent",
    bodyType: "Sedan",
    location: "Milwaukee, WI",
    timeLeft: "2d 3h",
    bids: 37,
    isAuction: true
  },
  {
    id: 126,
    title: "2021 Mazda Mazda6",
    lotId: "AA-2024-126",
    currentBid: 30162,
    startingBid: 26417,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 61026,
    condition: "Very Good",
    bodyType: "Coupe",
    location: "Charlotte, NC",
    timeLeft: "1d 6h",
    bids: 22,
    isAuction: false
  },
  {
    id: 127,
    title: "2019 Lincoln Navigator",
    lotId: "AA-2024-127",
    currentBid: 38590,
    startingBid: 35513,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 50065,
    condition: "Fair",
    bodyType: "Hatchback",
    location: "Kansas City, MO",
    timeLeft: "7h 40m",
    bids: 13,
    isAuction: false
  },
  {
    id: 128,
    title: "2017 Volvo C40",
    lotId: "AA-2024-128",
    currentBid: 34291,
    startingBid: 31038,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 62420,
    condition: "Good",
    bodyType: "Wagon",
    location: "Chicago, IL",
    timeLeft: "19h 55m",
    bids: 36,
    isAuction: false
  },
  {
    id: 129,
    title: "2023 Ferrari SF90",
    lotId: "AA-2024-129",
    currentBid: 155127,
    startingBid: 146289,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 62524,
    condition: "Good",
    bodyType: "Luxury Sedan",
    location: "Mesa, AZ",
    timeLeft: "9h 5m",
    bids: 12,
    isAuction: false
  },
  {
    id: 130,
    title: "2023 Jaguar E-PACE",
    lotId: "AA-2024-130",
    currentBid: 46798,
    startingBid: 42929,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 62736,
    condition: "Good",
    bodyType: "Wagon",
    location: "Albuquerque, NM",
    timeLeft: "15h 15m",
    bids: 30,
    isAuction: true
  },
  {
    id: 131,
    title: "2021 Subaru Impreza",
    lotId: "AA-2024-131",
    currentBid: 37919,
    startingBid: 32538,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 19739,
    condition: "Very Good",
    bodyType: "Wagon",
    location: "Mesa, AZ",
    timeLeft: "20h 30m",
    bids: 31,
    isAuction: true
  },
  {
    id: 132,
    title: "2023 Lincoln Nautilus",
    lotId: "AA-2024-132",
    currentBid: 56759,
    startingBid: 50856,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 22678,
    condition: "Excellent",
    bodyType: "Coupe",
    location: "San Antonio, TX",
    timeLeft: "18h 10m",
    bids: 49,
    isAuction: false
  },
  {
    id: 133,
    title: "2017 Rivian R1S",
    lotId: "AA-2024-133",
    currentBid: 67759,
    startingBid: 60454,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 37722,
    condition: "Very Good",
    bodyType: "Truck",
    location: "Houston, TX",
    timeLeft: "6h 55m",
    bids: 51,
    isAuction: true
  },
  {
    id: 134,
    title: "2023 Rivian R1S",
    lotId: "AA-2024-134",
    currentBid: 72789,
    startingBid: 68419,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 36989,
    condition: "Very Good",
    bodyType: "Crossover",
    location: "New York, NY",
    timeLeft: "2d 5h",
    bids: 32,
    isAuction: true
  },
  {
    id: 135,
    title: "2022 Lincoln MKZ",
    lotId: "AA-2024-135",
    currentBid: 54063,
    startingBid: 46045,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 65263,
    condition: "Excellent",
    bodyType: "Coupe",
    location: "Detroit, MI",
    timeLeft: "2h 30m",
    bids: 31,
    isAuction: false
  },
  {
    id: 136,
    title: "2019 Maserati Quattroporte",
    lotId: "AA-2024-136",
    currentBid: 46231,
    startingBid: 42014,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 68285,
    condition: "Fair",
    bodyType: "Convertible",
    location: "Indianapolis, IN",
    timeLeft: "1d 4h",
    bids: 37,
    isAuction: true
  },
  {
    id: 137,
    title: "2020 Kia Telluride",
    lotId: "AA-2024-137",
    currentBid: 21901,
    startingBid: 18879,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 26057,
    condition: "Fair",
    bodyType: "Convertible",
    location: "Houston, TX",
    timeLeft: "8h 25m",
    bids: 43,
    isAuction: true
  },
  {
    id: 138,
    title: "2018 Honda Civic",
    lotId: "AA-2024-138",
    currentBid: 27522,
    startingBid: 25693,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 46174,
    condition: "Very Good",
    bodyType: "Convertible",
    location: "Boston, MA",
    timeLeft: "15h 15m",
    bids: 26,
    isAuction: false
  },
  {
    id: 139,
    title: "2021 Acura RDX",
    lotId: "AA-2024-139",
    currentBid: 44588,
    startingBid: 41744,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 56443,
    condition: "Excellent",
    bodyType: "Hatchback",
    location: "Boston, MA",
    timeLeft: "12h 20m",
    bids: 50,
    isAuction: false
  },
  {
    id: 140,
    title: "2019 Honda Odyssey",
    lotId: "AA-2024-140",
    currentBid: 28207,
    startingBid: 26046,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 30083,
    condition: "Good",
    bodyType: "Crossover",
    location: "Boston, MA",
    timeLeft: "12h 20m",
    bids: 17,
    isAuction: true
  },
  {
    id: 141,
    title: "2021 Ferrari Roma",
    lotId: "AA-2024-141",
    currentBid: 151490,
    startingBid: 142593,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 32479,
    condition: "Good",
    bodyType: "Coupe",
    location: "Miami, FL",
    timeLeft: "4h 20m",
    bids: 19,
    isAuction: true
  },
  {
    id: 142,
    title: "2017 Acura NSX",
    lotId: "AA-2024-142",
    currentBid: 33243,
    startingBid: 28925,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 16178,
    condition: "Fair",
    bodyType: "Wagon",
    location: "Long Beach, CA",
    timeLeft: "18h 10m",
    bids: 21,
    isAuction: false
  },
  {
    id: 143,
    title: "2020 Jeep Cherokee",
    lotId: "AA-2024-143",
    currentBid: 27434,
    startingBid: 23410,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 57692,
    condition: "Fair",
    bodyType: "Convertible",
    location: "Las Vegas, NV",
    timeLeft: "2d 1h",
    bids: 13,
    isAuction: true
  },
  {
    id: 144,
    title: "2018 Mercedes-Benz C-Class",
    lotId: "AA-2024-144",
    currentBid: 47366,
    startingBid: 41957,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 41252,
    condition: "Very Good",
    bodyType: "Hatchback",
    location: "New York, NY",
    timeLeft: "3h 45m",
    bids: 12,
    isAuction: true
  },
  {
    id: 145,
    title: "2021 Mercedes-Benz GLE",
    lotId: "AA-2024-145",
    currentBid: 41923,
    startingBid: 39356,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 60427,
    condition: "Good",
    bodyType: "Crossover",
    location: "Minneapolis, MN",
    timeLeft: "19h 55m",
    bids: 25,
    isAuction: true
  },
  {
    id: 146,
    title: "2017 Lamborghini Urus",
    lotId: "AA-2024-146",
    currentBid: 158569,
    startingBid: 144828,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 46852,
    condition: "Fair",
    bodyType: "Coupe",
    location: "Albuquerque, NM",
    timeLeft: "21h 20m",
    bids: 13,
    isAuction: true
  },
  {
    id: 147,
    title: "2023 Subaru Outback",
    lotId: "AA-2024-147",
    currentBid: 42047,
    startingBid: 37185,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 20444,
    condition: "Excellent",
    bodyType: "SUV",
    location: "San Jose, CA",
    timeLeft: "21h 20m",
    bids: 40,
    isAuction: true
  },
  {
    id: 148,
    title: "2017 GMC Acadia",
    lotId: "AA-2024-148",
    currentBid: 26820,
    startingBid: 24177,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 11684,
    condition: "Fair",
    bodyType: "Convertible",
    location: "Oklahoma City, OK",
    timeLeft: "2d 3h",
    bids: 39,
    isAuction: true
  },
  {
    id: 149,
    title: "2023 Maserati Quattroporte",
    lotId: "AA-2024-149",
    currentBid: 58947,
    startingBid: 50425,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 35833,
    condition: "Fair",
    bodyType: "Convertible",
    location: "Kansas City, MO",
    timeLeft: "7h 40m",
    bids: 40,
    isAuction: false
  },
  {
    id: 150,
    title: "2021 Tesla Model Y",
    lotId: "AA-2024-150",
    currentBid: 41349,
    startingBid: 36103,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 25791,
    condition: "Good",
    bodyType: "Van",
    location: "Charlotte, NC",
    timeLeft: "16h 40m",
    bids: 31,
    isAuction: true
  },
  {
    id: 151,
    title: "2018 Audi Q8",
    lotId: "AA-2024-151",
    currentBid: 40568,
    startingBid: 37773,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 39120,
    condition: "Very Good",
    bodyType: "Van",
    location: "Kansas City, MO",
    timeLeft: "2d 1h",
    bids: 18,
    isAuction: true
  },
  {
    id: 152,
    title: "2018 Volvo C40",
    lotId: "AA-2024-152",
    currentBid: 40939,
    startingBid: 37146,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 54891,
    condition: "Very Good",
    bodyType: "Coupe",
    location: "Seattle, WA",
    timeLeft: "1h 15m",
    bids: 42,
    isAuction: false
  },
  {
    id: 153,
    title: "2022 Mercedes-Benz A-Class",
    lotId: "AA-2024-153",
    currentBid: 58748,
    startingBid: 52951,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 61020,
    condition: "Excellent",
    bodyType: "Truck",
    location: "Boston, MA",
    timeLeft: "18h 10m",
    bids: 26,
    isAuction: true
  },
  {
    id: 154,
    title: "2022 Volvo C40",
    lotId: "AA-2024-154",
    currentBid: 40308,
    startingBid: 34682,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 49382,
    condition: "Good",
    bodyType: "Crossover",
    location: "Charlotte, NC",
    timeLeft: "2h 30m",
    bids: 10,
    isAuction: true
  },
  {
    id: 155,
    title: "2018 Land Rover Range Rover",
    lotId: "AA-2024-155",
    currentBid: 66366,
    startingBid: 62638,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 30787,
    condition: "Excellent",
    bodyType: "Convertible",
    location: "Baltimore, MD",
    timeLeft: "18h 10m",
    bids: 12,
    isAuction: true
  },
  {
    id: 156,
    title: "2023 Chevrolet Camaro",
    lotId: "AA-2024-156",
    currentBid: 27497,
    startingBid: 24438,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 63825,
    condition: "Fair",
    bodyType: "Crossover",
    location: "Fresno, CA",
    timeLeft: "1h 15m",
    bids: 14,
    isAuction: true
  },
  {
    id: 157,
    title: "2017 Nissan Pathfinder",
    lotId: "AA-2024-157",
    currentBid: 23260,
    startingBid: 21661,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 40362,
    condition: "Very Good",
    bodyType: "Hatchback",
    location: "Tucson, AZ",
    timeLeft: "4h 20m",
    bids: 10,
    isAuction: true
  },
  {
    id: 158,
    title: "2019 Rivian R1T",
    lotId: "AA-2024-158",
    currentBid: 75351,
    startingBid: 66981,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 60820,
    condition: "Excellent",
    bodyType: "Hatchback",
    location: "Charlotte, NC",
    timeLeft: "22h 45m",
    bids: 27,
    isAuction: true
  },
  {
    id: 159,
    title: "2017 Cadillac Escalade",
    lotId: "AA-2024-159",
    currentBid: 43335,
    startingBid: 38721,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 10958,
    condition: "Good",
    bodyType: "Convertible",
    location: "Tucson, AZ",
    timeLeft: "9h 5m",
    bids: 46,
    isAuction: true
  },
  {
    id: 160,
    title: "2017 Porsche Boxster",
    lotId: "AA-2024-160",
    currentBid: 55815,
    startingBid: 47954,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 67339,
    condition: "Excellent",
    bodyType: "Coupe",
    location: "Kansas City, MO",
    timeLeft: "9h 5m",
    bids: 36,
    isAuction: true
  },
  {
    id: 161,
    title: "2018 Acura RDX",
    lotId: "AA-2024-161",
    currentBid: 32021,
    startingBid: 29721,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 62139,
    condition: "Good",
    bodyType: "SUV",
    location: "Chicago, IL",
    timeLeft: "1d 8h",
    bids: 16,
    isAuction: true
  },
  {
    id: 162,
    title: "2020 GMC Acadia",
    lotId: "AA-2024-162",
    currentBid: 31566,
    startingBid: 26971,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 62402,
    condition: "Good",
    bodyType: "Crossover",
    location: "Milwaukee, WI",
    timeLeft: "2d 5h",
    bids: 25,
    isAuction: false
  },
  {
    id: 163,
    title: "2023 Volvo XC60",
    lotId: "AA-2024-163",
    currentBid: 46054,
    startingBid: 41624,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 19971,
    condition: "Good",
    bodyType: "Wagon",
    location: "Jacksonville, FL",
    timeLeft: "2d 3h",
    bids: 49,
    isAuction: true
  },
  {
    id: 164,
    title: "2023 Ram 3500",
    lotId: "AA-2024-164",
    currentBid: 40858,
    startingBid: 35281,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 23836,
    condition: "Very Good",
    bodyType: "Coupe",
    location: "Philadelphia, PA",
    timeLeft: "9h 5m",
    bids: 12,
    isAuction: true
  },
  {
    id: 165,
    title: "2017 Chrysler Pacifica",
    lotId: "AA-2024-165",
    currentBid: 21111,
    startingBid: 19869,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 48985,
    condition: "Fair",
    bodyType: "Sedan",
    location: "Colorado Springs, CO",
    timeLeft: "2d 3h",
    bids: 48,
    isAuction: true
  },
  {
    id: 166,
    title: "2021 Cadillac XT5",
    lotId: "AA-2024-166",
    currentBid: 49448,
    startingBid: 46097,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 25185,
    condition: "Very Good",
    bodyType: "Luxury Sedan",
    location: "Oklahoma City, OK",
    timeLeft: "1d 8h",
    bids: 37,
    isAuction: true
  },
  {
    id: 167,
    title: "2017 Ram Promaster",
    lotId: "AA-2024-167",
    currentBid: 37587,
    startingBid: 32252,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 18645,
    condition: "Excellent",
    bodyType: "Convertible",
    location: "New York, NY",
    timeLeft: "8h 25m",
    bids: 30,
    isAuction: true
  },
  {
    id: 168,
    title: "2021 Cadillac ATS",
    lotId: "AA-2024-168",
    currentBid: 43097,
    startingBid: 40736,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 65922,
    condition: "Very Good",
    bodyType: "Sedan",
    location: "Memphis, TN",
    timeLeft: "22h 45m",
    bids: 20,
    isAuction: false
  },
  {
    id: 169,
    title: "2019 Lucid Air",
    lotId: "AA-2024-169",
    currentBid: 68335,
    startingBid: 61888,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 66823,
    condition: "Very Good",
    bodyType: "Hatchback",
    location: "Houston, TX",
    timeLeft: "19h 55m",
    bids: 14,
    isAuction: true
  },
  {
    id: 170,
    title: "2021 Volvo XC60",
    lotId: "AA-2024-170",
    currentBid: 34050,
    startingBid: 32162,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 9873,
    condition: "Fair",
    bodyType: "Convertible",
    location: "Sacramento, CA",
    timeLeft: "14h 30m",
    bids: 30,
    isAuction: false
  },
  {
    id: 171,
    title: "2020 Jaguar F-PACE",
    lotId: "AA-2024-171",
    currentBid: 53417,
    startingBid: 49456,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 58542,
    condition: "Very Good",
    bodyType: "Crossover",
    location: "Seattle, WA",
    timeLeft: "17h 25m",
    bids: 13,
    isAuction: true
  },
  {
    id: 172,
    title: "2022 Polestar 4",
    lotId: "AA-2024-172",
    currentBid: 38862,
    startingBid: 35853,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 32117,
    condition: "Fair",
    bodyType: "Wagon",
    location: "Kansas City, MO",
    timeLeft: "13h 45m",
    bids: 41,
    isAuction: true
  },
  {
    id: 173,
    title: "2021 Land Rover Evoque",
    lotId: "AA-2024-173",
    currentBid: 62542,
    startingBid: 58091,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 52338,
    condition: "Excellent",
    bodyType: "SUV",
    location: "Kansas City, MO",
    timeLeft: "18h 10m",
    bids: 19,
    isAuction: true
  },
  {
    id: 174,
    title: "2017 Dodge Charger",
    lotId: "AA-2024-174",
    currentBid: 22623,
    startingBid: 20747,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 41881,
    condition: "Good",
    bodyType: "Coupe",
    location: "Oklahoma City, OK",
    timeLeft: "18h 10m",
    bids: 50,
    isAuction: true
  },
  {
    id: 175,
    title: "2019 Nissan Rogue",
    lotId: "AA-2024-175",
    currentBid: 26317,
    startingBid: 23828,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 32715,
    condition: "Very Good",
    bodyType: "Coupe",
    location: "Dallas, TX",
    timeLeft: "10h 50m",
    bids: 33,
    isAuction: true
  },
  {
    id: 176,
    title: "2021 Mercedes-Benz A-Class",
    lotId: "AA-2024-176",
    currentBid: 37020,
    startingBid: 34603,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 37164,
    condition: "Fair",
    bodyType: "Crossover",
    location: "San Francisco, CA",
    timeLeft: "21h 20m",
    bids: 40,
    isAuction: true
  },
  {
    id: 177,
    title: "2023 Volkswagen Tiguan",
    lotId: "AA-2024-177",
    currentBid: 26935,
    startingBid: 24124,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 50807,
    condition: "Fair",
    bodyType: "Truck",
    location: "Colorado Springs, CO",
    timeLeft: "1d 2h",
    bids: 51,
    isAuction: false
  },
  {
    id: 178,
    title: "2022 Toyota RAV4",
    lotId: "AA-2024-178",
    currentBid: 36956,
    startingBid: 34383,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 18127,
    condition: "Very Good",
    bodyType: "Crossover",
    location: "El Paso, TX",
    timeLeft: "21h 20m",
    bids: 40,
    isAuction: false
  },
  {
    id: 179,
    title: "2018 Dodge Challenger",
    lotId: "AA-2024-179",
    currentBid: 21768,
    startingBid: 18722,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 65476,
    condition: "Good",
    bodyType: "Wagon",
    location: "Charlotte, NC",
    timeLeft: "4h 20m",
    bids: 30,
    isAuction: false
  },
  {
    id: 180,
    title: "2022 Rivian R1S",
    lotId: "AA-2024-180",
    currentBid: 71384,
    startingBid: 63770,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 21683,
    condition: "Very Good",
    bodyType: "Van",
    location: "Kansas City, MO",
    timeLeft: "23h 30m",
    bids: 13,
    isAuction: true
  },
  {
    id: 181,
    title: "2019 Hyundai Santa Fe",
    lotId: "AA-2024-181",
    currentBid: 35369,
    startingBid: 31311,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 14272,
    condition: "Excellent",
    bodyType: "Crossover",
    location: "Charlotte, NC",
    timeLeft: "20h 30m",
    bids: 53,
    isAuction: false
  },
  {
    id: 182,
    title: "2020 Ford Escape",
    lotId: "AA-2024-182",
    currentBid: 28968,
    startingBid: 26237,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 40592,
    condition: "Good",
    bodyType: "Wagon",
    location: "Las Vegas, NV",
    timeLeft: "2d 5h",
    bids: 13,
    isAuction: true
  },
  {
    id: 183,
    title: "2022 Rivian R1T",
    lotId: "AA-2024-183",
    currentBid: 58450,
    startingBid: 53383,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 22487,
    condition: "Fair",
    bodyType: "Convertible",
    location: "Louisville, KY",
    timeLeft: "10h 50m",
    bids: 30,
    isAuction: true
  },
  {
    id: 184,
    title: "2019 Mercedes-Benz GLE",
    lotId: "AA-2024-184",
    currentBid: 49438,
    startingBid: 42105,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 15490,
    condition: "Good",
    bodyType: "Convertible",
    location: "Houston, TX",
    timeLeft: "3h 45m",
    bids: 26,
    isAuction: false
  },
  {
    id: 185,
    title: "2017 Maserati Ghibli",
    lotId: "AA-2024-185",
    currentBid: 62798,
    startingBid: 54295,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 63020,
    condition: "Very Good",
    bodyType: "Coupe",
    location: "Portland, OR",
    timeLeft: "17h 25m",
    bids: 22,
    isAuction: false
  },
  {
    id: 186,
    title: "2017 Kia Soul",
    lotId: "AA-2024-186",
    currentBid: 22820,
    startingBid: 21187,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 32486,
    condition: "Very Good",
    bodyType: "Sedan",
    location: "Memphis, TN",
    timeLeft: "1d 2h",
    bids: 45,
    isAuction: true
  },
  {
    id: 187,
    title: "2022 Kia Sportage",
    lotId: "AA-2024-187",
    currentBid: 32240,
    startingBid: 28284,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 37696,
    condition: "Very Good",
    bodyType: "Convertible",
    location: "Phoenix, AZ",
    timeLeft: "1d 8h",
    bids: 17,
    isAuction: true
  },
  {
    id: 188,
    title: "2019 Chevrolet Silverado",
    lotId: "AA-2024-188",
    currentBid: 28088,
    startingBid: 24168,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 52313,
    condition: "Very Good",
    bodyType: "Coupe",
    location: "Sacramento, CA",
    timeLeft: "4h 20m",
    bids: 14,
    isAuction: true
  },
  {
    id: 189,
    title: "2020 Mazda MX-5 Miata",
    lotId: "AA-2024-189",
    currentBid: 26879,
    startingBid: 24127,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 32730,
    condition: "Fair",
    bodyType: "Wagon",
    location: "San Jose, CA",
    timeLeft: "13h 45m",
    bids: 22,
    isAuction: true
  },
  {
    id: 190,
    title: "2023 Bentley Mulsanne",
    lotId: "AA-2024-190",
    currentBid: 139188,
    startingBid: 127213,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 45641,
    condition: "Excellent",
    bodyType: "Convertible",
    location: "Seattle, WA",
    timeLeft: "1d 2h",
    bids: 26,
    isAuction: true
  },
  {
    id: 191,
    title: "2023 Toyota Corolla",
    lotId: "AA-2024-191",
    currentBid: 33080,
    startingBid: 29638,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 15358,
    condition: "Good",
    bodyType: "Convertible",
    location: "Columbus, OH",
    timeLeft: "9h 5m",
    bids: 19,
    isAuction: true
  },
  {
    id: 192,
    title: "2020 Bentley Continental",
    lotId: "AA-2024-192",
    currentBid: 110824,
    startingBid: 104249,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 41574,
    condition: "Fair",
    bodyType: "Crossover",
    location: "San Francisco, CA",
    timeLeft: "3h 45m",
    bids: 38,
    isAuction: true
  },
  {
    id: 193,
    title: "2023 Bentley Flying Spur",
    lotId: "AA-2024-193",
    currentBid: 123704,
    startingBid: 115108,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 20321,
    condition: "Very Good",
    bodyType: "Wagon",
    location: "Fort Worth, TX",
    timeLeft: "23h 30m",
    bids: 57,
    isAuction: true
  },
  {
    id: 194,
    title: "2020 Lucid Air",
    lotId: "AA-2024-194",
    currentBid: 79782,
    startingBid: 68285,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 59172,
    condition: "Very Good",
    bodyType: "Luxury Sedan",
    location: "Virginia Beach, VA",
    timeLeft: "19h 55m",
    bids: 39,
    isAuction: true
  },
  {
    id: 195,
    title: "2023 Lamborghini Urus",
    lotId: "AA-2024-195",
    currentBid: 228680,
    startingBid: 196923,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 37956,
    condition: "Excellent",
    bodyType: "SUV",
    location: "Milwaukee, WI",
    timeLeft: "1d 6h",
    bids: 49,
    isAuction: true
  },
  {
    id: 196,
    title: "2018 Lamborghini Huracan",
    lotId: "AA-2024-196",
    currentBid: 173304,
    startingBid: 151195,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 25417,
    condition: "Good",
    bodyType: "Sedan",
    location: "Baltimore, MD",
    timeLeft: "21h 20m",
    bids: 45,
    isAuction: true
  },
  {
    id: 197,
    title: "2020 Subaru Ascent",
    lotId: "AA-2024-197",
    currentBid: 32439,
    startingBid: 27964,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 50674,
    condition: "Excellent",
    bodyType: "Convertible",
    location: "Seattle, WA",
    timeLeft: "15h 15m",
    bids: 41,
    isAuction: false
  },
  {
    id: 198,
    title: "2022 Infiniti QX60",
    lotId: "AA-2024-198",
    currentBid: 46746,
    startingBid: 42558,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 30760,
    condition: "Excellent",
    bodyType: "Sedan",
    location: "Fort Worth, TX",
    timeLeft: "18h 10m",
    bids: 49,
    isAuction: true
  },
  {
    id: 199,
    title: "2021 Rivian R1T",
    lotId: "AA-2024-199",
    currentBid: 75927,
    startingBid: 66547,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 9239,
    condition: "Very Good",
    bodyType: "Wagon",
    location: "Austin, TX",
    timeLeft: "10h 50m",
    bids: 43,
    isAuction: true
  },
  {
    id: 200,
    title: "2019 Rivian R1T",
    lotId: "AA-2024-200",
    currentBid: 66829,
    startingBid: 58415,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 26593,
    condition: "Excellent",
    bodyType: "SUV",
    location: "El Paso, TX",
    timeLeft: "8h 25m",
    bids: 32,
    isAuction: false
  },
  {
    id: 201,
    title: "2020 Audi A4",
    lotId: "AA-2024-201",
    currentBid: 44567,
    startingBid: 40622,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 44050,
    condition: "Excellent",
    bodyType: "Coupe",
    location: "Memphis, TN",
    timeLeft: "20h 30m",
    bids: 56,
    isAuction: true
  },
  {
    id: 202,
    title: "2018 Mercedes-Benz GLC",
    lotId: "AA-2024-202",
    currentBid: 37406,
    startingBid: 34446,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 52678,
    condition: "Fair",
    bodyType: "Convertible",
    location: "Baltimore, MD",
    timeLeft: "18h 10m",
    bids: 30,
    isAuction: true
  },
  {
    id: 203,
    title: "2021 Maserati GranTurismo",
    lotId: "AA-2024-203",
    currentBid: 63891,
    startingBid: 59411,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 51426,
    condition: "Good",
    bodyType: "Wagon",
    location: "Tucson, AZ",
    timeLeft: "2d 1h",
    bids: 12,
    isAuction: false
  },
  {
    id: 204,
    title: "2017 Ford Edge",
    lotId: "AA-2024-204",
    currentBid: 34274,
    startingBid: 31278,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 15877,
    condition: "Excellent",
    bodyType: "Van",
    location: "Milwaukee, WI",
    timeLeft: "17h 25m",
    bids: 26,
    isAuction: true
  },
  {
    id: 205,
    title: "2021 Ram Promaster",
    lotId: "AA-2024-205",
    currentBid: 30575,
    startingBid: 26467,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 39984,
    condition: "Fair",
    bodyType: "Coupe",
    location: "San Jose, CA",
    timeLeft: "15h 15m",
    bids: 17,
    isAuction: true
  },
  {
    id: 206,
    title: "2017 Mazda Mazda3",
    lotId: "AA-2024-206",
    currentBid: 28214,
    startingBid: 26090,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 45491,
    condition: "Excellent",
    bodyType: "Coupe",
    location: "Louisville, KY",
    timeLeft: "2h 30m",
    bids: 22,
    isAuction: true
  },
  {
    id: 207,
    title: "2017 Lincoln Nautilus",
    lotId: "AA-2024-207",
    currentBid: 35906,
    startingBid: 31369,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 37805,
    condition: "Good",
    bodyType: "Coupe",
    location: "Minneapolis, MN",
    timeLeft: "17h 25m",
    bids: 14,
    isAuction: true
  },
  {
    id: 208,
    title: "2020 Hyundai Tucson",
    lotId: "AA-2024-208",
    currentBid: 28765,
    startingBid: 27087,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 57048,
    condition: "Very Good",
    bodyType: "Truck",
    location: "Fresno, CA",
    timeLeft: "15h 15m",
    bids: 31,
    isAuction: false
  },
  {
    id: 209,
    title: "2020 Honda Accord",
    lotId: "AA-2024-209",
    currentBid: 24555,
    startingBid: 22098,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 17977,
    condition: "Fair",
    bodyType: "Coupe",
    location: "Sacramento, CA",
    timeLeft: "17h 25m",
    bids: 32,
    isAuction: false
  },
  {
    id: 210,
    title: "2019 Dodge Ram",
    lotId: "AA-2024-210",
    currentBid: 25702,
    startingBid: 22451,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 67906,
    condition: "Good",
    bodyType: "Convertible",
    location: "Colorado Springs, CO",
    timeLeft: "1d 8h",
    bids: 29,
    isAuction: false
  },
  {
    id: 211,
    title: "2021 GMC Terrain",
    lotId: "AA-2024-211",
    currentBid: 27300,
    startingBid: 24207,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 53960,
    condition: "Fair",
    bodyType: "Convertible",
    location: "Memphis, TN",
    timeLeft: "3h 45m",
    bids: 10,
    isAuction: false
  },
  {
    id: 212,
    title: "2018 Toyota Highlander",
    lotId: "AA-2024-212",
    currentBid: 22937,
    startingBid: 20164,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 66179,
    condition: "Good",
    bodyType: "Hatchback",
    location: "Houston, TX",
    timeLeft: "1h 15m",
    bids: 49,
    isAuction: false
  },
  {
    id: 213,
    title: "2022 Polestar 4",
    lotId: "AA-2024-213",
    currentBid: 52784,
    startingBid: 48437,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 31661,
    condition: "Very Good",
    bodyType: "Coupe",
    location: "Los Angeles, CA",
    timeLeft: "11h 35m",
    bids: 34,
    isAuction: true
  },
  {
    id: 214,
    title: "2020 Kia Optima",
    lotId: "AA-2024-214",
    currentBid: 24225,
    startingBid: 22376,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 34889,
    condition: "Fair",
    bodyType: "Crossover",
    location: "El Paso, TX",
    timeLeft: "22h 45m",
    bids: 45,
    isAuction: true
  },
  {
    id: 215,
    title: "2018 Cadillac CTS",
    lotId: "AA-2024-215",
    currentBid: 36812,
    startingBid: 33223,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 36452,
    condition: "Fair",
    bodyType: "Crossover",
    location: "Oklahoma City, OK",
    timeLeft: "4h 20m",
    bids: 55,
    isAuction: true
  },
  {
    id: 216,
    title: "2020 Lucid Air",
    lotId: "AA-2024-216",
    currentBid: 88238,
    startingBid: 82130,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 12039,
    condition: "Excellent",
    bodyType: "Hatchback",
    location: "Colorado Springs, CO",
    timeLeft: "18h 10m",
    bids: 10,
    isAuction: true
  },
  {
    id: 217,
    title: "2021 Polestar 4",
    lotId: "AA-2024-217",
    currentBid: 42709,
    startingBid: 36416,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 38778,
    condition: "Good",
    bodyType: "Truck",
    location: "Sacramento, CA",
    timeLeft: "23h 30m",
    bids: 35,
    isAuction: true
  },
  {
    id: 218,
    title: "2018 Jaguar E-PACE",
    lotId: "AA-2024-218",
    currentBid: 42141,
    startingBid: 36335,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 67802,
    condition: "Very Good",
    bodyType: "Sedan",
    location: "Seattle, WA",
    timeLeft: "2h 30m",
    bids: 33,
    isAuction: false
  },
  {
    id: 219,
    title: "2020 Infiniti Q60",
    lotId: "AA-2024-219",
    currentBid: 43069,
    startingBid: 38158,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 46702,
    condition: "Very Good",
    bodyType: "Crossover",
    location: "Tucson, AZ",
    timeLeft: "3h 45m",
    bids: 35,
    isAuction: false
  },
  {
    id: 220,
    title: "2022 Nissan 370Z",
    lotId: "AA-2024-220",
    currentBid: 21815,
    startingBid: 19493,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 50204,
    condition: "Fair",
    bodyType: "SUV",
    location: "Houston, TX",
    timeLeft: "1d 2h",
    bids: 42,
    isAuction: true
  },
  {
    id: 221,
    title: "2019 GMC Terrain",
    lotId: "AA-2024-221",
    currentBid: 26749,
    startingBid: 24812,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 68380,
    condition: "Fair",
    bodyType: "Convertible",
    location: "San Antonio, TX",
    timeLeft: "23h 30m",
    bids: 18,
    isAuction: true
  },
  {
    id: 222,
    title: "2021 Cadillac Escalade",
    lotId: "AA-2024-222",
    currentBid: 38596,
    startingBid: 33313,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 64941,
    condition: "Very Good",
    bodyType: "Wagon",
    location: "Jacksonville, FL",
    timeLeft: "3h 45m",
    bids: 17,
    isAuction: true
  },
  {
    id: 223,
    title: "2022 Lamborghini Urus",
    lotId: "AA-2024-223",
    currentBid: 223688,
    startingBid: 195471,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 45201,
    condition: "Very Good",
    bodyType: "Sedan",
    location: "San Diego, CA",
    timeLeft: "1d 8h",
    bids: 14,
    isAuction: false
  },
  {
    id: 224,
    title: "2017 Rolls-Royce Cullinan",
    lotId: "AA-2024-224",
    currentBid: 297596,
    startingBid: 279269,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 28755,
    condition: "Excellent",
    bodyType: "Convertible",
    location: "Nashville, TN",
    timeLeft: "2d 1h",
    bids: 28,
    isAuction: true
  },
  {
    id: 225,
    title: "2017 Genesis G80",
    lotId: "AA-2024-225",
    currentBid: 35851,
    startingBid: 32819,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 47214,
    condition: "Very Good",
    bodyType: "Sedan",
    location: "Nashville, TN",
    timeLeft: "12h 20m",
    bids: 39,
    isAuction: true
  },
  {
    id: 226,
    title: "2019 Dodge Charger",
    lotId: "AA-2024-226",
    currentBid: 26005,
    startingBid: 23209,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 43054,
    condition: "Good",
    bodyType: "Sedan",
    location: "Virginia Beach, VA",
    timeLeft: "1d 2h",
    bids: 52,
    isAuction: true
  },
  {
    id: 227,
    title: "2023 Land Rover Defender",
    lotId: "AA-2024-227",
    currentBid: 49246,
    startingBid: 45544,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 53565,
    condition: "Fair",
    bodyType: "Sedan",
    location: "Sacramento, CA",
    timeLeft: "15h 15m",
    bids: 50,
    isAuction: false
  },
  {
    id: 228,
    title: "2017 Audi Q8",
    lotId: "AA-2024-228",
    currentBid: 37817,
    startingBid: 34875,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 25816,
    condition: "Very Good",
    bodyType: "Coupe",
    location: "Phoenix, AZ",
    timeLeft: "4h 20m",
    bids: 49,
    isAuction: true
  },
  {
    id: 229,
    title: "2017 Maserati GranTurismo",
    lotId: "AA-2024-229",
    currentBid: 59672,
    startingBid: 54288,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 36120,
    condition: "Good",
    bodyType: "Van",
    location: "Long Beach, CA",
    timeLeft: "12h 20m",
    bids: 25,
    isAuction: false
  },
  {
    id: 230,
    title: "2021 Cadillac ATS",
    lotId: "AA-2024-230",
    currentBid: 31606,
    startingBid: 27211,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 56857,
    condition: "Fair",
    bodyType: "Hatchback",
    location: "Nashville, TN",
    timeLeft: "2d 3h",
    bids: 16,
    isAuction: true
  },
  {
    id: 231,
    title: "2021 Chrysler Aspen",
    lotId: "AA-2024-231",
    currentBid: 26588,
    startingBid: 23042,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 49490,
    condition: "Good",
    bodyType: "Sedan",
    location: "Long Beach, CA",
    timeLeft: "5h 10m",
    bids: 51,
    isAuction: false
  },
  {
    id: 232,
    title: "2020 Audi Q7",
    lotId: "AA-2024-232",
    currentBid: 35922,
    startingBid: 32916,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 19655,
    condition: "Fair",
    bodyType: "Van",
    location: "Philadelphia, PA",
    timeLeft: "16h 40m",
    bids: 46,
    isAuction: true
  },
  {
    id: 233,
    title: "2017 Rivian R1T",
    lotId: "AA-2024-233",
    currentBid: 64175,
    startingBid: 55707,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 53400,
    condition: "Excellent",
    bodyType: "Hatchback",
    location: "El Paso, TX",
    timeLeft: "1h 15m",
    bids: 8,
    isAuction: true
  },
  {
    id: 234,
    title: "2022 Chevrolet Tahoe",
    lotId: "AA-2024-234",
    currentBid: 23554,
    startingBid: 20455,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 58617,
    condition: "Fair",
    bodyType: "Wagon",
    location: "Fort Worth, TX",
    timeLeft: "1d 8h",
    bids: 56,
    isAuction: true
  },
  {
    id: 235,
    title: "2022 GMC Yukon",
    lotId: "AA-2024-235",
    currentBid: 30579,
    startingBid: 27382,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 39975,
    condition: "Fair",
    bodyType: "Crossover",
    location: "Austin, TX",
    timeLeft: "18h 10m",
    bids: 36,
    isAuction: true
  },
  {
    id: 236,
    title: "2019 Polestar 4",
    lotId: "AA-2024-236",
    currentBid: 33952,
    startingBid: 31136,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 30878,
    condition: "Fair",
    bodyType: "Truck",
    location: "Sacramento, CA",
    timeLeft: "11h 35m",
    bids: 24,
    isAuction: true
  },
  {
    id: 237,
    title: "2022 Mercedes-Benz A-Class",
    lotId: "AA-2024-237",
    currentBid: 57733,
    startingBid: 49189,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 33227,
    condition: "Excellent",
    bodyType: "Convertible",
    location: "El Paso, TX",
    timeLeft: "19h 55m",
    bids: 13,
    isAuction: true
  },
  {
    id: 238,
    title: "2020 Lamborghini Aventador",
    lotId: "AA-2024-238",
    currentBid: 169715,
    startingBid: 157131,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 64218,
    condition: "Good",
    bodyType: "Convertible",
    location: "Milwaukee, WI",
    timeLeft: "1h 15m",
    bids: 51,
    isAuction: true
  },
  {
    id: 239,
    title: "2022 Rivian R1S",
    lotId: "AA-2024-239",
    currentBid: 82818,
    startingBid: 76271,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 15495,
    condition: "Excellent",
    bodyType: "Crossover",
    location: "Milwaukee, WI",
    timeLeft: "9h 5m",
    bids: 44,
    isAuction: true
  },
  {
    id: 240,
    title: "2018 Rolls-Royce Wraith",
    lotId: "AA-2024-240",
    currentBid: 271161,
    startingBid: 240980,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 41444,
    condition: "Very Good",
    bodyType: "Truck",
    location: "Boston, MA",
    timeLeft: "1d 6h",
    bids: 55,
    isAuction: true
  },
  {
    id: 241,
    title: "2020 Tesla Model S",
    lotId: "AA-2024-241",
    currentBid: 52157,
    startingBid: 47953,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 31327,
    condition: "Excellent",
    bodyType: "Wagon",
    location: "Detroit, MI",
    timeLeft: "15h 15m",
    bids: 51,
    isAuction: true
  },
  {
    id: 242,
    title: "2023 Infiniti QX80",
    lotId: "AA-2024-242",
    currentBid: 38665,
    startingBid: 36504,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 54865,
    condition: "Good",
    bodyType: "Truck",
    location: "Louisville, KY",
    timeLeft: "1d 4h",
    bids: 40,
    isAuction: true
  },
  {
    id: 243,
    title: "2021 Hyundai Sonata",
    lotId: "AA-2024-243",
    currentBid: 29390,
    startingBid: 26220,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 41181,
    condition: "Very Good",
    bodyType: "SUV",
    location: "Nashville, TN",
    timeLeft: "2d 5h",
    bids: 25,
    isAuction: true
  },
  {
    id: 244,
    title: "2023 Lamborghini Huracan",
    lotId: "AA-2024-244",
    currentBid: 236003,
    startingBid: 207547,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 8805,
    condition: "Excellent",
    bodyType: "Hatchback",
    location: "Virginia Beach, VA",
    timeLeft: "4h 20m",
    bids: 51,
    isAuction: true
  },
  {
    id: 245,
    title: "2019 Toyota Prius",
    lotId: "AA-2024-245",
    currentBid: 27394,
    startingBid: 23677,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 51163,
    condition: "Good",
    bodyType: "Coupe",
    location: "San Jose, CA",
    timeLeft: "3h 45m",
    bids: 18,
    isAuction: false
  },
  {
    id: 246,
    title: "2019 Ford Edge",
    lotId: "AA-2024-246",
    currentBid: 31753,
    startingBid: 28418,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 62923,
    condition: "Very Good",
    bodyType: "Wagon",
    location: "Mesa, AZ",
    timeLeft: "7h 40m",
    bids: 19,
    isAuction: false
  },
  {
    id: 247,
    title: "2020 Ferrari 812",
    lotId: "AA-2024-247",
    currentBid: 194849,
    startingBid: 176098,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 9601,
    condition: "Excellent",
    bodyType: "Van",
    location: "Chicago, IL",
    timeLeft: "14h 30m",
    bids: 53,
    isAuction: true
  },
  {
    id: 248,
    title: "2018 Polestar 4",
    lotId: "AA-2024-248",
    currentBid: 40670,
    startingBid: 38349,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 54920,
    condition: "Good",
    bodyType: "SUV",
    location: "Denver, CO",
    timeLeft: "12h 20m",
    bids: 43,
    isAuction: true
  },
  {
    id: 249,
    title: "2017 Lincoln Aviator",
    lotId: "AA-2024-249",
    currentBid: 52971,
    startingBid: 47364,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 19414,
    condition: "Excellent",
    bodyType: "Luxury Sedan",
    location: "Raleigh, NC",
    timeLeft: "15h 15m",
    bids: 17,
    isAuction: false
  },
  {
    id: 250,
    title: "2023 Kia Telluride",
    lotId: "AA-2024-250",
    currentBid: 28175,
    startingBid: 25430,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 60264,
    condition: "Very Good",
    bodyType: "Truck",
    location: "Mesa, AZ",
    timeLeft: "1d 4h",
    bids: 42,
    isAuction: true
  },
  {
    id: 251,
    title: "2017 Bentley Bentayga",
    lotId: "AA-2024-251",
    currentBid: 145980,
    startingBid: 129319,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 29764,
    condition: "Excellent",
    bodyType: "Convertible",
    location: "Fort Worth, TX",
    timeLeft: "17h 25m",
    bids: 26,
    isAuction: false
  },
  {
    id: 252,
    title: "2019 Lucid Air",
    lotId: "AA-2024-252",
    currentBid: 71792,
    startingBid: 62218,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 21120,
    condition: "Very Good",
    bodyType: "SUV",
    location: "Oakland, CA",
    timeLeft: "15h 15m",
    bids: 13,
    isAuction: false
  },
  {
    id: 253,
    title: "2019 Polestar 3",
    lotId: "AA-2024-253",
    currentBid: 34549,
    startingBid: 32481,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 43791,
    condition: "Fair",
    bodyType: "Convertible",
    location: "Seattle, WA",
    timeLeft: "1d 6h",
    bids: 27,
    isAuction: true
  },
  {
    id: 254,
    title: "2020 Volkswagen Atlas",
    lotId: "AA-2024-254",
    currentBid: 34226,
    startingBid: 31893,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 18847,
    condition: "Excellent",
    bodyType: "Sedan",
    location: "Los Angeles, CA",
    timeLeft: "11h 35m",
    bids: 10,
    isAuction: false
  },
  {
    id: 255,
    title: "2017 Polestar 2",
    lotId: "AA-2024-255",
    currentBid: 48039,
    startingBid: 41415,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 15122,
    condition: "Very Good",
    bodyType: "Van",
    location: "San Antonio, TX",
    timeLeft: "5h 10m",
    bids: 33,
    isAuction: false
  },
  {
    id: 256,
    title: "2017 Kia Telluride",
    lotId: "AA-2024-256",
    currentBid: 21384,
    startingBid: 18688,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 10811,
    condition: "Fair",
    bodyType: "Crossover",
    location: "Detroit, MI",
    timeLeft: "23h 30m",
    bids: 45,
    isAuction: true
  },
  {
    id: 257,
    title: "2017 Ford Escape",
    lotId: "AA-2024-257",
    currentBid: 23694,
    startingBid: 22277,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 23077,
    condition: "Fair",
    bodyType: "Hatchback",
    location: "Oklahoma City, OK",
    timeLeft: "2d 5h",
    bids: 49,
    isAuction: true
  },
  {
    id: 258,
    title: "2017 Land Rover Range Rover",
    lotId: "AA-2024-258",
    currentBid: 40598,
    startingBid: 36618,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 19233,
    condition: "Fair",
    bodyType: "Wagon",
    location: "Long Beach, CA",
    timeLeft: "1h 15m",
    bids: 25,
    isAuction: true
  },
  {
    id: 259,
    title: "2017 Lucid Air",
    lotId: "AA-2024-259",
    currentBid: 57890,
    startingBid: 52280,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 22644,
    condition: "Fair",
    bodyType: "Van",
    location: "Kansas City, MO",
    timeLeft: "10h 50m",
    bids: 13,
    isAuction: false
  },
  {
    id: 260,
    title: "2021 Volkswagen Jetta",
    lotId: "AA-2024-260",
    currentBid: 27720,
    startingBid: 23871,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 46133,
    condition: "Very Good",
    bodyType: "Sedan",
    location: "Fort Worth, TX",
    timeLeft: "2d 1h",
    bids: 51,
    isAuction: false
  },
  {
    id: 261,
    title: "2020 Ram 2500",
    lotId: "AA-2024-261",
    currentBid: 37342,
    startingBid: 31787,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 42658,
    condition: "Excellent",
    bodyType: "Wagon",
    location: "Sacramento, CA",
    timeLeft: "6h 55m",
    bids: 20,
    isAuction: true
  },
  {
    id: 262,
    title: "2022 GMC Terrain",
    lotId: "AA-2024-262",
    currentBid: 34592,
    startingBid: 31446,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 48590,
    condition: "Very Good",
    bodyType: "Sedan",
    location: "Albuquerque, NM",
    timeLeft: "1d 4h",
    bids: 43,
    isAuction: true
  },
  {
    id: 263,
    title: "2023 Bentley Bentayga",
    lotId: "AA-2024-263",
    currentBid: 116678,
    startingBid: 108498,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 52380,
    condition: "Fair",
    bodyType: "Hatchback",
    location: "Milwaukee, WI",
    timeLeft: "2d 1h",
    bids: 34,
    isAuction: true
  },
  {
    id: 264,
    title: "2019 Cadillac XT5",
    lotId: "AA-2024-264",
    currentBid: 36141,
    startingBid: 31998,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 27971,
    condition: "Fair",
    bodyType: "Convertible",
    location: "Colorado Springs, CO",
    timeLeft: "6h 55m",
    bids: 24,
    isAuction: false
  },
  {
    id: 265,
    title: "2021 Genesis GV70",
    lotId: "AA-2024-265",
    currentBid: 35395,
    startingBid: 30853,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 62322,
    condition: "Good",
    bodyType: "Hatchback",
    location: "Jacksonville, FL",
    timeLeft: "22h 45m",
    bids: 14,
    isAuction: true
  },
  {
    id: 266,
    title: "2019 Lamborghini Urus",
    lotId: "AA-2024-266",
    currentBid: 245637,
    startingBid: 227131,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 22177,
    condition: "Excellent",
    bodyType: "Sedan",
    location: "San Antonio, TX",
    timeLeft: "6h 55m",
    bids: 12,
    isAuction: true
  },
  {
    id: 267,
    title: "2017 Rivian R1S",
    lotId: "AA-2024-267",
    currentBid: 71679,
    startingBid: 61292,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 51005,
    condition: "Excellent",
    bodyType: "Coupe",
    location: "Atlanta, GA",
    timeLeft: "10h 50m",
    bids: 39,
    isAuction: true
  },
  {
    id: 268,
    title: "2020 Lexus ES",
    lotId: "AA-2024-268",
    currentBid: 37163,
    startingBid: 33602,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 63311,
    condition: "Good",
    bodyType: "Truck",
    location: "Jacksonville, FL",
    timeLeft: "15h 15m",
    bids: 35,
    isAuction: true
  },
  {
    id: 269,
    title: "2022 Mercedes-Benz C-Class",
    lotId: "AA-2024-269",
    currentBid: 44059,
    startingBid: 41175,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 64063,
    condition: "Very Good",
    bodyType: "Coupe",
    location: "Oklahoma City, OK",
    timeLeft: "2d 5h",
    bids: 41,
    isAuction: true
  },
  {
    id: 270,
    title: "2019 Infiniti QX60",
    lotId: "AA-2024-270",
    currentBid: 41073,
    startingBid: 35126,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 65949,
    condition: "Excellent",
    bodyType: "Crossover",
    location: "Dallas, TX",
    timeLeft: "20h 30m",
    bids: 50,
    isAuction: true
  },
  {
    id: 271,
    title: "2017 Infiniti Q50",
    lotId: "AA-2024-271",
    currentBid: 40756,
    startingBid: 38484,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 41545,
    condition: "Very Good",
    bodyType: "SUV",
    location: "Sacramento, CA",
    timeLeft: "18h 10m",
    bids: 53,
    isAuction: true
  },
  {
    id: 272,
    title: "2019 Ram 1500",
    lotId: "AA-2024-272",
    currentBid: 30456,
    startingBid: 25890,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 62810,
    condition: "Very Good",
    bodyType: "Luxury Sedan",
    location: "Jacksonville, FL",
    timeLeft: "19h 55m",
    bids: 30,
    isAuction: false
  },
  {
    id: 273,
    title: "2018 Kia Sportage",
    lotId: "AA-2024-273",
    currentBid: 22273,
    startingBid: 20323,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 39214,
    condition: "Fair",
    bodyType: "SUV",
    location: "Dallas, TX",
    timeLeft: "22h 45m",
    bids: 54,
    isAuction: true
  },
  {
    id: 274,
    title: "2018 Subaru Ascent",
    lotId: "AA-2024-274",
    currentBid: 25097,
    startingBid: 22657,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 20456,
    condition: "Fair",
    bodyType: "Truck",
    location: "San Diego, CA",
    timeLeft: "2d 1h",
    bids: 51,
    isAuction: false
  },
  {
    id: 275,
    title: "2018 Lincoln MKZ",
    lotId: "AA-2024-275",
    currentBid: 38100,
    startingBid: 33226,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 8838,
    condition: "Fair",
    bodyType: "Hatchback",
    location: "Seattle, WA",
    timeLeft: "5h 10m",
    bids: 27,
    isAuction: true
  },
  {
    id: 276,
    title: "2021 Nissan Sentra",
    lotId: "AA-2024-276",
    currentBid: 28902,
    startingBid: 26428,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 40405,
    condition: "Excellent",
    bodyType: "Wagon",
    location: "Columbus, OH",
    timeLeft: "20h 30m",
    bids: 51,
    isAuction: false
  },
  {
    id: 277,
    title: "2019 Jaguar F-PACE",
    lotId: "AA-2024-277",
    currentBid: 35580,
    startingBid: 31962,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 57449,
    condition: "Fair",
    bodyType: "Sedan",
    location: "Denver, CO",
    timeLeft: "6h 55m",
    bids: 34,
    isAuction: true
  },
  {
    id: 278,
    title: "2023 Tesla Cybertruck",
    lotId: "AA-2024-278",
    currentBid: 52244,
    startingBid: 45270,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 41481,
    condition: "Very Good",
    bodyType: "Coupe",
    location: "New York, NY",
    timeLeft: "11h 35m",
    bids: 10,
    isAuction: false
  },
  {
    id: 279,
    title: "2022 Ram Chassis Cab",
    lotId: "AA-2024-279",
    currentBid: 41516,
    startingBid: 38180,
    photos: getRandomCarImages(5),
    year: 2022,
    mileage: 35643,
    condition: "Excellent",
    bodyType: "Crossover",
    location: "Raleigh, NC",
    timeLeft: "5h 10m",
    bids: 17,
    isAuction: true
  },
  {
    id: 280,
    title: "2018 Genesis G90",
    lotId: "AA-2024-280",
    currentBid: 27408,
    startingBid: 24954,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 47744,
    condition: "Fair",
    bodyType: "Convertible",
    location: "Chicago, IL",
    timeLeft: "17h 25m",
    bids: 54,
    isAuction: false
  },
  {
    id: 281,
    title: "2023 Porsche 911",
    lotId: "AA-2024-281",
    currentBid: 42515,
    startingBid: 38731,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 54103,
    condition: "Fair",
    bodyType: "Coupe",
    location: "Long Beach, CA",
    timeLeft: "8h 25m",
    bids: 46,
    isAuction: true
  },
  {
    id: 282,
    title: "2020 Rivian R1T",
    lotId: "AA-2024-282",
    currentBid: 74327,
    startingBid: 69003,
    photos: getRandomCarImages(5),
    year: 2020,
    mileage: 20425,
    condition: "Very Good",
    bodyType: "Crossover",
    location: "Fresno, CA",
    timeLeft: "14h 30m",
    bids: 13,
    isAuction: true
  },
  {
    id: 283,
    title: "2017 Ram 3500",
    lotId: "AA-2024-283",
    currentBid: 26699,
    startingBid: 23691,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 25280,
    condition: "Fair",
    bodyType: "Wagon",
    location: "San Diego, CA",
    timeLeft: "15h 15m",
    bids: 9,
    isAuction: true
  },
  {
    id: 284,
    title: "2019 Mercedes-Benz A-Class",
    lotId: "AA-2024-284",
    currentBid: 45229,
    startingBid: 42912,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 48367,
    condition: "Very Good",
    bodyType: "Luxury Sedan",
    location: "Dallas, TX",
    timeLeft: "7h 40m",
    bids: 22,
    isAuction: false
  },
  {
    id: 285,
    title: "2023 Lincoln Nautilus",
    lotId: "AA-2024-285",
    currentBid: 37763,
    startingBid: 33591,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 47934,
    condition: "Fair",
    bodyType: "SUV",
    location: "Charlotte, NC",
    timeLeft: "1d 2h",
    bids: 33,
    isAuction: true
  },
  {
    id: 286,
    title: "2021 Land Rover Discovery",
    lotId: "AA-2024-286",
    currentBid: 57275,
    startingBid: 51955,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 12557,
    condition: "Very Good",
    bodyType: "SUV",
    location: "Sacramento, CA",
    timeLeft: "8h 25m",
    bids: 21,
    isAuction: false
  },
  {
    id: 287,
    title: "2019 Polestar 2",
    lotId: "AA-2024-287",
    currentBid: 43182,
    startingBid: 37677,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 12344,
    condition: "Very Good",
    bodyType: "Truck",
    location: "Columbus, OH",
    timeLeft: "14h 30m",
    bids: 47,
    isAuction: false
  },
  {
    id: 288,
    title: "2018 Maserati Levante",
    lotId: "AA-2024-288",
    currentBid: 47105,
    startingBid: 41503,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 45577,
    condition: "Fair",
    bodyType: "Sedan",
    location: "Boston, MA",
    timeLeft: "18h 10m",
    bids: 52,
    isAuction: false
  },
  {
    id: 289,
    title: "2021 Cadillac XT5",
    lotId: "AA-2024-289",
    currentBid: 55077,
    startingBid: 51923,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 30732,
    condition: "Excellent",
    bodyType: "Van",
    location: "Fort Worth, TX",
    timeLeft: "12h 20m",
    bids: 17,
    isAuction: true
  },
  {
    id: 290,
    title: "2017 Kia Sportage",
    lotId: "AA-2024-290",
    currentBid: 22068,
    startingBid: 20942,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 60618,
    condition: "Very Good",
    bodyType: "Van",
    location: "Charlotte, NC",
    timeLeft: "7h 40m",
    bids: 32,
    isAuction: true
  },
  {
    id: 291,
    title: "2021 Volvo XC90",
    lotId: "AA-2024-291",
    currentBid: 35300,
    startingBid: 33035,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 47234,
    condition: "Fair",
    bodyType: "SUV",
    location: "Sacramento, CA",
    timeLeft: "23h 30m",
    bids: 34,
    isAuction: true
  },
  {
    id: 292,
    title: "2018 Mazda CX-5",
    lotId: "AA-2024-292",
    currentBid: 21262,
    startingBid: 18819,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 39706,
    condition: "Fair",
    bodyType: "Van",
    location: "Miami, FL",
    timeLeft: "1h 15m",
    bids: 43,
    isAuction: false
  },
  {
    id: 293,
    title: "2023 Maserati Quattroporte",
    lotId: "AA-2024-293",
    currentBid: 55372,
    startingBid: 49456,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 48808,
    condition: "Good",
    bodyType: "Convertible",
    location: "Jacksonville, FL",
    timeLeft: "14h 30m",
    bids: 45,
    isAuction: true
  },
  {
    id: 294,
    title: "2021 Ferrari 812",
    lotId: "AA-2024-294",
    currentBid: 117846,
    startingBid: 104710,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 25840,
    condition: "Fair",
    bodyType: "SUV",
    location: "Los Angeles, CA",
    timeLeft: "2h 30m",
    bids: 11,
    isAuction: true
  },
  {
    id: 295,
    title: "2019 Honda CR-V",
    lotId: "AA-2024-295",
    currentBid: 27948,
    startingBid: 24891,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 28897,
    condition: "Good",
    bodyType: "Coupe",
    location: "San Antonio, TX",
    timeLeft: "21h 20m",
    bids: 26,
    isAuction: true
  },
  {
    id: 296,
    title: "2019 Rolls-Royce Dawn",
    lotId: "AA-2024-296",
    currentBid: 198425,
    startingBid: 172371,
    photos: getRandomCarImages(5),
    year: 2019,
    mileage: 58505,
    condition: "Fair",
    bodyType: "Convertible",
    location: "Baltimore, MD",
    timeLeft: "6h 55m",
    bids: 30,
    isAuction: true
  },
  {
    id: 297,
    title: "2017 Kia Optima",
    lotId: "AA-2024-297",
    currentBid: 19182,
    startingBid: 16927,
    photos: getRandomCarImages(5),
    year: 2017,
    mileage: 32609,
    condition: "Fair",
    bodyType: "SUV",
    location: "Austin, TX",
    timeLeft: "16h 40m",
    bids: 11,
    isAuction: false
  },
  {
    id: 298,
    title: "2018 Rivian R1S",
    lotId: "AA-2024-298",
    currentBid: 66493,
    startingBid: 59000,
    photos: getRandomCarImages(5),
    year: 2018,
    mileage: 43862,
    condition: "Excellent",
    bodyType: "Convertible",
    location: "Charlotte, NC",
    timeLeft: "18h 10m",
    bids: 46,
    isAuction: true
  },
  {
    id: 299,
    title: "2023 Volkswagen Atlas",
    lotId: "AA-2024-299",
    currentBid: 31762,
    startingBid: 28019,
    photos: getRandomCarImages(5),
    year: 2023,
    mileage: 52746,
    condition: "Very Good",
    bodyType: "Truck",
    location: "Boston, MA",
    timeLeft: "1d 4h",
    bids: 19,
    isAuction: true
  },
  {
    id: 300,
    title: "2021 Ford Mustang",
    lotId: "AA-2024-300",
    currentBid: 39507,
    startingBid: 37058,
    photos: getRandomCarImages(5),
    year: 2021,
    mileage: 27492,
    condition: "Excellent",
    bodyType: "Sedan",
    location: "Raleigh, NC",
    timeLeft: "1d 8h",
    bids: 29,
    isAuction: false
  }
];

// Keep topAuctions export for backward compatibility, but filter for auctions only
export const topAuctions = mockItems.filter(item => item.isAuction);

export const aiRecommendations = [
  {
    id: 1,
    title: "2022 Tesla Model 3",
    price: 45000,
    image: getRandomCarImage(),
    year: 2022,
    mileage: 12000,
    location: "San Francisco, CA",
    matchScore: 95
  },
  {
    id: 2,
    title: "2021 Mercedes-Benz C-Class",
    price: 38500,
    image: getRandomCarImage(),
    year: 2021,
    mileage: 25000,
    location: "Chicago, IL",
    matchScore: 88
  },
  {
    id: 3,
    title: "2020 Lexus RX",
    price: 42500,
    image: getRandomCarImage(),
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
    image: '/cars/1.jpg',
    photos: getRandomCarImages(5),
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
    image: '/cars/2.jpg',
    photos: [
      '/cars/2.jpg',
      '/cars/3.jpg',
      '/cars/4.jpg',
      '/cars/5.jpg',
      '/cars/6.jpg'
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
    image: '/cars/10.jpg',
    photos: [
      '/cars/10.jpg',
      '/cars/11.jpg',
      '/cars/12.jpg',
      '/cars/13.jpg',
      '/cars/14.jpg'
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
    image: '/cars/18.jpg',
    photos: [
      '/cars/18.jpg',
      '/cars/19.jpg',
      '/cars/20.jpg',
      '/cars/21.jpg',
      '/cars/22.jpg'
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
    image: '/cars/26.jpg',
    photos: [
      '/cars/26.jpg',
      '/cars/27.jpg',
      '/cars/28.jpg',
      '/cars/29.jpg',
      '/cars/30.jpg'
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
    image: '/cars/34.jpg',
    photos: [
      '/cars/34.jpg',
      '/cars/35.jpg',
      '/cars/36.jpg',
      '/cars/37.jpg',
      '/cars/38.jpg'
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

// TODO-FX: Mock data for statistics page
// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/statistics/sales/monthly
// Expected Data: Array of monthly sales data points
export const monthlySales = [
  { month: 'Jan', sales: 850000, target: 900000 },
  { month: 'Feb', sales: 920000, target: 900000 },
  { month: 'Mar', sales: 880000, target: 900000 },
  { month: 'Apr', sales: 950000, target: 900000 },
  { month: 'May', sales: 1100000, target: 900000 },
  { month: 'Jun', sales: 1050000, target: 900000 },
  { month: 'Jul', sales: 1150000, target: 900000 },
  { month: 'Aug', sales: 1200000, target: 900000 },
  { month: 'Sep', sales: 1180000, target: 900000 },
  { month: 'Oct', sales: 1250000, target: 900000 },
  { month: 'Nov', sales: 1300000, target: 900000 },
  { month: 'Dec', sales: 1350000, target: 900000 }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/statistics/categories/distribution
// Expected Data: Array of category distribution data points
export const categoryDistribution = [
  { name: 'Sedan', value: 35, color: '#1890ff' },
  { name: 'SUV', value: 28, color: '#52c41a' },
  { name: 'Truck', value: 18, color: '#faad14' },
  { name: 'Hatchback', value: 12, color: '#f5222d' },
  { name: 'Convertible', value: 4, color: '#722ed1' },
  { name: 'Wagon', value: 3, color: '#13c2c2' }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/statistics/routes/dynamics
// Expected Data: Array of route dynamics data points
export const routeDynamics = [
  { route: 'USA → Georgia', volume: 45, growth: 12 },
  { route: 'Europe → Georgia', volume: 32, growth: 8 },
  { route: 'China → Georgia', volume: 28, growth: 15 },
  { route: 'Japan → Georgia', volume: 22, growth: 6 },
  { route: 'UAE → Georgia', volume: 18, growth: 10 },
  { route: 'Turkey → Georgia', volume: 15, growth: 4 }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/vehicles/{vehicleId}
// Expected Data: { id: number, title: string, year: number, location: string, price: number, timeLeft: string, activeBidders: number, images: string[], details: { engine: string, transmission: string, mileage: string, condition: string } }
export const getMockVehicleById = (id) => {
  const vehicle = mockItems.find(item => item.id === id);
  if (!vehicle) return null;

  return {
    id: vehicle.id,
    title: vehicle.title,
    year: vehicle.year,
    location: vehicle.location,
    price: vehicle.currentBid,
    timeLeft: vehicle.timeLeft,
    activeBidders: vehicle.bids,
    images: vehicle.photos,
    details: {
      engine: 'N/A',
      transmission: 'N/A',
      mileage: `${vehicle.mileage.toLocaleString()} miles`,
      condition: vehicle.condition
    }
  };
};

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/logistics/containers/active
// Expected Data: Array of active containers with status information
export const activeContainers = [
  {
    key: 'C-781',
    'Container ID': 'C-781',
    Status: 'In Transit',
    Origin: 'Miami, USA',
    Destination: 'Poti, Georgia',
    ETA: 'Oct 21, 2025'
  },
  {
    key: 'C-905',
    'Container ID': 'C-905',
    Status: 'In Transit',
    Origin: 'New York, USA',
    Destination: 'Rotterdam, Netherlands',
    ETA: 'Oct 25, 2025'
  },
  {
    key: 'C-1023',
    'Container ID': 'C-1023',
    Status: 'Loading',
    Origin: 'Los Angeles, USA',
    Destination: 'Tbilisi, Georgia',
    ETA: 'Oct 28, 2025'
  },
  {
    key: 'C-1147',
    'Container ID': 'C-1147',
    Status: 'Delivered',
    Origin: 'Houston, USA',
    Destination: 'Batumi, Georgia',
    ETA: 'Oct 18, 2025'
  }
];

// TODO-FX: Mock data for dashboard
// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/user/auctions
// Expected Data: Array of user's active bids
export const userBids = [
  {
    key: '1',
    lotId: 'AA-2024-001',
    title: '2020 Honda Civic',
    currentBid: 12500,
    myBid: 12200,
    timeLeft: '2h 15m',
    status: 'Leading'
  },
  {
    key: '2',
    lotId: 'AA-2024-002',
    title: '2019 Toyota Camry',
    currentBid: 15800,
    myBid: 15500,
    timeLeft: '4h 30m',
    status: 'Outbid'
  },
  {
    key: '3',
    lotId: 'AA-2024-005',
    title: '2022 Tesla Model 3',
    currentBid: 42500,
    myBid: 42000,
    timeLeft: '8h 12m',
    status: 'Leading'
  }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/user/delivery-timeline
// Expected Data: Array of delivery timeline items - reorganized as cards like dealer format
export const deliveryTimeline = [
  {
    key: '1',
    vehicle: '2022 Tesla Model 3',
    status: 'warehouse',
    progress: [
      { stage: 'warehouse', label: 'Vehicle delivered to port', completed: true, date: '2025-10-15' },
      { stage: 'georgia', label: 'Awaiting customs processing', completed: false, date: null },
      { stage: 'customs', label: 'Customs clearance', completed: false, date: null },
      { stage: 'delivered', label: 'Delivery completed', completed: false, date: null }
    ]
  },
  {
    key: '2',
    vehicle: '2020 Honda Civic',
    status: 'georgia',
    progress: [
      { stage: 'warehouse', label: 'Vehicle delivered to port', completed: true, date: '2025-10-12' },
      { stage: 'georgia', label: 'Customs clearance completed', completed: true, date: '2025-10-14' },
      { stage: 'customs', label: 'Preparing for inland transport', completed: false, date: null },
      { stage: 'delivered', label: 'Delivery completed', completed: false, date: null }
    ]
  },
  {
    key: '3',
    vehicle: '2019 Toyota Camry',
    status: 'customs',
    progress: [
      { stage: 'warehouse', label: 'Vehicle delivered to port', completed: true, date: '2025-10-10' },
      { stage: 'georgia', label: 'Customs clearance completed', completed: true, date: '2025-10-13' },
      { stage: 'customs', label: 'In transit to final destination', completed: true, date: '2025-10-16' },
      { stage: 'delivered', label: 'Delivery completed', completed: false, date: null }
    ]
  },
  {
    key: '4',
    vehicle: '2018 BMW X3',
    status: 'done',
    progress: [
      { stage: 'warehouse', label: 'Vehicle delivered to port', completed: true, date: '2025-10-08' },
      { stage: 'georgia', label: 'Customs clearance completed', completed: true, date: '2025-10-11' },
      { stage: 'customs', label: 'In transit to final destination', completed: true, date: '2025-10-14' },
      { stage: 'delivered', label: 'Delivery completed', completed: true, date: '2025-10-17' }
    ]
  }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/dealer/listings
// Expected Data: Array of dealer's vehicle listings
export const dealerListings = [
  {
    key: '1',
    title: '2023 BMW X5',
    status: 'Active',
    bids: 12,
    currentBid: 58000,
    endTime: '2025-10-20T14:00:00Z'
  },
  {
    key: '2',
    title: '2022 Mercedes GLE',
    status: 'Active',
    bids: 8,
    currentBid: 62000,
    endTime: '2025-10-22T16:00:00Z'
  },
  {
    key: '3',
    title: '2021 Audi Q7',
    status: 'Sold',
    bids: 15,
    finalPrice: 55000,
    endTime: '2025-10-15T12:00:00Z'
  }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/dealer/clients
// Expected Data: Array of dealer's clients
export const clients = [
  {
    key: '1',
    name: 'John Smith',
    email: 'john@example.com',
    vehicles: 3,
    lastActivity: '2025-10-15'
  },
  {
    key: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    vehicles: 1,
    lastActivity: '2025-10-14'
  },
  {
    key: '3',
    name: 'Mike Davis',
    email: 'mike@example.com',
    vehicles: 2,
    lastActivity: '2025-10-13'
  }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/dealer/stats
// Expected Data: Array of dealer's monthly statistics
export const dealerStats = [
  { month: 'Jan', sales: 125000, listings: 8 },
  { month: 'Feb', sales: 145000, listings: 12 },
  { month: 'Mar', sales: 138000, listings: 10 },
  { month: 'Apr', sales: 162000, listings: 15 },
  { month: 'May', sales: 178000, listings: 18 },
  { month: 'Jun', sales: 195000, listings: 20 }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/dealer/delivery-status
// Expected Data: Array of dealer's vehicle delivery statuses
export const dealerDeliveryStatus = [
  {
    key: '1',
    vehicle: '2023 BMW X5',
    buyer: 'John Smith',
    status: 'done',
    progress: [
      { stage: 'warehouse', label: 'Sent to Warehouse', completed: true, date: '2025-10-10' },
      { stage: 'georgia', label: 'Coming to Georgia', completed: true, date: '2025-10-12' },
      { stage: 'customs', label: 'In Customs', completed: true, date: '2025-10-15' },
      { stage: 'delivered', label: 'Delivered', completed: true, date: '2025-10-18' }
    ]
  },
  {
    key: '2',
    vehicle: '2022 Mercedes GLE',
    buyer: 'Sarah Johnson',
    status: 'customs',
    progress: [
      { stage: 'warehouse', label: 'Sent to Warehouse', completed: true, date: '2025-10-08' },
      { stage: 'georgia', label: 'Coming to Georgia', completed: true, date: '2025-10-11' },
      { stage: 'customs', label: 'In Customs', completed: true, date: '2025-10-14' },
      { stage: 'delivered', label: 'Delivered', completed: false, date: null }
    ]
  },
  {
    key: '3',
    vehicle: '2021 Audi Q7',
    buyer: 'Mike Davis',
    status: 'georgia',
    progress: [
      { stage: 'warehouse', label: 'Sent to Warehouse', completed: true, date: '2025-10-05' },
      { stage: 'georgia', label: 'Coming to Georgia', completed: true, date: '2025-10-09' },
      { stage: 'customs', label: 'In Customs', completed: false, date: null },
      { stage: 'delivered', label: 'Delivered', completed: false, date: null }
    ]
  },
  {
    key: '4',
    vehicle: '2020 Lexus RX',
    buyer: 'Anna Wilson',
    status: 'warehouse',
    progress: [
      { stage: 'warehouse', label: 'Sent to Warehouse', completed: true, date: '2025-10-16' },
      { stage: 'georgia', label: 'Coming to Georgia', completed: false, date: null },
      { stage: 'customs', label: 'In Customs', completed: false, date: null },
      { stage: 'delivered', label: 'Delivered', completed: false, date: null }
    ]
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
    photos: getRandomCarImages(5),
    image: getRandomCarImage(),
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
    photos: getRandomCarImages(5),
    image: getRandomCarImage(),
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
    photos: getRandomCarImages(5),
    image: getRandomCarImage(),
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
    photos: getRandomCarImages(5),
    image: getRandomCarImage(),
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
    photos: getRandomCarImages(5),
    image: getRandomCarImage(),
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
    photos: getRandomCarImages(5),
    image: getRandomCarImage(),
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
    userMessage: "რა ავტომობილებია ხელმისაწვდომი ლოს-ანჯელესში?",
    aiResponse: "მე ვიპოვე 23 ავტომობილი რომელიც ამჟამად ხელმისაწვდომია ლოს-ანჯელესში, CA. აქ არის ზოგიერთი მნიშვნელოვანი:\n\n• 2020 Honda Civic - $12,500 (45k მილი)\n• 2019 Toyota Camry - $15,800 (32k მილი)\n• 2021 Ford F-150 - $28,500 (28k მილი)\n\nგსურთ მეტი დეტალების ნახვა ან დაგეხმაროთ კონკრეტული ტიპის ავტომობილების მოძიებაში?",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    suggestions: ["მაჩვენეთ SUV-ები", "გაფილტრეთ 20,000$-ზე ნაკლები ფასით", "რომელი აუქციონია ყველაზე ახლოს?"]
  },
  {
    id: 'conv-2',
    userMessage: "როგორ მუშაობს გადაზიდვა?",
    aiResponse: "ჩვენ ვთანამშრომლობთ სანდო ტრანსპორტიორებთან უსაფრთხო ავტომობილების ტრანსპორტირებისთვის მსოფლიო მასშტაბით. აქ არის როგორ მუშაობს:\n\n1. **დაჯავშნა**: დაგეგმეთ მიღება აუქციონის მოგების შემდეგ\n2. **დაზღვევა**: სრული დაფარვა ტრანზიტის დროს\n3. **თვალთვალი**: რეალურ დროში GPS განახლებები ჩვენი პლატფორმის მეშვეობით\n4. **მიწოდება**: კარ-კარზე მომსახურება\n\nგადაზიდვის ღირებულება იწყება $800-დან შიდა მარშრუტებისთვის. საერთაშორისო გადაზიდვა ხელმისაწვდომია.",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    suggestions: ["გადაზიდვის ღირებულების გამოთვლა", "აქტიური მარშრუტების ნახვა", "პარტნიორი ტრანსპორტიორები"]
  },
  {
    id: 'conv-3',
    userMessage: "მოუყევით Tesla Model 3-ზე",
    aiResponse: "Tesla Model 3 არის ჩვენი ყველაზე პოპულარული ელექტრო ავტომობილებიდან ერთ-ერთი. ამჟამად ხელმისაწვდომია:\n\n• **ფასის დიაპაზონი**: $41,000 - $45,000\n• **მდგომარეობა**: შესანიშნავი (საშუალოდ 15k მილი)\n• **მახასიათებლები**: Autopilot, Supercharger წვდომა, 358 მილის დიაპაზონი\n• **მდებარეობა**: სან-ფრანცისკო, CA\n\nამ ავტომობილს აქვს 95% AI დამთხვევის ქულა ელექტრო ავტომობილების მოყვარულებისთვის. მზადაა დაუყოვნებელი გადაზიდვისთვის.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    suggestions: ["მსგავსი ელექტრო ავტომობილების ნახვა", "აუქციონის განრიგის შემოწმება", "გადაზიდვის გამოთვლა"]
  }
];

// TODO-FX: Mock AI assistant suggestions for new conversations
export const aiSuggestions = [
  "რა ავტომობილებია ხელმისაწვდომი ჩემთან ახლოს?",
  "როგორ მუშაობს აუქციონები?",
  "რა არის გადაზიდვის ღირებულება ევროპაში?",
  "მაჩვენეთ ელექტრო ავტომობილები",
  "დამეხმარეთ ოჯახის SUV-ის მოძიებაში"
];

// TODO-FX: Mock AI assistant quick responses
export const mockAIResponses = {
  welcome: "გამარჯობა! მე ვარ თქვენი AI ასისტენტი ავტომობილების აუქციონებისა და ლოგისტიკისთვის. შემიძლია დაგეხმაროთ ავტომობილების მოძიებაში, გადაზიდვის შესახებ კითხვებზე პასუხის გაცემაში ან აუქციონის პროცესში გაცნობაში. რას გსურთ გაიგოთ?",
  typing: "AI აკრეფავს...",
  error: "უკაცრავად, მე ახლა კავშირის პრობლემა მაქვს. გთხოვთ სცადეთ მოგვიანებით.",
  suggestions: ["მოუყევით ხელმისაწვდომ ავტომობილებზე", "როგორ მუშაობს გადაზიდვა?", "რა აუქციონებია მიმდინარე?"]
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

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/logistics/map-pins
// Expected Data: Array of container location objects with id and location properties
export const mockContainerMapData = [
  {
    id: 'CN-001',
    location: 'Port of Savannah, GA - Loading Complete'
  },
  {
    id: 'CN-002',
    location: 'At Sea, Mid-Atlantic Ocean'
  },
  {
    id: 'CN-003',
    location: 'Port of Charleston, SC - Awaiting Departure'
  },
  {
    id: 'CN-004',
    location: 'Mediterranean Sea, approaching Suez Canal'
  },
  {
    id: 'CN-005',
    location: 'Port of Jacksonville, FL - Customs Clearance'
  },
  {
    id: 'CN-006',
    location: 'Black Sea, en route to Batumi'
  },
  {
    id: 'CN-007',
    location: 'Port of Poti, Georgia - Unloading'
  },
  {
    id: 'CN-008',
    location: 'At Sea, Eastern Atlantic'
  }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/logistics/vehicles
// Expected Data: Array<{id: string, vehicleTitle: string, vin: string, auctionLocation: string, status: string}>
export const mockLogisticsVehicles = [
  {
    id: '1',
    vehicleTitle: '2023 Toyota Camry',
    vin: 'JN123456789012345',
    auctionLocation: 'Manheim, PA',
    status: 'at_auction'
  },
  {
    id: '2',
    vehicleTitle: '2022 Honda Civic',
    vin: 'JH234567890123456',
    auctionLocation: 'Copart, TX',
    status: 'pending_pickup'
  },
  {
    id: '3',
    vehicleTitle: '2021 Ford F-150',
    vin: 'JF345678901234567',
    auctionLocation: 'IAA, FL',
    status: 'in_transit'
  },
  {
    id: '4',
    vehicleTitle: '2020 BMW X3',
    vin: 'JB456789012345678',
    auctionLocation: 'Manheim, CA',
    status: 'delivered'
  },
  {
    id: '5',
    vehicleTitle: '2019 Chevrolet Malibu',
    vin: 'JC567890123456789',
    auctionLocation: 'Copart, GA',
    status: 'cancelled'
  }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/crm/dispatch/active (Used by DispatchDashboard, CrmPipeline, and CrmCalendar)
// Expected Data: Array with 16 parameters as per Technical Specification §1
// Create dynamic dates for payment timers (Spec §2)
const now = new Date();
const future24h = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
const past24h = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

export const mockDispatchVehicles = [
  // Complete 16-parameter structure as per Technical Specification §1
  {
    id: '1',
    vin: '1HGCM82633A123456',
    auction: 'Copart',
    vehicleInfo: {
      year: 2022,
      make: 'Honda',
      model: 'Accord'
    },
    pickupDate: '2025-10-20',
    deliveryDate: future24h.toISOString(), // Pending payment - Yellow timer (24h countdown)
    warehouse: 'Miami, FL',
    driverNumber: 'DRV001',
    route: 'Miami to Atlanta',
    price: 8500,
    paymentStatus: 'pending', // Yellow timer state
    isPaid: false,
    photoStatus: 'complete',
    timeAdded: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    comment: 'Clean vehicle, ready for transport',
    isAppointmentR1: false,
    isAppointmentR2: true,
    dispatchStatus: 'active',
    pipelineStatus: 'new_dispatch' // New dispatches in pipeline
  },
  {
    id: '2',
    vin: 'JH4KA8260MC000000',
    auction: 'IAA',
    vehicleInfo: {
      year: 2021,
      make: 'Acura',
      model: 'TLX'
    },
    pickupDate: '2025-10-18',
    deliveryDate: past24h.toISOString(), // Overdue payment - Red status
    warehouse: 'Los Angeles, CA',
    driverNumber: 'DRV002',
    route: 'Los Angeles to Phoenix',
    price: 12500,
    paymentStatus: 'overdue', // Red status
    isPaid: false,
    photoStatus: 'complete',
    timeAdded: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    comment: 'Luxury vehicle, requires careful handling',
    isAppointmentR1: true,
    isAppointmentR2: false,
    dispatchStatus: 'active'
  },
  {
    id: '3',
    vin: '1FTFW1ET8DFC12345',
    auction: 'Manheim',
    vehicleInfo: {
      year: 2023,
      make: 'Ford',
      model: 'F-150'
    },
    pickupDate: '2025-10-15',
    deliveryDate: '2025-10-16', // Already delivered - Green status
    warehouse: 'Dallas, TX',
    driverNumber: 'DRV003',
    route: 'Dallas to Houston',
    price: 32000,
    paymentStatus: 'paid', // Green status
    isPaid: true,
    photoStatus: 'complete',
    timeAdded: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    comment: 'Heavy duty truck, successful delivery',
    isAppointmentR1: false,
    isAppointmentR2: false,
    dispatchStatus: 'completed'
  },
  {
    id: '4',
    vin: 'WBA3A5C51DF123456',
    auction: 'Copart',
    vehicleInfo: {
      year: 2020,
      make: 'BMW',
      model: '330i'
    },
    pickupDate: '2025-10-19',
    deliveryDate: '2025-10-19', // Payment on hold - Orange status
    warehouse: 'Chicago, IL',
    driverNumber: 'DRV004',
    route: 'Chicago to Detroit',
    price: 18500,
    paymentStatus: 'on_hold', // Orange status - Police tape styling
    isPaid: false,
    photoStatus: 'pending',
    timeAdded: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    comment: 'Payment verification in progress',
    isAppointmentR1: false,
    isAppointmentR2: true,
    dispatchStatus: 'on_hold'
  },
  {
    id: '5',
    vin: '5NPEB4ACXDH123456',
    auction: 'IAA',
    vehicleInfo: {
      year: 2024,
      make: 'Hyundai',
      model: 'Sonata'
    },
    pickupDate: '2025-10-21',
    deliveryDate: future24h.toISOString(), // Another pending payment - Yellow timer
    warehouse: 'Seattle, WA',
    driverNumber: 'DRV005',
    route: 'Seattle to Portland',
    price: 15200,
    paymentStatus: 'pending', // Yellow timer state
    isPaid: false,
    photoStatus: 'complete',
    timeAdded: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    comment: 'Recent model, excellent condition',
    isAppointmentR1: true,
    isAppointmentR2: false,
    dispatchStatus: 'active',
    pipelineStatus: 'new_dispatch' // New dispatches in pipeline
  },
  // Additional vehicles for Pipeline Kanban demo
  {
    id: '6',
    vin: '5NPEB4ACXJH678901',
    auction: 'Copart',
    vehicleInfo: {
      year: 2018,
      make: 'Hyundai',
      model: 'Sonata'
    },
    pickupDate: '2025-10-19',
    deliveryDate: future24h.toISOString(),
    warehouse: 'Dallas, TX',
    driverNumber: 'DRV006',
    route: 'Dallas to Houston',
    price: 9800,
    paymentStatus: 'pending',
    isPaid: false,
    photoStatus: 'complete',
    timeAdded: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    comment: 'In transit to warehouse',
    isAppointmentR1: false,
    isAppointmentR2: true,
    dispatchStatus: 'active',
    pipelineStatus: 'in_transit' // Currently in transit
  },
  {
    id: '7',
    vin: '1C4BJWEG2HL345678',
    auction: 'IAA',
    vehicleInfo: {
      year: 2017,
      make: 'Jeep',
      model: 'Wrangler'
    },
    pickupDate: '2025-10-16',
    deliveryDate: past24h.toISOString(),
    warehouse: 'Denver, CO',
    driverNumber: 'DRV007',
    route: 'Denver to Salt Lake City',
    price: 21800,
    paymentStatus: 'pending',
    isPaid: false,
    photoStatus: 'complete',
    timeAdded: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    comment: 'At warehouse for quality control',
    isAppointmentR1: true,
    isAppointmentR2: false,
    dispatchStatus: 'on_hold',
    pipelineStatus: 'at_warehouse' // At warehouse QC
  },
  {
    id: '8',
    vin: 'WBA3A5C50DF456789',
    auction: 'Manheim',
    vehicleInfo: {
      year: 2013,
      make: 'BMW',
      model: '328i'
    },
    pickupDate: '2025-10-14',
    deliveryDate: past24h.toISOString(),
    warehouse: 'Boston, MA',
    driverNumber: 'DRV008',
    route: 'Boston to New York',
    price: 12400,
    paymentStatus: 'pending',
    isPaid: false,
    photoStatus: 'complete',
    timeAdded: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    comment: 'Completed transport, awaiting payment',
    isAppointmentR1: false,
    isAppointmentR2: true,
    dispatchStatus: 'completed',
    pipelineStatus: 'pending_payment' // Ready for payment
  }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/crm/dispatch/archive
// Expected Data: Array<{id: string, vin: string, auction: string, vehicleInfo: object, pickupDate: string, deliveryDate: string, warehouse: string, driverNumber: string, route: string, price: number, paymentStatus: 'paid', photoStatus: string, timeAdded: string, comment: string, isAppointmentR1: boolean, isAppointmentR2: boolean, dispatchStatus: 'completed'}>
export const mockArchivedDispatches = [
  // Paid and completed dispatches
  {
    id: 'archived-1',
    vin: '2HGFC2F59KH123456',
    auction: 'Copart',
    vehicleInfo: {
      year: 2019,
      make: 'Honda',
      model: 'Civic'
    },
    pickupDate: '2025-09-15',
    deliveryDate: '2025-09-16',
    warehouse: 'Miami, FL',
    driverNumber: 'DRV006',
    route: 'Miami to Orlando',
    price: 7800,
    paymentStatus: 'paid',
    isPaid: true,
    photoStatus: 'complete',
    timeAdded: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    comment: 'Completed dispatch, payment received',
    isAppointmentR1: false,
    isAppointmentR2: false,
    dispatchStatus: 'completed'
  },
  {
    id: 'archived-2',
    vin: '1N4AL3AP5FC123456',
    auction: 'IAA',
    vehicleInfo: {
      year: 2015,
      make: 'Nissan',
      model: 'Altima'
    },
    pickupDate: '2025-09-10',
    deliveryDate: '2025-09-11',
    warehouse: 'Dallas, TX',
    driverNumber: 'DRV007',
    route: 'Dallas to Austin',
    price: 6200,
    paymentStatus: 'paid',
    isPaid: true,
    photoStatus: 'complete',
    timeAdded: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days ago
    comment: 'Archived paid dispatch',
    isAppointmentR1: true,
    isAppointmentR2: false,
    dispatchStatus: 'completed'
  },
  {
    id: 'archived-3',
    vin: 'KM8J33A45KU123456',
    auction: 'Manheim',
    vehicleInfo: {
      year: 2019,
      make: 'Hyundai',
      model: 'Kona'
    },
    pickupDate: '2025-08-20',
    deliveryDate: '2025-08-21',
    warehouse: 'Los Angeles, CA',
    driverNumber: 'DRV008',
    route: 'Los Angeles to San Diego',
    price: 9500,
    paymentStatus: 'paid',
    isPaid: true,
    photoStatus: 'complete',
    timeAdded: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
    comment: 'Old completed dispatch',
    isAppointmentR1: false,
    isAppointmentR2: true,
    dispatchStatus: 'completed'
  }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/crm/dispatch/cancelled
// Expected Data: Array<{id: string, vin: string, auction: string, vehicleInfo: object, pickupDate: string, deliveryDate: string, warehouse: string, driverNumber: string, route: string, price: number, paymentStatus: string, photoStatus: string, timeAdded: string, comment: string, isAppointmentR1: boolean, isAppointmentR2: boolean, dispatchStatus: 'cancelled', cancellationReason: string}>
export const mockCancelledDispatches = [
  // Cancelled dispatches with cancellation reasons
  {
    id: 'cancelled-1',
    vin: '1FAHP2F8XJG123456',
    auction: 'Copart',
    vehicleInfo: {
      year: 2018,
      make: 'Ford',
      model: 'Focus'
    },
    pickupDate: '2025-10-05',
    deliveryDate: '2025-10-05', // Cancelled before delivery
    warehouse: 'Chicago, IL',
    driverNumber: 'DRV009',
    route: 'Chicago to Milwaukee',
    price: 5500,
    paymentStatus: 'cancelled',
    isPaid: false,
    photoStatus: 'pending',
    timeAdded: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    comment: 'Dispatch cancelled due to buyer withdrawal',
    isAppointmentR1: false,
    isAppointmentR2: false,
    dispatchStatus: 'cancelled',
    cancellationReason: 'Buyer withdrew from purchase'
  },
  {
    id: 'cancelled-2',
    vin: '3VWLA7AJ9FM123456',
    auction: 'IAA',
    vehicleInfo: {
      year: 2015,
      make: 'Volkswagen',
      model: 'Jetta'
    },
    pickupDate: '2025-09-28',
    deliveryDate: '2025-09-29',
    warehouse: 'Seattle, WA',
    driverNumber: 'DRV010',
    route: 'Seattle to Portland',
    price: 4200,
    paymentStatus: 'cancelled',
    isPaid: false,
    photoStatus: 'complete',
    timeAdded: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    comment: 'Weather-related cancellation',
    isAppointmentR1: true,
    isAppointmentR2: false,
    dispatchStatus: 'cancelled',
    cancellationReason: 'Severe weather conditions prevented pickup'
  },
  {
    id: 'cancelled-3',
    vin: 'JM1BL1U79C1234567',
    auction: 'Manheim',
    vehicleInfo: {
      year: 2012,
      make: 'Mazda',
      model: 'Mazda3'
    },
    pickupDate: '2025-09-20',
    deliveryDate: '2025-09-20',
    warehouse: 'Phoenix, AZ',
    driverNumber: 'DRV011',
    route: 'Phoenix to Tucson',
    price: 3800,
    paymentStatus: 'cancelled',
    isPaid: false,
    photoStatus: 'pending',
    timeAdded: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
    comment: 'Vehicle condition issues discovered',
    isAppointmentR1: false,
    isAppointmentR2: true,
    dispatchStatus: 'cancelled',
    cancellationReason: 'Mechanical issues discovered during inspection'
  }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/drivers/{driverNumber}/stats
// Expected Data: { totalDispatches: number, totalCancels: number, redCircles: number, history: Array }
export const getMockDriverStats = (driverNumber) => {
  // driverNumber parameter is used below in the mock implementation
  void driverNumber; // Parameter will be used when implementing the real API call
  return {
    totalDispatches: 45,
    totalCancels: 2,
    redCircles: 1,
    history: [
      {
        date: '2025-10-15',
        action: 'dispatch_completed',
        details: 'VIN123 - Copart to Miami'
      },
      {
        date: '2025-10-10',
        action: 'dispatch_cancelled',
        details: 'VIN456 - Weather delay'
      }
    ]
  };
};

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/crm/statistics
// Query Params: ?range=today | weekly | monthly | yearly
// Expected Data: Comprehensive CRM statistics with KPIs, trends, breakdowns, totalRevenue, and totalExpenses
export const mockCrmStats = {
  // Core Dispatch Metrics
  dispatchesToday: 47,
  dispatchesWeekly: 312,
  dispatchesMonthly: 1289,
  dispatchesYearly: 15467,

  // Revenue Metrics
  revenueToday: 23450,
  revenueWeekly: 156890,
  revenueMonthly: 642500,
  revenueYearly: 7710000,
  totalRevenue: 7710000, // All-time revenue
  avgRevenuePerDispatch: 498,

  // Expense Metrics
  totalExpenses: 2313000, // All-time expenses (~30% of revenue for realistic profit margin)

  // Financial Metrics
  pendingPaymentTotal: 145230,
  overduePayments: 45600,
  collectedThisMonth: 587670,

  // Operational Metrics
  activeDrivers: 89,
  vehiclesInTransit: 156,
  avgDeliveryTimeDays: 4.2,
  onTimeDeliveryRate: 94.7,
  customerSatisfactionScore: 4.6,

  // Status Breakdowns
  dispatchStatusBreakdown: {
    completed: 15467,
    inTransit: 156,
    delayed: 23,
    cancelled: 45
  },

  // Geographic Data (Top 5 destinations)
  topDestinations: [
    { country: 'Georgia', dispatches: 4523, revenue: 2156789 },
    { country: 'USA', dispatches: 3876, revenue: 1893456 },
    { country: 'Germany', dispatches: 2341, revenue: 1234567 },
    { country: 'France', dispatches: 1987, revenue: 987654 },
    { country: 'UK', dispatches: 1654, revenue: 876543 }
  ],

  // Monthly Trend Data (Last 12 months for chart)
  monthlyTrends: [
    { month: 'Jan', dispatches: 1245, revenue: 589000 },
    { month: 'Feb', dispatches: 1189, revenue: 562000 },
    { month: 'Mar', dispatches: 1356, revenue: 641000 },
    { month: 'Apr', dispatches: 1423, revenue: 673000 },
    { month: 'May', dispatches: 1589, revenue: 752000 },
    { month: 'Jun', dispatches: 1678, revenue: 794000 },
    { month: 'Jul', dispatches: 1723, revenue: 815000 },
    { month: 'Aug', dispatches: 1689, revenue: 799000 },
    { month: 'Sep', dispatches: 1654, revenue: 783000 },
    { month: 'Oct', dispatches: 1721, revenue: 814000 },
    { month: 'Nov', dispatches: 1789, revenue: 847000 },
    { month: 'Dec', dispatches: 1821, revenue: 862000 }
  ],

  // Performance Indicators
  performanceMetrics: {
    dispatchSuccessRate: 97.3,
    averageProcessingTime: '2.5 hours',
    driverUtilizationRate: 87.4,
    customerRetentionRate: 92.1,
    profitMargin: 23.4
  },

  // Recent Activity Summary
  recentActivity: {
    dispatchesLast24h: 47,
    paymentsProcessedToday: 23,
    newCustomersThisWeek: 12,
    issuesResolvedToday: 8
  }
};

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/crm/messages/conversations
// Expected Data: Array<{id: string, userName: string, lastMessage: string, timestamp: string}>
export const mockMessageConversations = [
  {
    id: '1',
    userName: 'Dispatcher (John)',
    lastMessage: 'Please check VIN ABC123DEF456G, it is on hold.',
    timestamp: '2025-10-17T10:00:00Z'
  },
  {
    id: '2',
    userName: 'Driver (Mike)',
    lastMessage: 'Vehicle delivered successfully',
    timestamp: '2025-10-17T09:30:00Z'
  },
  {
    id: '3',
    userName: 'Warehouse Manager (Sarah)',
    lastMessage: 'Need to schedule pickup for tomorrow',
    timestamp: '2025-10-17T08:45:00Z'
  },
  {
    id: '4',
    userName: 'Customer Service (Anna)',
    lastMessage: 'Client inquiry about VIN XYZ789GHI012J',
    timestamp: '2025-10-16T16:20:00Z'
  }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/crm/messages/{conversationId}
// Expected Data: Array<{id: string, author: string, content: string, timestamp: string}>
export const getMockMessages = (conversationId) => {
  const messageThreads = {
    '1': [
      {
        id: 'msg1_1',
        author: 'Dispatcher (John)',
        content: 'Please check VIN ABC123DEF456G, it is on hold.',
        timestamp: '2025-10-17T10:00:00Z'
      },
      {
        id: 'msg1_2',
        author: 'Current User',
        content: 'I will check it immediately. What seems to be the issue?',
        timestamp: '2025-10-17T10:02:00Z'
      },
      {
        id: 'msg1_3',
        author: 'Dispatcher (John)',
        content: 'The payment is pending. Client needs to make payment first.',
        timestamp: '2025-10-17T10:05:00Z'
      }
    ],
    '2': [
      {
        id: 'msg2_1',
        author: 'Driver (Mike)',
        content: 'Vehicle delivered successfully to the warehouse.',
        timestamp: '2025-10-17T09:30:00Z'
      },
      {
        id: 'msg2_2',
        author: 'Current User',
        content: 'Great! Any issues during transport?',
        timestamp: '2025-10-17T09:35:00Z'
      },
      {
        id: 'msg2_3',
        author: 'Driver (Mike)',
        content: 'No issues. Everything went smoothly.',
        timestamp: '2025-10-17T09:40:00Z'
      }
    ],
    '3': [
      {
        id: 'msg3_1',
        author: 'Warehouse Manager (Sarah)',
        content: 'Need to schedule pickup for VIN DEF456GHI789K tomorrow morning.',
        timestamp: '2025-10-17T08:45:00Z'
      },
      {
        id: 'msg3_2',
        author: 'Current User',
        content: 'Confirmed. I\'ll arrange the transport.',
        timestamp: '2025-10-17T08:50:00Z'
      }
    ],
    '4': [
      {
        id: 'msg4_1',
        author: 'Customer Service (Anna)',
        content: 'Client inquiry about VIN XYZ789GHI012J - wants to know status.',
        timestamp: '2025-10-16T16:20:00Z'
      },
      {
        id: 'msg4_2',
        author: 'Current User',
        content: 'Vehicle is in transit, ETA tomorrow afternoon.',
        timestamp: '2025-10-16T16:25:00Z'
      },
      {
        id: 'msg4_3',
        author: 'Customer Service (Anna)',
        content: 'Thank you, I\'ll update the client.',
        timestamp: '2025-10-16T16:30:00Z'
      }
    ]
  };

  return messageThreads[conversationId] || [];
};

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/crm/admin/system-health
// Expected Data: Array<{ id: string, scriptName: string, lastRun: string, status: 'healthy' | 'failed' | 'running' }>
export const mockSystemMonitors = [
  { id: '1', scriptName: 'Python Auction Monitor (Copart)', lastRun: '2025-10-18T10:30:00Z', status: 'healthy' },
  { id: '2', scriptName: 'Python Auction Monitor (IAAI)', lastRun: '2025-10-18T10:25:00Z', status: 'running' },
  { id: '3', scriptName: 'Nightly Payment Sync', lastRun: '2025-10-17T23:00:00Z', status: 'failed' }
];

// TODO-FX: Replace with real API call.
// API Endpoint: POST /api/payments/echeck/submit
// Request Body: { dispatchId: string, amount: number, bankName: string, routingNumber: string, accountNumber: string }
// Expected Response: { success: true, transactionId: string, paymentStatus: 'processing' }

// Kanban Pipeline Columns for CRM Dispatch Pipeline View
// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/crm/pipeline/columns
// Expected Data: Object with column definitions for Kanban board
export const mockPipelineColumns = {
  'col-1': { id: 'col-1', title: 'New Dispatches', status: 'new_dispatch' },
  'col-2': { id: 'col-2', title: 'In Transit', status: 'in_transit' },
  'col-3': { id: 'col-3', title: 'At Warehouse (QC)', status: 'at_warehouse' },
  'col-4': { id: 'col-4', title: 'Pending Payment', status: 'pending_payment' }
};

// System Roles for Task Management System
// These represent the official roles defined in the Technical Specification
export const SYSTEM_ROLES = [
  { key: 'role_1', label: 'Auto Transport Dispatcher' },
  { key: 'role_2', label: 'Logistics/Shipping Coordinator' },
  { key: 'role_3', label: 'Payment' },
  { key: 'admin', label: 'Admin' }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/crm/tasks
// Expected Data: Array<{id: string, title: string, status: 'pending' | 'completed', assignedTo: string, relatedVin: string, createdBy: string, dueDate: string}>
export const mockTasks = [
  { id: '1', title: 'QC Issue: Redo Delivery Photos', status: 'pending', assignedTo: 'role_2', relatedVin: 'VIN123456789012345', createdBy: 'role_3', dueDate: '2025-10-20' },
  { id: '2', title: 'Verify Appointment at Auction', status: 'pending', assignedTo: 'role_1', relatedVin: 'VIN987654321098765', createdBy: 'role_2', dueDate: '2025-10-21' },
  { id: '3', title: 'Payment Hold Investigation - Damaged Vehicle', status: 'pending', assignedTo: 'role_2', relatedVin: 'VIN555666777888999', createdBy: 'role_3', dueDate: '2025-10-19' },
  { id: '4', title: 'Update Driver Assignment', status: 'completed', assignedTo: 'role_1', relatedVin: 'VIN111222333444555', createdBy: 'role_2', dueDate: '2025-10-18' }
];

// TODO-FX: GET /api/crm/dispatch/{id}/tasks
// TODO-FX: POST /api/crm/tasks

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/crm/dispatch/{dispatchId}/expenses
// Expected Data: Array<{id: string, type: 'storage' | 'fedex' | 'other', description: string, amount: number, date: string}>
//
// TODO-FX: Replace with real API call.
// API Endpoint: POST /api/crm/dispatch/{dispatchId}/expenses
// Payload: { type: string, description: string, amount: number }
// Expected Response: { id: string, ...expenseData }
//
// TODO-FX: Replace with real API call.
// API Endpoint: DELETE /api/crm/expenses/{expenseId}

const mockExpensesData = {
  '1': [
    {
      id: 'exp1_1',
      type: 'storage',
      description: 'Warehouse storage - 3 days',
      amount: 150.00,
      date: '2025-10-15'
    },
    {
      id: 'exp1_2',
      type: 'fedex',
      description: 'Express shipping to destination',
      amount: 85.50,
      date: '2025-10-16'
    }
  ],
  '2': [
    {
      id: 'exp2_1',
      type: 'storage',
      description: 'Extended storage - vehicle delay',
      amount: 275.00,
      date: '2025-10-14'
    },
    {
      id: 'exp2_2',
      type: 'other',
      description: 'Customs clearance fee',
      amount: 120.00,
      date: '2025-10-15'
    },
    {
      id: 'exp2_3',
      type: 'fedex',
      description: 'Priority overnight delivery',
      amount: 125.75,
      date: '2025-10-16'
    }
  ],
  '3': [
    {
      id: 'exp3_1',
      type: 'fedex',
      description: 'Standard ground shipping',
      amount: 65.00,
      date: '2025-10-17'
    }
  ],
  // Default empty array for dispatches with no expenses
  'default': []
};

export const getMockExpenses = (dispatchId) => {
  return mockExpensesData[dispatchId] || mockExpensesData['default'];
};

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/crm/users
// Expected Data: Array<{id: string, name: string, email: string, baseRole: string, customPermissions: string[]}>
export const mockCrmUsers = [
  { id: 'u1', name: 'Role 2 (Logistics)', email: 'logistics@example.com', baseRole: 'role_2', customPermissions: ['CAN_VIEW_DISPATCH', 'CAN_EDIT_DISPATCH', 'CAN_VIEW_KANBAN'] },
  { id: 'u2', name: 'Role 3 (Payment)', email: 'payment@example.com', baseRole: 'role_3', customPermissions: ['CAN_VIEW_DISPATCH', 'CAN_HOLD_PAYMENT', 'CAN_VIEW_EXPENSES'] }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/crm/permissions
// Expected Data: Array<{key: string, title: string}>
export const mockMasterPermissionList = [
  { key: 'CAN_VIEW_DISPATCH', title: 'View Dispatches' },
  { key: 'CAN_CREATE_DISPATCH', title: 'Create Dispatches' },
  { key: 'CAN_EDIT_DISPATCH', title: 'Edit Dispatches' },
  { key: 'CAN_HOLD_PAYMENT', title: 'Hold Payment (Role 3)' },
  { key: 'CAN_VIEW_KANBAN', title: 'View Kanban Board' },
  { key: 'CAN_VIEW_EXPENSES', title: 'View Expenses' },
  { key: 'CAN_VIEW_ADMIN_USERS', title: 'View User Management' }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/crm/role-permissions
// Expected Data: Record<string, string[]>
export const mockRolePermissionMap = {
  'role_1': ['CAN_VIEW_DISPATCH'],
  'role_2': ['CAN_VIEW_DISPATCH', 'CAN_CREATE_DISPATCH', 'CAN_EDIT_DISPATCH', 'CAN_VIEW_KANBAN'],
  'role_3': ['CAN_VIEW_DISPATCH', 'CAN_HOLD_PAYMENT', 'CAN_VIEW_EXPENSES']
};

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/public/track/{vin}
// Expected Data: { vin: '...', status: 'in_transit', estimatedDelivery: '...', photos: { pickup: [...], delivery: [...] }, details: { make: '...', model: '...' }, history: [{ date: '...', status: 'at_auction' }, { date: '...', status: 'in_transit' }] }
// This endpoint MUST be public, but only return a *limited, client-safe* subset of the full dispatch data.
export const getPublicTrackingData = (vin) => {
  // Mock client-safe tracking data based on VIN
  const mockTrackingData = {
    '1FTFW1ET4DFC12345': {
      vin: '1FTFW1ET4DFC12345',
      status: 'in_transit',
      estimatedDelivery: '2025-10-20',
      photos: {
        pickup: getRandomCarImages(3),
        delivery: []
      },
      details: {
        make: 'Ford',
        model: 'F-150'
      },
      history: [
        { date: '2025-10-15', status: 'at_auction' },
        { date: '2025-10-16', status: 'in_transit' }
      ]
    },
    'JH4KA8260MC000000': {
      vin: 'JH4KA8260MC000000',
      status: 'at_warehouse',
      estimatedDelivery: '2025-10-18',
      photos: {
        pickup: getRandomCarImages(2),
        delivery: getRandomCarImages(1)
      },
      details: {
        make: 'Acura',
        model: 'TLX'
      },
      history: [
        { date: '2025-10-14', status: 'at_auction' },
        { date: '2025-10-15', status: 'in_transit' },
        { date: '2025-10-16', status: 'at_warehouse' }
      ]
    },
    '1G1JC5444R7252367': {
      vin: '1G1JC5444R7252367',
      status: 'delivered',
      estimatedDelivery: '2025-10-16',
      photos: {
        pickup: getRandomCarImages(3),
        delivery: getRandomCarImages(2)
      },
      details: {
        make: 'Chevrolet',
        model: 'Cavalier'
      },
      history: [
        { date: '2025-10-13', status: 'at_auction' },
        { date: '2025-10-14', status: 'in_transit' },
        { date: '2025-10-15', status: 'at_warehouse' },
        { date: '2025-10-16', status: 'delivered' }
      ]
    }
  };

  // Return mock data for known VINs, or null for unknown VINs (simulating not found)
  return mockTrackingData[vin] || null;
};

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/auctions
// Expected Data: Array<{key: string, label: string}>
export const mockAuctions = [
  { key: 'copart', label: 'Copart' },
  { key: 'iaai', label: 'IAAI' },
  { key: 'manheim', label: 'Manheim' }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/warehouses
// Expected Data: Array<{key: string, label: string}>
export const mockWarehouses = [
  { key: 'poti', label: 'Poti, GE' },
  { key: 'tbilisi', label: 'Tbilisi, GE' },
  { key: 'batumi', label: 'Batumi, GE' }
];