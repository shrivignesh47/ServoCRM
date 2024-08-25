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
//               <ValidatedField label="Google Meet" id="meetings-google_meet" name="google_meet" data-cy="google_meet" type="text" />
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
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IMeetings } from 'app/shared/model/meetings.model';
import { location } from 'app/shared/model/enumerations/location.model';
import { getEntity, updateEntity, createEntity, reset } from './meetings.reducer';

const fetchAccessToken = async () => {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: '87427524546-uq532ofv66f68jnsgrucongn49feoflm.apps.googleusercontent.com',
      client_secret: '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',
      refresh_token: '1//05xKnIGCnSpJ-CgYIARAAGAUSNwF-L9IrfD_rSl0lfQ65tSMdwvDBH2TGgse_97TZ4khUBxIdSDyRilufMt-KtWzHs4FXEqqsZfw', // Replace with your actual refresh token
      grant_type: 'refresh_token',
    }).toString(),
  });

  if (!response.ok) {
    throw new Error('Failed to retrieve access token');
  }

  const data = await response.json();
  return data.access_token;
};

const createGoogleMeetLink = async (accessToken: string, eventDetails: any) => {
  const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all&conferenceDataVersion=1', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventDetails),
  });

  if (!response.ok) {
    throw new Error('Failed to create Google Meet link');
  }

  const data = await response.json();
  return data.hangoutLink;
};

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
  const locationValues = Object.keys(location);

  const [googleMeetLink, setGoogleMeetLink] = useState<string | null>(null);

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
  }, [id, dispatch, isNew]);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = async values => {
    values.from = convertDateTimeToServer(values.from);
    values.to = convertDateTimeToServer(values.to);

    const entity = {
      ...meetingsEntity,
      ...values,
      google_meet: googleMeetLink, // Add Google Meet link to the entity
      user: users.find(it => it.id.toString() === values.user?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const createMeet = async () => {
    try {
      const accessToken = await fetchAccessToken();

      const meetLink = await createGoogleMeetLink(accessToken, {
        summary: 'Meeting scheduled through the application',
        description: 'Generated Google Meet link for the meeting',
        start: {
          dateTime: convertDateTimeToServer(defaultValues().from),
          timeZone: 'America/Los_Angeles',
        },
        end: {
          dateTime: convertDateTimeToServer(defaultValues().to),
          timeZone: 'America/Los_Angeles',
        },
        conferenceData: {
          createRequest: {
            requestId: "sample123",
            conferenceSolutionKey: { type: "hangoutsMeet" },
            status: { statusCode: "success" },
          },
        },
      });

      setGoogleMeetLink(meetLink);
    } catch (error) {
      console.error('Error creating Google Meet link:', error);
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
          google_meet: meetingsEntity?.google_meet,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="crmApp.meetings.home.createOrEditLabel" data-cy="MeetingsCreateUpdateHeading">
            Create or edit a Meeting
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
                {locationValues.map(location => (
                  <option value={location} key={location}>
                    {location}
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
              <ValidatedField
                label="Google Meet"
                id="meetings-google_meet"
                name="google_meet"
                data-cy="google_meet"
                type="text"
                readOnly
                value={googleMeetLink || defaultValues().google_meet}
                style={{ cursor: 'not-allowed' }} // Display as read-only
              />
              <Button
                color="secondary"
                id="create-meet"
                onClick={createMeet}
                disabled={!!googleMeetLink || loading} // Disable if link is already created or loading
              >
                Create Meet
              </Button>
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
