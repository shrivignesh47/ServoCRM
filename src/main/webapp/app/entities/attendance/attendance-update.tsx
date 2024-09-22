import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEvent } from 'app/shared/model/event.model';
import { getEntities as getEvents } from 'app/entities/event/event.reducer';
import { IAttendance } from 'app/shared/model/attendance.model';
import { getEntity, updateEntity, createEntity, reset } from './attendance.reducer';

export const AttendanceUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const events = useAppSelector(state => state.event.entities);
  const attendanceEntity = useAppSelector(state => state.attendance.entity);
  const loading = useAppSelector(state => state.attendance.loading);
  const updating = useAppSelector(state => state.attendance.updating);
  const updateSuccess = useAppSelector(state => state.attendance.updateSuccess);

  const handleClose = () => {
    navigate('/attendance' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getEvents({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    values.timestamp = convertDateTimeToServer(values.timestamp);

    const entity = {
      ...attendanceEntity,
      ...values,
      event: events.find(it => it.id.toString() === values.event?.toString()),
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
          timestamp: displayDefaultDateTime(),
        }
      : {
          ...attendanceEntity,
          timestamp: convertDateTimeFromServer(attendanceEntity.timestamp),
          event: attendanceEntity?.event?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="crmApp.attendance.home.createOrEditLabel" data-cy="AttendanceCreateUpdateHeading">
            Create or edit a Attendance
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="attendance-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="User"
                id="attendance-user"
                name="user"
                data-cy="user"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Timestamp"
                id="attendance-timestamp"
                name="timestamp"
                data-cy="timestamp"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField id="attendance-event" name="event" data-cy="event" label="Event" type="select" required>
                <option value="" key="0" />
                {events
                  ? events.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.event_name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/attendance" replace color="info">
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

export default AttendanceUpdate;
