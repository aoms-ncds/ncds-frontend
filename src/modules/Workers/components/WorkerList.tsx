import React, { useRef, useCallback } from 'react';
import { Card, CardHeader, Avatar, CardContent, Typography, Grid } from '@mui/material';

interface UserCardProps {
  user: IWorker;
  key: string;
}

const UserCard: React.FC<UserCardProps> = ({ user, key }) => {
  return (
    <Card sx={{ maxWidth: 345 }} key={key}>
      <CardHeader avatar={<Avatar alt={user.basicDetails.firstName} src={user.imageURL?.replace('uc', 'thumbnail')} />} title={user.basicDetails.firstName} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {user.basicDetails.email}
        </Typography>
      </CardContent>
    </Card>
  );
};

interface UserListProps {
  users: IWorker[];
  onScroll: () => void; // Define onScroll function prop
}

// eslint-disable-next-line react/no-multi-comp
const WorkerList: React.FC<UserListProps> = ({ users, onScroll }) => {
  const listRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!listRef.current) return;
    const { scrollTop, clientHeight, scrollHeight } = listRef.current;
    if (scrollHeight - scrollTop === clientHeight) {
      onScroll(); // Call the onScroll function when reaching the bottom of the list
    }
  }, [onScroll]);

  // Attach scroll event listener when component mounts
  React.useEffect(() => {
    if (!listRef.current) return;
    listRef.current.addEventListener('scroll', handleScroll);
    return () => {
      if (!listRef.current) return;
      listRef.current.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Grid container spacing={2} ref={listRef} style={{ maxHeight: '650px', overflowY: 'auto' }}>
      {users.map((user) => (
        <Grid item key={user._id} xs={12} sm={6} md={4} lg={3}>
          <UserCard user={user} key={user._id} />
        </Grid>
      ))}
    </Grid>
  );
};

export default WorkerList;
