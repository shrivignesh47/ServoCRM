import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faTachometerAlt, faUsers, faBullhorn, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
  crmOpen: boolean;
  toggleCrmMenu: () => void;
  setSelectedMenu: (menu: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar, crmOpen, toggleCrmMenu, setSelectedMenu }) => {
  return (
    <Drawer
      variant="permanent"
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      anchor="left"
    >
      <div className="sidebar-content">
        <Button onClick={toggleSidebar}>
          <FontAwesomeIcon icon={collapsed ? faArrowRight : faArrowLeft} />
        </Button>
        <List>
          <ListItem button onClick={() => setSelectedMenu('dashboard')}>
            <ListItemIcon><FontAwesomeIcon icon={faTachometerAlt} /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={toggleCrmMenu}>
            <ListItemIcon><FontAwesomeIcon icon={faUsers} /></ListItemIcon>
            <ListItemText primary="CRM" />
            <FontAwesomeIcon icon={crmOpen ? faChevronUp : faChevronDown} />
          </ListItem>
          {crmOpen && (
            <Box ml={4}>
              <ListItem button onClick={() => setSelectedMenu('leads')}>
                <ListItemText primary="Leads" />
              </ListItem>
              <ListItem button onClick={() => setSelectedMenu('contacts')}>
                <ListItemText primary="Contacts" />
              </ListItem>
              <ListItem button onClick={() => setSelectedMenu('accounts')}>
                <ListItemText primary="Accounts" />
              </ListItem>
              <ListItem button onClick={() => setSelectedMenu('tasks')}>
                <ListItemText primary="Tasks" />
              </ListItem>
              <ListItem button onClick={() => setSelectedMenu('deals')}>
                <ListItemText primary="Deals" />
              </ListItem>
              <ListItem button onClick={() => setSelectedMenu('meetings')}>
                <ListItemText primary="Meetings" />
              </ListItem>
              <ListItem button onClick={() => setSelectedMenu('tickets')}>
                <ListItemText primary="Tickets" />
              </ListItem>
            </Box>
          )}
          <ListItem button>
            <ListItemIcon><FontAwesomeIcon icon={faBullhorn} /></ListItemIcon>
            <ListItemText primary="Marketing" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
