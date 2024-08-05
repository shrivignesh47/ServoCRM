import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './deal.reducer';

export const DealDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const dealEntity = useAppSelector(state => state.deal.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="dealDetailsHeading">Deal</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{dealEntity.id}</dd>
          <dt>
            <span id="amount">Amount</span>
          </dt>
          <dd>{dealEntity.amount}</dd>
          <dt>
            <span id="deal_name">Deal Name</span>
          </dt>
          <dd>{dealEntity.deal_name}</dd>
          <dt>
            <span id="closing_date">Closing Date</span>
          </dt>
          <dd>{dealEntity.closing_date ? <TextFormat value={dealEntity.closing_date} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="stage">Stage</span>
          </dt>
          <dd>{dealEntity.stage}</dd>
          <dt>
            <span id="type">Type</span>
          </dt>
          <dd>{dealEntity.type}</dd>
          <dt>
            <span id="probability_Percentage">Probability Percentage</span>
          </dt>
          <dd>{dealEntity.probability_Percentage}</dd>
          <dt>
            <span id="compaign_Source">Compaign Source</span>
          </dt>
          <dd>{dealEntity.compaign_Source}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{dealEntity.description}</dd>
          <dt>User</dt>
          <dd>{dealEntity.user ? dealEntity.user.login : ''}</dd>
          <dt>Accounts</dt>
          <dd>{dealEntity.accounts ? dealEntity.accounts.account_owner : ''}</dd>
          <dt>Contacts</dt>
          <dd>{dealEntity.contacts ? dealEntity.contacts.first_name : ''}</dd>
          <dt>Lead</dt>
          <dd>{dealEntity.lead ? dealEntity.lead.lead_source : ''}</dd>
        </dl>
        <Button tag={Link} to="/deal" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/deal/${dealEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default DealDetail;
