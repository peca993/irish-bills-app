import { Skeleton, TableCell, TableRow, Box } from '@mui/material';

interface LoadingSkeletonProps {
  rows?: number;
  columns?: number;
  variant?: 'table' | 'card';
}

export const LoadingSkeleton = ({
  rows = 5,
  columns = 5,
  variant = 'table',
}: LoadingSkeletonProps) => {
  if (variant === 'card') {
    return (
      <>
        {Array.from({ length: rows }).map((_, index) => (
          <Box key={index} sx={{ mb: 1 }}>
            <Skeleton variant="text" width="80%" />
          </Box>
        ))}
      </>
    );
  }

  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton variant="text" width="80%" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
