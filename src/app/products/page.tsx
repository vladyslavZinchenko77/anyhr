import { Suspense } from 'react';
import { Typography, Grid, Card, CardContent, Box } from '@mui/material';
import CustomPagination from '@/components/common/Pagination/CustomPagination';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductsResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
}

async function getProducts(page: number): Promise<ProductsResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products?page=${page}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const { products, totalPages, currentPage } = await getProducts(page);

  return (
    <Box component="main" sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Products Catalog
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {product.name}
                </Typography>
                <Typography color="text.secondary">${product.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Suspense fallback={<div>Loading...</div>}>
          <CustomPagination totalPages={totalPages} currentPage={currentPage} />
        </Suspense>
      </Box>
    </Box>
  );
}
