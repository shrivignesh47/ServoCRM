// import React, { useEffect } from 'react';
// import { Button, Col, Row } from 'reactstrap';
// import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
// import { toast } from 'react-toastify';

// import { useAppDispatch, useAppSelector } from 'app/config/store';
// import { getSession } from 'app/shared/reducers/authentication';
// import { saveAccountSettings, reset } from './settings.reducer';

// export const SettingsPage = () => {
//   const dispatch = useAppDispatch();
//   const account = useAppSelector(state => state.authentication.account);
//   const successMessage = useAppSelector(state => state.settings.successMessage);

//   useEffect(() => {
//     dispatch(getSession());
//     return () => {
//       dispatch(reset());
//     };
//   }, []);

//   useEffect(() => {
//     if (successMessage) {
//       toast.success(successMessage);
//     }
//   }, [successMessage]);

//   const handleValidSubmit = values => {
//     dispatch(
//       saveAccountSettings({
//         ...account,
//         ...values,
//       }),
//     );
//   };

//   return (
//     <div>
//       <Row className="justify-content-center">
//         <Col md="8">
//           <h2 id="settings-title">
//             User settings for [<strong>{account.login}</strong>]
//           </h2>
//           <ValidatedForm id="settings-form" onSubmit={handleValidSubmit} defaultValues={account}>
//             <ValidatedField
//               name="firstName"
//               label="First Name"
//               id="firstName"
//               placeholder="Your first name"
//               validate={{
//                 required: { value: true, message: 'Your first name is required.' },
//                 minLength: { value: 1, message: 'Your first name is required to be at least 1 character' },
//                 maxLength: { value: 50, message: 'Your first name cannot be longer than 50 characters' },
//               }}
//               data-cy="firstname"
//             />
//             <ValidatedField
//               name="lastName"
//               label="Last Name"
//               id="lastName"
//               placeholder="Your last name"
//               validate={{
//                 required: { value: true, message: 'Your last name is required.' },
//                 minLength: { value: 1, message: 'Your last name is required to be at least 1 character' },
//                 maxLength: { value: 50, message: 'Your last name cannot be longer than 50 characters' },
//               }}
//               data-cy="lastname"
//             />
//             <ValidatedField
//               name="email"
//               label="Email"
//               placeholder="Your email"
//               type="email"
//               validate={{
//                 required: { value: true, message: 'Your email is required.' },
//                 minLength: { value: 5, message: 'Your email is required to be at least 5 characters.' },
//                 maxLength: { value: 254, message: 'Your email cannot be longer than 50 characters.' },
//                 validate: v => isEmail(v) || 'Your email is invalid.',
//               }}
//               data-cy="email"
//             />
//             <Button color="primary" type="submit" data-cy="submit">
//               Save
//             </Button>
//           </ValidatedForm>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default SettingsPage;


import React, { useEffect } from 'react';
import { Container, Grid, Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.settings.successMessage);

  useEffect(() => {
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required('Your first name is required.')
      .min(1, 'Your first name is required to be at least 1 character.')
      .max(50, 'Your first name cannot be longer than 50 characters.'),
    lastName: Yup.string()
      .required('Your last name is required.')
      .min(1, 'Your last name is required to be at least 1 character.')
      .max(50, 'Your last name cannot be longer than 50 characters.'),
    email: Yup.string()
      .required('Your email is required.')
      .email('Your email is invalid.')
      .min(5, 'Your email is required to be at least 5 characters.')
      .max(254, 'Your email cannot be longer than 254 characters.'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: account.firstName || '',
      lastName: account.lastName || '',
      email: account.email || '',
    },
    validationSchema,
    onSubmit: values => {
      dispatch(
        saveAccountSettings({
          ...account,
          ...values,
        }),
      );
    },
  });

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Paper sx={{ p: 4, backgroundColor: '#162c46', color: '#d3e3fdb3', width: '100%',height:'87.4vh' }}>
          <Typography variant="h4" component="h2" sx={{ mb: 9, textAlign: 'center' ,marginTop:'10vh' }}>
            User Settings for <strong>{account.login}</strong>
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && (formik.errors.firstName as string)}
                  variant="outlined"
                  InputLabelProps={{
                    style: { color: '#d3e3fdb3' },
                  }}
                  InputProps={{
                    style: { color: '#d3e3fdb3' },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#d3e3fdb3',
                      },
                      '&:hover fieldset': {
                        borderColor: '#d3e3fdb3',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && (formik.errors.lastName as string)}
                  variant="outlined"
                  InputLabelProps={{
                    style: { color: '#d3e3fdb3' },
                  }}
                  InputProps={{
                    style: { color: '#d3e3fdb3' },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#d3e3fdb3',
                      },
                      '&:hover fieldset': {
                        borderColor: '#d3e3fdb3',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && (formik.errors.email as string)}
                  variant="outlined"
                  InputLabelProps={{
                    style: { color: '#d3e3fdb3' },
                  }}
                  InputProps={{
                    style: { color: '#d3e3fdb3' },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#d3e3fdb3',
                      },
                      '&:hover fieldset': {
                        borderColor: '#d3e3fdb3',
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: '#0d6efd' }}>
                Save
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default SettingsPage;
