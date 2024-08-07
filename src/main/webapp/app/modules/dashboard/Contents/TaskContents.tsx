import React from 'react';
import { Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: string;
}

interface TaskContentsProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const TaskContents: React.FC<TaskContentsProps> = ({ tasks, loading, error }) => {
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div className="content">
      {tasks.map(task => (
        <Card key={task.id}>
          <CardContent>
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body2">Due Date: {task.dueDate}</Typography>
            <Typography variant="body2">Status: {task.status}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskContents;
