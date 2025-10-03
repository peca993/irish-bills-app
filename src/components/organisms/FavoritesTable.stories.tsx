import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { FavoritesTable } from './FavoritesTable';

const theme = createTheme();

const meta: Meta<typeof FavoritesTable> = {
  title: 'Organisms/FavoritesTable',
  component: FavoritesTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A table component for displaying favorited bills with the ability to remove favorites. Data is persisted in localStorage using Zustand.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ padding: '20px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Default view of the favorites table. Add bills to favorites from the main BillsTable to see them here.',
      },
    },
  },
};

export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When no bills are favorited, the table shows a helpful empty state message.',
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
        story: 'On mobile devices, favorites are displayed in a card-based layout.',
      },
    },
  },
};
