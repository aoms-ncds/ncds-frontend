import { Card, Typography, CardHeader, Avatar, IconButton } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { useEffect, useState } from 'react';
import moment from 'moment';
import TransactionLogServices from './extras/TransactionLogServices';
const TransactionLog = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: moment().startOf('D'),
    endDate: moment().endOf('D'),
    rangeType: 'days',
  });
  const [logs, setLogs] = useState<ITransactionLog[]>([]);
  useEffect(() => {
    const getLog=async ()=>{
      setLogs((await TransactionLogServices.getAll(dateRange)).data);
    };
    getLog();
  }, [dateRange]);
  return (
    <CommonPageLayout title="FR/IRO Log"
      momentFilter={{
        dateRange: dateRange,
        onChange: (newDateRange) => {
          setDateRange(newDateRange);
        },
        rangeTypes: ['days', 'weeks', 'months', 'quarter_years', 'years', 'customRange', 'customDay'],
        initialRange: 'days',
      }}>

      <Card>
        <CardHeader
          title="FR/IRO Log"
        />
        <ul>
          {logs.map((log, index)=>(
            // eslint-disable-next-line react/jsx-no-comment-textnodes
            <li key={index}>
              <Typography variant="body1" color="initial" >
                {`${log.TRNo} ${log.action} by 
                ${log.doneBy.basicDetails.firstName} ${log.doneBy.basicDetails.middleName?log.doneBy.basicDetails.middleName+' ':''}${log.doneBy.basicDetails.lastName}
                 on ${moment(log.createdAt).format('DD/MM/YYYY hh:mm:ss a')}` }
              </Typography>
            </li>
          ))}
        </ul>
        {(logs.length===0)&&<Typography variant="h5" color="initial" align='center'>No Log Found</Typography>}
        <br />
      </Card>
    </CommonPageLayout>
  );
};

export default TransactionLog;
