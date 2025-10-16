// TODO-FX: Implement full i18n solution with react-i18next when backend ready

export const translations = {
  en: {
    // Navigation
    home: "Home",
    auctions: "Auctions",
    logistics: "Logistics",
    crm: "CRM",
    support: "Support",

    // Hero
    heroHeadline: "Smart Auto Auctions. Global Logistics.",
    heroSubtext: "Search, bid, and ship vehicles worldwide — powered by AI logistics.",
    joinAuction: "Join Live Auction",
    howItWorks: "How It Works",

    // How It Works
    browseVehicles: "Browse vehicles across auctions",
    placeBids: "Place secure bids with instant verification",
    arrangeShipping: "Arrange shipping directly in platform",

    // Footer
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    contact: "Contact Us",
    about: "About Us"
  },
  ru: {
    // Navigation
    home: "Главная",
    auctions: "Аукционы",
    logistics: "Логистика",
    crm: "CRM",
    support: "Поддержка",

    // Hero
    heroHeadline: "Умные автоаукционы. Глобальная логистика.",
    heroSubtext: "Ищите, торгуйтесь и доставляйте автомобили по всему миру — powered by AI логистики.",
    joinAuction: "Присоединиться к живому аукциону",
    howItWorks: "Как это работает",

    // How It Works
    browseVehicles: "Просматривайте автомобили на аукционах",
    placeBids: "Размещайте защищенные ставки с мгновенной верификацией",
    arrangeShipping: "Организуйте доставку прямо на платформе",

    // Footer
    terms: "Условия обслуживания",
    privacy: "Политика конфиденциальности",
    contact: "Связаться с нами",
    about: "О нас"
  }
};

// Stub function for translation
export const t = (key, lang = 'en') => {
  return translations[lang]?.[key] || key;
};

// Stub hook for language context
export const useTranslation = () => ({
  t: (key) => t(key, 'en'), // Default to English
  i18n: {
    language: 'en',
    changeLanguage: (lang) => console.log('Language changed to:', lang)
  }
});
