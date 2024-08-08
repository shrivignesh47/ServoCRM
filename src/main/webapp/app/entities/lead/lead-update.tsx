import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../lead/LeadUpdate.css';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ILead } from 'app/shared/model/lead.model';
import { source } from 'app/shared/model/enumerations/source.model';
import { status } from 'app/shared/model/enumerations/status.model';
import { industry } from 'app/shared/model/enumerations/industry.model';
import { rating } from 'app/shared/model/enumerations/rating.model';
import { social } from 'app/shared/model/enumerations/social.model';
import { getEntity, updateEntity, createEntity, reset } from './lead.reducer';

export const LeadUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const leadEntity = useAppSelector(state => state.lead.entity);
  const loading = useAppSelector(state => state.lead.loading);
  const updating = useAppSelector(state => state.lead.updating);
  const updateSuccess = useAppSelector(state => state.lead.updateSuccess);
  const sourceValues = Object.keys(source);
  const statusValues = Object.keys(status);
  const industryValues = Object.keys(industry);
  const ratingValues = Object.keys(rating);
  const socialValues = Object.keys(social);

  const handleClose = () => {
    navigate('/lead');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    console.log("data", values)
    if (values.no_of_emp !== undefined && typeof values.no_of_emp !== 'number') {
      values.no_of_emp = Number(values.no_of_emp);
    }
    if (values.annual_revenue !== undefined && typeof values.annual_revenue !== 'number') {
      values.annual_revenue = Number(values.annual_revenue);
    }
    if (values.zipcode !== undefined && typeof values.zipcode !== 'number') {
      values.zipcode = Number(values.zipcode);
    }
    if (values.phone !== undefined && typeof values.phone !== 'number') {
      values.phone = Number(values.phone);
    }

    const entity = {
      ...leadEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          lead_source: 'NONE',
          lead_status: 'ATTEMPTED_TO_CONTACT',
          industry: 'ASP',
          rating: 'ACCIQUED',
          social_media: 'INSTAGRAM',
          ...leadEntity,
        };

  return (
    <div className="lead-update-container">
      <h2 className="lead-update-header">Create or Edit a Lead</h2>
      {loading ? (
        <p className="lead-update-loading">Loading...</p>
      ) : (
        <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity} className="lead-update-form">
          <h3 className="lead-update-section-header">Lead Information</h3>
          <br></br>
          <ValidatedField
            label="First Name"
            id="lead-first_name"
            name="first_name"
            data-cy="first_name"
            type="text"
            validate={{
              required: { value: true, message: 'This field is required.' },
            }}
            className="lead-update-field"
          />
          <ValidatedField
            label="Last Name"
            id="lead-last_name"
            name="last_name"
            data-cy="last_name"
            type="text"
            validate={{
              required: { value: true, message: 'This field is required.' },
            }}
            className="lead-update-field"
          />
          <ValidatedField
            label="Company"
            id="lead-company"
            name="company"
            data-cy="company"
            type="text"
            validate={{
              required: { value: true, message: 'This field is required.' },
            }}
            className="lead-update-field"
          />
          <ValidatedField
            label="Title"
            id="lead-title"
            name="title"
            data-cy="title"
            type="text"
            validate={{
              required: { value: true, message: 'This field is required.' },
            }}
            className="lead-update-field"
          />
          <ValidatedField
            label="Email"
            id="lead-email"
            name="email"
            data-cy="email"
            type="text"
            validate={{
              required: { value: true, message: 'This field is required.' },
            }}
            className="lead-update-field"
          />
          <ValidatedField
            label="Fax"
            id="lead-fax"
            name="fax"
            data-cy="fax"
            type="text"
            className="lead-update-field"
          />
          <ValidatedField
            label="Website"
            id="lead-website"
            name="website"
            data-cy="website"
            type="text"
            validate={{
              required: { value: true, message: 'This field is required.' },
            }}
            className="lead-update-field"
          />
          <ValidatedField
            label="Lead Source"
            id="lead-lead_source"
            name="lead_source"
            data-cy="lead_source"
            type="select"
            className="lead-update-field"
          >
            {sourceValues.map(source => (
              <option value={source} key={source}>
                {source}
              </option>
            ))}
          </ValidatedField>
          <ValidatedField
            label="Lead Status"
            id="lead-lead_status"
            name="lead_status"
            data-cy="lead_status"
            type="select"
            className="lead-update-field"
          >
            {statusValues.map(status => (
              <option value={status} key={status}>
                {status}
              </option>
            ))}
          </ValidatedField>
          <ValidatedField
            label="Industry"
            id="lead-industry"
            name="industry"
            data-cy="industry"
            type="select"
            className="lead-update-field"
          >
            {industryValues.map(industry => (
              <option value={industry} key={industry}>
                {industry}
              </option>
            ))}
          </ValidatedField>
          <ValidatedField
            label="No Of Emp"
            id="lead-no_of_emp"
            name="no_of_emp"
            data-cy="no_of_emp"
            type="text"
            validate={{
              required: { value: true, message: 'This field is required.' },
              validate: v => isNumber(v) || 'This field should be a number.',
            }}
            className="lead-update-field"
          />
          <ValidatedField
            label="Annual Revenue"
            id="lead-annual_revenue"
            name="annual_revenue"
            data-cy="annual_revenue"
            type="text"
            className="lead-update-field"
          />
          <ValidatedField
            label="Rating"
            id="lead-rating"
            name="rating"
            data-cy="rating"
            type="select"
            className="lead-update-field"
          >
            {ratingValues.map(rating => (
              <option value={rating} key={rating}>
                {rating}
              </option>
            ))}
          </ValidatedField>
          <ValidatedField
            label="Social Media"
            id="lead-social_media"
            name="social_media"
            data-cy="social_media"
            type="select"
            className="lead-update-field"
          >
            {socialValues.map(social => (
              <option value={social} key={social}>
                {social}
              </option>
            ))}
          </ValidatedField>
          <ValidatedField
            label="Media Handle Id"
            id="lead-media_handle_id"
            name="media_handle_id"
            data-cy="media_handle_id"
            type="text"
            className="lead-update-field"
          />
    <br></br>
          <h3 className="lead-update-section-header">Lead Image</h3>
          <ValidatedBlobField
            label="Lead Image"
            id="lead-lead_image"
            name="lead_image"
            data-cy="lead_image"
            openActionLabel="Open"
            className="lead-update-field lead-update-full-width"
          />

          <h3 className="lead-update-section-header">Address Information</h3>
          <br></br>
          <ValidatedField
            label="Street"
            id="lead-street"
            name="street"
            data-cy="street"
            type="text"
            validate={{
              required: { value: true, message: 'This field is required.' },
            }}
            className="lead-update-field"
          />
          <ValidatedField
            label="City"
            id="lead-city"
            name="city"
            data-cy="city"
            type="text"
            validate={{
              required: { value: true, message: 'This field is required.' },
              maxLength: { value: 20, message: 'This field cannot be longer than 20 characters.' },
              pattern: { value: /^[a-zA-Z0-9]*$/, message: 'This field should follow pattern for ^[a-zA-Z0-9]*.' },
            }}
            className="lead-update-field"
          />
          <ValidatedField
            label="State"
            id="lead-state"
            name="state"
            data-cy="state"
            type="text"
            validate={{
              required: { value: true, message: 'This field is required.' },
            }}
            className="lead-update-field"
          />
          <ValidatedField
            label="Zipcode"
            id="lead-zipcode"
            name="zipcode"
            data-cy="zipcode"
            type="text"
            validate={{
              required: { value: true, message: 'This field is required.' },
              validate: v => isNumber(v) || 'This field should be a number.',
            }}
            className="lead-update-field"
          />
          <ValidatedField
            label="Country"
            id="lead-country"
            name="country"
            data-cy="country"
            type="text"
            validate={{
              required: { value: true, message: 'This field is required.' },
            }}
            className="lead-update-field"
          />

          <br></br>
          <h3 className="lead-update-section-header">Description Information</h3>
          <ValidatedField
            label="Description"
            id="lead-description"
            name="description"
            data-cy="description"
            type="text"
            className="lead-update-field lead-update-full-width"
          />
          <ValidatedField
            label="Phone"
            id="lead-phone"
            name="phone"
            data-cy="phone"
            type="text"
            validate={{
              required: { value: true, message: 'This field is required.' },
              validate: v => isNumber(v) || 'This field should be a number.',
            }}
            className="lead-update-field"
          />

          <div className="lead-update-buttons">
            <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/lead" replace className="lead-update-button lead-update-cancel-button">
              <FontAwesomeIcon icon="arrow-left" />
              &nbsp; Back
            </Button>
            &nbsp;
            <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating} className="lead-update-button lead-update-save-button">
              <FontAwesomeIcon icon="save" />
              &nbsp; Save
            </Button>
          </div>
        </ValidatedForm>
      )}
    </div>
  );
};

export default LeadUpdate;