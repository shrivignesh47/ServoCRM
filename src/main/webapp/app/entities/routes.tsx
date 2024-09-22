import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Lead from './lead';
import Contacts from './contacts';
import Accounts from './accounts';
import Deal from './deal';
import Task from './task';
import Meetings from './meetings';
import Product from './product';
import Ticket from './ticket';
import Marketing from './marketing';
import Whatsappmarketing from './whatsappmarketing';
import Event from './event';
import Attendance from './attendance';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="lead/*" element={<Lead />} />
        <Route path="contacts/*" element={<Contacts />} />
        <Route path="accounts/*" element={<Accounts />} />
        <Route path="deal/*" element={<Deal />} />
        <Route path="task/*" element={<Task />} />
        <Route path="meetings/*" element={<Meetings />} />
        <Route path="product/*" element={<Product />} />
        <Route path="ticket/*" element={<Ticket />} />
        <Route path="marketing/*" element={<Marketing />} />
        <Route path="whatsappmarketing/*" element={<Whatsappmarketing />} />

        <Route path="event/*" element={<Event />} />
        <Route path="attendance/*" element={<Attendance />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
