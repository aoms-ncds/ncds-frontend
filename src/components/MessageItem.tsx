<<<<<<< HEAD
import { Alert, AlertTitle, Typography } from '@mui/material';
import { Moment } from 'moment';
interface MessageItemProps {
  key: string;
  isSent: boolean;
  body: string;
  time: Moment;
  sender: string;
}
const MessageItem = (props: MessageItemProps) => {
  return (
    <Alert
      icon={false}
      variant="outlined"
      elevation={3}
      sx={{
        mb: 1,
        [props.isSent ? 'mr' : 'ml']: 20,
        p: 1,
        pl: 5,
        borderRadius: props.isSent ? '20px 20px 20px 0' : '20px 20px 0 20px',
      }}
      severity={props.isSent ? 'success' : 'info'}
    >
      <AlertTitle>
        <u>{props.sender}</u>
      </AlertTitle>
      {props.body} <br />
      <Typography variant="caption" sx={{ float: 'right', width: '100%' }}>
        {props.time.format('DD/MM/YYYY hh:mm A')}
      </Typography>
    </Alert>
  );
};

export default MessageItem;
=======
import { Alert, AlertTitle, Typography } from '@mui/material';
import { Moment } from 'moment';
interface MessageItemProps {
  key: string;
  isSent: boolean;
  body: string;
  time: Moment;
  sender: string;
}
const MessageItem = (props: MessageItemProps) => {
  return (
    <Alert
      icon={false}
      variant="outlined"
      elevation={3}
      sx={{
        mb: 1,
        [props.isSent ? 'mr' : 'ml']: 20,
        p: 1,
        pl: 5,
        borderRadius: props.isSent ? '20px 20px 20px 0' : '20px 20px 0 20px',
      }}
      severity={props.isSent ? 'success' : 'info'}
    >
      <AlertTitle>
        <u>{props.sender}</u>
      </AlertTitle>
      {props.body} <br />
      <Typography variant="caption" sx={{ float: 'right', width: '100%' }}>
        {props.time.format('DD/MM/YYYY hh:mm A')}
      </Typography>
    </Alert>
  );
};

export default MessageItem;
>>>>>>> 41531d0484f2a91a6b8c421d26685b73d8e8c7f0
