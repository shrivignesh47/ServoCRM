import React from 'react';
import { Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';

interface Meeting {
  id: string;
  title: string;
  date: string;
  participants: string[];
}

interface MeetingsContentsProps {
  meetings: Meeting[];
  loading: boolean;
  error: string | null;
}

const MeetingsContents: React.FC<MeetingsContentsProps> = ({ meetings, loading, error }) => {
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div className="content">
      {meetings.map(meeting => (
        <Card key={meeting.id}>
          <CardContent>
            <Typography variant="h6">{meeting.title}</Typography>
            <Typography variant="body2">Date: {meeting.date}</Typography>
            <Typography variant="body2">Participants: {meeting.participants.join(', ')}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MeetingsContents;
