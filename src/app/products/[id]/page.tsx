import { Typography, Box, Paper } from '@mui/material';
import { Metadata } from 'next';

interface Product {
  id: number;
  name: string;
  price: number;
}

async function getProduct(id: string): Promise<Product> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://anyhr-three.vercel.app/';
  const res = await fetch(`${baseUrl}/api/products/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await getProduct(params.id);

  return {
    title: `${product.name} | Our Store`,
    description: `Details about ${product.name}`,
  };
}

export async function generateStaticParams() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://anyhr-three.vercel.app/';

  const res = await fetch(`${baseUrl}/api/products`);
  const data = await res.json();

  return data.products.map((product: Product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return (
    <>
      <Box component="main" sx={{ padding: 3 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Price: ${product.price}
          </Typography>
          <Typography variant="body1">
            Product description goes here...
          </Typography>
        </Paper>
      </Box>
    </>
  );
}
