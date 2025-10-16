import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import LazyLoader from './components/LazyLoader';
import { themeConfig, darkThemeConfig } from './theme/themeConfig';
import { topAuctions, keyMetrics } from './mocks/_mockData';
import './App.css';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [appData, setAppData] = useState({
    topAuctions: [],
    keyMetrics: [],
    heroData: null
  });

  const handleThemeToggle = () => {
    setIsDark(!isDark);
  };

  // TODO-FX: Replace with actual API endpoints
  // Using mock data instead of API calls to prevent HTML parsing errors
  // TODO-FX: Replace with real API call.
  // API Endpoint: GET /api/auctions/top
  // Expected Data: Array of auction objects

  // TODO-FX: Replace with real API call.
  // API Endpoint: GET /api/hero
  // Expected Data: Hero configuration object

  // TODO-FX: Replace with real API call.
  // API Endpoint: GET /api/metrics
  // Expected Data: Array of metric objects

  useEffect(() => {
    const initializeAppData = () => {
      try {
        // Use mock data directly instead of API calls
        setAppData({
          topAuctions,
          heroData: null, // Hero component is self-contained, no data needed
          keyMetrics
        });

        // Hide loader after data is loaded
        setIsAppLoading(false);
      } catch (error) {
        console.error('Failed to load initial app data:', error);
        // Critical failure: hide loader but show error state on screen
        // For simplicity, we just hide the loader here
        setIsAppLoading(false);
        // TODO-FX: Implement global error state handling for a real application
      }
    };

    // Only initialize if still loading
    if (isAppLoading) {
      initializeAppData();
    }
  }, [isAppLoading]);

  if (isAppLoading) {
    return <LazyLoader />;
  }

  return (
    <HelmetProvider>
      <ConfigProvider
        theme={isDark ? darkThemeConfig : themeConfig}
      >
        <div className="App">
          <Home
            isDark={isDark}
            onThemeToggle={handleThemeToggle}
            appData={appData}
          />
        </div>
      </ConfigProvider>
    </HelmetProvider>
  );
}

export default App;
