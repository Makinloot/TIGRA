import { theme } from 'antd';

export const themeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Primary colors for automotive/auction theme
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',

    // Typography
    fontSize: 14,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',

    // Spacing
    margin: 16,
    padding: 16,

    // Border radius
    borderRadius: 6,
    borderRadiusLG: 8,

    // Box shadow for cards
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    boxShadowSecondary: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  components: {
    Card: {
      borderRadiusLG: 12,
    },
    Button: {
      borderRadius: 6,
      fontWeight: 500,
    },
    Input: {
      borderRadius: 6,
    },
    Statistic: {
      fontSizeHeading3: 24,
      colorTextDescription: '#666',
    },
  },
};

export const darkThemeConfig = {
  ...themeConfig,
  algorithm: theme.darkAlgorithm,
  token: {
    ...themeConfig.token,
    colorBgContainer: '#1f1f1f',
    colorBgElevated: '#262626',
    colorText: '#ffffff',
    colorTextSecondary: '#a6a6a6',
  },
};
