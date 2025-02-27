// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { Button, Row, Col, FormText } from 'reactstrap';
// import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
// import { mapIdList } from 'app/shared/util/entity-utils';
// import { useAppDispatch, useAppSelector } from 'app/config/store';

// import { IContacts } from 'app/shared/model/contacts.model';
// import { source } from 'app/shared/model/enumerations/source.model';
// import { getEntity, updateEntity, createEntity, reset } from './contacts.reducer';

// export const ContactsUpdate = () => {
//   const dispatch = useAppDispatch();

//   const navigate = useNavigate();

//   const { id } = useParams<'id'>();
//   const isNew = id === undefined;

//   const contactsEntity = useAppSelector(state => state.contacts.entity);
//   const loading = useAppSelector(state => state.contacts.loading);
//   const updating = useAppSelector(state => state.contacts.updating);
//   const updateSuccess = useAppSelector(state => state.contacts.updateSuccess);
//   const sourceValues = Object.keys(source);

//   const handleClose = () => {
//     navigate('/contacts' + location.search);
//   };

//   useEffect(() => {
//     if (isNew) {
//       dispatch(reset());
//     } else {
//       dispatch(getEntity(id));
//     }
//   }, []);

//   useEffect(() => {
//     if (updateSuccess) {
//       handleClose();
//     }
//   }, [updateSuccess]);

//   // eslint-disable-next-line complexity
//   const saveEntity = values => {
//     if (values.phone !== undefined && typeof values.phone !== 'number') {
//       values.phone = Number(values.phone);
//     }
//     if (values.mobile !== undefined && typeof values.mobile !== 'number') {
//       values.mobile = Number(values.mobile);
//     }
//     if (values.zip !== undefined && typeof values.zip !== 'number') {
//       values.zip = Number(values.zip);
//     }

//     const entity = {
//       ...contactsEntity,
//       ...values,
//     };

//     if (isNew) {
//       dispatch(createEntity(entity));
//     } else {
//       dispatch(updateEntity(entity));
//     }
//   };

//   const defaultValues = () =>
//     isNew
//       ? {}
//       : {
//           lead_source: 'NONE',
//           ...contactsEntity,
//         };

//   return (
//     <div>
//       <Row className="justify-content-center">
//         <Col md="8">
//           <h2 id="crmApp.contacts.home.createOrEditLabel" data-cy="ContactsCreateUpdateHeading">
//             Create or edit a Contacts
//           </h2>
//         </Col>
//       </Row>
//       <Row className="justify-content-center">
//         <Col md="8">
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
//               {!isNew ? <ValidatedField name="id" required readOnly id="contacts-id" label="ID" validate={{ required: true }} /> : null}
//               <ValidatedField
//                 label="First Name"
//                 id="contacts-first_name"
//                 name="first_name"
//                 data-cy="first_name"
//                 type="text"
//                 validate={{
//                   required: { value: true, message: 'This field is required.' },
//                 }}
//               />
//               <ValidatedField
//                 label="Last Name"
//                 id="contacts-last_name"
//                 name="last_name"
//                 data-cy="last_name"
//                 type="text"
//                 validate={{
//                   required: { value: true, message: 'This field is required.' },
//                 }}
//               />
//               <ValidatedField
//                 label="Account Name"
//                 id="contacts-account_name"
//                 name="account_name"
//                 data-cy="account_name"
//                 type="text"
//                 validate={{
//                   required: { value: true, message: 'This field is required.' },
//                 }}
//               />
//               <ValidatedField
//                 label="Vendor Name"
//                 id="contacts-vendor_name"
//                 name="vendor_name"
//                 data-cy="vendor_name"
//                 type="text"
//                 validate={{
//                   required: { value: true, message: 'This field is required.' },
//                 }}
//               />
//               <ValidatedField label="Lead Source" id="contacts-lead_source" name="lead_source" data-cy="lead_source" type="select">
//                 {sourceValues.map(source => (
//                   <option value={source} key={source}>
//                     {source}
//                   </option>
//                 ))}
//               </ValidatedField>
//               <ValidatedField
//                 label="Email"
//                 id="contacts-email"
//                 name="email"
//                 data-cy="email"
//                 type="text"
//                 validate={{
//                   required: { value: true, message: 'This field is required.' },
//                 }}
//               />
//               <ValidatedField
//                 label="Title"
//                 id="contacts-title"
//                 name="title"
//                 data-cy="title"
//                 type="text"
//                 validate={{
//                   required: { value: true, message: 'This field is required.' },
//                 }}
//               />
//               <ValidatedField
//                 label="Phone"
//                 id="contacts-phone"
//                 name="phone"
//                 data-cy="phone"
//                 type="text"
//                 validate={{
//                   required: { value: true, message: 'This field is required.' },
//                   validate: v => isNumber(v) || 'This field should be a number.',
//                 }}
//               />
//               <ValidatedField
//                 label="Department"
//                 id="contacts-department"
//                 name="department"
//                 data-cy="department"
//                 type="text"
//                 validate={{
//                   required: { value: true, message: 'This field is required.' },
//                 }}
//               />
//               <ValidatedField
//                 label="Mobile"
//                 id="contacts-mobile"
//                 name="mobile"
//                 data-cy="mobile"
//                 type="text"
//                 validate={{
//                   required: { value: true, message: 'This field is required.' },
//                   validate: v => isNumber(v) || 'This field should be a number.',
//                 }}
//               />
//               <ValidatedField label="Fax" id="contacts-fax" name="fax" data-cy="fax" type="text" />
//               <ValidatedField
//                 label="Date Of Birth"
//                 id="contacts-date_of_birth"
//                 name="date_of_birth"
//                 data-cy="date_of_birth"
//                 type="date"
//                 validate={{
//                   required: { value: true, message: 'This field is required.' },
//                 }}
//               />
//               <ValidatedField
//                 label="Street"
//                 id="contacts-street"
//                 name="street"
//                 data-cy="street"
//                 type="text"
//                 validate={{
//                   required: { value: true, message: 'This field is required.' },
//                 }}
//               />
//               <ValidatedField
//                 label="City"
//                 id="contacts-city"
//                 name="city"
//                 data-cy="city"
//                 type="text"
//                 validate={{
//                   required: { value: true, message: 'This field is required.' },
//                 }}
//               />
//               <ValidatedField
//                 label="State"
//                 id="contacts-state"
//                 name="state"
//                 data-cy="state"
//                 type="text"
//                 validate={{
//                   required: { value: true, message: 'This field is required.' },
//                 }}
//               />
//               <ValidatedField
//                 label="Zip"
//                 id="contacts-zip"
//                 name="zip"
//                 data-cy="zip"
//                 type="text"
//                 validate={{
//                   required: { value: true, message: 'This field is required.' },
//                   validate: v => isNumber(v) || 'This field should be a number.',
//                 }}
//               />
//               <ValidatedField
//                 label="Country"
//                 id="contacts-country"
//                 name="country"
//                 data-cy="country"
//                 type="text"
//                 validate={{
//                   required: { value: true, message: 'This field is required.' },
//                 }}
//               />
//               <ValidatedField
//                 label="Description"
//                 id="contacts-description"
//                 name="description"
//                 data-cy="description"
//                 type="text"
//                 validate={{
//                   required: { value: true, message: 'This field is required.' },
//                 }}
//               />
//               <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/contacts" replace color="info">
//                 <FontAwesomeIcon icon="arrow-left" />
//                 &nbsp;
//                 <span className="d-none d-md-inline">Back</span>
//               </Button>
//               &nbsp;
//               <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
//                 <FontAwesomeIcon icon="save" />
//                 &nbsp; Save
//               </Button>
//             </ValidatedForm>
//           )}
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default ContactsUpdate;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IContacts } from 'app/shared/model/contacts.model';
import { source as sourceEnum } from 'app/shared/model/enumerations/source.model';
import { getEntity, updateEntity, createEntity, reset } from './contacts.reducer';
import './ContactsUpdate.css';  // Import the CSS file

export const ContactsUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const contactsEntity = useAppSelector(state => state.contacts.entity);
  const loading = useAppSelector(state => state.contacts.loading);
  const updating = useAppSelector(state => state.contacts.updating);
  const updateSuccess = useAppSelector(state => state.contacts.updateSuccess);
  const sourceValues = Object.keys(sourceEnum);

  const handleClose = () => {
    navigate('/contacts' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, [id, isNew, dispatch]);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess, handleClose]);

  const saveEntity = values => {
    const entity = {
      ...contactsEntity,
      ...values,
      phone: values.phone ? Number(values.phone) : undefined,
      mobile: values.mobile ? Number(values.mobile) : undefined,
      zip: values.zip ? Number(values.zip) : undefined,
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
          ...contactsEntity,
        };

  return (
    <div className="contacts-update-container">
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="crmApp.contacts.home.createOrEditLabel" data-cy="ContactsCreateUpdateHeading" className="contacts-update-header">
            Create or edit a Contact
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p className="contacts-update-loading">Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity} className="contacts-update-form">
              {!isNew && (
                <ValidatedField name="id" required readOnly id="contacts-id" label="ID" validate={{ required: true }} className="contacts-update-field" />
              )}
              <ValidatedField
                label="First Name"
                id="contacts-first_name"
                name="first_name"
                data-cy="first_name"
                type="text"
                validate={{ required: { value: true, message: 'This field is required.' } }}
                className="contacts-update-field"
              />
              <ValidatedField
                label="Last Name"
                id="contacts-last_name"
                name="last_name"
                data-cy="last_name"
                type="text"
                validate={{ required: { value: true, message: 'This field is required.' } }}
                className="contacts-update-field"
              />
              <ValidatedField
                label="Date Of Birth"
                id="contacts-date_of_birth"
                name="date_of_birth"
                data-cy="date_of_birth"
                type="date"
                validate={{ required: { value: true, message: 'This field is required.' } }}
                className="contacts-update-field"
              />
              <ValidatedField
                label="Account Name"
                id="contacts-account_name"
                name="account_name"
                data-cy="account_name"
                type="text"
                validate={{ required: { value: true, message: 'This field is required.' } }}
                className="contacts-update-field"
              />
              <ValidatedField
                label="Vendor Name"
                id="contacts-vendor_name"
                name="vendor_name"
                data-cy="vendor_name"
                type="text"
                validate={{ required: { value: true, message: 'This field is required.' } }}
                className="contacts-update-field"
              />
              <ValidatedField
                label="Lead Source"
                id="contacts-lead_source"
                name="lead_source"
                data-cy="lead_source"
                type="select"
                className="contacts-update-field"
              >
                {sourceValues.map(sourceValue => (
                  <option value={sourceValue} key={sourceValue}>
                    {sourceValue}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Email"
                id="contacts-email"
                name="email"
                data-cy="email"
                type="text"
                validate={{ required: { value: true, message: 'This field is required.' } }}
                className="contacts-update-field"
              />
              <ValidatedField
                label="Title"
                id="contacts-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{ required: { value: true, message: 'This field is required.' } }}
                className="contacts-update-field"
              />
              <ValidatedField
                label="Phone"
                id="contacts-phone"
                name="phone"
                data-cy="phone"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
                className="contacts-update-field"
              />
              <ValidatedField
                label="Department"
                id="contacts-department"
                name="department"
                data-cy="department"
                type="text"
                validate={{ required: { value: true, message: 'This field is required.' } }}
                className="contacts-update-field"
              />
              <ValidatedField
                label="Mobile"
                id="contacts-mobile"
                name="mobile"
                data-cy="mobile"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
                className="contacts-update-field"
              />
              <ValidatedField
                label="Fax"
                id="contacts-fax"
                name="fax"
                data-cy="fax"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
                className="contacts-update-field"
              />
              <ValidatedField
                label="Social Media Handle"
                id="contacts-social_media_handle"
                name="social_media_handle"
                data-cy="social_media_handle"
                type="text"
                validate={{ required: { value: true, message: 'This field is required.' } }}
                className="contacts-update-field"
              />
              <ValidatedField
                label="Address"
                id="contacts-address"
                name="address"
                data-cy="address"
                type="text"
                validate={{ required: { value: true, message: 'This field is required.' } }}
                className="contacts-update-field"
              />
              <ValidatedField
                label="Street"
                id="contacts-street"
                name="street"
                data-cy="street"
                type="text"
                validate={{ required: { value: true, message: 'This field is required.' } }}
                className="contacts-update-field"
              />
              <ValidatedField
                label="City"
                id="contacts-city"
                name="city"
                data-cy="city"
                type="text"
                validate={{ required: { value: true, message: 'This field is required.' } }}
                className="contacts-update-field"
              />
              <ValidatedField
                label="State"
                id="contacts-state"
                name="state"
                data-cy="state"
                type="text"
                validate={{ required: { value: true, message: 'This field is required.' } }}
                className="contacts-update-field"
              />
              <ValidatedField
                label="Zip"
                id="contacts-zip"
                name="zip"
                data-cy="zip"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
                className="contacts-update-field"
              />
              <ValidatedField
                label="Country"
                id="contacts-country"
                name="country"
                data-cy="country"
                type="text"
                validate={{ required: { value: true, message: 'This field is required.' } }}
                className="contacts-update-field"
              />
              <ValidatedField
                label="Description"
                id="contacts-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{ required: { value: true, message: 'This field is required.' } }}
                className="contacts-update-field"
              />
              <div className="contacts-update-buttons">
                <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/contacts" replace color="info" className="contacts-update-cancel-button">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating} className="contacts-update-save-button">
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </div>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ContactsUpdate;
