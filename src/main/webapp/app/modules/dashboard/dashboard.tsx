// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, CardBody, CardTitle, CardText, Spinner, Alert, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import './dashboard.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

// const Dashboard = () => {
//   const [leads, setLeads] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [accounts, setAccounts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [modal, setModal] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);

//   const totalLeads = leads.length;
//   const newLeadsCount = leads.filter(lead => lead.lead_status === 'New').length;
//   const closedLeadsCount = leads.filter(lead => lead.lead_status === 'Closed').length;
//   const totalContacts = contacts.length;
//   const totalAccounts = accounts.length;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [leadsResponse, contactsResponse, accountsResponse] = await Promise.all([
//           axios.get('/api/leads'),
//           axios.get('/api/contacts'),
//           axios.get('/api/accounts'),
//         ]);
//         setLeads(leadsResponse.data);
//         setContacts(contactsResponse.data);
//         setAccounts(accountsResponse.data);
//       } catch (err) {
//         setError('Error fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const toggleModal = (item) => {
//     setSelectedItem(item);
//     setModal(!modal);
//   };

//   const renderModalContent = (item) => {
//     if (!item) return null;

//     return Object.keys(item).map(key => {
//       const value = item[key];
//       return (
//         <p key={key}><strong>{key.replace(/_/g, ' ')}:</strong> {typeof value === 'object' ? '[Object]' : value}</p>
//       );
//     });
//   };

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <div className={`dashboard-container ${collapsed ? 'collapsed' : ''}`}>
//       <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
//         <Button className="toggle-sidebar-btn" onClick={toggleSidebar}>
//           <FontAwesomeIcon icon={collapsed ? faArrowRight : faArrowLeft} />
//         </Button>
//         <h2>CRM Dashboard</h2>
//         <ul>
//           <li><a href="#leads">Leads</a></li>
//           <li><a href="#contacts">Contacts</a></li>
//           <li><a href="#accounts">Accounts</a></li>
//         </ul>
//       </div>

//       <div className="content">
//         <h1>User Dashboard</h1>
//         <p>Welcome to your dashboard</p>

//         <Row className="card-container">
//           <Col md="3">
//             <Card>
//               <CardBody>
//                 <CardTitle tag="h5">Total Leads</CardTitle>
//                 <CardText>{totalLeads}</CardText>
//               </CardBody>
//             </Card>
//           </Col>
//           <Col md="3">
//             <Card>
//               <CardBody>
//                 <CardTitle tag="h5">New Leads</CardTitle>
//                 <CardText>{newLeadsCount}</CardText>
//               </CardBody>
//             </Card>
//           </Col>
//           <Col md="3">
//             <Card>
//               <CardBody>
//                 <CardTitle tag="h5">Closed Leads</CardTitle>
//                 <CardText>{closedLeadsCount}</CardText>
//               </CardBody>
//             </Card>
//           </Col>
//           <Col md="3">
//             <Card>
//               <CardBody>
//                 <CardTitle tag="h5">Total Contacts</CardTitle>
//                 <CardText>{totalContacts}</CardText>
//               </CardBody>
//             </Card>
//           </Col>
//           <Col md="3">
//             <Card>
//               <CardBody>
//                 <CardTitle tag="h5">Total Accounts</CardTitle>
//                 <CardText>{totalAccounts}</CardText>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>

//         <h2 id="leads">Leads</h2>

//         {loading && <Spinner color="primary" />}
//         {error && <Alert color="danger">{error}</Alert>}
//         {leads.length > 0 ? (
//           <Row className="data-grid">
//             {leads.map((lead) => (
//               <Col md="6" lg="4" key={lead.id} className="mb-4">
//                 <Card className="data-card">
//                   <CardBody>
//                     <CardTitle tag="h5">{lead.first_name} {lead.last_name}</CardTitle>
//                     <CardText><strong>Company:</strong> {lead.company}</CardText>
//                     <CardText><strong>Website:</strong> {lead.website}</CardText>
//                     <CardText><strong>Email:</strong> {lead.email}</CardText>
//                     <CardText><strong>Source:</strong> {lead.lead_source}</CardText>
//                     <Button color="primary" size="sm" onClick={() => toggleModal(lead)}>View More</Button>
//                   </CardBody>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         ) : (
//           !loading && <p>No leads available.</p>
//         )}

//         <h2 id="contacts">Contacts</h2>
//         {contacts.length > 0 ? (
//           <Row className="data-grid">
//             {contacts.map((contact) => (
//               <Col md="6" lg="4" key={contact.id} className="mb-4">
//                 <Card className="data-card">
//                   <CardBody>
//                     <CardTitle tag="h5">{contact.first_name} {contact.last_name}</CardTitle>
//                     <CardText><strong>Phone:</strong> {contact.phone}</CardText>
//                     <CardText><strong>Email:</strong> {contact.email}</CardText>
//                     <Button color="primary" size="sm" onClick={() => toggleModal(contact)}>View More</Button>
//                   </CardBody>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         ) : (
//           !loading && <p>No contacts available.</p>
//         )}

//         <h2 id="accounts">Accounts</h2>
//         {accounts.length > 0 ? (
//           <Row className="data-grid">
//             {accounts.map((account) => (
//               <Col md="6" lg="4" key={account.id} className="mb-4">
//                 <Card className="data-card">
//                   <CardBody>
//                     <CardTitle tag="h5">{account.account_name}</CardTitle>
//                     <CardText><strong>Phone:</strong> {account.phone}</CardText>
//                     <CardText><strong>Email:</strong> {account.email}</CardText>
//                     <CardText><strong>Website:</strong> {account.website}</CardText>
//                     <Button color="primary" size="sm" onClick={() => toggleModal(account)}>View More</Button>
//                   </CardBody>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         ) : (
//           !loading && <p>No accounts available.</p>
//         )}

//         {selectedItem && (
//           <Modal isOpen={modal} toggle={toggleModal}>
//             <ModalHeader toggle={toggleModal}>Details</ModalHeader>
//             <ModalBody>
//               {renderModalContent(selectedItem)}
//             </ModalBody>
//             <ModalFooter>
//               <Button color="secondary" onClick={toggleModal}>Close</Button>
//             </ModalFooter>
//           </Modal>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Button, ListGroup, Card, Spinner, Alert, Table, ProgressBar } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faArrowRight, faCalendarAlt, faHandshake, faTachometerAlt, faTasks, faTicketAlt, faUsers, faBox, faBullhorn } from '@fortawesome/free-solid-svg-icons';

// const Dashboard = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [selectedMenu, setSelectedMenu] = useState('dashboard');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [leads, setLeads] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [accounts, setAccounts] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [deals, setDeals] = useState([]);
//   const [meetings, setMeetings] = useState([]);
//   const [tickets, setTickets] = useState([]);

//   useEffect(() => {
//     // Fetch data for each section here
//   }, []);

//   const toggleSidebar = () => setCollapsed(!collapsed);

//   const renderContent = () => {
//     switch (selectedMenu) {
//       case 'dashboard':
//         return renderDashboard();
//       case 'leads':
//         return renderLeads();
//       case 'contacts':
//         return renderContacts();
//       case 'tasks':
//         return renderTasks();
//       case 'deals':
//         return renderDeals();
//       case 'meetings':
//         return renderMeetings();
//       case 'tickets':
//         return renderTickets();
//       case 'accounts':
//         return renderAccounts();
//       default:
//         return renderDashboard();
//     }
//   };

//   const renderDashboard = () => (
//     <Container className="content">
//       <h4>Dashboard</h4>
//       {loading && <Spinner animation="border" />}
//       {error && <Alert variant="danger">{error}</Alert>}
//       <Row>
//         <Col md={6}>
//           <Card>
//             <Card.Body>
//               <Card.Title>Leads</Card.Title>
//               <Table striped bordered hover>
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Value</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {leads.map((lead, index) => (
//                     <tr key={index}>
//                       <td>{lead.name}</td>
//                       <td>{lead.value}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={6}>
//           <Card>
//             <Card.Body>
//               <Card.Title>Contacts</Card.Title>
//               <Table striped bordered hover>
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Value</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {contacts.map((contact, index) => (
//                     <tr key={index}>
//                       <td>{contact.name}</td>
//                       <td>{contact.value}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );

//   const renderLeads = () => (
//     <Container className="content">
//       <h4>Leads</h4>
//       {loading && <Spinner animation="border" />}
//       {error && <Alert variant="danger">{error}</Alert>}
//       {leads.length > 0 ? (
//         <Row>
//           {leads.map((lead) => (
//             <Col md={6} lg={4} key={lead.id}>
//               <Card>
//                 <Card.Body>
//                   <Card.Title>{lead.lead_name}</Card.Title>
//                   <Card.Text><strong>Status:</strong> {lead.status}</Card.Text>
//                   <Card.Text><strong>Contact:</strong> {lead.contact}</Card.Text>
//                   <Button variant="primary" size="sm">View More</Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       ) : (
//         !loading && <p>No leads available.</p>
//       )}
//     </Container>
//   );

//   const renderContacts = () => (
//     <Container className="content">
//       <h4>Contacts</h4>
//       {loading && <Spinner animation="border" />}
//       {error && <Alert variant="danger">{error}</Alert>}
//       {contacts.length > 0 ? (
//         <Row>
//           {contacts.map((contact) => (
//             <Col md={6} lg={4} key={contact.id}>
//               <Card>
//                 <Card.Body>
//                   <Card.Title>{contact.contact_name}</Card.Title>
//                   <Card.Text><strong>Phone:</strong> {contact.phone}</Card.Text>
//                   <Card.Text><strong>Email:</strong> {contact.email}</Card.Text>
//                   <Button variant="primary" size="sm">View More</Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       ) : (
//         !loading && <p>No contacts available.</p>
//       )}
//     </Container>
//   );

//   const renderAccounts = () => (
//     <Container className="content">
//       <h4>Accounts</h4>
//       {loading && <Spinner animation="border" />}
//       {error && <Alert variant="danger">{error}</Alert>}
//       {accounts.length > 0 ? (
//         <Row>
//           {accounts.map((account) => (
//             <Col md={6} lg={4} key={account.id}>
//               <Card>
//                 <Card.Body>
//                   <Card.Title>{account.account_name}</Card.Title>
//                   <Card.Text><strong>Phone:</strong> {account.phone}</Card.Text>
//                   <Card.Text><strong>Email:</strong> {account.email}</Card.Text>
//                   <Card.Text><strong>Website:</strong> {account.website}</Card.Text>
//                   <Button variant="primary" size="sm">View More</Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       ) : (
//         !loading && <p>No accounts available.</p>
//       )}
//     </Container>
//   );

//   const renderTasks = () => (
//     <Container className="content">
//       <h4>Tasks</h4>
//       {loading && <Spinner animation="border" />}
//       {error && <Alert variant="danger">{error}</Alert>}
//       {tasks.length > 0 ? (
//         <Row>
//           {tasks.map((task) => (
//             <Col md={6} lg={4} key={task.id}>
//               <Card>
//                 <Card.Body>
//                   <Card.Title>{task.task_name}</Card.Title>
//                   <Card.Text><strong>Status:</strong> {task.status}</Card.Text>
//                   <Card.Text><strong>Due Date:</strong> {task.due_date}</Card.Text>
//                   <Button variant="primary" size="sm">View More</Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       ) : (
//         !loading && <p>No tasks available.</p>
//       )}
//     </Container>
//   );

//   const renderDeals = () => (
//     <Container className="content">
//       <h4>Deals</h4>
//       {loading && <Spinner animation="border" />}
//       {error && <Alert variant="danger">{error}</Alert>}
//       {deals.length > 0 ? (
//         <Row>
//           {deals.map((deal) => (
//             <Col md={6} lg={4} key={deal.id}>
//               <Card>
//                 <Card.Body>
//                   <Card.Title>{deal.deal_name}</Card.Title>
//                   <Card.Text><strong>Value:</strong> {deal.value}</Card.Text>
//                   <Card.Text><strong>Status:</strong> {deal.status}</Card.Text>
//                   <Button variant="primary" size="sm">View More</Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       ) : (
//         !loading && <p>No deals available.</p>
//       )}
//     </Container>
//   );

//   const renderMeetings = () => (
//     <Container className="content">
//       <h4>Meetings</h4>
//       {loading && <Spinner animation="border" />}
//       {error && <Alert variant="danger">{error}</Alert>}
//       {meetings.length > 0 ? (
//         <Row>
//           {meetings.map((meeting) => (
//             <Col md={6} lg={4} key={meeting.id}>
//               <Card>
//                 <Card.Body>
//                   <Card.Title>{meeting.meeting_name}</Card.Title>
//                   <Card.Text><strong>Date:</strong> {meeting.date}</Card.Text>
//                   <Card.Text><strong>Participants:</strong> {meeting.participants}</Card.Text>
//                   <Button variant="primary" size="sm">View More</Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       ) : (
//         !loading && <p>No meetings available.</p>
//       )}
//     </Container>
//   );

//   const renderTickets = () => (
//     <Container className="content">
//       <h4>Tickets</h4>
//       {loading && <Spinner animation="border" />}
//       {error && <Alert variant="danger">{error}</Alert>}
//       {tickets.length > 0 ? (
//         <Row>
//           {tickets.map((ticket) => (
//             <Col md={6} lg={4} key={ticket.id}>
//               <Card>
//                 <Card.Body>
//                   <Card.Title>{ticket.ticket_name}</Card.Title>
//                   <Card.Text><strong>Status:</strong> {ticket.status}</Card.Text>
//                   <Card.Text><strong>Priority:</strong> {ticket.priority}</Card.Text>
//                   <Button variant="primary" size="sm">View More</Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       ) : (
//         !loading && <p>No tickets available.</p>
//       )}
//     </Container>
//   );

//   return (
//     <div className="app d-flex">
//       <div className={`bg-light border ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
//         <ListGroup>
//           <ListGroup.Item action onClick={toggleSidebar}>
//             <FontAwesomeIcon icon={collapsed ? faArrowRight : faArrowLeft} /> {collapsed ? '' : 'Collapse'}
//           </ListGroup.Item>
//           <ListGroup.Item action active={selectedMenu === 'dashboard'} onClick={() => setSelectedMenu('dashboard')}>
//             <FontAwesomeIcon icon={faTachometerAlt} /> {collapsed ? '' : 'Dashboard'}
//           </ListGroup.Item>
//           <ListGroup.Item action active={selectedMenu === 'leads'} onClick={() => setSelectedMenu('leads')}>
//             <FontAwesomeIcon icon={faUsers} /> {collapsed ? '' : 'Leads'}
//           </ListGroup.Item>
//           <ListGroup.Item action active={selectedMenu === 'contacts'} onClick={() => setSelectedMenu('contacts')}>
//             <FontAwesomeIcon icon={faHandshake} /> {collapsed ? '' : 'Contacts'}
//           </ListGroup.Item>
//           <ListGroup.Item action active={selectedMenu === 'accounts'} onClick={() => setSelectedMenu('accounts')}>
//             <FontAwesomeIcon icon={faBox} /> {collapsed ? '' : 'Accounts'}
//           </ListGroup.Item>
//           <ListGroup.Item action active={selectedMenu === 'tasks'} onClick={() => setSelectedMenu('tasks')}>
//             <FontAwesomeIcon icon={faTasks} /> {collapsed ? '' : 'Tasks'}
//           </ListGroup.Item>
//           <ListGroup.Item action active={selectedMenu === 'deals'} onClick={() => setSelectedMenu('deals')}>
//             <FontAwesomeIcon icon={faHandshake} /> {collapsed ? '' : 'Deals'}
//           </ListGroup.Item>
//           <ListGroup.Item action active={selectedMenu === 'meetings'} onClick={() => setSelectedMenu('meetings')}>
//             <FontAwesomeIcon icon={faCalendarAlt} /> {collapsed ? '' : 'Meetings'}
//           </ListGroup.Item>
//           <ListGroup.Item action active={selectedMenu === 'tickets'} onClick={() => setSelectedMenu('tickets')}>
//             <FontAwesomeIcon icon={faTicketAlt} /> {collapsed ? '' : 'Tickets'}
//           </ListGroup.Item>
//         </ListGroup>
//       </div>
//       <main className="content flex-grow-1 p-3">
//         {renderContent()}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, CardContent, Typography, CircularProgress, Alert, Grid, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faArrowRight, faTachometerAlt, faUsers, faTasks, faHandshake, faCalendarAlt, faTicketAlt, faBox, faBullhorn } from '@fortawesome/free-solid-svg-icons';
// import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
// import './dashboard.scss';

// const Dashboard = () => {
//   const [leads, setLeads] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [accounts, setAccounts] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [deals, setDeals] = useState([]);
//   const [meetings, setMeetings] = useState([]);
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedMenu, setSelectedMenu] = useState('dashboard');
//   const [collapsed, setCollapsed] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [leadsResponse, contactsResponse, accountsResponse, tasksResponse, dealsResponse, meetingsResponse, ticketsResponse] = await Promise.all([
//           axios.get('/api/leads'),
//           axios.get('/api/contacts'),
//           axios.get('/api/accounts'),
//           axios.get('/api/tasks'),
//           axios.get('/api/deals'),
//           axios.get('/api/meetings'),
//           axios.get('/api/tickets'),
//         ]);
//         setLeads(leadsResponse.data);
//         setContacts(contactsResponse.data);
//         setAccounts(accountsResponse.data);
//         setTasks(tasksResponse.data);
//         setDeals(dealsResponse.data);
//         setMeetings(meetingsResponse.data);
//         setTickets(ticketsResponse.data);
//       } catch (err) {
//         setError('Error fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };

//   const renderContent = () => {
//     switch (selectedMenu) {
//       case 'dashboard':
//         return renderDashboard();
//       case 'leads':
//         return renderLeads();
//       case 'contacts':
//         return renderContacts();
//       case 'accounts':
//         return renderAccounts();
//       case 'tasks':
//         return renderTasks();
//       case 'deals':
//         return renderDeals();
//       case 'meetings':
//         return renderMeetings();
//       case 'tickets':
//         return renderTickets();
//       default:
//         return renderDashboard();
//     }
//   };

//   const renderDashboard = () => {
//     const totalLeads = leads.length;
//     const newLeadsCount = leads.filter(lead => lead.lead_status === 'New').length;
//     const closedLeadsCount = leads.filter(lead => lead.lead_status === 'Closed').length;
//     const totalContacts = contacts.length;
//     const totalAccounts = accounts.length;

//     const pieData = [
//       { name: 'Leads', value: totalLeads },
//       { name: 'Contacts', value: totalContacts },
//       { name: 'Accounts', value: totalAccounts },
//     ];

//     const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

//     const barData = [
//       { name: 'New Leads', count: newLeadsCount },
//       { name: 'Closed Leads', count: closedLeadsCount },
//       { name: 'Total Contacts', count: totalContacts },
//       { name: 'Total Accounts', count: totalAccounts },
//     ];

//     return (
//       <div className="content">
//         <Typography variant="h4">Dashboard</Typography>
//         <p>Welcome to your dashboard</p>

//         {loading && <CircularProgress />}
//         {error && <Alert severity="error">{error}</Alert>}

//         {!loading && (
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6">Overview</Typography>
//                   <PieChart width={400} height={400}>
//                     <Pie
//                       data={pieData}
//                       cx={200}
//                       cy={200}
//                       labelLine={false}
//                       label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="value"
//                     >
//                       {pieData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </CardContent>
//               </Card>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6">Lead Status</Typography>
//                   <BarChart
//                     width={500}
//                     height={300}
//                     data={barData}
//                     margin={{
//                       top: 5, right: 30, left: 20, bottom: 5,
//                     }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="count" fill="#8884d8" />
//                   </BarChart>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         )}
//       </div>
//     );
//   };

//   const renderLeads = () => (
//     <div className="content">
//       <Typography variant="h4">Leads</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {leads.length > 0 ? (
//         <Grid container spacing={3}>
//           {leads.map((lead) => (
//             <Grid item xs={12} md={6} lg={4} key={lead.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{lead.first_name} {lead.last_name}</Typography>
//                   <Typography variant="body2"><strong>Company:</strong> {lead.company}</Typography>
//                   <Typography variant="body2"><strong>Website:</strong> {lead.website}</Typography>
//                   <Typography variant="body2"><strong>Email:</strong> {lead.email}</Typography>
//                   <Typography variant="body2"><strong>Source:</strong> {lead.lead_source}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No leads available.</p>
//       )}
//     </div>
//   );

//   const renderContacts = () => (
//     <div className="content">
//       <Typography variant="h4">Contacts</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {contacts.length > 0 ? (
//         <Grid container spacing={3}>
//           {contacts.map((contact) => (
//             <Grid item xs={12} md={6} lg={4} key={contact.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{contact.first_name} {contact.last_name}</Typography>
//                   <Typography variant="body2"><strong>Phone:</strong> {contact.phone}</Typography>
//                   <Typography variant="body2"><strong>Email:</strong> {contact.email}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No contacts available.</p>
//       )}
//     </div>
//   );

//   const renderAccounts = () => (
//     <div className="content">
//       <Typography variant="h4">Accounts</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {accounts.length > 0 ? (
//         <Grid container spacing={3}>
//           {accounts.map((account) => (
//             <Grid item xs={12} md={6} lg={4} key={account.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{account.account_name}</Typography>
//                   <Typography variant="body2"><strong>Phone:</strong> {account.phone}</Typography>
//                   <Typography variant="body2"><strong>Email:</strong> {account.email}</Typography>
//                   <Typography variant="body2"><strong>Website:</strong> {account.website}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No accounts available.</p>
//       )}
//     </div>
//   );

//   const renderTasks = () => (
//     <div className="content">
//       <Typography variant="h4">Tasks</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {tasks.length > 0 ? (
//         <Grid container spacing={3}>
//           {tasks.map((task) => (
//             <Grid item xs={12} md={6} lg={4} key={task.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{task.task_name}</Typography>
//                   <Typography variant="body2"><strong>Status:</strong> {task.status}</Typography>
//                   <Typography variant="body2"><strong>Due Date:</strong> {task.due_date}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No tasks available.</p>
//       )}
//     </div>
//   );

//   const renderDeals = () => (
//     <div className="content">
//       <Typography variant="h4">Deals</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {deals.length > 0 ? (
//         <Grid container spacing={3}>
//           {deals.map((deal) => (
//             <Grid item xs={12} md={6} lg={4} key={deal.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{deal.deal_name}</Typography>
//                   <Typography variant="body2"><strong>Status:</strong> {deal.status}</Typography>
//                   <Typography variant="body2"><strong>Close Date:</strong> {deal.close_date}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No deals available.</p>
//       )}
//     </div>
//   );

//   const renderMeetings = () => (
//     <div className="content">
//       <Typography variant="h4">Meetings</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {meetings.length > 0 ? (
//         <Grid container spacing={3}>
//           {meetings.map((meeting) => (
//             <Grid item xs={12} md={6} lg={4} key={meeting.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{meeting.meeting_name}</Typography>
//                   <Typography variant="body2"><strong>Date:</strong> {meeting.date}</Typography>
//                   <Typography variant="body2"><strong>Time:</strong> {meeting.time}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No meetings available.</p>
//       )}
//     </div>
//   );

//   const renderTickets = () => (
//     <div className="content">
//       <Typography variant="h4">Tickets</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {tickets.length > 0 ? (
//         <Grid container spacing={3}>
//           {tickets.map((ticket) => (
//             <Grid item xs={12} md={6} lg={4} key={ticket.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{ticket.ticket_name}</Typography>
//                   <Typography variant="body2"><strong>Status:</strong> {ticket.status}</Typography>
//                   <Typography variant="body2"><strong>Priority:</strong> {ticket.priority}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No tickets available.</p>
//       )}
//     </div>
//   );

//   const menuItems = [
//     { text: 'Dashboard', icon: faTachometerAlt, value: 'dashboard' },
//     { text: 'Leads', icon: faUsers, value: 'leads' },
//     { text: 'Contacts', icon: faUsers, value: 'contacts' },
//     { text: 'Tasks', icon: faTasks, value: 'tasks' },
//     { text: 'Deals', icon: faHandshake, value: 'deals' },
//     { text: 'Meetings', icon: faCalendarAlt, value: 'meetings' },
//     { text: 'Tickets', icon: faTicketAlt, value: 'tickets' },
//     { text: 'Accounts', icon: faBox, value: 'accounts' },
//     { text: 'Marketing', icon: faBullhorn, value: 'marketing' },
//   ];

//   return (
//     <div className="dashboard-container">
//       <Drawer variant="permanent" open={!collapsed}>
//         <Box className="sidebar">
//           <Button className="toggle-sidebar-btn" onClick={toggleSidebar}>
//             <FontAwesomeIcon icon={collapsed ? faArrowRight : faArrowLeft} />
//           </Button>
//           <List>
//             {menuItems.map((item) => (
//               <ListItem button key={item.text} onClick={() => setSelectedMenu(item.value)}>
//                 <ListItemIcon>
//                   <FontAwesomeIcon icon={item.icon} />
//                 </ListItemIcon>
//                 <ListItemText primary={item.text} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>

//       <main className={`content ${collapsed ? 'collapsed' : ''}`}>
//         {renderContent()}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, CardContent, Typography, CircularProgress, Alert, Grid, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faArrowRight, faTachometerAlt, faUsers, faTasks, faHandshake, faCalendarAlt, faTicketAlt, faBox, faBullhorn } from '@fortawesome/free-solid-svg-icons';
// import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
// import './dashboard.scss';

// const Dashboard = () => {
//   const [leads, setLeads] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [accounts, setAccounts] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [deals, setDeals] = useState([]);
//   const [meetings, setMeetings] = useState([]);
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedMenu, setSelectedMenu] = useState('dashboard');
//   const [collapsed, setCollapsed] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [leadsResponse, contactsResponse, accountsResponse, tasksResponse, dealsResponse, meetingsResponse, ticketsResponse] = await Promise.all([
//           axios.get('/api/leads'),
//           axios.get('/api/contacts'),
//           axios.get('/api/accounts'),
//           axios.get('/api/tasks'),
//           axios.get('/api/deals'),
//           axios.get('/api/meetings'),
//           axios.get('/api/tickets'),
//         ]);
//         setLeads(leadsResponse.data);
//         setContacts(contactsResponse.data);
//         setAccounts(accountsResponse.data);
//         setTasks(tasksResponse.data);
//         setDeals(dealsResponse.data);
//         setMeetings(meetingsResponse.data);
//         setTickets(ticketsResponse.data);
//       } catch (err) {
//         setError('Error fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };

//   const renderContent = () => {
//     switch (selectedMenu) {
//       case 'dashboard':
//         return renderDashboard();
//       case 'leads':
//         return renderLeads();
//       case 'contacts':
//         return renderContacts();
//       case 'accounts':
//         return renderAccounts();
//       case 'tasks':
//         return renderTasks();
//       case 'deals':
//         return renderDeals();
//       case 'meetings':
//         return renderMeetings();
//       case 'tickets':
//         return renderTickets();
//       default:
//         return renderDashboard();
//     }
//   };

//   const renderDashboard = () => {
//     const totalLeads = leads.length;
//     const newLeadsCount = leads.filter(lead => lead.lead_status === 'New').length;
//     const closedLeadsCount = leads.filter(lead => lead.lead_status === 'Closed').length;
//     const totalContacts = contacts.length;
//     const totalAccounts = accounts.length;

//     const pieData = [
//       { name: 'Leads', value: totalLeads },
//       { name: 'Contacts', value: totalContacts },
//       { name: 'Accounts', value: totalAccounts },
//     ];

//     const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

//     const barData = [
//       { name: 'New Leads', count: newLeadsCount },
//       { name: 'Closed Leads', count: closedLeadsCount },
//       { name: 'Total Contacts', count: totalContacts },
//       { name: 'Total Accounts', count: totalAccounts },
//     ];

//     return (
//       <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//         <Typography variant="h4">Dashboard</Typography>
//         <p>Welcome to your dashboard</p>

//         {loading && <CircularProgress />}
//         {error && <Alert severity="error">{error}</Alert>}

//         {!loading && (
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6">Overview</Typography>
//                   <PieChart width={400} height={400}>
//                     <Pie
//                       data={pieData}
//                       cx={200}
//                       cy={200}
//                       labelLine={false}
//                       label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="value"
//                     >
//                       {pieData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </CardContent>
//               </Card>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6">Lead Status</Typography>
//                   <BarChart
//                     width={500}
//                     height={300}
//                     data={barData}
//                     margin={{
//                       top: 5, right: 30, left: 20, bottom: 5,
//                     }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="count" fill="#8884d8" />
//                   </BarChart>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         )}
//       </div>
//     );
//   };

//   const renderLeads = () => (
//     <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//       <Typography variant="h4">Leads</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {leads.length > 0 ? (
//         <Grid container spacing={3}>
//           {leads.map((lead) => (
//             <Grid item xs={12} md={6} lg={4} key={lead.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{lead.first_name} {lead.last_name}</Typography>
//                   <Typography variant="body2"><strong>Company:</strong> {lead.company}</Typography>
//                   <Typography variant="body2"><strong>Website:</strong> {lead.website}</Typography>
//                   <Typography variant="body2"><strong>Email:</strong> {lead.email}</Typography>
//                   <Typography variant="body2"><strong>Source:</strong> {lead.lead_source}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No leads available.</p>
//       )}
//     </div>
//   );

//   const renderContacts = () => (
//     <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//       <Typography variant="h4">Contacts</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {contacts.length > 0 ? (
//         <Grid container spacing={3}>
//           {contacts.map((contact) => (
//             <Grid item xs={12} md={6} lg={4} key={contact.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{contact.first_name} {contact.last_name}</Typography>
//                   <Typography variant="body2"><strong>Company:</strong> {contact.company}</Typography>
//                   <Typography variant="body2"><strong>Email:</strong> {contact.email}</Typography>
//                   <Typography variant="body2"><strong>Phone:</strong> {contact.phone}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No contacts available.</p>
//       )}
//     </div>
//   );

//   const renderAccounts = () => (
//     <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//       <Typography variant="h4">Accounts</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {accounts.length > 0 ? (
//         <Grid container spacing={3}>
//           {accounts.map((account) => (
//             <Grid item xs={12} md={6} lg={4} key={account.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{account.company}</Typography>
//                   <Typography variant="body2"><strong>Website:</strong> {account.website}</Typography>
//                   <Typography variant="body2"><strong>Email:</strong> {account.email}</Typography>
//                   <Typography variant="body2"><strong>Phone:</strong> {account.phone}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No accounts available.</p>
//       )}
//     </div>
//   );

//   const renderTasks = () => (
//     <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//       <Typography variant="h4">Tasks</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {tasks.length > 0 ? (
//         <Grid container spacing={3}>
//           {tasks.map((task) => (
//             <Grid item xs={12} md={6} lg={4} key={task.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{task.title}</Typography>
//                   <Typography variant="body2"><strong>Due Date:</strong> {task.due_date}</Typography>
//                   <Typography variant="body2"><strong>Status:</strong> {task.status}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No tasks available.</p>
//       )}
//     </div>
//   );

//   const renderDeals = () => (
//     <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//       <Typography variant="h4">Deals</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {deals.length > 0 ? (
//         <Grid container spacing={3}>
//           {deals.map((deal) => (
//             <Grid item xs={12} md={6} lg={4} key={deal.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{deal.title}</Typography>
//                   <Typography variant="body2"><strong>Amount:</strong> ${deal.amount}</Typography>
//                   <Typography variant="body2"><strong>Status:</strong> {deal.status}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No deals available.</p>
//       )}
//     </div>
//   );

//   const renderMeetings = () => (
//     <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//       <Typography variant="h4">Meetings</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {meetings.length > 0 ? (
//         <Grid container spacing={3}>
//           {meetings.map((meeting) => (
//             <Grid item xs={12} md={6} lg={4} key={meeting.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{meeting.title}</Typography>
//                   <Typography variant="body2"><strong>Date:</strong> {meeting.date}</Typography>
//                   <Typography variant="body2"><strong>Time:</strong> {meeting.time}</Typography>
//                   <Typography variant="body2"><strong>Location:</strong> {meeting.location}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No meetings available.</p>
//       )}
//     </div>
//   );

//   const renderTickets = () => (
//     <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//       <Typography variant="h4">Tickets</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {tickets.length > 0 ? (
//         <Grid container spacing={3}>
//           {tickets.map((ticket) => (
//             <Grid item xs={12} md={6} lg={4} key={ticket.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{ticket.title}</Typography>
//                   <Typography variant="body2"><strong>Issue:</strong> {ticket.issue}</Typography>
//                   <Typography variant="body2"><strong>Status:</strong> {ticket.status}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No tickets available.</p>
//       )}
//     </div>
//   );

//   return (
//     <div className="dashboard-container">
//       <Drawer
//         variant="permanent"
//         className={`sidebar ${collapsed ? 'collapsed' : ''}`}
//         anchor="left"
//       >
//         <div className="sidebar-content">
//           <Button onClick={toggleSidebar}>
//             <FontAwesomeIcon icon={collapsed ? faArrowRight : faArrowLeft} />
//           </Button>
//           <List>
//             <ListItem button onClick={() => setSelectedMenu('dashboard')}>
//               <ListItemIcon><FontAwesomeIcon icon={faTachometerAlt} /></ListItemIcon>
//               <ListItemText primary="Dashboard" />
//             </ListItem>
//             <ListItem button onClick={() => setSelectedMenu('leads')}>
//               <ListItemIcon><FontAwesomeIcon icon={faUsers} /></ListItemIcon>
//               <ListItemText primary="Leads" />
//             </ListItem>
//             <ListItem button onClick={() => setSelectedMenu('contacts')}>
//               <ListItemIcon><FontAwesomeIcon icon={faUsers} /></ListItemIcon>
//               <ListItemText primary="Contacts" />
//             </ListItem>
//             <ListItem button onClick={() => setSelectedMenu('accounts')}>
//               <ListItemIcon><FontAwesomeIcon icon={faBox} /></ListItemIcon>
//               <ListItemText primary="Accounts" />
//             </ListItem>
//             <ListItem button onClick={() => setSelectedMenu('tasks')}>
//               <ListItemIcon><FontAwesomeIcon icon={faTasks} /></ListItemIcon>
//               <ListItemText primary="Tasks" />
//             </ListItem>
//             <ListItem button onClick={() => setSelectedMenu('deals')}>
//               <ListItemIcon><FontAwesomeIcon icon={faHandshake} /></ListItemIcon>
//               <ListItemText primary="Deals" />
//             </ListItem>
//             <ListItem button onClick={() => setSelectedMenu('meetings')}>
//               <ListItemIcon><FontAwesomeIcon icon={faCalendarAlt} /></ListItemIcon>
//               <ListItemText primary="Meetings" />
//             </ListItem>
//             <ListItem button onClick={() => setSelectedMenu('tickets')}>
//               <ListItemIcon><FontAwesomeIcon icon={faTicketAlt} /></ListItemIcon>
//               <ListItemText primary="Tickets" />
//             </ListItem>
//             <ListItem button>
//               <ListItemIcon><FontAwesomeIcon icon={faBullhorn} /></ListItemIcon>
//               <ListItemText primary="Marketing" />
//             </ListItem>
//           </List>
//         </div>
//       </Drawer>
//       {renderContent()}
//     </div>
//   );
// };

// // export default Dashboard;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, CardContent, Typography, CircularProgress, Alert, Grid, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faArrowRight, faTachometerAlt, faUsers, faTasks, faHandshake, faCalendarAlt, faTicketAlt, faBox, faBullhorn, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
// import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
// import './dashboard.scss';

// const Dashboard = () => {
//   const [leads, setLeads] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [accounts, setAccounts] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [deals, setDeals] = useState([]);
//   const [meetings, setMeetings] = useState([]);
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedMenu, setSelectedMenu] = useState('dashboard');
//   const [collapsed, setCollapsed] = useState(false);
//   const [crmOpen, setCrmOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [leadsResponse, contactsResponse, accountsResponse, tasksResponse, dealsResponse, meetingsResponse, ticketsResponse] = await Promise.all([
//           axios.get('/api/leads'),
//           axios.get('/api/contacts'),
//           axios.get('/api/accounts'),
//           axios.get('/api/tasks'),
//           axios.get('/api/deals'),
//           axios.get('/api/meetings'),
//           axios.get('/api/tickets'),
//         ]);
//         setLeads(leadsResponse.data);
//         setContacts(contactsResponse.data);
//         setAccounts(accountsResponse.data);
//         setTasks(tasksResponse.data);
//         setDeals(dealsResponse.data);
//         setMeetings(meetingsResponse.data);
//         setTickets(ticketsResponse.data);
//       } catch (err) {
//         setError('Error fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };

//   const toggleCrmMenu = () => {
//     setCrmOpen(!crmOpen);
//   };

//   const renderContent = () => {
//     switch (selectedMenu) {
//       case 'dashboard':
//         return renderDashboard();
//       case 'leads':
//         return renderLeads();
//       case 'contacts':
//         return renderContacts();
//       case 'accounts':
//         return renderAccounts();
//       case 'tasks':
//         return renderTasks();
//       case 'deals':
//         return renderDeals();
//       case 'meetings':
//         return renderMeetings();
//       case 'tickets':
//         return renderTickets();
//       default:
//         return renderDashboard();
//     }
//   };

//   const renderDashboard = () => {
//     const totalLeads = leads.length;
//     const newLeadsCount = leads.filter(lead => lead.lead_status === 'New').length;
//     const closedLeadsCount = leads.filter(lead => lead.lead_status === 'Closed').length;
//     const totalContacts = contacts.length;
//     const totalAccounts = accounts.length;

//     const pieData = [
//       { name: 'Leads', value: totalLeads },
//       { name: 'Contacts', value: totalContacts },
//       { name: 'Accounts', value: totalAccounts },
//     ];

//     const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

//     const barData = [
//       { name: 'New Leads', count: newLeadsCount },
//       { name: 'Closed Leads', count: closedLeadsCount },
//       { name: 'Total Contacts', count: totalContacts },
//       { name: 'Total Accounts', count: totalAccounts },
//     ];

//     return (
//       <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//         <Typography variant="h4">Dashboard</Typography>
//         <p>Welcome to your dashboard</p>

//         {loading && <CircularProgress />}
//         {error && <Alert severity="error">{error}</Alert>}

//         {!loading && (
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6">Overview</Typography>
//                   <PieChart width={400} height={400}>
//                     <Pie
//                       data={pieData}
//                       cx={200}
//                       cy={200}
//                       labelLine={false}
//                       label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="value"
//                     >
//                       {pieData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </CardContent>
//               </Card>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6">Lead Status</Typography>
//                   <BarChart
//                     width={500}
//                     height={300}
//                     data={barData}
//                     margin={{
//                       top: 5, right: 30, left: 20, bottom: 5,
//                     }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="count" fill="#8884d8" />
//                   </BarChart>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         )}
//       </div>
//     );
//   };

//   const renderLeads = () => (
//     <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//       <Typography variant="h4">Leads</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {leads.length > 0 ? (
//         <Grid container spacing={3}>
//           {leads.map((lead) => (
//             <Grid item xs={12} md={6} lg={4} key={lead.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{lead.first_name} {lead.last_name}</Typography>
//                   <Typography variant="body2"><strong>Company:</strong> {lead.company}</Typography>
//                   <Typography variant="body2"><strong>Website:</strong> {lead.website}</Typography>
//                   <Typography variant="body2"><strong>Email:</strong> {lead.email}</Typography>
//                   <Typography variant="body2"><strong>Source:</strong> {lead.lead_source}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No leads available.</p>
//       )}
//     </div>
//   );

//   const renderContacts = () => (
//     <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//       <Typography variant="h4">Contacts</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {contacts.length > 0 ? (
//         <Grid container spacing={3}>
//           {contacts.map((contact) => (
//             <Grid item xs={12} md={6} lg={4} key={contact.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{contact.first_name} {contact.last_name}</Typography>
//                   <Typography variant="body2"><strong>Company:</strong> {contact.company}</Typography>
//                   <Typography variant="body2"><strong>Email:</strong> {contact.email}</Typography>
//                   <Typography variant="body2"><strong>Phone:</strong> {contact.phone}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No contacts available.</p>
//       )}
//     </div>
//   );

//   const renderAccounts = () => (
//     <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//       <Typography variant="h4">Accounts</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {accounts.length > 0 ? (
//         <Grid container spacing={3}>
//           {accounts.map((account) => (
//             <Grid item xs={12} md={6} lg={4} key={account.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{account.company}</Typography>
//                   <Typography variant="body2"><strong>Website:</strong> {account.website}</Typography>
//                   <Typography variant="body2"><strong>Email:</strong> {account.email}</Typography>
//                   <Typography variant="body2"><strong>Phone:</strong> {account.phone}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No accounts available.</p>
//       )}
//     </div>
//   );

//   const renderTasks = () => (
//     <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//       <Typography variant="h4">Tasks</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {tasks.length > 0 ? (
//         <Grid container spacing={3}>
//           {tasks.map((task) => (
//             <Grid item xs={12} md={6} lg={4} key={task.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{task.title}</Typography>
//                   <Typography variant="body2"><strong>Due Date:</strong> {task.due_date}</Typography>
//                   <Typography variant="body2"><strong>Status:</strong> {task.status}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No tasks available.</p>
//       )}
//     </div>
//   );

//   const renderDeals = () => (
//     <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//       <Typography variant="h4">Deals</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {deals.length > 0 ? (
//         <Grid container spacing={3}>
//           {deals.map((deal) => (
//             <Grid item xs={12} md={6} lg={4} key={deal.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{deal.title}</Typography>
//                   <Typography variant="body2"><strong>Amount:</strong> ${deal.amount}</Typography>
//                   <Typography variant="body2"><strong>Status:</strong> {deal.status}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No deals available.</p>
//       )}
//     </div>
//   );

//   const renderMeetings = () => (
//     <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//       <Typography variant="h4">Meetings</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {meetings.length > 0 ? (
//         <Grid container spacing={3}>
//           {meetings.map((meeting) => (
//             <Grid item xs={12} md={6} lg={4} key={meeting.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{meeting.title}</Typography>
//                   <Typography variant="body2"><strong>Date:</strong> {meeting.date}</Typography>
//                   <Typography variant="body2"><strong>Time:</strong> {meeting.time}</Typography>
//                   <Typography variant="body2"><strong>Location:</strong> {meeting.location}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No meetings available.</p>
//       )}
//     </div>
//   );

//   const renderTickets = () => (
//     <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//       <Typography variant="h4">Tickets</Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {tickets.length > 0 ? (
//         <Grid container spacing={3}>
//           {tickets.map((ticket) => (
//             <Grid item xs={12} md={6} lg={4} key={ticket.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{ticket.title}</Typography>
//                   <Typography variant="body2"><strong>Issue:</strong> {ticket.issue}</Typography>
//                   <Typography variant="body2"><strong>Status:</strong> {ticket.status}</Typography>
//                   <Button variant="contained" color="primary" size="small">View More</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         !loading && <p>No tickets available.</p>
//       )}
//     </div>
//   );

//   return (
//     <div className="dashboard-container">
//       <Drawer
//         variant="permanent"
//         className={`sidebar ${collapsed ? 'collapsed' : ''}`}
//         anchor="left"
//       >
//         <div className="sidebar-content">
//           <Button onClick={toggleSidebar}>
//             <FontAwesomeIcon icon={collapsed ? faArrowRight : faArrowLeft} />
//           </Button>
//           <List>
//             <ListItem button onClick={() => setSelectedMenu('dashboard')}>
//               <ListItemIcon><FontAwesomeIcon icon={faTachometerAlt} /></ListItemIcon>
//               <ListItemText primary="Dashboard" />
//             </ListItem>
//             <ListItem button onClick={toggleCrmMenu}>
//               <ListItemIcon><FontAwesomeIcon icon={faUsers} /></ListItemIcon>
//               <ListItemText primary="CRM" />
//               <FontAwesomeIcon icon={crmOpen ? faChevronUp : faChevronDown} />
//             </ListItem>
//             {crmOpen && (
//               <Box ml={4}>
//                 <ListItem button onClick={() => setSelectedMenu('leads')}>
//                   <ListItemText primary="Leads" />
//                 </ListItem>
//                 <ListItem button onClick={() => setSelectedMenu('contacts')}>
//                   <ListItemText primary="Contacts" />
//                 </ListItem>
//                 <ListItem button onClick={() => setSelectedMenu('accounts')}>
//                   <ListItemText primary="Accounts" />
//                 </ListItem>
//                 <ListItem button onClick={() => setSelectedMenu('tasks')}>
//                   <ListItemText primary="Tasks" />
//                 </ListItem>
//                 <ListItem button onClick={() => setSelectedMenu('deals')}>
//                   <ListItemText primary="Deals" />
//                 </ListItem>
//                 <ListItem button onClick={() => setSelectedMenu('meetings')}>
//                   <ListItemText primary="Meetings" />
//                 </ListItem>
//                 <ListItem button onClick={() => setSelectedMenu('tickets')}>
//                   <ListItemText primary="Tickets" />
//                 </ListItem>
//               </Box>
//             )}
//             <ListItem button>
//               <ListItemIcon><FontAwesomeIcon icon={faBullhorn} /></ListItemIcon>
//               <ListItemText primary="Marketing" />
//             </ListItem>
//           </List>
//         </div>
//       </Drawer>
//       {renderContent()}
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Alert, Grid, Button } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import Sidebar from '../Sidebar/Sidebar';
import './dashboard.scss';

const Dashboard: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [crmOpen, setCrmOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadsResponse, contactsResponse, accountsResponse, tasksResponse, dealsResponse, meetingsResponse, ticketsResponse] = await Promise.all([
          axios.get('/api/leads'),
          axios.get('/api/contacts'),
          axios.get('/api/accounts'),
          axios.get('/api/tasks'),
          axios.get('/api/deals'),
          axios.get('/api/meetings'),
          axios.get('/api/tickets'),
        ]);
        setLeads(leadsResponse.data);
        setContacts(contactsResponse.data);
        setAccounts(accountsResponse.data);
        setTasks(tasksResponse.data);
        setDeals(dealsResponse.data);
        setMeetings(meetingsResponse.data);
        setTickets(ticketsResponse.data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleCrmMenu = () => {
    setCrmOpen(!crmOpen);
  };

  const renderDashboard = () => {
    const totalLeads = leads.length;
    const newLeadsCount = leads.filter(lead => lead.lead_status === 'New').length;
    const closedLeadsCount = leads.filter(lead => lead.lead_status === 'Closed').length;
    const totalContacts = contacts.length;
    const totalAccounts = accounts.length;

    const pieData = [
      { name: 'Leads', value: totalLeads },
      { name: 'Contacts', value: totalContacts },
      { name: 'Accounts', value: totalAccounts },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    const barData = [
      { name: 'New Leads', count: newLeadsCount },
      { name: 'Closed Leads', count: closedLeadsCount },
      { name: 'Total Contacts', count: totalContacts },
      { name: 'Total Accounts', count: totalAccounts },
    ];

    return (
      <div className={`content ${collapsed ? 'collapsed' : ''}`}>
        <Typography variant="h4">Dashboard</Typography>
        <p>Welcome to your dashboard</p>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        {!loading && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Overview</Typography>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={pieData}
                      cx={200}
                      cy={200}
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Lead Status</Typography>
                  <BarChart
                    width={500}
                    height={300}
                    data={barData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </div>
    );
  };

  const renderLeads = () => (
    <div className={`content ${collapsed ? 'collapsed' : ''}`}>
      <Typography variant="h4">Leads</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {leads.length > 0 ? (
        <Grid container spacing={3}>
          {leads.map((lead) => (
            <Grid item xs={12} md={6} lg={4} key={lead.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{lead.first_name} {lead.last_name}</Typography>
                  <Typography variant="body2"><strong>Company:</strong> {lead.company}</Typography>
                  <Typography variant="body2"><strong>Website:</strong> {lead.website}</Typography>
                  <Typography variant="body2"><strong>Email:</strong> {lead.email}</Typography>
                  <Typography variant="body2"><strong>Phone:</strong> {lead.phone}</Typography>
                  <Typography variant="body2"><strong>Status:</strong> {lead.lead_status}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No leads available.</Typography>
      )}
    </div>
  );

  const renderContacts = () => (
    <div className={`content ${collapsed ? 'collapsed' : ''}`}>
      <Typography variant="h4">Contacts</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {contacts.length > 0 ? (
        <Grid container spacing={3}>
          {contacts.map((contact) => (
            <Grid item xs={12} md={6} lg={4} key={contact.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{contact.first_name} {contact.last_name}</Typography>
                  <Typography variant="body2"><strong>Company:</strong> {contact.company}</Typography>
                  <Typography variant="body2"><strong>Email:</strong> {contact.email}</Typography>
                  <Typography variant="body2"><strong>Phone:</strong> {contact.phone}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No contacts available.</Typography>
      )}
    </div>
  );

  const renderAccounts = () => (
    <div className={`content ${collapsed ? 'collapsed' : ''}`}>
      <Typography variant="h4">Accounts</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {accounts.length > 0 ? (
        <Grid container spacing={3}>
          {accounts.map((account) => (
            <Grid item xs={12} md={6} lg={4} key={account.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{account.name}</Typography>
                  <Typography variant="body2"><strong>Industry:</strong> {account.industry}</Typography>
                  <Typography variant="body2"><strong>Website:</strong> {account.website}</Typography>
                  <Typography variant="body2"><strong>Phone:</strong> {account.phone}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No accounts available.</Typography>
      )}
    </div>
  );

  const renderTasks = () => (
    <div className={`content ${collapsed ? 'collapsed' : ''}`}>
      <Typography variant="h4">Tasks</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {tasks.length > 0 ? (
        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid item xs={12} md={6} lg={4} key={task.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{task.title}</Typography>
                  <Typography variant="body2"><strong>Description:</strong> {task.description}</Typography>
                  <Typography variant="body2"><strong>Due Date:</strong> {task.due_date}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No tasks available.</Typography>
      )}
    </div>
  );

  const renderDeals = () => (
    <div className={`content ${collapsed ? 'collapsed' : ''}`}>
      <Typography variant="h4">Deals</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {deals.length > 0 ? (
        <Grid container spacing={3}>
          {deals.map((deal) => (
            <Grid item xs={12} md={6} lg={4} key={deal.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{deal.name}</Typography>
                  <Typography variant="body2"><strong>Amount:</strong> ${deal.amount}</Typography>
                  <Typography variant="body2"><strong>Status:</strong> {deal.status}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No deals available.</Typography>
      )}
    </div>
  );

  const renderMeetings = () => (
    <div className={`content ${collapsed ? 'collapsed' : ''}`}>
      <Typography variant="h4">Meetings</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {meetings.length > 0 ? (
        <Grid container spacing={3}>
          {meetings.map((meeting) => (
            <Grid item xs={12} md={6} lg={4} key={meeting.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{meeting.title}</Typography>
                  <Typography variant="body2"><strong>Date:</strong> {meeting.date}</Typography>
                  <Typography variant="body2"><strong>Time:</strong> {meeting.time}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No meetings available.</Typography>
      )}
    </div>
  );

  const renderTickets = () => (
    <div className={`content ${collapsed ? 'collapsed' : ''}`}>
      <Typography variant="h4">Tickets</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {tickets.length > 0 ? (
        <Grid container spacing={3}>
          {tickets.map((ticket) => (
            <Grid item xs={12} md={6} lg={4} key={ticket.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{ticket.title}</Typography>
                  <Typography variant="body2"><strong>Status:</strong> {ticket.status}</Typography>
                  <Typography variant="body2"><strong>Priority:</strong> {ticket.priority}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No tickets available.</Typography>
      )}
    </div>
  );

  const renderContent = () => {
    switch (selectedMenu) {
      case 'dashboard':
        return renderDashboard();
      case 'leads':
        return renderLeads();
      case 'contacts':
        return renderContacts();
      case 'accounts':
        return renderAccounts();
      case 'tasks':
        return renderTasks();
      case 'deals':
        return renderDeals();
      case 'meetings':
        return renderMeetings();
      case 'tickets':
        return renderTickets();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="dashboard">
        <Sidebar  
          collapsed={collapsed}
          toggleSidebar={toggleSidebar}
          crmOpen={crmOpen}
          toggleCrmMenu={toggleCrmMenu}
          setSelectedMenu={setSelectedMenu}
        />
      <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
