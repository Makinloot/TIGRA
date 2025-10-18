import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (lang) => {
    // TODO-FX: Replace with real API call if needed.
    // API Endpoint: POST /api/user/language
    // Expected Data: { language: string }
    i18n.changeLanguage(lang);
  };

  const options = [
    {
      label: '🇬🇪 ქართული',
      value: 'ka',
      key: 'ka'
    },
    {
      label: '🇬🇧 English',
      value: 'en',
      key: 'en'
    }
  ];

  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      options={options}
      style={{ width: 140 }}
      size="small"
      aria-label={t('common.language')}
    />
  );
};

LanguageSwitcher.propTypes = {};

export default LanguageSwitcher;

