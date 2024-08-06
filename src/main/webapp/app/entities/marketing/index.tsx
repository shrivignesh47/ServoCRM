import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Marketing from './marketing';
import MarketingDetail from './marketing-detail';
import MarketingUpdate from './marketing-update';
import MarketingDeleteDialog from './marketing-delete-dialog';

const MarketingRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Marketing />} />
    <Route path="new" element={<MarketingUpdate />} />
    <Route path=":id">
      <Route index element={<MarketingDetail />} />
      <Route path="edit" element={<MarketingUpdate />} />
      <Route path="delete" element={<MarketingDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default MarketingRoutes;
