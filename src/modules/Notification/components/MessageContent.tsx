import { Card, CardContent, Container, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommonPageLayout from '../../../components/CommonPageLayout';
import moment from 'moment';
import NotificationService from '../extras/NotificationService';

// eslint-disable-next-line require-jsdoc
function MessageContent() {
  const { _id } = useParams();

  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (_id) {
      NotificationService.getMessageById(_id)
        .then((res) => {
          if (res) {
            setMessage(res.data);
          }
        });
    }
  }, []);
  return (
    <CommonPageLayout title="Message">
      <Container maxWidth="md">
        <Card variant="outlined">
          <CardContent>
            {/* <Typography variant='body1' align='right'>
              <b>Type: </b>  {message?.type}
            </Typography> */}
            <Typography variant='h5'>
              {message?.title}
            </Typography>
            <Divider />
            <br />
            <Typography variant='body1'>
              {message?.body}
            </Typography>
            <br />
            {message?.ref_url && (
              <Typography variant="body1">
                <Link to={message?.ref_url?.replace('iet.pro910.com', 'aoms.ietapps.org')}>
                  {message?.ref_url?.replace('iet.pro910.com', 'aoms.ietapps.org')}
                </Link>
              </Typography>
            )}
            <br />
            <Typography variant='body1' align='right'>
              {message && moment(message.createdAt).format('DD/MM/YYYY hh:mm A')}
            </Typography>

          </CardContent>

        </Card>
      </Container>
    </CommonPageLayout>
  );
}

export default MessageContent;
