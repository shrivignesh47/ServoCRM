import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './meetings.reducer';

export const MeetingsDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const meetingsEntity = useAppSelector(state => state.meetings.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="meetingsDetailsHeading">Meetings</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{meetingsEntity.id}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{meetingsEntity.title}</dd>
          <dt>
            <span id="location">Location</span>
          </dt>
          <dd>{meetingsEntity.location}</dd>
          <dt>
            <span id="location_Offline_Detail">Location Offline Detail</span>
          </dt>
          <dd>{meetingsEntity.location_Offline_Detail}</dd>
          <dt>
            <span id="from">From</span>
          </dt>
          <dd>{meetingsEntity.from ? <TextFormat value={meetingsEntity.from} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="to">To</span>
          </dt>
          <dd>{meetingsEntity.to ? <TextFormat value={meetingsEntity.to} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="google_meet">Google Meet</span>
          </dt>
          <dd>{meetingsEntity.google_meet}</dd>
          <dt>User</dt>
          <dd>{meetingsEntity.user ? meetingsEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/meetings" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/meetings/${meetingsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default MeetingsDetail;
