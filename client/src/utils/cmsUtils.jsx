import React from 'react';
import { Link } from 'react-router-dom';

// TODO-FX: Implement VIN auto-linking for messaging system (Spec §3)
export const linkifyVINs = (text) => {
  if (!text) return text;

  // Regex to match 17-character VIN codes (alphanumeric, no I, O, Q)
  const vinRegex = /\b[A-HJ-NPR-Z0-9]{17}\b/g;

  // Split text by VIN matches and replace each VIN with a Link component
  const parts = text.split(vinRegex);

  // Get all VIN matches
  const vinMatches = text.match(vinRegex) || [];

  // Build the result by interleaving text parts and VIN links
  const result = [];
  let vinIndex = 0;

  for (let i = 0; i < parts.length; i++) {
    // Add text part
    if (parts[i]) {
      result.push(parts[i]);
    }

    // Add VIN link if there's a match for this position
    if (vinIndex < vinMatches.length && i < parts.length - 1) {
      const vin = vinMatches[vinIndex];
      result.push(
        <Link
          key={`vin-${vin}-${vinIndex}`}
          to={`/crm/dispatch?vin=${vin}`}
          style={{ color: '#1890ff', textDecoration: 'underline' }}
        >
          {vin}
        </Link>
      );
      vinIndex++;
    }
  }

  // If only one part and no VINs found, return original text
  if (result.length === 1 && typeof result[0] === 'string') {
    return result[0];
  }

  // Return array of React elements and strings
  return result;
};

// TODO-BIZ: Implement 17-char cleanup and validation (Spec §3)
export const validateVIN = (vin) => {
  if (!vin) return false;

  // Basic 17-character check
  if (vin.length !== 17) return false;

  // TODO-BIZ: Implement full VIN validation algorithm (check digits, etc.)
  // For now, just check length and that it contains only valid characters
  const vinRegex = /^[A-HJ-NPR-Z0-9]+$/i;
  return vinRegex.test(vin);
  // Note: vin parameter is used in the regex test above
};

// TODO-BIZ: Implement API call to parse Make, Model, Year (Spec §3)
export const autoParseVIN = async (_vin) => {
  void _vin; // Parameter will be used when implementing the real API call
  // TODO-BIZ: Replace with real API call to VIN decoding service
  // API Endpoint: POST /api/vin/decode
  // Payload: { vin: string }
  // Expected Response: { make: string, model: string, year: number }

  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        make: 'Toyota',
        model: 'Camry',
        year: 2023
      });
    }, 500);
  });
};

// TODO-BIZ: Implement 'Hold Payment' logic, apply 'Police Tape' pattern (Spec §5.2)
export const holdPayment = (dispatchId) => {
  // TODO-BIZ: Implement payment hold logic
  // - Update dispatch status to 'payment_held'
  // - Apply visual 'police tape' styling
  // - Send notification to relevant parties
  // - Log audit trail

  console.log(`Holding payment for dispatch: ${dispatchId}`);

  // TODO-BIZ: Replace with real API call
  // API Endpoint: PUT /api/dispatches/{dispatchId}/hold-payment
  // Expected Response: Updated dispatch object
};

// TODO-BIZ: Implement cancel logic, 'Red Circle' assignment (Spec §5.1)
export const cancelDispatch = (dispatchId, reason) => {
  // TODO-BIZ: Implement dispatch cancellation
  // - Update dispatch status to 'cancelled'
  // - Assign 'Red Circle' to driver (if applicable)
  // - Send cancellation notifications
  // - Log audit trail with reason
  // - This function MUST call 'PUT /api/crm/dispatch/{id}/cancel' which physically moves the item to the 'cancelled' collection

  console.log(`Cancelling dispatch: ${dispatchId} for reason: ${reason}`);

  // TODO-BIZ: Replace with real API call
  // API Endpoint: PUT /api/crm/dispatch/{dispatchId}/cancel
  // Payload: { reason: string, cancelledBy: string, timestamp: Date }
  // Expected Response: Updated dispatch object
};
