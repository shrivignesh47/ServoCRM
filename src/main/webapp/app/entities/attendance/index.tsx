import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Attendance from './attendance';
import AttendanceDetail from './attendance-detail';
import AttendanceUpdate from './attendance-update';
import AttendanceDeleteDialog from './attendance-delete-dialog';

const AttendanceRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Attendance />} />
    <Route path="new" element={<AttendanceUpdate />} />
    <Route path=":id">
      <Route index element={<AttendanceDetail />} />
      <Route path="edit" element={<AttendanceUpdate />} />
      <Route path="delete" element={<AttendanceDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AttendanceRoutes;
