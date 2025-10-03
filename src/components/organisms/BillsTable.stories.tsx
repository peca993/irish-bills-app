import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import { BillsTable } from './BillsTable';

const theme = createTheme();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const meta: Meta<typeof BillsTable> = {
  title: 'Organisms/BillsTable',
  component: BillsTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A comprehensive table component for displaying Irish legislation bills with pagination, filtering, and favorites functionality. Features responsive design with card view on mobile devices.',
      },
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <div style={{ padding: '20px' }}>
            <Story />
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default view of the bills table with all features enabled.',
      },
    },
  },
};

export const WithFiltering: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The table includes a filter dropdown to filter bills by type (Public, Private, etc.).',
      },
    },
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'On mobile devices (below 900px), the table switches to a card-based layout for better usability.',
      },
    },
  },
};
