import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import { FavoriteButton } from '../FavoriteButton';
import type { Bill } from '../../../types/bill';

const mockBill: Bill = {
  bill: {
    billNo: 'TEST-001',
    billType: 'Public Bill',
    status: 'Published',
    sponsor: {
      by: {
        showAs: 'Test Sponsor',
      },
    },
    titles: {
      title: [
        { lang: 'en', value: 'Test Bill Title' },
        { lang: 'ga', value: 'Teideal Tástála' },
      ],
    },
    uri: 'test-uri',
  },
};

const mockBill2: Bill = {
  bill: {
    billNo: 'TEST-002',
    billType: 'Private Bill',
    status: 'Published',
    sponsor: {
      by: {
        showAs: 'Another Sponsor',
      },
    },
    titles: {
      title: [
        { lang: 'en', value: 'Another Test Bill' },
        { lang: 'ga', value: 'Bille Eile' },
      ],
    },
    uri: 'test-uri-2',
  },
};

const theme = createTheme();

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('FavoriteButton', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders unfavorited state initially', () => {
    renderWithProviders(<FavoriteButton bill={mockBill} />);
    
    const button = screen.getByLabelText('Add to favorites');
    expect(button).toBeInTheDocument();
  });

  it('toggles favorite state when clicked', async () => {
    renderWithProviders(<FavoriteButton bill={mockBill} />);
    
    const button = screen.getByLabelText('Add to favorites');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByLabelText('Remove from favorites')).toBeInTheDocument();
    });
  });

  it('toggles immediately with optimistic UI', () => {
    // Use a different bill to avoid localStorage conflicts
    renderWithProviders(<FavoriteButton bill={mockBill2} />);
    
    const addButton = screen.getByLabelText('Add to favorites');
    fireEvent.click(addButton);

    // Should toggle immediately (optimistic UI - no async wait needed)
    const removeButton = screen.getByLabelText('Remove from favorites');
    expect(removeButton).toBeInTheDocument();
  });
});
