import React from 'react';
import { Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import '../dashboard.scss'
interface Account {
  id: string;
  name: string;
  industry: string;
  revenue: string;
  employees: number;
}

interface AccountContentsProps {
  accounts: Account[];
  loading: boolean;
  error: string | null;
}

const AccountContents: React.FC<AccountContentsProps> = ({ accounts, loading, error }) => {
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div className="content">
       <Typography variant="h4">Accounts</Typography>
      {accounts.map(account => (
        <Card key={account.id}>
          <CardContent>
            <Typography variant="h6">{account.name}</Typography>
            <Typography variant="body2">Industry: {account.industry}</Typography>
            <Typography variant="body2">Revenue: {account.revenue}</Typography>
            <Typography variant="body2">Employees: {account.employees}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AccountContents;
