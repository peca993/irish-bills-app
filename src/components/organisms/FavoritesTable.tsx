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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleRowClick = (favorite: FavoriteBill) => {
    // Transform favorite back to Bill format for modal
    const bill: Bill = {
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

  const handleRemoveFavorite = async (billNo: string, event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await removeFavorite(billNo);
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

  // Mobile card view
  if (isMobile) {
    return (
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {favorites.map((favorite) => (
            <Card
              key={favorite.billNo}
              sx={{ cursor: 'pointer' }}
              onClick={() => handleRowClick(favorite)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" component="h3">
                    {favorite.billNo}
                  </Typography>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={(e) => handleRemoveFavorite(favorite.billNo, e)}
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

  // Desktop table view
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bill Number</TableCell>
              <TableCell>Bill Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Sponsor</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {favorites.map((favorite) => (
              <TableRow
                key={favorite.billNo}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => handleRowClick(favorite)}
              >
                <TableCell>{favorite.billNo}</TableCell>
                <TableCell>{favorite.billType}</TableCell>
                <TableCell>
                  <Chip
                    label={favorite.status}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{favorite.sponsor}</TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={(e) => handleRemoveFavorite(favorite.billNo, e)}
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
