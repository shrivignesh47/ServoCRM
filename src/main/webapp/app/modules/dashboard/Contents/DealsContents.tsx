import React from 'react';
import { Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';

interface Deal {
  id: string;
  title: string;
  amount: string;
  stage: string;
}

interface DealsContentsProps {
  deals: Deal[];
  loading: boolean;
  error: string | null;
}

const DealsContents: React.FC<DealsContentsProps> = ({ deals, loading, error }) => {
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div className="content">
      {deals.map(deal => (
        <Card key={deal.id}>
          <CardContent>
            <Typography variant="h6">{deal.title}</Typography>
            <Typography variant="body2">Amount: {deal.amount}</Typography>
            <Typography variant="body2">Stage: {deal.stage}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DealsContents;
