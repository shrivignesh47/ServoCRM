import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Meetings from './meetings';
import MeetingsDetail from './meetings-detail';
import MeetingsUpdate from './meetings-update';
import MeetingsDeleteDialog from './meetings-delete-dialog';

const MeetingsRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Meetings />} />
    <Route path="new" element={<MeetingsUpdate />} />
    <Route path=":id">
      <Route index element={<MeetingsDetail />} />
      <Route path="edit" element={<MeetingsUpdate />} />
      <Route path="delete" element={<MeetingsDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default MeetingsRoutes;
