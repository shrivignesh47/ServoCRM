// import React from 'react';
// import { Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';

// interface Ticket {
//   id: string;
//   issue: string;
//   status: string;
//   priority: string;
// }

// interface TicketContentsProps {
//   tickets: Ticket[];
//   loading: boolean;
//   error: string | null;
// }

// const TicketContents: React.FC<TicketContentsProps> = ({ tickets, loading, error }) => {
//   if (loading) return <CircularProgress />;
//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <div className="content">
//       {tickets.map(ticket => (
//         <Card key={ticket.id}>
//           <CardContent>
//             <Typography variant="h6">{ticket.issue}</Typography>
//             <Typography variant="body2">Status: {ticket.status}</Typography>
//             <Typography variant="body2">Priority: {ticket.priority}</Typography>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default TicketContents;
import React, { useState } from 'react';
import { Card, CardContent, Typography, CircularProgress, Alert, Grid, TextField, Select, MenuItem, SelectChangeEvent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './scss/TicketsContent.scss'; // Assuming you have a corresponding SCSS file

interface Ticket {
  id: string;
  issue: string;
  status: string;
  priority: string;
  contact_name?: string;
  account_name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  description?: string;
  product_name?: string;
  due_date?: string;
  language?: string;
  channel?: string;
  classifications?: string;
  attachments?: string;
  attachmentsContentType?: string;
  user?: {
    login: string;
  };
}

interface TicketContentsProps {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  collapsed: boolean;
}

const TicketContents: React.FC<TicketContentsProps> = ({ tickets, loading, error, collapsed }) => {
  const [filter, setFilter] = useState('');
  const [filterField, setFilterField] = useState('all');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleFilterFieldChange = (event: SelectChangeEvent<string>) => {
    setFilterField(event.target.value);
  };

  const applyFilter = (ticket: Ticket) => {
    const filterLower = filter.toLowerCase();
    return (
      (filterField === 'all' && (
        (ticket.issue && ticket.issue.toLowerCase().includes(filterLower)) ||
        (ticket.contact_name && ticket.contact_name.toLowerCase().includes(filterLower)) ||
        (ticket.account_name && ticket.account_name.toLowerCase().includes(filterLower)) ||
        (ticket.email && ticket.email.toLowerCase().includes(filterLower)) ||
        (ticket.phone && ticket.phone.toLowerCase().includes(filterLower)) ||
        (ticket.subject && ticket.subject.toLowerCase().includes(filterLower)) ||
        (ticket.description && ticket.description.toLowerCase().includes(filterLower)) ||
        (ticket.status && ticket.status.toLowerCase().includes(filterLower)) ||
        (ticket.product_name && ticket.product_name.toLowerCase().includes(filterLower)) ||
        (ticket.due_date && ticket.due_date.toLowerCase().includes(filterLower)) ||
        (ticket.language && ticket.language.toLowerCase().includes(filterLower)) ||
        (ticket.channel && ticket.channel.toLowerCase().includes(filterLower)) ||
        (ticket.classifications && ticket.classifications.toLowerCase().includes(filterLower)) ||
        (ticket.user && ticket.user.login.toLowerCase().includes(filterLower))
      )) ||
      (ticket[filterField as keyof Ticket] && ticket[filterField as keyof Ticket].toString().toLowerCase().includes(filterLower))
    );
  };

  const filteredTickets = tickets.filter(applyFilter);

  return (
    <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
      <div className={`content ${collapsed ? 'collapsed' : ''}`}>
        <div className="top-bar">
          <Typography variant="h4" color="#d3e3fdb3">Tickets</Typography>
          <Link to="/ticket/new" className="create-ticket-button">
            Create a new Ticket
          </Link>
        </div>
        <div className="filter-section">
          <Select
            value={filterField}
            onChange={handleFilterFieldChange}
            displayEmpty
            className="filter-select"
          >
            <MenuItem value="all">All Fields</MenuItem>
            <MenuItem value="issue">Issue</MenuItem>
            <MenuItem value="contact_name">Contact Name</MenuItem>
            <MenuItem value="account_name">Account Name</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="phone">Phone</MenuItem>
            <MenuItem value="subject">Subject</MenuItem>
            <MenuItem value="description">Description</MenuItem>
            <MenuItem value="status">Status</MenuItem>
            <MenuItem value="product_name">Product Name</MenuItem>
            <MenuItem value="due_date">Due Date</MenuItem>
            <MenuItem value="language">Language</MenuItem>
            <MenuItem value="channel">Channel</MenuItem>
            <MenuItem value="classifications">Classifications</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
          <TextField
            className="filter-input"
            label="Search Tickets"
            variant="outlined"
            value={filter}
            onChange={handleFilterChange}
            fullWidth
          />
        </div>
        <div className="data-section">
          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error}</Alert>}
          <div className="tickets-container">
            {filteredTickets.length > 0 ? (
              <Grid container spacing={3}>
                {filteredTickets.map(ticket => (
                  <Grid item xs={12} md={6} lg={4} key={ticket.id}>
                    <Card className="ticket-card" style={{backgroundColor:'#162c46'}}>
                      <CardContent>
                        <Typography variant="h6">{ticket.issue}</Typography>
                        <Typography className="ticket-info" color="#d3e3fdb3"><strong>Contact Name:</strong> {ticket.contact_name || 'N/A'}</Typography>
                        <Typography className="ticket-info" color="#d3e3fdb3"><strong>Account Name:</strong> {ticket.account_name || 'N/A'}</Typography>
                        <Typography className="ticket-info" color="#d3e3fdb3"><strong>Email:</strong> {ticket.email || 'N/A'}</Typography>
                        <Typography className="ticket-info" color="#d3e3fdb3"><strong>Phone:</strong> {ticket.phone || 'N/A'}</Typography>
                        <Typography className="ticket-info"color="#d3e3fdb3"><strong>Subject:</strong> {ticket.subject || 'N/A'}</Typography>
                        <Typography className="ticket-info"color="#d3e3fdb3"><strong>Description:</strong> {ticket.description || 'N/A'}</Typography>
                        <Typography className="ticket-info"color="#d3e3fdb3"><strong>Status:</strong> {ticket.status || 'N/A'}</Typography>
                        <Typography className="ticket-info"color="#d3e3fdb3"><strong>Product Name:</strong> {ticket.product_name || 'N/A'}</Typography>
                        <Typography className="ticket-info"color="#d3e3fdb3"><strong>Due Date:</strong> {ticket.due_date ? new Date(ticket.due_date).toLocaleDateString() : 'N/A'}</Typography>
                        <Typography className="ticket-info"color="#d3e3fdb3"><strong>Language:</strong> {ticket.language || 'N/A'}</Typography>
                        <Typography className="ticket-info"color="#d3e3fdb3"><strong>Channel:</strong> {ticket.channel || 'N/A'}</Typography>
                        <Typography className="ticket-info"color="#d3e3fdb3"><strong>Classifications:</strong> {ticket.classifications || 'N/A'}</Typography>
                        <Typography className="ticket-info" color="#d3e3fdb3">
                          <strong>Attachments:</strong>
                          {ticket.attachments ? (
                            <div>
                              {ticket.attachmentsContentType ? (
                                <a href={`data:${ticket.attachmentsContentType};base64,${ticket.attachments}`} target="_blank" rel="noopener noreferrer">
                                  Open &nbsp;
                                </a>
                              ) : null}
                              <span>
                                {ticket.attachmentsContentType}, {ticket.attachments?.length || 0} bytes
                              </span>
                            </div>
                          ) : 'N/A'}
                        </Typography>
                        <Typography className="ticket-info"><strong>User:</strong> {ticket.user ? ticket.user.login : 'N/A'}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>No tickets available.</Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketContents;
