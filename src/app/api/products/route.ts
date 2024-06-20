import { NextResponse } from 'next/server';

 const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
    { id: 4, name: 'Product 4', price: 40 },
    { id: 5, name: 'Product 5', price: 50 },
    { id: 6, name: 'Product 6', price: 60 },
    { id: 7, name: 'Product 7', price: 70 },
    { id: 8, name: 'Product 8', price: 80 },
    { id: 9, name: 'Product 9', price: 90 },
    { id: 10, name: 'Product 10', price: 100 },
    { id: 11, name: 'Product 11', price: 110 },
    { id: 12, name: 'Product 12', price: 120 },
    { id: 13, name: 'Product 13', price: 130 },
    { id: 14, name: 'Product 14', price: 140 },
    { id: 15, name: 'Product 15', price: 150 },
  ];

  
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 10;
  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedProducts = products.slice(start, end);

  return NextResponse.json({
    products: paginatedProducts,
    totalPages: Math.ceil(products.length / limit),
    currentPage: page,
  });
}