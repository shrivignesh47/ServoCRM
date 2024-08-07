import React from 'react';
import { Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';

interface Ticket {
  id: string;
  issue: string;
  status: string;
  priority: string;
}

interface TicketContentsProps {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
}

const TicketContents: React.FC<TicketContentsProps> = ({ tickets, loading, error }) => {
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div className="content">
      {tickets.map(ticket => (
        <Card key={ticket.id}>
          <CardContent>
            <Typography variant="h6">{ticket.issue}</Typography>
            <Typography variant="body2">Status: {ticket.status}</Typography>
            <Typography variant="body2">Priority: {ticket.priority}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TicketContents;
