import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './marketing.reducer';

export const MarketingDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const marketingEntity = useAppSelector(state => state.marketing.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="marketingDetailsHeading">Marketing</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{marketingEntity.id}</dd>
          <dt>
            <span id="campaign_name">Campaign Name</span>
          </dt>
          <dd>{marketingEntity.campaign_name}</dd>
          <dt>
            <span id="start_date">Start Date</span>
          </dt>
          <dd>
            {marketingEntity.start_date ? <TextFormat value={marketingEntity.start_date} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="end_date">End Date</span>
          </dt>
          <dd>{marketingEntity.end_date ? <TextFormat value={marketingEntity.end_date} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
        </dl>
        <Button tag={Link} to="/marketing" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/marketing/${marketingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default MarketingDetail;
