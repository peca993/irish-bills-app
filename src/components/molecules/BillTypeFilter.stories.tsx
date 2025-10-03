import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ThemeProvider, createTheme } from '@mui/material';
import { BillTypeFilter } from './BillTypeFilter';

const theme = createTheme();

const meta: Meta<typeof BillTypeFilter> = {
  title: 'Molecules/BillTypeFilter',
  component: BillTypeFilter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dropdown filter component for selecting bill types.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ minWidth: '250px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    value: {
      control: { type: 'select' },
      options: ['', 'Public', 'Private'],
    },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
  },
};

export const PublicBillSelected: Story = {
  args: {
    value: 'Public',
  },
};

export const PrivateBillSelected: Story = {
  args: {
    value: 'Private',
  },
};
