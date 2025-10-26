// calculate dispatches by auction
export function calculateRoutesStatistics(data) {
  console.log(data);
  const dispatchesByRoute = data.reduce((acc, vehicle) => {
    const route = vehicle.route;
    if (!acc[route]) {
      acc[route] = 0;
    }
    acc[route]++;
    return acc;
  }, {});

  return dispatchesByRoute;
}

// calculate dispatches by auction
export function calculateAuctionStatistics(data) {
  const dispatchesByAuction = data.reduce((acc, vehicle) => {
    const auction = vehicle.auction;
    if (!acc[auction]) {
      acc[auction] = 0;
    }
    acc[auction]++;
    return acc;
  }, {});

  return dispatchesByAuction;
}

// calculate driver's number and route
export function calculateDriverStatistics(data) {
  const driverMap = data.reduce((acc, vehicle) => {
    const driverNumber = vehicle.driverNumber;
    const route = vehicle.route;

    if (!acc[driverNumber]) {
      acc[driverNumber] = [];
    }

    // Find if this route already exists for this driver
    const existingRoute = acc[driverNumber].find(
      (item) => item.route === route
    );

    if (existingRoute) {
      // Increment count if route exists
      existingRoute.count++;
    } else {
      // Add new route with count 1
      acc[driverNumber].push({ route, count: 1 });
    }

    return acc;
  }, {});

  // Convert to array format
  const driverStatistics = Object.keys(driverMap).map((driverNumber) => ({
    driverNumber,
    routes: driverMap[driverNumber],
  }));

  return driverStatistics;
}
