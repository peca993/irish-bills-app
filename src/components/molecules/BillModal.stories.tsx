import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { BillModal } from './BillModal';
import type { Bill } from '../../types/bill';

const mockBill: Bill = {
  id: '12345',
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
        {
          lang: 'en',
          value:
            'An Act to provide for the establishment of a new framework for environmental protection and sustainable development in Ireland.',
        },
        {
          lang: 'ga',
          value:
            'Acht chun soláthar a dhéanamh do bhunú creat nua um chosaint comhshaoil agus forbairt inbhuanaithe in Éirinn.',
        },
      ],
    },
    uri: 'sample-bill-uri',
  },
};

const theme = createTheme();

const meta: Meta<typeof BillModal> = {
  title: 'Molecules/BillModal',
  component: BillModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A modal component that displays bill details with English and Irish language tabs.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  args: {
    onClose: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    bill: mockBill,
    open: true,
  },
};

export const Closed: Story = {
  args: {
    bill: mockBill,
    open: false,
  },
};

export const NoBill: Story = {
  args: {
    bill: null,
    open: true,
  },
};
