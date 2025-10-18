const fs = require('fs');

// Read the existing file
const content = fs.readFileSync('src/mocks/_mockData.js', 'utf8');

// Extract existing mockItems
const existingItems = content.match(/export const mockItems = \[([\s\S]*?)\];/)[1];

// Parse existing items count
const existingCount = (existingItems.match(/\{/g) || []).length;

console.log(`Found ${existingCount} existing cars`);

// Generate new cars
const carMakes = [
  'Honda', 'Toyota', 'Ford', 'BMW', 'Mercedes-Benz', 'Tesla', 'Audi', 'Lexus',
  'Nissan', 'Chevrolet', 'Jeep', 'Mazda', 'Subaru', 'Volkswagen', 'Hyundai',
  'Kia', 'Volvo', 'Acura', 'Infiniti', 'Lincoln', 'Cadillac', 'GMC', 'Ram',
  'Dodge', 'Chrysler', 'Jaguar', 'Land Rover', 'Porsche', 'Ferrari', 'Lamborghini',
  'Bentley', 'Rolls-Royce', 'Maserati', 'Genesis', 'Polestar', 'Rivian', 'Lucid'
];

const carModels = {
  'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V', 'Odyssey'],
  'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', '4Runner', 'Prius'],
  'Ford': ['F-150', 'Explorer', 'Escape', 'Mustang', 'Edge', 'Bronco'],
  'BMW': ['3 Series', '5 Series', 'X3', 'X5', 'X7', 'i3', 'i8'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLE', 'GLC', 'S-Class', 'A-Class'],
  'Tesla': ['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'],
  'Audi': ['A4', 'A6', 'Q5', 'Q7', 'Q8', 'e-tron'],
  'Lexus': ['RX', 'ES', 'GX', 'LX', 'NX', 'UX'],
  'Nissan': ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Titan', '370Z'],
  'Chevrolet': ['Silverado', 'Equinox', 'Traverse', 'Tahoe', 'Corvette', 'Camaro'],
  'Jeep': ['Grand Cherokee', 'Wrangler', 'Cherokee', 'Compass', 'Renegade'],
  'Mazda': ['CX-5', 'CX-9', 'Mazda3', 'Mazda6', 'MX-5 Miata'],
  'Subaru': ['Outback', 'Forester', 'Crosstrek', 'Ascent', 'Impreza'],
  'Volkswagen': ['Golf', 'Jetta', 'Tiguan', 'Atlas', 'Passat'],
  'Hyundai': ['Tucson', 'Santa Fe', 'Sonata', 'Elantra', 'Kona'],
  'Kia': ['Sportage', 'Sorento', 'Telluride', 'Optima', 'Soul'],
  'Volvo': ['XC60', 'XC90', 'S60', 'V60', 'C40'],
  'Acura': ['RDX', 'MDX', 'TLX', 'ILX', 'NSX'],
  'Infiniti': ['QX60', 'QX80', 'Q50', 'QX50', 'Q60'],
  'Lincoln': ['Navigator', 'Aviator', 'Corsair', 'Nautilus', 'MKZ'],
  'Cadillac': ['XT5', 'XT6', 'Escalade', 'CTS', 'ATS'],
  'GMC': ['Yukon', 'Sierra', 'Terrain', 'Acadia', 'Canyon'],
  'Ram': ['1500', '2500', '3500', 'Promaster', 'Chassis Cab'],
  'Dodge': ['Ram', 'Charger', 'Challenger', 'Durango', 'Journey'],
  'Chrysler': ['Pacifica', '300', 'Voyager', 'Aspen'],
  'Jaguar': ['F-PACE', 'E-PACE', 'XF', 'XJ', 'F-TYPE'],
  'Land Rover': ['Range Rover', 'Discovery', 'Defender', 'Velar', 'Evoque'],
  'Porsche': ['Cayenne', 'Macan', 'Panamera', '911', 'Boxster'],
  'Ferrari': ['488', '812', 'F8', 'SF90', 'Roma'],
  'Lamborghini': ['Huracan', 'Urus', 'Aventador', 'Gallardo'],
  'Bentley': ['Continental', 'Bentayga', 'Flying Spur', 'Mulsanne'],
  'Rolls-Royce': ['Ghost', 'Dawn', 'Wraith', 'Cullinan'],
  'Maserati': ['Levante', 'Ghibli', 'Quattroporte', 'GranTurismo'],
  'Genesis': ['G70', 'G80', 'G90', 'GV70', 'GV80'],
  'Polestar': ['2', '3', '4'],
  'Rivian': ['R1T', 'R1S'],
  'Lucid': ['Air']
};

const bodyTypes = ['Sedan', 'SUV', 'Truck', 'Hatchback', 'Wagon', 'Convertible', 'Coupe', 'Van', 'Crossover', 'Luxury Sedan'];
const conditions = ['Excellent', 'Very Good', 'Good', 'Fair'];
const cities = [
  'Los Angeles, CA', 'New York, NY', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
  'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
  'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC',
  'San Francisco, CA', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Boston, MA',
  'El Paso, TX', 'Nashville, TN', 'Detroit, MI', 'Oklahoma City, OK', 'Portland, OR',
  'Las Vegas, NV', 'Memphis, TN', 'Louisville, KY', 'Baltimore, MD', 'Milwaukee, WI',
  'Albuquerque, NM', 'Tucson, AZ', 'Fresno, CA', 'Sacramento, CA', 'Mesa, AZ',
  'Kansas City, MO', 'Atlanta, GA', 'Long Beach, CA', 'Colorado Springs, CO', 'Raleigh, NC',
  'Miami, FL', 'Virginia Beach, VA', 'Omaha, NE', 'Oakland, CA', 'Minneapolis, MN'
];

const timeLeftOptions = [
  '1h 15m', '2h 30m', '3h 45m', '4h 20m', '5h 10m', '6h 55m', '7h 40m', '8h 25m',
  '9h 5m', '10h 50m', '11h 35m', '12h 20m', '13h 45m', '14h 30m', '15h 15m',
  '16h 40m', '17h 25m', '18h 10m', '19h 55m', '20h 30m', '21h 20m', '22h 45m',
  '23h 30m', '1d 2h', '1d 4h', '1d 6h', '1d 8h', '2d 1h', '2d 3h', '2d 5h'
];

function generateCarPrice(make, model, year, mileage, condition) {
  const basePrices = {
    'Tesla': 35000, 'Porsche': 45000, 'Ferrari': 150000, 'Lamborghini': 200000,
    'Bentley': 120000, 'Rolls-Royce': 250000, 'Maserati': 55000, 'Jaguar': 40000,
    'Land Rover': 45000, 'BMW': 35000, 'Mercedes-Benz': 38000, 'Audi': 32000,
    'Lexus': 30000, 'Acura': 28000, 'Infiniti': 32000, 'Lincoln': 35000,
    'Cadillac': 33000, 'Volvo': 32000, 'Genesis': 29000, 'Polestar': 35000,
    'Honda': 18000, 'Toyota': 19000, 'Nissan': 17000, 'Mazda': 20000,
    'Subaru': 21000, 'Hyundai': 17000, 'Kia': 16500, 'Volkswagen': 18500,
    'Ford': 22000, 'Chevrolet': 21000, 'GMC': 24000, 'Ram': 25000,
    'Dodge': 20000, 'Chrysler': 19000, 'Jeep': 23000, 'Lucid': 65000,
    'Rivian': 55000
  };

  let basePrice = basePrices[make] || 20000;

  // Year adjustment (newer = higher price)
  const yearAdjustment = (year - 2015) * 1000;
  basePrice += yearAdjustment;

  // Mileage adjustment (lower mileage = higher price)
  const mileageAdjustment = Math.max(0, (100000 - mileage) * 0.1);
  basePrice += mileageAdjustment;

  // Condition adjustment
  const conditionMultiplier = condition === 'Excellent' ? 1.1 :
                             condition === 'Very Good' ? 1.0 :
                             condition === 'Good' ? 0.9 : 0.8;
  basePrice *= conditionMultiplier;

  // Add some randomness (±10%)
  const randomFactor = 0.9 + Math.random() * 0.2;
  basePrice *= randomFactor;

  return Math.round(basePrice);
}

function generateNewCars(startId, count) {
  const newCars = [];

  for (let i = 0; i < count; i++) {
    const id = startId + i;
    const make = carMakes[Math.floor(Math.random() * carMakes.length)];
    const models = carModels[make] || ['Model'];
    const model = models[Math.floor(Math.random() * models.length)];
    const year = 2017 + Math.floor(Math.random() * 7); // 2017-2023
    const mileage = Math.floor(Math.random() * 60000) + 8500; // 8500-68500
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const bodyType = bodyTypes[Math.floor(Math.random() * bodyTypes.length)];
    const location = cities[Math.floor(Math.random() * cities.length)];
    const timeLeft = timeLeftOptions[Math.floor(Math.random() * timeLeftOptions.length)];
    const bids = Math.floor(Math.random() * 50) + 8; // 8-57 bids
    const isAuction = Math.random() > 0.3; // 70% auctions, 30% catalog

    const currentBid = generateCarPrice(make, model, year, mileage, condition);
    const startingBid = Math.round(currentBid * (0.85 + Math.random() * 0.1)); // 85-95% of current

    newCars.push({
      id,
      title: `${year} ${make} ${model}`,
      lotId: `AA-2024-${String(id).padStart(3, '0')}`,
      currentBid,
      startingBid,
      year,
      mileage,
      condition,
      bodyType,
      location,
      timeLeft,
      bids,
      isAuction
    });
  }

  return newCars;
}

// Generate 280 new cars (to reach ~300 total)
const newCars = generateNewCars(21, 280);

// Format as JavaScript objects
const formattedCars = newCars.map(car => `  {
    id: ${car.id},
    title: "${car.title}",
    lotId: "${car.lotId}",
    currentBid: ${car.currentBid},
    startingBid: ${car.startingBid},
    photos: getRandomCarImages(5),
    year: ${car.year},
    mileage: ${car.mileage},
    condition: "${car.condition}",
    bodyType: "${car.bodyType}",
    location: "${car.location}",
    timeLeft: "${car.timeLeft}",
    bids: ${car.bids},
    isAuction: ${car.isAuction}
  }`).join(',\n');

// Replace the mockItems export
const updatedContent = content.replace(
  /export const mockItems = \[([\s\S]*?)\];/,
  `export const mockItems = [${existingItems.trim()},\n${formattedCars}\n];`
);

fs.writeFileSync('src/mocks/_mockData.js', updatedContent);
console.log(`Added ${newCars.length} new cars. Total cars: ${existingCount + newCars.length}`);
