import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './task.reducer';

export const TaskDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const taskEntity = useAppSelector(state => state.task.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="taskDetailsHeading">Task</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{taskEntity.id}</dd>
          <dt>
            <span id="subject">Subject</span>
          </dt>
          <dd>{taskEntity.subject}</dd>
          <dt>
            <span id="due_date">Due Date</span>
          </dt>
          <dd>{taskEntity.due_date ? <TextFormat value={taskEntity.due_date} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="priority">Priority</span>
          </dt>
          <dd>{taskEntity.priority}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{taskEntity.description}</dd>
          <dt>
            <span id="reminder">Reminder</span>
          </dt>
          <dd>{taskEntity.reminder}</dd>
          <dt>User</dt>
          <dd>{taskEntity.user ? taskEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/task" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/task/${taskEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default TaskDetail;
