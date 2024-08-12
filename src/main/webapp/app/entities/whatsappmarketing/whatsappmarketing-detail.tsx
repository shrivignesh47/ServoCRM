import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './whatsappmarketing.reducer';

export const WhatsappmarketingDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const whatsappmarketingEntity = useAppSelector(state => state.whatsappmarketing.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="whatsappmarketingDetailsHeading">Whatsappmarketing</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{whatsappmarketingEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{whatsappmarketingEntity.name}</dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{whatsappmarketingEntity.status}</dd>
          <dt>
            <span id="created_On">Created On</span>
          </dt>
          <dd>
            {whatsappmarketingEntity.created_On ? (
              <TextFormat value={whatsappmarketingEntity.created_On} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="created_by">Created By</span>
          </dt>
          <dd>{whatsappmarketingEntity.created_by}</dd>
          <dt>
            <span id="recipents">Recipents</span>
          </dt>
          <dd>{whatsappmarketingEntity.recipents}</dd>
          <dt>
            <span id="report">Report</span>
          </dt>
          <dd>{whatsappmarketingEntity.report}</dd>
          <dt>
            <span id="action">Action</span>
          </dt>
          <dd>{whatsappmarketingEntity.action}</dd>
          <dt>User</dt>
          <dd>{whatsappmarketingEntity.user ? whatsappmarketingEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/whatsappmarketing" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/whatsappmarketing/${whatsappmarketingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default WhatsappmarketingDetail;
