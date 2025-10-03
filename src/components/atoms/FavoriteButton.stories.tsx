import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import { FavoriteButton } from './FavoriteButton';
import type { Bill } from '../../types/bill';

const mockBill: Bill = {
  id: '1234',
  bill: {
    billNo: 'B001-2024',
    billType: 'Public Bill',
    status: 'Published',
    sponsor: {
      by: {
        showAs: 'John Doe TD',
      },
    },
    titles: {
      title: [
        { lang: 'en', value: 'Sample Bill for Testing' },
        { lang: 'ga', value: 'Bille Samplach le haghaidh Tástála' },
      ],
    },
    uri: 'sample-bill-uri',
  },
};

const theme = createTheme();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const meta: Meta<typeof FavoriteButton> = {
  title: 'Atoms/FavoriteButton',
  component: FavoriteButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A button component for favoriting/unfavoriting bills with optimistic UI updates.',
      },
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </QueryClientProvider>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    bill: mockBill,
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    bill: mockBill,
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    bill: mockBill,
    size: 'large',
  },
};
