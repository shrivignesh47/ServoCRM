import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/lead">
        Lead
      </MenuItem>
      <MenuItem icon="asterisk" to="/contacts">
        Contacts
      </MenuItem>
      <MenuItem icon="asterisk" to="/accounts">
        Accounts
      </MenuItem>
      <MenuItem icon="asterisk" to="/deal">
        Deal
      </MenuItem>
      <MenuItem icon="asterisk" to="/task">
        Task
      </MenuItem>
      <MenuItem icon="asterisk" to="/meetings">
        Meetings
      </MenuItem>
      <MenuItem icon="asterisk" to="/product">
        Product
      </MenuItem>
      <MenuItem icon="asterisk" to="/ticket">
        Ticket
      </MenuItem>
      <MenuItem icon="asterisk" to="/marketing">
        Marketing
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
