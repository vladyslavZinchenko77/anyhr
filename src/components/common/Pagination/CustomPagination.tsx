'use client';

import { Pagination as MUIPagination } from '@mui/material';
import { useRouter } from 'next/navigation';

interface CustomPaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function CustomPagination({
  totalPages,
  currentPage,
}: CustomPaginationProps) {
  const router = useRouter();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push(`/products?page=${value}`);
  };

  return (
    <MUIPagination
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
      color="primary"
    />
  );
}
