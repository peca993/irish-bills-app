import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Chip,
  IconButton,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useFavoritesStore } from '../../stores/favoritesStore';
import { BillModal } from '../molecules/BillModal';
import type { Bill, FavoriteBill } from '../../types/bill';

export const FavoritesTable = () => {
  const { favorites, removeFavorite } = useFavoritesStore();
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const theme = useTheme();
  const isTabletOrBelow = useMediaQuery(theme.breakpoints.down('lg')); // Cards for tablet and below

  const handleRowClick = (favorite: FavoriteBill) => {
    // Transform favorite back to Bill format for modal
    const bill: Bill = {
      id: favorite.id,
      bill: {
        billNo: favorite.billNo,
        billType: favorite.billType,
        status: favorite.status,
        sponsor: {
          by: {
            showAs: favorite.sponsor,
          },
        },
        titles: {
          title: [
            { lang: 'en', value: favorite.englishTitle },
            { lang: 'ga', value: favorite.irishTitle },
          ],
        },
        uri: `favorite-${favorite.billNo}`,
      },
    };
    setSelectedBill(bill);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBill(null);
  };

  const handleRemoveFavorite = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await removeFavorite(id);
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  if (favorites.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No favorite bills yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click the heart icon on any bill to add it to your favorites
        </Typography>
      </Box>
    );
  }

  // Card view for tablet and below
  if (isTabletOrBelow) {
    return (
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {favorites.map((favorite) => (
              <Card
                key={favorite.id}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleRowClick(favorite)}
              >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box>
                          <Typography variant="h6" component="h3">
                            {favorite.billNo}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                            {favorite.id.slice(0, 8)}
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={(e) => handleRemoveFavorite(favorite.id, e)}
                          aria-label="Remove from favorites"
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                <Typography color="text.secondary" gutterBottom>
                  {favorite.billType}
                </Typography>
                <Chip
                  label={favorite.status}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2">
                  Sponsor: {favorite.sponsor}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        
        <BillModal bill={selectedBill} open={modalOpen} onClose={handleCloseModal} />
      </Box>
    );
  }

  // Desktop table view (large screens and up)
  return (
    <Paper elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
      <TableContainer>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600, width: '20%' }}>Bill Number</TableCell>
              <TableCell sx={{ fontWeight: 600, width: '18%' }}>Bill Type</TableCell>
              <TableCell sx={{ fontWeight: 600, width: '15%' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, width: '37%' }}>Sponsor</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, width: '10%' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {favorites.map((favorite) => (
              <TableRow
                key={favorite.id}
                hover
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
                onClick={() => handleRowClick(favorite)}
              >
                <TableCell sx={{ py: 2.5 }}>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {favorite.billNo}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                      {favorite.id.slice(0, 8)}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ py: 2.5 }}>
                  <Typography variant="body2">{favorite.billType}</Typography>
                </TableCell>
                <TableCell sx={{ py: 2.5 }}>
                  <Chip
                    label={favorite.status}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell sx={{ py: 2.5 }}>
                  <Typography variant="body2">{favorite.sponsor}</Typography>
                </TableCell>
                <TableCell align="center" sx={{ py: 2.5 }}>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={(e) => handleRemoveFavorite(favorite.id, e)}
                    aria-label="Remove from favorites"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <BillModal bill={selectedBill} open={modalOpen} onClose={handleCloseModal} />
    </Paper>
  );
};
