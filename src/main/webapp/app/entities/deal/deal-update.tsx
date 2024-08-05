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
import { IAccounts } from 'app/shared/model/accounts.model';
import { getEntities as getAccounts } from 'app/entities/accounts/accounts.reducer';
import { IContacts } from 'app/shared/model/contacts.model';
import { getEntities as getContacts } from 'app/entities/contacts/contacts.reducer';
import { ILead } from 'app/shared/model/lead.model';
import { getEntities as getLeads } from 'app/entities/lead/lead.reducer';
import { IDeal } from 'app/shared/model/deal.model';
import { Stage } from 'app/shared/model/enumerations/stage.model';
import { Type } from 'app/shared/model/enumerations/type.model';
import { getEntity, updateEntity, createEntity, reset } from './deal.reducer';

export const DealUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const accounts = useAppSelector(state => state.accounts.entities);
  const contacts = useAppSelector(state => state.contacts.entities);
  const leads = useAppSelector(state => state.lead.entities);
  const dealEntity = useAppSelector(state => state.deal.entity);
  const loading = useAppSelector(state => state.deal.loading);
  const updating = useAppSelector(state => state.deal.updating);
  const updateSuccess = useAppSelector(state => state.deal.updateSuccess);
  const stageValues = Object.keys(Stage);
  const typeValues = Object.keys(Type);

  const handleClose = () => {
    navigate('/deal' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
    dispatch(getAccounts({}));
    dispatch(getContacts({}));
    dispatch(getLeads({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.amount !== undefined && typeof values.amount !== 'number') {
      values.amount = Number(values.amount);
    }
    values.closing_date = convertDateTimeToServer(values.closing_date);
    if (values.probability_Percentage !== undefined && typeof values.probability_Percentage !== 'number') {
      values.probability_Percentage = Number(values.probability_Percentage);
    }

    const entity = {
      ...dealEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user?.toString()),
      accounts: accounts.find(it => it.id.toString() === values.accounts?.toString()),
      contacts: contacts.find(it => it.id.toString() === values.contacts?.toString()),
      lead: leads.find(it => it.id.toString() === values.lead?.toString()),
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
          closing_date: displayDefaultDateTime(),
        }
      : {
          stage: 'QUALIFICATION',
          type: 'NONE',
          ...dealEntity,
          closing_date: convertDateTimeFromServer(dealEntity.closing_date),
          user: dealEntity?.user?.id,
          accounts: dealEntity?.accounts?.id,
          contacts: dealEntity?.contacts?.id,
          lead: dealEntity?.lead?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="crmApp.deal.home.createOrEditLabel" data-cy="DealCreateUpdateHeading">
            Create or edit a Deal
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="deal-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Amount"
                id="deal-amount"
                name="amount"
                data-cy="amount"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Deal Name"
                id="deal-deal_name"
                name="deal_name"
                data-cy="deal_name"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Closing Date"
                id="deal-closing_date"
                name="closing_date"
                data-cy="closing_date"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Stage" id="deal-stage" name="stage" data-cy="stage" type="select">
                {stageValues.map(stage => (
                  <option value={stage} key={stage}>
                    {stage}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label="Type" id="deal-type" name="type" data-cy="type" type="select">
                {typeValues.map(type => (
                  <option value={type} key={type}>
                    {type}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Probability Percentage"
                id="deal-probability_Percentage"
                name="probability_Percentage"
                data-cy="probability_Percentage"
                type="text"
              />
              <ValidatedField
                label="Compaign Source"
                id="deal-compaign_Source"
                name="compaign_Source"
                data-cy="compaign_Source"
                type="text"
              />
              <ValidatedField
                label="Description"
                id="deal-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField id="deal-user" name="user" data-cy="user" label="User" type="select" required>
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
              <ValidatedField id="deal-accounts" name="accounts" data-cy="accounts" label="Accounts" type="select" required>
                <option value="" key="0" />
                {accounts
                  ? accounts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.account_owner}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField id="deal-contacts" name="contacts" data-cy="contacts" label="Contacts" type="select" required>
                <option value="" key="0" />
                {contacts
                  ? contacts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.first_name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField id="deal-lead" name="lead" data-cy="lead" label="Lead" type="select">
                <option value="" key="0" />
                {leads
                  ? leads.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.lead_source}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/deal" replace color="info">
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

export default DealUpdate;
