import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Whatsappmarketing from './whatsappmarketing';
import WhatsappmarketingDetail from './whatsappmarketing-detail';
import WhatsappmarketingUpdate from './whatsappmarketing-update';
import WhatsappmarketingDeleteDialog from './whatsappmarketing-delete-dialog';

const WhatsappmarketingRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Whatsappmarketing />} />
    <Route path="new" element={<WhatsappmarketingUpdate />} />
    <Route path=":id">
      <Route index element={<WhatsappmarketingDetail />} />
      <Route path="edit" element={<WhatsappmarketingUpdate />} />
      <Route path="delete" element={<WhatsappmarketingDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default WhatsappmarketingRoutes;
