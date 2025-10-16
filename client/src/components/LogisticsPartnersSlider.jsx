import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const LogisticsPartnersSlider = () => {
  const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Company data from requirements
  const companies = [
    { name: "Maersk", logo: "/partners/maersk.png" },
    { name: "DHL", logo: "/partners/dhl.png" },
    { name: "FedEx", logo: "/partners/fedex.png" },
    { name: "UPS", logo: "/partners/ups.png" },
    { name: "MSC", logo: "/partners/msc.png" },
    { name: "Kuehne+Nagel", logo: "/partners/kn.png" },
    { name: "CMA CGM", logo: "/partners/cma.png" },
    { name: "Hapag-Lloyd", logo: "/partners/hapag.png" },
    { name: "DB Schenker", logo: "/partners/dbs.png" },
    { name: "NYK Line", logo: "/partners/nyk.png" }
  ];

  // Duplicate companies for seamless loop
  const duplicatedCompanies = [...companies, ...companies, ...companies];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationId;
    let startTime = null;
    const duration = 25000; // 25 seconds for full cycle

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      if (isHovered) {
        startTime = timestamp - ((timestamp - startTime) % duration);
        animationId = requestAnimationFrame(animate);
        return;
      }

      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;

      // Calculate translateX based on progress
      const translateX = -progress * (companies.length * 200); // 200px per logo
      slider.style.transform = `translateX(${translateX}px)`;

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isHovered, companies.length]);

  return (
    <div
      id="logistics-partners-slider"
      style={{
        padding: '40px 0',
        backgroundColor: 'white',
        overflow: 'hidden'
      }}
    >
      <div className="full-width-section">
        {/* Title Section */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '8px'
          }}>
            {t('trusted_logistics_partners')}
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0
          }}>
            {t('our_global_network_of_logistics_and_insurance_leaders')}
          </p>
        </div>

        {/* Slider Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '120px',
            overflow: 'hidden',
            borderRadius: '12px',
            backgroundColor: 'white',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            display: 'flex',
            alignItems: 'center'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Slider Track */}
          <div
            ref={sliderRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: `${duplicatedCompanies.length * 200}px`,
              transition: isHovered ? 'none' : 'transform 0.3s ease-out'
            }}
          >
            {duplicatedCompanies.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                style={{
                  flex: '0 0 200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                  transition: 'all 0.3s ease'
                }}
              >
                <div
                  style={{
                    width: '120px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    filter: 'grayscale(100%) contrast(0.8)',
                    opacity: 0.85,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%) contrast(1)';
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%) contrast(0.8)';
                    e.currentTarget.style.opacity = '0.85';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onClick={() => console.log('Partner clicked:', company.name)}
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      // Fallback for broken images
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = `<div style="font-size: 14px; color: #6b7280; font-weight: 500; text-align: center;">${company.name}</div>`;
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '16px'
        }}>
          <div style={{
            width: '32px',
            height: '4px',
            backgroundColor: '#e5e7eb',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div
              style={{
                height: '100%',
                width: '50%',
                backgroundColor: '#1890ff',
                borderRadius: '2px',
                animation: isHovered ? 'none' : 'slide 2.5s linear infinite',
                transform: isHovered ? 'translateX(-100%)' : 'translateX(-100%)'
              }}
            />
          </div>
        </div>
      </div>

      {/* CSS Animation for indicator */}
      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

LogisticsPartnersSlider.propTypes = {
  // No props needed for this component as it uses static data
};

export default LogisticsPartnersSlider;
