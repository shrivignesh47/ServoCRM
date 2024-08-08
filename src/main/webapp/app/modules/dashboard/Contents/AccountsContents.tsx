// // import React from 'react';
// // import { Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
// // import '../dashboard.scss'
// // interface Account {
// //   id: string;
// //   name: string;
// //   industry: string;
// //   revenue: string;
// //   employees: number;
// // }

// // interface AccountContentsProps {
// //   accounts: Account[];
// //   loading: boolean;
// //   error: string | null;
// // }

// // const AccountContents: React.FC<AccountContentsProps> = ({ accounts, loading, error }) => {
// //   if (loading) return <CircularProgress />;
// //   if (error) return <Alert severity="error">{error}</Alert>;

// //   return (
// //     <div className="content">
// //        <Typography variant="h4">Accounts </Typography>
// //       {accounts.map(account => (
// //         <Card key={account.id}>
// //           <CardContent>
// //             <Typography variant="h6">{account.name}</Typography>
// //             <Typography variant="body2">Industry: {account.industry}</Typography>
// //             <Typography variant="body2">Revenue: {account.revenue}</Typography>
// //             <Typography variant="body2">Employees: {account.employees}</Typography>
// //           </CardContent>
// //         </Card>
// //       ))}
// //     </div>
// //   );
// // };

// // export default AccountContents;
// import React from 'react';
// import { Card, CardContent, Typography, CircularProgress, Alert, Grid } from '@mui/material';
// import '../dashboard.scss';

// interface Account {
//   id: string;
//   name: string;
//   industry: string;
//   revenue: string;
//   employees: number;
// }

// interface AccountContentsProps {
//   accounts: Account[];
//   loading: boolean;
//   error: string | null;
//   collapsed: boolean; // Add this prop
// }

// const AccountContents: React.FC<AccountContentsProps> = ({ accounts, loading, error, collapsed }) => {
//   if (loading) return <CircularProgress />;
//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
//       <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//         <Typography variant="h4">Accounts</Typography>
//         <Grid container spacing={3}>
//           {accounts.map(account => (
//             <Grid item xs={12} md={6} lg={4} key={account.id}>
//               <Card className="account-card">
//                 <CardContent>
//                   <Typography variant="h6">{account.name}</Typography>
//                   <Typography variant="body2">Industry: {account.industry}</Typography>
//                   <Typography variant="body2">Revenue: {account.revenue}</Typography>
//                   <Typography variant="body2">Employees: {account.employees}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </div>
//     </div>
//   );
// };

// // export default AccountContents;
// import React, { useState } from 'react';
// import { Card, CardContent, Typography, CircularProgress, Alert, Grid, TextField, Select, MenuItem, SelectChangeEvent, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
// import './scss/AccountsContents.scss';
// interface Account {
//   id: string;
//   name: string;
//   industry: string;
//   revenue: string;
//   employees: number;
//   account_owner?: string;
//   rating?: string;
//   phone?: string;
//   account_site?: string;
//   fax?: string;
//   website?: string;
//   account_number?: string;
//   ticket_Symbol?: string;
//   ownership?: string;
//   billing_street?: string;
//   billing_city?: string;
//   billing_state?: string;
//   billing_code?: string;
//   billing_country?: string;
//   shipping_street?: string;
//   shipping_city?: string;
//   shipping_state?: string;
//   shipping_code?: string;
//   shipping_country?: string;
//   description?: string;
//   sic_code?: string;
//   account_type?: string;
//   user?: {
//     login: string;
//   };
// }

// interface AccountContentsProps {
//   accounts: Account[];
//   loading: boolean;
//   error: string | null;
//   collapsed: boolean;
// }

// const AccountContents: React.FC<AccountContentsProps> = ({ accounts, loading, error, collapsed }) => {
//   const [filter, setFilter] = useState('');
//   const [filterField, setFilterField] = useState('all');
//   const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
//   const [open, setOpen] = useState(false);

//   const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFilter(event.target.value);
//   };

//   const handleFilterFieldChange = (event: SelectChangeEvent<string>) => {
//     setFilterField(event.target.value);
//   };

//   const handleClickOpen = (account: Account) => {
//     setSelectedAccount(account);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedAccount(null);
//   };

//   const applyFilter = (account: Account, filter: string) => {
//     const filterLower = filter.toLowerCase();
//     return (
//       (filterField === 'all' && (
//         (account.name && account.name.toLowerCase().includes(filterLower)) ||
//         (account.industry && account.industry.toLowerCase().includes(filterLower)) ||
//         (account.revenue && account.revenue.toLowerCase().includes(filterLower)) ||
//         (account.employees && account.employees.toString().includes(filterLower)) ||
//         (account.account_owner && account.account_owner.toLowerCase().includes(filterLower)) ||
//         (account.rating && account.rating.toLowerCase().includes(filterLower)) ||
//         (account.phone && account.phone.toLowerCase().includes(filterLower)) ||
//         (account.account_site && account.account_site.toLowerCase().includes(filterLower)) ||
//         (account.fax && account.fax.toLowerCase().includes(filterLower)) ||
//         (account.website && account.website.toLowerCase().includes(filterLower)) ||
//         (account.account_number && account.account_number.toLowerCase().includes(filterLower)) ||
//         (account.ticket_Symbol && account.ticket_Symbol.toLowerCase().includes(filterLower)) ||
//         (account.ownership && account.ownership.toLowerCase().includes(filterLower)) ||
//         (account.billing_street && account.billing_street.toLowerCase().includes(filterLower)) ||
//         (account.billing_city && account.billing_city.toLowerCase().includes(filterLower)) ||
//         (account.billing_state && account.billing_state.toLowerCase().includes(filterLower)) ||
//         (account.billing_code && account.billing_code.toLowerCase().includes(filterLower)) ||
//         (account.billing_country && account.billing_country.toLowerCase().includes(filterLower)) ||
//         (account.shipping_street && account.shipping_street.toLowerCase().includes(filterLower)) ||
//         (account.shipping_city && account.shipping_city.toLowerCase().includes(filterLower)) ||
//         (account.shipping_state && account.shipping_state.toLowerCase().includes(filterLower)) ||
//         (account.shipping_code && account.shipping_code.toLowerCase().includes(filterLower)) ||
//         (account.shipping_country && account.shipping_country.toLowerCase().includes(filterLower)) ||
//         (account.description && account.description.toLowerCase().includes(filterLower)) ||
//         (account.sic_code && account.sic_code.toLowerCase().includes(filterLower)) ||
//         (account.account_type && account.account_type.toLowerCase().includes(filterLower)) ||
//         (account.user && account.user.login.toLowerCase().includes(filterLower))
//       )) ||
//       (account[filterField as keyof Account] && account[filterField as keyof Account].toString().toLowerCase().includes(filterLower))
//     );
//   };

//   const filteredAccounts = accounts.filter(account => applyFilter(account, filter));

//   return (
//     <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
//       <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//         <div className="top-bar">
//           <Typography variant="h4">Accounts</Typography>
//         </div>
//         <div className="filter-section">
//           <Select
//             value={filterField}
//             onChange={handleFilterFieldChange}
//             displayEmpty
//             className="filter-select"
//           >
//             <MenuItem value="all">All Fields</MenuItem>
//             <MenuItem value="name">Name</MenuItem>
//             <MenuItem value="industry">Industry</MenuItem>
//             <MenuItem value="revenue">Revenue</MenuItem>
//             <MenuItem value="employees">Employees</MenuItem>
//             <MenuItem value="account_owner">Account Owner</MenuItem>
//             <MenuItem value="rating">Rating</MenuItem>
//             <MenuItem value="phone">Phone</MenuItem>
//             <MenuItem value="account_site">Account Site</MenuItem>
//             <MenuItem value="fax">Fax</MenuItem>
//             <MenuItem value="website">Website</MenuItem>
//             <MenuItem value="account_number">Account Number</MenuItem>
//             <MenuItem value="ticket_Symbol">Ticket Symbol</MenuItem>
//             <MenuItem value="ownership">Ownership</MenuItem>
//             <MenuItem value="billing_street">Billing Street</MenuItem>
//             <MenuItem value="billing_city">Billing City</MenuItem>
//             <MenuItem value="billing_state">Billing State</MenuItem>
//             <MenuItem value="billing_code">Billing Code</MenuItem>
//             <MenuItem value="billing_country">Billing Country</MenuItem>
//             <MenuItem value="shipping_street">Shipping Street</MenuItem>
//             <MenuItem value="shipping_city">Shipping City</MenuItem>
//             <MenuItem value="shipping_state">Shipping State</MenuItem>
//             <MenuItem value="shipping_code">Shipping Code</MenuItem>
//             <MenuItem value="shipping_country">Shipping Country</MenuItem>
//             <MenuItem value="description">Description</MenuItem>
//             <MenuItem value="sic_code">SIC Code</MenuItem>
//             <MenuItem value="account_type">Account Type</MenuItem>
//             <MenuItem value="user">User</MenuItem>
//           </Select>
//           <TextField
//             className="filter-input"
//             label="Search Accounts"
//             variant="outlined"
//             value={filter}
//             onChange={handleFilterChange}
//             fullWidth
//           />
//         </div>
//         <div className="data-section">
//           {loading && <CircularProgress />}
//           {error && <Alert severity="error">{error}</Alert>}
//           <div className="accounts-container">
//             {filteredAccounts.length > 0 ? (
//               <Grid container spacing={3}>
//                 {filteredAccounts.map(account => (
//                   <Grid item xs={12} md={6} lg={4} key={account.id}>
//                     <Card className="account-card" onClick={() => handleClickOpen(account)}>
//                       <CardContent>
//                         <Typography variant="h6">{account.name}</Typography>
//                         <Typography className="account-info"><strong>Account:</strong> {account.account_owner}</Typography>
//                         <Typography className="account-info"><strong>Account Number:</strong> {account.account_number}</Typography>
//                         <Typography className="account-info"><strong>Employees:</strong> {account.employees}</Typography>
//                         <Typography className="account-info"><strong>Created_User:</strong> {account.user.login}</Typography>
//                         <Button variant="outlined">View Detail</Button>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             ) : (
//               <Typography>No accounts available.</Typography>
//             )}
//           </div>
//         </div>
//       </div>

//       {selectedAccount && (
//         <Dialog open={open} onClose={handleClose} aria-labelledby="account-details-dialog-title">
//           <DialogTitle id="account-details-dialog-title">Account Details</DialogTitle>
//           <DialogContent>
//             <Typography><strong>Name:</strong> {selectedAccount.name}</Typography>
//             <Typography><strong>Industry:</strong> {selectedAccount.industry}</Typography>
//             <Typography><strong>Revenue:</strong> {selectedAccount.revenue}</Typography>
//             <Typography><strong>Employees:</strong> {selectedAccount.employees}</Typography>
//             <Typography><strong>Owner:</strong> {selectedAccount.account_owner}</Typography>
//             <Typography><strong>Rating:</strong> {selectedAccount.rating}</Typography>
//             <Typography><strong>Phone:</strong> {selectedAccount.phone}</Typography>
//             <Typography><strong>Account Site:</strong> {selectedAccount.account_site}</Typography>
//             <Typography><strong>Fax:</strong> {selectedAccount.fax}</Typography>
//             <Typography><strong>Website:</strong> {selectedAccount.website}</Typography>
//             <Typography><strong>Account Number:</strong> {selectedAccount.account_number}</Typography>
//             <Typography><strong>Ticket Symbol:</strong> {selectedAccount.ticket_Symbol}</Typography>
//             <Typography><strong>Ownership:</strong> {selectedAccount.ownership}</Typography>
//             <Typography><strong>Billing Street:</strong> {selectedAccount.billing_street}</Typography>
//             <Typography><strong>Billing City:</strong> {selectedAccount.billing_city}</Typography>
//             <Typography><strong>Billing State:</strong> {selectedAccount.billing_state}</Typography>
//             <Typography><strong>Billing Code:</strong> {selectedAccount.billing_code}</Typography>
//             <Typography><strong>Billing Country:</strong> {selectedAccount.billing_country}</Typography>
//             <Typography><strong>Shipping Street:</strong> {selectedAccount.shipping_street}</Typography>
//             <Typography><strong>Shipping City:</strong> {selectedAccount.shipping_city}</Typography>
//             <Typography><strong>Shipping State:</strong> {selectedAccount.shipping_state}</Typography>
//             <Typography><strong>Shipping Code:</strong> {selectedAccount.shipping_code}</Typography>
//             <Typography><strong>Shipping Country:</strong> {selectedAccount.shipping_country}</Typography>
//             <Typography><strong>Description:</strong> {selectedAccount.description}</Typography>
//             <Typography><strong>SIC Code:</strong> {selectedAccount.sic_code}</Typography>
//             <Typography><strong>Account Type:</strong> {selectedAccount.account_type}</Typography>
//             <Typography><strong>Created User:</strong> {selectedAccount.user?.login}</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="primary">Close</Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </div>
//   );
// };

// export default AccountContents;
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './scss/AccountsContents.scss';

interface Account {
  id: string;
  name: string;
  industry: string;
  revenue: string;
  employees: number;
  account_owner?: string;
  rating?: string;
  phone?: string;
  account_site?: string;
  fax?: string;
  website?: string;
  account_number?: string;
  ticket_Symbol?: string;
  ownership?: string;
  billing_street?: string;
  billing_city?: string;
  billing_state?: string;
  billing_code?: string;
  billing_country?: string;
  shipping_street?: string;
  shipping_city?: string;
  shipping_state?: string;
  shipping_code?: string;
  shipping_country?: string;
  description?: string;
  sic_code?: string;
  account_type?: string;
  user?: {
    login: string;
  };
}

interface AccountContentsProps {
  accounts: Account[];
  loading: boolean;
  error: string | null;
  collapsed: boolean;
}

const AccountContents: React.FC<AccountContentsProps> = ({ accounts, loading, error, collapsed }) => {
  const [filter, setFilter] = useState('');
  const [filterField, setFilterField] = useState('all');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [open, setOpen] = useState(false);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleFilterFieldChange = (event: SelectChangeEvent<string>) => {
    setFilterField(event.target.value);
  };

  const handleClickOpen = (account: Account) => {
    setSelectedAccount(account);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAccount(null);
  };

  const applyFilter = (account: Account, filter: string) => {
    const filterLower = filter.toLowerCase();
    return (
      (filterField === 'all' && (
        (account.name && account.name.toLowerCase().includes(filterLower)) ||
        (account.industry && account.industry.toLowerCase().includes(filterLower)) ||
        (account.revenue && account.revenue.toLowerCase().includes(filterLower)) ||
        (account.employees && account.employees.toString().includes(filterLower)) ||
        (account.account_owner && account.account_owner.toLowerCase().includes(filterLower)) ||
        (account.rating && account.rating.toLowerCase().includes(filterLower)) ||
        (account.phone && account.phone.toLowerCase().includes(filterLower)) ||
        (account.account_site && account.account_site.toLowerCase().includes(filterLower)) ||
        (account.fax && account.fax.toLowerCase().includes(filterLower)) ||
        (account.website && account.website.toLowerCase().includes(filterLower)) ||
        (account.account_number && account.account_number.toLowerCase().includes(filterLower)) ||
        (account.ticket_Symbol && account.ticket_Symbol.toLowerCase().includes(filterLower)) ||
        (account.ownership && account.ownership.toLowerCase().includes(filterLower)) ||
        (account.billing_street && account.billing_street.toLowerCase().includes(filterLower)) ||
        (account.billing_city && account.billing_city.toLowerCase().includes(filterLower)) ||
        (account.billing_state && account.billing_state.toLowerCase().includes(filterLower)) ||
        (account.billing_code && account.billing_code.toLowerCase().includes(filterLower)) ||
        (account.billing_country && account.billing_country.toLowerCase().includes(filterLower)) ||
        (account.shipping_street && account.shipping_street.toLowerCase().includes(filterLower)) ||
        (account.shipping_city && account.shipping_city.toLowerCase().includes(filterLower)) ||
        (account.shipping_state && account.shipping_state.toLowerCase().includes(filterLower)) ||
        (account.shipping_code && account.shipping_code.toLowerCase().includes(filterLower)) ||
        (account.shipping_country && account.shipping_country.toLowerCase().includes(filterLower)) ||
        (account.description && account.description.toLowerCase().includes(filterLower)) ||
        (account.sic_code && account.sic_code.toLowerCase().includes(filterLower)) ||
        (account.account_type && account.account_type.toLowerCase().includes(filterLower)) ||
        (account.user && account.user.login.toLowerCase().includes(filterLower))
      )) ||
      (account[filterField as keyof Account] && account[filterField as keyof Account].toString().toLowerCase().includes(filterLower))
    );
  };

  const filteredAccounts = accounts.filter(account => applyFilter(account, filter));

  return (
    <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
      <div className={`content ${collapsed ? 'collapsed' : ''}`}>
        <div className="top-bar">
          <Typography variant="h4">Accounts</Typography>
          <Link to="/account/new" className="create-account-button">
            Create New Account
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
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="industry">Industry</MenuItem>
            <MenuItem value="revenue">Revenue</MenuItem>
            <MenuItem value="employees">Employees</MenuItem>
            <MenuItem value="account_owner">Account Owner</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="phone">Phone</MenuItem>
            <MenuItem value="account_site">Account Site</MenuItem>
            <MenuItem value="fax">Fax</MenuItem>
            <MenuItem value="website">Website</MenuItem>
            <MenuItem value="account_number">Account Number</MenuItem>
            <MenuItem value="ticket_Symbol">Ticket Symbol</MenuItem>
            <MenuItem value="ownership">Ownership</MenuItem>
            <MenuItem value="billing_street">Billing Street</MenuItem>
            <MenuItem value="billing_city">Billing City</MenuItem>
            <MenuItem value="billing_state">Billing State</MenuItem>
            <MenuItem value="billing_code">Billing Code</MenuItem>
            <MenuItem value="billing_country">Billing Country</MenuItem>
            <MenuItem value="shipping_street">Shipping Street</MenuItem>
            <MenuItem value="shipping_city">Shipping City</MenuItem>
            <MenuItem value="shipping_state">Shipping State</MenuItem>
            <MenuItem value="shipping_code">Shipping Code</MenuItem>
            <MenuItem value="shipping_country">Shipping Country</MenuItem>
            <MenuItem value="description">Description</MenuItem>
            <MenuItem value="sic_code">SIC Code</MenuItem>
            <MenuItem value="account_type">Account Type</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
          <TextField
            className="filter-input"
            label="Search Accounts"
            variant="outlined"
            value={filter}
            onChange={handleFilterChange}
            fullWidth
          />
        </div>
        <div className="data-section">
          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error}</Alert>}
          <div className="accounts-container">
            {filteredAccounts.length > 0 ? (
              <Grid container spacing={3}>
                {filteredAccounts.map(account => (
                  <Grid item xs={12} md={6} lg={4} key={account.id}>
                    <Card className="account-card" onClick={() => handleClickOpen(account)}>
                      <CardContent>
                        <Typography variant="h6">{account.name}</Typography>
                        <Typography className="account-info"><strong>Account Owner:</strong> {account.account_owner}</Typography>
                        <Typography className="account-info"><strong>Account Number:</strong> {account.account_number}</Typography>
                        <Typography className="account-info"><strong>Employees:</strong> {account.employees}</Typography>
                        <Typography className="account-info"><strong>Created User:</strong> {account.user?.login}</Typography>
                        <Button variant="outlined">View Detail</Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>No accounts available.</Typography>
            )}
          </div>
        </div>
      </div>

      {selectedAccount && (
        <Dialog open={open} onClose={handleClose} aria-labelledby="account-details-dialog-title">
          <DialogTitle id="account-details-dialog-title">Account Details</DialogTitle>
          <DialogContent>
            <Typography><strong>Name:</strong> {selectedAccount.name}</Typography>
            <Typography><strong>Industry:</strong> {selectedAccount.industry}</Typography>
            <Typography><strong>Revenue:</strong> {selectedAccount.revenue}</Typography>
            <Typography><strong>Employees:</strong> {selectedAccount.employees}</Typography>
            <Typography><strong>Owner:</strong> {selectedAccount.account_owner}</Typography>
            <Typography><strong>Rating:</strong> {selectedAccount.rating}</Typography>
            <Typography><strong>Phone:</strong> {selectedAccount.phone}</Typography>
            <Typography><strong>Account Site:</strong> {selectedAccount.account_site}</Typography>
            <Typography><strong>Fax:</strong> {selectedAccount.fax}</Typography>
            <Typography><strong>Website:</strong> {selectedAccount.website}</Typography>
            <Typography><strong>Account Number:</strong> {selectedAccount.account_number}</Typography>
            <Typography><strong>Ticket Symbol:</strong> {selectedAccount.ticket_Symbol}</Typography>
            <Typography><strong>Ownership:</strong> {selectedAccount.ownership}</Typography>
            <Typography><strong>Billing Street:</strong> {selectedAccount.billing_street}</Typography>
            <Typography><strong>Billing City:</strong> {selectedAccount.billing_city}</Typography>
            <Typography><strong>Billing State:</strong> {selectedAccount.billing_state}</Typography>
            <Typography><strong>Billing Code:</strong> {selectedAccount.billing_code}</Typography>
            <Typography><strong>Billing Country:</strong> {selectedAccount.billing_country}</Typography>
            <Typography><strong>Shipping Street:</strong> {selectedAccount.shipping_street}</Typography>
            <Typography><strong>Shipping City:</strong> {selectedAccount.shipping_city}</Typography>
            <Typography><strong>Shipping State:</strong> {selectedAccount.shipping_state}</Typography>
            <Typography><strong>Shipping Code:</strong> {selectedAccount.shipping_code}</Typography>
            <Typography><strong>Shipping Country:</strong> {selectedAccount.shipping_country}</Typography>
            <Typography><strong>Description:</strong> {selectedAccount.description}</Typography>
            <Typography><strong>SIC Code:</strong> {selectedAccount.sic_code}</Typography>
            <Typography><strong>Account Type:</strong> {selectedAccount.account_type}</Typography>
            <Typography><strong>Created User:</strong> {selectedAccount.user?.login}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default AccountContents;
