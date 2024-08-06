// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { Button, Row, Col, FormText } from 'reactstrap';
// import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
// import { mapIdList } from 'app/shared/util/entity-utils';
// import { useAppDispatch, useAppSelector } from 'app/config/store';

// import { IUser } from 'app/shared/model/user.model';
// import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
// import { IMeetings } from 'app/shared/model/meetings.model';
// import { location } from 'app/shared/model/enumerations/location.model';
// import { getEntity, updateEntity, createEntity, reset } from './meetings.reducer';

// export const MeetingsUpdate = () => {
//   const dispatch = useAppDispatch();

//   const navigate = useNavigate();

//   const { id } = useParams<'id'>();
//   const isNew = id === undefined;

//   const users = useAppSelector(state => state.userManagement.users);
//   const meetingsEntity = useAppSelector(state => state.meetings.entity);
//   const loading = useAppSelector(state => state.meetings.loading);
//   const updating = useAppSelector(state => state.meetings.updating);
//   const updateSuccess = useAppSelector(state => state.meetings.updateSuccess);
//   const locationValues = Object.keys(location);

//   const handleClose = () => {
//     navigate('/meetings' + location);
//   };

//   useEffect(() => {
//     if (isNew) {
//       dispatch(reset());
//     } else {
//       dispatch(getEntity(id));
//     }

//     dispatch(getUsers({}));
//   }, []);

//   useEffect(() => {
//     if (updateSuccess) {
//       handleClose();
//     }
//   }, [updateSuccess]);

//   // eslint-disable-next-line complexity
//   const saveEntity = values => {
//     values.from = convertDateTimeToServer(values.from);
//     values.to = convertDateTimeToServer(values.to);

//     const entity = {
//       ...meetingsEntity,
//       ...values,
//       user: users.find(it => it.id.toString() === values.user?.toString()),
//     };

//     if (isNew) {
//       dispatch(createEntity(entity));
//     } else {
//       dispatch(updateEntity(entity));
//     }
//   };

//   const defaultValues = () =>
//     isNew
//       ? {
//           from: displayDefaultDateTime(),
//           to: displayDefaultDateTime(),
//         }
//       : {
//           location: 'ONLINE',
//           ...meetingsEntity,
//           from: convertDateTimeFromServer(meetingsEntity.from),
//           to: convertDateTimeFromServer(meetingsEntity.to),
//           user: meetingsEntity?.user?.id,
//         };

//   return (
//     <div>
//       <Row className="justify-content-center">
//         <Col md="8">
//           <h2 id="crmApp.meetings.home.createOrEditLabel" data-cy="MeetingsCreateUpdateHeading">
//             Create or edit a Meetings
//           </h2>
//         </Col>
//       </Row>
//       <Row className="justify-content-center">
//         <Col md="8">
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
//               {!isNew ? <ValidatedField name="id" required readOnly id="meetings-id" label="ID" validate={{ required: true }} /> : null}
//               <ValidatedField
//                 label="Title"
//                 id="meetings-title"
//                 name="title"
//                 data-cy="title"
//                 type="text"
//                 validate={{
//                   required: { value: true, message: 'This field is required.' },
//                 }}
//               />
//               <ValidatedField label="Location" id="meetings-location" name="location" data-cy="location" type="select">
//                 {locationValues.map(location => (
//                   <option value={location} key={location}>
//                     {location}
//                   </option>
//                 ))}
//               </ValidatedField>
//               <ValidatedField
//                 label="Location Offline Detail"
//                 id="meetings-location_Offline_Detail"
//                 name="location_Offline_Detail"
//                 data-cy="location_Offline_Detail"
//                 type="text"
//               />
//               <ValidatedField
//                 label="From"
//                 id="meetings-from"
//                 name="from"
//                 data-cy="from"
//                 type="datetime-local"
//                 placeholder="YYYY-MM-DD HH:mm"
//                 validate={{
//                   required: { value: true, message: 'This field is required.' },
//                 }}
//               />
//               <ValidatedField
//                 label="To"
//                 id="meetings-to"
//                 name="to"
//                 data-cy="to"
//                 type="datetime-local"
//                 placeholder="YYYY-MM-DD HH:mm"
//                 validate={{
//                   required: { value: true, message: 'This field is required.' },
//                 }}
//               />
//               <ValidatedField id="meetings-user" name="user" data-cy="user" label="User" type="select" required>
//                 <option value="" key="0" />
//                 {users
//                   ? users.map(otherEntity => (
//                       <option value={otherEntity.id} key={otherEntity.id}>
//                         {otherEntity.login}
//                       </option>
//                     ))
//                   : null}
//               </ValidatedField>
//               <FormText>This field is required.</FormText>
//               <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/meetings" replace color="info">
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

// export default MeetingsUpdate;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IMeetings } from 'app/shared/model/meetings.model';
import { location as locationEnum } from 'app/shared/model/enumerations/location.model';
import { getEntity, updateEntity, createEntity, reset } from './meetings.reducer';

export const MeetingsUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const meetingsEntity = useAppSelector(state => state.meetings.entity);
  const loading = useAppSelector(state => state.meetings.loading);
  const updating = useAppSelector(state => state.meetings.updating);
  const updateSuccess = useAppSelector(state => state.meetings.updateSuccess);
  const locationValues = Object.keys(locationEnum);

  const handleClose = () => {
    navigate('/meetings');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
  }, [dispatch, id, isNew]);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    values.from = convertDateTimeToServer(values.from);
    values.to = convertDateTimeToServer(values.to);

    const entity = {
      ...meetingsEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          from: displayDefaultDateTime(),
          to: displayDefaultDateTime(),
        }
      : {
          location: 'ONLINE',
          ...meetingsEntity,
          from: convertDateTimeFromServer(meetingsEntity.from),
          to: convertDateTimeFromServer(meetingsEntity.to),
          user: meetingsEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="crmApp.meetings.home.createOrEditLabel" data-cy="MeetingsCreateUpdateHeading">
            Create or edit a Meetings
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="meetings-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Title"
                id="meetings-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Location" id="meetings-location" name="location" data-cy="location" type="select">
                {locationValues.map(locationValue => (
                  <option value={locationValue} key={locationValue}>
                    {locationValue}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Location Offline Detail"
                id="meetings-location_Offline_Detail"
                name="location_Offline_Detail"
                data-cy="location_Offline_Detail"
                type="text"
              />
              <ValidatedField
                label="From"
                id="meetings-from"
                name="from"
                data-cy="from"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="To"
                id="meetings-to"
                name="to"
                data-cy="to"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField id="meetings-user" name="user" data-cy="user" label="User" type="select" required>
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/meetings" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MeetingsUpdate;
