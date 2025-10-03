import { Close } from '@mui/icons-material';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import type { Bill } from '../../types/bill';
import { getBillTitle } from '../../utils/billUtils';

interface BillModalProps {
  bill: Bill | null;
  open: boolean;
  onClose: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`bill-tabpanel-${index}`}
      aria-labelledby={`bill-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export const BillModal = ({ bill, open, onClose }: BillModalProps) => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!bill) return null;

  const englishTitle = getBillTitle(bill, 'en');
  const irishTitle = getBillTitle(bill, 'ga');

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      aria-labelledby="bill-dialog-title"
    >
      <DialogTitle id="bill-dialog-title">
        Bill {bill.bill.billNo}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="bill language tabs">
            <Tab label="English" id="bill-tab-0" aria-controls="bill-tabpanel-0" />
            <Tab label="Gaeilge" id="bill-tab-1" aria-controls="bill-tabpanel-1" />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" component="h3" gutterBottom>
            English Title
          </Typography>
          <Typography variant="body1">{englishTitle}</Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" component="h3" gutterBottom>
            Teideal Gaeilge
          </Typography>
          <Typography variant="body1">{irishTitle}</Typography>
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};
