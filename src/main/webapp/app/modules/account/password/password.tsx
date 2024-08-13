// import React, { useState, useEffect } from 'react';
// import { ValidatedField, ValidatedForm } from 'react-jhipster';
// import { Row, Col, Button } from 'reactstrap';
// import { toast } from 'react-toastify';

// import { useAppDispatch, useAppSelector } from 'app/config/store';
// import { getSession } from 'app/shared/reducers/authentication';
// import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
// import { savePassword, reset } from './password.reducer';

// export const PasswordPage = () => {
//   const [password, setPassword] = useState('');
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(reset());
//     dispatch(getSession());
//     return () => {
//       dispatch(reset());
//     };
//   }, []);

//   const handleValidSubmit = ({ currentPassword, newPassword }) => {
//     dispatch(savePassword({ currentPassword, newPassword }));
//   };

//   const updatePassword = event => setPassword(event.target.value);

//   const account = useAppSelector(state => state.authentication.account);
//   const successMessage = useAppSelector(state => state.password.successMessage);
//   const errorMessage = useAppSelector(state => state.password.errorMessage);

//   useEffect(() => {
//     if (successMessage) {
//       toast.success(successMessage);
//     } else if (errorMessage) {
//       toast.error(errorMessage);
//     }
//     dispatch(reset());
//   }, [successMessage, errorMessage]);

//   return (
//     <div>
//       <Row className="justify-content-center">
//         <Col md="8">
//           <h2 id="password-title">
//             Password for [<strong>{account.login}</strong>]
//           </h2>
//           <ValidatedForm id="password-form" onSubmit={handleValidSubmit}>
//             <ValidatedField
//               name="currentPassword"
//               label="Current password"
//               placeholder="Current password"
//               type="password"
//               validate={{
//                 required: { value: true, message: 'Your password is required.' },
//               }}
//               data-cy="currentPassword"
//             />
//             <ValidatedField
//               name="newPassword"
//               label="New password"
//               placeholder="New password"
//               type="password"
//               validate={{
//                 required: { value: true, message: 'Your password is required.' },
//                 minLength: { value: 4, message: 'Your password is required to be at least 4 characters.' },
//                 maxLength: { value: 50, message: 'Your password cannot be longer than 50 characters.' },
//               }}
//               onChange={updatePassword}
//               data-cy="newPassword"
//             />
//             <PasswordStrengthBar password={password} />
//             <ValidatedField
//               name="confirmPassword"
//               label="New password confirmation"
//               placeholder="Confirm the new password"
//               type="password"
//               validate={{
//                 required: { value: true, message: 'Your confirmation password is required.' },
//                 minLength: { value: 4, message: 'Your confirmation password is required to be at least 4 characters.' },
//                 maxLength: { value: 50, message: 'Your confirmation password cannot be longer than 50 characters.' },
//                 validate: v => v === password || 'The password and its confirmation do not match!',
//               }}
//               data-cy="confirmPassword"
//             />
//             <Button color="success" type="submit" data-cy="submit">
//               Save
//             </Button>
//           </ValidatedForm>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default PasswordPage;


import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Button, TextField, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { savePassword, reset } from './password.reducer';

export const PasswordPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleValidSubmit = async (formData: FormData) => {
    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    await dispatch(savePassword({ currentPassword, newPassword }));
  };

  const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.password.successMessage);
  const errorMessage = useAppSelector(state => state.password.errorMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    } else if (errorMessage) {
      toast.error(errorMessage);
    }
    dispatch(reset());
  }, [successMessage, errorMessage, dispatch]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    handleValidSubmit(formData);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Paper sx={{ p: 4, backgroundColor: '#162c46', color: '#d3e3fdb3', width: '100%' }}>
          <Typography variant="h4" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
            Password for <strong>{account.login}</strong>
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="currentPassword"
                  name="currentPassword"
                  label="Current Password"
                  placeholder="Current password"
                  type="password"
                  required
                  variant="outlined"
                  InputLabelProps={{
                    style: { color: '#d3e3fdb3' },
                  }}
                  InputProps={{
                    style: { color: '#d3e3fdb3' },
                  }}
                  sx={{
                    mb: 2,
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
                  id="newPassword"
                  name="newPassword"
                  label="New Password"
                  placeholder="New password"
                  type="password"
                  required
                  variant="outlined"
                  InputLabelProps={{
                    style: { color: '#d3e3fdb3' },
                  }}
                  InputProps={{
                    style: { color: '#d3e3fdb3' },
                  }}
                  onChange={updatePassword}
                  sx={{
                    mb: 2,
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
                <PasswordStrengthBar password={password} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm New Password"
                  placeholder="Confirm the new password"
                  type="password"
                  required
                  variant="outlined"
                  InputLabelProps={{
                    style: { color: '#d3e3fdb3' },
                  }}
                  InputProps={{
                    style: { color: '#d3e3fdb3' },
                  }}
                  sx={{
                    mb: 2,
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
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button type="submit" variant="contained" color="success" sx={{ backgroundColor: '#0d6efd' }}>
                  Save
                </Button>
              </Box>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default PasswordPage;
