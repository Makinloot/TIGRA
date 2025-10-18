/**
 * CMS Utility Functions
 *
 * This module contains utility functions for the CRM system operations,
 * including VIN validation, vehicle data parsing, and dispatch management.
 */

/**
 * Validates a VIN (Vehicle Identification Number) format
 * @param {string} vin - The VIN to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateVIN = (vin) => {
  if (!vin || typeof vin !== 'string') return false;

  // VIN must be exactly 17 characters
  if (vin.length !== 17) return false;

  // VIN should contain only letters and numbers (no I, O, Q)
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
  return vinRegex.test(vin);
};

/**
 * Auto-parses a VIN to extract vehicle information
 * @param {string} vin - The VIN to parse
 * @returns {Promise<{make: string, model: string, year: string}>} - Vehicle information
 */
export const autoParseVIN = async (vin) => {
  if (!validateVIN(vin)) {
    throw new Error('Invalid VIN format');
  }

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock VIN parsing logic (in real implementation, this would call a VIN lookup API)
  // For demo purposes, we'll use some mock data based on VIN patterns
  const mockVehicles = {
    '1FTFW1ET4DFC12345': { make: 'Ford', model: 'F-150', year: '2013' },
    'JH4KA8260MC000000': { make: 'Acura', model: 'Legend', year: '1991' },
    '1G1JC5444R7252367': { make: 'Chevrolet', model: 'Cavalier', year: '1994' },
    'WDBRF40J74A123456': { make: 'Mercedes-Benz', model: 'C-Class', year: '2004' },
    'JF1GD29604G500000': { make: 'Subaru', model: 'Impreza', year: '2004' }
  };

  // Check if we have mock data for this VIN
  if (mockVehicles[vin]) {
    return mockVehicles[vin];
  }

  // For unknown VINs, generate mock data based on VIN pattern
  const yearCode = vin.charAt(9);
  const yearMap = {
    'A': '2010', 'B': '2011', 'C': '2012', 'D': '2013', 'E': '2014',
    'F': '2015', 'G': '2016', 'H': '2017', 'J': '2018', 'K': '2019',
    'L': '2020', 'M': '2021', 'N': '2022', 'P': '2023', 'R': '2024'
  };

  const year = yearMap[yearCode] || '2020';

  // Mock make/model based on WMI (World Manufacturer Identifier)
  const wmi = vin.substring(0, 3);
  const makeModelMap = {
    '1FT': { make: 'Ford', model: 'F-150' },
    'JH4': { make: 'Acura', model: 'TLX' },
    '1G1': { make: 'Chevrolet', model: 'Malibu' },
    'WDB': { make: 'Mercedes-Benz', model: 'E-Class' },
    'JF1': { make: 'Subaru', model: 'Forester' },
    'WMW': { make: 'BMW', model: '3 Series' },
    '2T1': { make: 'Toyota', model: 'Camry' },
    '3VW': { make: 'Volkswagen', model: 'Jetta' }
  };

  const vehicleInfo = makeModelMap[wmi] || { make: 'Unknown', model: 'Unknown' };

  return {
    make: vehicleInfo.make,
    model: vehicleInfo.model,
    year: year
  };
};

/**
 * Holds a payment for a dispatch
 * @param {string|number} dispatchId - The dispatch ID to hold payment for
 * @returns {Promise<void>}
 */
export const holdPayment = async (dispatchId) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // In real implementation, this would call:
  // PUT /api/dispatches/{dispatchId}/hold-payment

  console.log(`Payment held for dispatch ${dispatchId}`);

  // TODO-FX: Replace with real API call.
  // API Endpoint: PUT /api/dispatches/{dispatchId}/hold-payment
  // Expected Response: { success: true, message: string }
};

/**
 * Cancels a dispatch with reason and comment
 * @param {string|number} dispatchId - The dispatch ID to cancel
 * @param {string} reason - The cancellation reason
 * @param {string} comment - Additional comment for cancellation
 * @returns {Promise<void>}
 */
export const cancelDispatch = async (dispatchId, reason, comment) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In real implementation, this would call:
  // PUT /api/dispatches/{dispatchId}/cancel
  // And physically move the item to the 'cancelled' collection

  console.log(`Dispatch ${dispatchId} cancelled. Reason: ${reason}, Comment: ${comment}`);

  // TODO-FX: Replace with real API call.
  // API Endpoint: PUT /api/dispatches/{dispatchId}/cancel
  // Request Body: { reason: string, comment: string }
  // Expected Response: { success: true, message: string }
  // Note: This function physically moves items to the 'cancelled' collection
};

/**
 * Converts VINs in text content to clickable links
 * @param {string} content - The text content to process
 * @returns {string} - Content with VINs converted to links
 */
export const linkifyVINs = (content) => {
  if (!content || typeof content !== 'string') return content;

  // Regular expression to match VINs (17 characters, letters/numbers, no I,O,Q)
  const vinRegex = /\b[A-HJ-NPR-Z0-9]{17}\b/gi;

  return content.replace(vinRegex, (vin) => {
    // In real implementation, this would link to a VIN lookup page
    // For now, we'll create a placeholder link
    return `<a href="/vehicle/${vin}" class="vin-link" data-vin="${vin}">${vin}</a>`;
  });
};