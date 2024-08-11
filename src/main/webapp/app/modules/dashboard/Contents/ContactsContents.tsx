// import React from 'react';
// import { Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';

// interface Contact {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
// }

// interface ContactContentsProps {
//   contacts: Contact[];
//   loading: boolean;
//   error: string | null;
// }

// const ContactsContents: React.FC<ContactContentsProps> = ({ contacts, loading, error }) => {
//   if (loading) return <CircularProgress />;
//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <div className="content">
//       {contacts.map(contact => (
//         <Card key={contact.id}>
//           <CardContent>
//             <Typography variant="h6">{contact.firstName} {contact.lastName}</Typography>
//             <Typography variant="body2">Email: {contact.email}</Typography>
//             <Typography variant="body2">Phone: {contact.phone}</Typography>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

// // export default ContactsContents;
// import React, { useState } from 'react';
// import { Card, CardContent, Typography, CircularProgress, Alert, Grid, TextField, Box } from '@mui/material';
// import '../Contents/scss/ContactContents.scss'

// interface Contact {
//   id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   account_name:string;
//   lead_source:string;
// }

// interface ContactContentsProps {
//   contacts: Contact[];
//   loading: boolean;
//   error: string | null;
//   collapsed: boolean; 
// }

// const ContactsContents: React.FC<ContactContentsProps> = ({ contacts, loading, error,collapsed }) => {
//   const [filter, setFilter] = useState('');

//   const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFilter(event.target.value);
//   };

//   const filteredContacts = contacts.filter(contact =>
//     contact.email.toLowerCase().includes(filter.toLowerCase()) ||
//     contact.first_name.toLowerCase().includes(filter.toLowerCase()) ||
//     contact.last_name.toLowerCase().includes(filter.toLowerCase()) ||
//     contact.phone.toString().includes(filter.toString())
//   );

//   return (
//     <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
//     <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//         <Typography variant="h4">Contacts</Typography>
//         <Box className="content-body">
//           <Box className="contacts-list">
//             <div className="filter-container">
//               <TextField
//                 className="filter-input"
//                 label="Filter Contacts"
//                 variant="outlined"
//                 value={filter}
//                 onChange={handleFilterChange}
//               />
//             </div>

//             {loading && <CircularProgress />}
//             {error && <Alert severity="error">{error}</Alert>}
//             {filteredContacts.length > 0 ? (
//               <Grid container spacing={5}>
//                 {filteredContacts.map(contact => (
//                   <Grid item xs={12} md={6} lg={4} key={contact.id}>
//                     <Card className="contact-card">
//                       <CardContent>
//                         <Typography variant="h6">{contact.first_name} {contact.last_name}</Typography>
//                         <Typography variant="body2">Email: {contact.email}</Typography>
//                         <Typography variant="body2">Phone: {contact.phone}</Typography> 
//                         <Typography variant="body2">Account Name: {contact.account_name}</Typography> 
//                         <Typography variant="body2">Lead Source: {contact.lead_source}</Typography> 
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             ) : (
//               <Typography>No contacts available.</Typography>
//             )}
//           </Box>
//         </Box>
//       </div>
//     </div>
//   );
// };

// // export default ContactsContents;
// import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// import { Card, CardContent, Typography, CircularProgress, Alert, Grid, TextField } from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import './scss/ContactContents.scss'

// interface Contact {
//   id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   account_name:string;
//   lead_source:string;
// }

// interface ContactContentsProps {
//   contacts: Contact[];
//   loading: boolean;
//   error: string | null;
//   collapsed: boolean; 
// }

// const ContactContents: React.FC<ContactContentsProps> = ({ contacts, loading, error, collapsed }) => {
//   const [filter, setFilter] = useState('');

//   const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFilter(event.target.value);
//   };

//   const filteredContacts = contacts.filter(contact =>
//     contact.email.toLowerCase().includes(filter.toLowerCase()) ||
//     contact.first_name.toLowerCase().includes(filter.toLowerCase()) ||
//     contact.last_name.toLowerCase().includes(filter.toLowerCase()) ||
//     contact.phone.toString().includes(filter.toString())
//   );

//   return (
//     <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
//       <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//         <Typography variant="h4">Contacts</Typography>
//         <div className="filter-container">
//           <TextField
//             className="filter-input"
//             label="Filter Contacts"
//             variant="outlined"
//             value={filter}
//             onChange={handleFilterChange}
//           />
//         </div>

//         {loading && <CircularProgress />}
//         {error && <Alert severity="error">{error}</Alert>}
//         {filteredContacts.length > 0 ? (
//           <Grid container spacing={5}>
//             {filteredContacts.map((contact) => (
//               <Grid item xs={12} md={6} lg={4} key={contact.id}>
//                 <Card className="contact-card">
//                 <CardContent className='card-content'>
//                         <Typography variant="h6">{contact.first_name} {contact.last_name}</Typography>
//                          <Typography variant="body2">Email: {contact.email}</Typography>
//                          <Typography variant="body2">Phone: {contact.phone}</Typography> 
//                          <Typography variant="body2">Account Name: {contact.account_name}</Typography> 
//                          <Typography variant="body2">Lead Source: {contact.lead_source}</Typography> 
//                     <Link to="/contacts/new" className="create-contact-button">
//                       <FontAwesomeIcon icon="plus" />
//                       &nbsp; Create a new Contact
//                     </Link>
//                        </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Typography>No contacts available.</Typography>
//         )}
//       </div>
//     </div>
//   );
// };

// // export default ContactContents;
// import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// import { Card, CardContent, Typography, CircularProgress, Alert, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import './scss/ContactContents.scss'

// interface Contact {
//   id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   account_name: string;
//   lead_source: string;
//   vendor_name?: string;
//   title?: string;
//   department?: string;
//   mobile?: string;
//   fax?: string;
//   date_of_birth?: string;
//   social_media_handle?: string;
//   street?: string;
//   city?: string;
//   state?: string;
//   zip?: string;
//   country?: string;
//   description?: string;
// }

// interface ContactContentsProps {
//   contacts: Contact[];
//   loading: boolean;
//   error: string | null;
//   collapsed: boolean;
// }

// const ContactContents: React.FC<ContactContentsProps> = ({ contacts, loading, error, collapsed }) => {
//   const [filter, setFilter] = useState('');
//   const [filterField, setFilterField] = useState('all');
//   const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
//   const [open, setOpen] = useState(false);

//   const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFilter(event.target.value);
//   };

//   const handleFilterFieldChange = (event: SelectChangeEvent<string>) => {
//     setFilterField(event.target.value);
//   };

//   const handleClickOpen = (contact: Contact) => {
//     setSelectedContact(contact);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedContact(null);
//   };

//   const applyFilter = (contact: Contact, filter: string) => {
//     const filterLower = filter.toLowerCase();
//     return (
//       filterField === 'all' && (
//         contact.email.toLowerCase().includes(filterLower) ||
//         contact.first_name.toLowerCase().includes(filterLower) ||
//         contact.last_name.toLowerCase().includes(filterLower) ||
//         contact.phone.toString().includes(filterLower) ||
//         contact.account_name.toLowerCase().includes(filterLower) ||
//         contact.vendor_name?.toLowerCase().includes(filterLower) ||
//         contact.lead_source.toLowerCase().includes(filterLower) ||
//         contact.title?.toLowerCase().includes(filterLower) ||
//         contact.department?.toLowerCase().includes(filterLower) ||
//         contact.mobile?.toLowerCase().includes(filterLower) ||
//         contact.fax?.toLowerCase().includes(filterLower) ||
//         contact.date_of_birth?.toLowerCase().includes(filterLower) ||
//         contact.social_media_handle?.toLowerCase().includes(filterLower) ||
//         contact.street?.toLowerCase().includes(filterLower) ||
//         contact.city?.toLowerCase().includes(filterLower) ||
//         contact.state?.toLowerCase().includes(filterLower) ||
//         contact.zip?.toLowerCase().includes(filterLower) ||
//         contact.country?.toLowerCase().includes(filterLower) ||
//         contact.description?.toLowerCase().includes(filterLower)
//       ) ||
//       contact[filterField as keyof Contact]?.toString().toLowerCase().includes(filterLower)
//     );
//   };

//   const filteredContacts = contacts.filter(contact => applyFilter(contact, filter));

//   return (
//     <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
//       <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//         <Typography variant="h4">Contacts</Typography>
//         <div className="filter-container">
//           <Select
//             value={filterField}
//             onChange={handleFilterFieldChange}
//             displayEmpty
//             className="filter-select"
//           >
//             <MenuItem value="all">All Fields</MenuItem>
//             <MenuItem value="first_name">First Name</MenuItem>
//             <MenuItem value="last_name">Last Name</MenuItem>
//             <MenuItem value="email">Email</MenuItem>
//             <MenuItem value="phone">Phone</MenuItem>
//             <MenuItem value="account_name">Account Name</MenuItem>
//             <MenuItem value="vendor_name">Vendor Name</MenuItem>
//             <MenuItem value="lead_source">Lead Source</MenuItem>
//             <MenuItem value="title">Title</MenuItem>
//             <MenuItem value="department">Department</MenuItem>
//             <MenuItem value="mobile">Mobile</MenuItem>
//             <MenuItem value="fax">Fax</MenuItem>
//             <MenuItem value="date_of_birth">Date of Birth</MenuItem>
//             <MenuItem value="social_media_handle">Social Media Handle</MenuItem>
//             <MenuItem value="street">Street</MenuItem>
//             <MenuItem value="city">City</MenuItem>
//             <MenuItem value="state">State</MenuItem>
//             <MenuItem value="zip">Zip</MenuItem>
//             <MenuItem value="country">Country</MenuItem>
//             <MenuItem value="description">Description</MenuItem>
//           </Select>
//           <TextField
//             className="filter-input"
//             label="Filter Contacts"
//             variant="outlined"
//             value={filter}
//             onChange={handleFilterChange}
//           />
//         </div>

//         {loading && <CircularProgress />}
//         {error && <Alert severity="error">{error}</Alert>}
//         {filteredContacts.length > 0 ? (
//           <Grid container spacing={3}>
//             {filteredContacts.map((contact) => (
//               <Grid item xs={12} md={6} lg={4} key={contact.id}>
//                 <Card className="contact-card" onClick={() => handleClickOpen(contact)}>
//                   <CardContent className='card-content'>
//                     <Typography variant="h6">{contact.first_name} {contact.last_name}</Typography>
//                     <Typography variant="body2">Email: {contact.email}</Typography>
//                     <Typography variant="body2">Phone: {contact.phone}</Typography>
//                     <Typography variant="body2">Account Name: {contact.account_name}</Typography>
//                     <Typography variant="body2">Lead Source: {contact.lead_source}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Typography>No contacts available.</Typography>
//         )}
//       </div>

//       {selectedContact && (
//         <Dialog open={open} onClose={handleClose} aria-labelledby="contact-details-dialog-title">
//           <DialogTitle id="contact-details-dialog-title">Contact Details</DialogTitle>
//           <DialogContent>
//             <Typography><strong>First Name:</strong> {selectedContact.first_name}</Typography>
//             <Typography><strong>Last Name:</strong> {selectedContact.last_name}</Typography>
//             <Typography><strong>Email:</strong> {selectedContact.email}</Typography>
//             <Typography><strong>Phone:</strong> {selectedContact.phone}</Typography>
//             <Typography><strong>Account Name:</strong> {selectedContact.account_name}</Typography>
//             <Typography><strong>Lead Source:</strong> {selectedContact.lead_source}</Typography>
//             <Typography><strong>Vendor Name:</strong> {selectedContact.vendor_name}</Typography>
//             <Typography><strong>Title:</strong> {selectedContact.title}</Typography>
//             <Typography><strong>Department:</strong> {selectedContact.department}</Typography>
//             <Typography><strong>Mobile:</strong> {selectedContact.mobile}</Typography>
//             <Typography><strong>Fax:</strong> {selectedContact.fax}</Typography>
//             <Typography><strong>Date of Birth:</strong> {selectedContact.date_of_birth}</Typography>
//             <Typography><strong>Social Media Handle:</strong> {selectedContact.social_media_handle}</Typography>
//             <Typography><strong>Street:</strong> {selectedContact.street}</Typography>
//             <Typography><strong>City:</strong> {selectedContact.city}</Typography>
//             <Typography><strong>State:</strong> {selectedContact.state}</Typography>
//             <Typography><strong>Zip:</strong> {selectedContact.zip}</Typography>
//             <Typography><strong>Country:</strong> {selectedContact.country}</Typography>
//             <Typography><strong>Description:</strong> {selectedContact.description}</Typography>
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

// export default ContactContents;

// import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// import { Card, CardContent, Typography, CircularProgress, Alert, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import './scss/ContactContents.scss'

// interface Contact {
//   id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   account_name: string;
//   lead_source: string;
//   vendor_name?: string;
//   title?: string;
//   department?: string;
//   mobile?: string;
//   fax?: string;
//   date_of_birth?: string;
//   social_media_handle?: string;
//   street?: string;
//   city?: string;
//   state?: string;
//   zip?: string;
//   country?: string;
//   description?: string;
// }

// interface ContactContentsProps {
//   contacts: Contact[];
//   loading: boolean;
//   error: string | null;
//   collapsed: boolean;
// }

// const ContactContents: React.FC<ContactContentsProps> = ({ contacts, loading, error, collapsed }) => {
//   const [filter, setFilter] = useState('');
//   const [filterField, setFilterField] = useState('all');
//   const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
//   const [open, setOpen] = useState(false);

//   const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFilter(event.target.value);
//   };

//   const handleFilterFieldChange = (event: SelectChangeEvent<string>) => {
//     setFilterField(event.target.value);
//   };

//   const handleClickOpen = (contact: Contact) => {
//     setSelectedContact(contact);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedContact(null);
//   };

//   const applyFilter = (contact: Contact, filter: string) => {
//     const filterLower = filter.toLowerCase();
//     return (
//       filterField === 'all' && (
//         contact.email.toLowerCase().includes(filterLower) ||
//         contact.first_name.toLowerCase().includes(filterLower) ||
//         contact.last_name.toLowerCase().includes(filterLower) ||
//         contact.phone.toString().includes(filterLower) ||
//         contact.account_name.toLowerCase().includes(filterLower) ||
//         contact.vendor_name?.toLowerCase().includes(filterLower) ||
//         contact.lead_source.toLowerCase().includes(filterLower) ||
//         contact.title?.toLowerCase().includes(filterLower) ||
//         contact.department?.toLowerCase().includes(filterLower) ||
//         contact.mobile?.toLowerCase().includes(filterLower) ||
//         contact.fax?.toLowerCase().includes(filterLower) ||
//         contact.date_of_birth?.toString().includes(filterField) ||
//         contact.social_media_handle?.toLowerCase().includes(filterLower) ||
//         contact.street?.toLowerCase().includes(filterLower) ||
//         contact.city?.toLowerCase().includes(filterLower) ||
//         contact.state?.toLowerCase().includes(filterLower) ||
//         contact.zip?.toLowerCase().includes(filterLower) ||
//         contact.country?.toLowerCase().includes(filterLower) ||
//         contact.description?.toLowerCase().includes(filterLower)
//       ) ||
//       contact[filterField as keyof Contact]?.toString().toLowerCase().includes(filterLower)
//     );
//   };

//   const filteredContacts = contacts.filter(contact => applyFilter(contact, filter));

//   return (
//     <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
//       <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//         <Typography variant="h4">Contacts</Typography>
//         <div className="filter-container">
//           <Select
//             value={filterField}
//             onChange={handleFilterFieldChange}
//             displayEmpty
//             className="filter-select"
//           >
//             <MenuItem value="all">All Fields</MenuItem>
//             <MenuItem value="first_name">First Name</MenuItem>
//             <MenuItem value="last_name">Last Name</MenuItem>
//             <MenuItem value="email">Email</MenuItem>
//             <MenuItem value="phone">Phone</MenuItem>
//             <MenuItem value="account_name">Account Name</MenuItem>
//             <MenuItem value="vendor_name">Vendor Name</MenuItem>
//             <MenuItem value="lead_source">Lead Source</MenuItem>
//             <MenuItem value="title">Title</MenuItem>
//             <MenuItem value="department">Department</MenuItem>
//             <MenuItem value="mobile">Mobile</MenuItem>
//             <MenuItem value="fax">Fax</MenuItem>
//             <MenuItem value="date_of_birth">Date of Birth</MenuItem>
//             <MenuItem value="social_media_handle">Social Media Handle</MenuItem>
//             <MenuItem value="street">Street</MenuItem>
//             <MenuItem value="city">City</MenuItem>
//             <MenuItem value="state">State</MenuItem>
//             <MenuItem value="zip">Zip</MenuItem>
//             <MenuItem value="country">Country</MenuItem>
//             <MenuItem value="description">Description</MenuItem>
//           </Select>
//           <TextField
//             className="filter-input"
//             label="Filter Contacts"
//             variant="outlined"
//             value={filter}
//             onChange={handleFilterChange}
//           />
//         </div>

//         {loading && <CircularProgress />}
//         {error && <Alert severity="error">{error}</Alert>}
//         {filteredContacts.length > 0 ? (
//           <Grid container spacing={3}>
//             {filteredContacts.map((contact) => (
//               <Grid item xs={12} md={6} lg={4} key={contact.id}>
//                 <Card className="contact-card" onClick={() => handleClickOpen(contact)}>
//                   <CardContent className='card-content'>
//                     <Typography variant="h6">{contact.first_name} {contact.last_name}</Typography>
//                     <Typography variant="body2">Email: {contact.email}</Typography>
//                     <Typography variant="body2">Phone: {contact.phone}</Typography>
//                     <Typography variant="body2">Account Name: {contact.account_name}</Typography>
//                     <Typography variant="body2">Lead Source: {contact.lead_source}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Typography>No contacts available.</Typography>
//         )}
//       </div>

//       {selectedContact && (
//         <Dialog open={open} onClose={handleClose} aria-labelledby="contact-details-dialog-title">
//           <DialogTitle id="contact-details-dialog-title">Contact Details</DialogTitle>
//           <DialogContent>
//             <Typography><strong>First Name:</strong> {selectedContact.first_name}</Typography>
//             <Typography><strong>Last Name:</strong> {selectedContact.last_name}</Typography>
//             <Typography><strong>Email:</strong> {selectedContact.email}</Typography>
//             <Typography><strong>Phone:</strong> {selectedContact.phone}</Typography>
//             <Typography><strong>Account Name:</strong> {selectedContact.account_name}</Typography>
//             <Typography><strong>Lead Source:</strong> {selectedContact.lead_source}</Typography>
//             <Typography><strong>Vendor Name:</strong> {selectedContact.vendor_name}</Typography>
//             <Typography><strong>Title:</strong> {selectedContact.title}</Typography>
//             <Typography><strong>Department:</strong> {selectedContact.department}</Typography>
//             <Typography><strong>Mobile:</strong> {selectedContact.mobile}</Typography>
//             <Typography><strong>Fax:</strong> {selectedContact.fax}</Typography>
//             <Typography><strong>Date of Birth:</strong> {selectedContact.date_of_birth}</Typography>
//             <Typography><strong>Social Media Handle:</strong> {selectedContact.social_media_handle}</Typography>
//             <Typography><strong>Street:</strong> {selectedContact.street}</Typography>
//             <Typography><strong>City:</strong> {selectedContact.city}</Typography>
//             <Typography><strong>State:</strong> {selectedContact.state}</Typography>
//             <Typography><strong>Zip:</strong> {selectedContact.zip}</Typography>
//             <Typography><strong>Country:</strong> {selectedContact.country}</Typography>
//             <Typography><strong>Description:</strong> {selectedContact.description}</Typography>
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

// export default ContactContents;
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, CircularProgress, Alert, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './scss/ContactContents.scss'

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  account_name: string;
  lead_source: string;
  vendor_name?: string;
  title?: string;
  department?: string;
  mobile?: string;
  fax?: string;
  date_of_birth?: string;
  social_media_handle?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  description?: string;
}

interface ContactContentsProps {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  collapsed: boolean;
}

const ContactContents: React.FC<ContactContentsProps> = ({ contacts, loading, error, collapsed }) => {
  const [filter, setFilter] = useState('');
  const [filterField, setFilterField] = useState('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [open, setOpen] = useState(false);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleFilterFieldChange = (event: SelectChangeEvent<string>) => {
    setFilterField(event.target.value);
  };

  const handleClickOpen = (contact: Contact) => {
    setSelectedContact(contact);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedContact(null);
  };

  const applyFilter = (contact: Contact, filter: string) => {
    const filterLower = filter.toLowerCase();
    return (
      filterField === 'all' && (
        contact.email.toLowerCase().includes(filterLower) ||
        contact.first_name.toLowerCase().includes(filterLower) ||
        contact.last_name.toLowerCase().includes(filterLower) ||
        contact.phone.toString().includes(filterLower) ||
        contact.account_name.toLowerCase().includes(filterLower) ||
        contact.vendor_name?.toLowerCase().includes(filterLower) ||
        contact.lead_source.toLowerCase().includes(filterLower) ||
        contact.title?.toLowerCase().includes(filterLower) ||
        contact.department?.toLowerCase().includes(filterLower) ||
        contact.mobile?.toLowerCase().includes(filterLower) ||
        contact.fax?.toLowerCase().includes(filterLower) ||
        contact.date_of_birth?.toString().includes(filterField) ||
        contact.social_media_handle?.toLowerCase().includes(filterLower) ||
        contact.street?.toLowerCase().includes(filterLower) ||
        contact.city?.toLowerCase().includes(filterLower) ||
        contact.state?.toLowerCase().includes(filterLower) ||
        contact.zip?.toLowerCase().includes(filterLower) ||
        contact.country?.toLowerCase().includes(filterLower) ||
        contact.description?.toLowerCase().includes(filterLower)
      ) ||
      contact[filterField as keyof Contact]?.toString().toLowerCase().includes(filterLower)
    );
  };

  const filteredContacts = contacts.filter(contact => applyFilter(contact, filter));

  return (
    <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
      <div className={`content ${collapsed ? 'collapsed' : ''}`}>
        <div className="Top-header">
          <Typography variant="h4" color="#d3e3fdb3">Contacts</Typography>
          <Link to="/contacts/new" className="create-contact-button">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create New Contact
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
            <MenuItem value="account_name">Account Name</MenuItem>
            <MenuItem value="vendor_name">Vendor Name</MenuItem>
            <MenuItem value="lead_source">Lead Source</MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="department">Department</MenuItem>
            <MenuItem value="mobile">Mobile</MenuItem>
            <MenuItem value="fax">Fax</MenuItem>
            <MenuItem value="date_of_birth">Date of Birth</MenuItem>
            <MenuItem value="social_media_handle">Social Media Handle</MenuItem>
            <MenuItem value="street">Street</MenuItem>
            <MenuItem value="city">City</MenuItem>
            <MenuItem value="state">State</MenuItem>
            <MenuItem value="zip">Zip</MenuItem>
            <MenuItem value="country">Country</MenuItem>
            <MenuItem value="description">Description</MenuItem>
          </Select>
          <TextField
            className="filter-input"
            label="Filter Contacts"
            variant="outlined"
            value={filter}
            onChange={handleFilterChange}
          />
        </div>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {filteredContacts.length > 0 ? (
          <Grid container spacing={3}>
            {filteredContacts.map((contact) => (
              <Grid item xs={12} md={6} lg={4} key={contact.id}>
                <Card className="contact-card" style={{backgroundColor:'#162c46'}} onClick={() => handleClickOpen(contact)}>
                  <CardContent className='card-content' color="#d3e3fdb3" >
                    <Typography variant="h6" color="#d3e3fdb3">{contact.first_name} {contact.last_name}</Typography>
                    <Typography variant="body2" color="#d3e3fdb3">Email: {contact.email}</Typography>
                    <Typography variant="body2" color="#d3e3fdb3">Phone: {contact.phone}</Typography>
                    <Typography variant="body2" color="#d3e3fdb3">Account Name: {contact.account_name}</Typography>
                    <Typography variant="body2" color="#d3e3fdb3">Lead Source: {contact.lead_source}</Typography>
                    <Button variant="outlined" >View Detail</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No contacts available.</Typography>
        )}
      </div>

      {selectedContact && (
        <Dialog open={open} onClose={handleClose} aria-labelledby="contact-details-dialog-title">
          <DialogTitle id="contact-details-dialog-title">Contact Details</DialogTitle>
          <DialogContent>
            <Typography><strong>First Name:</strong> {selectedContact.first_name}</Typography>
            <Typography><strong>Last Name:</strong> {selectedContact.last_name}</Typography>
            <Typography><strong>Email:</strong> {selectedContact.email}</Typography>
            <Typography><strong>Phone:</strong> {selectedContact.phone}</Typography>
            <Typography><strong>Account Name:</strong> {selectedContact.account_name}</Typography>
            <Typography><strong>Lead Source:</strong> {selectedContact.lead_source}</Typography>
            <Typography><strong>Vendor Name:</strong> {selectedContact.vendor_name}</Typography>
            <Typography><strong>Title:</strong> {selectedContact.title}</Typography>
            <Typography><strong>Department:</strong> {selectedContact.department}</Typography>
            <Typography><strong>Mobile:</strong> {selectedContact.mobile}</Typography>
            <Typography><strong>Fax:</strong> {selectedContact.fax}</Typography>
            <Typography><strong>Date of Birth:</strong> {selectedContact.date_of_birth}</Typography>
            <Typography><strong>Social Media Handle:</strong> {selectedContact.social_media_handle}</Typography>
            <Typography><strong>Street:</strong> {selectedContact.street}</Typography>
            <Typography><strong>City:</strong> {selectedContact.city}</Typography>
            <Typography><strong>State:</strong> {selectedContact.state}</Typography>
            <Typography><strong>Zip:</strong> {selectedContact.zip}</Typography>
            <Typography><strong>Country:</strong> {selectedContact.country}</Typography>
            <Typography><strong>Description:</strong> {selectedContact.description}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ContactContents;
