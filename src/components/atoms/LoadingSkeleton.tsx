import { Skeleton, TableCell, TableRow } from '@mui/material';

interface LoadingSkeletonProps {
  rows?: number;
  columns?: number;
}

export const LoadingSkeleton = ({ rows = 5, columns = 5 }: LoadingSkeletonProps) => {
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
