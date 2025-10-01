
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Alert,
  Box,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Typography,
  Chip,
} from '@mui/material';
import type { Bill } from '../../types/bill';
import { useBills } from '../../hooks/useBills';
import { LoadingSkeleton } from '../atoms/LoadingSkeleton';
import { FavoriteButton } from '../atoms/FavoriteButton';
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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { data, isLoading, error } = useBills({
    limit: rowsPerPage,
    skip: page * rowsPerPage,
    billType: billType || undefined,
  });

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

  // Mobile card view
  if (isMobile) {
    return (
      <Box>
        {isLoading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Card key={index}>
                <CardContent>
                  <LoadingSkeleton rows={3} columns={1} />
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {bills.map((bill) => (
              <Card
                key={bill.bill.uri}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleRowClick(bill)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" component="h3">
                      {bill.bill.billNo}
                    </Typography>
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
              <TableCell align="center">Favorite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <LoadingSkeleton rows={rowsPerPage} columns={5} />
            ) : (
              bills.map((bill) => (
                <TableRow
                  key={bill.bill.uri}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleRowClick(bill)}
                >
                  <TableCell>{bill.bill.billNo}</TableCell>
                  <TableCell>{bill.bill.billType}</TableCell>
                  <TableCell>
                    <Chip
                      label={bill.bill.status}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{bill.bill.sponsor?.by?.showAs || 'Unknown'}</TableCell>
                  <TableCell align="center">
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
