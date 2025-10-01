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
    // Clear localStorage before each test
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

  it('shows loading state during API call', async () => {
    renderWithProviders(<FavoriteButton bill={mockBill} />);
    
    const button = screen.getByLabelText('Add to favorites');
    fireEvent.click(button);

    // Should show loading state briefly
    expect(button).toBeDisabled();
  });
});
