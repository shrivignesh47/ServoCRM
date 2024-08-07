import React from 'react';
import { Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';

interface Product {
  id: string;
  name: string;
  price: string;
  stock: number;
}

interface ProductsContentsProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const ProductsContents: React.FC<ProductsContentsProps> = ({ products, loading, error }) => {
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div className="content">
      {products.map(product => (
        <Card key={product.id}>
          <CardContent>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body2">Price: {product.price}</Typography>
            <Typography variant="body2">Stock: {product.stock}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductsContents;
