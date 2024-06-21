import { Typography, Box, Paper } from '@mui/material';
import { Metadata } from 'next';

interface Product {
  id: number;
  name: string;
  price: number;
}

const apiBaseUrl = '/api/products';

async function getProduct(id: string): Promise<Product> {
  try {
    const res = await fetch(`${apiBaseUrl}/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const product = await getProduct(params.id);
    return {
      title: `${product.name} | Our Store`,
      description: `Details about ${product.name}`,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Product | Our Store',
      description: 'Product details',
    };
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(apiBaseUrl);
    if (!res.ok) {
      throw new Error(
        `Failed to fetch products: ${res.status} ${res.statusText}`
      );
    }
    const data = await res.json();

    return data.products.map((product: Product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const product = await getProduct(params.id);

    return (
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
    );
  } catch (error) {
    return (
      <Box component="main" sx={{ padding: 3 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Error Loading Product
          </Typography>
          <Typography variant="body1">
            Sorry, we couldn't load the product information. Please try again
            later.
          </Typography>
        </Paper>
      </Box>
    );
  }
}
