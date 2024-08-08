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
// import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// import { Card, CardContent, Typography, CircularProgress, Alert, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import '../Contents/scss/LeadContent.scss';

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
//   const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

//   const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFilter(event.target.value);
//   };

//   const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const status = event.target.name;
//     setSelectedStatuses(prev => 
//       event.target.checked ? [...prev, status] : prev.filter(s => s !== status)
//     );
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
//     (lead.email.toLowerCase().includes(filter.toLowerCase()) ||
//     lead.website.toLowerCase().includes(filter.toLowerCase()) ||
//     lead.lead_status.toLowerCase().includes(filter.toLowerCase()) ||
//     lead.first_name.toLowerCase().includes(filter.toLowerCase()) ||
//     lead.last_name.toLowerCase().includes(filter.toLowerCase()) ||
//     lead.company.toLowerCase().includes(filter.toLowerCase()) ||
//     lead.phone.toString().includes(filter.toString())) &&
//     (selectedStatuses.length === 0 || selectedStatuses.includes(lead.lead_status))
//   );

//   return (
//     <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
//            <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//       <div className="lead-container">
//         <div className="filter-section">
//           <Typography variant="h6">Filter Leads</Typography>
//           <TextField
//             className="filter-input"
//             label="Search"
//             variant="outlined"
//             value={filter}
//             onChange={handleFilterChange}
//             fullWidth
//             />
//           <FormGroup>
//             <FormControlLabel
//               control={<Checkbox onChange={handleStatusChange} name="New" />}
//               label="New"
//               />
//             <FormControlLabel
//               control={<Checkbox onChange={handleStatusChange} name="In Progress" />}
//               label="In Progress"
//               />
//             <FormControlLabel
//               control={<Checkbox onChange={handleStatusChange} name="Completed" />}
//               label="Completed"
//             />
//           </FormGroup>
//         </div>

//         <div className="data-section">
//           <div className="top-bar">
//             <Typography variant="h4">Leads</Typography>
//             <Link to="/lead/new" className="create-lead-button">
//               <FontAwesomeIcon icon="plus" />
//               &nbsp; Create a new Lead
//             </Link>
//           </div>

//           {loading && <CircularProgress />}
//           {error && <Alert severity="error">{error}</Alert>}
//           <div className="leads-container">
//             {filteredLeads.length > 0 ? (
//               <Grid container spacing={3}>
//                 {filteredLeads.map((lead) => (
//                   <Grid item xs={12} md={6} lg={4} key={lead.id}>
//                     <Card className="lead-card">
//                       <CardContent className="card-content">
//                         <Typography variant="h5">{lead.first_name} {lead.last_name}</Typography>
//                         <Typography className="lead-info"><strong>Company:</strong> {lead.company}</Typography>
//                         <Typography className="lead-info"><strong>Website:</strong> {lead.website}</Typography>
//                         <Typography className="lead-info"><strong>Email:</strong> {lead.email}</Typography>
//                         <Typography className="lead-info"><strong>Phone:</strong> {lead.phone}</Typography>
//                         <Typography className="lead-info"><strong>Status:</strong> {lead.lead_status}</Typography>
//                         <Button variant="outlined" color="primary" onClick={() => handleClickOpen(lead)}>
//                           View Details
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             ) : (
//               <Typography>No leads available.</Typography>
//             )}
//           </div>
//         </div>
//       </div>

//       {selectedLead && (
//         <Dialog open={open} onClose={handleClose} aria-labelledby="lead-details-dialog-title">
//           <DialogTitle id="lead-details-dialog-title">Lead Details</DialogTitle>
//           <DialogContent>
//             <Typography><strong>First Name:</strong> {selectedLead.first_name}</Typography>
//             <Typography><strong>Last Name:</strong> {selectedLead.last_name}</Typography>
//             <Typography><strong>Company:</strong> {selectedLead.company}</Typography>
//             <Typography><strong>Title:</strong> {selectedLead.title}</Typography>
//             <Typography><strong>Email:</strong> {selectedLead.email}</Typography>
//             <Typography><strong>Fax:</strong> {selectedLead.fax}</Typography>
//             <Typography><strong>Website:</strong> {selectedLead.website}</Typography>
//             <Typography><strong>Lead Source:</strong> {selectedLead.lead_source}</Typography>
//             <Typography><strong>Lead Status:</strong> {selectedLead.lead_status}</Typography>
//             <Typography><strong>Industry:</strong> {selectedLead.industry}</Typography>
//             <Typography><strong>No. of Employees:</strong> {selectedLead.no_of_emp}</Typography>
//             <Typography><strong>Annual Revenue:</strong> {selectedLead.annual_revenue}</Typography>
//             <Typography><strong>Rating:</strong> {selectedLead.rating}</Typography>
//             <Typography><strong>Social Media:</strong> {selectedLead.social_media}</Typography>
//             <Typography><strong>Media Handle ID:</strong> {selectedLead.media_handle_id}</Typography>
//             <Typography><strong>Street:</strong> {selectedLead.street}</Typography>
//             <Typography><strong>City:</strong> {selectedLead.city}</Typography>
//             <Typography><strong>State:</strong> {selectedLead.state}</Typography>
//             <Typography><strong>Zip Code:</strong> {selectedLead.zipcode}</Typography>
//             <Typography><strong>Country:</strong> {selectedLead.country}</Typography>
//             <Typography><strong>Description:</strong> {selectedLead.description}</Typography>
//             {selectedLead.lead_image ? (
//               <div>
//                 {selectedLead.lead_imageContentType ? (
//                   <a href={`data:${selectedLead.lead_imageContentType};base64,${selectedLead.lead_image}`} target="_blank" rel="noopener noreferrer">Open &nbsp;</a>
//                 ) : null}
//                 <span>
//                   {selectedLead.lead_imageContentType}, {byteSize(selectedLead.lead_image)}
//                 </span>
//               </div>
//             ) : null}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="primary">
//               Close
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
// </div>
//     </div>
//   );
// };

// export default LeadContents;

// function byteSize(base64String: string): string {
//   if (!base64String) return '';
//   const size = Math.ceil((base64String.length * 3) / 4 / 1024);
//   return `${size} KB`;
// // }
// import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// import { Card, CardContent, Typography, CircularProgress, Alert, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import '../Contents/scss/LeadContent.scss';

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
//   const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

//   const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFilter(event.target.value);
//   };

//   const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const status = event.target.name;
//     setSelectedStatuses(prev => 
//       event.target.checked ? [...prev, status] : prev.filter(s => s !== status)
//     );
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
//     (lead.email.toLowerCase().includes(filter.toLowerCase()) ||
//     lead.phone.toString().includes(filter.toString()) ||
//     lead.company.toLowerCase().includes(filter.toLowerCase())) &&
//     (selectedStatuses.length === 0 || selectedStatuses.includes(lead.lead_status))
//   );

//   return (
//     <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>

//       <div className="content">
//       <div className="top-bar">
//         <Typography variant="h4">Leads</Typography>
//         <Link to="/lead/new" className="create-lead-button">
//           <FontAwesomeIcon icon="plus" />
//           &nbsp; Create a new Lead
//         </Link>
//       </div>
//         <div className="filter-section">
//           <Typography variant="h6">Filter Leads</Typography>
//           <TextField
//             className="filter-input"
//             label="Search"
//             variant="outlined"
//             value={filter}
//             onChange={handleFilterChange}
//             fullWidth
//           />
//           <FormGroup>
//             <FormControlLabel
//               control={<Checkbox onChange={handleStatusChange} name="New" />}
//               label="New"
//             />
//             <FormControlLabel
//               control={<Checkbox onChange={handleStatusChange} name="In Progress" />}
//               label="In Progress"
//             />
//             <FormControlLabel
//               control={<Checkbox onChange={handleStatusChange} name="Completed" />}
//               label="Completed"
//             />
//             <FormControlLabel
//               control={<Checkbox onChange={handleStatusChange} name="ATTEMPTED_TO_CONTACT" />}
//               label="Attempted to Contact"
//             />
//             <FormControlLabel
//               control={<Checkbox onChange={handleStatusChange} name="LOST_LEAD" />}
//               label="Lost Lead"
//             />
//             <FormControlLabel
//               control={<Checkbox onChange={handleStatusChange} name="CANCELLED" />}
//               label="Cancelled"
//             />
//           </FormGroup>
//         </div>
//         <div className="data-section">
//           {loading && <CircularProgress />}
//           {error && <Alert severity="error">{error}</Alert>}
//           <div className="leads-container">
//             {filteredLeads.length > 0 ? (
//               <Grid container spacing={3}>
//                 {filteredLeads.map((lead) => (
//                   <Grid item xs={12} md={6} lg={4} key={lead.id}>
//                     <Card className="lead-card">
//                       <CardContent className="card-content">
//                         <Typography variant="h5">{lead.first_name} {lead.last_name}</Typography>
//                         <Typography className="lead-info"><strong>Company:</strong> {lead.company}</Typography>
//                         <Typography className="lead-info"><strong>Website:</strong> {lead.website}</Typography>
//                         <Typography className="lead-info"><strong>Email:</strong> {lead.email}</Typography>
//                         <Typography className="lead-info"><strong>Phone:</strong> {lead.phone}</Typography>
//                         <Typography className="lead-info"><strong>Status:</strong> {lead.lead_status}</Typography>
//                         <Button variant="outlined" color="primary" onClick={() => handleClickOpen(lead)}>
//                           View Details
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             ) : (
//               <Typography>No leads available.</Typography>
//             )}
//           </div>
//         </div>
//       </div>

//       {selectedLead && (
//         <Dialog open={open} onClose={handleClose} aria-labelledby="lead-details-dialog-title">
//           <DialogTitle id="lead-details-dialog-title">Lead Details</DialogTitle>
//           <DialogContent>
//             <Typography><strong>First Name:</strong> {selectedLead.first_name}</Typography>
//             <Typography><strong>Last Name:</strong> {selectedLead.last_name}</Typography>
//             <Typography><strong>Company:</strong> {selectedLead.company}</Typography>
//             <Typography><strong>Title:</strong> {selectedLead.title}</Typography>
//             <Typography><strong>Email:</strong> {selectedLead.email}</Typography>
//             <Typography><strong>Fax:</strong> {selectedLead.fax}</Typography>
//             <Typography><strong>Website:</strong> {selectedLead.website}</Typography>
//             <Typography><strong>Lead Source:</strong> {selectedLead.lead_source}</Typography>
//             <Typography><strong>Lead Status:</strong> {selectedLead.lead_status}</Typography>
//             <Typography><strong>Industry:</strong> {selectedLead.industry}</Typography>
//             <Typography><strong>No. of Employees:</strong> {selectedLead.no_of_emp}</Typography>
//             <Typography><strong>Annual Revenue:</strong> {selectedLead.annual_revenue}</Typography>
//             <Typography><strong>Rating:</strong> {selectedLead.rating}</Typography>
//             <Typography><strong>Social Media:</strong> {selectedLead.social_media}</Typography>
//             <Typography><strong>Media Handle ID:</strong> {selectedLead.media_handle_id}</Typography>
//             <Typography><strong>Street:</strong> {selectedLead.street}</Typography>
//             <Typography><strong>City:</strong> {selectedLead.city}</Typography>
//             <Typography><strong>State:</strong> {selectedLead.state}</Typography>
//             <Typography><strong>Zip Code:</strong> {selectedLead.zipcode}</Typography>
//             <Typography><strong>Country:</strong> {selectedLead.country}</Typography>
//             <Typography><strong>Description:</strong> {selectedLead.description}</Typography>
//             {selectedLead.lead_image ? (
//               <div>
//                 {selectedLead.lead_imageContentType ? (
//                   <a href={`data:${selectedLead.lead_imageContentType};base64,${selectedLead.lead_image}`} target="_blank" rel="noopener noreferrer">Open &nbsp;</a>
//                 ) : null}
//                 <span>
//                   {selectedLead.lead_imageContentType}, {byteSize(selectedLead.lead_image)}
//                 </span>
//               </div>
//             ) : null}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="primary">
//               Close
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
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
import { Card, CardContent, Typography, CircularProgress, Alert, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './scss/ContactContents.scss'


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
  const [filterField, setFilterField] = useState('all');
  const [open, setOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleFilterFieldChange = (event: SelectChangeEvent<string>) => {
    setFilterField(event.target.value);
  };

  const handleClickOpen = (lead: Lead) => {
    setSelectedLead(lead);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLead(null);
  };

  const applyFilter = (lead: Lead, filter: string) => {
    const filterLower = filter.toLowerCase();
    return (
      filterField === 'all' && (
        lead.email.toLowerCase().includes(filterLower) ||
        lead.first_name.toLowerCase().includes(filterLower) ||
        lead.last_name.toLowerCase().includes(filterLower) ||
        lead.phone.toString().includes(filterLower) ||
        lead.company.toLowerCase().includes(filterLower) ||
        lead.website.toLowerCase().includes(filterLower) ||
        lead.lead_status.toLowerCase().includes(filterLower) ||
        lead.title.toLowerCase().includes(filterLower) ||
        lead.fax.toLowerCase().includes(filterLower) ||
        lead.lead_source.toLowerCase().includes(filterLower) ||
        lead.industry.toLowerCase().includes(filterLower) ||
        lead.no_of_emp.toString().includes(filterLower) ||
        lead.annual_revenue.toLowerCase().includes(filterLower) ||
        lead.rating.toLowerCase().includes(filterLower) ||
        lead.social_media.toLowerCase().includes(filterLower) ||
        lead.media_handle_id.toLowerCase().includes(filterLower) ||
        lead.street.toLowerCase().includes(filterLower) ||
        lead.city.toLowerCase().includes(filterLower) ||
        lead.state.toLowerCase().includes(filterLower) ||
        lead.zipcode.toLowerCase().includes(filterLower) ||
        lead.country.toLowerCase().includes(filterLower) ||
        lead.description.toLowerCase().includes(filterLower)
      ) ||
      lead[filterField as keyof Lead]?.toString().toLowerCase().includes(filterLower)
    );
  };

  const filteredLeads = leads.filter(lead => applyFilter(lead, filter));

  return (
    <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
      <div className={`content ${collapsed ? 'collapsed' : ''}`}>
        <div className="Top-header">
          <Typography variant="h4">Leads</Typography>
          <Link to="/lead/new" className="create-contact-button">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Lead
          </Link>
        </div>
        <div className="filter-container">
          <Select
            value={filterField}
            onChange={handleFilterFieldChange}
            displayEmpty
            className="filter-select"
          >
            <MenuItem value="all">All Fields</MenuItem>
            <MenuItem value="first_name">First Name</MenuItem>
            <MenuItem value="last_name">Last Name</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="phone">Phone</MenuItem>
            <MenuItem value="company">Company</MenuItem>
            <MenuItem value="website">Website</MenuItem>
            <MenuItem value="lead_status">Lead Status</MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="fax">Fax</MenuItem>
            <MenuItem value="lead_source">Lead Source</MenuItem>
            <MenuItem value="industry">Industry</MenuItem>
            <MenuItem value="no_of_emp">No. of Employees</MenuItem>
            <MenuItem value="annual_revenue">Annual Revenue</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="social_media">Social Media</MenuItem>
            <MenuItem value="media_handle_id">Media Handle ID</MenuItem>
            <MenuItem value="street">Street</MenuItem>
            <MenuItem value="city">City</MenuItem>
            <MenuItem value="state">State</MenuItem>
            <MenuItem value="zipcode">Zip Code</MenuItem>
            <MenuItem value="country">Country</MenuItem>
            <MenuItem value="description">Description</MenuItem>
          </Select>
          <TextField
            className="filter-input"
            label="Search"
            variant="outlined"
            value={filter}
            onChange={handleFilterChange}
          />
        </div>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {filteredLeads.length > 0 ? (
          <Grid container spacing={3}>
            {filteredLeads.map((lead) => (
              <Grid item xs={12} md={6} lg={4} key={lead.id}>
                <Card className="lead-card" onClick={() => handleClickOpen(lead)}>
                  <CardContent className='card-content'>
                    <Typography variant="h6">{lead.first_name} {lead.last_name}</Typography>
                    <Typography variant="body2">Company: {lead.company}</Typography>
                    <Typography variant="body2">Website: {lead.website}</Typography>
                    <Typography variant="body2">Email: {lead.email}</Typography>
                    <Typography variant="body2">Phone: {lead.phone}</Typography>
                    <Typography variant="body2">Status: {lead.lead_status}</Typography>
                    <Button variant="outlined">View Detail</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No leads available.</Typography>
        )}
      </div>

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
            {selectedLead.lead_image && (
              <div>
                {selectedLead.lead_imageContentType && (
                  <a href={`data:${selectedLead.lead_imageContentType};base64,${selectedLead.lead_image}`} target="_blank" rel="noopener noreferrer">Open Image</a>
                )}
                <span>
                  {selectedLead.lead_imageContentType}, {byteSize(selectedLead.lead_image)}
                </span>

              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default LeadContents;

function byteSize(base64String: string): string {
  if (!base64String) return '';
  const size = Math.ceil((base64String.length * 3) / 4 / 1024);
  return `${size} KB`;
}
