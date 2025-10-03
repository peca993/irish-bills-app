import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useFavoritesStore } from '../../stores/favoritesStore';
import { BillTypeFilter } from '../molecules/BillTypeFilter';
import { BillsTable } from '../organisms/BillsTable';
import { FavoritesTable } from '../organisms/FavoritesTable';


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
      id={`bills-tabpanel-${index}`}
      aria-labelledby={`bills-tab-${index}`}
    >
      {value === index && <Box sx={{ py: 3, px: { xs: 2, sm: 3, md: 3 } }}>{children}</Box>}
    </div>
  );
};

export const BillsPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [billTypeFilter, setBillTypeFilter] = useState('');
  const { favorites } = useFavoritesStore();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container  sx={{ py: 4, px: { xs: 2, sm: 3, md: 4, lg: 6 } }}>
      <Typography
        variant={isMobile ? 'h4' : 'h3'}
        component="h1"
        gutterBottom
        sx={{ textAlign: 'center', mb: 4 }}
      >
        Irish Bills Information
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="bills navigation tabs"
            variant={isMobile ? 'fullWidth' : 'standard'}
          >
            <Tab label="All Bills" id="bills-tab-0" aria-controls="bills-tabpanel-0" />
            <Tab
              label={`Favorites (${favorites.length})`}
              id="bills-tab-1"
              aria-controls="bills-tabpanel-1"
            />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <BillTypeFilter value={billTypeFilter} onChange={setBillTypeFilter} />
          </Box>
          <BillsTable billType={billTypeFilter} />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <FavoritesTable />
        </TabPanel>
      </Paper>
    </Container>
  );
};

