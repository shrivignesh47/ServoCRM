import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './event.reducer';

export const EventDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const eventEntity = useAppSelector(state => state.event.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="eventDetailsHeading">Event</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{eventEntity.id}</dd>
          <dt>
            <span id="event_name">Event Name</span>
          </dt>
          <dd>{eventEntity.event_name}</dd>
          <dt>
            <span id="event_date">Event Date</span>
          </dt>
          <dd>
            {eventEntity.event_date ? <TextFormat value={eventEntity.event_date} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="registrations">Registrations</span>
          </dt>
          <dd>{eventEntity.registrations}</dd>
        </dl>
        <Button tag={Link} to="/event" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/event/${eventEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default EventDetail;
