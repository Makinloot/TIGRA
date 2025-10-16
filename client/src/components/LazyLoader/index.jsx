import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import './index.css';

const LazyLoader = () => (
  <div className="full-screen-loader-wrapper">
    <Flex align="center" justify="center" style={{ height: '100%' }}>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 64, color: 'var(--ant-color-primary)' }} spin />}
        size="large"
      />
    </Flex>
  </div>
);

export default LazyLoader;
