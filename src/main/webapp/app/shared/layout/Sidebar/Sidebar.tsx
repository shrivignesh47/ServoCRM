// import React from 'react';
// import { Nav } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faArrowRight, faTachometerAlt, faUsers, faBullhorn, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
// import './sidebar.scss'; 

// interface SidebarProps {
//   collapsed: boolean;
//   toggleSidebar: () => void;
//   crmOpen: boolean;
//   toggleCrmMenu: () => void;
//   setSelectedMenu: (menu: string) => void;
//   ExcelOpen:boolean;
//   toggleExcelMenu: () => void;
//   setSelectedMenuExcel: (menu: string) => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar, crmOpen, toggleCrmMenu, setSelectedMenu  , ExcelOpen, toggleExcelMenu,  setSelectedMenuExcel}) => {
//   return (
//     <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
//       <button className="btn btn-dark toggle-sidebar-btn" onClick={toggleSidebar}>
//         <FontAwesomeIcon icon={collapsed ? faArrowRight : faArrowLeft} />
//       </button>
//       <Nav className="flex-column">
//         <Nav.Link onClick={() => setSelectedMenu('dashboard')} className="nav-item">
//           <FontAwesomeIcon icon={faTachometerAlt} />
//           <span className="nav-text">Dashboard</span>
//         </Nav.Link>
//         <Nav.Link onClick={toggleCrmMenu} className="nav-item">
//           <FontAwesomeIcon icon={faUsers} />
//           <span className="nav-text">CRM</span>
//           <FontAwesomeIcon style={{marginLeft:'1vh'}} icon={crmOpen ? faChevronUp : faChevronDown} />
//         </Nav.Link>
//         {crmOpen && (
//           <Nav className="crm-submenu">
//             <Nav.Link onClick={() => setSelectedMenu('leads')} className="submenu-item">
//               <FontAwesomeIcon icon={faTachometerAlt} />
//               <span className="nav-text">Leads</span>
//             </Nav.Link>
//             <Nav.Link onClick={() => setSelectedMenu('contacts')} className="submenu-item">
//               <FontAwesomeIcon icon={faUsers} />
//               <span className="nav-text">Contacts</span>
//             </Nav.Link>
//             <Nav.Link onClick={() => setSelectedMenu('accounts')} className="submenu-item">
//               <FontAwesomeIcon icon={faBullhorn} />
//               <span className="nav-text">Accounts</span>
//             </Nav.Link>
//             <Nav.Link onClick={() => setSelectedMenu('tasks')} className="submenu-item">
//               <FontAwesomeIcon icon={faTachometerAlt} />
//               <span className="nav-text">Tasks</span>
//             </Nav.Link>
//             <Nav.Link onClick={() => setSelectedMenu('deals')} className="submenu-item">
//               <FontAwesomeIcon icon={faBullhorn} />
//               <span className="nav-text">Deals</span>
//             </Nav.Link>
//             <Nav.Link onClick={() => setSelectedMenu('meetings')} className="submenu-item">
//               <FontAwesomeIcon icon={faUsers} />
//               <span className="nav-text">Meetings</span>
//             </Nav.Link>
//             <Nav.Link onClick={() => setSelectedMenu('tickets')} className="submenu-item">
//               <FontAwesomeIcon icon={faTachometerAlt} />
//               <span className="nav-text">Tickets</span>
//             </Nav.Link>
//           </Nav>
//         )}

// <Nav.Link onClick={toggleExcelMenu} className="nav-item">
//           <FontAwesomeIcon icon={faUsers} />
//           <span className="nav-text">Excel</span>
//           <FontAwesomeIcon style={{marginLeft:'1vh'}} icon={ExcelOpen ? faChevronUp : faChevronDown} />
//         </Nav.Link>
//         {ExcelOpen && (
//           <Nav className='crm-submenu'>
//         <Nav.Link onClick={() => setSelectedMenuExcel('Marketing')} className="submenu-item">
//           <FontAwesomeIcon icon={faBullhorn} />
//           <span className="nav-text">Marketing</span>
//         </Nav.Link>
//       </Nav>
//         )}
//     </div>
//   );
// };

// export default Sidebar;
import React from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faTachometerAlt,
  faUsers,
  faBullhorn,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import './sidebar.scss';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
  crmOpen: boolean;
  toggleCrmMenu: () => void;
  setSelectedMenu: (menu: string) => void;
  ExcelOpen: boolean;
  toggleExcelMenu: () => void;
  setSelectedMenuExcel: (menu: string) => void;
  MarketingOpen:boolean;
  toggleMarketingMenu:() => void;
  setSelectedMenuMarketing : (menu: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  toggleSidebar,
  crmOpen,
  toggleCrmMenu,
  setSelectedMenu,
  ExcelOpen,
  toggleExcelMenu,
  MarketingOpen,
  toggleMarketingMenu
}) => {
  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button className="btn btn-dark toggle-sidebar-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={collapsed ? faArrowRight : faArrowLeft} />
      </button>
      <Nav className="flex-column">
        <Nav.Link onClick={() => setSelectedMenu('dashboard')} className="nav-item">
          <FontAwesomeIcon icon={faTachometerAlt} />
          <span className="nav-text">Dashboard</span>
        </Nav.Link>
        <Nav.Link onClick={toggleCrmMenu} className="nav-item">
          <FontAwesomeIcon icon={faUsers} />
          <span className="nav-text">CRM</span>
          <FontAwesomeIcon style={{ marginLeft: '1vh' }} icon={crmOpen ? faChevronUp : faChevronDown} />
        </Nav.Link>
        {crmOpen && (
          <Nav className="crm-submenu">
            <Nav.Link onClick={() => setSelectedMenu('leads')} className="submenu-item">
              <FontAwesomeIcon icon={faTachometerAlt} />
              <span className="nav-text">Leads</span>
            </Nav.Link>
            <Nav.Link onClick={() => setSelectedMenu('contacts')} className="submenu-item">
              <FontAwesomeIcon icon={faUsers} />
              <span className="nav-text">Contacts</span>
            </Nav.Link>
            <Nav.Link onClick={() => setSelectedMenu('accounts')} className="submenu-item">
              <FontAwesomeIcon icon={faBullhorn} />
              <span className="nav-text">Accounts</span>
            </Nav.Link>
            <Nav.Link onClick={() => setSelectedMenu('tasks')} className="submenu-item">
              <FontAwesomeIcon icon={faTachometerAlt} />
              <span className="nav-text">Tasks</span>
            </Nav.Link>
            <Nav.Link onClick={() => setSelectedMenu('deals')} className="submenu-item">
              <FontAwesomeIcon icon={faBullhorn} />
              <span className="nav-text">Deals</span>
            </Nav.Link>
            <Nav.Link onClick={() => setSelectedMenu('meetings')} className="submenu-item">
              <FontAwesomeIcon icon={faUsers} />
              <span className="nav-text">Meetings</span>
            </Nav.Link>
            <Nav.Link onClick={() => setSelectedMenu('tickets')} className="submenu-item">
              <FontAwesomeIcon icon={faTachometerAlt} />
              <span className="nav-text">Tickets</span>
            </Nav.Link>
          </Nav>
        )}
        <Nav.Link onClick={toggleExcelMenu} className="nav-item">
          <FontAwesomeIcon icon={faUsers} />
          <span className="nav-text">Excel</span>
          <FontAwesomeIcon style={{ marginLeft: '1vh' }} icon={ExcelOpen ? faChevronUp : faChevronDown} />
        </Nav.Link>
        {ExcelOpen && (
          <Nav className="excel-submenu"> {/* Updated to excel-submenu */}
            <Nav.Link onClick={() => setSelectedMenu('Excel')} className="submenu-item">
              <FontAwesomeIcon icon={faBullhorn} />
              <span className="nav-text">Excel To Dashboard</span>
            </Nav.Link>
            <Nav.Link onClick={() => setSelectedMenu('PowerBI')} className="submenu-item">
              <FontAwesomeIcon icon={faBullhorn} />
              <span className="nav-text">PowerBI</span>
            </Nav.Link>
          </Nav>
        )}
             <Nav.Link onClick={toggleMarketingMenu} className="nav-item">
          <FontAwesomeIcon icon={faUsers} />
          <span className="nav-text">Maketing</span>
          <FontAwesomeIcon style={{ marginLeft: '1vh' }} icon={ExcelOpen ? faChevronUp : faChevronDown} />
        </Nav.Link>
        { MarketingOpen  && (
          <Nav className="excel-submenu"> {/* Updated to excel-submenu */}
            <Nav.Link onClick={() => setSelectedMenu('EmailMarketing')} className="submenu-item">
              <FontAwesomeIcon icon={faBullhorn} />
              <span className="nav-text">Email Marketing</span>
            </Nav.Link>
            <Nav.Link onClick={() => setSelectedMenu('PowerBI')} className="submenu-item">
              <FontAwesomeIcon icon={faBullhorn} />
              <span className="nav-text">Whatsapp Marketing</span>
            </Nav.Link>
          </Nav>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;
