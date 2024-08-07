// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, CardContent, Typography, CircularProgress, Alert, Grid, Button } from '@mui/material';
// import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
// import Sidebar from '../../shared/layout/Sidebar/Sidebar';
// import './dashboard.scss';

// const Dashboard: React.FC = () => {
//   const [leads, setLeads] = useState<any[]>([]);
//   const [contacts, setContacts] = useState<any[]>([]);
//   const [accounts, setAccounts] = useState<any[]>([]);
//   const [tasks, setTasks] = useState<any[]>([]);
//   const [deals, setDeals] = useState<any[]>([]);
//   const [meetings, setMeetings] = useState<any[]>([]);
//   const [tickets, setTickets] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
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
//                     margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
//                   <Typography variant="body2"><strong>Phone:</strong> {lead.phone}</Typography>
//                   <Typography variant="body2"><strong>Status:</strong> {lead.lead_status}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Typography>No leads available.</Typography>
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
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Typography>No contacts available.</Typography>
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
//                   <Typography variant="h5">{account.name}</Typography>
//                   <Typography variant="body2"><strong>Industry:</strong> {account.industry}</Typography>
//                   <Typography variant="body2"><strong>Website:</strong> {account.website}</Typography>
//                   <Typography variant="body2"><strong>Phone:</strong> {account.phone}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Typography>No accounts available.</Typography>
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
//                   <Typography variant="body2"><strong>Description:</strong> {task.description}</Typography>
//                   <Typography variant="body2"><strong>Due Date:</strong> {task.due_date}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Typography>No tasks available.</Typography>
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
//                   <Typography variant="h5">{deal.name}</Typography>
//                   <Typography variant="body2"><strong>Amount:</strong> ${deal.amount}</Typography>
//                   <Typography variant="body2"><strong>Status:</strong> {deal.status}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Typography>No deals available.</Typography>
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
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Typography>No meetings available.</Typography>
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
//                   <Typography variant="body2"><strong>Status:</strong> {ticket.status}</Typography>
//                   <Typography variant="body2"><strong>Priority:</strong> {ticket.priority}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Typography>No tickets available.</Typography>
//       )}
//     </div>
//   );

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

//   return (
//     <div className="dashboard">
//         <Sidebar  
//           collapsed={collapsed}
//           toggleSidebar={toggleSidebar}
//           crmOpen={crmOpen}
//           toggleCrmMenu={toggleCrmMenu}
//           setSelectedMenu={setSelectedMenu}
//         />
//       <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// // src/components/DashboardPage.tsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from '../../shared/layout/Sidebar/Sidebar';
// import Dashboard from './Contents/DashboardContent';
// import Leads from './Contents/LeadContents';
// import Contacts from './Contents/ContectsContent';
// import Accounts from './Contents/AccountsContents';
// import Tasks from './Contents/TaskContents';
// import Deals from './Contents/DealsContents';
// import Meetings from './Contents/MeetingsContents';
// import Tickets from './Contents/TicketsContents';
// import { Lead, Contact, Account, Task, Deal, Meeting, Ticket } from './Types/types';
// import { CircularProgress, Alert } from '@mui/material';

// const DashboardPage: React.FC = () => {
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [contacts, setContacts] = useState<Contact[]>([]);
//   const [accounts, setAccounts] = useState<Account[]>([]);
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [deals, setDeals] = useState<Deal[]>([]);
//   const [meetings, setMeetings] = useState<Meeting[]>([]);
//   const [tickets, setTickets] = useState<Ticket[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedMenu, setSelectedMenu] = useState('dashboard');
//   const [collapsed, setCollapsed] = useState(false);
//   const [crmOpen, setCrmOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [leadsResponse, contactsResponse, accountsResponse, tasksResponse, dealsResponse, meetingsResponse, ticketsResponse] = await Promise.all([
//           axios.get<Lead[]>('/api/leads'),
//           axios.get<Contact[]>('/api/contacts'),
//           axios.get<Account[]>('/api/accounts'),
//           axios.get<Task[]>('/api/tasks'),
//           axios.get<Deal[]>('/api/deals'),
//           axios.get<Meeting[]>('/api/meetings'),
//           axios.get<Ticket[]>('/api/tickets'),
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
//         const totalLeads = leads.length;
//         const newLeadsCount = leads.filter(lead => lead.lead_status === 'New').length;
//         const closedLeadsCount = leads.filter(lead => lead.lead_status === 'Closed').length;
//         const totalContacts = contacts.length;
//         const totalAccounts = accounts.length;

//         return (
//           <Dashboard
//             leadsCount={totalLeads}
//             newLeadsCount={newLeadsCount}
//             closedLeadsCount={closedLeadsCount}
//             contactsCount={totalContacts}
//             accountsCount={totalAccounts}
//           />
//         );
//       case 'leads':
//         return <Leads leads={leads} />;
//       case 'contacts':
//         return <Contacts contacts={contacts} />;
//       case 'accounts':
//         return <Accounts accounts={accounts} />;
//       case 'tasks':
//         return <Tasks tasks={tasks} />;
//       case 'deals':
//         return <Deals deals={deals} />;
//       case 'meetings':
//         return <Meetings meetings={meetings} />;
//       case 'tickets':
//         return <Tickets tickets={tickets} />;
//       default:
//         return <Dashboard
//           leadsCount={leads.length}
//           newLeadsCount={leads.filter(lead => lead.lead_status === 'New').length}
//           closedLeadsCount={leads.filter(lead => lead.lead_status === 'Closed').length}
//           contactsCount={contacts.length}
//           accountsCount={accounts.length}
//         />;
//     }
//   };

//   return (
//     <div className="dashboard">
//       <Sidebar
//         collapsed={collapsed}
//         toggleSidebar={toggleSidebar}
//         crmOpen={crmOpen}
//         toggleCrmMenu={toggleCrmMenu}
//         setSelectedMenu={setSelectedMenu}
//       />
//       <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
//         {loading && <CircularProgress />}
//         {error && <Alert severity="error">{error}</Alert>}
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// // export default DashboardPage;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, CardContent, Typography, CircularProgress, Alert, Grid } from '@mui/material';
// import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
// import Sidebar from '../../shared/layout/Sidebar/Sidebar';
// import LeadsContents from './Contents/LeadContents';
// import ContactsContents from './Contents/ContectsContent';
// import AccountsContents from './Contents/AccountsContents';
// import TasksContents from './Contents/TaskContents';
// import DealsContents from './Contents/DealsContents';
// import MeetingsContents from './Contents/MeetingsContents';
// import TicketsContents from './Contents/TicketsContents';
// import './dashboard.scss';

// const Dashboard: React.FC = () => {
//   const [leads, setLeads] = useState<any[]>([]);
//   const [contacts, setContacts] = useState<any[]>([]);
//   const [accounts, setAccounts] = useState<any[]>([]);
//   const [tasks, setTasks] = useState<any[]>([]);
//   const [deals, setDeals] = useState<any[]>([]);
//   const [meetings, setMeetings] = useState<any[]>([]);
//   const [tickets, setTickets] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
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
//                     margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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

//   const renderContent = () => {
//     switch (selectedMenu) {
//       case 'dashboard':
//         return renderDashboard();
//       case 'leads':
//         return <LeadsContents leads={leads} loading={loading} error={error} collapsed={false} />;
//       case 'contacts':
//         return <ContactsContents contacts={contacts} loading={loading} error={error} />;
//       case 'accounts':
//         return <AccountsContents accounts={accounts} loading={loading} error={error} />;
//       case 'tasks':
//         return <TasksContents tasks={tasks} loading={loading} error={error} />;
//       case 'deals':
//         return <DealsContents deals={deals} loading={loading} error={error} />;
//       case 'meetings':
//         return <MeetingsContents meetings={meetings} loading={loading} error={error} />;
//       case 'tickets':
//         return <TicketsContents tickets={tickets} loading={loading} error={error} />;
//       default:
//         return renderDashboard();
//     }
//   };

//   return (
//     <div className="dashboard">
//       <Sidebar  
//         collapsed={collapsed}
//         toggleSidebar={toggleSidebar}
//         crmOpen={crmOpen}
//         toggleCrmMenu={toggleCrmMenu}
//         setSelectedMenu={setSelectedMenu}
//       />
//       <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Alert, Grid } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import Sidebar from '../../shared/layout/Sidebar/Sidebar';
import LeadsContents from './Contents/LeadContents';
import ContactsContents from './Contents/ContectsContent';
import AccountsContents from './Contents/AccountsContents';
import TasksContents from './Contents/TaskContents';
import DealsContents from './Contents/DealsContents';
import MeetingsContents from './Contents/MeetingsContents';
import TicketsContents from './Contents/TicketsContents';
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
    setCollapsed(prevCollapsed => !prevCollapsed);
  };

  const toggleCrmMenu = () => {
    setCrmOpen(prevCrmOpen => !prevCrmOpen);
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

  const renderContent = () => {
    switch (selectedMenu) {
      case 'dashboard':
        return renderDashboard();
      case 'leads':
        return <LeadsContents leads={leads} loading={loading} error={error} collapsed={collapsed} />;
      case 'contacts':
        return <ContactsContents contacts={contacts} loading={loading} error={error} />;
      case 'accounts':
        return <AccountsContents accounts={accounts} loading={loading} error={error} />;
      case 'tasks':
        return <TasksContents tasks={tasks} loading={loading} error={error} />;
      case 'deals':
        return <DealsContents deals={deals} loading={loading} error={error} />;
      case 'meetings':
        return <MeetingsContents meetings={meetings} loading={loading} error={error} />;
      case 'tickets':
        return <TicketsContents tickets={tickets} loading={loading} error={error} />;
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
