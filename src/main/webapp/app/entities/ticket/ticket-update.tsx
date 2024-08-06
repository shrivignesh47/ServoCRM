import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ITicket } from 'app/shared/model/ticket.model';
import { StatusTicket } from 'app/shared/model/enumerations/status-ticket.model';
import { channel } from 'app/shared/model/enumerations/channel.model';
import { classification } from 'app/shared/model/enumerations/classification.model';
import { getEntity, updateEntity, createEntity, reset } from './ticket.reducer';

export const TicketUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const ticketEntity = useAppSelector(state => state.ticket.entity);
  const loading = useAppSelector(state => state.ticket.loading);
  const updating = useAppSelector(state => state.ticket.updating);
  const updateSuccess = useAppSelector(state => state.ticket.updateSuccess);
  const statusTicketValues = Object.keys(StatusTicket);
  const channelValues = Object.keys(channel);
  const classificationValues = Object.keys(classification);

  const handleClose = () => {
    navigate('/ticket' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.phone !== undefined && typeof values.phone !== 'number') {
      values.phone = Number(values.phone);
    }
    values.due_date = convertDateTimeToServer(values.due_date);

    const entity = {
      ...ticketEntity,
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
          due_date: displayDefaultDateTime(),
        }
      : {
          status: 'OPEN',
          channel: 'PHONE',
          classifications: 'NONE',
          ...ticketEntity,
          due_date: convertDateTimeFromServer(ticketEntity.due_date),
          user: ticketEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="crmApp.ticket.home.createOrEditLabel" data-cy="TicketCreateUpdateHeading">
            Create or edit a Ticket
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="ticket-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Contact Name"
                id="ticket-contact_name"
                name="contact_name"
                data-cy="contact_name"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Account Name"
                id="ticket-account_name"
                name="account_name"
                data-cy="account_name"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Email"
                id="ticket-email"
                name="email"
                data-cy="email"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Phone"
                id="ticket-phone"
                name="phone"
                data-cy="phone"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Subject"
                id="ticket-subject"
                name="subject"
                data-cy="subject"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Description"
                id="ticket-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Status" id="ticket-status" name="status" data-cy="status" type="select">
                {statusTicketValues.map(statusTicket => (
                  <option value={statusTicket} key={statusTicket}>
                    {statusTicket}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label="Product Name" id="ticket-product_name" name="product_name" data-cy="product_name" type="text" />
              <ValidatedField
                label="Due Date"
                id="ticket-due_date"
                name="due_date"
                data-cy="due_date"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Language"
                id="ticket-language"
                name="language"
                data-cy="language"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Channel" id="ticket-channel" name="channel" data-cy="channel" type="select">
                {channelValues.map(channel => (
                  <option value={channel} key={channel}>
                    {channel}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Classifications"
                id="ticket-classifications"
                name="classifications"
                data-cy="classifications"
                type="select"
              >
                {classificationValues.map(classification => (
                  <option value={classification} key={classification}>
                    {classification}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedBlobField
                label="Attachments"
                id="ticket-attachments"
                name="attachments"
                data-cy="attachments"
                openActionLabel="Open"
              />
              <ValidatedField id="ticket-user" name="user" data-cy="user" label="User" type="select" required>
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/ticket" replace color="info">
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

export default TicketUpdate;
