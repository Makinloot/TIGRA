import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { Helmet } from 'react-helmet-async';
import {
  featuredAuctions,
  newsArticles,
  shipmentRoutes,
  partners,
  specialOffers,
  aiPicks,
  keyMetrics
} from '../mocks/_mockData';

// Direct component imports for synchronous first-screen rendering
import Header from '../components/Header';
import SearchAndFilters from '../components/SearchAndFilters';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import KeyMetrics from '../components/KeyMetrics';
import AuctionCardList from '../components/AuctionCardList';
import NewsSection from '../components/NewsSection';
import MapSnapshot from '../components/MapSnapshot';
import Partners from '../components/Partners';
import StickyBar from '../components/StickyBar';
import Footer from '../components/Footer';
import ScrollProgressIndicator from '../components/ScrollProgressIndicator';
import FloatingNavigation from '../components/FloatingNavigation';
import SectionRenderer from '../components/SectionRenderer';
import { getAllSectionConfigs, getSectionConfig } from '../config/sectionConfigs';

const { Content } = Layout;

// TODO-FX: Full-width responsive layout implemented - homepage uses 100% viewport width,
// responsive grids (5 desktop, 2 tablet, 1 mobile), full-width sections, responsive modals
const Home = ({ isDark, onThemeToggle, appData }) => {
  // Destructure data from props
  const { topAuctions = [], keyMetrics: propKeyMetrics = [] } = appData;

  // Calculate content counts for floating navigation
  const contentCounts = {
    keyMetrics: propKeyMetrics.length || keyMetrics.length,
    auctions: topAuctions.length,
    featuredAuctions: featuredAuctions.length,
    specialOffers: specialOffers.length,
    aiPicks: aiPicks.length,
    newsArticles: newsArticles.length,
    shipmentRoutes: shipmentRoutes.length,
    activeLogisticsRoutes: 3, // 3 active containers
    partners: partners.length
  };
  return (
    <>
      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator />

      {/* Floating Navigation Menu */}
      <FloatingNavigation contentCounts={contentCounts} />

      {/* SEO Meta Tags */}
      <Helmet>
        <title>AutoMarketLogistic</title>
        <meta
          name="description"
          content="Search, bid, and ship vehicles worldwide with AI-powered auction and logistics platform. Trusted by industry leaders with 9000+ vehicles delivered."
        />
        <meta name="keywords" content="auto auction, vehicle auction, car auction, logistics, shipping, AI logistics" />
        <meta property="og:title" content="AutoMarketLogistic" />
        <meta property="og:description" content="Smart Auto Auctions. Global Logistics. Powered by AI." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://automarketlogistic.com" />
      </Helmet>

      {/* Header - positioned outside Layout for proper sticky behavior */}
      <Header isDark={isDark} onThemeToggle={onThemeToggle} />

      <Layout className="responsive-layout-padding fade-in-content" style={{
        minHeight: '100vh',
        width: '100vw',
        minWidth: '100%',
        margin: '0',
        padding: 'var(--header-height, 64px) 0 0 0',
        overflowX: 'hidden'
      }}>
        {/* TODO-FX: Full-width Layout component uses 100vw width and overflow-x: hidden to prevent horizontal scroll.
           All child components (Header, Content sections, Footer) must scale within viewport bounds.
           TODO-FX: Applied responsive-layout-padding class for horizontal spacing from screen edges:
           - Desktop/Tablet: 16px padding each side (total 32px margin from screen edges)
           - Mobile: 8px padding each side (total 16px margin from screen edges)

           TODO-FX: Future dynamic content adjustments:
           - Consider implementing CSS Grid or Flexbox for better layout control
           - Add support for theme-based padding adjustments
           - Implement responsive breakpoint detection for dynamic content loading
           - Monitor layout shift issues with dynamic content insertion */}

        {/* Main Content */}
        <Content>
          <Hero />

          <SearchAndFilters />

          <HowItWorks />

          <KeyMetrics keyMetrics={keyMetrics} />

          <AuctionCardList auctions={topAuctions} />

          {/* Dynamic Sections from Configuration */}
          {getAllSectionConfigs().map((sectionConfig) => {
            let sectionData = [];
            switch (sectionConfig.id) {
              case 'featured-auctions':
                sectionData = featuredAuctions;
                break;
              case 'special-offers':
                sectionData = specialOffers;
                break;
              case 'ai-picks':
                sectionData = aiPicks;
                break;
              case 'active-logistics-routes':
                // Split layout doesn't need data array, uses config data directly
                sectionData = [];
                break;
              default:
                sectionData = [];
            }

            return (
              <SectionRenderer
                key={sectionConfig.id}
                section={sectionConfig}
                data={sectionData}
              />
            );
          })}

          <NewsSection newsArticles={newsArticles} />

          {/* Active Logistics Routes Section */}
          <SectionRenderer
            section={getSectionConfig('active-logistics-routes')}
            data={[]} // Split layout uses config data directly
          />

          <Partners partners={partners} />
        </Content>

        {/* Footer */}
        <Footer />
      </Layout>

      {/* Sticky CTA Bar */}
      <StickyBar />
    </>
  );
};

Home.propTypes = {
  isDark: PropTypes.bool.isRequired,
  onThemeToggle: PropTypes.func.isRequired,
  appData: PropTypes.shape({
    topAuctions: PropTypes.array,
    keyMetrics: PropTypes.array,
    heroData: PropTypes.object
  }).isRequired
};

export default Home;
