// import React from 'react';
// import { Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';

// interface Task {
//   id: string;
//   title: string;
//   dueDate: string;
//   status: string;
// }

// interface TaskContentsProps {
//   tasks: Task[];
//   loading: boolean;
//   error: string | null;
// }

// const TaskContents: React.FC<TaskContentsProps> = ({ tasks, loading, error }) => {
//   if (loading) return <CircularProgress />;
//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <div className="content">
//       {tasks.map(task => (
//         <Card key={task.id}>
//           <CardContent>
//             <Typography variant="h6">{task.title}</Typography>
//             <Typography variant="body2">Due Date: {task.dueDate}</Typography>
//             <Typography variant="body2">Status: {task.status}</Typography>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

// // export default TaskContents;
// import React from 'react';
// import { Card, CardContent, Typography, CircularProgress, Alert, Grid } from '@mui/material';
// import { format } from 'date-fns'; // Using date-fns for date formatting

// interface Task {
//   id: string;
//   title: string;
//   subject: string;
//   dueDate: string;
//   priority: string;
//   description: string;
//   reminder: string;
//   user: {
//     login: string;
//   };
//   status: string;
// }

// interface TaskContentsProps {
//   tasks: Task[];
//   loading: boolean;
//   error: string | null;
// }

// const TaskContents: React.FC<TaskContentsProps> = ({ tasks, loading, error }) => {
//   if (loading) return <CircularProgress />;
//   if (error) return <Alert severity="error">{error}</Alert>;

//   const APP_DATE_FORMAT = 'MM/dd/yyyy';

//   return (
//     <div className="content">
//       <Grid container spacing={3}>
//         {tasks.map(task => (
//           <Grid item xs={12} md={6} lg={4} key={task.id}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">{task.title}</Typography>
//                 <Typography variant="body2"><strong>Subject:</strong> {task.subject}</Typography>
//                 <Typography variant="body2"><strong>Due Date:</strong> {task.dueDate ? format(new Date(task.dueDate), APP_DATE_FORMAT) : 'N/A'}</Typography>
//                 <Typography variant="body2"><strong>Priority:</strong> {task.priority}</Typography>
//                 <Typography variant="body2"><strong>Description:</strong> {task.description}</Typography>
//                 <Typography variant="body2"><strong>Reminder:</strong> {task.reminder}</Typography>
//                 <Typography variant="body2"><strong>User:</strong> {task.user ? task.user.login : 'N/A'}</Typography>
//                 <Typography variant="body2"><strong>Status:</strong> {task.status}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default TaskContents;

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, CircularProgress, Alert, Grid, TextField, Button, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './scss/TaskContents.scss'; // Assuming you have a corresponding SCSS file

interface Task {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: string;
  description: string;
  reminder: string;
  user: {
    login: string;
  };
  status: string;
}

interface TaskContentsProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  collapsed: boolean;
}

const TaskContents: React.FC<TaskContentsProps> = ({ tasks, loading, error, collapsed }) => {
  const [filter, setFilter] = useState('');
  const [filterField, setFilterField] = useState('all');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleFilterFieldChange = (event: SelectChangeEvent<string>) => {
    setFilterField(event.target.value);
  };

  const applyFilter = (task: Task, filter: string) => {
    const filterLower = filter.toLowerCase();
    return (
      (filterField === 'all' && (
        (task.title && task.title.toLowerCase().includes(filterLower)) ||
        (task.subject && task.subject.toLowerCase().includes(filterLower)) ||
        (task.dueDate && task.dueDate.toLowerCase().includes(filterLower)) ||
        (task.priority && task.priority.toLowerCase().includes(filterLower)) ||
        (task.description && task.description.toLowerCase().includes(filterLower)) ||
        (task.reminder && task.reminder.toLowerCase().includes(filterLower)) ||
        (task.user && task.user.login.toLowerCase().includes(filterLower)) ||
        (task.status && task.status.toLowerCase().includes(filterLower))
      )) ||
      (task[filterField as keyof Task] && task[filterField as keyof Task].toString().toLowerCase().includes(filterLower))
    );
  };

  const filteredTasks = tasks.filter(task => applyFilter(task, filter));

  return (
    <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
      <div className={`content ${collapsed ? 'collapsed' : ''}`}>
        <div className="top-bar">
          <Typography variant="h4" color="#d3e3fdb3">Tasks</Typography>
          <Link to="/task/new" className="create-task-button">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Task
          </Link>
        </div>
        <div className="filter-section">
          <Select
            value={filterField}
            onChange={handleFilterFieldChange}
            displayEmpty
            className="filter-select"
          >
            <MenuItem value="all">All Fields</MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="subject">Subject</MenuItem>
            <MenuItem value="dueDate">Due Date</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
            <MenuItem value="description">Description</MenuItem>
            <MenuItem value="reminder">Reminder</MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="status">Status</MenuItem>
          </Select>
          <TextField
            className="filter-input"
            label="Search Tasks"
            variant="outlined"
            value={filter}
            onChange={handleFilterChange}
            fullWidth
          />
        </div>
        <div className="data-section">
          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error}</Alert>}
          <div className="tasks-container">
            {filteredTasks.length > 0 ? (
              <Grid container spacing={3}>
                {filteredTasks.map(task => (
                  <Grid item xs={12} md={6} lg={4} key={task.id}>
                    <Card className="task-card" style={{backgroundColor:'#162c46'}}>
                      <CardContent>
                        <Typography variant="h6" color="#d3e3fdb3">{task.title}</Typography>
                        <Typography className="task-info"color="#d3e3fdb3"><strong>Subject:</strong> {task.subject}</Typography>
                        <Typography className="task-info"color="#d3e3fdb3"><strong>Due Date:</strong> {task.dueDate}</Typography>
                        <Typography className="task-info"color="#d3e3fdb3"><strong>Priority:</strong> {task.priority}</Typography>
                        <Typography className="task-info"color="#d3e3fdb3"><strong>Description:</strong> {task.description}</Typography>
                        <Typography className="task-info"color="#d3e3fdb3"><strong>Reminder:</strong> {task.reminder}</Typography>
                        <Typography className="task-info"color="#d3e3fdb3"><strong>User:</strong> {task.user.login}</Typography>
                        <Typography className="task-info"color="#d3e3fdb3"><strong>Status:</strong> {task.status}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>No tasks available.</Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskContents;
