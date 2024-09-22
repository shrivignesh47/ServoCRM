import React, { useState, useEffect } from 'react';
import { Button, Table } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getEvents, deleteEntity as deleteEvent } from 'app/entities/event/event.reducer';
import { getEntities as getAttendances } from 'app/entities/attendance/attendance.reducer';
import { Link } from 'react-router-dom';

export default function EventManagement() {
  const dispatch = useAppDispatch();

  const events = useAppSelector(state => state.event.entities);
  const attendances = useAppSelector(state => state.attendance.entities);
  const loading = useAppSelector(state => state.event.loading || state.attendance.loading);

  useEffect(() => {
    dispatch(getEvents({}));         // Fixed by passing an empty object
    dispatch(getAttendances({}));    // Fixed by passing an empty object
  }, [dispatch]);

  const handleDelete = id => {
    dispatch(deleteEvent(id));
  };

  return (
    <div className="content">
      <h2 style={{color:"#d3e3fdb3"}}>Event Management</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Event Name</th>
                <th>Event Date</th>
                <th>Registrations</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td>{event.id}</td>
                  <td>{event.event_name}</td>
                  <td>{event.event_date}</td>
                  <td>{event.registrations}</td>
                  <td>
                    <Button color="primary" tag={Link} to={`/event/${event.id}/edit`}>
                      Edit
                    </Button>{' '}
                    <Button color="danger" onClick={() => handleDelete(event.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h3 style={{color:"#d3e3fdb3"}}>Attendance Records</h3>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Timestamp</th>
                <th>Event</th>
              </tr>
            </thead>
            <tbody>
              {attendances.map(att => (
                <tr key={att.id}>
                  <td>{att.id}</td>
                  <td>{att.user}</td>
                  <td>{att.timestamp}</td>
                  <td>{att.event?.event_name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      <Button tag={Link} to="/event/new" color="success">
        Create New Event
      </Button>
    </div>
  );
}
