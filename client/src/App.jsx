import React, { useState, useEffect } from "react";
import { ConfigProvider } from "antd";
import { HelmetProvider } from "react-helmet-async";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import i18n from "./i18n";
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import Dashboard from "./pages/Dashboard";

// Lazy-loaded page imports
const Catalog = React.lazy(() => import("./pages/Catalog"));
const Auctions = React.lazy(() => import("./pages/Auctions"));

// Public Portal imports
const PublicLayout = React.lazy(() => import("./pages/PublicLayout"));
const ClientLoginPage = React.lazy(() =>
  import("./pages/ClientTracking/LoginPage")
);
const ClientStatusPage = React.lazy(() =>
  import("./pages/ClientTracking/StatusPage")
);

// CRM Module imports
const CrmLayout = React.lazy(() => import("./pages/CrmLayout"));
const CrmStatisticsPage = React.lazy(() => import("./pages/CrmStatistics"));
const CrmMessagesPage = React.lazy(() => import("./pages/CrmMessages"));
const CrmTasksPage = React.lazy(() => import("./pages/CrmTasks"));
const Logistics = React.lazy(() => import("./pages/Logistics"));
const DispatchDashboard = React.lazy(() => import("./pages/DispatchDashboard"));
const CrmArchivePage = React.lazy(() => import("./pages/CrmArchive"));
const CrmCancelledPage = React.lazy(() => import("./pages/CrmCancelled"));
const CrmPipelinePage = React.lazy(() => import("./pages/CrmPipeline"));
const CrmCalendarPage = React.lazy(() => import("./pages/CrmCalendar"));
const AclManager = React.lazy(() => import("./pages/Admin/AclManager"));
const SystemHealth = React.lazy(() => import("./pages/Admin/SystemHealth"));
const UserManagerPage = React.lazy(() => import("./pages/Admin/UserManager"));
import LazyLoader from "./components/LazyLoader";
import { themeConfig, darkThemeConfig } from "./theme/themeConfig";
import { topAuctions, keyMetrics } from "./mocks/_mockData";
import "./App.css";
import CrmPayment from "./pages/CrmPayment";

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [appData, setAppData] = useState({
    topAuctions: [],
    keyMetrics: [],
    heroData: null,
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
          keyMetrics,
        });

        // Hide loader after data is loaded
        setIsAppLoading(false);

        // TODO-FX: Force Georgian language for testing - remove after testing
        i18n.changeLanguage("ka");
      } catch (error) {
        console.error("Failed to load initial app data:", error);
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
        theme={{
          ...(isDark ? darkThemeConfig : themeConfig),
          token: {
            ...(isDark ? darkThemeConfig.token : themeConfig.token),
            fontFamily: "Noto Sans Georgian, sans-serif",
          },
        }}
      >
        <I18nextProvider i18n={i18n}>
          <Router>
            <div className="App" lang="ka">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      isDark={isDark}
                      onThemeToggle={handleThemeToggle}
                      appData={appData}
                    />
                  }
                />
                <Route
                  path="/statistics"
                  element={
                    <Statistics
                      isDark={isDark}
                      onThemeToggle={handleThemeToggle}
                    />
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <Dashboard
                      isDark={isDark}
                      onThemeToggle={handleThemeToggle}
                    />
                  }
                />
                <Route
                  path="/catalog"
                  element={
                    <Catalog
                      isDark={isDark}
                      onThemeToggle={handleThemeToggle}
                    />
                  }
                />
                <Route
                  path="/auctions"
                  element={
                    <Auctions
                      isDark={isDark}
                      onThemeToggle={handleThemeToggle}
                    />
                  }
                />
                <Route path="/track" element={<PublicLayout />}>
                  <Route index element={<ClientLoginPage />} />
                  <Route path=":vin" element={<ClientStatusPage />} />
                </Route>
                <Route path="/crm" element={<CrmLayout />}>
                  <Route path="statistics" element={<CrmStatisticsPage />} />
                  <Route path="tasks" element={<CrmTasksPage />} />
                  <Route path="messages" element={<CrmMessagesPage />} />
                  <Route
                    path="logistics"
                    element={
                      <Logistics
                        isDark={isDark}
                        onThemeToggle={handleThemeToggle}
                      />
                    }
                  />
                  <Route path="payment" element={<CrmPayment />} />
                  <Route
                    path="dispatch"
                    element={
                      <DispatchDashboard
                        isDark={isDark}
                        onThemeToggle={handleThemeToggle}
                      />
                    }
                  />
                  <Route
                    path="pipeline"
                    element={
                      <CrmPipelinePage
                        isDark={isDark}
                        onThemeToggle={handleThemeToggle}
                      />
                    }
                  />
                  <Route path="calendar" element={<CrmCalendarPage />} />
                  <Route
                    path="archive"
                    element={
                      <CrmArchivePage
                        isDark={isDark}
                        onThemeToggle={handleThemeToggle}
                      />
                    }
                  />
                  <Route
                    path="cancelled"
                    element={
                      <CrmCancelledPage
                        isDark={isDark}
                        onThemeToggle={handleThemeToggle}
                      />
                    }
                  />
                  <Route
                    path="admin/acl"
                    element={
                      <AclManager
                        isDark={isDark}
                        onThemeToggle={handleThemeToggle}
                      />
                    }
                  />
                  <Route
                    path="admin/system-health"
                    element={<SystemHealth />}
                  />
                  <Route path="admin/users" element={<UserManagerPage />} />
                </Route>
              </Routes>
            </div>
          </Router>
        </I18nextProvider>
      </ConfigProvider>
    </HelmetProvider>
  );
}

export default App;
