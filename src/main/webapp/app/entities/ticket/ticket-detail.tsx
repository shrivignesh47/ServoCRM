import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './ticket.reducer';

export const TicketDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const ticketEntity = useAppSelector(state => state.ticket.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="ticketDetailsHeading">Ticket</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{ticketEntity.id}</dd>
          <dt>
            <span id="contact_name">Contact Name</span>
          </dt>
          <dd>{ticketEntity.contact_name}</dd>
          <dt>
            <span id="account_name">Account Name</span>
          </dt>
          <dd>{ticketEntity.account_name}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{ticketEntity.email}</dd>
          <dt>
            <span id="phone">Phone</span>
          </dt>
          <dd>{ticketEntity.phone}</dd>
          <dt>
            <span id="subject">Subject</span>
          </dt>
          <dd>{ticketEntity.subject}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{ticketEntity.description}</dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{ticketEntity.status}</dd>
          <dt>
            <span id="product_name">Product Name</span>
          </dt>
          <dd>{ticketEntity.product_name}</dd>
          <dt>
            <span id="due_date">Due Date</span>
          </dt>
          <dd>{ticketEntity.due_date ? <TextFormat value={ticketEntity.due_date} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="language">Language</span>
          </dt>
          <dd>{ticketEntity.language}</dd>
          <dt>
            <span id="channel">Channel</span>
          </dt>
          <dd>{ticketEntity.channel}</dd>
          <dt>
            <span id="classifications">Classifications</span>
          </dt>
          <dd>{ticketEntity.classifications}</dd>
          <dt>
            <span id="attachments">Attachments</span>
          </dt>
          <dd>
            {ticketEntity.attachments ? (
              <div>
                {ticketEntity.attachmentsContentType ? (
                  <a onClick={openFile(ticketEntity.attachmentsContentType, ticketEntity.attachments)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {ticketEntity.attachmentsContentType}, {byteSize(ticketEntity.attachments)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>User</dt>
          <dd>{ticketEntity.user ? ticketEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/ticket" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ticket/${ticketEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default TicketDetail;
