import React from 'react';
import { render, screen } from '@testing-library/react';
import DispatchPhotoGallery from './index';

describe('DispatchPhotoGallery', () => {
  const defaultProps = {
    dispatchId: 'dispatch-123',
    photos: [],
    onPhotoUpdate: jest.fn(),
  };

  test('renders component with title', () => {
    render(<DispatchPhotoGallery {...defaultProps} />);
    expect(screen.getByText('Dispatch Photos')).toBeInTheDocument();
  });

  test('renders empty state', () => {
    render(<DispatchPhotoGallery {...defaultProps} />);
    expect(screen.getByText('Photo Gallery Not Implemented')).toBeInTheDocument();
  });

  test('renders with photos prop', () => {
    const propsWithPhotos = {
      ...defaultProps,
      photos: ['photo1.jpg', 'photo2.jpg'],
    };
    render(<DispatchPhotoGallery {...propsWithPhotos} />);
    // Component renders without error with photos
    expect(screen.getByText('Dispatch Photos')).toBeInTheDocument();
  });
});
