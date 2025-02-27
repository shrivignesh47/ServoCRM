import React, { useState, useEffect } from 'react';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { Row, Col, Alert, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { handleRegister, reset } from './register.reducer';

import './register.scss'; // Import your custom styles

export const RegisterPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [dispatch],
  );

  const handleValidSubmit = ({ username, email, firstPassword }) => {
    dispatch(handleRegister({ login: username, email, password: firstPassword, langKey: 'en' }));
  };

  const updatePassword = event => setPassword(event.target.value);

  const successMessage = useAppSelector(state => state.register.successMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  return (
    <div className="register-container">
      <Row className="register-box">
        <Col md="6" className="register-image">
          <img src="content/images/Servo.png" alt="Register" />
        </Col>
        <Col md="6" className="register-form">
          <Row className="justify-content-center">
            <Col md="12">
              <h1 id="register-title" data-cy="registerTitle">
                Registration
              </h1>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="12">
              <ValidatedForm id="register-form" onSubmit={handleValidSubmit}>
                <ValidatedField
                  name="username"
                  label="Username"
                  placeholder="Your username"
                  validate={{
                    required: { value: true, message: 'Your username is required.' },
                    pattern: {
                      value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                      message: 'Your username is invalid.',
                    },
                    minLength: { value: 1, message: 'Your username is required to be at least 1 character.' },
                    maxLength: { value: 50, message: 'Your username cannot be longer than 50 characters.' },
                  }}
                  data-cy="username"
                />
                <ValidatedField
                  name="email"
                  label="Email"
                  placeholder="Your email"
                  type="email"
                  validate={{
                    required: { value: true, message: 'Your email is required.' },
                    minLength: { value: 5, message: 'Your email is required to be at least 5 characters.' },
                    maxLength: { value: 254, message: 'Your email cannot be longer than 50 characters.' },
                    validate: v => isEmail(v) || 'Your email is invalid.',
                  }}
                  data-cy="email"
                />
                <ValidatedField
                  name="firstPassword"
                  label="New password"
                  placeholder="New password"
                  type="password"
                  onChange={updatePassword}
                  validate={{
                    required: { value: true, message: 'Your password is required.' },
                    minLength: { value: 4, message: 'Your password is required to be at least 4 characters.' },
                    maxLength: { value: 50, message: 'Your password cannot be longer than 50 characters.' },
                  }}
                  data-cy="firstPassword"
                />
                <PasswordStrengthBar password={password} />
                <ValidatedField
                  name="secondPassword"
                  label="New password confirmation"
                  placeholder="Confirm the new password"
                  type="password"
                  validate={{
                    required: { value: true, message: 'Your confirmation password is required.' },
                    minLength: { value: 4, message: 'Your confirmation password is required to be at least 4 characters.' },
                    maxLength: { value: 50, message: 'Your confirmation password cannot be longer than 50 characters.' },
                    validate: v => v === password || 'The password and its confirmation do not match!',
                  }}
                  data-cy="secondPassword"
                />
                <Button id="register-submit" color="primary" type="submit" data-cy="submit">
                  Register
                </Button>

                <Link to="/" className="alert-link" style={{color:'black'}}>Already have account?</Link>
               
              </ValidatedForm>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;
