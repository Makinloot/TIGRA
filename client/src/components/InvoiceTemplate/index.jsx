import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const InvoiceTemplate = forwardRef(({ dispatch }, ref) => {
  if (!dispatch) {
    return null;
  }

  const currentDate = new Date().toLocaleDateString();
  const invoiceNumber = `INV-${dispatch.id}-${Date.now()}`;

  return (
    <div
      ref={ref}
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ddd',
        backgroundColor: '#fff',
        fontSize: '14px',
        lineHeight: '1.4'
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        borderBottom: '2px solid #1890ff',
        paddingBottom: '20px'
      }}>
        <div>
          <h1 style={{
            margin: '0',
            color: '#1890ff',
            fontSize: '28px',
            fontWeight: 'bold'
          }}>
            TIGRA Logistics
          </h1>
          <p style={{ margin: '5px 0', color: '#666' }}>
            Professional Vehicle Transport Services
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h2 style={{
            margin: '0',
            color: '#333',
            fontSize: '20px'
          }}>
            {t('invoice')}
          </h2>
          <p style={{ margin: '5px 0', color: '#666' }}>
            {t('invoice_number')}: {invoiceNumber}
          </p>
          <p style={{ margin: '5px 0', color: '#666' }}>
            {t('date')}: {currentDate}
          </p>
        </div>
      </div>

      {/* Company Information */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '30px'
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{
            margin: '0 0 10px 0',
            color: '#333',
            fontSize: '16px'
          }}>
            {t('from')}
          </h3>
          <p style={{ margin: '5px 0', fontWeight: 'bold' }}>TIGRA Logistics Inc.</p>
          <p style={{ margin: '2px 0' }}>123 Transport Avenue</p>
          <p style={{ margin: '2px 0' }}>Miami, FL 33101</p>
          <p style={{ margin: '2px 0' }}>Phone: (305) 555-0123</p>
          <p style={{ margin: '2px 0' }}>Email: info@tigralogistics.com</p>
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{
            margin: '0 0 10px 0',
            color: '#333',
            fontSize: '16px'
          }}>
            {t('bill_to')}
          </h3>
          <p style={{ margin: '5px 0', fontWeight: 'bold' }}>
            {dispatch.vehicleInfo?.make} {dispatch.vehicleInfo?.model} {dispatch.vehicleInfo?.year}
          </p>
          <p style={{ margin: '2px 0' }}>VIN: {dispatch.vin}</p>
          <p style={{ margin: '2px 0' }}>Pickup: {dispatch.warehouse}</p>
          <p style={{ margin: '2px 0' }}>
            {t('date')}: {new Date(dispatch.pickupDate).toLocaleDateString()}
          </p>
          <p style={{ margin: '2px 0' }}>
            {t('dispatch_id')}: {dispatch.id}
          </p>
        </div>
      </div>

      {/* Invoice Details */}
      <div style={{ marginBottom: '30px' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #ddd'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                border: '1px solid #ddd',
                fontWeight: 'bold',
                color: '#333'
              }}>
                {t('description')}
              </th>
              <th style={{
                padding: '12px',
                textAlign: 'right',
                border: '1px solid #ddd',
                fontWeight: 'bold',
                color: '#333'
              }}>
                {t('amount')}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{
                padding: '12px',
                border: '1px solid #ddd'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                  {t('vehicle_transport_service')}
                </div>
                <div style={{ color: '#666', fontSize: '12px' }}>
                  {dispatch.vehicleInfo?.year} {dispatch.vehicleInfo?.make} {dispatch.vehicleInfo?.model}
                  <br />
                  VIN: {dispatch.vin}
                  <br />
                  {t('from')}: {dispatch.warehouse}
                  {dispatch.deliveryDate && (
                    <>
                      <br />
                      {t('delivery_date')}: {new Date(dispatch.deliveryDate).toLocaleDateString()}
                    </>
                  )}
                </div>
              </td>
              <td style={{
                padding: '12px',
                textAlign: 'right',
                border: '1px solid #ddd',
                fontWeight: 'bold'
              }}>
                ${dispatch.price?.toLocaleString() || '0'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '30px'
      }}>
        <div style={{
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '5px',
          minWidth: '200px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            fontSize: '16px'
          }}>
            <span style={{ fontWeight: 'bold' }}>{t('total')}</span>
            <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
              ${dispatch.price?.toLocaleString() || '0'}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div style={{
        backgroundColor: '#f0f8ff',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '30px'
      }}>
        <h4 style={{
          margin: '0 0 10px 0',
          color: '#1890ff',
          fontSize: '16px'
        }}>
          {t('payment_information')}
        </h4>
        <p style={{ margin: '5px 0', fontSize: '13px' }}>
          {t('payment_method')}: {t('echeck')}
        </p>
        <p style={{ margin: '5px 0', fontSize: '13px' }}>
          {t('payment_status')}: {t('processing')}
        </p>
        <p style={{ margin: '5px 0', fontSize: '13px' }}>
          {t('invoice_date')}: {currentDate}
        </p>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '20px',
        borderTop: '1px solid #ddd',
        backgroundColor: '#f9f9f9'
      }}>
        <p style={{
          margin: '5px 0',
          fontSize: '12px',
          color: '#666'
        }}>
          {t('thank_you_for_choosing_tigra_logistics')}
        </p>
        <p style={{
          margin: '5px 0',
          fontSize: '12px',
          color: '#666'
        }}>
          {t('for_questions_contact_us_at')} (305) 555-0123 | info@tigralogistics.com
        </p>
      </div>
    </div>
  );
});

InvoiceTemplate.displayName = 'InvoiceTemplate';

InvoiceTemplate.propTypes = {
  dispatch: PropTypes.shape({
    id: PropTypes.string.isRequired,
    vin: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    vehicleInfo: PropTypes.shape({
      make: PropTypes.string,
      model: PropTypes.string,
      year: PropTypes.number
    }),
    pickupDate: PropTypes.string,
    warehouse: PropTypes.string,
    deliveryDate: PropTypes.string
  })
};

export default InvoiceTemplate;
