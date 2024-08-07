// import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// import { Card, CardContent, Typography, CircularProgress, Alert, Grid, TextField } from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import '../Contents/scss/LeadContent.scss'


// interface Lead {
//   id: number;
//   first_name: string;
//   last_name: string;
//   company: string;
//   website: string;
//   email: string;
//   phone: string;
//   lead_status: string;
// }

// interface LeadContentsProps {
//   leads: Lead[];
//   loading: boolean;
//   error: string | null;
//   collapsed: boolean; 
// }

// const LeadContents: React.FC<LeadContentsProps> = ({ leads, loading, error, collapsed }) => {
//   const [filter, setFilter] = useState('');

//   const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFilter(event.target.value);
//   };

//   const filteredLeads = leads.filter(lead =>
//     lead.email.toLowerCase().includes(filter.toLowerCase()) ||
//     lead.website.toLowerCase().includes(filter.toLowerCase()) ||
//     lead.lead_status.toLowerCase().includes(filter.toLowerCase()) ||
//     lead.first_name.toLowerCase().includes(filter.toLowerCase()) ||
//     lead.last_name.toLowerCase().includes(filter.toLowerCase()) ||
//     lead.company.toLowerCase().includes(filter.toLowerCase()) ||
//     lead.phone.toString().includes(filter.toString())
//   );

//   return (
//     <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
//       <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//         <Typography variant="h4">Leads</Typography>
//         <div className="filter-container">
//           <TextField
//             className="filter-input"
//             label="Filter Leads"
//             variant="outlined"
//             value={filter}
//             onChange={handleFilterChange}
//           />
//         </div>

//         {loading && <CircularProgress />}
//         {error && <Alert severity="error">{error}</Alert>}
//         {filteredLeads.length > 0 ? (
//           <Grid container spacing={5}>
//             {filteredLeads.map((lead) => (
//               <Grid item xs={12} md={6} lg={4} key={lead.id}>
//                 <Card className="lead-card">
//                   <CardContent className="card-content">
//                     <Typography variant="h5">{lead.first_name} {lead.last_name}</Typography>
//                     <Typography className="lead-info"><strong>Company:</strong> {lead.company}</Typography>
//                     <Typography className="lead-info"><strong>Website:</strong> {lead.website}</Typography>
//                     <Typography className="lead-info"><strong>Email:</strong> {lead.email}</Typography>
//                     <Typography className="lead-info"><strong>Phone:</strong> {lead.phone}</Typography>
//                     <Typography className="lead-info"><strong>Status:</strong> {lead.lead_status}</Typography>
//                     <Link to="/lead/new" className="create-lead-button">
//                       <FontAwesomeIcon icon="plus" />
//                       &nbsp; Create a new Lead
//                     </Link>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Typography>No leads available.</Typography>
//         )}
//       </div>
//     </div>
//   );
// };

// // export default LeadContents;
// import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// import { Card, CardContent, Typography, CircularProgress, Alert, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import '../Contents/scss/LeadContent.scss'

// interface Lead {
//   id: number;
//   first_name: string;
//   last_name: string;
//   company: string;
//   website: string;
//   email: string;
//   phone: string;
//   lead_status: string;
//   title: string;
//   fax: string;
//   lead_source: string;
//   industry: string;
//   no_of_emp: number;
//   annual_revenue: string;
//   rating: string;
//   social_media: string;
//   media_handle_id: string;
//   street: string;
//   city: string;
//   state: string;
//   zipcode: string;
//   country: string;
//   description: string;
//   lead_image?: string;
//   lead_imageContentType?: string;
// }

// interface LeadContentsProps {
//   leads: Lead[];
//   loading: boolean;
//   error: string | null;
//   collapsed: boolean; 
// }

// const LeadContents: React.FC<LeadContentsProps> = ({ leads, loading, error, collapsed }) => {
//   const [filter, setFilter] = useState('');
//   const [open, setOpen] = useState(false);
//   const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

//   const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFilter(event.target.value);
//   };

//   const handleClickOpen = (lead: Lead) => {
//     setSelectedLead(lead);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedLead(null);
//   };

//   const filteredLeads = leads.filter(lead =>
//     lead.email.toLowerCase().includes(filter.toLowerCase()) ||
//     lead.website.toLowerCase().includes(filter.toLowerCase()) ||
//     lead.lead_status.toLowerCase().includes(filter.toLowerCase()) ||
//     lead.first_name.toLowerCase().includes(filter.toLowerCase()) ||
//     lead.last_name.toLowerCase().includes(filter.toLowerCase()) ||
//     lead.company.toLowerCase().includes(filter.toLowerCase()) ||
//     lead.phone.toString().includes(filter.toString())
//   );

//   return (
//     <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
//       <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//         <Typography variant="h4">Leads</Typography>
//                     <Link to="/lead/new" className="create-lead-button">
//                       <FontAwesomeIcon icon="plus" />
//                       &nbsp; Create a new Lead
//                     </Link>
//         <div className="filter-container">
//           <TextField
//             className="filter-input"
//             label="Filter Leads"
//             variant="outlined"
//             value={filter}
//             onChange={handleFilterChange}
//           />
//         </div>

//         {loading && <CircularProgress />}
//         {error && <Alert severity="error">{error}</Alert>}
//         {filteredLeads.length > 0 ? (
//           <Grid container spacing={5}>
//             {filteredLeads.map((lead) => (
//               <Grid item xs={12} md={6} lg={4} key={lead.id}>
//                 <Card className="lead-card">
//                   <CardContent className="card-content">
//                     <Typography variant="h5">{lead.first_name} {lead.last_name}</Typography>
//                     <Typography className="lead-info"><strong>Company:</strong> {lead.company}</Typography>
//                     <Typography className="lead-info"><strong>Website:</strong> {lead.website}</Typography>
//                     <Typography className="lead-info"><strong>Email:</strong> {lead.email}</Typography>
//                     <Typography className="lead-info"><strong>Phone:</strong> {lead.phone}</Typography>
//                     <Typography className="lead-info"><strong>Status:</strong> {lead.lead_status}</Typography>
//                     <Button variant="outlined" color="primary" onClick={() => handleClickOpen(lead)}>
//                       View Details
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Typography>No leads available.</Typography>
//         )}

//         {selectedLead && (
//           <Dialog open={open} onClose={handleClose} aria-labelledby="lead-details-dialog-title">
//             <DialogTitle id="lead-details-dialog-title">Lead Details</DialogTitle>
//             <DialogContent>
//               <Typography><strong>First Name:</strong> {selectedLead.first_name}</Typography>
//               <Typography><strong>Last Name:</strong> {selectedLead.last_name}</Typography>
//               <Typography><strong>Company:</strong> {selectedLead.company}</Typography>
//               <Typography><strong>Title:</strong> {selectedLead.title}</Typography>
//               <Typography><strong>Email:</strong> {selectedLead.email}</Typography>
//               <Typography><strong>Fax:</strong> {selectedLead.fax}</Typography>
//               <Typography><strong>Website:</strong> {selectedLead.website}</Typography>
//               <Typography><strong>Lead Source:</strong> {selectedLead.lead_source}</Typography>
//               <Typography><strong>Lead Status:</strong> {selectedLead.lead_status}</Typography>
//               <Typography><strong>Industry:</strong> {selectedLead.industry}</Typography>
//               <Typography><strong>No. of Employees:</strong> {selectedLead.no_of_emp}</Typography>
//               <Typography><strong>Annual Revenue:</strong> {selectedLead.annual_revenue}</Typography>
//               <Typography><strong>Rating:</strong> {selectedLead.rating}</Typography>
//               <Typography><strong>Social Media:</strong> {selectedLead.social_media}</Typography>
//               <Typography><strong>Media Handle ID:</strong> {selectedLead.media_handle_id}</Typography>
//               <Typography><strong>Street:</strong> {selectedLead.street}</Typography>
//               <Typography><strong>City:</strong> {selectedLead.city}</Typography>
//               <Typography><strong>State:</strong> {selectedLead.state}</Typography>
//               <Typography><strong>Zip Code:</strong> {selectedLead.zipcode}</Typography>
//               <Typography><strong>Country:</strong> {selectedLead.country}</Typography>
//               <Typography><strong>Description:</strong> {selectedLead.description}</Typography>
//               {selectedLead.lead_image ? (
//                 <div>
//                   {selectedLead.lead_imageContentType ? (
//                     <a href={`data:${selectedLead.lead_imageContentType};base64,${selectedLead.lead_image}`} target="_blank" rel="noopener noreferrer">Open &nbsp;</a>
//                   ) : null}
//                   <span>
//                     {selectedLead.lead_imageContentType}, {byteSize(selectedLead.lead_image)}
//                   </span>
//                 </div>
//               ) : null}
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleClose} color="primary">
//                 Close
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LeadContents;

// function byteSize(base64String: string): string {
//   if (!base64String) return '';
//   const size = Math.ceil((base64String.length * 3) / 4 / 1024);
//   return `${size} KB`;
// }
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, CircularProgress, Alert, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../Contents/scss/LeadContent.scss';

interface Lead {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  website: string;
  email: string;
  phone: string;
  lead_status: string;
  title: string;
  fax: string;
  lead_source: string;
  industry: string;
  no_of_emp: number;
  annual_revenue: string;
  rating: string;
  social_media: string;
  media_handle_id: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  description: string;
  lead_image?: string;
  lead_imageContentType?: string;
}

interface LeadContentsProps {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  collapsed: boolean;
}

const LeadContents: React.FC<LeadContentsProps> = ({ leads, loading, error, collapsed }) => {
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleClickOpen = (lead: Lead) => {
    setSelectedLead(lead);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLead(null);
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
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4">Leads</Typography>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            {filteredLeads.length > 0 ? (
              <Grid container spacing={3}>
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
                        <Button variant="outlined" color="primary" onClick={() => handleClickOpen(lead)}>
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>No leads available.</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className="side-panel">
              <Link to="/lead/new" className="create-lead-button">
                <FontAwesomeIcon icon="plus" />
                &nbsp; Create a new Lead
              </Link>
              <div className="filter-container">
                <TextField
                  className="filter-input"
                  label="Filter Leads"
                  variant="outlined"
                  value={filter}
                  onChange={handleFilterChange}
                  fullWidth
                />
              </div>
            </div>
          </Grid>
        </Grid>

        {selectedLead && (
          <Dialog open={open} onClose={handleClose} aria-labelledby="lead-details-dialog-title">
            <DialogTitle id="lead-details-dialog-title">Lead Details</DialogTitle>
            <DialogContent>
              <Typography><strong>First Name:</strong> {selectedLead.first_name}</Typography>
              <Typography><strong>Last Name:</strong> {selectedLead.last_name}</Typography>
              <Typography><strong>Company:</strong> {selectedLead.company}</Typography>
              <Typography><strong>Title:</strong> {selectedLead.title}</Typography>
              <Typography><strong>Email:</strong> {selectedLead.email}</Typography>
              <Typography><strong>Fax:</strong> {selectedLead.fax}</Typography>
              <Typography><strong>Website:</strong> {selectedLead.website}</Typography>
              <Typography><strong>Lead Source:</strong> {selectedLead.lead_source}</Typography>
              <Typography><strong>Lead Status:</strong> {selectedLead.lead_status}</Typography>
              <Typography><strong>Industry:</strong> {selectedLead.industry}</Typography>
              <Typography><strong>No. of Employees:</strong> {selectedLead.no_of_emp}</Typography>
              <Typography><strong>Annual Revenue:</strong> {selectedLead.annual_revenue}</Typography>
              <Typography><strong>Rating:</strong> {selectedLead.rating}</Typography>
              <Typography><strong>Social Media:</strong> {selectedLead.social_media}</Typography>
              <Typography><strong>Media Handle ID:</strong> {selectedLead.media_handle_id}</Typography>
              <Typography><strong>Street:</strong> {selectedLead.street}</Typography>
              <Typography><strong>City:</strong> {selectedLead.city}</Typography>
              <Typography><strong>State:</strong> {selectedLead.state}</Typography>
              <Typography><strong>Zip Code:</strong> {selectedLead.zipcode}</Typography>
              <Typography><strong>Country:</strong> {selectedLead.country}</Typography>
              <Typography><strong>Description:</strong> {selectedLead.description}</Typography>
              {selectedLead.lead_image ? (
                <div>
                  {selectedLead.lead_imageContentType ? (
                    <a href={`data:${selectedLead.lead_imageContentType};base64,${selectedLead.lead_image}`} target="_blank" rel="noopener noreferrer">Open &nbsp;</a>
                  ) : null}
                  <span>
                    {selectedLead.lead_imageContentType}, {byteSize(selectedLead.lead_image)}
                  </span>
                </div>
              ) : null}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default LeadContents;

function byteSize(base64String: string): string {
  if (!base64String) return '';
  const size = Math.ceil((base64String.length * 3) / 4 / 1024);
  return `${size} KB`;
}
