import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useBills } from '../../hooks/useBills';
import { fetchBills } from '../../services/api';
import type { Bill } from '../../types/bill';
import { FavoriteButton } from '../atoms/FavoriteButton';
import { LoadingSkeleton } from '../atoms/LoadingSkeleton';
import { BillModal } from '../molecules/BillModal';

interface BillsTableProps {
  billType: string;
}

export const BillsTable = ({ billType }: BillsTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const theme = useTheme();
  const isTabletOrBelow = useMediaQuery(theme.breakpoints.down('md'));
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useBills({
    limit: rowsPerPage,
    skip: page * rowsPerPage,
    billType: billType || undefined,
  });

  // Prefetch next page for instant navigation
  useEffect(() => {
    const totalCount = data?.head?.counts?.resultCount || 0;
    const hasNextPage = (page + 1) * rowsPerPage < totalCount;

    if (hasNextPage && !isLoading) {
      const nextPageParams = {
        limit: rowsPerPage,
        skip: (page + 1) * rowsPerPage,
      };

      queryClient.prefetchQuery({
        queryKey: ['bills', nextPageParams],
        queryFn: () => fetchBills(nextPageParams),
      });
    }
  }, [page, rowsPerPage, data, isLoading, queryClient]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (bill: Bill) => {
    setSelectedBill(bill);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBill(null);
  };

  if (error) {
    return (
      <Alert severity="error">
        Failed to load bills: {error instanceof Error ? error.message : 'Unknown error'}
      </Alert>
    );
  }

  const bills = data?.results || [];
  const totalCount = data?.head?.counts?.resultCount || 0;

  // Card view for tablet and below
  if (isTabletOrBelow) {
    return (
      <Box>
        {isLoading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Card key={index}>
                <CardContent>
                  <LoadingSkeleton rows={4} variant="card" />
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {bills.map((bill) => (
              <Card key={bill.id} sx={{ cursor: 'pointer' }} onClick={() => handleRowClick(bill)}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="h6" component="h3">
                        {bill.bill.billNo}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: '0.65rem' }}
                      >
                        {bill.bill.billYear}
                      </Typography>
                    </Box>
                    <FavoriteButton bill={bill} size="small" />
                  </Box>
                  <Typography color="text.secondary" gutterBottom>
                    {bill.bill.billType}
                  </Typography>
                  <Chip
                    label={bill.bill.status}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2">
                    Sponsor: {bill.bill.sponsor?.by?.showAs || 'Unknown'}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 20, 50]}
        />

        <BillModal bill={selectedBill} open={modalOpen} onClose={handleCloseModal} />
      </Box>
    );
  }

  // Desktop table view (large screens and up)
  return (
    <Paper elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
      <TableContainer>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600, width: '20%' }}>Bill Number</TableCell>
              <TableCell sx={{ fontWeight: 600, width: '18%' }}>Bill Type</TableCell>
              <TableCell sx={{ fontWeight: 600, width: '15%' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, width: '37%' }}>Sponsor</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, width: '10%' }}>
                Favorite
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <LoadingSkeleton rows={rowsPerPage} columns={5} />
            ) : (
              bills.map((bill) => (
                <TableRow
                  key={bill.id}
                  hover
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                  onClick={() => handleRowClick(bill)}
                >
                  <TableCell sx={{ py: 2.5 }}>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {bill.bill.billNo}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: '0.65rem' }}
                      >
                        {bill.bill.billYear}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 2.5 }}>
                    <Typography variant="body2">{bill.bill.billType}</Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2.5 }}>
                    <Chip
                      label={bill.bill.status}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell sx={{ py: 2.5 }}>
                    <Typography variant="body2">
                      {bill.bill.sponsor?.by?.showAs || 'Unknown'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ py: 2.5 }}>
                    <FavoriteButton bill={bill} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 20, 50]}
      />

      <BillModal bill={selectedBill} open={modalOpen} onClose={handleCloseModal} />
    </Paper>
  );
};
