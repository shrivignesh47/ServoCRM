import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, CircularProgress, Alert, Grid, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../Contents/scss/LeadContent.scss'


interface Lead {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  website: string;
  email: string;
  phone: string;
  lead_status: string;
}

interface LeadContentsProps {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  collapsed: boolean; // Add this prop
}

const LeadContents: React.FC<LeadContentsProps> = ({ leads, loading, error, collapsed }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredLeads = leads.filter(lead =>
    lead.email.toLowerCase().includes(filter.toLowerCase()) ||
    lead.website.toLowerCase().includes(filter.toLowerCase()) ||
    lead.lead_status.toLowerCase().includes(filter.toLowerCase()) ||
    lead.first_name.toLowerCase().includes(filter.toLowerCase()) ||
    lead.last_name.toLowerCase().includes(filter.toLowerCase()) ||
    lead.company.toLowerCase().includes(filter.toLowerCase()) ||
    lead.phone.toString().includes(filter.toString())
  );

  return (
    <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
      <div className={`content ${collapsed ? 'collapsed' : ''}`}>
        <Typography variant="h4">Leads</Typography>
        <div className="filter-container">
          <TextField
            className="filter-input"
            label="Filter Leads"
            variant="outlined"
            value={filter}
            onChange={handleFilterChange}
          />
        </div>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {filteredLeads.length > 0 ? (
          <Grid container spacing={5}>
            {filteredLeads.map((lead) => (
              <Grid item xs={12} md={6} lg={4} key={lead.id}>
                <Card className="lead-card">
                  <CardContent className="card-content">
                    <Typography variant="h5">{lead.first_name} {lead.last_name}</Typography>
                    <Typography className="lead-info"><strong>Company:</strong> {lead.company}</Typography>
                    <Typography className="lead-info"><strong>Website:</strong> {lead.website}</Typography>
                    <Typography className="lead-info"><strong>Email:</strong> {lead.email}</Typography>
                    <Typography className="lead-info"><strong>Phone:</strong> {lead.phone}</Typography>
                    <Typography className="lead-info"><strong>Status:</strong> {lead.lead_status}</Typography>
                    <Link to="/lead/new" className="create-lead-button">
                      <FontAwesomeIcon icon="plus" />
                      &nbsp; Create a new Lead
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No leads available.</Typography>
        )}
      </div>
    </div>
  );
};

export default LeadContents;
