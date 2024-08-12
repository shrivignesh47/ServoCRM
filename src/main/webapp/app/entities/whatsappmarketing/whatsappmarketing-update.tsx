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
import { IWhatsappmarketing } from 'app/shared/model/whatsappmarketing.model';
import { getEntity, updateEntity, createEntity, reset } from './whatsappmarketing.reducer';

export const WhatsappmarketingUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const whatsappmarketingEntity = useAppSelector(state => state.whatsappmarketing.entity);
  const loading = useAppSelector(state => state.whatsappmarketing.loading);
  const updating = useAppSelector(state => state.whatsappmarketing.updating);
  const updateSuccess = useAppSelector(state => state.whatsappmarketing.updateSuccess);

  const handleClose = () => {
    navigate('/whatsappmarketing' + location.search);
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
    values.created_On = convertDateTimeToServer(values.created_On);
    if (values.recipents !== undefined && typeof values.recipents !== 'number') {
      values.recipents = Number(values.recipents);
    }

    const entity = {
      ...whatsappmarketingEntity,
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
          created_On: displayDefaultDateTime(),
        }
      : {
          ...whatsappmarketingEntity,
          created_On: convertDateTimeFromServer(whatsappmarketingEntity.created_On),
          user: whatsappmarketingEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="crmApp.whatsappmarketing.home.createOrEditLabel" data-cy="WhatsappmarketingCreateUpdateHeading">
            Create or edit a Whatsappmarketing
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="whatsappmarketing-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Name"
                id="whatsappmarketing-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Status"
                id="whatsappmarketing-status"
                name="status"
                data-cy="status"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Created On"
                id="whatsappmarketing-created_On"
                name="created_On"
                data-cy="created_On"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Created By" id="whatsappmarketing-created_by" name="created_by" data-cy="created_by" type="text" />
              <ValidatedField label="Recipents" id="whatsappmarketing-recipents" name="recipents" data-cy="recipents" type="text" />
              <ValidatedField label="Report" id="whatsappmarketing-report" name="report" data-cy="report" type="text" />
              <ValidatedField label="Action" id="whatsappmarketing-action" name="action" data-cy="action" type="text" />
              <ValidatedField id="whatsappmarketing-user" name="user" data-cy="user" label="User" type="select" required>
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/whatsappmarketing" replace color="info">
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

export default WhatsappmarketingUpdate;
