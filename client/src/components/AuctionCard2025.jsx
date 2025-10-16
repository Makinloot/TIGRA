import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import './AuctionCard2025.css';
import {
  Card,
  Button,
  Typography,
  Tag,
  Space,
  Avatar,
  Tooltip,
  Progress,
  Modal,
  Row,
  Col
} from 'antd';
import {
  ClockCircleOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  ThunderboltOutlined,
  ArrowRightOutlined,
  UserOutlined,
  StarOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  LeftOutlined,
  RightOutlined,
  CalendarOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;


const AuctionCard2025 = ({
  auction,
  onPlaceBid,
  onViewDetails,
  liveUpdateInterval = 5000,
  onBidNotification,
  visualTheme,
  sectionId
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentBid, setCurrentBid] = useState(auction.currentBid);
  const [timeLeft, setTimeLeft] = useState(auction.timeLeft || 'Loading...');
  const [biddersCount, setBiddersCount] = useState(auction.biddersCount || auction.bids || 0);

  // Image gallery state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  // Live bidding simulation state
  const [bidNotifications, setBidNotifications] = useState([]);
  const [notificationId, setNotificationId] = useState(0);
  const [biddersPopupVisible, setBiddersPopupVisible] = useState(false);

  // Random bidders popup state
  const [biddersPopups, setBiddersPopups] = useState([]);
  const [biddersPopupId, setBiddersPopupId] = useState(0);

  // Get all available photos (main + additional)
  const allPhotos = auction.photos || [];
  const mainPhoto = allPhotos[currentImageIndex] || 'https://via.placeholder.com/400x250';
  const thumbnailPhotos = allPhotos.slice(0, 6); // Show first 6 as thumbnails

  // Available avatars for bidding simulation
  const availableAvatars = useMemo(() => [
    '0450249b131eec36dc8333b7cf847bc4.webp',
    '06d29f74c2f85239efe3f9ade1b96da7.webp',
    '098d5b19a0870d95bee0cdbcef632be1.webp',
    '112413f070536d15170606f2d00aa15d.webp',
    '119d9abaee7a1e987571f0fe776bd1a5.webp',
    '1a270860bac2c66b434968a3047822e3.webp',
    '1a3318330cf1734feb84887e9453fb1b.webp',
    '1bab427466457e745328f6eb8fa227e1.webp',
    '1c9a4dd0bbd964e3eecbd40caf3b7e37.webp',
    '1dd1b479633b29ff2fd9d6644581f394.webp',
    '2244af71ad0c25f2cb0a8efa167491fb.webp',
    '237d3876ef98d5364ed1326813f4ed5b.webp',
    '261cb9a6ae028b862eaf692b10033fb7.webp',
    '27d73d5efa51661b5feb1e29cc389257.webp',
    '2866b308b3c70e895e34b3130f10abf3.webp',
    '2b04cc0b930f82afe6c38d3209dcbdfd.webp',
    '2d81c3469090a90daff20560a129b182.webp',
    '2fafd2ca0fa23ca91ec778674c26081a.webp',
    '2fb0e578a8ab6f8073092ae637c87835.webp',
    '321f5bcb6efc56013d67ae101f196eaf.webp',
    '33642b1fa839338a7d53d78336a45ff0.webp',
    '386f22acf2f226c3a9ad7ad66fdce7a6.webp',
    '40687889cb61a06b242aafb9e02f5204.webp',
    '4184423b57c070204a1942282818dc0c.webp',
    '439620a6c05132c82d67fc1593a7e19a.webp',
    '44198079c5211172a61405b5049f3bfb.webp',
    '44b312165ea1bb924bdccf01bf1bb443.webp',
    '44f647f9e3c4767d3b83e89e67917f41.webp',
    '466989c631bca15c46ae9c1e62269a5a.webp',
    '4a8eb80a6f610949b28dd91f45e7d6e2.webp',
    '4b59f1b8af326b6381c39ab29c3612d6.webp',
    '4dfaa7ded74ac66557b5940f7290c840.webp',
    '50382765fd5648c7876d91cc37b27394.webp',
    '5c9a412b4e80d08303731bca471d3b63.webp',
    '5cd1cd3d1851e162616256ebe2a4c30a.webp',
    '60467e1ae6f97acb8964f5aa617c7ecb.webp',
    '622e4c7767d4eb0307179d6dfda9248b.webp',
    '644dfc35027924a6e5dfbcad653be697.webp',
    '67b732b96785fd368415dd82951466c1.webp',
    '6914da7a3557e685836a71e635c237b9.webp',
    '69c04d9c4dc60b59bac65938e070e7cf.webp',
    '6ade325cd4c136112f25e63f888eb7de.webp',
    '6bde7f630b3933ee1b92b0ec2df665c2.webp',
    '6ffe2b7df2b99ba5cc2c65692dd0d568.webp',
    '706e8643277a95c3f80005f70cf53cb9.webp',
    '70a23294beb91b4ad5a439e2c6ea5a6d.webp',
    '76891f0bd337c6ee10f84067d7808044.webp',
    '78529e2ec8eb4a2eb2fb961e04915b0a.webp',
    '78c7bf3d348d505f15d332f9a58092f7.webp',
    '7ae3a0ffcf9eb41156244fbaa3588de7.webp',
    '7c9062905b4ce3d276dfffd2b34bbb49.webp',
    '7d24c27f40be0d43618f6d49e26a3288.webp',
    '8654c911c90383bb42a6cdddd66014c5.webp',
    '869f67a992bb6ca4cb657fb9fc634893.webp',
    '8940e8ea369def14e82f05a5fee994b9.webp',
    '897cda132d24997b106d57ccd0530927.webp',
    '899e2a12b136acdc5366e76d15d83244.webp',
    '8c0e0a2a3a1c7068ea221aa8a0f429e0.webp',
    '8fcd9a7c3003dd0ad23e371475d130b3.webp',
    '92770c61168481c94e1ba43df7615fd8.webp',
    '944c5ba154e0489274504f38d01bcfaf.webp',
    '94f5ac7e7b78495be7df7e5ca427fd5c.webp',
    '9854663aec5741bbbe84290b6edc0aed.webp',
    '9d119d757ff7d7b36b9d71b86d973fbe.webp',
    'a2d4e522bd8e359b60d4e40a6c50fa6e.webp',
    'a47cfeaf97371ec735a870781978fcf5.webp',
    'a599c01dec11cb6099c6aacafe3bc5a9.webp',
    'b00e1ebc65fc7f2c53c9a9a955a49be5.webp',
    'b0a4b1922813b989103a3616d7111562.webp',
    'b89db8099e05245d0f3e19be6beeafca.webp',
    'b8c1cb5042e9b54e27d18d6ecfb46087.webp',
    'baa928fef9b0f2e838263dd88eefc707.webp',
    'bb3d2a58ea153b635a4951d82affb4db.webp',
    'bb8c76bcb73cf00e7d4ab920447a365c.webp',
    'bc61d859626dbb47d69f86e10421c50e.webp',
    'bc8e6056aa877de4ae5ab1321f776ade.webp',
    'c0e1c0e6224c14a140748d8cef481883.webp',
    'c29e12118b27e54e8883db0b98c610df.webp',
    'c33237da3438494d1abc67166196484e.webp',
    'c6b7069df1a634e3db7ba5e9b923d3a8.webp',
    'cacf6ab4ea79648699479021e7892224.webp',
    'cae99bb14b21ec41ecf03b58f59ff292.webp',
    'd1499909450ba526d5297e3ebc7f6d07.webp',
    'd36865e08723cc1b764e084873e53662.webp',
    'd447a9fd5010652f6c0911fbe9c662c6.webp',
    'd7d9e6977ad4053c3dfab772ba1d2c1f.webp',
    'dae17037af459cca4ed1b8a474e7428e.webp',
    'e2cb7b8c41eba64187df1fc6128a3f8e.webp',
    'e6f79cdf2a45c0eb58b3f93407361989.webp',
    'ecf088e6a05f2c8d5c041384e3568b46.webp',
    'ed7055b68adec22bfa8a88d441e83e9a.webp',
    'ee7173cf2acfcb909ead7a23f3e01493.webp',
    'eecd70bbeb08e2fc531ca498b9fc4f0d.webp',
    'ef4a7e86005e0e9e49dbbae2280c1f10.webp',
    'f0474688ec350e08543f55b3771dcada.webp',
    'f0fb14746f3fc6020a0e1afdd089a4fb.webp',
    'f118c882025868bca7499ea0f41bc43b.webp',
    'f135ea474f1320d13883e194685b4d8a.webp',
    'f3382b5fa7e14fcab30d4279f203c83a.webp',
    'f725eb23b6db39a55736f1428f6a76c5.webp'
  ], []);

  // Live bidding simulation functions - moved before usage
  const getRandomAvatar = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * availableAvatars.length);
    return `/slider/avatars/${availableAvatars[randomIndex]}`;
  }, [availableAvatars]);

  // Theme-aware styling functions
  const themeColors = visualTheme?.palette ? visualTheme.palette : {
    primary: '#2563eb',
    accent: '#22c55e',
    background: 'white',
    badge: '#ef4444'
  };

  const themeHoverEffects = (() => {
    if (!visualTheme?.effects?.hover) return {};

    const hoverEffects = visualTheme.effects.hover;
    const hoverStyles = {};

    if (hoverEffects.includes('lift')) hoverStyles.transform = 'translateY(-8px)';
    if (hoverEffects.includes('shadow-lg')) hoverStyles.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
    if (hoverEffects.includes('brightness-110')) hoverStyles.filter = 'brightness(1.1)';
    if (hoverEffects.includes('scale-105')) hoverStyles.transform = 'scale(1.05)';
    if (hoverEffects.includes('rotate-0.5deg')) hoverStyles.transform += ' rotate(0.5deg)';
    if (hoverEffects.includes('ring-2 ring-purple-200')) {
      hoverStyles.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.2), 0 10px 25px rgba(0,0,0,0.1)';
    }

    return hoverStyles;
  })();

  const themeGlowBorder = visualTheme?.effects?.glow_border || 'none';

  // Mock live bid updates every 5 seconds
  useEffect(() => {
    if (!auction.isLive) return;

    const interval = setInterval(() => {
      // Simulate bid updates (5% chance every 5 seconds)
      if (Math.random() < 0.05) {
        setCurrentBid(prev => prev + Math.floor(Math.random() * 100) + 50);
        setBiddersCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      }
    }, liveUpdateInterval);

    return () => clearInterval(interval);
  }, [auction.isLive, liveUpdateInterval]);

  // Countdown timer effect
  useEffect(() => {
    if (!auction.endTime) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const endTime = new Date(auction.endTime).getTime();
      const distance = endTime - now;

      if (distance > 0) {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft('ENDED');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [auction.endTime]);

  const simulateBid = useCallback(() => {
    const bidIncrease = Math.floor(Math.random() * 500) + 100; // $100-$600 increase
    const newBid = currentBid + bidIncrease;
    const newBiddersCount = biddersCount + 1;

    // Update state
    setCurrentBid(newBid);
    setBiddersCount(newBiddersCount);

    // Update auction data for persistence
    if (auction) {
      auction.currentBid = newBid;
      auction.biddersCount = newBiddersCount;
      // Add to recent bidders if not already there
      if (!auction.recentBidders) auction.recentBidders = [];
      const bidderNames = ['Alex Chen', 'Maria Rodriguez', 'David Kim', 'Sarah Johnson', 'Mike Wilson', 'Emma Davis', 'James Brown', 'Lisa Garcia', 'Tom Anderson', 'Anna Martinez'];
      const randomName = bidderNames[Math.floor(Math.random() * bidderNames.length)];
      const newBidder = {
        name: randomName,
        avatar: getRandomAvatar()
      };
      auction.recentBidders.unshift(newBidder);
      if (auction.recentBidders.length > 6) {
        auction.recentBidders = auction.recentBidders.slice(0, 6);
      }
    }

    // Create notification
    const newNotification = {
      id: notificationId,
      avatar: getRandomAvatar(),
      bidAmount: newBid,
      bidderName: auction.recentBidders[0].name,
      timestamp: Date.now()
    };

    setNotificationId(prev => prev + 1);
    setBidNotifications(prev => [...prev, newNotification]);

    // Call parent notification handler if provided
    onBidNotification?.(auction.id, newNotification);

    // Auto-remove notification after 4 seconds
    setTimeout(() => {
      setBidNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 4000);
  }, [currentBid, biddersCount, auction, notificationId, getRandomAvatar, onBidNotification]);

  // Live bidding simulation effect
  useEffect(() => {
    if (!auction.isLive) return;

    const bidInterval = setInterval(() => {
      // 25% chance every 2-6 seconds to simulate a bid (more active)
      if (Math.random() < 0.25) {
        simulateBid();
      }
    }, Math.random() * 4000 + 2000); // Random interval between 2-6 seconds

    return () => clearInterval(bidInterval);
  }, [auction.isLive, simulateBid]);

  const createRandomBiddersPopup = useCallback(() => {
    const totalBidders = auction.biddersCount || auction.bids || 0;
    if (totalBidders <= 0) return;

    const bidderNames = ['Alex Chen', 'Maria Rodriguez', 'David Kim', 'Sarah Johnson', 'Mike Wilson', 'Emma Davis', 'James Brown', 'Lisa Garcia', 'Tom Anderson', 'Anna Martinez'];
    const randomName = bidderNames[Math.floor(Math.random() * bidderNames.length)];

    const newPopup = {
      id: biddersPopupId,
      bidderName: randomName,
      avatar: getRandomAvatar(),
      timestamp: Date.now()
    };

    setBiddersPopupId(prev => prev + 1);
    setBiddersPopups(prev => [...prev, newPopup]);

    // Auto-remove popup after 3 seconds
    setTimeout(() => {
      setBiddersPopups(prev => prev.filter(p => p.id !== newPopup.id));
    }, 3000);
  }, [auction.biddersCount, auction.bids, biddersPopupId, getRandomAvatar]);

  // Random bidders popup effect
  useEffect(() => {
    const totalBidders = auction.biddersCount || auction.bids || 0;
    if (totalBidders <= 0) return;

    const popupInterval = setInterval(() => {
      // 5% chance every 30-60 seconds to show bidders popup
      if (Math.random() < 0.05) {
        createRandomBiddersPopup();
      }
    }, Math.random() * 30000 + 30000); // Random interval between 30-60 seconds

    return () => clearInterval(popupInterval);
  }, [auction.biddersCount, auction.bids, createRandomBiddersPopup]);

  const getConditionColor = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'excellent': return '#22c55e';
      case 'very good': return '#3b82f6';
      case 'good': return '#f59e0b';
      case 'fair': return '#f97316';
      case 'poor': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getConditionGrade = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'excellent': return 'A+';
      case 'very good': return 'A';
      case 'good': return 'B';
      case 'fair': return 'C';
      case 'poor': return 'D';
      default: return 'N/A';
    }
  };

  // Image gallery handlers
  const handleImageClick = () => {
    setPreviewVisible(true);
    setZoomLevel(1);
    setZoomPosition({ x: 0, y: 0 });
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : allPhotos.length - 1
    );
    setZoomLevel(1);
    setZoomPosition({ x: 0, y: 0 });
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev < allPhotos.length - 1 ? prev + 1 : 0
    );
    setZoomLevel(1);
    setZoomPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.5, 1));
  };

  const handleMouseMove = (e) => {
    if (zoomLevel > 1) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomPosition({ x, y });
    }
  };

  const handleModalClose = () => {
    setPreviewVisible(false);
    setZoomLevel(1);
    setZoomPosition({ x: 0, y: 0 });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatMileage = (mileage) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  const getBadgeStyle = (type) => {
    const styles = {
      live: {
        background: 'linear-gradient(45deg, #ef4444, #dc2626)',
        color: 'white',
        animation: 'pulse 2s infinite'
      },
      hot: {
        background: 'linear-gradient(45deg, #f97316, #ea580c)',
        color: 'white'
      },
      ending: {
        background: 'linear-gradient(45deg, #eab308, #ca8a04)',
        color: 'white',
        animation: 'blink 1s infinite'
      }
    };
    return styles[type] || styles.live;
  };

  const renderBadges = () => {
    const badges = [];

    if (auction.isLive) {
      badges.push(
        <Tag key="live" style={getBadgeStyle('live')}>
          🔴 LIVE
        </Tag>
      );
    }

    if (auction.isHotDeal) {
      badges.push(
        <Tag key="hot" style={getBadgeStyle('hot')}>
          🔥 HOT DEAL
        </Tag>
      );
    }

    if (auction.timeLeft && typeof auction.timeLeft === 'string' && auction.timeLeft.includes('h') && parseInt(auction.timeLeft) <= 2) {
      badges.push(
        <Tag key="ending" style={getBadgeStyle('ending')}>
          ⏰ ENDING SOON
        </Tag>
      );
    }

    return badges;
  };


  return (
    <>
    <Card
      className={`auction-card-2025 ${sectionId ? `auction-card-${sectionId}` : ''}`}
      style={{
        backgroundColor: themeColors.background || 'white',
        border: themeGlowBorder !== 'none' ? `2px solid ${themeGlowBorder}` : '1px solid rgba(0,0,0,0.08)',
        borderRadius: visualTheme?.layout?.rounded === '3xl' ? '24px' : '16px',
        boxShadow: isHovered ? (themeHoverEffects.boxShadow || '0 20px 40px rgba(0,0,0,0.1)') : '0 4px 12px rgba(0,0,0,0.05)',
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? (themeHoverEffects.transform || 'translateY(-8px) scale(1.02)') : 'translateY(0) scale(1)',
        filter: isHovered ? themeHoverEffects.filter : 'none',
        overflow: 'hidden'
      }}
      styles={{ body: { padding: 0 } }}
      hoverable
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Section - Image with Badges */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/10',
        overflow: 'hidden',
        borderRadius: '16px 16px 0 0'
      }}>
        <img
          src={mainPhoto}
          alt={`${auction.title} - ${auction.year}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)',
            cursor: 'pointer'
          }}
          loading="lazy"
          onClick={handleImageClick}
        />

        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
          pointerEvents: 'none'
        }} />

        {/* Premium Highlight for high-value items */}
        {currentBid > 50000 && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #fbbf24, #f59e0b, #d97706)',
            borderRadius: '16px 16px 0 0'
          }} />
        )}

        {/* Badges */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <Space direction="vertical" size={4}>
            {renderBadges()}
          </Space>

          {/* Extra badges for special features - Hide for featured auctions to avoid duplication */}
          <Space direction="vertical" size={4} align="end">
            {auction.transportReady && sectionId !== 'featured-auctions' && (
              <Tag color="blue" style={{ fontSize: '10px', padding: '2px 6px' }}>
                <TruckOutlined /> Ship-ready
              </Tag>
            )}
            {auction.verifiedSeller && sectionId !== 'featured-auctions' && (
              <Tag color="green" style={{ fontSize: '10px', padding: '2px 6px' }}>
                <CheckCircleOutlined /> Verified
              </Tag>
            )}
          </Space>
        </div>

        {/* Ship Ready and Verified icons below image for Featured Auctions and WILL FINISH SOON */}
        {(sectionId === 'featured-auctions') && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            display: 'flex',
            gap: '8px'
          }}>
            {auction.transportReady && (
              <div style={{
                backgroundColor: 'rgba(59, 130, 246, 0.9)',
                color: 'white',
                padding: '6px 8px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(4px)'
              }}>
                <TruckOutlined style={{ fontSize: '12px' }} />
                Ship Ready
              </div>
            )}
            {auction.verifiedSeller && (
              <div style={{
                backgroundColor: 'rgba(34, 197, 94, 0.9)',
                color: 'white',
                padding: '6px 8px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(4px)'
              }}>
                <CheckCircleOutlined style={{ fontSize: '12px' }} />
                Verified
              </div>
            )}
          </div>
        )}

        {/* Condition Indicator - Top Right */}
        {auction.condition && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: getConditionColor(auction.condition),
            color: 'white',
            padding: '6px 10px',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            zIndex: 10
          }}>
            <StarOutlined style={{ marginRight: '4px', fontSize: '11px' }} />
            {getConditionGrade(auction.condition)}
          </div>
        )}

        {/* AI Match Score for AI Picks section */}
        {auction.aiMatchScore && !auction.condition && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(139, 92, 246, 0.9)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 'bold',
            backdropFilter: 'blur(4px)'
          }}>
            <StarOutlined style={{ marginRight: '4px' }} />
            {auction.aiMatchScore}% match
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {thumbnailPhotos.length > 1 && (
        <div style={{
          padding: '12px',
          borderTop: '1px solid #f3f4f6',
          backgroundColor: '#fafafa'
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {thumbnailPhotos.map((photo, index) => (
              <div
                key={index}
                onClick={() => handleThumbnailClick(index)}
                style={{
                  width: '60px',
                  height: '40px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  border: currentImageIndex === index ? `2px solid ${themeColors.primary}` : '2px solid #e5e7eb',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = themeColors.primary;
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = currentImageIndex === index ? themeColors.primary : '#e5e7eb';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <img
                  src={photo}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Middle Section - Vehicle Info */}
      <div style={{ padding: '16px' }}>
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          {/* Title */}
          <Title level={4} style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: 'bold',
            lineHeight: '1.3',
            color: '#1f2937'
          }}>
            {auction.year} {auction.title}
          </Title>

          {/* Sub Info */}
          <Space size={12} wrap>
            <Text style={{ fontSize: '13px', color: '#6b7280' }}>
              {formatMileage(auction.mileage)} miles
            </Text>
            <Text style={{ fontSize: '13px', color: '#6b7280' }}>
              {auction.engine || '2.0L'} • {auction.transmission || 'Auto'}
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <EnvironmentOutlined style={{ fontSize: '12px', color: '#6b7280' }} />
              <Text style={{ fontSize: '13px', color: '#6b7280' }}>
                {auction.location?.split(',')[0]}
              </Text>
              {/* Country flag would go here - using emoji for now */}
              <span style={{ fontSize: '12px' }}>
                {auction.location?.includes('USA') ? '🇺🇸' :
                 auction.location?.includes('Germany') ? '🇩🇪' :
                 auction.location?.includes('Japan') ? '🇯🇵' : '🌍'}
              </span>
            </div>
          </Space>

        </Space>
      </div>

      {/* Bottom Section - Price & Actions */}
      <div style={{
        padding: '0 16px 16px 16px',
        borderTop: '1px solid #f3f4f6'
      }}>
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          {/* Price Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text style={{ fontSize: '12px', color: '#6b7280' }}>
                Current Bid
              </Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <DollarOutlined style={{ color: '#2563eb' }} />
                <Text style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#2563eb'
                }}>
                  {formatCurrency(currentBid)}
                </Text>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ClockCircleOutlined style={{
                  color: timeLeft === 'ENDED' ? '#ef4444' : '#f59e0b',
                  fontSize: '14px'
                }} />
                <Text style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: timeLeft === 'ENDED' ? '#ef4444' : '#f59e0b'
                }}>
                  {timeLeft}
                </Text>
              </div>

              {/* Animated countdown ring for ending soon */}
              {timeLeft !== 'ENDED' && typeof timeLeft === 'string' && timeLeft.includes('h') && parseInt(timeLeft) <= 2 && (
                <Progress
                  type="circle"
                  percent={Math.min(100, (parseInt(timeLeft) / 2) * 100)}
                  size={24}
                  strokeColor="#f59e0b"
                  showInfo={false}
                  style={{ marginTop: '4px' }}
                />
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', width: '100%', gap: '8px', alignItems: 'center' }}>
            <Button
              type="primary"
              icon={<ThunderboltOutlined />}
              size="large"
              style={{
                flex: 1,
                height: '40px',
                fontWeight: '600',
                borderRadius: '8px',
                background: 'linear-gradient(45deg, #2563eb, #1d4ed8)',
                border: 'none',
                boxShadow: isHovered ? '0 4px 12px rgba(37, 99, 235, 0.4)' : 'none',
                transition: 'all 0.2s ease'
              }}
              onClick={(e) => {
                e.stopPropagation();
                onPlaceBid?.(auction.id);
              }}
            >
              Place Bid
            </Button>

            {/* Bidders Count Indicator */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                backgroundColor: (auction.biddersCount || auction.bids || 0) > 0 ? '#f3f4f6' : '#f9fafb',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                color: (auction.biddersCount || auction.bids || 0) > 0 ? '#374151' : '#9ca3af',
                border: `1px solid ${(auction.biddersCount || auction.bids || 0) > 0 ? '#e5e7eb' : '#f3f4f6'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={(e) => {
                e.stopPropagation();
                setBiddersPopupVisible(true);
              }}
              onMouseEnter={(e) => {
                const totalBidders = auction.biddersCount || auction.bids || 0;
                e.target.style.backgroundColor = totalBidders > 0 ? '#e5e7eb' : '#f3f4f6';
                e.target.style.borderColor = totalBidders > 0 ? '#d1d5db' : '#e5e7eb';
                if (totalBidders === 0) {
                  e.target.style.color = '#6b7280';
                }
              }}
              onMouseLeave={(e) => {
                const totalBidders = auction.biddersCount || auction.bids || 0;
                e.target.style.backgroundColor = totalBidders > 0 ? '#f3f4f6' : '#f9fafb';
                e.target.style.borderColor = totalBidders > 0 ? '#e5e7eb' : '#f3f4f6';
                e.target.style.color = totalBidders > 0 ? '#374151' : '#9ca3af';
              }}
            >
              <UserOutlined style={{ fontSize: '12px' }} />
              {auction.biddersCount || auction.bids || 0}
            </div>

            <Button
              type="text"
              icon={<ArrowRightOutlined />}
              size="large"
              style={{
                height: '40px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                color: '#6b7280',
                transition: 'all 0.2s ease'
              }}
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails?.(auction.id);
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#2563eb';
                e.target.style.color = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.color = '#6b7280';
              }}
            />
          </div>
        </Space>
      </div>

      {/* Modern Live Bid Notifications */}
      {bidNotifications.map((notification) => (
        <div
          key={notification.id}
          style={{
            position: 'absolute',
            top: '50%',
            right: '20px',
            transform: 'translateY(-50%)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            color: '#0f172a',
            padding: '16px 20px',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '14px',
            fontWeight: '600',
            zIndex: 1000,
            border: '1px solid rgba(148, 163, 184, 0.2)',
            animation: 'slideInRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), fadeOut 0.4s ease-out 3s',
            maxWidth: '280px'
          }}
        >
          {/* Bid Activity Icon */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
            flexShrink: 0
          }}>
            <ThunderboltOutlined style={{
              color: 'white',
              fontSize: '16px'
            }} />
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: '13px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '2px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              New Bid Placed
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '2px',
              background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              ${formatCurrency(notification.bidAmount)}
            </div>
            <div style={{
              fontSize: '11px',
              color: '#64748b',
              fontWeight: '500'
            }}>
              by {notification.bidderName}
            </div>
          </div>

          {/* Avatar */}
          <Avatar
            src={notification.avatar}
            size={36}
            style={{
              border: '2px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              flexShrink: 0
            }}
          />

          {/* Close indicator */}
          <div style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '12px',
            height: '12px',
            backgroundColor: '#ef4444',
            borderRadius: '50%',
            border: '2px solid white',
            animation: 'pulse 2s infinite'
          }} />
        </div>
      ))}

      {/* Random Bidders Popups */}
      {biddersPopups.map((popup) => (
        <div
          key={popup.id}
          style={{
            position: 'absolute',
            top: '50%',
            right: '25%',
            transform: 'translateY(-50%)',
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.95) 0%, rgba(139, 92, 246, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            color: '#ffffff',
            padding: '14px 18px',
            borderRadius: '20px',
            boxShadow: '0 16px 32px rgba(168, 85, 247, 0.25), 0 8px 16px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            fontWeight: '600',
            zIndex: 1000,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            animation: 'slideInRight 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), fadeOut 0.3s ease-out 2.7s',
            maxWidth: '240px'
          }}
        >
          {/* Avatar */}
          <Avatar
            src={popup.avatar}
            size={32}
            style={{
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              flexShrink: 0
            }}
          />

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '2px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              New Bidder!
            </div>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.95)',
              lineHeight: '1.2'
            }}>
              {popup.bidderName}
            </div>
            <div style={{
              fontSize: '10px',
              color: 'rgba(255, 255, 255, 0.7)',
              marginTop: '2px'
            }}>
              Just joined the auction
            </div>
          </div>

          {/* Activity indicator */}
          <div style={{
            width: '6px',
            height: '6px',
            backgroundColor: '#22c55e',
            borderRadius: '50%',
            animation: 'pulse 1.5s infinite'
          }} />
        </div>
      ))}
    </Card>

    {/* Quick View Modal */}
    <Modal
      open={previewVisible}
      onCancel={handleModalClose}
      footer={null}
      width="95vw"
      style={{ maxWidth: '1400px' }}
      styles={{
        body: { padding: 0, borderRadius: '20px', overflow: 'hidden' },
        mask: { backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)' },
        content: { borderRadius: '20px', overflow: 'hidden' }
      }}
      destroyOnHidden
      centered
    >
      <div style={{
        display: 'flex',
        height: '85vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
      }}>
        {/* Left Side - Image Gallery */}
        <div style={{
          flex: 1.2,
          position: 'relative',
          background: 'linear-gradient(45deg, #1a1a1a 0%, #2a2a2a 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20px 0 0 20px',
          overflow: 'hidden'
        }}>
          {/* Navigation Buttons */}
          {allPhotos.length > 1 && (
            <>
              <Button
                type="text"
                icon={<LeftOutlined />}
                onClick={handlePreviousImage}
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'white',
                  fontSize: '24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(-50%) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(-50%) scale(1)';
                }}
              />
              <Button
                type="text"
                icon={<RightOutlined />}
                onClick={handleNextImage}
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'white',
                  fontSize: '24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(-50%) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(-50%) scale(1)';
                }}
              />
            </>
          )}

          {/* Top Right Controls */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            zIndex: 10
          }}>
            {/* Condition Indicator - Hide for Featured Auctions */}
            {auction.condition && sectionId !== 'featured-auctions' && (
              <div style={{
                backgroundColor: getConditionColor(auction.condition),
                color: 'white',
                padding: '8px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                textTransform: 'uppercase',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <StarOutlined />
                {auction.condition}
              </div>
            )}

            {/* Hot Deal Indicator for Featured Auctions */}
            {auction.isHotDeal && sectionId === 'featured-auctions' && (
              <div style={{
                backgroundColor: 'rgba(245, 101, 101, 0.9)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '700',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 4px 12px rgba(245, 101, 101, 0.3)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                animation: 'pulse 2s infinite'
              }}>
                <ThunderboltOutlined />
                Hot Deal
              </div>
            )}

            {/* Live Auction Indicator for Featured Auctions */}
            {auction.isLive && sectionId === 'featured-auctions' && (
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.9)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '700',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                animation: 'pulse 2s infinite'
              }}>
                🔴 Live
              </div>
            )}

            {/* Zoom Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Button
                type="text"
                icon={<ZoomInOutlined />}
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                style={{
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease',
                  opacity: zoomLevel >= 3 ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                  if (zoomLevel < 3) {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (zoomLevel < 3) {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'scale(1)';
                  }
                }}
              />
              <Button
                type="text"
                icon={<ZoomOutOutlined />}
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                style={{
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease',
                  opacity: zoomLevel <= 1 ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                  if (zoomLevel > 1) {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (zoomLevel > 1) {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'scale(1)';
                  }
                }}
              />
            </div>
          </div>

          {/* Main Image */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              cursor: zoomLevel > 1 ? 'grab' : 'default'
            }}
            onMouseMove={handleMouseMove}
          >
            <img
              src={allPhotos[currentImageIndex] || mainPhoto}
              alt={`${auction.title} - Image ${currentImageIndex + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: zoomLevel > 1 ? 'contain' : 'contain',
                transform: `scale(${zoomLevel})`,
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                transition: zoomLevel === 1 ? 'transform 0.3s ease' : 'none'
              }}
              draggable={false}
            />
          </div>

          {/* Image Counter */}
          {allPhotos.length > 1 && (
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px'
            }}>
              {currentImageIndex + 1} / {allPhotos.length}
            </div>
          )}

          {/* Thumbnail Strip */}
          {allPhotos.length > 1 && (
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              right: '20px',
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              {allPhotos.slice(0, 6).map((photo, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setZoomLevel(1);
                    setZoomPosition({ x: 0, y: 0 });
                  }}
                  style={{
                    width: '50px',
                    height: '35px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: currentImageIndex === index ? '2px solid white' : '2px solid transparent',
                    cursor: 'pointer',
                    opacity: currentImageIndex === index ? 1 : 0.7,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <img
                    src={photo}
                    alt={`Thumb ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              ))}
              {allPhotos.length > 5 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'white',
                  fontSize: '12px',
                  marginLeft: '8px'
                }}>
                  +{allPhotos.length - 6} more
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side - Car Details */}
        <div style={{
          flex: 1,
          padding: '48px',
          overflowY: 'auto',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '0 20px 20px 0'
        }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <Title level={2} style={{
              marginBottom: '16px',
              color: '#0f172a',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {auction.title}
            </Title>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              color: '#64748b',
              fontSize: '16px'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <EnvironmentOutlined style={{ color: '#3b82f6' }} />
                {auction.location || 'Location not specified'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CalendarOutlined style={{ color: '#8b5cf6' }} />
                {auction.year || 'Year not specified'}
              </span>
            </div>
          </div>

          {/* Price Section */}
          <div style={{
            marginBottom: '32px',
            padding: '32px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(148, 163, 184, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <Text style={{
                fontSize: '16px',
                color: '#64748b',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Current Bid
              </Text>
              <div style={{
                fontSize: '36px',
                fontWeight: '800',
                color: '#0f172a',
                marginTop: '8px',
                background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                ${auction.currentBid?.toLocaleString() || '0'}
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '20px',
              borderTop: '1px solid rgba(148, 163, 184, 0.2)'
            }}>
              <div style={{ flex: 1 }}>
                <Text style={{
                  fontSize: '14px',
                  color: '#64748b',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Time Left
                </Text>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: timeLeft === 'ENDED' ? '#ef4444' : '#dc2626',
                  marginTop: '4px'
                }}>
                  {timeLeft}
                </div>
              </div>
              <div style={{
                flex: 1,
                textAlign: 'right',
                paddingLeft: '20px',
                borderLeft: '1px solid rgba(148, 163, 184, 0.2)'
              }}>
                <Text style={{
                  fontSize: '14px',
                  color: '#64748b',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Active Bidders
                 </Text>
                 <div style={{
                   fontSize: '24px',
                   fontWeight: '700',
                   color: '#0f172a',
                   marginTop: '4px'
                 }}>
                   {auction.biddersCount || auction.bids || 0}
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Details */}
          <div style={{ marginBottom: '32px' }}>
            <Title level={4} style={{
              marginBottom: '24px',
              color: '#0f172a',
              fontWeight: '700',
              fontSize: '20px'
            }}>
              Vehicle Details
            </Title>
            <Row gutter={[20, 16]}>
              <Col span={12}>
                <div style={{
                  padding: '20px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  borderRadius: '16px',
                  border: '1px solid rgba(148, 163, 184, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
                >
                  <Text style={{
                    fontSize: '13px',
                    color: '#64748b',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'block',
                    marginBottom: '8px'
                  }}>
                    Engine
                  </Text>
                  <Text style={{
                    fontWeight: '700',
                    fontSize: '16px',
                    color: '#0f172a'
                  }}>
                    {auction.engine || 'N/A'}
                  </Text>
                </div>
              </Col>
              <Col span={12}>
                <div style={{
                  padding: '20px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  borderRadius: '16px',
                  border: '1px solid rgba(148, 163, 184, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
                >
                  <Text style={{
                    fontSize: '13px',
                    color: '#64748b',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'block',
                    marginBottom: '8px'
                  }}>
                    Transmission
                  </Text>
                  <Text style={{
                    fontWeight: '700',
                    fontSize: '16px',
                    color: '#0f172a'
                  }}>
                    {auction.transmission || 'N/A'}
                  </Text>
                </div>
              </Col>
              <Col span={12}>
                <div style={{
                  padding: '20px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  borderRadius: '16px',
                  border: '1px solid rgba(148, 163, 184, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
                >
                  <Text style={{
                    fontSize: '13px',
                    color: '#64748b',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'block',
                    marginBottom: '8px'
                  }}>
                    Mileage
                  </Text>
                  <Text style={{
                    fontWeight: '700',
                    fontSize: '16px',
                    color: '#0f172a'
                  }}>
                    {auction.mileage ? `${auction.mileage.toLocaleString()} miles` : 'N/A'}
                  </Text>
                </div>
              </Col>
              <Col span={12}>
                <div style={{
                  padding: '20px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  borderRadius: '16px',
                  border: '1px solid rgba(148, 163, 184, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
                >
                  <Text style={{
                    fontSize: '13px',
                    color: '#64748b',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'block',
                    marginBottom: '8px'
                  }}>
                    Condition
                  </Text>
                  <Text style={{
                    fontWeight: '700',
                    fontSize: '16px',
                    color: '#0f172a'
                  }}>
                    {auction.condition || 'N/A'}
                  </Text>
                </div>
              </Col>
            </Row>
          </div>

          {/* Features */}
          <div style={{ marginBottom: '32px' }}>
            <Title level={4} style={{
              marginBottom: '20px',
              color: '#0f172a',
              fontWeight: '700',
              fontSize: '20px'
            }}>
              Features & Certifications
            </Title>
            <Space wrap size={[12, 12]}>
              {auction.transportReady && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                  border: '1px solid #86efac',
                  borderRadius: '12px',
                  color: '#166534',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
                >
                  <TruckOutlined />
                  Transport Ready
                </div>
              )}
              {auction.verifiedSeller && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                  border: '1px solid #93c5fd',
                  borderRadius: '12px',
                  color: '#1e40af',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
                >
                  <CheckCircleOutlined />
                  Verified Seller
                </div>
              )}
              {auction.isLive && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                  border: '1px solid #fca5a5',
                  borderRadius: '12px',
                  color: '#dc2626',
                  fontWeight: '600',
                  fontSize: '14px',
                  animation: 'pulse 2s infinite',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
                >
                  <ThunderboltOutlined />
                  Live Auction
                </div>
              )}
            </Space>
          </div>

          {/* Action Buttons */}
          <div style={{
            marginTop: '40px',
            paddingTop: '32px',
            borderTop: '1px solid rgba(148, 163, 184, 0.2)'
          }}>
            <Space direction="vertical" style={{ width: '100%', gap: '16px' }}>
              {/* Place Bid Button with Bidders Count */}
              <div style={{ position: 'relative' }}>
                <Button
                  type="primary"
                  icon={<ThunderboltOutlined />}
                  size="large"
                  block
                  style={{
                    height: '56px',
                    fontWeight: '700',
                    fontSize: '16px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)',
                    border: 'none',
                    boxShadow: '0 8px 32px rgba(37, 99, 235, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 40px rgba(37, 99, 235, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 32px rgba(37, 99, 235, 0.3)';
                  }}
                  onClick={() => {
                    onPlaceBid?.(auction.id);
                    handleModalClose();
                  }}
                >
                  Place Your Bid
                </Button>

                {/* Bidders Count Indicator for Modal */}
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 10px',
                  backgroundColor: (auction.biddersCount || auction.bids || 0) > 0 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: (auction.biddersCount || auction.bids || 0) > 0 ? '#374151' : '#9ca3af',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(8px)'
                }}>
                  <UserOutlined style={{ fontSize: '12px' }} />
                  {auction.biddersCount || auction.bids || 0}
                </div>
              </div>

              <Button
                type="default"
                icon={<ArrowRightOutlined />}
                size="large"
                block
                style={{
                  height: '56px',
                  fontWeight: '600',
                  fontSize: '16px',
                  borderRadius: '16px',
                  border: '2px solid #e2e8f0',
                  background: 'transparent',
                  color: '#475569',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.color = '#2563eb';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 16px rgba(37, 99, 235, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.color = '#475569';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
                onClick={() => {
                  onViewDetails?.(auction.id);
                  handleModalClose();
                }}
              >
                View Full Details
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </Modal>

    {/* Bidders Popup Modal */}
    <Modal
      open={biddersPopupVisible}
      onCancel={() => setBiddersPopupVisible(false)}
      footer={null}
      width={400}
      centered
      styles={{
        body: { padding: '24px' },
        mask: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
      }}
      destroyOnHidden
    >
      <div style={{ textAlign: 'center' }}>
        <Title level={4} style={{ marginBottom: '20px', color: '#1f2937' }}>
          Recent Bidders
        </Title>

        <div style={{ marginBottom: '20px' }}>
          <Text style={{ fontSize: '16px', color: '#6b7280' }}>
            Total Bidders: <strong style={{ color: '#1f2937' }}>{auction.biddersCount || auction.bids || 0}</strong>
          </Text>
        </div>

        {auction.recentBidders && auction.recentBidders.length > 0 ? (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '20px'
          }}>
            {auction.recentBidders.map((bidder, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-4px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <Avatar
                  size={48}
                  src={bidder.avatar || getRandomAvatar()}
                  style={{
                    border: '2px solid #10b981',
                    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.2)'
                  }}
                />
                <div style={{ textAlign: 'center' }}>
                  <Text style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#1f2937',
                    display: 'block'
                  }}>
                    {bidder.name || `Bidder ${index + 1}`}
                  </Text>
                  <Text style={{
                    fontSize: '10px',
                    color: '#6b7280'
                  }}>
                    Recent bidder
                  </Text>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '40px 20px', textAlign: 'center' }}>
            <UserOutlined style={{
              fontSize: '48px',
              color: '#d1d5db',
              marginBottom: '16px'
            }} />
            <Text style={{ color: '#6b7280' }}>
              No recent bidders to display
            </Text>
          </div>
        )}

        {/* Generate random bidders for demo */}
        {(!auction.recentBidders || auction.recentBidders.length === 0) && (
          <div style={{ marginTop: '20px' }}>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                // Generate fake recent bidders for demo
                const fakeBidders = Array.from({ length: Math.min(auction.biddersCount, 6) }, (_, i) => ({
                  name: `Bidder ${i + 1}`,
                  avatar: getRandomAvatar()
                }));
                // Note: In a real app, this would update the auction data
                console.log('Demo bidders:', fakeBidders);
              }}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: 'none'
              }}
            >
              Generate Demo Bidders
            </Button>
          </div>
        )}

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Button
            type="default"
            onClick={() => setBiddersPopupVisible(false)}
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
    </>
  );
};

AuctionCard2025.propTypes = {
  auction: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    mileage: PropTypes.number.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    currentBid: PropTypes.number.isRequired,
    timeLeft: PropTypes.string,
    endTime: PropTypes.string,
    biddersCount: PropTypes.number,
    recentBidders: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string
    })),
    location: PropTypes.string,
    engine: PropTypes.string,
    transmission: PropTypes.string,
    condition: PropTypes.string,
    isLive: PropTypes.bool,
    isHotDeal: PropTypes.bool,
    transportReady: PropTypes.bool,
    verifiedSeller: PropTypes.bool,
    aiMatchScore: PropTypes.number
  }).isRequired,
  onPlaceBid: PropTypes.func,
  onViewDetails: PropTypes.func,
  showExtraData: PropTypes.bool,
  liveUpdateInterval: PropTypes.number,
  visualTheme: PropTypes.object,
  sectionId: PropTypes.string
};

export default AuctionCard2025;
