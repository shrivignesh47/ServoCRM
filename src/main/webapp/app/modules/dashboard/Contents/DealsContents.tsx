// import React from 'react';
// import { Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';

// interface Deal {
//   id: string;
//   title: string;
//   amount: string;
//   stage: string;
// }

// interface DealsContentsProps {
//   deals: Deal[];
//   loading: boolean;
//   error: string | null;
// }

// const DealsContents: React.FC<DealsContentsProps> = ({ deals, loading, error }) => {
//   if (loading) return <CircularProgress />;
//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <div className="content">
//       {deals.map(deal => (
//         <Card key={deal.id}>
//           <CardContent>
//             <Typography variant="h6">{deal.title}</Typography>
//             <Typography variant="body2">Amount: {deal.amount}</Typography>
//             <Typography variant="body2">Stage: {deal.stage}</Typography>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default DealsContents;
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, CircularProgress, Alert, Grid, TextField, Select, MenuItem, SelectChangeEvent, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './scss/DealsContent.scss'; // Assuming you have a corresponding SCSS file

interface Deal {
  id: string;
  title: string;
  amount: string;
  stage: string;
  closing_date?: string;
  type?: string;
  probability_Percentage?: number;
  campaign_Source?: string;
  description?: string;
  user?: {
    login: string;
  };
  accounts?: {
    id: string;
    account_owner: string;
  };
  contacts?: {
    id: string;
    first_name: string;
  };
  lead?: {
    id: string;
    lead_source: string;
  };
}

interface DealsContentsProps {
  deals: Deal[];
  loading: boolean;
  error: string | null;
  collapsed: boolean;
}

const DealsContents: React.FC<DealsContentsProps> = ({ deals, loading, error, collapsed }) => {
  const [filter, setFilter] = useState('');
  const [filterField, setFilterField] = useState('all');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleFilterFieldChange = (event: SelectChangeEvent<string>) => {
    setFilterField(event.target.value);
  };

  const applyFilter = (deal: Deal) => {
    const filterLower = filter.toLowerCase();
    return (
      (filterField === 'all' && (
        (deal.title && deal.title.toLowerCase().includes(filterLower)) ||
        (deal.amount && deal.amount.toString().includes(filterLower)) ||
        (deal.stage && deal.stage.toLowerCase().includes(filterLower)) ||
        (deal.closing_date && deal.closing_date.toLowerCase().includes(filterLower)) ||
        (deal.type && deal.type.toLowerCase().includes(filterLower)) ||
        (deal.campaign_Source && deal.campaign_Source.toLowerCase().includes(filterLower)) ||
        (deal.description && deal.description.toLowerCase().includes(filterLower)) ||
        (deal.user && deal.user.login.toLowerCase().includes(filterLower)) ||
        (deal.accounts && deal.accounts.account_owner.toLowerCase().includes(filterLower)) ||
        (deal.contacts && deal.contacts.first_name.toLowerCase().includes(filterLower)) ||
        (deal.lead && deal.lead.lead_source.toLowerCase().includes(filterLower))
      )) ||
      (deal[filterField as keyof Deal] && deal[filterField as keyof Deal].toString().toLowerCase().includes(filterLower))
    );
  };

  const filteredDeals = deals.filter(applyFilter);

  return (
    <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
      <div className={`content ${collapsed ? 'collapsed' : ''}`}>
        <div className="top-bar">
          <Typography variant="h4">Deals</Typography>
          <Link to="/deals/new" className="create-deal-button">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Deal
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
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="amount">Amount</MenuItem>
            <MenuItem value="stage">Stage</MenuItem>
            <MenuItem value="type">Type</MenuItem>
            <MenuItem value="campaign_Source">Campaign Source</MenuItem>
            <MenuItem value="description">Description</MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="accounts">Account</MenuItem>
            <MenuItem value="contacts">Contact</MenuItem>
            <MenuItem value="lead">Lead</MenuItem>
          </Select>
          <TextField
            className="filter-input"
            label="Search Deals"
            variant="outlined"
            value={filter}
            onChange={handleFilterChange}
            fullWidth
          />
        </div>
        <div className="data-section">
          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error}</Alert>}
          <div className="deals-container">
            {filteredDeals.length > 0 ? (
              <Grid container spacing={3}>
                {filteredDeals.map(deal => (
                  <Grid item xs={12} md={6} lg={4} key={deal.id}>
                    <Card className="deal-card">
                      <CardContent>
                        <Typography variant="h6">{deal.title}</Typography>
                        <Typography className="deal-info"><strong>Amount:</strong> {deal.amount}</Typography>
                        <Typography className="deal-info"><strong>Stage:</strong> {deal.stage}</Typography>
                        <Typography className="deal-info"><strong>Closing Date:</strong> {deal.closing_date ? new Date(deal.closing_date).toLocaleDateString() : 'N/A'}</Typography>
                        <Typography className="deal-info"><strong>Type:</strong> {deal.type}</Typography>
                        <Typography className="deal-info"><strong>Probability:</strong> {deal.probability_Percentage ? `${deal.probability_Percentage}%` : 'N/A'}</Typography>
                        <Typography className="deal-info"><strong>Campaign Source:</strong> {deal.campaign_Source}</Typography>
                        <Typography className="deal-info"><strong>Description:</strong> {deal.description}</Typography>
                        <Typography className="deal-info"><strong>User:</strong> {deal.user ? deal.user.login : 'N/A'}</Typography>
                        <Typography className="deal-info"><strong>Account:</strong> {deal.accounts ? <Link to={`/accounts/${deal.accounts.id}`}>{deal.accounts.account_owner}</Link> : 'N/A'}</Typography>
                        <Typography className="deal-info"><strong>Contact:</strong> {deal.contacts ? <Link to={`/contacts/${deal.contacts.id}`}>{deal.contacts.first_name}</Link> : 'N/A'}</Typography>
                        <Typography className="deal-info"><strong>Lead:</strong> {deal.lead ? <Link to={`/leads/${deal.lead.id}`}>{deal.lead.lead_source}</Link> : 'N/A'}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>No deals available.</Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsContents;
