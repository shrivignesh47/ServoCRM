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




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import Sidebar from '../../shared/layout/Sidebar/Sidebar';
import LeadsContents from './Contents/LeadContents';
import ContactsContents from './Contents/ContactsContents';
import AccountsContents from './Contents/AccountsContents';
import TasksContents from './Contents/TaskContents';
import DealsContents from './Contents/DealsContents';
import MeetingsContents from './Contents/MeetingsContents';
import TicketsContents from './Contents/TicketsContents';
import './dashboard.scss';
import ExcelToDashboard from './Excel/ExcelToDashboard';
import PowerBi from './Excel/PowerBI';
import EmailMarketing from './Marketing/EmailMarketing';

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
  const [ExcelOpen,setExcelOpen] =useState(false);
  const [MarketingOpen,setMarketingOpen] =useState(false);

  useEffect(() => { 
    const fetchData = async () => {
      try {
        const [
          leadsResponse,
          contactsResponse,
          accountsResponse,
          tasksResponse,
          dealsResponse,
          meetingsResponse,
          ticketsResponse,
        ] = await Promise.all([
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
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  const toggleCrmMenu = () => {
    setCrmOpen((prevCrmOpen) => !prevCrmOpen);
  };

  const toggleMarketingMenu = () => {
    setMarketingOpen((prevMarketingOpen) => !prevMarketingOpen);
  };

  const toggleExcelMenu = () => {
    setExcelOpen((prevExcelOpen) => !prevExcelOpen);
  };

  // const toggleMarketingMenu=()=>{
  //   setMarketingOpen((prevMarketingOpen))=> !prevMarketingOpen);
  // }
  // Convert meeting data to a format suitable for the line chart
  const getMeetingDataForChart = () => {
    const meetingsData = meetings.map((meeting) => {
      const dateTime = new Date(meeting.from);
      const month = dateTime.toLocaleString('default', { month: 'short' });
      const year = dateTime.getFullYear();
      return {
        date: `${month} ${year}`, // e.g., "Aug 2024"
        count: 1,
      };
    });

    const aggregatedData: { [key: string]: { date: string; count: number } } = {};

    meetingsData.forEach(({ date, count }) => {
      if (!aggregatedData[date]) {
        aggregatedData[date] = { date, count };
      } else {
        aggregatedData[date].count += count;
      }
    });

    // Sort by date
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return Object.values(aggregatedData).sort((a, b) => {
      const [monthA, yearA] = a.date.split(' ');
      const [monthB, yearB] = b.date.split(' ');

      // Convert yearA and yearB to numbers
      const yearAInt = parseInt(yearA, 10);
      const yearBInt = parseInt(yearB, 10);

      return (yearAInt - yearBInt) * 12 + (months.indexOf(monthA) - months.indexOf(monthB));
    });
  };

  const renderDashboard = () => {
    // Calculate totals and breakdowns
    const totalLeads = leads.length;
    const newLeadsCount = leads.filter((lead) => lead.lead_status === 'New').length;
    const closedLeadsCount = leads.filter((lead) => lead.lead_status === 'Closed').length;

    const totalContacts = contacts.length;
    const totalAccounts = accounts.length;
    const upcomingMeetings = meetings.filter((meeting) => new Date(meeting.from) > new Date()).length;

    const completedTasks = tasks.filter((task) => task.priority === 'HIGH').length;
    const pendingTasks = tasks.filter((task) => task.priority === 'HIGHEST').length;
    const lowestTasks = tasks.filter((task) => task.priority === 'LOWEST').length;

    const wonDeals = deals.filter((deal) => deal.stage === 'QUALIFICATION').length;
    const lostDeals = deals.filter((deal) => deal.stage === 'CLOSED_LOST').length;

    const ticketOpen = tickets.filter((ticket) => ticket.status === 'OPEN').length;
    const ticketClosed = tickets.filter((ticket) => ticket.status === 'CLOSED').length;

    // Data for charts
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
      { name: 'Upcoming Meetings', count: upcomingMeetings },
      { name: 'High Priority', count: completedTasks },
      { name: 'Highest Priority', count: pendingTasks },
      { name: 'Lowest Priority', count: lowestTasks },
      { name: 'Won Deals', count: wonDeals },
      { name: 'Lost Deals', count: lostDeals },
      { name: 'Open Tickets', count: ticketOpen },
      { name: 'Closed Tickets', count: ticketClosed },
    ];

    const taskStatusData = [
      { name: 'High Priority', count: completedTasks },
      { name: 'Highest Priority', count: pendingTasks },
      { name: 'Lowest Priority', count: lowestTasks },
    ];

    const dealStatusData = [
      { name: 'QUALIFICATION', count: wonDeals },
      { name: 'CLOSED_LOST', count: lostDeals },
    ];

    const ticketStatusData = [
      { name: 'Open', count: ticketOpen },
      { name: 'Escalated', count: ticketClosed },
    ];

    return (
      <div className={`content ${collapsed ? 'collapsed' : ''}`}>
        <Typography variant="h4" style={{color:'#d3e3fdb3'}}>Dashboard</Typography>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Summary Section */}
        {!loading && !error && (
          <div className="summary-section">
            <div className="summary-card">
              <Typography variant="h6" color="#d3e3fdb3">Total Leads</Typography>
              <Typography variant="h4"color="wheat">{totalLeads}</Typography>
            </div>
            <div className="summary-card">
              <Typography variant="h6" color="#d3e3fdb3">Total Tasks</Typography>
              <Typography variant="h4"color="wheat">{tasks.length}</Typography>
            </div>
            <div className="summary-card">
              <Typography variant="h6"color="#d3e3fdb3">Total Deals</Typography>
              <Typography variant="h4"color="wheat">{deals.length}</Typography>
            </div>
          </div>
        )}

        {!loading && (
          <Grid container spacing={3}>
            {/* Overview Pie Chart */}
            <Grid item xs={12} md={6} lg={4} >
              <Card >
                <CardContent style={{backgroundColor:'#162c46'}}>
                  <Typography variant="h6" color="#d3e3fdb3">Overview</Typography>
                  <PieChart width={400} height={300}>
                    <Pie
                      data={pieData}
                      cx={200}
                      cy={150}
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#162c46"
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

            {/* Bar Chart for Data Breakdown */}
            <Grid item xs={12} md={6} lg={8}>
              <Card>
                <CardContent  style={{backgroundColor:'#162c46'}}>
                  <Typography variant="h6" color="#d3e3fdb3">Data Breakdown</Typography>
                  <BarChart
                    width={700}
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

            {/* Meetings Line Chart */}
            <Grid item xs={12} md={6} lg={8}>
              <Card>
                <CardContent  style={{backgroundColor:'#162c46'}}>
                  <Typography variant="h6" color="#d3e3fdb3">Meeting Activity</Typography>
                  <LineChart
                    width={700}
                    height={300}
                    data={getMeetingDataForChart()}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" dot={false} />
                  </LineChart>
                </CardContent>
              </Card>
            </Grid>

            {/* Task Status Pie Chart */}
            <Grid item xs={12} md={6} lg={4}>
              <Card>
                <CardContent  style={{backgroundColor:'#162c46'}}>
                  <Typography variant="h6" color="#d3e3fdb3">Task Status</Typography>
                  <PieChart width={400} height={300}>
                    <Pie
                      data={taskStatusData}
                      height={10}
                      width={100}
                      cx={170}
                      cy={150}
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {taskStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </CardContent>
              </Card>
            </Grid>

            {/* Deal Status Pie Chart */}
            <Grid item xs={12} md={6} lg={4}>
              <Card>
                <CardContent  style={{backgroundColor:'#162c46'}}>
                  <Typography variant="h6" color="#d3e3fdb3">Deal Status</Typography>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={dealStatusData}
                      cx={200}
                      cy={200}
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {dealStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </CardContent>
              </Card>
            </Grid>

            {/* Ticket Status Pie Chart */}
            <Grid item xs={12} md={6} lg={4}>
              <Card>
                <CardContent  style={{backgroundColor:'#162c46'}}>
                  <Typography variant="h6" color="#d3e3fdb3">Ticket Status</Typography>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={ticketStatusData}
                      cx={200}
                      cy={200}
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#00C49F"
                      dataKey="count"
                    >
                      {ticketStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
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
        return <ContactsContents contacts={contacts} loading={loading} error={error} collapsed={collapsed} />;
      case 'accounts':
        return <AccountsContents accounts={accounts} loading={loading} error={error} collapsed={collapsed} />;
      case 'tasks':
        return <TasksContents tasks={tasks} loading={loading} error={error} collapsed={collapsed} />;
      case 'deals':
        return <DealsContents deals={deals} loading={loading} error={error} collapsed={collapsed} />;
      case 'meetings':
        return <MeetingsContents meetings={meetings} loading={loading} error={error} collapsed={collapsed} />;
      case 'tickets':
        return <TicketsContents tickets={tickets} loading={loading} error={error} collapsed={collapsed} />;
        case 'Excel':
          return <ExcelToDashboard/>;
          case 'PowerBI':
            return <PowerBi/>;
            case 'EmailMarketing':
            return<EmailMarketing/>;
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
      ExcelOpen={ExcelOpen}
      toggleExcelMenu={toggleExcelMenu}
      setSelectedMenuExcel={setSelectedMenu}
      MarketingOpen={MarketingOpen}
      toggleMarketingMenu={toggleMarketingMenu}
      setSelectedMenuMarketing={setSelectedMenu}
      />
      <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
