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

// export default ContactsContents;
import React, { useState } from 'react';
import { Card, CardContent, Typography, CircularProgress, Alert, Grid, TextField, Box } from '@mui/material';
import './scss/ContactContents.scss';

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  account_name:string;
  lead_source:string;
}

interface ContactContentsProps {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}

const ContactsContents: React.FC<ContactContentsProps> = ({ contacts, loading, error }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.email.toLowerCase().includes(filter.toLowerCase()) ||
    contact.first_name.toLowerCase().includes(filter.toLowerCase()) ||
    contact.last_name.toLowerCase().includes(filter.toLowerCase()) ||
    contact.phone.toString().includes(filter.toString())
  );

  return (
    <div className="main-content">
      <div className="content">
        <Typography variant="h4">Contacts</Typography>
        <Box className="content-body">
          <Box className="contacts-list">
            <div className="filter-container">
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
              <Grid container spacing={5}>
                {filteredContacts.map(contact => (
                  <Grid item xs={12} md={6} lg={4} key={contact.id}>
                    <Card className="contact-card">
                      <CardContent>
                        <Typography variant="h6">{contact.first_name} {contact.last_name}</Typography>
                        <Typography variant="body2">Email: {contact.email}</Typography>
                        <Typography variant="body2">Phone: {contact.phone}</Typography> 
                        <Typography variant="body2">Account Name: {contact.account_name}</Typography> 
                        <Typography variant="body2">Lead Source: {contact.lead_source}</Typography> 
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>No contacts available.</Typography>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default ContactsContents;
