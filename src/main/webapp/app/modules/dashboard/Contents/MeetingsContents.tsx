  // import React from 'react';
  // import { Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';

  // interface Meeting {
  //   id: string;
  //   title: string;
  //   date: string;
  //   participants: string[];
  // }

  // interface MeetingsContentsProps {
  //   meetings: Meeting[];
  //   loading: boolean;
  //   error: string | null;
  // }

  // const MeetingsContents: React.FC<MeetingsContentsProps> = ({ meetings, loading, error }) => {
  //   if (loading) return <CircularProgress />;
  //   if (error) return <Alert severity="error">{error}</Alert>;

  //   return (
  //     <div className="content">
  //       {meetings.map(meeting => (
  //         <Card key={meeting.id}>
  //           <CardContent>
  //             <Typography variant="h6">{meeting.title}</Typography>
  //             <Typography variant="body2">Date: {meeting.date}</Typography>
  //           </CardContent>
  //         </Card>
  //       ))}
  //     </div>
  //   );
  // };

  // export default MeetingsContents;
  // import React, { useState } from 'react';
  // import { Card, CardContent, Typography, CircularProgress, Alert, Grid, TextField, Select, MenuItem, SelectChangeEvent } from '@mui/material';
  // import { Link } from 'react-router-dom';
  // import './scss/MeetingsContents.scss'; // Assuming you have a corresponding SCSS file

  // interface Meeting {
  //   id: string;
  //   title: string;
  //   location?: string;
  //   google_meet?: string;
  //   location_Offline_Detail?: string;
  //   from?: string;
  //   to?: string;
  //   user?: {
  //     login: string;
  //   };
  // }

  // interface MeetingsContentsProps {
  //   meetings: Meeting[];
  //   loading: boolean;
  //   error: string | null;
  //   collapsed: boolean;
  // }

  // const MeetingsContents: React.FC<MeetingsContentsProps> = ({ meetings, loading, error, collapsed }) => {
  //   const [filter, setFilter] = useState('');
  //   const [filterField, setFilterField] = useState('all');

  //   const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setFilter(event.target.value);
  //   };

  //   const handleFilterFieldChange = (event: SelectChangeEvent<string>) => {
  //     setFilterField(event.target.value);
  //   };

  //   const applyFilter = (meeting: Meeting) => {
  //     const filterLower = filter.toLowerCase();
  //     return (
  //       (filterField === 'all' && (
  //         (meeting.title && meeting.title.toLowerCase().includes(filterLower)) ||
  //         (meeting.location && meeting.location.toLowerCase().includes(filterLower)) ||
  //         (meeting.location_Offline_Detail && meeting.location_Offline_Detail.toLowerCase().includes(filterLower)) ||
  //         (meeting.from && meeting.from.toLowerCase().includes(filterLower)) ||
  //         (meeting.to && meeting.to.toLowerCase().includes(filterLower)) ||
  //         (meeting.user && meeting.user.login.toLowerCase().includes(filterLower))
  //       )) ||
  //       (meeting[filterField as keyof Meeting] && meeting[filterField as keyof Meeting].toString().toLowerCase().includes(filterLower))
  //     );
  //   };

  //   const filteredMeetings = meetings.filter(applyFilter);

  //   return (
  //     <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
  //       <div className={`content ${collapsed ? 'collapsed' : ''}`}>
  //         <div className="top-bar">
  //           <Typography variant="h4" color="#d3e3fdb3">Meetings</Typography>
  //           <Link to="/meetings/new" className="create-meeting-button">
  //             Create a new Meeting
  //           </Link>
  //         </div>
  //         <div className="filter-section">
  //           <Select
  //             value={filterField}
  //             onChange={handleFilterFieldChange}
  //             displayEmpty
  //             className="filter-select"
  //           >
  //             <MenuItem value="all">All Fields</MenuItem>
  //             <MenuItem value="title">Title</MenuItem>
  //             <MenuItem value="location">Location</MenuItem>
  //             <MenuItem value="location_Offline_Detail">Location Offline Detail</MenuItem>
  //             <MenuItem value="from">From</MenuItem>
  //             <MenuItem value="to">To</MenuItem>
  //             <MenuItem value="user">User</MenuItem>
  //           </Select>
  //           <TextField
  //             className="filter-input"
  //             label="Search Meetings"
  //             variant="outlined"
  //             value={filter}
  //             onChange={handleFilterChange}
  //             fullWidth
  //           />
  //         </div>
  //         <div className="data-section">
  //           {loading && <CircularProgress />}
  //           {error && <Alert severity="error">{error}</Alert>}
  //           <div className="meetings-container">
  //             {filteredMeetings.length > 0 ? (
  //               <Grid container spacing={3}>
  //                 {filteredMeetings.map(meeting => (
  //                   <Grid item xs={12} md={6} lg={4} key={meeting.id}>
  //                     <Card className="meeting-card" style={{backgroundColor:'#162c46'}}>
  //                       <CardContent>
  //                         <Typography variant="h6" color="#d3e3fdb3">{meeting.title}</Typography>
  //                         <Typography className="meeting-info"color="#d3e3fdb3"><strong>Location:</strong> {meeting.location || 'N/A'}</Typography>
  //                         <Typography className="meeting-info"color="#d3e3fdb3"><strong>Location Offline Detail:</strong> {meeting.location_Offline_Detail || 'N/A'}</Typography>
  //                         <Typography className="meeting-info"color="#d3e3fdb3"><strong>From:</strong> {meeting.from ? new Date(meeting.from).toLocaleDateString() : 'N/A'}</Typography>
  //                         <Typography className="meeting-info"color="#d3e3fdb3"><strong>To:</strong> {meeting.to ? new Date(meeting.to).toLocaleDateString() : 'N/A'}</Typography>
  //                         <Typography className="meeting-info"color="#d3e3fdb3"><strong>Gmeet:</strong> {meeting.google_meet || 'N/A'}</Typography>
  //                         <Typography className="meeting-info"color="#d3e3fdb3"><strong>User:</strong> {meeting.user ? meeting.user.login : 'N/A'}</Typography>
  //                       </CardContent>
  //                     </Card>
  //                   </Grid>
  //                 ))}
  //               </Grid>
  //             ) : (
  //               <Typography>No meetings available.</Typography>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default MeetingsContents;

  import React, { useState } from 'react';
import { Card, CardContent, Typography, CircularProgress, Alert, Grid, TextField, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Link } from 'react-router-dom';
import './scss/MeetingsContents.scss'; // Assuming you have a corresponding SCSS file

interface Meeting {
  id: string;
  title: string;
  location?: string;
  google_meet?: string;
  location_Offline_Detail?: string;
  from?: string;
  to?: string;
  user?: {
    login: string;
  };
}

interface MeetingsContentsProps {
  meetings: Meeting[];
  loading: boolean;
  error: string | null;
  collapsed: boolean;
}

const MeetingsContents: React.FC<MeetingsContentsProps> = ({ meetings, loading, error, collapsed }) => {
  const [filter, setFilter] = useState('');
  const [filterField, setFilterField] = useState('all');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleFilterFieldChange = (event: SelectChangeEvent<string>) => {
    setFilterField(event.target.value);
  };

  const applyFilter = (meeting: Meeting) => {
    const filterLower = filter.toLowerCase();
    return (
      (filterField === 'all' && (
        (meeting.title && meeting.title.toLowerCase().includes(filterLower)) ||
        (meeting.location && meeting.location.toLowerCase().includes(filterLower)) ||
        (meeting.location_Offline_Detail && meeting.location_Offline_Detail.toLowerCase().includes(filterLower)) ||
        (meeting.from && meeting.from.toLowerCase().includes(filterLower)) ||
        (meeting.to && meeting.to.toLowerCase().includes(filterLower)) ||
        (meeting.user && meeting.user.login.toLowerCase().includes(filterLower))
      )) ||
      (meeting[filterField as keyof Meeting] && meeting[filterField as keyof Meeting].toString().toLowerCase().includes(filterLower))
    );
  };

  const filteredMeetings = meetings.filter(applyFilter);

  return (
    <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
      <div className={`content ${collapsed ? 'collapsed' : ''}`}>
        <div className="top-bar">
          <Typography variant="h4" color="#d3e3fdb3">Meetings</Typography>
          <Link to="/meetings/new" className="create-meeting-button">
            Create a new Meeting
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
            <MenuItem value="location">Location</MenuItem>
            <MenuItem value="location_Offline_Detail">Location Offline Detail</MenuItem>
            <MenuItem value="from">From</MenuItem>
            <MenuItem value="to">To</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
          <TextField
            className="filter-input"
            label="Search Meetings"
            variant="outlined"
            value={filter}
            onChange={handleFilterChange}
            fullWidth
          />
        </div>
        <div className="data-section">
          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error}</Alert>}
          <div className="meetings-container">
            {filteredMeetings.length > 0 ? (
              <Grid container spacing={3}>
                {filteredMeetings.map(meeting => (
                  <Grid item xs={12} md={6} lg={4} key={meeting.id}>
                    <Card className="meeting-card" style={{backgroundColor:'#162c46'}}>
                      <CardContent>
                        <Typography variant="h6" color="#d3e3fdb3">{meeting.title}</Typography>
                        <Typography className="meeting-info"color="#d3e3fdb3"><strong>Location:</strong> {meeting.location || 'N/A'}</Typography>
                        <Typography className="meeting-info"color="#d3e3fdb3"><strong>Location Offline Detail:</strong> {meeting.location_Offline_Detail || 'N/A'}</Typography>
                        <Typography className="meeting-info"color="#d3e3fdb3"><strong>From:</strong> {meeting.from ? new Date(meeting.from).toLocaleDateString() : 'N/A'}</Typography>
                        <Typography className="meeting-info"color="#d3e3fdb3"><strong>To:</strong> {meeting.to ? new Date(meeting.to).toLocaleDateString() : 'N/A'}</Typography>
                        <Typography className="meeting-info"color="#d3e3fdb3">
                          <strong>Gmeet: </strong> 
                          {meeting.google_meet ? (
                            <a href={meeting.google_meet} target="_blank" rel="noopener noreferrer" style={{ color: '#1a73e8' }}>
                              {meeting.google_meet}
                            </a>
                          ) : 'N/A'}
                        </Typography>
                        <Typography className="meeting-info"color="#d3e3fdb3"><strong>User:</strong> {meeting.user ? meeting.user.login : 'N/A'}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>No meetings available.</Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingsContents;
