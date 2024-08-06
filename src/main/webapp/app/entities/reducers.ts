import lead from 'app/entities/lead/lead.reducer';
import contacts from 'app/entities/contacts/contacts.reducer';
import accounts from 'app/entities/accounts/accounts.reducer';
import deal from 'app/entities/deal/deal.reducer';
import task from 'app/entities/task/task.reducer';
import meetings from 'app/entities/meetings/meetings.reducer';
import product from 'app/entities/product/product.reducer';
import ticket from 'app/entities/ticket/ticket.reducer';
import marketing from 'app/entities/marketing/marketing.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  lead,
  contacts,
  accounts,
  deal,
  task,
  meetings,
  product,
  ticket,
  marketing,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
